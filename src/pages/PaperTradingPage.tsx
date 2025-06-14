
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, Lightbulb } from 'lucide-react';

const PaperTradingPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center text-center">
      <TrendingUp className="h-24 w-24 text-primary mb-6" />
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Paper Trading Portfolio</h1>
      <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
        Practice your trading strategies without risking real money. Our paper trading feature is coming soon!
      </p>
      <div className="mt-8 p-6 bg-accent text-accent-foreground rounded-lg flex items-start space-x-3 max-w-md">
        <Lightbulb className="h-6 w-6 mt-1 flex-shrink-0" />
        <p className="text-left">
          <strong>Did you know?</strong> Paper trading helps you understand market dynamics and test investment ideas before committing actual capital. It's a great way to learn and build confidence.
        </p>
      </div>
      <Button asChild size="lg" className="mt-10">
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default PaperTradingPage;

