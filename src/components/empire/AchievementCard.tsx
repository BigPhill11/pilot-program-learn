import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, Gift, Check } from 'lucide-react';
import { AchievementProgress } from '@/hooks/useAchievements';
import { RARITY_STYLES } from '@/lib/achievements-catalog';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  progress: AchievementProgress;
  onClaim: (achievementId: string) => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ progress, onClaim }) => {
  const { achievement, unlocked, claimed, currentProgress, progressPercentage } = progress;
  const rarityStyle = RARITY_STYLES[achievement.rarity];

  return (
    <Card
      className={cn(
        'p-4 transition-all duration-300',
        unlocked ? `border-2 ${rarityStyle.border} ${rarityStyle.glow} shadow-lg` : 'opacity-60',
        !unlocked && achievement.hidden && 'blur-sm'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'text-4xl flex-shrink-0',
          unlocked ? 'animate-pulse' : 'grayscale'
        )}>
          {achievement.hidden && !unlocked ? '❓' : achievement.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-bold text-lg">
                {achievement.hidden && !unlocked ? '???' : achievement.name}
                {claimed && <Check className="inline ml-2 h-4 w-4 text-green-500" />}
              </h4>
              <p className="text-sm text-muted-foreground">
                {achievement.hidden && !unlocked ? 'Hidden achievement' : achievement.description}
              </p>
            </div>

            {/* Status Badge */}
            {!unlocked && (
              <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
            {unlocked && !claimed && (
              <Gift className="h-5 w-5 text-amber-500 animate-bounce flex-shrink-0" />
            )}
          </div>

          {/* Progress Bar */}
          {!unlocked && !achievement.hidden && (
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{currentProgress} / {achievement.requirement}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}

          {/* Reward Info */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn('text-xs font-semibold uppercase', rarityStyle.text)}>
                {achievement.rarity}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-sm font-medium text-amber-600">
                🪙 {achievement.rewardCoins} coins
              </span>
            </div>

            {/* Claim Button */}
            {unlocked && !claimed && (
              <Button
                size="sm"
                onClick={() => onClaim(achievement.id)}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
              >
                Claim Reward
              </Button>
            )}
            {claimed && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                Claimed ✓
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AchievementCard;
