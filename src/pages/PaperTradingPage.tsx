
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Lightbulb, ArrowUp, ArrowDown, PieChart, ShoppingCart, MinusCircle, Search } from 'lucide-react';

interface StockHolding {
  id: string;
  ticker: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  dayChange: number;
  dayChangePercent: number;
}

const dummyHoldings: StockHolding[] = [
  { id: '1', ticker: 'AAPL', name: 'Apple Inc.', shares: 10, avgPrice: 150.00, currentPrice: 175.20, dayChange: 2.50, dayChangePercent: 1.45 },
  { id: '2', ticker: 'MSFT', name: 'Microsoft Corp.', shares: 5, avgPrice: 400.00, currentPrice: 420.50, dayChange: -1.10, dayChangePercent: -0.26 },
  { id: '3', ticker: 'TSLA', name: 'Tesla, Inc.', shares: 15, avgPrice: 180.00, currentPrice: 170.80, dayChange: 5.60, dayChangePercent: 3.39 },
  { id: '4', ticker: 'AMZN', name: 'Amazon.com, Inc.', shares: 8, avgPrice: 170.00, currentPrice: 185.30, dayChange: 1.20, dayChangePercent: 0.65 },
];

const PaperTradingPage = () => {
  const totalPortfolioValue = dummyHoldings.reduce((acc, stock) => acc + stock.shares * stock.currentPrice, 0);
  const totalInvestedValue = dummyHoldings.reduce((acc, stock) => acc + stock.shares * stock.avgPrice, 0);
  const overallGainLoss = totalPortfolioValue - totalInvestedValue;
  const overallGainLossPercent = totalInvestedValue > 0 ? (overallGainLoss / totalInvestedValue) * 100 : 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Paper Trading Portfolio</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Practice your trading strategies with this static demonstration. Full interactive features are coming soon!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Holdings</CardTitle>
            <CardDescription>Overview of your current mock investments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search and add stocks (e.g., AAPL) - Feature coming soon"
                className="w-full p-2 border rounded-md bg-background text-sm"
                disabled
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Shares</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Day's Change</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyHoldings.map((stock) => {
                  const value = stock.shares * stock.currentPrice;
                  const isPositive = stock.dayChange >= 0;
                  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
                  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;
                  return (
                    <TableRow key={stock.id}>
                      <TableCell className="font-medium">{stock.ticker}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell className="text-right">{stock.shares}</TableCell>
                      <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className={`text-right ${changeColor} flex items-center justify-end`}>
                        <ChangeIcon className="h-3 w-3 mr-1" />
                        {isPositive ? '+' : ''}{stock.dayChange.toFixed(2)} ({stock.dayChangePercent.toFixed(2)}%)
                      </TableCell>
                      <TableCell className="text-right">${value.toFixed(2)}</TableCell>
                      <TableCell className="text-center space-x-1">
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" title="Buy (Coming Soon)" disabled>
                          <ShoppingCart className="h-4 w-4 mr-1" /> Buy
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" title="Sell (Coming Soon)" disabled>
                          <MinusCircle className="h-4 w-4 mr-1" /> Sell
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value:</span>
                <span className="font-semibold">${totalPortfolioValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overall Gain/Loss:</span>
                <span className={`font-semibold ${overallGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {overallGainLoss >= 0 ? '+' : ''}${overallGainLoss.toFixed(2)} ({overallGainLossPercent.toFixed(2)}%)
                </span>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Cash Balance (Mock):</span>
                <span className="font-semibold">$10,000.00</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-primary" />
                Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full border-2 border-dashed border-muted-foreground/30 rounded-md flex items-center justify-center bg-muted/20">
                <p className="text-sm text-muted-foreground">Portfolio Allocation Chart [Visual Coming Soon]</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">Detailed chart will show stock distribution.</p>
            </CardContent>
          </Card>

          <Card className="bg-accent text-accent-foreground">
             <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" /> Did you know?
                </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Paper trading helps you understand market dynamics and test investment ideas before committing actual capital. It's a great way to learn and build confidence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Market Recommendations (Demo)</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Based on current (static) market data, here are some general observations. Real recommendations require live data and analysis.
        </p>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <Card className="p-4">
                <p className="font-semibold text-green-600">Consider Diversifying:</p>
                <p className="text-sm text-muted-foreground">Your portfolio shows a mix of tech stocks. Exploring other sectors like healthcare or consumer goods could reduce risk.</p>
            </Card>
            <Card className="p-4">
                <p className="font-semibold text-blue-600">Long-Term Outlook:</p>
                <p className="text-sm text-muted-foreground">For volatile stocks like TSLA, consider a long-term holding strategy rather than frequent trading, especially in paper trading.</p>
            </Card>
        </div>
      </div>

      <div className="text-center mt-12">
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaperTradingPage;
