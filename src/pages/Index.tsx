
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import MarketIndicatorsSection from '@/components/landing/MarketIndicatorsSection';
import TabbedContentSection from '@/components/landing/TabbedContentSection';
import EnhancedHeadlinesSection from '@/components/EnhancedHeadlinesSection';
import FeaturesOverviewSection from '@/components/landing/FeaturesOverviewSection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <MarketIndicatorsSection />
      <TabbedContentSection />
      <EnhancedHeadlinesSection />
      <FeaturesOverviewSection />
    </>
  );
};

export default Index;
