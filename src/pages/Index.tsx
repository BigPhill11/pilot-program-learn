
import React, { useState } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import RankBadge from '@/components/progression/RankBadge';
import XpProgress from '@/components/progression/XpProgress';
import WelcomeOnboardingBanner from '@/components/onboarding/WelcomeOnboardingBanner';
import AppWalkthroughTour from '@/components/onboarding/AppWalkthroughTour';
import { InitialFeatureDiscoverySurvey } from '@/components/onboarding/InitialFeatureDiscoverySurvey';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Index = () => {
  const [showTour, setShowTour] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const { surveyCompleted, appWalkthroughCompleted, markSurveyComplete } = useOnboarding();

  // Show survey automatically for new users who haven't completed it
  React.useEffect(() => {
    if (!surveyCompleted && !appWalkthroughCompleted) {
      const timer = setTimeout(() => {
        setShowSurvey(true);
      }, 1000); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [surveyCompleted, appWalkthroughCompleted]);

  const handleSurveyComplete = () => {
    setShowSurvey(false);
    markSurveyComplete();
    // Auto-start the tour after survey completion
    setTimeout(() => {
      setShowTour(true);
    }, 500);
  };

  const handleStartSurvey = () => {
    setShowSurvey(true);
  };

  return (
    <>
      <HeroSection onStartTutorial={() => setShowTour(true)} />
      
      {/* Welcome Onboarding Banner */}
      <WelcomeOnboardingBanner 
        onStartTour={() => setShowTour(true)}
        onStartSurvey={handleStartSurvey}
      />
      
      {/* Progression Header */}
      <section aria-label="Your Panda Progress" className="container mx-auto px-4 my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <React.Suspense fallback={null}>
            <RankBadge />
          </React.Suspense>
          <React.Suspense fallback={null}>
            <XpProgress />
          </React.Suspense>
        </div>
      </section>
      
      {/* Feature Discovery Survey - Shown first for new users */}
      <Dialog open={showSurvey} onOpenChange={setShowSurvey}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 sm:p-0">
          <InitialFeatureDiscoverySurvey onComplete={handleSurveyComplete} />
        </DialogContent>
      </Dialog>
      
      {/* App Walkthrough Tour - Shown after survey */}
      <AppWalkthroughTour open={showTour} onClose={() => setShowTour(false)} />
    </>
  );
};

export default Index;
