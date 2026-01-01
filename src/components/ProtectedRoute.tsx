import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/auth/AuthPage';
import PandaPhilTour from '@/components/onboarding/PandaPhilTour';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, profile } = useAuth();
  const [tourCompleted, setTourCompleted] = React.useState(false);

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

  // Skip onboarding for existing users who already completed it
  const onboardingAlreadyCompleted = (profile as any).onboarding_completed;
  
  // Check if user needs app tour - skip if already onboarded
  const appTourCompleted = tourCompleted || (profile as any).app_tour_completed || onboardingAlreadyCompleted;
  
  if (!appTourCompleted) {
    return (
      <PandaPhilTour 
        placementTrack="personal-finance"
        onComplete={async () => {
          const { error } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              placement_track: 'personal-finance',
              app_version: 'personal-finance',
              app_tour_completed: true,
              onboarding_completed: true,
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });
          
          if (error) {
            console.error('Error completing tour:', error);
            toast.error('Failed to save progress, but continuing...');
          }
          
          toast.success("You're all set! Let's start learning!");
          setTourCompleted(true);
        }} 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
