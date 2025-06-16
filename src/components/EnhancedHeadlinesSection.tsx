
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';
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
    'price': {
      definition: 'Stock price is how much it costs to buy one share of a company at any given moment.',
      analogy: 'Just like the price of your favorite sneakers can go up or down, so can stock prices!'
    },
    'trading': {
      definition: 'Trading means buying and selling stocks to try to make money from price changes.',
      analogy: 'It\'s like buying and selling Pokemon cards - you hope to sell them for more than you paid!'
    },
    'investment': {
      definition: 'An investment is money you put into something hoping it will grow in value over time.',
      analogy: 'Like planting a seed and waiting for it to grow into a big tree that gives you fruit!'
    },
    'profit': {
      definition: 'Profit is the money you make when you sell something for more than you paid for it.',
      analogy: 'If you buy a concert ticket for $50 and sell it for $80, your profit is $30!'
    },
    'loss': {
      definition: 'A loss happens when you sell something for less than what you originally paid for it.',
      analogy: 'Like buying a video game for $60 and selling it for $30 - you lost $30!'
    },
    'dividend': {
      definition: 'Some companies pay shareholders small amounts of money regularly, called dividends.',
      analogy: 'It\'s like getting an allowance from a company just for owning their stock!'
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
    'diversification': {
      definition: 'Spreading your money across different types of investments to reduce risk.',
      analogy: 'Don\'t put all your eggs in one basket - if you drop it, you lose everything!'
    },
    'earnings': {
      definition: 'Earnings are the profits a company makes, usually reported every three months.',
      analogy: 'Like a report card for companies showing how much money they made!'
    },
    'bull market': {
      definition: 'A bull market is when stock prices are generally rising and investors are optimistic.',
      analogy: 'Bulls charge forward and up - just like stock prices in a bull market!'
    },
    'bear market': {
      definition: 'A bear market is when stock prices are falling and investors are pessimistic.',
      analogy: 'Bears swipe downward - just like stock prices in a bear market!'
    }
  },
  advanced: {
    'leverage': {
      definition: 'Using borrowed money to increase potential investment returns, but also increasing risk.',
      analogy: 'Like using a lever to lift something heavy - it amplifies your power but can be dangerous!'
    },
    'derivatives': {
      definition: 'Financial contracts whose value depends on underlying assets like stocks or commodities.',
      analogy: 'Like betting on the weather instead of actually owning the weather station!'
    },
    'hedge': {
      definition: 'An investment strategy designed to reduce risk by taking opposite positions.',
      analogy: 'Like wearing both a raincoat and bringing an umbrella - double protection!'
    }
  }
};

const EnhancedHeadlinesSection = () => {
  const { profile } = useAuth();
  
  const fetchHeadlines = async () => {
    const { data, error } = await supabase.functions.invoke('market-headlines');
    if (error) throw new Error(error.message);
    return data || { headlines: [] };
  };

  const { data: headlinesData, isLoading, isError } = useQuery({
    queryKey: ['marketHeadlines'],
    queryFn: fetchHeadlines,
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

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Market Headlines</h2>
            <p className="mt-2 text-muted-foreground">Stay updated with the latest financial news</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Extract headlines from the response, with proper fallback handling
  const headlines = headlinesData?.headlines || [];
  const displayHeadlines = isError || !Array.isArray(headlines) || headlines.length === 0 ? [
    {
      id: '1',
      title: "Market Reaches New Heights",
      summary: "Stock prices continue to rise as investors show confidence in the market's future performance. Major indices are posting significant gains across multiple sectors. Analysts attribute the growth to strong economic indicators and corporate earnings reports.",
      tldr: "Stock markets are up significantly due to positive investor sentiment and strong economic data.",
      url: "https://finance.yahoo.com"
    },
    {
      id: '2',
      title: "Tech Companies Report Strong Earnings",
      summary: "Major technology companies exceeded profit expectations, driving significant trading volume. Revenue growth has been particularly strong in cloud computing and artificial intelligence sectors. Investors are responding positively to future growth projections and innovation investments.",
      tldr: "Tech giants beat earnings expectations, boosting investor confidence in the sector.",
      url: "https://finance.yahoo.com"
    }
  ] : headlines;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Market Headlines</h2>
          <p className="mt-2 text-muted-foreground">
            Stay updated with financial news - terms are highlighted based on your level!
          </p>
          <div className="mt-2 text-sm text-primary">
            🐼 Current Level: {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)} Phil
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayHeadlines.map((headline, index) => (
            <Card 
              key={headline.id || index} 
              className="h-full hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => {
                if (headline.url && headline.url !== "#") {
                  window.open(headline.url, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {highlightTerms(headline.title, userLevel)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <CardDescription className="text-sm leading-relaxed">
                  {highlightTerms(headline.summary, userLevel)}
                </CardDescription>
                
                {headline.tldr && (
                  <div className="bg-primary/5 p-3 rounded-lg border-l-4 border-primary">
                    <p className="text-xs font-semibold text-primary mb-1">TL;DR</p>
                    <p className="text-sm text-muted-foreground">
                      {highlightTerms(headline.tldr, userLevel)}
                    </p>
                  </div>
                )}
                
                {headline.url && headline.url !== "#" && (
                  <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 pt-2">
                    Click to read full article
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeadlinesSection;
