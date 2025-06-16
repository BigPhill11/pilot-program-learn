
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/auth/AuthPage';
import SkillsAssessmentQuiz from '@/components/assessment/SkillsAssessmentQuiz';
import OnboardingTour from '@/components/onboarding/OnboardingTour';

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
        userLevel={profile.app_version}
        onComplete={() => {
          // Refresh profile after onboarding
          window.location.reload();
        }} 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
