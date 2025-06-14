
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import HighlightableTerm from '@/components/HighlightableTerm';
import { Rss, Calendar as CalendarIcon, Briefcase, Lightbulb, BarChart3 } from 'lucide-react';

const TabbedContentSection = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const marketRecap = {
    paragraphs: [
      "Global markets experienced a mixed session today as investors digested a fresh batch of economic data and corporate earnings. Technology stocks, particularly in the <HighlightableTerm term='semiconductor sector' definition='Companies that design and manufacture computer chips and related components.'>semiconductor sector</HighlightableTerm>, saw significant gains driven by positive outlooks and strong demand forecasts. However, concerns over persistent <HighlightableTerm term='inflation' definition='A general increase in prices and fall in the purchasing value of money.'>inflation</HighlightableTerm> and potential <HighlightableTerm term='central bank hawkishness' definition='When central banks adopt a more aggressive stance to combat inflation, often by raising interest rates.'>central bank hawkishness</HighlightableTerm> tempered overall market enthusiasm, leading to profit-taking in some <HighlightableTerm term='cyclical sectors' definition='Stock sectors that are highly sensitive to the business cycle and economic conditions, like industrials or consumer discretionary.'>cyclical sectors</HighlightableTerm> like industrials and materials.",
      "Energy commodities, including Brent crude, continued their upward trend amid <HighlightableTerm term='geopolitical tensions' definition='Political conflicts or instability between countries that can affect global markets.'>geopolitical tensions</HighlightableTerm> and supply constraints. In contrast, precious metals like gold saw a slight dip as the US dollar strengthened. Market participants are now keenly awaiting upcoming labor market reports, which are expected to provide further clues on the economic trajectory and influence future <HighlightableTerm term='monetary policy' definition='Actions undertaken by a central bank to manipulate the money supply and credit conditions to stimulate or restrain economic activity.'>monetary policy</HighlightableTerm> decisions."
    ],
    tldr: "Tech stocks went up today, but worries about rising prices and what the big banks might do made some other stocks go down. Oil prices are still going up, but gold went down a bit. Everyone's waiting to see new job numbers to figure out what's next for the economy."
  };

  const economicEvents = [
    { date: "2025-06-15", event: "Consumer Price Index (CPI) Release", description: "Key inflation data for May." },
    { date: "2025-06-20", event: "FOMC Meeting Minutes", description: "Details from the latest Federal Reserve meeting." },
    { date: "2025-06-28", event: "GDP Growth Rate (Q1 Revision)", description: "Revised estimate of economic growth." },
    { date: "2025-07-05", event: "Jobs Report (June)", description: "Monthly employment data." },
  ];

  const industryInsightsData = [
    { title: "Renewable Energy", icon: Lightbulb, description: "Analysis of growth trends, investment opportunities, and policy impacts in the solar, wind, and alternative energy sectors.", tldr: "Clean energy is booming thanks to new tech and government help." },
    { title: "Biotechnology", icon: BarChart3, description: "Insights into pharmaceutical breakthroughs, M&A activities, and regulatory landscapes affecting biotech companies.", tldr: "New medicines and health tech are hot areas for investors." },
    { title: "Artificial Intelligence", icon: Briefcase, description: "Exploring the impact of AI on various industries, from software development to manufacturing, and identifying key players.", tldr: "AI is changing everything, creating big chances for growth." },
  ];

  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="market-recap" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="market-recap">
              <Rss className="h-5 w-5 mr-2" /> Market Recap
            </TabsTrigger>
            <TabsTrigger value="economic-calendar">
              <CalendarIcon className="h-5 w-5 mr-2" /> Economic Calendar
            </TabsTrigger>
            <TabsTrigger value="industry-insights">
              <Briefcase className="h-5 w-5 mr-2" /> Industry Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market-recap">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Market Overview - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketRecap.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                ))}
                <div>
                  <h3 className="font-semibold text-lg text-foreground mt-6 mb-2">TL;DR (Easy Explanation):</h3>
                  <p className="text-muted-foreground italic bg-green-50 p-3 rounded-md border border-green-200">{marketRecap.tldr}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="economic-calendar">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Upcoming Economic Events</CardTitle>
                <CardDescription>Key dates and events impacting the financial markets. (Static data)</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date("2025-06-01") || date > new Date("2025-07-31") }
                  />
                </div>
                <div className="md:w-1/2 space-y-3">
                  <h4 className="font-semibold text-foreground mb-2">Key Events for June/July 2025:</h4>
                  {economicEvents.map(event => (
                     <div key={event.event} className="p-3 bg-background rounded-md border">
                       <p className="font-medium text-sm text-primary">{event.date} - {event.event}</p>
                       <p className="text-xs text-muted-foreground">{event.description}</p>
                     </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="industry-insights">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Industry Insights Prototype</CardTitle>
                <CardDescription>Exploring key sectors and their financial dynamics. (Static data)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {industryInsightsData.map((insight) => (
                  <Card key={insight.title}>
                    <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                      <insight.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <div>
                        <h4 className="font-semibold text-foreground text-xs mb-1">TL;DR:</h4>
                        <p className="text-muted-foreground italic text-xs bg-blue-50 p-2 rounded-md border border-blue-200">{insight.tldr}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                 <p className="text-center text-sm text-muted-foreground pt-4">More detailed industry analyses and data coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedContentSection;

