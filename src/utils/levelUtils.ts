
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const checkLevelUp = async (totalPoints: number, userId: string) => {
  if (!userId) return;

  const currentLevel = Math.floor(totalPoints / 200) + 1;
  
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        current_level: currentLevel,
        points_to_next_level: 200 - (totalPoints % 200),
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

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
