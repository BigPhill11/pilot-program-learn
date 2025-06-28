
import React, { useState } from 'react';
import CompanySwipeCard from './CompanySwipeCard';
import CompanyDiscoveryProgress from './CompanyDiscoveryProgress';
import { companyProfiles } from '@/data/company-profiles';

const CompanyDiscoveryTab: React.FC = () => {
  const [companies] = useState(companyProfiles);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewedCompanies, setViewedCompanies] = useState<Set<string>>(new Set());

  const handleSwipe = (companyId: string, liked: boolean) => {
    console.log(`Company ${companyId} was ${liked ? 'liked' : 'disliked'}`);
    setViewedCompanies(prev => new Set(prev).add(companyId));
    if (currentIndex < companies.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      console.log("No more companies to show in this batch.");
    }
  };
  
  const resetDeck = () => {
    setCurrentIndex(0);
    setViewedCompanies(new Set());
  };

  const currentCompany = companies[currentIndex];
  const allViewed = currentIndex >= companies.length - 1 && viewedCompanies.has(currentCompany?.id);

  return (
    <div className="py-6">
      {currentCompany && !allViewed ? (
        <CompanySwipeCard company={currentCompany} onSwipe={handleSwipe} />
      ) : (
        <CompanyDiscoveryProgress 
          currentIndex={currentIndex}
          totalCompanies={companies.length}
          allViewed={allViewed}
          onReset={resetDeck}
        />
      )}
      {companies.length > 0 && !allViewed && (
        <CompanyDiscoveryProgress 
          currentIndex={currentIndex}
          totalCompanies={companies.length}
          allViewed={false}
          onReset={resetDeck}
        />
      )}
    </div>
  );
};

export default CompanyDiscoveryTab;
