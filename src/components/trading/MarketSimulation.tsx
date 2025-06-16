
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface Portfolio {
  cash: number;
  positions: Record<string, { shares: number; avgPrice: number }>;
  totalValue: number;
}

const MarketSimulation: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 10000,
    positions: {},
    totalValue: 10000
  });

  const [stocks] = useState<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.15, changePercent: 1.45 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -15.20, changePercent: -0.55 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 305.50, change: 8.75, changePercent: 2.95 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.30, change: -12.40, changePercent: -4.81 }
  ]);

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeAmount, setTradeAmount] = useState<number>(1);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const executeTrade = () => {
    if (!selectedStock) return;

    const totalCost = selectedStock.price * tradeAmount;

    if (tradeType === 'buy') {
      if (portfolio.cash >= totalCost) {
        setPortfolio(prev => {
          const newPositions = { ...prev.positions };
          if (newPositions[selectedStock.symbol]) {
            const currentShares = newPositions[selectedStock.symbol].shares;
            const currentAvgPrice = newPositions[selectedStock.symbol].avgPrice;
            const newShares = currentShares + tradeAmount;
            const newAvgPrice = ((currentAvgPrice * currentShares) + totalCost) / newShares;
            newPositions[selectedStock.symbol] = { shares: newShares, avgPrice: newAvgPrice };
          } else {
            newPositions[selectedStock.symbol] = { shares: tradeAmount, avgPrice: selectedStock.price };
          }

          return {
            ...prev,
            cash: prev.cash - totalCost,
            positions: newPositions
          };
        });
      }
    } else {
      // Sell logic
      const position = portfolio.positions[selectedStock.symbol];
      if (position && position.shares >= tradeAmount) {
        setPortfolio(prev => {
          const newPositions = { ...prev.positions };
          newPositions[selectedStock.symbol] = {
            ...position,
            shares: position.shares - tradeAmount
          };
          
          if (newPositions[selectedStock.symbol].shares === 0) {
            delete newPositions[selectedStock.symbol];
          }

          return {
            ...prev,
            cash: prev.cash + totalCost,
            positions: newPositions
          };
        });
      }
    }

    setSelectedStock(null);
    setTradeAmount(1);
  };

  useEffect(() => {
    // Calculate total portfolio value
    const positionsValue = Object.entries(portfolio.positions).reduce((total, [symbol, position]) => {
      const stock = stocks.find(s => s.symbol === symbol);
      if (stock) {
        return total + (stock.price * position.shares);
      }
      return total;
    }, 0);

    setPortfolio(prev => ({
      ...prev,
      totalValue: prev.cash + positionsValue
    }));
  }, [portfolio.positions, portfolio.cash, stocks]);

  const portfolioReturn = portfolio.totalValue - 10000;
  const portfolioReturnPercent = ((portfolio.totalValue - 10000) / 10000) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">${portfolio.totalValue.toFixed(2)}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedStock?.symbol === stock.symbol ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedStock(stock)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
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
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trading Panel</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStock ? (
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">{selectedStock.symbol}</p>
                  <p className="text-sm text-muted-foreground">{selectedStock.name}</p>
                  <p className="text-lg font-bold">${selectedStock.price}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={tradeType === 'buy' ? 'default' : 'outline'}
                    onClick={() => setTradeType('buy')}
                    className="flex-1"
                  >
                    Buy
                  </Button>
                  <Button
                    variant={tradeType === 'sell' ? 'default' : 'outline'}
                    onClick={() => setTradeType('sell')}
                    className="flex-1"
                  >
                    Sell
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium">Shares</label>
                  <input
                    type="number"
                    min="1"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(parseInt(e.target.value) || 1)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="p-3 bg-muted rounded">
                  <p className="text-sm">Total: ${(selectedStock.price * tradeAmount).toFixed(2)}</p>
                </div>

                <Button onClick={executeTrade} className="w-full">
                  Execute {tradeType === 'buy' ? 'Buy' : 'Sell'} Order
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Select a stock to start trading
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {Object.keys(portfolio.positions).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(portfolio.positions).map(([symbol, position]) => {
                const stock = stocks.find(s => s.symbol === symbol);
                if (!stock) return null;

                const currentValue = stock.price * position.shares;
                const gainLoss = currentValue - (position.avgPrice * position.shares);
                const gainLossPercent = ((currentValue - (position.avgPrice * position.shares)) / (position.avgPrice * position.shares)) * 100;

                return (
                  <div key={symbol} className="p-3 border rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{symbol}</p>
                        <p className="text-xs text-muted-foreground">{position.shares} shares @ ${position.avgPrice.toFixed(2)}</p>
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
