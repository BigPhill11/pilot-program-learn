import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface ModuleProgress {
  id?: string;
  moduleId: string;
  moduleType: 'soft_skills' | 'career_finance' | 'personal_finance' | 'trading' | 'investment_banking' | 'venture_capital' | 'consulting';
  courseId?: string;
  progressPercentage: number;
  timeSpentMinutes: number;
  lastAccessed: string;
  completedAt?: string;
  detailedProgress: Record<string, any>;
}

interface UseUnifiedProgressOptions {
  moduleId: string;
  moduleType: ModuleProgress['moduleType'];
  courseId?: string;
}

export const useUnifiedProgress = ({ moduleId, moduleType, courseId }: UseUnifiedProgressOptions) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ModuleProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());

  // Create storage key for localStorage fallback
  const getStorageKey = useCallback(() => {
    return `progress_${moduleType}_${moduleId}${courseId ? `_${courseId}` : ''}`;
  }, [moduleType, moduleId, courseId]);

  // Load progress from database or localStorage
  const loadProgress = useCallback(async () => {
    if (!user) {
      // Load from localStorage for non-authenticated users
      const storageKey = getStorageKey();
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        setProgress(createEmptyProgress());
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_id', moduleId)
        .eq('module_type', moduleType)
        .eq('course_id', courseId || '')
        .maybeSingle();

      if (error) {
        console.error('Error loading progress:', error);
        setProgress(createEmptyProgress());
      } else if (data) {
        setProgress({
          id: data.id,
          moduleId: data.module_id,
          moduleType: data.module_type as ModuleProgress['moduleType'],
          courseId: data.course_id || undefined,
          progressPercentage: data.progress_percentage,
          timeSpentMinutes: data.time_spent_minutes,
          lastAccessed: data.last_accessed,
          completedAt: data.completed_at || undefined,
          detailedProgress: (data.detailed_progress as Record<string, any>) || {}
        });
      } else {
        setProgress(createEmptyProgress());
      }
    } catch (error) {
      console.error('Error in loadProgress:', error);
      setProgress(createEmptyProgress());
    } finally {
      setLoading(false);
    }
  }, [user, moduleId, moduleType, courseId, getStorageKey]);

  // Create empty progress object
  const createEmptyProgress = useCallback((): ModuleProgress => ({
    moduleId,
    moduleType,
    courseId,
    progressPercentage: 0,
    timeSpentMinutes: 0,
    lastAccessed: new Date().toISOString(),
    detailedProgress: {}
  }), [moduleId, moduleType, courseId]);

  // Save progress to database and localStorage
  const saveProgress = useCallback(async (updates: Partial<ModuleProgress>) => {
    if (!progress) return;

    const updatedProgress = {
      ...progress,
      ...updates,
      lastAccessed: new Date().toISOString()
    };

    setProgress(updatedProgress);

    // Save to localStorage
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(updatedProgress));

    if (!user) return;

    try {
      const dataToSave = {
        user_id: user.id,
        module_id: updatedProgress.moduleId,
        module_type: updatedProgress.moduleType,
        course_id: updatedProgress.courseId || '',
        progress_percentage: updatedProgress.progressPercentage,
        time_spent_minutes: updatedProgress.timeSpentMinutes,
        last_accessed: updatedProgress.lastAccessed,
        completed_at: updatedProgress.completedAt || null,
        detailed_progress: updatedProgress.detailedProgress
      };

      if (updatedProgress.id) {
        const { error } = await supabase
          .from('module_progress')
          .update(dataToSave)
          .eq('id', updatedProgress.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('module_progress')
          .upsert(dataToSave, {
            onConflict: 'user_id,module_id,module_type,course_id'
          })
          .select()
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setProgress(prev => prev ? { ...prev, id: data.id } : null);
        }
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      // Continue silently - progress is still saved locally
    }
  }, [user, progress, getStorageKey]);

  // Update progress percentage
  const updateProgress = useCallback(async (percentage: number) => {
    const isComplete = percentage >= 100;
    await saveProgress({
      progressPercentage: percentage,
      completedAt: isComplete ? new Date().toISOString() : undefined
    });

    if (isComplete) {
      toast.success('Module completed! 🎉');
    }
  }, [saveProgress]);

  // Update detailed progress (for quizzes, activities, etc.)
  const updateDetailedProgress = useCallback(async (key: string, value: any) => {
    if (!progress) return;
    
    const newDetailedProgress = {
      ...progress.detailedProgress,
      [key]: value
    };

    await saveProgress({
      detailedProgress: newDetailedProgress
    });
  }, [progress, saveProgress]);

  // Mark module as complete
  const completeModule = useCallback(async () => {
    const timeSpent = Math.round((Date.now() - startTime) / (1000 * 60));
    
    await saveProgress({
      progressPercentage: 100,
      timeSpentMinutes: (progress?.timeSpentMinutes || 0) + timeSpent,
      completedAt: new Date().toISOString()
    });
  }, [saveProgress, startTime, progress]);

  // Add time spent
  const addTimeSpent = useCallback(async (minutes: number) => {
    await saveProgress({
      timeSpentMinutes: (progress?.timeSpentMinutes || 0) + minutes
    });
  }, [saveProgress, progress]);

  // Reset progress
  const resetProgress = useCallback(async () => {
    await saveProgress({
      progressPercentage: 0,
      timeSpentMinutes: 0,
      completedAt: undefined,
      detailedProgress: {}
    });
  }, [saveProgress]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Auto-save time spent every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / (1000 * 60));
      if (timeSpent > 0) {
        addTimeSpent(Math.min(timeSpent, 5)); // Cap at 5 minutes per save
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [addTimeSpent, startTime]);

  return {
    progress,
    loading,
    updateProgress,
    updateDetailedProgress,
    completeModule,
    addTimeSpent,
    resetProgress,
    refresh: loadProgress,
    isCompleted: progress?.progressPercentage === 100,
    timeSpent: progress?.timeSpentMinutes || 0
  };
};