
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ProgressData } from '@/types/progress';

export const useQuizProgress = (
  progress: ProgressData,
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>,
  checkLevelUp: (totalPoints: number) => Promise<void>
) => {
  const { user } = useAuth();

  const updateQuizScore = async (topicId: string, isCorrect: boolean) => {
    if (!user) return;

    const newQuizScores = {
      ...progress.quiz_scores,
      [topicId]: isCorrect
    };

    // Updated point system: 5 points for correct answers
    const pointsEarned = isCorrect ? 5 : 0;
    const newTotalPoints = progress.total_points + pointsEarned;
    const newEngagementScore = progress.engagement_score + 2;

    try {
      const { error } = await supabase
        .from('user_progress')
        .update({
          quiz_scores: newQuizScores,
          total_points: newTotalPoints,
          engagement_score: newEngagementScore,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        quiz_scores: newQuizScores,
        total_points: newTotalPoints,
        engagement_score: newEngagementScore
      }));

      if (isCorrect) {
        toast.success(`+${pointsEarned} points! Great job! 🎉`);
      }

      // Check for level up
      await checkLevelUp(newTotalPoints);
    } catch (error) {
      console.error('Error updating quiz score:', error);
      toast.error('Failed to save progress');
    }
  };

  return { updateQuizScore };
};
