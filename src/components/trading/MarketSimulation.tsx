
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { usePaperTrading } from '@/hooks/usePaperTrading';
import SecuritiesSearch from './SecuritiesSearch';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  assetType?: string;
}

const MarketSimulation: React.FC = () => {
  const {
    portfolio,
    positions,
    loading,
    executeTrade,
    calculateTotalValue
  } = usePaperTrading();

  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.15, changePercent: 1.45, assetType: 'stock' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -15.20, changePercent: -0.55, assetType: 'stock' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 305.50, change: 8.75, changePercent: 2.95, assetType: 'stock' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.30, change: -12.40, changePercent: -4.81, assetType: 'stock' }
  ]);

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeAmount, setTradeAmount] = useState<number>(1);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const stockPrices = stocks.reduce((acc, stock) => {
    acc[stock.symbol] = stock.price;
    return acc;
  }, {} as Record<string, number>);

  const totalValue = portfolio ? calculateTotalValue(stockPrices) : 0;
  const portfolioReturn = totalValue - 10000;
  const portfolioReturnPercent = ((totalValue - 10000) / 10000) * 100;

  const handleExecuteTrade = async () => {
    if (!selectedStock || !portfolio) return;

    await executeTrade(selectedStock.symbol, tradeAmount, selectedStock.price, tradeType);
    setSelectedStock(null);
    setTradeAmount(1);
  };

  const handleSelectSecurity = (security: any, price: number) => {
    const newStock: Stock = {
      symbol: security.symbol,
      name: security.name,
      price: price,
      change: 0,
      changePercent: 0,
      assetType: security.assetType
    };
    
    // Add to stocks list if not already present
    const existingStock = stocks.find(s => s.symbol === security.symbol);
    if (!existingStock) {
      setStocks(prev => [...prev, newStock]);
    }
    
    setSelectedStock(newStock);
  };

  const getPositionForStock = (symbol: string) => {
    return positions.find(p => p.symbol === symbol);
  };

  const getAssetTypeColor = (type?: string) => {
    switch (type) {
      case 'stock': return 'bg-emerald-100 text-emerald-800';
      case 'etf': return 'bg-blue-100 text-blue-800';
      case 'commodity': return 'bg-yellow-100 text-yellow-800';
      case 'index': return 'bg-purple-100 text-purple-800';
      case 'bond': return 'bg-gray-100 text-gray-800';
      default: return 'bg-emerald-100 text-emerald-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading your portfolio...</div>
        </CardContent>
      </Card>
    );
  }

  if (!portfolio) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Unable to load portfolio</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Target className="h-5 w-5" />
            Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-emerald-700">${totalValue.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Cash</p>
              <p className="text-xl font-semibold">${portfolio.cash.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Return</p>
              <p className={`text-xl font-semibold ${portfolioReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${portfolioReturn.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Return %</p>
              <p className={`text-xl font-semibold ${portfolioReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioReturnPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SecuritiesSearch onSelectSecurity={handleSelectSecurity} />
        </div>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-emerald-700">Available Securities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stocks.map((stock) => {
                const position = getPositionForStock(stock.symbol);
                return (
                  <div
                    key={stock.symbol}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedStock?.symbol === stock.symbol ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedStock(stock)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{stock.symbol}</p>
                          {stock.assetType && (
                            <Badge className={getAssetTypeColor(stock.assetType)}>
                              {stock.assetType.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{stock.name}</p>
                        {position && (
                          <p className="text-xs text-emerald-600">
                            Owned: {position.shares} shares @ ${position.avg_price.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${stock.price}</p>
                        <div className="flex items-center gap-1">
                          {stock.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                          <span className={`text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-emerald-700">Trading Panel</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStock ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold">{selectedStock.symbol}</p>
                    {selectedStock.assetType && (
                      <Badge className={getAssetTypeColor(selectedStock.assetType)}>
                        {selectedStock.assetType.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedStock.name}</p>
                  <p className="text-lg font-bold">${selectedStock.price}</p>
                  
                  {(() => {
                    const position = getPositionForStock(selectedStock.symbol);
                    return position ? (
                      <p className="text-sm text-emerald-600">
                        You own {position.shares} shares (avg: ${position.avg_price.toFixed(2)})
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">You don't own this security</p>
                    );
                  })()}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={tradeType === 'buy' ? 'default' : 'outline'}
                    onClick={() => setTradeType('buy')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Buy
                  </Button>
                  <Button
                    variant={tradeType === 'sell' ? 'default' : 'outline'}
                    onClick={() => setTradeType('sell')}
                    className="flex-1"
                    disabled={!getPositionForStock(selectedStock.symbol)}
                  >
                    Sell
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium">Shares</label>
                  <input
                    type="number"
                    min="1"
                    max={tradeType === 'sell' ? getPositionForStock(selectedStock.symbol)?.shares || 0 : undefined}
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(parseInt(e.target.value) || 1)}
                    className="w-full mt-1 px-3 py-2 border border-emerald-200 rounded-md focus:border-emerald-500"
                  />
                  {tradeType === 'sell' && (() => {
                    const position = getPositionForStock(selectedStock.symbol);
                    return position ? (
                      <p className="text-xs text-muted-foreground mt-1">
                        Max: {position.shares} shares
                      </p>
                    ) : null;
                  })()}
                </div>

                <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                  <p className="text-sm">Total: ${(selectedStock.price * tradeAmount).toFixed(2)}</p>
                  {tradeType === 'buy' && portfolio.cash < (selectedStock.price * tradeAmount) && (
                    <p className="text-xs text-red-600 mt-1">Insufficient cash</p>
                  )}
                </div>

                <Button 
                  onClick={handleExecuteTrade} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={
                    tradeType === 'buy' ? portfolio.cash < (selectedStock.price * tradeAmount) :
                    !getPositionForStock(selectedStock.symbol) || 
                    (getPositionForStock(selectedStock.symbol)?.shares || 0) < tradeAmount
                  }
                >
                  Execute {tradeType === 'buy' ? 'Buy' : 'Sell'} Order
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Search and select a security to start trading
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {positions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-700">Your Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {positions.map((position) => {
                const stock = stocks.find(s => s.symbol === position.symbol);
                const currentPrice = stock?.price || position.avg_price;
                const currentValue = currentPrice * position.shares;
                const costBasis = position.avg_price * position.shares;
                const gainLoss = currentValue - costBasis;
                const gainLossPercent = ((currentValue - costBasis) / costBasis) * 100;

                return (
                  <div key={position.id} className="p-3 border border-emerald-100 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{position.symbol}</p>
                          {position.asset_type && (
                            <Badge className={getAssetTypeColor(position.asset_type)}>
                              {position.asset_type.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {position.shares} shares @ ${position.avg_price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${currentValue.toFixed(2)}</p>
                        <p className={`text-xs ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarketSimulation;
