import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ModuleResponse {
  questionId: string;
  question: string;
  selectedAnswer: number;
  answerText: string;
  isCorrect: boolean;
  timestamp: string;
}

interface GameScore {
  gameType: string;
  score: number;
  maxScore: number;
  timestamp: string;
}

interface ModuleProgress {
  id?: string;
  userId: string;
  courseId: string;
  moduleId: string;
  moduleTitle: string;
  responses: ModuleResponse[];
  gameScores: Record<string, GameScore>;
  completionPercentage: number;
  timeSpentMinutes: number;
  completedAt?: string;
}

export const useSoftSkillsProgress = (courseId: string, moduleId: string, moduleTitle: string) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ModuleProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user, courseId, moduleId]);

  const loadProgress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('soft_skills_module_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('module_id', moduleId)
        .maybeSingle();

      if (error) {
        console.error('Error loading progress:', error);
        // Initialize new progress on error
        setProgress({
          userId: user.id,
          courseId,
          moduleId,
          moduleTitle,
          responses: [],
          gameScores: {},
          completionPercentage: 0,
          timeSpentMinutes: 0
        });
      } else if (data) {
        setProgress({
          id: data.id,
          userId: data.user_id,
          courseId: data.course_id,
          moduleId: data.module_id,
          moduleTitle: data.module_title,
          responses: Array.isArray(data.responses) ? data.responses as unknown as ModuleResponse[] : [],
          gameScores: (data.game_scores as unknown as Record<string, GameScore>) || {},
          completionPercentage: data.completion_percentage,
          timeSpentMinutes: data.time_spent_minutes,
          completedAt: data.completed_at
        });
      } else {
        // Initialize new progress
        setProgress({
          userId: user.id,
          courseId,
          moduleId,
          moduleTitle,
          responses: [],
          gameScores: {},
          completionPercentage: 0,
          timeSpentMinutes: 0
        });
      }
    } catch (error) {
      console.error('Error in loadProgress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveResponse = async (questionId: string, question: string, selectedAnswer: number, answerText: string, isCorrect: boolean) => {
    if (!user || !progress) return;

    const newResponse: ModuleResponse = {
      questionId,
      question,
      selectedAnswer,
      answerText,
      isCorrect,
      timestamp: new Date().toISOString()
    };

    const updatedResponses = [...progress.responses.filter(r => r.questionId !== questionId), newResponse];
    
    const updatedProgress = {
      ...progress,
      responses: updatedResponses
    };

    setProgress(updatedProgress);
    await saveToDatabase(updatedProgress);
  };

  const saveGameScore = async (gameType: string, score: number, maxScore: number) => {
    if (!user || !progress) return;

    const gameScore: GameScore = {
      gameType,
      score,
      maxScore,
      timestamp: new Date().toISOString()
    };

    const updatedProgress = {
      ...progress,
      gameScores: {
        ...progress.gameScores,
        [gameType]: gameScore
      }
    };

    setProgress(updatedProgress);
    await saveToDatabase(updatedProgress);
  };

  const updateCompletionPercentage = async (percentage: number) => {
    if (!user || !progress) return;

    const updatedProgress = {
      ...progress,
      completionPercentage: percentage
    };

    setProgress(updatedProgress);
    await saveToDatabase(updatedProgress);
  };

  const completeModule = async () => {
    if (!user || !progress) return;

    const timeSpent = Math.round((Date.now() - startTime) / (1000 * 60)); // minutes
    
    const updatedProgress = {
      ...progress,
      completionPercentage: 100,
      timeSpentMinutes: progress.timeSpentMinutes + timeSpent,
      completedAt: new Date().toISOString()
    };

    setProgress(updatedProgress);
    await saveToDatabase(updatedProgress);
  };

  const saveToDatabase = async (progressData: ModuleProgress) => {
    if (!user) return;

    try {
      const dataToSave = {
        user_id: progressData.userId,
        course_id: progressData.courseId,
        module_id: progressData.moduleId,
        module_title: progressData.moduleTitle,
        responses: progressData.responses as any,
        game_scores: progressData.gameScores as any,
        completion_percentage: progressData.completionPercentage,
        time_spent_minutes: progressData.timeSpentMinutes,
        completed_at: progressData.completedAt || null
      };

      if (progressData.id) {
        const { error } = await supabase
          .from('soft_skills_module_progress')
          .update(dataToSave)
          .eq('id', progressData.id);

        if (error) {
          console.error('Error updating progress:', error);
          // Try to continue without throwing
        }
      } else {
        const { data, error } = await supabase
          .from('soft_skills_module_progress')
          .upsert(dataToSave, {
            onConflict: 'user_id,course_id,module_id'
          })
          .select()
          .maybeSingle();

        if (error) {
          console.error('Error inserting progress:', error);
          // Try to continue without throwing
        } else if (data) {
          setProgress(prev => prev ? { ...prev, id: data.id } : null);
        }
      }
    } catch (error) {
      console.error('Error saving to database:', error);
      // Don't throw - allow the app to continue
    }
  };

  const getProgressHistory = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('soft_skills_module_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading progress history:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getProgressHistory:', error);
      return [];
    }
  };

  return {
    progress,
    loading,
    saveResponse,
    saveGameScore,
    updateCompletionPercentage,
    completeModule,
    getProgressHistory
  };
};