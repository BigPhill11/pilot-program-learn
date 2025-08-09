import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ProgressData {
  quiz_scores: Record<string, boolean>;
  learning_progress: number;
  engagement_score: number;
  total_points: number;
  level_progress: number;
  achievements: string[];
  completed_activities: string[];
}

export const useProgressTracking = () => {
  const { user, profile } = useAuth();
  const [progress, setProgress] = useState<ProgressData>({
    quiz_scores: {},
    learning_progress: 0,
    engagement_score: 0,
    total_points: 0,
    level_progress: 0,
    achievements: [],
    completed_activities: []
  });
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  // Apply streak multiplier: +5% per day, capped at +50%
  const applyStreakMultiplier = (basePoints: number) => {
    const streak = profile?.current_streak || 0;
    const multiplier = Math.min(streak * 0.05, 0.5);
    return Math.round(basePoints * (1 + multiplier));
  };

  const fetchProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching progress:', error);
        return;
      }

      if (data) {
        setProgress({
          quiz_scores: (data.quiz_scores as Record<string, boolean>) || {},
          learning_progress: data.learning_progress || 0,
          engagement_score: data.engagement_score || 0,
          total_points: data.total_points || 0,
          level_progress: data.level_progress || 0,
          achievements: Array.isArray(data.achievements) ? (data.achievements as string[]) : [],
          completed_activities: Array.isArray(data.achievements) ? (data.achievements as string[]) : []
        });
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateActivityComplete = async (activityId: string, pointsEarned: number = 10) => {
    if (!user) return;

    const basePoints = pointsEarned;
    const earnedPoints = applyStreakMultiplier(basePoints);
    const streakPercent = Math.min((profile?.current_streak || 0) * 5, 50);

    const newCompletedActivities = progress.completed_activities.includes(activityId) 
      ? progress.completed_activities 
      : [...progress.completed_activities, activityId];
    
    const newTotalPoints = progress.completed_activities.includes(activityId) 
      ? progress.total_points 
      : progress.total_points + earnedPoints;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          achievements: newCompletedActivities,
          total_points: newTotalPoints,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        completed_activities: newCompletedActivities,
        total_points: newTotalPoints
      }));

      if (!progress.completed_activities.includes(activityId)) {
        if (streakPercent > 0) {
          toast.success(`+${earnedPoints} points! (+${streakPercent}% streak bonus) 🎉`);
        } else {
          toast.success(`+${earnedPoints} points! Activity completed! 🎉`);
        }
      }

      await checkLevelUp(newTotalPoints);
    } catch (error) {
      console.error('Error updating activity completion:', error);
      toast.error('Failed to save progress');
    }
  };

  const updateQuizScore = async (topicId: string, isCorrect: boolean) => {
    if (!user) return;

    const newQuizScores = {
      ...progress.quiz_scores,
      [topicId]: isCorrect
    };

    const basePoints = isCorrect ? 5 : 0;
    const earnedPoints = applyStreakMultiplier(basePoints);
    const streakPercent = Math.min((profile?.current_streak || 0) * 5, 50);
    const newTotalPoints = progress.total_points + earnedPoints;
    const newEngagementScore = progress.engagement_score + 2;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          quiz_scores: newQuizScores,
          total_points: newTotalPoints,
          engagement_score: newEngagementScore,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        quiz_scores: newQuizScores,
        total_points: newTotalPoints,
        engagement_score: newEngagementScore
      }));

      if (isCorrect) {
        if (streakPercent > 0) {
          toast.success(`+${earnedPoints} points! Correct! (+${streakPercent}% streak bonus) 🎉`);
        } else {
          toast.success(`+${earnedPoints} points! Great job! 🎉`);
        }
      }

      await checkLevelUp(newTotalPoints);
    } catch (error) {
      console.error('Error updating quiz score:', error);
      toast.error('Failed to save progress');
    }
  };

  const updateMarketPrediction = async () => {
    if (!user) return;

    const basePoints = 15; // 15 points for market predictions
    const earnedPoints = applyStreakMultiplier(basePoints);
    const streakPercent = Math.min((profile?.current_streak || 0) * 5, 50);
    const newTotalPoints = progress.total_points + earnedPoints;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          total_points: newTotalPoints,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        total_points: newTotalPoints
      }));

      if (streakPercent > 0) {
        toast.success(`+${earnedPoints} points for market prediction! (+${streakPercent}% streak bonus) 📈`);
      } else {
        toast.success(`+${earnedPoints} points for market prediction! 📈`);
      }
      
      // Check for level up
      await checkLevelUp(newTotalPoints);
    } catch (error) {
      console.error('Error updating market prediction points:', error);
    }
  };

  const checkLevelUp = async (totalPoints: number) => {
    if (!user) return;

    const currentLevel = Math.floor(totalPoints / 200) + 1;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          current_level: currentLevel,
          points_to_next_level: 200 - (totalPoints % 200),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Check if user leveled up
      const previousLevel = Math.floor((totalPoints - 5) / 200) + 1; // Assuming last action was worth 5 points
      if (currentLevel > previousLevel) {
        toast.success(`🎉 Level Up! You're now Level ${currentLevel}! 🎉`);
      }
    } catch (error) {
      console.error('Error checking level up:', error);
    }
  };

  const updateLearningProgress = async (increment: number = 1) => {
    if (!user) return;

    const newLearningProgress = Math.min(progress.learning_progress + increment, 100);

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          learning_progress: newLearningProgress,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        learning_progress: newLearningProgress
      }));
    } catch (error) {
      console.error('Error updating learning progress:', error);
    }
  };

  return {
    progress,
    loading,
    updateQuizScore,
    updateMarketPrediction,
    updateLearningProgress,
    updateActivityComplete,
    refreshProgress: fetchProgress
  };
};
