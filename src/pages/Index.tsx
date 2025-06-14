import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, TrendingUp, LayoutDashboard, DollarSign, Calendar, FileText } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import MarketIndicatorCard from '@/components/MarketIndicatorCard';

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
              description="Get a daily snapshot of market movements, key headlines (e.g., 'Tech stocks rally on AI news'), M&A deals, and IPOs. (Live data coming soon)"
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-primary" />}
              title="Learn Finance Basics"
              description="Explore various industries, their functions, and fundamental market concepts."
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
