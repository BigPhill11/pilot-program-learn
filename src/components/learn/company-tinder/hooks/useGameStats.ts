import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface GameStats {
  totalXP: number;
  swipeCount: number;
  likeCount: number;
  superLikeCount: number;
  passCount: number;
  currentStreak: number;
  superLikesRemaining: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const INITIAL_STATS: GameStats = {
  totalXP: 0,
  swipeCount: 0,
  likeCount: 0,
  superLikeCount: 0,
  passCount: 0,
  currentStreak: 0,
  superLikesRemaining: 5,
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_swipe',
    name: 'First Swipe',
    description: 'Complete your first swipe',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'speed_dater',
    name: 'Speed Dater',
    description: 'Complete the tutorial',
    icon: '💘',
    unlocked: false,
  },
  {
    id: 'century_club',
    name: 'Century Club',
    description: 'Swipe on 100 companies',
    icon: '💯',
    unlocked: false,
  },
];

export const useGameStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    } else {
      // Load from localStorage for non-authenticated users
      const savedStats = localStorage.getItem('tinderGameStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      const savedAchievements = localStorage.getItem('tinderAchievements');
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements));
      }
      setLoading(false);
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;

    try {
      // Get swipe counts
      const { data: interactions, error } = await supabase
        .from('user_company_interactions')
        .select('interaction_type')
        .eq('user_id', user.id);

      if (error) throw error;

      const likeCount = interactions?.filter(i => i.interaction_type === 'like').length || 0;
      const superLikeCount = interactions?.filter(i => i.interaction_type === 'super_like').length || 0;
      const passCount = interactions?.filter(i => i.interaction_type === 'dislike').length || 0;
      
      // Calculate XP based on counts (simplified)
      const totalXP = (likeCount * 10) + (superLikeCount * 25) + (passCount * 5);

      setStats({
        totalXP,
        swipeCount: interactions?.length || 0,
        likeCount,
        superLikeCount,
        passCount,
        currentStreak: 0, // TODO: Calculate from dates
        superLikesRemaining: Math.max(0, 5 - superLikeCount),
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const addXP = (amount: number) => {
    setStats(prev => {
      const newStats = { ...prev, totalXP: prev.totalXP + amount };
      if (!user) {
        localStorage.setItem('tinderGameStats', JSON.stringify(newStats));
      }
      return newStats;
    });
  };

  const incrementStat = (statKey: keyof GameStats, amount: number = 1) => {
    setStats(prev => {
      const newStats = { ...prev, [statKey]: (prev[statKey] as number) + amount };
      if (!user) {
        localStorage.setItem('tinderGameStats', JSON.stringify(newStats));
      }
      return newStats;
    });
  };

  const unlockAchievement = async (achievementId: string) => {
    setAchievements(prev => {
      const newAchievements = prev.map(a => 
        a.id === achievementId ? { ...a, unlocked: true } : a
      );
      if (!user) {
        localStorage.setItem('tinderAchievements', JSON.stringify(newAchievements));
      }
      return newAchievements;
    });

    if (user) {
      try {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_id: achievementId,
        });
      } catch (error) {
        console.error('Error saving achievement:', error);
      }
    }
  };

  const checkAchievements = () => {
    // First Swipe
    if (stats.swipeCount >= 1 && !achievements.find(a => a.id === 'first_swipe')?.unlocked) {
      unlockAchievement('first_swipe');
    }

    // Century Club
    if (stats.swipeCount >= 100 && !achievements.find(a => a.id === 'century_club')?.unlocked) {
      unlockAchievement('century_club');
    }
  };

  useEffect(() => {
    if (!loading) {
      checkAchievements();
    }
  }, [stats.swipeCount, loading]);

  return {
    stats,
    achievements,
    loading,
    addXP,
    incrementStat,
    unlockAchievement,
  };
};
