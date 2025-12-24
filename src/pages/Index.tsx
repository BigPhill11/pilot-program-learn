
import React, { useState } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import GameStatusCard from '@/components/empire/GameStatusCard';
import WelcomeOnboardingBanner from '@/components/onboarding/WelcomeOnboardingBanner';
import AppWalkthroughTour from '@/components/onboarding/AppWalkthroughTour';

const Index = () => {
  const [showTour, setShowTour] = useState(false);

  return (
    <>
      <HeroSection onStartTutorial={() => setShowTour(true)} />
      
      {/* Welcome Onboarding Banner */}
      <WelcomeOnboardingBanner onStartTour={() => setShowTour(true)} />
      
      {/* Bamboo Empire Status */}
      <section aria-label="Your Bamboo Empire" className="container mx-auto px-4 my-6">
        <React.Suspense fallback={null}>
          <GameStatusCard />
        </React.Suspense>
      </section>
      
      {/* App Walkthrough Tour */}
      <AppWalkthroughTour open={showTour} onClose={() => setShowTour(false)} />
    </>
  );
};

export default Index;
