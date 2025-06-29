
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Building2, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedCompanySwipeCard from './EnhancedCompanySwipeCard';
import CompanyDiscoveryProgress from './CompanyDiscoveryProgress';
import InvestorDiscoveryFlow from './investor/InvestorDiscoveryFlow';
import FavoriteCompanies from './FavoriteCompanies';
import CompanyManager from '../admin/CompanyManager';
import { useCompanies } from '@/hooks/useCompanies';
import { useAuth } from '@/hooks/useAuth';

const CompanyDiscoveryTab: React.FC = () => {
  const { user } = useAuth();
  const { companies, loading } = useCompanies();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewedCompanies, setViewedCompanies] = useState<Set<string>>(new Set());
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading companies...</p>
      </div>
    );
  }

  if (showFavorites) {
    return <FavoriteCompanies onBack={() => setShowFavorites(false)} />;
  }

  if (showAdmin) {
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          onClick={() => setShowAdmin(false)}
          className="mb-4"
        >
          ← Back to Discovery
        </Button>
        <CompanyManager />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Company Discovery</h1>
          <p className="text-muted-foreground">Explore companies and find your next investment opportunity</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {user && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setShowFavorites(true)}
                className="flex items-center space-x-2"
              >
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAdmin(true)}
                className="flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </>
          )}
        </div>
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
              <EnhancedCompanySwipeCard 
                company={currentCompany} 
                onSwipe={handleSwipe}
                showHeartOnly={false}
              />
            ) : (
              <div className="space-y-4">
                <CompanyDiscoveryProgress 
                  currentIndex={currentIndex}
                  totalCompanies={companies.length}
                  allViewed={allViewed}
                  onReset={resetDeck}
                />
                {allViewed && user && (
                  <div className="text-center">
                    <Button 
                      onClick={() => setShowFavorites(true)}
                      className="flex items-center space-x-2 mx-auto"
                    >
                      <Heart className="h-4 w-4" />
                      <span>View Your Favorites</span>
                    </Button>
                  </div>
                )}
              </div>
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
