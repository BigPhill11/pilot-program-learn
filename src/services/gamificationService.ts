/**
 * Centralized Gamification Service
 * 
 * This service provides a unified interface for:
 * - Awarding XP (experience points)
 * - Checking and unlocking achievements
 * - Converting XP to Bamboo Coins
 * - Managing user progress and rewards
 * 
 * All progress updates (games, modules, activities) should flow through this service
 * to ensure consistent gamification behavior across the application.
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { XpSource } from '@/lib/coin-conversion';

export enum GamificationSource {
  BAMBOO_EMPIRE = 'bamboo_empire',
  MODULE_COMPLETION = 'module_completion',
  QUIZ = 'quiz',
  ACTIVITY = 'activity',
  LESSON = 'lesson',
  STORY = 'story',
  MARKET_PREDICTION = 'market_prediction',
  ACHIEVEMENT = 'achievement',
  OTHER = 'other'
}

export interface GamificationReward {
  xpAwarded: number;
  coinsAwarded: number;
  achievementsUnlocked: string[];
  leveledUp: boolean;
  newLevel?: number;
}

export class GamificationService {
  private userId: string | null = null;
  private currentTotalXp: number = 0;
  private streakMultiplier: number = 1.0;

  constructor(userId: string | null, currentStreak?: number) {
    this.userId = userId;
    if (currentStreak !== undefined) {
      // Apply streak multiplier: +5% per day, capped at +50%
      this.streakMultiplier = 1 + Math.min(currentStreak * 0.05, 0.5);
    }
  }

  /**
   * Award XP and trigger all related gamification rewards
   */
  async awardXp(
    baseXp: number,
    source: GamificationSource,
    sourceDetails?: string
  ): Promise<GamificationReward> {
    if (!this.userId || baseXp <= 0) {
      return {
        xpAwarded: 0,
        coinsAwarded: 0,
        achievementsUnlocked: [],
        leveledUp: false
      };
    }

    try {
      // Apply streak multiplier
      const xpAwarded = Math.round(baseXp * this.streakMultiplier);
      const streakBonus = Math.round((this.streakMultiplier - 1) * 100);

      // Fetch current progress to get total XP
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('total_points')
        .eq('user_id', this.userId)
        .maybeSingle();

      const previousTotalXp = progressData?.total_points || 0;
      this.currentTotalXp = previousTotalXp + xpAwarded;

      // Update user progress with new XP
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: this.userId,
          total_points: this.currentTotalXp,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (progressError) {
        console.error('Error updating user progress:', progressError);
        throw progressError;
      }

      // Award coins based on XP
      const coinsAwarded = await this.awardCoins(xpAwarded, source, sourceDetails, previousTotalXp);

      // Check for level up
      const levelUpResult = await this.checkLevelUp(this.currentTotalXp, xpAwarded);

      // Check for achievements
      const achievementsUnlocked = await this.checkAchievements();

      // Show toast notification
      if (streakBonus > 0) {
        toast.success(\`+\${xpAwarded} XP earned! (+\${streakBonus}% streak bonus) 🎉\`, {
          description: \`\${coinsAwarded} Bamboo Coins awarded!\`
        });
      } else {
        toast.success(\`+\${xpAwarded} XP earned! 🎉\`, {
          description: \`\${coinsAwarded} Bamboo Coins awarded!\`
        });
      }

      return {
        xpAwarded,
        coinsAwarded,
        achievementsUnlocked,
        leveledUp: levelUpResult.leveledUp,
        newLevel: levelUpResult.newLevel
      };
    } catch (error) {
      console.error('Error in awardXp:', error);
      return {
        xpAwarded: 0,
        coinsAwarded: 0,
        achievementsUnlocked: [],
        leveledUp: false
      };
    }
  }

  /**
   * Award coins based on XP earned
   */
  private async awardCoins(
    xpEarned: number,
    source: GamificationSource,
    sourceDetails?: string,
    previousTotalXp?: number
  ): Promise<number> {
    if (!this.userId || xpEarned <= 0) return 0;

    try {
      // Convert XP to coins (10 XP = 1 coin)
      const coinsAwarded = Math.floor(xpEarned / 10);
      if (coinsAwarded <= 0) return 0;

      // Log XP transaction
      const { error: txError } = await supabase
        .from('xp_transactions' as any)
        .insert({
          user_id: this.userId,
          xp_amount: xpEarned,
          coins_awarded: coinsAwarded,
          source: this.mapSourceToXpSource(source),
          source_details: sourceDetails
        });

      if (txError) {
        console.error('Error logging XP transaction:', txError);
      }

      // Fetch current coin balance
      const { data: balanceData } = await supabase
        .from('user_bamboo_coins' as any)
        .select('total_coins, lifetime_earned')
        .eq('user_id', this.userId)
        .maybeSingle();

      const currentBalance = balanceData?.total_coins || 0;
      const lifetimeEarned = balanceData?.lifetime_earned || 0;

      // Update coin balance
      const { error: coinError } = await supabase
        .from('user_bamboo_coins' as any)
        .upsert({
          user_id: this.userId,
          total_coins: currentBalance + coinsAwarded,
          lifetime_earned: lifetimeEarned + coinsAwarded,
          last_updated: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (coinError) {
        console.error('Error updating coin balance:', coinError);
        return 0;
      }

      return coinsAwarded;
    } catch (error) {
      console.error('Error in awardCoins:', error);
      return 0;
    }
  }

  /**
   * Check if user leveled up and update profile
   */
  private async checkLevelUp(
    totalXp: number,
    lastAwardedXp: number
  ): Promise<{ leveledUp: boolean; newLevel?: number }> {
    if (!this.userId) return { leveledUp: false };

    try {
      const currentLevel = this.getLevelFromXp(totalXp);
      const previousLevel = this.getLevelFromXp(Math.max(0, totalXp - lastAwardedXp));
      const xpToNext = this.getXpToNextLevel(totalXp);

      // Update profile with level info
      const { error } = await supabase
        .from('profiles')
        .update({
          current_level: currentLevel,
          points_to_next_level: xpToNext,
          updated_at: new Date().toISOString()
        })
        .eq('id', this.userId);

      if (error) {
        console.error('Error updating profile level:', error);
      }

      // Check if leveled up
      if (currentLevel > previousLevel) {
        toast.success(\`🎉 Level Up! You're now Level \${currentLevel}! 🎉\`, {
          duration: 5000
        });
        return { leveledUp: true, newLevel: currentLevel };
      }

      return { leveledUp: false };
    } catch (error) {
      console.error('Error in checkLevelUp:', error);
      return { leveledUp: false };
    }
  }

  /**
   * Check and unlock new achievements
   */
  private async checkAchievements(): Promise<string[]> {
    if (!this.userId) return [];

    try {
      // This is a simplified check - full implementation would check all achievement criteria
      // For now, we just return empty array and rely on the existing useAchievements hook
      // which has more comprehensive achievement tracking
      return [];
    } catch (error) {
      console.error('Error checking achievements:', error);
      return [];
    }
  }

  /**
   * Calculate level from total XP
   */
  private getLevelFromXp(totalXp: number): number {
    // Level formula: Each level requires 100 * level XP
    // Level 1: 0-99 XP, Level 2: 100-299 XP, Level 3: 300-599 XP, etc.
    let level = 1;
    let xpRequired = 0;
    
    while (totalXp >= xpRequired) {
      xpRequired += level * 100;
      if (totalXp >= xpRequired) {
        level++;
      }
    }
    
    return level;
  }

  /**
   * Calculate XP needed to reach next level
   */
  private getXpToNextLevel(totalXp: number): number {
    const currentLevel = this.getLevelFromXp(totalXp);
    let xpRequired = 0;
    
    for (let i = 1; i <= currentLevel; i++) {
      xpRequired += i * 100;
    }
    
    return xpRequired - totalXp;
  }

  /**
   * Map GamificationSource to XpSource for coin conversion
   */
  private mapSourceToXpSource(source: GamificationSource): XpSource {
    switch (source) {
      case GamificationSource.MODULE_COMPLETION:
        return XpSource.MODULE;
      case GamificationSource.QUIZ:
        return XpSource.QUIZ;
      case GamificationSource.ACTIVITY:
        return XpSource.ACTIVITY;
      case GamificationSource.LESSON:
        return XpSource.LESSON;
      case GamificationSource.STORY:
        return XpSource.STORY;
      case GamificationSource.MARKET_PREDICTION:
        return XpSource.MARKET;
      case GamificationSource.ACHIEVEMENT:
        return XpSource.ACHIEVEMENT;
      case GamificationSource.BAMBOO_EMPIRE:
      case GamificationSource.OTHER:
      default:
        return XpSource.OTHER;
    }
  }
}

/**
 * Factory function to create a GamificationService instance
 */
export async function createGamificationService(userId: string | null): Promise<GamificationService> {
  if (!userId) {
    return new GamificationService(null);
  }

  try {
    // Fetch user's current streak for multiplier calculation
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_streak')
      .eq('id', userId)
      .maybeSingle();

    return new GamificationService(userId, profile?.current_streak || 0);
  } catch (error) {
    console.error('Error creating gamification service:', error);
    return new GamificationService(userId);
  }
}
