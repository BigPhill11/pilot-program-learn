import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Clock } from 'lucide-react';
import { useShopItems } from '@/hooks/useShopItems';
import { SHOP_CATALOG } from '@/lib/shop-catalog';

const ActivePowerUps: React.FC = () => {
  const { activePowerUps, getRemainingTime } = useShopItems();

  if (activePowerUps.length === 0) {
    return null;
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
          <Zap className="h-5 w-5" />
          Active Power-Ups
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activePowerUps.map((purchase) => {
          const item = SHOP_CATALOG.find((i) => i.id === purchase.item_id);
          if (!item) return null;

          const remainingMinutes = getRemainingTime(item.id);
          const totalMinutes = item.duration || 60;
          const progressPercent = (remainingMinutes / totalMinutes) * 100;
          const Icon = item.icon;

          return (
            <div
              key={purchase.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-yellow-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`${item.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-sm">{item.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(remainingMinutes)}
                </Badge>
              </div>
              <Progress 
                value={progressPercent} 
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-yellow-400 to-amber-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ActivePowerUps;
