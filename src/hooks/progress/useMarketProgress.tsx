
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ProgressData } from '@/types/progress';

export const useMarketProgress = (
  progress: ProgressData,
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>,
  checkLevelUp: (totalPoints: number) => Promise<void>
) => {
  const { user } = useAuth();

  const updateMarketPrediction = async () => {
    if (!user) return;

    // 15 points for market predictions
    const pointsEarned = 15;
    const newTotalPoints = progress.total_points + pointsEarned;

    try {
      const { error } = await supabase
        .from('user_progress')
        .update({
          total_points: newTotalPoints,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        total_points: newTotalPoints
      }));

      toast.success(`+${pointsEarned} points for market prediction! 📈`);
      
      // Check for level up
      await checkLevelUp(newTotalPoints);
    } catch (error) {
      console.error('Error updating market prediction points:', error);
    }
  };

  return { updateMarketPrediction };
};
