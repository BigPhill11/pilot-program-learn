import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface OnboardingState {
  appWalkthroughCompleted: boolean;
  learnTabTutorialCompleted: boolean;
  loading: boolean;
}

export const useOnboarding = () => {
  const { user, profile } = useAuth();
  const [state, setState] = useState<OnboardingState>({
    appWalkthroughCompleted: false,
    learnTabTutorialCompleted: false,
    loading: true,
  });

  useEffect(() => {
    if (profile) {
      setState({
        appWalkthroughCompleted: profile.app_walkthrough_completed || false,
        learnTabTutorialCompleted: profile.learn_tab_tutorial_completed || false,
        loading: false,
      });
    }
  }, [profile]);

  const markAppWalkthroughComplete = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          app_walkthrough_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setState(prev => ({ ...prev, appWalkthroughCompleted: true }));
    } catch (error) {
      console.error('Error marking app walkthrough complete:', error);
    }
  };

  const markLearnTabTutorialComplete = async (xpEarned: number = 300) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          learn_tab_tutorial_completed: true,
          learn_tab_tutorial_completed_at: new Date().toISOString(),
          tutorial_xp_earned: xpEarned,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setState(prev => ({ ...prev, learnTabTutorialCompleted: true }));
    } catch (error) {
      console.error('Error marking learn tab tutorial complete:', error);
    }
  };

  return {
    ...state,
    markAppWalkthroughComplete,
    markLearnTabTutorialComplete,
  };
};
