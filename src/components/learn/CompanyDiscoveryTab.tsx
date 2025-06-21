
import React, { useState, useEffect } from 'react';
import CompanySwipeCard, { CompanyProfile } from './CompanySwipeCard';
import { Button } from '@/components/ui/button';
import { RotateCcw, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const CompanyDiscoveryTab: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewedCompanies, setViewedCompanies] = useState<Set<string>>(new Set());

  // Fetch live companies from FMP API
  const { data: fmpCompaniesData, isLoading, error } = useQuery({
    queryKey: ['fmpLiveCompanies'],
    queryFn: async () => {
      console.log('Fetching live companies from FMP...');
      const { data, error } = await supabase.functions.invoke('fmp-market-data', {
        body: { type: 'companies' }
      });
      if (error) {
        console.error('FMP companies fetch error:', error);
        throw error;
      }
      console.log('FMP companies data received:', data);
      return data;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });

  const companies = fmpCompaniesData?.companies || [];

  const handleSwipe = (companyId: string, liked: boolean) => {
    console.log(`Company ${companyId} was ${liked ? 'liked' : 'disliked'}`);
    setViewedCompanies(prev => new Set(prev).add(companyId));
    if (currentIndex < companies.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const resetDeck = () => {
    setCurrentIndex(0);
    setViewedCompanies(new Set());
  };

  const currentCompany = companies[currentIndex];
  const allViewed = currentIndex >= companies.length - 1 && viewedCompanies.has(currentCompany?.id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
        <p className="text-lg text-muted-foreground">Loading live companies from FMP API...</p>
        <p className="text-sm text-muted-foreground mt-2">Fetching real-time company data and profiles</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-red-600 mb-4">Error loading companies</p>
        <p className="text-muted-foreground mb-4">Could not fetch live company data from FMP API</p>
        <Button onClick={() => window.location.reload()}>
          <RotateCcw className="mr-2 h-4 w-4" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-700 mb-2">Live Company Discovery</h2>
        <p className="text-muted-foreground">
          Powered by real-time FMP API • {companies.length} companies loaded
        </p>
        {fmpCompaniesData?.dataSource && (
          <p className="text-xs text-emerald-600 mt-1">
            Data source: {fmpCompaniesData.dataSource} • Last updated: {new Date(fmpCompaniesData.lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </div>

      {currentCompany && !allViewed ? (
        <CompanySwipeCard company={currentCompany} onSwipe={handleSwipe} />
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground mb-4">
            {companies.length > 0 ? "You've seen all companies for now!" : "No companies loaded from API."}
          </p>
          {companies.length > 0 && (
            <Button onClick={resetDeck}>
              <RotateCcw className="mr-2 h-4 w-4" /> Start Over
            </Button>
          )}
        </div>
      )}
      
      {companies.length > 0 && (
        <p className="text-center text-sm text-muted-foreground mt-6">
          Showing company {Math.min(currentIndex + 1, companies.length)} of {companies.length}
        </p>
      )}
    </div>
  );
};

export default CompanyDiscoveryTab;
