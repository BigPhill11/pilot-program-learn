
import React from 'react';
import MarketIndicatorCard from '@/components/MarketIndicatorCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

// Static data is kept as a fallback in case the live API fails
const fallbackIndicators = [
  { title: "NASDAQ", value: "17,850.23", change: 120.55 },
  { title: "S&P 500", value: "5,470.10", change: -15.20 },
  { title: "Dow Jones", value: "39,110.76", change: 80.00 },
  { title: "Brent Crude", value: "$85.20", change: 0.75, changeSuffix: "/bbl" },
  { title: "Gold", value: "$2,330.50", change: -5.10, changeSuffix: "/oz" },
  { title: "Volatility (VIX)", value: "12.75", change: 0.25 },
];

const MarketIndicatorsSection = () => {
  // Function to fetch data from our new Supabase edge function
  const fetchMarketData = async () => {
    const { data, error } = await supabase.functions.invoke('market-data');
    if (error) {
      throw new Error(error.message);
    }
    if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format received from function");
    }
    return data;
  };

  // Using react-query to handle fetching, caching, and loading/error states
  const { data: marketIndicators, isLoading, isError, error } = useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
    staleTime: 1000 * 60 * 5, // Re-fetch data every 5 minutes
  });

  if (isError) {
    console.error("Error fetching market data:", error);
  }

  const indicatorsToDisplay = isError || !marketIndicators || marketIndicators.length === 0 ? fallbackIndicators : marketIndicators;
  const subtitle = isError ? "Could not load live data. Showing static data." : "Today's key market indicators.";

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground">Market Snapshot</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : (
            indicatorsToDisplay.map((indicator) => (
              <MarketIndicatorCard
                key={indicator.title}
                title={indicator.title}
                value={indicator.value}
                change={indicator.change}
                changeSuffix={indicator.changeSuffix}
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
