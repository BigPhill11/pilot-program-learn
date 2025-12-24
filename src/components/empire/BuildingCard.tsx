/**
 * BuildingCard Component
 * 
 * Displays a building with its stats and upgrade button.
 * Updated with light green / sage / brown theme.
 * Bamboo Farm supports debit/credit purchases.
 */

import React, { useState } from 'react';
import { Warehouse, Home, Factory, Sprout, ArrowUp, Lock, CreditCard, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import { useCreditStore } from '@/store/useCreditStore';
import {
  BuildingType,
  BUILDINGS,
  getBuildingStats,
  canUpgradeBuilding,
} from '@/config/gameConfig';
import { empireClasses } from '@/config/empireTheme';
import { toast } from 'sonner';

interface BuildingCardProps {
  type: BuildingType;
}

const BUILDING_ICONS: Record<BuildingType, React.ReactNode> = {
  bambooFarm: <Sprout className="h-6 w-6" />,
  bambooStorage: <Warehouse className="h-6 w-6" />,
  pandaHouse: <Home className="h-6 w-6" />,
  workshop: <Factory className="h-6 w-6" />,
};

const BUILDING_COLORS: Record<BuildingType, { bg: string; text: string; border: string }> = {
  bambooFarm: { 
    bg: 'bg-[#7A9B7E]/10', 
    text: 'text-[#4F6F57]', 
    border: 'border-[#7A9B7E]/30' 
  },
  bambooStorage: { 
    bg: 'bg-[#B8873A]/10', 
    text: 'text-[#8B6520]', 
    border: 'border-[#B8873A]/30' 
  },
  pandaHouse: { 
    bg: 'bg-[#A07C5B]/10', 
    text: 'text-[#6B4E3D]', 
    border: 'border-[#A07C5B]/30' 
  },
  workshop: { 
    bg: 'bg-[#5A9B5E]/10', 
    text: 'text-[#3D7040]', 
    border: 'border-[#5A9B5E]/30' 
  },
};

const BuildingCard: React.FC<BuildingCardProps> = ({ type }) => {
  const bamboo = useGameStore(state => state.bamboo);
  const xp = useGameStore(state => state.xp);
  const buildings = useGameStore(state => state.buildings);
  const upgradeBuilding = useGameStore(state => state.upgradeBuilding);
  
  const creditState = useCreditStore();
  const [showPaymentChoice, setShowPaymentChoice] = useState(false);

  const building = BUILDINGS[type];
  const currentLevel = buildings[type];
  const stats = getBuildingStats(type, currentLevel);
  const nextStats = getBuildingStats(type, currentLevel + 1);
  const isMaxLevel = currentLevel >= building.maxLevel;
  
  const { canUpgrade, reason } = canUpgradeBuilding(type, currentLevel, bamboo, xp);
  const colors = BUILDING_COLORS[type];
  
  // Check if credit purchase is available for Bamboo Farm
  const isBambooFarm = type === 'bambooFarm';
  const creditEnabled = creditState.enabled;
  const canUseCredit = creditState.isUnlocked(xp) && creditEnabled;
  const upgradeCost = nextStats.upgradeCost;
  const hasEnoughBamboo = bamboo >= upgradeCost;
  const hasEnoughCredit = creditState.balance + upgradeCost <= creditState.limit;
  const meetsXpRequirement = xp >= nextStats.xpRequired;
  
  // Can upgrade with credit if: XP requirement met, has credit room, but not enough bamboo
  const canUpgradeWithCredit = isBambooFarm && canUseCredit && meetsXpRequirement && hasEnoughCredit && !isMaxLevel;

  const handleUpgrade = () => {
    if (canUpgrade) {
      upgradeBuilding(type);
    }
  };
  
  const handleUpgradeWithCredit = () => {
    if (!canUpgradeWithCredit) return;
    
    // Charge to credit
    const result = creditState.purchaseWithCredit(upgradeCost);
    
    if (result.success) {
      // Manually upgrade without deducting bamboo
      useGameStore.setState({
        buildings: {
          ...buildings,
          bambooFarm: currentLevel + 1,
        },
      });
      
      toast.success(`Upgraded with credit! ${result.message}`);
      setShowPaymentChoice(false);
    } else {
      toast.error(result.message);
    }
  };
  
  const handleUpgradeClick = () => {
    // If bamboo farm and can use credit, show payment choice
    if (isBambooFarm && canUseCredit && !isMaxLevel && meetsXpRequirement) {
      setShowPaymentChoice(true);
    } else {
      handleUpgrade();
    }
  };

  // Get the primary stat to display
  const getPrimaryStat = () => {
    if (stats.productionPerHour !== undefined) {
      return { label: 'Production', value: `+${stats.productionPerHour}/hr` };
    }
    if (stats.capacity !== undefined) {
      return { label: 'Capacity', value: stats.capacity.toLocaleString() };
    }
    if (stats.growthPerHour !== undefined) {
      return { label: 'Growth', value: `+${stats.growthPerHour}/hr` };
    }
    if (stats.burnRatePerHour !== undefined) {
      return { 
        label: 'Drain', 
        value: stats.burnRatePerHour > 0 ? `-${stats.burnRatePerHour}/hr` : 'None',
        isNegative: stats.burnRatePerHour > 0
      };
    }
    return { label: 'Level', value: currentLevel.toString() };
  };

  const getNextStat = () => {
    if (isMaxLevel) return null;
    
    if (nextStats.productionPerHour !== undefined && stats.productionPerHour !== undefined) {
      return `+${nextStats.productionPerHour - stats.productionPerHour}/hr`;
    }
    if (nextStats.capacity !== undefined && stats.capacity !== undefined) {
      return `+${nextStats.capacity - stats.capacity}`;
    }
    if (nextStats.growthPerHour !== undefined && stats.growthPerHour !== undefined) {
      return `+${nextStats.growthPerHour - stats.growthPerHour}/hr`;
    }
    if (nextStats.burnRatePerHour !== undefined && stats.burnRatePerHour !== undefined) {
      const diff = nextStats.burnRatePerHour - stats.burnRatePerHour;
      return diff > 0 ? `+${diff}/hr drain` : null;
    }
    return null;
  };

  const primaryStat = getPrimaryStat();
  const nextStatPreview = getNextStat();

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-150",
      empireClasses.card,
      empireClasses.cardHover
    )}>
      {/* Level badge */}
      <div className="absolute top-2 right-2">
        <Badge 
          variant="secondary" 
          className={cn(
            "font-bold border",
            colors.bg,
            colors.text,
            colors.border
          )}
        >
          Lv.{currentLevel}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg border",
            colors.bg,
            colors.border
          )}>
            <span className={colors.text}>
              {BUILDING_ICONS[type]}
            </span>
          </div>
          <CardTitle className={cn("text-lg", empireClasses.textPrimary)}>
            {building.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className={cn("text-sm", empireClasses.textSecondary)}>
          {building.description}
        </p>

        {/* Current stats */}
        <div className={cn(
          "flex justify-between items-center p-2 rounded-lg border",
          empireClasses.bgSecondary,
          empireClasses.borderSubtle
        )}>
          <span className={cn("text-sm", empireClasses.textSecondary)}>{primaryStat.label}</span>
          <span className={cn(
            "font-bold",
            'isNegative' in primaryStat && primaryStat.isNegative 
              ? "text-[#B84C4C]" 
              : "text-[#5A9B5E]"
          )}>
            {primaryStat.value}
          </span>
        </div>

        {/* Upgrade section */}
        {isMaxLevel ? (
          <div className={cn(
            "flex items-center justify-center gap-2 p-3 rounded-lg border",
            "bg-[#B8873A]/10 border-[#B8873A]/20"
          )}>
            <span className="text-[#8B6520] font-medium">Max Level Reached</span>
          </div>
        ) : showPaymentChoice ? (
          // Payment choice for Bamboo Farm with credit
          <div className="space-y-2">
            <p className={cn("text-xs text-center", empireClasses.textMuted)}>
              Choose payment method:
            </p>
            <Button
              onClick={() => {
                handleUpgrade();
                setShowPaymentChoice(false);
              }}
              disabled={!hasEnoughBamboo}
              className={cn(
                "w-full gap-2 transition-all duration-150",
                hasEnoughBamboo
                  ? "bg-[#7A9B7E] hover:bg-[#4F6F57] text-white"
                  : "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
              )}
            >
              <Wallet className="h-4 w-4" />
              Debit ({upgradeCost} 🎋)
            </Button>
            <Button
              onClick={handleUpgradeWithCredit}
              disabled={!hasEnoughCredit}
              className={cn(
                "w-full gap-2 transition-all duration-150",
                hasEnoughCredit
                  ? "bg-[#6B4E3D] hover:bg-[#8B6B54] text-white"
                  : "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
              )}
            >
              <CreditCard className="h-4 w-4" />
              Credit ({upgradeCost} 🎋)
            </Button>
            <Button
              onClick={() => setShowPaymentChoice(false)}
              variant="ghost"
              size="sm"
              className="w-full text-xs"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Next level preview */}
            {nextStatPreview && (
              <div className="flex items-center justify-between text-sm">
                <span className={empireClasses.textMuted}>Next level:</span>
                <span className="text-[#5A9B5E]">{nextStatPreview}</span>
              </div>
            )}

            {/* Upgrade button */}
            <Button
              onClick={handleUpgradeClick}
              disabled={!canUpgrade && !canUpgradeWithCredit}
              className={cn(
                "w-full gap-2 transition-all duration-150",
                canUpgrade || canUpgradeWithCredit
                  ? "bg-[#7A9B7E] hover:bg-[#4F6F57] text-white"
                  : "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
              )}
            >
              {canUpgrade ? (
                <>
                  <ArrowUp className="h-4 w-4" />
                  Upgrade ({upgradeCost} 🎋)
                </>
              ) : canUpgradeWithCredit ? (
                <>
                  <CreditCard className="h-4 w-4" />
                  Upgrade ({upgradeCost} 🎋)
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  {reason}
                </>
              )}
            </Button>
            
            {/* Credit available indicator for Bamboo Farm */}
            {isBambooFarm && canUseCredit && !hasEnoughBamboo && hasEnoughCredit && meetsXpRequirement && (
              <p className="text-xs text-center text-[#6B4E3D]">
                💳 Credit available
              </p>
            )}

            {/* XP requirement */}
            {!isMaxLevel && nextStats.xpRequired > xp && (
              <p className={cn("text-xs text-center", "text-[#A07C5B]")}>
                Requires {nextStats.xpRequired} XP (you have {Math.floor(xp)})
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BuildingCard;
