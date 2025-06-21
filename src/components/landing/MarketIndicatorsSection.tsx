
import React from 'react';
import MarketIndicatorCard from '@/components/MarketIndicatorCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

// Static data as final fallback only
const fallbackIndicators = [
  { title: "S&P 500", value: "4,783.45", change: 0.85, changeSuffix: "%" },
  { title: "NASDAQ", value: "15,832.80", change: 1.25, changeSuffix: "%" },
  { title: "Dow Jones", value: "37,248.90", change: -0.45, changeSuffix: "%" },
  { title: "Russell 2000", value: "2,042.30", change: 2.10, changeSuffix: "%" },
  { title: "Total Stock Market", value: "240.85", change: 0.65, changeSuffix: "%" },
  { title: "Gold", value: "$2,042.30", change: 1.20, changeSuffix: "%" },
];

const MarketIndicatorsSection = () => {
  // Fetch real-time FMP index data with more aggressive refresh
  const fetchFMPIndexData = async () => {
    console.log('Fetching real-time FMP index data...');
    const { data, error } = await supabase.functions.invoke('fmp-market-data', {
      body: { type: 'indexes' }
    });
    if (error) {
      console.error('FMP index data fetch error:', error);
      throw error;
    }
    console.log('FMP index data received:', data);
    return data?.indexes || [];
  };

  // Fetch cached data as secondary fallback
  const fetchCachedMarketData = async () => {
    const { data, error } = await supabase
      .from('market_data_cache')
      .select('*')
      .order('last_updated', { ascending: false })
      .limit(6);
    
    if (error) {
      console.error('Cached data fetch error:', error);
      throw new Error(error.message);
    }
    
    return data.map(item => ({
      title: item.name,
      value: item.asset_type === 'commodity' && !item.name.includes('$') 
        ? `$${(item.price || 0).toFixed(2)}`
        : (item.price || 0).toFixed(2),
      change: item.change_percent || 0,
      changeSuffix: '%'
    }));
  };

  // Primary query for FMP real-time data
  const { data: fmpData, isLoading: fmpLoading, error: fmpError } = useQuery({
    queryKey: ['fmpRealTimeIndexes'],
    queryFn: fetchFMPIndexData,
    staleTime: 1000 * 60 * 2, // 2 minutes - more frequent updates
    refetchInterval: 1000 * 60 * 3, // Auto-refresh every 3 minutes
    retry: 2,
  });

  // Secondary query for cached data (only runs if FMP fails)
  const { data: cachedData, isLoading: cachedLoading } = useQuery({
    queryKey: ['cachedMarketIndexes'],
    queryFn: fetchCachedMarketData,
    enabled: !!fmpError, // Only run if FMP fails
    staleTime: 1000 * 60 * 30, // 30 minutes for cached data
  });

  const isLoading = fmpLoading || (fmpError && cachedLoading);
  
  // Determine which data to display (priority: FMP -> Cached -> Fallback)
  let indicatorsToDisplay = fallbackIndicators;
  let dataSource = "static data";
  
  if (fmpData && fmpData.length > 0) {
    indicatorsToDisplay = fmpData;
    dataSource = "live FMP data";
  } else if (fmpError && cachedData && cachedData.length > 0) {
    indicatorsToDisplay = cachedData;
    dataSource = "cached data";
  }

  const subtitle = `Real-time market indicators powered by ${dataSource}.`;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-emerald-700">Market Snapshot</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          {fmpError && (
            <p className="mt-1 text-xs text-amber-600">
              Live data temporarily unavailable, showing {cachedData ? 'cached' : 'fallback'} data
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            indicatorsToDisplay.map((indicator, index) => (
              <MarketIndicatorCard
                key={`${indicator.title}-${index}-${dataSource}`}
                title={indicator.title}
                value={indicator.value}
                change={indicator.change}
                changeSuffix={indicator.changeSuffix || "%"}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

// A skeleton component to show while data is loading
const CardSkeleton = () => (
  <div className="p-4 border rounded-lg shadow-md space-y-2 bg-card">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export default MarketIndicatorsSection;
