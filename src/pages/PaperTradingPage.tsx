import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, Search, Calculator, BookOpen, Map } from 'lucide-react';
import MarketSimulation from '@/components/trading/MarketSimulation';
import MarketPredictionGame from '@/components/trading/MarketPredictionGame';
import EnhancedSecuritiesSearch from '@/components/trading/EnhancedSecuritiesSearch';
import MarketDashboard from '@/components/trading/MarketDashboard';
import FinancialStatementsViewer from '@/components/trading/FinancialStatementsViewer';
import PortfolioCharts from '@/components/trading/PortfolioCharts';
import TradingAcademy from '@/components/trading/TradingAcademy';
import PhilAdventures from '@/components/trading/PhilAdventures';
import { usePaperTrading } from '@/hooks/usePaperTrading';

const PaperTradingPage = () => {
  const [selectedSecurity, setSelectedSecurity] = useState<any>(null);
  const { portfolio, positions, transactions, loading, executeTrade } = usePaperTrading();

  const handleSecuritySelect = (security: any, profile: any) => {
    setSelectedSecurity({ ...security, profile });
  };

  // Mock current prices for demonstration
  const mockPrices = {
    'AAPL': 180.00,
    'GOOGL': 140.00,
    'MSFT': 420.00,
    'TSLA': 250.00,
    'AMZN': 145.00
  };

  const positionsWithCurrentValue = positions.map(position => ({
    ...position,
    current_price: mockPrices[position.symbol as keyof typeof mockPrices] || position.avg_price,
    current_value: (mockPrices[position.symbol as keyof typeof mockPrices] || position.avg_price) * position.shares,
    profit_loss: ((mockPrices[position.symbol as keyof typeof mockPrices] || position.avg_price) - position.avg_price) * position.shares
  }));

  const totalStockValue = positionsWithCurrentValue.reduce((total, position) => total + position.current_value, 0);
  const totalPortfolioValue = (portfolio?.cash || 0) + totalStockValue;
  const totalProfitLoss = positionsWithCurrentValue.reduce((total, position) => total + position.profit_loss, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-700 mb-2">Panda Trading</h1>
        <p className="text-muted-foreground">
          Professional trading platform with real market data and advanced analytics.
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">${totalPortfolioValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Cash</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolio?.cash.toFixed(2) || '0.00'}</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Stocks Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalStockValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">P&L</CardTitle>
            {totalProfitLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalProfitLoss.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trading" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-emerald-50 border border-emerald-200">
          <TabsTrigger value="trading" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trading
          </TabsTrigger>
          <TabsTrigger value="search" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <Search className="h-4 w-4 mr-2" />
            Search
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Market
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <Calculator className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="academy" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Academy
          </TabsTrigger>
          <TabsTrigger value="adventures" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <Map className="h-4 w-4 mr-2" />
            Adventures
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trading" className="space-y-6">
          <MarketSimulation />
          
          {/* Portfolio Analysis */}
          <PortfolioCharts 
            cash={portfolio?.cash || 0}
            positions={positionsWithCurrentValue}
            totalValue={totalPortfolioValue}
          />

          {/* Current Positions */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-700">Current Positions</CardTitle>
              <CardDescription>Your stock holdings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              {positionsWithCurrentValue.length > 0 ? (
                <div className="space-y-4">
                  {positionsWithCurrentValue.map((position) => (
                    <div key={position.id} className="flex items-center justify-between p-4 border border-emerald-100 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold">{position.symbol}</h3>
                          <p className="text-sm text-muted-foreground">
                            {position.shares} shares @ ${position.avg_price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${position.current_value.toFixed(2)}</div>
                        <div className={`text-sm ${position.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {position.profit_loss >= 0 ? '+' : ''}${position.profit_loss.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 text-emerald-300" />
                  <p>No positions yet. Start trading to see your portfolio!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search" className="space-y-6">
          <EnhancedSecuritiesSearch onSelectSecurity={handleSecuritySelect} />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <MarketDashboard />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <FinancialStatementsViewer />
        </TabsContent>

        <TabsContent value="academy" className="space-y-6">
          <TradingAcademy />
        </TabsContent>

        <TabsContent value="adventures" className="space-y-6">
          <PhilAdventures />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaperTradingPage;