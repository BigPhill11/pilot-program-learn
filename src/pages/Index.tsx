
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import MarketIndicatorsSection from '@/components/landing/MarketIndicatorsSection';
import TabbedContentSection from '@/components/landing/TabbedContentSection';
import EnhancedHeadlinesSection from '@/components/EnhancedHeadlinesSection';
import FeaturesOverviewSection from '@/components/landing/FeaturesOverviewSection';
import RankBadge from '@/components/progression/RankBadge';
import XpProgress from '@/components/progression/XpProgress';

const Index = () => {
  return (
    <>
      <HeroSection />
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
      <MarketIndicatorsSection />
      <TabbedContentSection />
      <EnhancedHeadlinesSection />
      <FeaturesOverviewSection />
    </>
  );
};

export default Index;
