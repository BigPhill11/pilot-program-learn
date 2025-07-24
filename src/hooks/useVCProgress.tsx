import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLessonCompletions } from '@/hooks/useLessonCompletions';

interface VCModuleProgress {
  level: number;
  overviewCompleted: boolean;
  termsProgress: {
    totalTerms: number;
    masteredTerms: number[];
    completionPercentage: number;
  };
  miniGamesProgress: { [gameId: string]: { completed: boolean; score: number } };
  totalProgress: number;
  lastAccessed: string;
}

export const useVCProgress = () => {
  const [moduleProgress, setModuleProgress] = useState<{ [level: number]: VCModuleProgress }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { markLessonComplete } = useLessonCompletions('venture-capital');

  const loadAllProgress = useCallback(async () => {
    if (!user) {
      // Load from localStorage if not authenticated
      const savedProgress = localStorage.getItem('vc_progress');
      if (savedProgress) {
        setModuleProgress(JSON.parse(savedProgress));
      }
      setIsLoading(false);
      return;
    }

    try {
      // Note: Using any to bypass TypeScript issues until types are regenerated
      const { data, error } = await (supabase as any)
        .from('vc_module_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const progressMap: { [level: number]: VCModuleProgress } = {};
      data?.forEach((item: any) => {
        progressMap[item.level] = {
          level: item.level,
          overviewCompleted: item.overview_completed,
          termsProgress: item.terms_progress,
          miniGamesProgress: item.mini_games_progress,
          totalProgress: item.total_progress,
          lastAccessed: item.last_accessed
        };
      });

      setModuleProgress(progressMap);
    } catch (error) {
      console.error('Error loading VC progress:', error);
      // Fallback to localStorage
      const savedProgress = localStorage.getItem('vc_progress');
      if (savedProgress) {
        setModuleProgress(JSON.parse(savedProgress));
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadAllProgress();
  }, [loadAllProgress]);

  const createEmptyProgress = (level: number): VCModuleProgress => ({
    level,
    overviewCompleted: false,
    termsProgress: {
      totalTerms: 0,
      masteredTerms: [],
      completionPercentage: 0
    },
    miniGamesProgress: {},
    totalProgress: 0,
    lastAccessed: new Date().toISOString()
  });

  const calculateTotalProgress = (progress: VCModuleProgress): number => {
    const overviewWeight = 20;
    const termsWeight = 40;
    const gamesWeight = 40;

    const overviewScore = progress.overviewCompleted ? overviewWeight : 0;
    const termsScore = (progress.termsProgress.completionPercentage / 100) * termsWeight;
    
    const gameKeys = Object.keys(progress.miniGamesProgress);
    const completedGames = gameKeys.filter(key => progress.miniGamesProgress[key].completed).length;
    const gamesScore = gameKeys.length > 0 ? (completedGames / gameKeys.length) * gamesWeight : 0;

    return Math.round(overviewScore + termsScore + gamesScore);
  };

  const saveModuleProgress = async (level: number, updates: Partial<VCModuleProgress>) => {
    const currentProgress = moduleProgress[level] || createEmptyProgress(level);
    const updatedProgress = { 
      ...currentProgress, 
      ...updates, 
      lastAccessed: new Date().toISOString() 
    };
    
    updatedProgress.totalProgress = calculateTotalProgress(updatedProgress);

    setModuleProgress(prev => ({
      ...prev,
      [level]: updatedProgress
    }));

    // Save to localStorage
    const newProgressMap = { ...moduleProgress, [level]: updatedProgress };
    localStorage.setItem('vc_progress', JSON.stringify(newProgressMap));

    if (!user) return;

    try {
      // Note: Using any to bypass TypeScript issues until types are regenerated
      const { error } = await (supabase as any)
        .from('vc_module_progress')
        .upsert({
          user_id: user.id,
          level,
          overview_completed: updatedProgress.overviewCompleted,
          terms_progress: updatedProgress.termsProgress,
          mini_games_progress: updatedProgress.miniGamesProgress,
          total_progress: updatedProgress.totalProgress,
          last_accessed: updatedProgress.lastAccessed
        }, { onConflict: 'user_id,level' });

      if (error) throw error;

      // Check if module is 100% complete
      if (updatedProgress.totalProgress >= 100) {
        await markLessonComplete(level);
        console.log(`VC level ${level} completed with ${updatedProgress.totalProgress}% progress`);
      }
    } catch (error) {
      console.error('Error saving module progress:', error);
    }
  };

  const markOverviewComplete = async (level: number) => {
    await saveModuleProgress(level, { overviewCompleted: true });
  };

  const updateTermsProgress = async (level: number, termsProgress: VCModuleProgress['termsProgress']) => {
    await saveModuleProgress(level, { termsProgress });
  };

  const saveMiniGameProgress = async (level: number, gameId: string, score: number) => {
    const currentProgress = moduleProgress[level] || createEmptyProgress(level);
    const updatedGamesProgress = {
      ...currentProgress.miniGamesProgress,
      [gameId]: { completed: true, score }
    };
    
    await saveModuleProgress(level, { miniGamesProgress: updatedGamesProgress });
  };

  const getLevelProgress = (level: number): VCModuleProgress => {
    return moduleProgress[level] || createEmptyProgress(level);
  };

  const isGameCompleted = (level: number, gameId: string): boolean => {
    const progress = moduleProgress[level];
    return progress?.miniGamesProgress[gameId]?.completed || false;
  };

  const getGameScore = (level: number, gameId: string): number => {
    const progress = moduleProgress[level];
    return progress?.miniGamesProgress[gameId]?.score || 0;
  };

  const getTotalCompletedLevels = (): number => {
    return Object.values(moduleProgress).filter(p => p.totalProgress >= 100).length;
  };

  const getOverallProgress = (): number => {
    const levels = Object.values(moduleProgress);
    if (levels.length === 0) return 0;
    
    const totalProgress = levels.reduce((sum, level) => sum + level.totalProgress, 0);
    return Math.round(totalProgress / levels.length);
  };

  return {
    moduleProgress: Object.values(moduleProgress).sort((a, b) => a.level - b.level),
    isLoading,
    saveModuleProgress,
    markOverviewComplete,
    updateTermsProgress,
    saveMiniGameProgress,
    getLevelProgress,
    isGameCompleted,
    getGameScore,
    getTotalCompletedLevels,
    getOverallProgress,
    loadAllProgress
  };
};