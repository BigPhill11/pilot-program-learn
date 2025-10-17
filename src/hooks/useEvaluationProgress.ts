import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface ModuleProgress {
  lessonNumber: number;
  moduleNumber: string;
  completed: boolean;
  quizScore?: number;
  timeSpent?: number;
  completedAt?: string;
}

export interface LessonProgress {
  lessonNumber: number;
  modulesCompleted: number;
  totalModules: number;
  completed: boolean;
  badgeEarned: boolean;
}

export const useEvaluationProgress = () => {
  const { user } = useAuth();
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProgress = async () => {
    if (!user) {
      // Load from localStorage for non-authenticated users
      const saved = localStorage.getItem('evaluation_progress');
      if (saved) {
        setModuleProgress(JSON.parse(saved));
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_evaluation_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      if (data) {
        const formatted: ModuleProgress[] = data.map(item => ({
          lessonNumber: item.lesson_number,
          moduleNumber: item.module_number,
          completed: item.completed,
          quizScore: item.quiz_score,
          timeSpent: item.time_spent_seconds,
          completedAt: item.completed_at
        }));
        setModuleProgress(formatted);
      }
    } catch (error) {
      console.error('Error loading evaluation progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (progress: ModuleProgress) => {
    const updated = moduleProgress.filter(
      m => !(m.lessonNumber === progress.lessonNumber && m.moduleNumber === progress.moduleNumber)
    );
    updated.push(progress);
    setModuleProgress(updated);

    if (!user) {
      localStorage.setItem('evaluation_progress', JSON.stringify(updated));
      return;
    }

    try {
      const { error } = await supabase
        .from('user_evaluation_progress')
        .upsert({
          user_id: user.id,
          lesson_number: progress.lessonNumber,
          module_number: progress.moduleNumber,
          completed: progress.completed,
          quiz_score: progress.quizScore,
          time_spent_seconds: progress.timeSpent,
          completed_at: progress.completedAt || new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_number,module_number'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving evaluation progress:', error);
    }
  };

  const getModuleProgress = (lessonNumber: number, moduleNumber: string): ModuleProgress | null => {
    return moduleProgress.find(
      m => m.lessonNumber === lessonNumber && m.moduleNumber === moduleNumber
    ) || null;
  };

  const getLessonProgress = (lessonNumber: number, totalModules: number): LessonProgress => {
    const lessonModules = moduleProgress.filter(m => m.lessonNumber === lessonNumber);
    const completed = lessonModules.filter(m => m.completed);

    return {
      lessonNumber,
      modulesCompleted: completed.length,
      totalModules,
      completed: completed.length === totalModules && totalModules > 0,
      badgeEarned: completed.length === totalModules && totalModules > 0
    };
  };

  const getTotalProgress = (): { completed: number; total: number; percentage: number } => {
    const total = 9; // 3 lessons × 3 modules each
    const completed = moduleProgress.filter(m => m.completed).length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const isLessonUnlocked = (lessonNumber: number): boolean => {
    if (lessonNumber === 1) return true; // First lesson always unlocked
    
    // Lesson unlocked if previous lesson is completed
    const prevLesson = getLessonProgress(lessonNumber - 1, 3);
    return prevLesson.completed;
  };

  const isModuleUnlocked = (lessonNumber: number, moduleNumber: string): boolean => {
    const modNum = parseFloat(moduleNumber);
    
    // First module of unlocked lesson is always available
    if (modNum === Math.floor(modNum) + 0.1) {
      return isLessonUnlocked(lessonNumber);
    }

    // Check if previous module in same lesson is completed
    const prevModNum = (Math.floor(modNum) + (Math.round((modNum % 1) * 10) - 1) / 10).toFixed(1);
    const prevModule = getModuleProgress(lessonNumber, prevModNum);
    return prevModule?.completed || false;
  };

  const allLessonsCompleted = (): boolean => {
    return getTotalProgress().completed === 9;
  };

  useEffect(() => {
    loadProgress();
  }, [user]);

  return {
    moduleProgress,
    loading,
    saveProgress,
    getModuleProgress,
    getLessonProgress,
    getTotalProgress,
    isLessonUnlocked,
    isModuleUnlocked,
    allLessonsCompleted,
    refreshProgress: loadProgress
  };
};
