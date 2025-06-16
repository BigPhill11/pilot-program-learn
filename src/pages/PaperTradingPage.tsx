
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketSimulation from "@/components/trading/MarketSimulation";
import MarketPredictionGame from "@/components/trading/MarketPredictionGame";

const PaperTradingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Paper Trading</h1>
        <p className="text-muted-foreground">
          Practice trading with virtual money and predict market movements in a risk-free environment
        </p>
      </div>

      <Tabs defaultValue="simulation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulation">Market Simulation</TabsTrigger>
          <TabsTrigger value="predictions">Market Predictions</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
          <TabsTrigger value="education">Trading Education</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulation" className="mt-6">
          <MarketSimulation />
        </TabsContent>

        <TabsContent value="predictions" className="mt-6">
          <MarketPredictionGame />
        </TabsContent>
        
        <TabsContent value="portfolio" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Portfolio analysis coming soon!</p>
          </div>
        </TabsContent>
        
        <TabsContent value="education" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Trading education content coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaperTradingPage;
