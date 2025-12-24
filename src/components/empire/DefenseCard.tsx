/**
 * DefenseCard Component
 * 
 * Displays a defense building with its stats and upgrade button.
 * Updated with light green / sage / brown theme.
 */

import React from 'react';
import { Shield, Umbrella, Zap, ArrowUp, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import {
  DefenseType,
  DEFENSES,
  getDefenseStats,
  canUpgradeDefense,
} from '@/config/gameConfig';
import { empireClasses } from '@/config/empireTheme';

interface DefenseCardProps {
  type: DefenseType;
}

const DEFENSE_ICONS: Record<DefenseType, React.ReactNode> = {
  emergencyFund: <Shield className="h-5 w-5" />,
  diversificationBarrier: <Umbrella className="h-5 w-5" />,
  energyShield: <Zap className="h-5 w-5" />,
};

const DEFENSE_COLORS: Record<DefenseType, { bg: string; text: string; border: string }> = {
  emergencyFund: { 
    bg: 'bg-[#6B4E3D]/10', 
    text: 'text-[#6B4E3D]', 
    border: 'border-[#6B4E3D]/30' 
  },
  diversificationBarrier: { 
    bg: 'bg-[#7A9B7E]/10', 
    text: 'text-[#4F6F57]', 
    border: 'border-[#7A9B7E]/30' 
  },
  energyShield: { 
    bg: 'bg-[#B8873A]/10', 
    text: 'text-[#8B6520]', 
    border: 'border-[#B8873A]/30' 
  },
};

const DEFENSE_PROTECTS: Record<DefenseType, string> = {
  emergencyFund: 'Unexpected Expense',
  diversificationBarrier: 'Income Cut',
  energyShield: 'Burnout',
};

const DefenseCard: React.FC<DefenseCardProps> = ({ type }) => {
  const bamboo = useGameStore(state => state.bamboo);
  const xp = useGameStore(state => state.xp);
  const defenses = useGameStore(state => state.defenses);
  const upgradeDefense = useGameStore(state => state.upgradeDefense);

  const defense = DEFENSES[type];
  const currentLevel = defenses[type];
  const stats = getDefenseStats(type, currentLevel);
  const nextStats = getDefenseStats(type, currentLevel + 1);
  const isMaxLevel = currentLevel >= defense.maxLevel;
  
  const { canUpgrade, reason } = canUpgradeDefense(type, currentLevel, bamboo, xp);
  const colors = DEFENSE_COLORS[type];

  const handleUpgrade = () => {
    if (canUpgrade) {
      upgradeDefense(type);
    }
  };

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
            "font-bold text-xs border",
            colors.bg,
            colors.text,
            colors.border
          )}
        >
          Lv.{currentLevel}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-1.5 rounded-lg border",
            colors.bg,
            colors.border
          )}>
            <span className={colors.text}>
              {DEFENSE_ICONS[type]}
            </span>
          </div>
          <CardTitle className={cn("text-sm", empireClasses.textPrimary)}>
            {defense.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Protection info */}
        <div className={cn("text-xs", empireClasses.textSecondary)}>
          Protects against: <span className={empireClasses.textPrimary}>{DEFENSE_PROTECTS[type]}</span>
        </div>

        {/* Current damage reduction */}
        <div className={cn(
          "flex justify-between items-center p-2 rounded-lg border",
          empireClasses.bgSecondary,
          empireClasses.borderSubtle
        )}>
          <span className={cn("text-xs", empireClasses.textSecondary)}>Reduction</span>
          <span className="font-bold text-[#5A9B5E]">
            {stats.damageReduction}%
          </span>
        </div>

        {/* Upgrade section */}
        {isMaxLevel ? (
          <div className={cn(
            "flex items-center justify-center gap-1 p-2 rounded-lg border",
            "bg-[#B8873A]/10 border-[#B8873A]/20"
          )}>
            <span className="text-[#8B6520] font-medium text-xs">Max Level</span>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Next level preview */}
            <div className="flex items-center justify-between text-xs">
              <span className={empireClasses.textMuted}>Next:</span>
              <span className="text-[#5A9B5E]">{nextStats.damageReduction}% reduction</span>
            </div>

            {/* Upgrade button */}
            <Button
              onClick={handleUpgrade}
              disabled={!canUpgrade}
              size="sm"
              className={cn(
                "w-full gap-1 text-xs transition-all duration-150",
                canUpgrade
                  ? "bg-[#6B4E3D] hover:bg-[#8B6B54] text-white"
                  : "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
              )}
            >
              {canUpgrade ? (
                <>
                  <ArrowUp className="h-3 w-3" />
                  Upgrade ({nextStats.upgradeCost} 🎋)
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  {reason}
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DefenseCard;
