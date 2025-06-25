
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ProgressData } from '@/types/progress';

export const useLearningProgress = (
  progress: ProgressData,
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>,
  checkLevelUp: (totalPoints: number) => Promise<void>
) => {
  const { user } = useAuth();

  const updateLearningProgress = async (pointsToAdd: number = 1) => {
    if (!user) return;

    // For module completion, add points instead of just incrementing learning progress
    const newTotalPoints = progress.total_points + pointsToAdd;
    const newLearningProgress = Math.min(progress.learning_progress + 1, 100);

    try {
      const { error } = await supabase
        .from('user_progress')
        .update({
          learning_progress: newLearningProgress,
          total_points: newTotalPoints,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        learning_progress: newLearningProgress,
        total_points: newTotalPoints
      }));

      // Check for level up
      await checkLevelUp(newTotalPoints);
    } catch (error) {
      console.error('Error updating learning progress:', error);
    }
  };

  return { updateLearningProgress };
};
