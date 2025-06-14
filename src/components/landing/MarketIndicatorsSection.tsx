
import React from 'react';
import MarketIndicatorCard from '@/components/MarketIndicatorCard';

const MarketIndicatorsSection = () => {
  const marketIndicators = [
    { title: "NASDAQ", value: "17,850.23", change: 120.55 },
    { title: "S&P 500", value: "5,470.10", change: -15.20 },
    { title: "Dow Jones", value: "39,110.76", change: 80.00 },
    { title: "Brent Crude", value: "$85.20", change: 0.75, changeSuffix: "/bbl" },
    { title: "Gold", value: "$2,330.50", change: -5.10, changeSuffix: "/oz" },
    { title: "Volatility (VIX)", value: "12.75", change: 0.25 },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground">Market Snapshot</h2>
          <p className="mt-2 text-muted-foreground">Today's key market indicators. (Data is static for now)</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {marketIndicators.map((indicator) => (
            <MarketIndicatorCard
              key={indicator.title}
              title={indicator.title}
              value={indicator.value}
              change={indicator.change}
              changeSuffix={indicator.changeSuffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketIndicatorsSection;

