import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useLessonCompletions } from '@/hooks/useLessonCompletions';

interface ConsultingModuleProgress {
  level: number;
  overviewCompleted: boolean;
  termsProgress: {
    totalTerms: number;
    masteredTerms: string[];
    completionPercentage: number;
  };
  miniGamesProgress: {
    [gameId: string]: {
      completed: boolean;
      score: number;
      completedAt: string;
      attempts: number;
    };
  };
  totalProgress: number;
  lastAccessed: string;
}

export const useConsultingProgress = () => {
  const { user } = useAuth();
  const { markLessonComplete, isLevelComplete, isLevelAvailable } = useLessonCompletions('management-consulting');
  const [moduleProgress, setModuleProgress] = useState<Record<number, ConsultingModuleProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAllProgress();
    }
  }, [user]);

  const loadAllProgress = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // First, try to load from Supabase
      const { data: supabaseData, error } = await supabase
        .from('consulting_module_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading from Supabase:', error);
      }

      // Load progress for all levels (1-7)
      const allProgress: Record<number, ConsultingModuleProgress> = {};
      
      for (let level = 1; level <= 7; level++) {
        // Check Supabase data first
        const supabaseRecord = supabaseData?.find(record => record.level === level);
        
        if (supabaseRecord) {
          allProgress[level] = {
            level,
            overviewCompleted: supabaseRecord.overview_completed,
            termsProgress: supabaseRecord.terms_progress as any,
            miniGamesProgress: supabaseRecord.mini_games_progress as any,
            totalProgress: supabaseRecord.total_progress,
            lastAccessed: supabaseRecord.last_accessed
          };
        } else {
          // Fallback to localStorage
          const storageKey = `consulting_progress_${user.id}_level_${level}`;
          const saved = localStorage.getItem(storageKey);
          
          if (saved) {
            allProgress[level] = JSON.parse(saved);
          } else {
            allProgress[level] = createEmptyProgress(level);
          }
        }
      }
      
      setModuleProgress(allProgress);
    } catch (error) {
      console.error('Error loading consulting progress:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createEmptyProgress = (level: number): ConsultingModuleProgress => ({
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

  const saveModuleProgress = useCallback(async (level: number, updates: Partial<ConsultingModuleProgress>) => {
    if (!user) return;

    const currentProgress = moduleProgress[level] || createEmptyProgress(level);
    const updatedProgress = {
      ...currentProgress,
      ...updates,
      lastAccessed: new Date().toISOString()
    };

    // Calculate total progress
    const overviewWeight = 20; // 20%
    const termsWeight = 40; // 40%
    const miniGamesWeight = 40; // 40%

    const overviewProgress = updatedProgress.overviewCompleted ? 100 : 0;
    const termsProgress = updatedProgress.termsProgress.completionPercentage;
    
    // Calculate mini-games progress
    const gameIds = Object.keys(updatedProgress.miniGamesProgress);
    const completedGames = gameIds.filter(id => updatedProgress.miniGamesProgress[id].completed).length;
    const miniGamesProgress = gameIds.length > 0 ? (completedGames / gameIds.length) * 100 : 0;

    updatedProgress.totalProgress = Math.round(
      (overviewProgress * overviewWeight / 100) +
      (termsProgress * termsWeight / 100) +
      (miniGamesProgress * miniGamesWeight / 100)
    );

    // Save to state first
    setModuleProgress(prev => ({
      ...prev,
      [level]: updatedProgress
    }));

    try {
      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from('consulting_module_progress')
        .upsert({
          user_id: user.id,
          level,
          overview_completed: updatedProgress.overviewCompleted,
          terms_progress: updatedProgress.termsProgress,
          mini_games_progress: updatedProgress.miniGamesProgress,
          total_progress: updatedProgress.totalProgress,
          last_accessed: updatedProgress.lastAccessed
        }, {
          onConflict: 'user_id,level'
        });

      if (supabaseError) {
        console.error('Error saving to Supabase:', supabaseError);
      }

      // Save to localStorage as backup
      const storageKey = `consulting_progress_${user.id}_level_${level}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedProgress));

      // Check if module is 100% complete
      if (updatedProgress.totalProgress >= 100) {
        await markLessonComplete(level);
        console.log(`Consulting level ${level} completed with ${updatedProgress.totalProgress}% progress`);
      }
    } catch (error) {
      console.error('Error saving module progress:', error);
    }
  }, [user, moduleProgress, markLessonComplete]);

  const markOverviewComplete = useCallback((level: number) => {
    saveModuleProgress(level, { overviewCompleted: true });
  }, [saveModuleProgress]);

  const updateTermsProgress = useCallback((level: number, masteredTerms: string[], totalTerms: number) => {
    const completionPercentage = totalTerms > 0 ? Math.round((masteredTerms.length / totalTerms) * 100) : 0;
    
    saveModuleProgress(level, {
      termsProgress: {
        totalTerms,
        masteredTerms,
        completionPercentage
      }
    });
  }, [saveModuleProgress]);

  const saveMiniGameProgress = useCallback((level: number, gameId: string, score: number, completed: boolean = true) => {
    const currentProgress = moduleProgress[level] || createEmptyProgress(level);
    const currentGameProgress = currentProgress.miniGamesProgress[gameId];
    
    const updatedMiniGamesProgress = {
      ...currentProgress.miniGamesProgress,
      [gameId]: {
        completed,
        score,
        completedAt: new Date().toISOString(),
        attempts: currentGameProgress ? currentGameProgress.attempts + 1 : 1
      }
    };

    saveModuleProgress(level, {
      miniGamesProgress: updatedMiniGamesProgress
    });
  }, [moduleProgress, saveModuleProgress]);

  const getLevelProgress = useCallback((level: number): ConsultingModuleProgress => {
    return moduleProgress[level] || createEmptyProgress(level);
  }, [moduleProgress]);

  const isGameCompleted = (level: number, gameId: string): boolean => {
    const progress = getLevelProgress(level);
    return progress.miniGamesProgress[gameId]?.completed || false;
  };

  const getGameScore = (level: number, gameId: string): number => {
    const progress = getLevelProgress(level);
    return progress.miniGamesProgress[gameId]?.score || 0;
  };

  const getTotalCompletedLevels = (): number => {
    return Object.values(moduleProgress).filter(p => p.totalProgress >= 100).length;
  };

  const getOverallProgress = (): number => {
    const totalLevels = 7;
    const completedLevels = getTotalCompletedLevels();
    return Math.round((completedLevels / totalLevels) * 100);
  };

  return {
    moduleProgress,
    loading,
    markOverviewComplete,
    updateTermsProgress,
    saveMiniGameProgress,
    getLevelProgress,
    isGameCompleted,
    getGameScore,
    getTotalCompletedLevels,
    getOverallProgress,
    isLevelComplete,
    isLevelAvailable,
    refetch: loadAllProgress
  };
};