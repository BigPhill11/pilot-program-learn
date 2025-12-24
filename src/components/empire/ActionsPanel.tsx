/**
 * ActionsPanel Component
 * 
 * Displays recovery actions: Energy Recovery, Repair Mode, Pause Growth
 * Updated with light green / sage / brown theme.
 */

import React from 'react';
import { 
  Zap, 
  Wrench, 
  PauseCircle, 
  PlayCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import { ENERGY, REPAIR } from '@/config/gameConfig';
import { empireClasses } from '@/config/empireTheme';

const ActionsPanel: React.FC = () => {
  const bamboo = useGameStore(state => state.bamboo);
  const energy = useGameStore(state => state.energy);
  const isPaused = useGameStore(state => state.isPaused);
  const pauseCooldownUntil = useGameStore(state => state.pauseCooldownUntil);
  const activeModifiers = useGameStore(state => state.activeModifiers);
  const recoverEnergy = useGameStore(state => state.recoverEnergy);
  const repairMode = useGameStore(state => state.repairMode);
  const togglePauseGrowth = useGameStore(state => state.togglePauseGrowth);

  const now = Date.now();
  const isOnCooldown = now < pauseCooldownUntil;
  const cooldownRemaining = Math.max(0, pauseCooldownUntil - now);
  const cooldownSeconds = Math.ceil(cooldownRemaining / 1000);

  const hasDamageModifiers = activeModifiers.some(m => m.type === 'damage' || m.type === 'incomeCut');
  const canAffordEnergy = bamboo >= ENERGY.recoveryCost;
  const canAffordRepair = bamboo >= REPAIR.cost;
  const needsEnergy = energy < ENERGY.max;

  const formatCooldown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecoverEnergy = () => {
    recoverEnergy();
  };

  const handleRepairMode = () => {
    repairMode();
  };

  const handleTogglePause = () => {
    togglePauseGrowth();
  };

  return (
    <Card className={cn(empireClasses.card, "h-full")}>
      <CardHeader className="pb-2">
        <CardTitle className={cn("text-lg flex items-center gap-2", empireClasses.textPrimary)}>
          <Wrench className="h-5 w-5 text-[#6B4E3D]" />
          Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Energy Recovery */}
        <div className="space-y-1">
          <Button
            onClick={handleRecoverEnergy}
            disabled={!canAffordEnergy || !needsEnergy}
            className={cn(
              "w-full gap-2 justify-start transition-all duration-150",
              canAffordEnergy && needsEnergy
                ? "bg-[#B8873A] hover:bg-[#8B6520] text-white"
                : "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
            )}
          >
            <Zap className="h-4 w-4" />
            <span>Energy Recovery</span>
            <span className="ml-auto text-sm opacity-80">
              {ENERGY.recoveryCost} 🎋
            </span>
          </Button>
          <p className={cn("text-xs pl-1", empireClasses.textMuted)}>
            Restore {ENERGY.recoveryAmount} energy instantly
          </p>
        </div>

        {/* Repair Mode */}
        <div className="space-y-1">
          <Button
            onClick={handleRepairMode}
            disabled={!canAffordRepair || !hasDamageModifiers}
            className={cn(
              "w-full gap-2 justify-start transition-all duration-150",
              canAffordRepair && hasDamageModifiers
                ? "bg-[#6B4E3D] hover:bg-[#8B6B54] text-white"
                : "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
            )}
          >
            <Wrench className="h-4 w-4" />
            <span>Repair Mode</span>
            <span className="ml-auto text-sm opacity-80">
              {REPAIR.cost} 🎋
            </span>
          </Button>
          <p className={cn("text-xs pl-1", empireClasses.textMuted)}>
            Remove all damage effects and restore production
          </p>
          {hasDamageModifiers && (
            <Badge className="text-xs bg-[#B84C4C]/10 text-[#B84C4C] border-[#B84C4C]/20">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {activeModifiers.filter(m => m.type === 'damage' || m.type === 'incomeCut').length} active effect(s)
            </Badge>
          )}
        </div>

        {/* Pause Growth */}
        <div className="space-y-1">
          <Button
            onClick={handleTogglePause}
            disabled={isOnCooldown && !isPaused}
            className={cn(
              "w-full gap-2 justify-start transition-all duration-150",
              isPaused
                ? "bg-[#5A9B5E] hover:bg-[#3D7040] text-white"
                : isOnCooldown
                ? "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
                : "bg-[#7A9B7E] hover:bg-[#4F6F57] text-white"
            )}
          >
            {isPaused ? (
              <PlayCircle className="h-4 w-4" />
            ) : (
              <PauseCircle className="h-4 w-4" />
            )}
            <span>{isPaused ? 'Resume Growth' : 'Pause Growth'}</span>
            {isOnCooldown && !isPaused && (
              <span className="ml-auto text-sm opacity-80 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatCooldown(cooldownSeconds)}
              </span>
            )}
          </Button>
          <p className={cn("text-xs pl-1", empireClasses.textMuted)}>
            {isPaused 
              ? `Paused: Energy recovering at +${ENERGY.pausedRecoveryPerHour}/hr`
              : 'Stop production to recover energy faster'
            }
          </p>
        </div>

        {/* Active Modifiers Summary */}
        {activeModifiers.length > 0 && (
          <div className={cn(
            "mt-4 pt-3 border-t",
            empireClasses.borderSubtle
          )}>
            <h4 className={cn("text-xs font-medium mb-2", empireClasses.textSecondary)}>
              Active Effects
            </h4>
            <div className="space-y-1">
              {activeModifiers.map((mod, index) => (
                <div 
                  key={`${mod.id}-${index}`}
                  className={cn(
                    "text-xs p-2 rounded-lg border",
                    mod.type === 'productionBoost' 
                      ? "bg-[#5A9B5E]/10 text-[#3D7040] border-[#5A9B5E]/20"
                      : "bg-[#B84C4C]/10 text-[#8B3030] border-[#B84C4C]/20"
                  )}
                >
                  <div className="flex justify-between">
                    <span>{mod.description}</span>
                    <span className={empireClasses.textMuted}>
                      {Math.ceil((mod.expiresAt - now) / 60000)}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionsPanel;
