
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DailyLoginResponse {
  login_recorded: boolean;
  streak: number;
  points_earned: number;
}

export const useDailyLogin = () => {
  const { user } = useAuth();

  useEffect(() => {
    const handleDailyLogin = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase.rpc('handle_daily_login', {
          p_user_id: user.id
        });

        if (error) {
          console.error('Error handling daily login:', error);
          return;
        }

        const result = data as DailyLoginResponse;

        if (result?.login_recorded && result?.points_earned > 0) {
          toast.success(`Welcome back! +${result.points_earned} points earned! 🎉`);
          
          if (result.streak > 1) {
            toast.success(`${result.streak} day streak! Keep it up! 🔥`);
          }
        }
      } catch (error) {
        console.error('Error in daily login:', error);
      }
    };

    handleDailyLogin();
  }, [user]);
};
