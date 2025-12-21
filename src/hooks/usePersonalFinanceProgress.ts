import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ModuleProgress, ModuleStatus } from '@/types/personal-finance';

const STORAGE_KEY = 'personal-finance-progress';

export const usePersonalFinanceProgress = () => {
  const { user } = useAuth();
  const [moduleProgress, setModuleProgress] = useState<Record<string, ModuleProgress>>({});
  const [loading, setLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    try {
      if (user) {
        const { data } = await supabase
          .from('module_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('module_type', 'personal-finance');

        if (data && data.length > 0) {
          const progress: Record<string, ModuleProgress> = {};
          data.forEach((item) => {
            const detailed = item.detailed_progress as Record<string, unknown> || {};
            progress[item.module_id] = {
              moduleId: item.module_id,
              status: (detailed.status as ModuleStatus) || 'locked',
              completedLessons: (detailed.completedLessons as string[]) || [],
              testedOut: (detailed.testedOut as boolean) || false,
              xpEarned: (detailed.xpEarned as number) || 0,
              coinsEarned: (detailed.coinsEarned as number) || 0,
            };
          });
          setModuleProgress(progress);
          setLoading(false);
          return;
        }
      }

      // Fallback to localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setModuleProgress(JSON.parse(stored));
      } else {
        // Initialize with first module unlocked
        setModuleProgress({
          income: {
            moduleId: 'income',
            status: 'unlocked',
            completedLessons: [],
            testedOut: false,
            xpEarned: 0,
            coinsEarned: 0,
          },
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const saveProgress = useCallback(async (newProgress: Record<string, ModuleProgress>) => {
    setModuleProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));

    if (user) {
      try {
        for (const [moduleId, progress] of Object.entries(newProgress)) {
          await supabase.from('module_progress').upsert({
            user_id: user.id,
            module_id: moduleId,
            module_type: 'personal-finance',
            progress_percentage: progress.status === 'completed' ? 100 : (progress.completedLessons.length / 5) * 100,
            detailed_progress: progress,
            completed_at: progress.status === 'completed' ? new Date().toISOString() : null,
          }, { onConflict: 'user_id,module_id' });
        }
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [user]);

  const updateModuleStatus = useCallback((moduleId: string, status: ModuleStatus) => {
    const newProgress = {
      ...moduleProgress,
      [moduleId]: {
        ...moduleProgress[moduleId],
        moduleId,
        status,
        completedLessons: moduleProgress[moduleId]?.completedLessons || [],
        testedOut: moduleProgress[moduleId]?.testedOut || false,
        xpEarned: moduleProgress[moduleId]?.xpEarned || 0,
        coinsEarned: moduleProgress[moduleId]?.coinsEarned || 0,
      },
    };
    saveProgress(newProgress);
  }, [moduleProgress, saveProgress]);

  const completeLesson = useCallback((moduleId: string, lessonId: string, xp: number, coins: number) => {
    const current = moduleProgress[moduleId] || {
      moduleId,
      status: 'active' as ModuleStatus,
      completedLessons: [],
      testedOut: false,
      xpEarned: 0,
      coinsEarned: 0,
    };

    const completedLessons = [...new Set([...current.completedLessons, lessonId])];
    const isModuleComplete = completedLessons.length >= 5;

    const newProgress = {
      ...moduleProgress,
      [moduleId]: {
        ...current,
        status: isModuleComplete ? 'completed' as ModuleStatus : 'active' as ModuleStatus,
        completedLessons,
        xpEarned: current.xpEarned + xp,
        coinsEarned: current.coinsEarned + coins,
      },
    };

    saveProgress(newProgress);
  }, [moduleProgress, saveProgress]);

  const handleTestOut = useCallback((moduleId: string, passed: boolean) => {
    if (passed) {
      const newProgress = {
        ...moduleProgress,
        [moduleId]: {
          moduleId,
          status: 'unlocked' as ModuleStatus,
          completedLessons: [],
          testedOut: true,
          xpEarned: 200,
          coinsEarned: 20,
        },
      };
      saveProgress(newProgress);
    }
  }, [moduleProgress, saveProgress]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    moduleProgress,
    loading,
    updateModuleStatus,
    completeLesson,
    handleTestOut,
    refresh: loadProgress,
  };
};
