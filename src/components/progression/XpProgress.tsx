import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressTracking } from '@/hooks/useProgressTracking';

const XP_PER_LEVEL = 200;

const XpProgress: React.FC = () => {
  const { progress } = useProgressTracking();
  const total = progress.total_points || 0;
  const currentLevel = Math.floor(total / XP_PER_LEVEL) + 1;
  const inLevel = total % XP_PER_LEVEL;
  const toNext = XP_PER_LEVEL - inLevel;
  const percent = (inLevel / XP_PER_LEVEL) * 100;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">XP Progress</span>
          <span className="text-sm text-muted-foreground">Level {currentLevel}</span>
        </div>
        <Progress value={percent} className="h-3" />
        <div className="mt-2 text-xs text-muted-foreground">{toNext} XP to next level</div>
      </CardContent>
    </Card>
  );
};

export default XpProgress;
