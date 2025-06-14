import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, TrendingUp, LayoutDashboard, DollarSign, Calendar, FileText, Rss, Newspaper } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import MarketIndicatorCard from '@/components/MarketIndicatorCard';
import HighlightableTerm from '@/components/HighlightableTerm';

const Index = () => {
  // Dummy data for market indicators - will need to be fetched live later
  const marketIndicators = [
    { title: "NASDAQ", value: "17,850.23", change: 120.55 },
    { title: "S&P 500", value: "5,470.10", change: -15.20 },
    { title: "Dow Jones", value: "39,110.76", change: 80.00 },
    { title: "Brent Crude", value: "$85.20", change: 0.75, changeSuffix: "/bbl" },
    { title: "Gold", value: "$2,330.50", change: -5.10, changeSuffix: "/oz" },
    { title: "Volatility (VIX)", value: "12.75", change: 0.25 },
  ];

  const marketRecap = {
    paragraphs: [
      "Global markets experienced a mixed session today as investors digested a fresh batch of economic data and corporate earnings. Technology stocks, particularly in the <HighlightableTerm term='semiconductor sector' definition='Companies that design and manufacture computer chips and related components.'>semiconductor sector</HighlightableTerm>, saw significant gains driven by positive outlooks and strong demand forecasts. However, concerns over persistent <HighlightableTerm term='inflation' definition='A general increase in prices and fall in the purchasing value of money.'>inflation</HighlightableTerm> and potential <HighlightableTerm term='central bank hawkishness' definition='When central banks adopt a more aggressive stance to combat inflation, often by raising interest rates.'>central bank hawkishness</HighlightableTerm> tempered overall market enthusiasm, leading to profit-taking in some <HighlightableTerm term='cyclical sectors' definition='Stock sectors that are highly sensitive to the business cycle and economic conditions, like industrials or consumer discretionary.'>cyclical sectors</HighlightableTerm> like industrials and materials.",
      "Energy commodities, including Brent crude, continued their upward trend amid <HighlightableTerm term='geopolitical tensions' definition='Political conflicts or instability between countries that can affect global markets.'>geopolitical tensions</HighlightableTerm> and supply constraints. In contrast, precious metals like gold saw a slight dip as the US dollar strengthened. Market participants are now keenly awaiting upcoming labor market reports, which are expected to provide further clues on the economic trajectory and influence future <HighlightableTerm term='monetary policy' definition='Actions undertaken by a central bank to manipulate the money supply and credit conditions to stimulate or restrain economic activity.'>monetary policy</HighlightableTerm> decisions."
    ],
    tldr: "Tech stocks went up today, but worries about rising prices and what the big banks might do made some other stocks go down. Oil prices are still going up, but gold went down a bit. Everyone's waiting to see new job numbers to figure out what's next for the economy."
  };

  const dailyHeadlines = [
    {
      title: "Tech Giants Rally on AI Advancements",
      summary: "Major technology companies saw their stock prices surge following announcements of significant breakthroughs in artificial intelligence. Investors are optimistic about the potential for these advancements to drive future growth and innovation across various industries. Analysts predict this trend could reshape software development and consumer electronics. The rally has also boosted related sectors like chip manufacturing and cloud computing services.",
      tldr: "Big tech companies are doing great because they're making cool new AI stuff, and people think it'll make them a lot of money."
    },
    {
      title: "Federal Reserve Signals Cautious Stance on Interest Rates",
      summary: "In a closely watched announcement, the Federal Reserve indicated it would maintain a cautious approach to adjusting interest rates. While acknowledging ongoing economic recovery, officials expressed concerns about lingering inflationary pressures. This suggests that any future rate hikes will be gradual and data-dependent. Markets reacted with mild volatility as traders assessed the implications for borrowing costs and investment strategies.",
      tldr: "The big bank (Federal Reserve) is being careful about changing interest rates because prices are still high, so they'll take it slow."
    },
    {
      title: "Oil Prices Climb Amid Supply Chain Disruptions",
      summary: "Global oil prices continued their upward trajectory as ongoing supply chain disruptions and geopolitical uncertainties impacted production. Major oil-producing nations have struggled to meet rising demand, leading to tighter market conditions. Consumers may see higher prices at the pump as a result. Analysts are monitoring international talks that could potentially ease some of these supply pressures.",
      tldr: "Gas prices might go up because it's harder to get oil right now due to problems around the world."
    },
    {
      title: "Retail Sales Show Unexpected Resilience",
      summary: "Despite concerns about inflation, the latest retail sales figures surprised analysts by showing continued consumer spending. Strong demand in electronics and home goods offset slight declines in other categories. This resilience suggests that consumers are still willing to spend, bolstering hopes for sustained economic activity. However, economists caution that this trend may not last if inflation remains elevated.",
      tldr: "People are still buying a lot of stuff, even though things are more expensive, which is good for the economy (for now)."
    },
    {
      title: "IPO Market Sees Renewed Interest in Biotech",
      summary: "The market for Initial Public Offerings (IPOs) is showing signs of life, with a particular surge in interest for biotechnology firms. Several promising biotech companies have recently filed for IPOs, attracting significant investor attention. This renewed appetite for risk in the biotech sector reflects optimism about new drug discoveries and medical technologies. Successful IPOs in this space could encourage more companies to go public.",
      tldr: "New medicine and health tech companies are starting to sell their shares to the public, and investors are excited."
    },
    {
      title: "Global Shipping Costs Begin to Stabilize",
      summary: "After months of volatility, global shipping costs are reportedly starting to stabilize, albeit at elevated levels. Improvements in port congestion and an increase in container availability are contributing to this trend. While still higher than pre-pandemic levels, this stabilization could ease some inflationary pressures on goods. Businesses are hopeful this will lead to more predictable supply chains in the coming months.",
      tldr: "It's still expensive to ship things, but prices aren't going crazy up and down like before, which is a bit better for businesses."
    },
    {
      title: "Renewable Energy Stocks Gain on New Policy Support",
      summary: "Shares in renewable energy companies rose following announcements of new government policies aimed at boosting green energy production. These policies include tax incentives and subsidies for solar, wind, and other renewable sources. Investors are betting that this increased support will accelerate the transition to cleaner energy. This sector is expected to see significant growth and investment in the coming years.",
      tldr: "Companies that make clean energy (like solar and wind power) are doing well because the government is helping them out."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PandaLogo className="h-24 w-24 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold tracking-tight text-green-700 sm:text-6xl">
            Welcome to Phil's Financials
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700 max-w-2xl mx-auto">
            Your friendly guide to understanding the world of finance. Tailored for high schoolers and beginners ready to learn about markets, investments, and economic concepts.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link to="/learn">
                Start Learning <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-green-600 text-green-600 hover:bg-green-50">
              <Link to="/paper-trading">
                Try Paper Trading <TrendingUp className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Market Indicators Section */}
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

      {/* Market Recap Section - NEW */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-2">
                <Rss className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-semibold text-foreground">Today's Market Recap</h2>
            </div>
            <p className="mt-2 text-muted-foreground">A summary of key events and trends shaping the financial markets. (Static data for now)</p>
          </div>
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Market Overview - {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketRecap.paragraphs.map((paragraph, index) => (
                // This is a bit tricky with HighlightableTerm as it's part of the string.
                // For now, we'll render it as HTML. In a real scenario, you might parse this.
                <p key={index} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
              ))}
              <div>
                <h3 className="font-semibold text-lg text-foreground mt-6 mb-2">TL;DR (Easy Explanation):</h3>
                <p className="text-muted-foreground italic bg-green-50 p-3 rounded-md border border-green-200">{marketRecap.tldr}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Headlines Section - UPDATED */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <div className="flex items-center justify-center mb-2">
                <Newspaper className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-semibold text-foreground">Top Financial Headlines</h2>
            </div>
            <p className="mt-2 text-muted-foreground">Key news stories impacting the markets today. (Static data for now)</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyHeadlines.map((headline, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{headline.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm flex-grow">
                  <p className="text-muted-foreground leading-relaxed">{headline.summary}</p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">TL;DR:</h4>
                    <p className="text-muted-foreground italic text-xs bg-blue-50 p-2 rounded-md border border-blue-200">{headline.tldr}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-foreground">What You'll Discover</h2>
            <p className="mt-2 text-muted-foreground">Key features to kickstart your financial journey.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<LayoutDashboard className="h-8 w-8 text-primary" />}
              title="Market Today"
              description="Get a daily snapshot of market movements and key headlines. (Updated with more detail)"
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-primary" />}
              title="Learn Finance Basics"
              description="Explore various industries, their functions, and fundamental market concepts. (40 terms with quizzes coming soon!)"
              linkTo="/learn"
              linkText="Explore Lessons"
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 text-primary" />}
              title="Paper Trading"
              description="Practice investing with a virtual portfolio. Learn without the risk. (Static demo available)"
              linkTo="/paper-trading"
              linkText="Try Demo"
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-primary" />}
              title="Economic Calendar"
              description="Stay updated on important economic events like 'CPI Release - July 15 (Est.)' and 'FOMC Meeting - July 30 (Est.)'. (Full calendar coming soon)"
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-primary" />}
              title="Reliable Sources"
              description="All information is sourced from reputable financial news outlets and educational materials."
              id="sources"
            />
             <FeatureCard
              icon={<DollarSign className="h-8 w-8 text-primary" />}
              title="Industry Insights"
              description="Deep dive into different sectors like 'Renewable Energy' or 'Biotechnology' and understand their financial dynamics. (More insights coming soon)"
            />
          </div>
        </div>
      </section>
    </>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo?: string;
  linkText?: string;
  id?: string;
  comingSoon?: boolean;
}

const FeatureCard = ({ icon, title, description, linkTo, linkText, id, comingSoon }: FeatureCardProps) => (
  <Card id={id} className="flex flex-col">
    <CardHeader>
      <div className="flex items-center space-x-3 mb-3">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="mt-auto">
      {comingSoon && <span className="text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-1 rounded-full">Coming Soon</span>}
      {linkTo && linkText && (
        <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-primary/80">
          <Link to={linkTo}>
            {linkText} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      )}
    </CardContent>
  </Card>
);

export default Index;
