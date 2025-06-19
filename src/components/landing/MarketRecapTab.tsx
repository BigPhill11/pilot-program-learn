
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import useHeadlines from '@/hooks/useHeadlines';
import useFinancialTerms from '@/hooks/useFinancialTerms';
import TermHighlighter from '@/components/TermHighlighter';

const MarketRecapTab = () => {
  const { profile } = useAuth();
  const userLevel = profile?.app_version || 'beginner';
  const { data: headlinesData, isLoading } = useHeadlines(userLevel);
  const { data: financialTerms = [] } = useFinancialTerms();
  const [marketSummary, setMarketSummary] = useState<string>('');

  useEffect(() => {
    if (headlinesData?.marketRecap) {
      const recap = headlinesData.marketRecap;
      const fullSummary = recap.paragraphs ? recap.paragraphs.join(' ') : 
        `Today's market showed mixed signals as the S&P 500 gained 0.5% while the Dow Jones experienced volatility throughout the trading session. Technology stocks led the rally with strong earnings reports driving investor sentiment. The Federal Reserve's recent policy changes continue to impact bond yields and cryptocurrency markets. Portfolio diversification remains crucial as market uncertainty persists amid ongoing inflation concerns.`;
      setMarketSummary(fullSummary);
    } else {
      // Fallback content
      const recap = `Today's market showed mixed signals as the S&P 500 gained 0.5% while the Dow Jones experienced volatility throughout the trading session. Technology stocks led the rally with strong earnings reports driving investor sentiment. The Federal Reserve's recent policy changes continue to impact bond yields and cryptocurrency markets. Portfolio diversification remains crucial as market uncertainty persists amid ongoing inflation concerns.`;
      setMarketSummary(recap);
    }
  }, [headlinesData]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Market Recap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Market Overview - {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            ({userLevel} grade level) (Powered by newsdata.io)
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              <TermHighlighter 
                text={marketSummary} 
                terms={financialTerms}
              />
            </p>
          </div>
          
          {headlinesData?.marketRecap?.tldr && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <p className="text-sm font-medium text-green-700 mb-1">
                TL;DR (Easy Explanation ({userLevel} grade level)):
              </p>
              <p className="text-sm text-green-600">
                <TermHighlighter 
                  text={headlinesData.marketRecap.tldr} 
                  terms={financialTerms}
                />
              </p>
            </div>
          )}
          
          <div className="mt-4 flex gap-2">
            {headlinesData?.marketRecap?.sentiment && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Sentiment: {headlinesData.marketRecap.sentiment}
              </span>
            )}
            {headlinesData?.marketRecap?.dominantSector && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Focus: {headlinesData.marketRecap.dominantSector} sector
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Market Movers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Technology Sector</span>
              <span className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                +2.1%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Energy Stocks</span>
              <span className="flex items-center gap-1 text-red-600">
                <TrendingDown className="h-4 w-4" />
                -1.3%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Financial Services</span>
              <span className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                +0.8%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-muted-foreground">
                <TermHighlighter 
                  text="Strong quarterly earnings boosted investor confidence in growth stocks." 
                  terms={financialTerms}
                />
              </p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">
                <TermHighlighter 
                  text="Interest rate speculation continues to influence bond market dynamics." 
                  terms={financialTerms}
                />
              </p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">
                <TermHighlighter 
                  text="Commodity prices showed resilience despite global economic concerns." 
                  terms={financialTerms}
                />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketRecapTab;
