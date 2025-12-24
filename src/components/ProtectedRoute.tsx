
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/auth/AuthPage';
import SkillsAssessmentQuiz from '@/components/assessment/SkillsAssessmentQuiz';
import OnboardingTour from '@/components/onboarding/OnboardingTour';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, profile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user needs to take assessment - only for users who don't have an app_version set at all
  if (!profile.app_version) {
    return (
      <SkillsAssessmentQuiz 
        onComplete={(level) => {
          // Refresh profile after assessment
          window.location.reload();
        }} 
      />
    );
  }

  // Check if user needs onboarding
  if (!profile.onboarding_completed) {
    return (
      <OnboardingTour 
        onComplete={async (onboardingData) => {
          try {
            // Categorize user based on their responses
            let assignedLevel = 'beginner';
            
            // Calculate level based on experience and other factors
            if (onboardingData.experienceLevel === 'advanced') {
              assignedLevel = 'advanced';
            } else if (onboardingData.experienceLevel === 'intermediate') {
              assignedLevel = 'intermediate';
            } else if (onboardingData.experienceLevel === 'some' && 
                      onboardingData.interests.length >= 3 && 
                      onboardingData.goals.includes('invest')) {
              assignedLevel = 'intermediate';
            }

            // Update profile with onboarding completion and level
            const { error } = await supabase
              .from('profiles')
              .update({
                onboarding_completed: true,
                app_version: assignedLevel,
                device_preference: onboardingData.devicePreference,
                mobile_optimized: onboardingData.devicePreference === 'mobile',
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id);

            if (error) {
              console.error('Error updating profile:', error);
              toast.error('Failed to complete onboarding');
              return;
            }

            toast.success(`Welcome! You've been placed in the ${assignedLevel} level.`);
            // Refresh to show the main app
            window.location.reload();
          } catch (error) {
            console.error('Error completing onboarding:', error);
            toast.error('Failed to complete onboarding');
          }
        }} 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
