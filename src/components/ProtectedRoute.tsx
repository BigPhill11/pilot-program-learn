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

  // Check if user needs placement quiz - if no placement_track set
  const placementTrack = (profile as any).placement_track;
  if (!placementTrack) {
    return (
      <PlacementQuiz 
        onComplete={async (track, score) => {
          try {
            const { error } = await supabase
              .from('profiles')
              .update({
                placement_track: track,
                placement_score: score,
                app_version: track, // Set app_version for compatibility
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id);

            if (error) throw error;

            toast.success(`Welcome to the ${track.replace('-', ' ')} track!`);
            window.location.reload();
          } catch (error) {
            console.error('Error saving placement:', error);
            toast.error('Failed to save placement');
          }
        }} 
      />
    );
  }

  // Check if user needs app tour
  const appTourCompleted = (profile as any).app_tour_completed;
  if (!appTourCompleted) {
    return (
      <PandaPhilTour 
        placementTrack={placementTrack}
        onComplete={async () => {
          try {
            const { error } = await supabase
              .from('profiles')
              .update({
                app_tour_completed: true,
                onboarding_completed: true,
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id);

            if (error) throw error;

            toast.success("You're all set! Let's start learning!");
            window.location.reload();
          } catch (error) {
            console.error('Error completing tour:', error);
            toast.error('Failed to complete tour');
          }
        }} 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
