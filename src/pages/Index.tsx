
import React, { useState } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import RankBadge from '@/components/progression/RankBadge';
import XpProgress from '@/components/progression/XpProgress';
import WelcomeOnboardingBanner from '@/components/onboarding/WelcomeOnboardingBanner';
import AppWalkthroughTour from '@/components/onboarding/AppWalkthroughTour';

const Index = () => {
  const [showTour, setShowTour] = useState(false);

  return (
    <>
      <HeroSection onStartTutorial={() => setShowTour(true)} />
      
      {/* Welcome Onboarding Banner */}
      <WelcomeOnboardingBanner onStartTour={() => setShowTour(true)} />
      
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
      
      {/* App Walkthrough Tour */}
      <AppWalkthroughTour open={showTour} onClose={() => setShowTour(false)} />
    </>
  );
};

export default Index;
