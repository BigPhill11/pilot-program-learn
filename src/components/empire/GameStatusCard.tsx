/**
 * GameStatusCard - Full-sized display of Bamboo Empire game status for homepage
 * 
 * Shows bamboo, XP, energy, and production rate with a link to the full game.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGameStore } from '@/store/useGameStore';
import { Leaf, Sparkles, Zap, TrendingUp, ArrowRight, Castle } from 'lucide-react';
import { cn } from '@/lib/utils';

const GameStatusCard: React.FC = () => {
  const bamboo = useGameStore(state => state.bamboo);
  const xp = useGameStore(state => state.xp);
  const energy = useGameStore(state => state.energy);
  const initialized = useGameStore(state => state.initialized);
  const getProductionPerHour = useGameStore(state => state.getProductionPerHour);
  const getBurnRatePerHour = useGameStore(state => state.getBurnRatePerHour);
  const getStorageCapacity = useGameStore(state => state.getStorageCapacity);

  // Show a placeholder if game not initialized
  if (!initialized) {
    return (
      <Card className="col-span-full">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Castle className="w-8 h-8 text-emerald-500" />
              <div>
                <h3 className="font-semibold text-lg">Bamboo Empire</h3>
                <p className="text-sm text-muted-foreground">Build your financial empire</p>
              </div>
            </div>
            <Link to="/empire">
              <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                Start Playing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const capacity = getStorageCapacity();
  const bambooPercent = capacity > 0 ? (bamboo / capacity) * 100 : 0;
  const productionRate = getProductionPerHour();
  const burnRate = getBurnRatePerHour();
  const netRate = productionRate - burnRate;

  return (
    <Card className="col-span-full bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-purple-950/30 border-emerald-200 dark:border-emerald-800">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left side: Stats */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Bamboo */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {Math.floor(bamboo).toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">/ {capacity}</span>
                </div>
                <Progress 
                  value={bambooPercent} 
                  className="h-1.5 w-24 mt-1"
                />
              </div>
            </div>

            {/* XP */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {Math.floor(xp).toLocaleString()}
                </span>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </div>

            {/* Energy */}
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                energy > 60 
                  ? "bg-amber-100 dark:bg-amber-900/50" 
                  : energy > 30 
                    ? "bg-orange-100 dark:bg-orange-900/50"
                    : "bg-red-100 dark:bg-red-900/50"
              )}>
                <Zap className={cn(
                  "w-6 h-6",
                  energy > 60 
                    ? "text-amber-600 dark:text-amber-400" 
                    : energy > 30 
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-red-600 dark:text-red-400"
                )} />
              </div>
              <div>
                <span className={cn(
                  "text-2xl font-bold",
                  energy > 60 
                    ? "text-amber-700 dark:text-amber-300" 
                    : energy > 30 
                      ? "text-orange-700 dark:text-orange-300"
                      : "text-red-700 dark:text-red-300"
                )}>
                  {Math.floor(energy)}%
                </span>
                <div className="text-xs text-muted-foreground">Energy</div>
              </div>
            </div>

            {/* Net Production */}
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                netRate >= 0 
                  ? "bg-green-100 dark:bg-green-900/50"
                  : "bg-red-100 dark:bg-red-900/50"
              )}>
                <TrendingUp className={cn(
                  "w-6 h-6",
                  netRate >= 0 
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400 rotate-180"
                )} />
              </div>
              <div>
                <span className={cn(
                  "text-lg font-bold",
                  netRate >= 0 
                    ? "text-green-700 dark:text-green-300"
                    : "text-red-700 dark:text-red-300"
                )}>
                  {netRate >= 0 ? '+' : ''}{netRate.toFixed(1)}/hr
                </span>
                <div className="text-xs text-muted-foreground">Net Production</div>
              </div>
            </div>
          </div>

          {/* Right side: CTA */}
          <Link to="/empire">
            <Button 
              variant="default" 
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
            >
              <Castle className="w-5 h-5 mr-2" />
              Manage Empire
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStatusCard;



