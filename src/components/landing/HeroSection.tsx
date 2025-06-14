
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;

