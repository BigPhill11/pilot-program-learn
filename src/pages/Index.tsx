
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import MarketIndicatorsSection from '@/components/landing/MarketIndicatorsSection';
import TabbedContentSection from '@/components/landing/TabbedContentSection';
import HeadlinesSection from '@/components/landing/HeadlinesSection';
import FeaturesOverviewSection from '@/components/landing/FeaturesOverviewSection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <MarketIndicatorsSection />
      <TabbedContentSection />
      <HeadlinesSection />
      <FeaturesOverviewSection />
    </>
  );
};

export default Index;

