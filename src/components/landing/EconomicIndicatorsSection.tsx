
import React from 'react';
import MarketIndicatorCard from '@/components/MarketIndicatorCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

// Fallback data for when FRED API is not available
const fallbackIndicators = [
  { title: "Unemployment Rate", value: "3.7%", change: 0 },
  { title: "Inflation Rate (CPI)", value: "3.2%", change: 0 },
  { title: "Federal Funds Rate", value: "5.25%", change: 0 },
  { title: "GDP Growth", value: "$27.0T", change: 0 },
  { title: "Employment Change", value: "156.0M", change: 0 },
  { title: "Housing Starts", value: "1.4M", change: 0 },
];

const EconomicIndicatorsSection = () => {
  // Function to fetch data from FRED
  const fetchFredData = async () => {
    const { data, error } = await supabase.functions.invoke('fred-data');
    if (error) {
      throw new Error(error.message);
    }
    if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format received from FRED");
    }
    return data;
  };

  const { data: economicIndicators, isLoading, isError, error } = useQuery({
    queryKey: ['fredData'],
    queryFn: fetchFredData,
    staleTime: 1000 * 60 * 30, // Re-fetch data every 30 minutes (FRED data updates less frequently)
  });

  if (isError) {
    console.error("Error fetching FRED data:", error);
  }

  const indicatorsToDisplay = isError || !economicIndicators || economicIndicators.length === 0 ? fallbackIndicators : economicIndicators;
  const subtitle = isError ? "Could not load live data. Showing static data." : "Key economic indicators from the Federal Reserve.";

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground">Economic Indicators</h2>
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

export default EconomicIndicatorsSection;
