/**
 * TopBar Component
 * 
 * Displays current game stats: Bamboo, XP, Energy, Production rate, Burn rate
 * Updated with light green / sage / brown theme.
 */

import React, { useState } from 'react';
import { Leaf, Sparkles, Battery, TrendingUp, TrendingDown, Pause, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import { Progress } from '@/components/ui/progress';
import { ENERGY } from '@/config/gameConfig';
import { empireClasses, EMPIRE_THEME } from '@/config/empireTheme';
import PandaLogo from '@/components/icons/PandaLogo';
import EmpireTutorial from './EmpireTutorial';

const TopBar: React.FC = () => {
  const bamboo = useGameStore(state => state.bamboo);
  const xp = useGameStore(state => state.xp);
  const energy = useGameStore(state => state.energy);
  const isPaused = useGameStore(state => state.isPaused);
  const getProductionPerHour = useGameStore(state => state.getProductionPerHour);
  const getBurnRatePerHour = useGameStore(state => state.getBurnRatePerHour);
  const getStorageCapacity = useGameStore(state => state.getStorageCapacity);

  const [showTutorial, setShowTutorial] = useState(false);
  
  // Check if tutorial has been completed
  const tutorialComplete = localStorage.getItem('empireTutorialComplete') === 'true';

  const productionPerHour = getProductionPerHour();
  const burnRatePerHour = getBurnRatePerHour();
  const netProduction = productionPerHour - burnRatePerHour;
  const storageCapacity = getStorageCapacity();
  const bambooPercent = (bamboo / storageCapacity) * 100;

  // Energy color based on level
  const getEnergyColor = () => {
    if (energy < ENERGY.thresholds.low) return 'text-[#B84C4C]';
    if (energy < ENERGY.thresholds.medium) return 'text-[#B8873A]';
    return 'text-[#5A9B5E]';
  };

  const getEnergyBarColor = () => {
    if (energy < ENERGY.thresholds.low) return 'bg-[#B84C4C]';
    if (energy < ENERGY.thresholds.medium) return 'bg-[#B8873A]';
    return 'bg-[#5A9B5E]';
  };

  return (
    <>
      <div className={cn(
        "border-b shadow-sm",
        empireClasses.bgSecondary,
        empireClasses.borderDefault
      )}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left side: Logo + Title */}
            <div className="flex items-center gap-3">
              {/* Clickable Logo for Tutorial */}
              <button
                onClick={() => setShowTutorial(true)}
                className="relative group"
                title="Open Tutorial"
              >
                <PandaLogo className="h-10 w-10 transition-transform duration-150 group-hover:scale-105" />
                {/* Tutorial badge if not completed */}
                {!tutorialComplete && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#B84C4C] rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    !
                  </span>
                )}
              </button>
              <div className="flex flex-col">
                <span className={cn("font-bold text-lg", empireClasses.textPrimary)}>
                  Bamboo Empire
                </span>
                <button 
                  onClick={() => setShowTutorial(true)}
                  className={cn(
                    "text-xs flex items-center gap-1 hover:underline",
                    empireClasses.textSecondary
                  )}
                >
                  <HelpCircle className="h-3 w-3" />
                  Tutorial
                </button>
              </div>
            </div>

            {/* Right side: Resource Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Bamboo */}
              <div className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 border",
                empireClasses.bgCard,
                empireClasses.borderDefault
              )}>
                <Leaf className="h-5 w-5 text-[#7A9B7E]" />
                <div className="flex flex-col">
                  <span className={cn("font-bold text-lg", empireClasses.textPrimary)}>
                    {Math.floor(bamboo).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <Progress 
                      value={bambooPercent} 
                      className="h-1 w-16 bg-[#E4EBE4]"
                    />
                    <span className={cn("text-xs", empireClasses.textMuted)}>
                      /{storageCapacity}
                    </span>
                  </div>
                </div>
              </div>

              {/* XP */}
              <div className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 border",
                empireClasses.bgCard,
                empireClasses.borderDefault
              )}>
                <Sparkles className="h-5 w-5 text-[#A07C5B]" />
                <div className="flex flex-col">
                  <span className={cn("font-bold text-lg", empireClasses.textPrimary)}>
                    {Math.floor(xp).toLocaleString()}
                  </span>
                  <span className={cn("text-xs", empireClasses.textMuted)}>XP</span>
                </div>
              </div>

              {/* Energy */}
              <div className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 border",
                empireClasses.bgCard,
                empireClasses.borderDefault
              )}>
                <Battery className={cn("h-5 w-5", getEnergyColor())} />
                <div className="flex flex-col">
                  <span className={cn("font-bold text-lg", getEnergyColor())}>
                    {Math.floor(energy)}%
                  </span>
                  <div className="w-16 h-1.5 bg-[#E4EBE4] rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-150", getEnergyBarColor())}
                      style={{ width: `${energy}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Production Rate */}
              <div className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 border",
                empireClasses.bgCard,
                empireClasses.borderDefault
              )}>
                {isPaused ? (
                  <Pause className="h-5 w-5 text-[#B8873A]" />
                ) : netProduction >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-[#5A9B5E]" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-[#B84C4C]" />
                )}
                <div className="flex flex-col">
                  <span className={cn(
                    "font-bold text-lg",
                    isPaused ? "text-[#B8873A]" : 
                    netProduction >= 0 ? "text-[#5A9B5E]" : "text-[#B84C4C]"
                  )}>
                    {isPaused ? 'Paused' : `${netProduction >= 0 ? '+' : ''}${netProduction.toFixed(1)}`}
                  </span>
                  <span className={cn("text-xs", empireClasses.textMuted)}>/hour</span>
                </div>
              </div>

              {/* Burn Rate (if any) */}
              {burnRatePerHour > 0 && !isPaused && (
                <div className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 border",
                  "bg-[#B84C4C]/10 border-[#B84C4C]/20"
                )}>
                  <TrendingDown className="h-4 w-4 text-[#B84C4C]" />
                  <div className="flex flex-col">
                    <span className="text-[#B84C4C] font-medium text-sm">
                      -{burnRatePerHour.toFixed(1)}
                    </span>
                    <span className="text-[#B84C4C]/70 text-xs">drain</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Modal */}
      <EmpireTutorial 
        open={showTutorial} 
        onClose={() => setShowTutorial(false)} 
      />
    </>
  );
};

export default TopBar;
