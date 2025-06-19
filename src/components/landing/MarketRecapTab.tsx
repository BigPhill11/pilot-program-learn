
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketRecapTab = () => {
  const [marketSummary, setMarketSummary] = useState<string>('');

  useEffect(() => {
    // Simulate market recap data
    const recap = `Today's market showed mixed signals as the S&P 500 gained 0.5% while the Dow Jones experienced volatility throughout the trading session. Technology stocks led the rally with strong earnings reports driving investor sentiment. The Federal Reserve's recent policy changes continue to impact bond yields and cryptocurrency markets. Portfolio diversification remains crucial as market uncertainty persists amid ongoing inflation concerns.`;
    
    setMarketSummary(recap);
  }, []);

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
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">{marketSummary}</p>
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
              <p className="text-muted-foreground">Strong quarterly earnings boosted investor confidence in growth stocks.</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Interest rate speculation continues to influence bond market dynamics.</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Commodity prices showed resilience despite global economic concerns.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketRecapTab;
