
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ProgressData } from '@/types/progress';

export const useSoftSkillsProgress = (
  progress: ProgressData,
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>,
  checkLevelUp: (totalPoints: number) => Promise<void>
) => {
  const { user } = useAuth();

  const updateSoftSkillsProgress = async (courseId: string, lessonId: string, pointsToAdd: number = 5) => {
    if (!user) return;

    try {
      // Update or create soft skills progress
      const { error: progressError } = await supabase
        .from('user_soft_skills_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString()
        });

      if (progressError) throw progressError;

      // Update total points
      const newTotalPoints = progress.total_points + pointsToAdd;

      const { error: pointsError } = await supabase
        .from('user_progress')
        .update({
          total_points: newTotalPoints,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (pointsError) throw pointsError;

      setProgress(prev => ({
        ...prev,
        total_points: newTotalPoints
      }));

      toast.success(`+${pointsToAdd} points! Module completed! 🎉`);
      
      // Check for level up
      await checkLevelUp(newTotalPoints);
    } catch (error) {
      console.error('Error updating soft skills progress:', error);
      toast.error('Failed to save progress');
    }
  };

  return { updateSoftSkillsProgress };
};
