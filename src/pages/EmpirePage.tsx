import React from 'react';
import { Crown, Coins, Trophy } from 'lucide-react';
import CoinTreasury from '@/components/empire/CoinTreasury';
import ProgressOverview from '@/components/empire/ProgressOverview';

const EmpirePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Crown className="h-12 w-12 text-amber-600 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Bamboo Empire
              </h1>
              <Crown className="h-12 w-12 text-amber-600 animate-pulse" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build your financial knowledge empire. Track progress, earn Bamboo Coins, and compete with other learners!
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border-2 border-amber-200 flex items-center gap-3 shadow-lg">
              <Coins className="h-8 w-8 text-amber-500" />
              <div>
                <div className="text-sm text-muted-foreground">Universal Currency</div>
                <div className="font-bold">Bamboo Coins</div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border-2 border-purple-200 flex items-center gap-3 shadow-lg">
              <Trophy className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">Compete & Win</div>
                <div className="font-bold">Leaderboards</div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border-2 border-green-200 flex items-center gap-3 shadow-lg">
              <Crown className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-sm text-muted-foreground">Unlock Rewards</div>
                <div className="font-bold">Shop & Prizes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 space-y-8">
        {/* Coin Treasury */}
        <CoinTreasury />

        {/* Progress Overview */}
        <ProgressOverview />

        {/* Coming Soon Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 border-2 border-dashed border-muted text-center space-y-4">
            <Trophy className="h-12 w-12 mx-auto text-purple-500 opacity-50" />
            <h3 className="text-xl font-bold text-muted-foreground">Leaderboards</h3>
            <p className="text-sm text-muted-foreground">
              Compete with other learners daily, weekly, and all-time!
            </p>
            <div className="text-xs bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full inline-block">
              Coming in Phase 2
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 border-2 border-dashed border-muted text-center space-y-4">
            <Coins className="h-12 w-12 mx-auto text-amber-500 opacity-50" />
            <h3 className="text-xl font-bold text-muted-foreground">Bamboo Shop</h3>
            <p className="text-sm text-muted-foreground">
              Spend coins on power-ups, cosmetics, and exclusive content!
            </p>
            <div className="text-xs bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full inline-block">
              Coming in Phase 3
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-6 text-center">How Bamboo Empire Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600">1</div>
              <h4 className="font-semibold">Learn & Earn XP</h4>
              <p className="text-sm text-muted-foreground">
                Complete activities across the platform to earn XP
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-amber-600">2</div>
              <h4 className="font-semibold">Convert to Coins</h4>
              <p className="text-sm text-muted-foreground">
                10 XP automatically converts to 1 Bamboo Coin
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-green-600">3</div>
              <h4 className="font-semibold">Spend & Compete</h4>
              <p className="text-sm text-muted-foreground">
                Use coins in the shop and climb the leaderboards!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmpirePage;
