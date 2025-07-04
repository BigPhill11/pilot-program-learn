import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Calendar, BarChart3, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SectorPerformance {
  sector: string;
  changesPercentage: string;
}

interface MarketMover {
  symbol: string;
  name: string;
  change: number;
  changesPercentage: number;
  price: number;
}

interface EarningsEvent {
  symbol: string;
  date: string;
  epsEstimated: number;
  epsActual?: number;
  revenueEstimated: number;
  revenueActual?: number;
}

const MarketDashboard: React.FC = () => {
  const [sectorPerformance, setSectorPerformance] = useState<SectorPerformance[]>([]);
  const [gainers, setGainers] = useState<MarketMover[]>([]);
  const [losers, setLosers] = useState<MarketMover[]>([]);
  const [earningsCalendar, setEarningsCalendar] = useState<EarningsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    setLoading(true);
    try {
      const [sectorsResponse, gainersResponse, losersResponse, earningsResponse] = await Promise.all([
        supabase.functions.invoke('fmp-market-data', {
          body: JSON.stringify({ service: 'sector-performance' }),
          headers: { 'Content-Type': 'application/json' }
        }),
        supabase.functions.invoke('fmp-market-data', {
          body: JSON.stringify({ service: 'market-gainers' }),
          headers: { 'Content-Type': 'application/json' }
        }),
        supabase.functions.invoke('fmp-market-data', {
          body: JSON.stringify({ service: 'market-losers' }),
          headers: { 'Content-Type': 'application/json' }
        }),
        supabase.functions.invoke('fmp-market-data', {
          body: JSON.stringify({ service: 'earnings-calendar' }),
          headers: { 'Content-Type': 'application/json' }
        })
      ]);

      if (!sectorsResponse.error && sectorsResponse.data) {
        setSectorPerformance(sectorsResponse.data.slice(0, 8));
      } else {
        console.error('Sectors response error:', sectorsResponse.error);
      }

      if (!gainersResponse.error && gainersResponse.data) {
        setGainers(gainersResponse.data.slice(0, 10));
      } else {
        console.error('Gainers response error:', gainersResponse.error);
      }

      if (!losersResponse.error && losersResponse.data) {
        setLosers(losersResponse.data.slice(0, 10));
      } else {
        console.error('Losers response error:', losersResponse.error);
      }

      if (!earningsResponse.error && earningsResponse.data) {
        setEarningsCalendar(earningsResponse.data.slice(0, 15));
      } else {
        console.error('Earnings response error:', earningsResponse.error);
      }
    } catch (error) {
      console.error('Error loading market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatChange = (change: number, isPercentage: boolean = false) => {
    const formatted = isPercentage ? `${change.toFixed(2)}%` : change.toFixed(2);
    return change >= 0 ? `+${formatted}` : formatted;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">Loading market data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Market Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sectors" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sectors">Sectors</TabsTrigger>
              <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
              <TabsTrigger value="losers">Top Losers</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            <TabsContent value="sectors" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectorPerformance.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{sector.sector}</span>
                    <div className="flex items-center gap-2">
                      {parseFloat(sector.changesPercentage) >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={getChangeColor(parseFloat(sector.changesPercentage))}>
                        {formatChange(parseFloat(sector.changesPercentage), true)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gainers" className="space-y-4">
              <div className="space-y-2">
                {gainers.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-green-50">
                    <div>
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price.toFixed(2)}</div>
                      <div className="text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {formatChange(stock.changesPercentage, true)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="losers" className="space-y-4">
              <div className="space-y-2">
                {losers.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-red-50">
                    <div>
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price.toFixed(2)}</div>
                      <div className="text-red-600 flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        {formatChange(stock.changesPercentage, true)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-4">
              <div className="space-y-2">
                {earningsCalendar.map((earnings, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-semibold">{earnings.symbol}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(earnings.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">EPS Est:</span> ${earnings.epsEstimated?.toFixed(2) || 'N/A'}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Rev Est:</span> ${(earnings.revenueEstimated / 1000000).toFixed(0)}M
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={loadMarketData} variant="outline">
          Refresh Market Data
        </Button>
      </div>
    </div>
  );
};

export default MarketDashboard;