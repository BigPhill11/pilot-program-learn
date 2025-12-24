import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, TrendingUp, Wallet, PiggyBank } from 'lucide-react';
import { useBambooCoins } from '@/hooks/useBambooCoins';

const CoinTreasury: React.FC = () => {
  const { balance, sourceBreakdown, loading } = useBambooCoins();

  if (loading) {
    return (
      <Card className="border-2 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-amber-500" />
            Bamboo Coin Treasury
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-muted rounded" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate top earning sources
  const sortedSources = Object.entries(sourceBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const totalFromSources = sortedSources.reduce((sum, [, coins]) => sum + coins, 0);

  return (
    <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <Coins className="h-6 w-6" />
          Bamboo Coin Treasury
        </CardTitle>
        <CardDescription>Your universal currency for the Bamboo Empire</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Balance */}
        <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-lg border-2 border-amber-300 shadow-lg">
          <div className="text-6xl font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center justify-center gap-3">
            <Coins className="h-12 w-12" />
            {balance.total_coins.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Bamboo Coins Available</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">Lifetime Earned</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {balance.lifetime_earned.toLocaleString()}
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {balance.total_spent.toLocaleString()}
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-muted-foreground">Savings Rate</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {balance.lifetime_earned > 0
                ? Math.round((balance.total_coins / balance.lifetime_earned) * 100)
                : 0}%
            </div>
          </div>
        </div>

        {/* Coin Sources Breakdown */}
        {sortedSources.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground">Top Earning Sources</h4>
            {sortedSources.map(([source, coins]) => {
              const percentage = totalFromSources > 0 
                ? Math.round((coins / totalFromSources) * 100) 
                : 0;
              return (
                <div key={source} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="capitalize">{source.replace(/_/g, ' ')}</span>
                    <span className="font-semibold text-amber-600">
                      {coins} coins ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Conversion Info */}
        <div className="text-center p-3 bg-amber-100 dark:bg-amber-950/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 <span className="font-semibold">Earn Rate:</span> 10 XP = 1 Bamboo Coin
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinTreasury;
