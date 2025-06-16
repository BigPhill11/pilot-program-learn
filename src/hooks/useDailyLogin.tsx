
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

        if (data?.login_recorded && data?.points_earned > 0) {
          toast.success(`Welcome back! +${data.points_earned} points earned! 🎉`);
          
          if (data.streak > 1) {
            toast.success(`${data.streak} day streak! Keep it up! 🔥`);
          }
        }
      } catch (error) {
        console.error('Error in daily login:', error);
      }
    };

    handleDailyLogin();
  }, [user]);
};
