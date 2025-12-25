import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/auth/AuthPage';
import PlacementQuiz from '@/components/onboarding/PlacementQuiz';
import PandaPhilTour from '@/components/onboarding/PandaPhilTour';
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

  // Local state to track placement progress within session
  const [pendingPlacement, setPendingPlacement] = React.useState<{track: string, score: number} | null>(null);
  const [tourCompleted, setTourCompleted] = React.useState(false);

  // Skip onboarding for existing users who already completed it
  const onboardingAlreadyCompleted = (profile as any).onboarding_completed;
  
  // Check if user needs placement quiz - if no placement_track set AND not already onboarded
  const placementTrack = pendingPlacement?.track || (profile as any).placement_track;
  if (!placementTrack && !onboardingAlreadyCompleted) {
    return (
      <PlacementQuiz 
        onComplete={async (track, score) => {
          // Try to save, but proceed regardless
          try {
            await supabase
              .from('profiles')
              .update({
                placement_track: track,
                placement_score: score,
                app_version: track,
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id);
          } catch (error) {
            console.error('Error saving placement:', error);
          }
          
          // Always proceed to tour
          toast.success(`Welcome to the ${track.replace('-', ' ')} track!`);
          setPendingPlacement({ track, score });
        }} 
      />
    );
  }

  // Check if user needs app tour - skip if already onboarded
  const appTourCompleted = tourCompleted || (profile as any).app_tour_completed || onboardingAlreadyCompleted;
  if (!appTourCompleted) {
    return (
      <PandaPhilTour 
        placementTrack={placementTrack}
        onComplete={async () => {
          // Try to save, but proceed regardless
          try {
            await supabase
              .from('profiles')
              .update({
                app_tour_completed: true,
                onboarding_completed: true,
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id);
          } catch (error) {
            console.error('Error completing tour:', error);
          }
          
          // Always proceed to app
          toast.success("You're all set! Let's start learning!");
          setTourCompleted(true);
        }} 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
