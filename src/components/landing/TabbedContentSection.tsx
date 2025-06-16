
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import HighlightableTerm from '@/components/HighlightableTerm';
import { Rss, Calendar as CalendarIcon, Briefcase, Lightbulb, BarChart3, Heart, ShoppingCart, Banknote, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    { 
      title: "Renewable Energy", 
      icon: Lightbulb, 
      description: "Renewable energy encompasses solar, wind, hydroelectric, and other sustainable power sources that are transforming the global energy landscape. The sector has experienced unprecedented growth driven by declining technology costs, government incentives, and increasing corporate commitments to carbon neutrality. Investment in renewable infrastructure continues to accelerate as countries seek energy independence and environmental sustainability.",
      prediction: "Renewable energy is expected to see explosive growth in 2024-2025 as battery storage technology improves and grid infrastructure modernizes. Government policies supporting clean energy transitions and corporate ESG mandates will drive massive capital deployment into solar, wind, and energy storage projects.",
      stocksToWatch: ["ENPH", "SEDG", "NEE", "BEP", "ICLN"]
    },
    { 
      title: "Biotechnology", 
      icon: BarChart3, 
      description: "Biotechnology combines biological processes with advanced technology to develop medicines, therapies, and diagnostic tools that address critical health challenges. The industry focuses on breakthrough treatments including gene therapy, immunotherapy, and personalized medicine approaches. Biotech companies range from early-stage research firms to established pharmaceutical giants developing next-generation treatments.",
      prediction: "Biotechnology will benefit from an aging population driving demand for innovative therapies and breakthrough technologies like AI-powered drug discovery. M&A activity will increase as large pharma seeks promising pipeline assets, while personalized medicine and gene therapies will create new market opportunities.",
      stocksToWatch: ["GILD", "AMGN", "BIIB", "REGN", "MRNA"]
    },
    { 
      title: "Artificial Intelligence", 
      icon: Briefcase, 
      description: "Artificial Intelligence represents the development of computer systems that can perform tasks typically requiring human intelligence, including learning, reasoning, and pattern recognition. AI is revolutionizing industries from healthcare and finance to manufacturing and transportation through automation, predictive analytics, and decision-making capabilities. The technology spans machine learning, natural language processing, computer vision, and robotics applications.",
      prediction: "AI will continue its rapid expansion as enterprises integrate AI solutions into core business processes and new AI applications emerge across industries. Infrastructure demand for AI computing will drive semiconductor and cloud service growth, while regulatory frameworks will begin to shape the industry's development.",
      stocksToWatch: ["NVDA", "MSFT", "GOOGL", "AMZN", "AMD"]
    },
    { 
      title: "Healthcare", 
      icon: Heart, 
      description: "Healthcare encompasses hospitals, pharmaceutical companies, medical device manufacturers, and healthcare services, all requiring specialized financial analysis due to regulatory requirements and unique business models. The sector combines traditional healthcare delivery with cutting-edge medical technology, telemedicine, and digital health solutions. Healthcare professionals analyze everything from drug development pipelines to hospital operations and insurance reimbursement models.",
      prediction: "Healthcare will benefit from an aging population driving demand for medical services and breakthrough technologies like AI-powered diagnostics and personalized medicine. Biotech M&A activity will increase as large pharma seeks innovation, while digital health and telemedicine adoption will accelerate, creating new investment opportunities.",
      stocksToWatch: ["UNH", "JNJ", "PFE", "ABBV", "TMO"]
    },
    { 
      title: "Consumer", 
      icon: ShoppingCart, 
      description: "Consumer industry covers companies that sell goods and services directly to end consumers, from retail and restaurants to consumer packaged goods and luxury brands. Consumer analysts must understand brand value, supply chain dynamics, and changing consumer preferences across demographics and geographies. The sector requires analysis of seasonal patterns, inventory management, and the impact of economic cycles on discretionary spending.",
      prediction: "Consumer companies will benefit from resilient spending on experiences and premium products, while value retailers may outperform in an uncertain economic environment. E-commerce growth continues with omnichannel strategies becoming essential, and sustainability and Gen Z preferences will drive innovation in product development.",
      stocksToWatch: ["AMZN", "COST", "NKE", "SBUX", "HD"]
    }
  ];

  const eventDates = React.useMemo(() => 
    economicEvents.map(event => {
      const [year, month, day] = event.date.split('-').map(Number);
      return new Date(year, month - 1, day);
    }), [economicEvents]);

  const eventModifiers = {
    hasEvent: eventDates,
  };

  const modifiersClassNames = {
    hasEvent: "bg-primary/10 text-primary font-semibold rounded-md",
  };

  const selectedDateString = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : null;

  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="market-recap" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8">
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
                    modifiers={eventModifiers}
                    modifiersClassNames={modifiersClassNames}
                  />
                </div>
                <div className="md:w-1/2 space-y-3">
                  <h4 className="font-semibold text-foreground mb-2">Key Events for June/July 2025:</h4>
                  {economicEvents.map(event => (
                     <div key={event.event} className={cn(
                       "p-3 bg-background rounded-md border transition-all duration-300",
                       event.date === selectedDateString && "ring-2 ring-primary shadow-lg"
                     )}>
                       <p className="font-medium text-sm text-primary">{event.date} - {event.event}</p>
                       <p className="text-xs text-muted-foreground">{event.description}</p>
                     </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="industry-insights">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Industry Insights & Market Predictions</CardTitle>
                <CardDescription>Exploring key sectors and their financial dynamics with AI-powered market forecasts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {industryInsightsData.map((insight) => (
                  <Card key={insight.title} className="border-l-4 border-l-primary">
                    <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                      <insight.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{insight.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm font-semibold text-blue-700 mb-2">🤖 AI Market Prediction</p>
                        <p className="text-sm text-blue-600 leading-relaxed">{insight.prediction}</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-sm font-semibold text-green-700 mb-2">📈 Stocks to Watch</p>
                        <div className="flex flex-wrap gap-2">
                          {insight.stocksToWatch.map(stock => (
                            <span key={stock} className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                              {stock}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <p className="text-center text-sm text-muted-foreground pt-4">Market predictions based on current trends and AI analysis. Always do your own research before investing.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedContentSection;
