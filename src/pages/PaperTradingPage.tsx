import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Lightbulb, ArrowUp, ArrowDown, PieChart, ShoppingCart, MinusCircle, Search, ArrowLeft } from 'lucide-react';
import { Pie as RechartsPie, PieChart as RechartsPieChart, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface StockHolding {
  id: string;
  ticker: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  dayChange: number;
  dayChangePercent: number;
  type: 'Stock' | 'ETF' | 'Bond';
}

const initialHoldings: StockHolding[] = [
  { id: '1', ticker: 'AAPL', name: 'Apple Inc.', shares: 10, avgPrice: 150.00, currentPrice: 175.20, dayChange: 2.50, dayChangePercent: 1.45, type: 'Stock' },
  { id: '2', ticker: 'MSFT', name: 'Microsoft Corp.', shares: 5, avgPrice: 400.00, currentPrice: 420.50, dayChange: -1.10, dayChangePercent: -0.26, type: 'Stock' },
  { id: '3', ticker: 'TSLA', name: 'Tesla, Inc.', shares: 15, avgPrice: 180.00, currentPrice: 170.80, dayChange: 5.60, dayChangePercent: 3.39, type: 'Stock' },
  { id: '4', ticker: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 8, avgPrice: 430.00, currentPrice: 435.30, dayChange: 1.20, dayChangePercent: 0.28, type: 'ETF' },
  { id: '5', ticker: 'BND', name: 'Vanguard Total Bond ETF', shares: 20, avgPrice: 72.00, currentPrice: 72.50, dayChange: 0.10, dayChangePercent: 0.14, type: 'Bond' },
];

const availableStocksForSearch: StockHolding[] = [
  ...initialHoldings,
  { id: '6', ticker: 'AMZN', name: 'Amazon.com, Inc.', shares: 0, avgPrice: 184.65, currentPrice: 184.65, dayChange: 2.15, dayChangePercent: 1.18, type: 'Stock' },
];

const ASSET_TYPE_COLORS: { [key in StockHolding['type'] | string]: string } = {
  Stock: 'hsl(var(--chart-1))',
  ETF: 'hsl(var(--chart-2))',
  Bond: 'hsl(var(--chart-3))',
  Default: 'hsl(var(--chart-4))',
};

const PaperTradingPage = () => {
  const { toast } = useToast();
  const [holdings, setHoldings] = useState<StockHolding[]>([]);
  const [cashBalance, setCashBalance] = useState<number>(100000);

  const [isTradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockHolding | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [sharesToTrade, setSharesToTrade] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StockHolding[]>([]);
  const [selectedAssetType, setSelectedAssetType] = useState<StockHolding['type'] | null>(null);

  useEffect(() => {
    const savedHoldings = localStorage.getItem('paper_holdings');
    const savedCash = localStorage.getItem('paper_cash_balance');
    if (savedHoldings) {
      setHoldings(JSON.parse(savedHoldings));
    } else {
      setHoldings(initialHoldings);
    }
    if (savedCash) {
      setCashBalance(JSON.parse(savedCash));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('paper_holdings', JSON.stringify(holdings));
  }, [holdings]);

  useEffect(() => {
    localStorage.setItem('paper_cash_balance', JSON.stringify(cashBalance));
  }, [cashBalance]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = availableStocksForSearch.filter(stock =>
      (stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
       stock.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !holdings.some(h => h.id === stock.id)
    );
    setSearchResults(filtered);
  }, [searchQuery, holdings]);

  const { totalPortfolioValue, totalInvestedValue, overallGainLoss, overallGainLossPercent } = useMemo(() => {
    const totalPortfolioValue = holdings.reduce((acc, stock) => acc + stock.shares * stock.currentPrice, 0);
    const totalInvestedValue = holdings.reduce((acc, stock) => acc + stock.shares * stock.avgPrice, 0);
    const overallGainLoss = totalPortfolioValue - totalInvestedValue;
    const overallGainLossPercent = totalInvestedValue > 0 ? (overallGainLoss / totalInvestedValue) * 100 : 0;
    return { totalPortfolioValue, totalInvestedValue, overallGainLoss, overallGainLossPercent };
  }, [holdings]);

  const totalAssetsValue = totalPortfolioValue + cashBalance;

  const handleOpenTradeDialog = (stock: StockHolding, type: 'buy' | 'sell') => {
    setSelectedStock(stock);
    setTradeType(type);
    setSharesToTrade(1);
    setTradeDialogOpen(true);
  };

  const handleExecuteTrade = () => {
    if (!selectedStock || sharesToTrade <= 0) return;
    const tradeCost = sharesToTrade * selectedStock.currentPrice;

    if (tradeType === 'buy') {
      if (cashBalance < tradeCost) {
        toast({ title: "Error", description: "Not enough cash to complete this purchase.", variant: "destructive" });
        return;
      }
      
      const newHoldings = [...holdings];
      const existingHoldingIndex = newHoldings.findIndex(h => h.id === selectedStock.id);

      if (existingHoldingIndex > -1) {
        const existingHolding = newHoldings[existingHoldingIndex];
        const totalShares = existingHolding.shares + sharesToTrade;
        const newAvgPrice = ((existingHolding.shares * existingHolding.avgPrice) + tradeCost) / totalShares;
        newHoldings[existingHoldingIndex] = { ...existingHolding, shares: totalShares, avgPrice: newAvgPrice };
      } else {
        newHoldings.push({ ...selectedStock, shares: sharesToTrade, avgPrice: selectedStock.currentPrice });
      }
      setHoldings(newHoldings);
      setCashBalance(cashBalance - tradeCost);
      toast({ title: "Success", description: `Successfully bought ${sharesToTrade} share(s) of ${selectedStock.ticker}.`});
    } else { // sell
      const existingHolding = holdings.find(h => h.id === selectedStock.id);
      if (!existingHolding || existingHolding.shares < sharesToTrade) {
        toast({ title: "Error", description: "Not enough shares to sell.", variant: "destructive" });
        return;
      }
      
      const newHoldings = holdings.map(h => h.id === selectedStock.id ? { ...h, shares: h.shares - sharesToTrade } : h).filter(h => h.shares > 0);
      setHoldings(newHoldings);
      setCashBalance(cashBalance + tradeCost);
      toast({ title: "Success", description: `Successfully sold ${sharesToTrade} share(s) of ${selectedStock.ticker}.`});
    }
    setTradeDialogOpen(false);
  };

  const pieChartData = useMemo(() => holdings.map(stock => ({
    name: stock.ticker,
    value: stock.shares * stock.currentPrice,
    fill: `var(--color-${stock.ticker.toLowerCase()})`,
  })), [holdings]);

  const assetTypeAllocation = useMemo(() => {
    const typeMap: Map<StockHolding['type'], number> = new Map();
    holdings.forEach(h => {
        const value = h.shares * h.currentPrice;
        typeMap.set(h.type, (typeMap.get(h.type) || 0) + value);
    });

    return Array.from(typeMap.entries()).map(([name, value]) => ({
        name,
        value,
        fill: ASSET_TYPE_COLORS[name] || ASSET_TYPE_COLORS.Default,
    }));
  }, [holdings]);

  const individualHoldingAllocation = useMemo(() => {
    if (!selectedAssetType) return { data: [], config: {} };
    
    const filteredHoldings = holdings.filter(h => h.type === selectedAssetType);
    
    const data = filteredHoldings.map(h => ({
        name: h.ticker,
        value: h.shares * h.currentPrice,
        fill: `var(--color-${h.ticker.toLowerCase()})`,
    }));

    const config: ChartConfig = {};
    filteredHoldings.forEach((stock, index) => {
      config[stock.ticker.toLowerCase()] = {
        label: stock.ticker,
        color: `hsl(var(--chart-${index + 1}))`,
      };
    });

    return { data, config };
  }, [holdings, selectedAssetType]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Dialog open={isTradeDialogOpen} onOpenChange={setTradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedStock?.ticker}</DialogTitle>
            <DialogDescription>
              Current Price: ${selectedStock?.currentPrice.toFixed(2)}. You have ${cashBalance.toFixed(2)} cash available.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shares" className="text-right">Shares</Label>
              <Input
                id="shares"
                type="number"
                value={sharesToTrade}
                onChange={(e) => setSharesToTrade(Math.max(1, parseInt(e.target.value) || 1))}
                className="col-span-3"
                min="1"
              />
            </div>
            <div className="flex justify-between font-medium">
              <span>Total cost:</span>
              <span>${(sharesToTrade * (selectedStock?.currentPrice || 0)).toFixed(2)}</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleExecuteTrade}>Execute {tradeType === 'buy' ? 'Buy' : 'Sell'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="text-center mb-12">
        <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Panda Trading Portfolio</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Practice your trading strategies. Your portfolio is saved in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Holdings</CardTitle>
            <CardDescription>Overview of your current mock investments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 relative">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search to add stocks (e.g., AAPL, AMZN)"
                  className="w-full p-2 bg-background text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchResults.length > 0 && (
                <Card className="absolute top-full left-0 right-0 z-10 mt-1 shadow-lg">
                  <CardContent className="p-0">
                    <ul className="py-1">
                      {searchResults.map(stock => (
                        <li key={stock.id} className="px-3 py-2 hover:bg-muted flex justify-between items-center">
                          <div>
                            <span className="font-bold">{stock.ticker}</span>
                            <span className="text-sm text-muted-foreground ml-2">{stock.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => {
                            handleOpenTradeDialog(stock, 'buy');
                            setSearchQuery('');
                          }}>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Buy
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Shares</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Day's Change</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((stock) => {
                  const value = stock.shares * stock.currentPrice;
                  const isPositive = stock.dayChange >= 0;
                  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
                  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;
                  return (
                    <TableRow key={stock.id}>
                      <TableCell className="font-medium">{stock.ticker}</TableCell>
                      <TableCell>{stock.type}</TableCell>
                      <TableCell className="text-right">{stock.shares}</TableCell>
                      <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className={`text-right ${changeColor} flex items-center justify-end`}>
                        <ChangeIcon className="h-3 w-3 mr-1" />
                        {isPositive ? '+' : ''}{stock.dayChange.toFixed(2)} ({stock.dayChangePercent.toFixed(2)}%)
                      </TableCell>
                      <TableCell className="text-right">${value.toFixed(2)}</TableCell>
                      <TableCell className="text-center space-x-1">
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" title="Buy" onClick={() => handleOpenTradeDialog(stock, 'buy')}>
                          <ShoppingCart className="h-4 w-4 mr-1" /> Buy
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" title="Sell" onClick={() => handleOpenTradeDialog(stock, 'sell')}>
                          <MinusCircle className="h-4 w-4 mr-1" /> Sell
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                 {holdings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground h-24">
                      You have no holdings.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="cash-balance" className="text-muted-foreground">Cash Balance:</Label>
                <Input
                  id="cash-balance"
                  type="number"
                  value={cashBalance.toFixed(0)}
                  onChange={(e) => setCashBalance(Number(e.target.value))}
                  className="font-semibold w-32 text-right"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Holdings Value:</span>
                <span className="font-semibold">${totalPortfolioValue.toFixed(2)}</span>
              </div>
               <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span className="text-foreground">Total Assets:</span>
                <span className="text-foreground">${totalAssetsValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overall P/L:</span>
                <span className={`font-semibold ${overallGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {overallGainLoss >= 0 ? '+' : ''}${overallGainLoss.toFixed(2)} ({overallGainLossPercent.toFixed(2)}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Allocation
                </div>
                {selectedAssetType && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAssetType(null)}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Overview
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {holdings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1 space-y-2">
                    <h3 className="font-semibold text-muted-foreground mb-2 px-3">
                      {selectedAssetType ? `${selectedAssetType} Holdings` : 'Asset Types'}
                    </h3>
                    {selectedAssetType ? (
                      individualHoldingAllocation.data.map(item => {
                        const totalForType = individualHoldingAllocation.data.reduce((acc, i) => acc + i.value, 0);
                        const percentage = totalForType > 0 ? (item.value / totalForType) * 100 : 0;
                        const itemConfig = individualHoldingAllocation.config[item.name.toLowerCase()];
                        return (
                          <div key={item.name} className="w-full text-left p-3 rounded-lg flex justify-between items-center bg-muted/50">
                            <div className="flex items-center gap-2">
                              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: itemConfig?.color }} />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <span className="font-semibold">{percentage.toFixed(1)}%</span>
                          </div>
                        )
                      })
                    ) : (
                      assetTypeAllocation.map(item => {
                        const percentage = totalPortfolioValue > 0 ? (item.value / totalPortfolioValue) * 100 : 0;
                        return (
                          <button
                            key={item.name}
                            onClick={() => setSelectedAssetType(item.name)}
                            className={cn(
                              "w-full text-left p-3 rounded-lg flex justify-between items-center transition-all hover:bg-muted/50",
                              selectedAssetType === item.name ? 'bg-muted ring-2 ring-primary' : ''
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <span className="font-semibold">{percentage.toFixed(1)}%</span>
                          </button>
                        );
                      })
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <ChartContainer
                      config={selectedAssetType ? individualHoldingAllocation.config : {}}
                      className="mx-auto aspect-square h-48"
                    >
                      <RechartsPieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        {selectedAssetType ? (
                          <RechartsPie data={individualHoldingAllocation.data} dataKey="value" nameKey="name" innerRadius={40} strokeWidth={5}>
                            {individualHoldingAllocation.data.map((entry) => (
                              <Cell key={entry.name} fill={entry.fill} />
                            ))}
                          </RechartsPie>
                        ) : (
                          <RechartsPie data={assetTypeAllocation} dataKey="value" nameKey="name" innerRadius={40} strokeWidth={5}>
                            {assetTypeAllocation.map((entry) => (
                              <Cell key={entry.name} fill={entry.fill} />
                            ))}
                          </RechartsPie>
                        )}
                      </RechartsPieChart>
                    </ChartContainer>
                  </div>
                </div>
              ) : (
                <div className="h-48 w-full border-2 border-dashed border-muted-foreground/30 rounded-md flex items-center justify-center bg-muted/20">
                  <p className="text-sm text-muted-foreground">No holdings to display in chart.</p>
                </div>
              )}
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
                <p className="text-sm text-muted-foreground">Your portfolio shows a mix of stocks and ETFs. Exploring other sectors or asset classes could further reduce risk.</p>
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
