
import React from 'react';
import MarketIndicatorCard from '@/components/MarketIndicatorCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const MarketIndicatorsSection = () => {
  const { data: marketData, isLoading, isError, error } = useQuery({
    queryKey: ['consolidatedMarketData'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('enhanced-market-data');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    staleTime: 1000 * 60 * 2, // Re-fetch data every 2 minutes
  });

  if (isError) {
    console.error("Error fetching market data:", error);
  }

  const marketIndicators = marketData?.marketData || [];
  const subtitle = isError ? "Could not load live data. Showing static data." : "Today's key market indicators.";

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-emerald-700">Market Snapshot</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : (
            marketIndicators.map((indicator) => (
              <MarketIndicatorCard
                key={indicator.symbol}
                title={indicator.name}
                value={indicator.asset_type === 'commodity' ? `$${indicator.price.toFixed(2)}` : indicator.price.toFixed(2)}
                change={indicator.change_percent}
                changeSuffix="%"
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
