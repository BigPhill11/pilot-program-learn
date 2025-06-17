
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rss, Calendar, BarChart3 } from 'lucide-react';
import MarketRecapTab from './MarketRecapTab';

const TabbedContentSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="market-recap" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="market-recap" className="flex items-center gap-2">
              <Rss className="h-4 w-4" />
              Market Recap
            </TabsTrigger>
            <TabsTrigger value="economic-calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Economic Calendar
            </TabsTrigger>
            <TabsTrigger value="industry-insights" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Industry Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="market-recap">
            <MarketRecapTab />
          </TabsContent>
          
          <TabsContent value="economic-calendar">
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Economic Calendar</h3>
              <p className="text-muted-foreground">Coming soon! Track important economic events and announcements.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="industry-insights">
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Industry Insights</h3>
              <p className="text-muted-foreground">Coming soon! Deep dive into specific industry trends and analysis.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedContentSection;
