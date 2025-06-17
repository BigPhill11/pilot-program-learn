
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';
import PandaTermTooltip from '@/components/PandaTermTooltip';
import { useAuth } from '@/hooks/useAuth';

const financialTerms = {
  beginner: {
    'stock': {
      definition: 'A share represents ownership in a company. When you buy stock, you own a tiny piece of that business.',
      analogy: 'Think of it like owning a slice of pizza - the bigger the slice, the more pizza you own!'
    },
    'market': {
      definition: 'The stock market is where people buy and sell shares of companies, like a giant marketplace.',
      analogy: 'It\'s like a huge shopping mall, but instead of buying clothes, people buy pieces of companies!'
    },
    'trading': {
      definition: 'Trading means buying and selling stocks to try to make money from price changes.',
      analogy: 'It\'s like buying and selling Pokemon cards - you hope to sell them for more than you paid!'
    },
    'investment': {
      definition: 'An investment is money you put into something hoping it will grow in value over time.',
      analogy: 'Like planting a seed and waiting for it to grow into a big tree that gives you fruit!'
    }
  },
  intermediate: {
    'volatility': {
      definition: 'Volatility measures how much a stock\'s price moves up and down over time.',
      analogy: 'Think of a roller coaster - high volatility is like a wild ride with big ups and downs!'
    },
    'portfolio': {
      definition: 'A portfolio is your collection of different investments, like stocks, bonds, and other assets.',
      analogy: 'It\'s like your music playlist, but instead of songs, you have different investments!'
    },
    'earnings': {
      definition: 'Earnings are the profits a company makes, usually reported every three months.',
      analogy: 'Like a report card for companies showing how much money they made!'
    }
  },
  advanced: {
    'leverage': {
      definition: 'Using borrowed money to increase potential investment returns, but also increasing risk.',
      analogy: 'Like using a lever to lift something heavy - it amplifies your power but can be dangerous!'
    }
  }
};

const MarketRecapTab = () => {
  const { profile } = useAuth();
  
  const fetchMarketData = async () => {
    console.log('Fetching market data for recap...');
    const { data, error } = await supabase.functions.invoke('market-headlines');
    if (error) {
      console.error('Market data fetch error:', error);
      throw new Error(error.message);
    }
    console.log('Market data received:', data);
    return data || { marketRecap: null };
  };

  const { data: marketData, isLoading } = useQuery({
    queryKey: ['marketRecap'],
    queryFn: fetchMarketData,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  const getTermsForLevel = (level: string) => {
    switch (level) {
      case 'beginner': return { ...financialTerms.beginner };
      case 'intermediate': return { ...financialTerms.beginner, ...financialTerms.intermediate };
      case 'advanced': return { ...financialTerms.intermediate, ...financialTerms.advanced };
      default: return financialTerms.beginner;
    }
  };

  const highlightTerms = (text: string, level: string) => {
    const terms = getTermsForLevel(level);
    let highlightedText = text;
    
    Object.keys(terms).forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const termData = terms[term];
      
      highlightedText = highlightedText.replace(regex, (match) => {
        return `<TERM_${term.toUpperCase()}_START>${match}<TERM_${term.toUpperCase()}_END>`;
      });
    });

    return highlightedText.split(/(<TERM_\w+_START>.*?<TERM_\w+_END>)/).map((part, index) => {
      const termMatch = part.match(/<TERM_(\w+)_START>(.*?)<TERM_\w+_END>/);
      if (termMatch) {
        const termKey = termMatch[1].toLowerCase();
        const termText = termMatch[2];
        const termData = terms[termKey];
        
        if (termData) {
          return (
            <PandaTermTooltip
              key={index}
              term={termText}
              definition={termData.definition}
              analogy={termData.analogy}
            />
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  const userLevel = profile?.app_version || 'beginner';
  const marketRecap = marketData?.marketRecap;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!marketRecap) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Market overview data is currently unavailable.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <TrendingUp className="h-6 w-6" />
            Market Overview - {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            <span className="text-sm font-normal text-green-600 ml-auto">
              (Powered by newsdata.io)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-gray-700 leading-relaxed">
            {marketRecap.paragraphs?.map((paragraph, index) => (
              <p key={index} className="mb-4 text-base">
                {highlightTerms(paragraph, userLevel)}
              </p>
            ))}
          </div>
          
          {marketRecap.tldr && (
            <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-600">
              <p className="text-sm font-semibold text-green-700 mb-2">TL;DR (Easy Explanation):</p>
              <p className="text-green-700 font-medium italic">
                {highlightTerms(marketRecap.tldr, userLevel)}
              </p>
            </div>
          )}

          <div className="flex gap-3 text-sm">
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
              Sentiment: {marketRecap.sentiment || 'Neutral'}
            </span>
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
              Focus: {marketRecap.dominantSector || 'Mixed'} sector
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketRecapTab;
