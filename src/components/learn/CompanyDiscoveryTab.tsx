
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Building2 } from 'lucide-react';
import CompanySwipeCard from './CompanySwipeCard';
import CompanyDiscoveryProgress from './CompanyDiscoveryProgress';
import InvestorDiscoveryFlow from './investor/InvestorDiscoveryFlow';
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
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Company Discovery</h1>
        <p className="text-muted-foreground">Explore companies and find your next investment opportunity</p>
      </div>

      <Tabs defaultValue="investor-discovery" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="investor-discovery" className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span>Investor Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="browse-all" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Browse All</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="investor-discovery" className="mt-6">
          <InvestorDiscoveryFlow />
        </TabsContent>
        
        <TabsContent value="browse-all" className="mt-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDiscoveryTab;
