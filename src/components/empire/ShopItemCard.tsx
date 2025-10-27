import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Check, Clock } from 'lucide-react';
import { ShopItem, RARITY_INFO } from '@/lib/shop-catalog';
import { cn } from '@/lib/utils';

interface ShopItemCardProps {
  item: ShopItem;
  owned: boolean;
  isActive: boolean;
  remainingTime?: number;
  onPurchase: (item: ShopItem) => void;
  canAfford: boolean;
  currentBalance: number;
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({
  item,
  owned,
  isActive,
  remainingTime,
  onPurchase,
  canAfford,
  currentBalance,
}) => {
  const Icon = item.icon;
  const rarityInfo = RARITY_INFO[item.rarity];

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all hover:shadow-lg',
        owned && 'ring-2 ring-green-500',
        isActive && 'ring-2 ring-yellow-500 animate-pulse'
      )}
    >
      {/* Rarity Banner */}
      <div className={cn('absolute top-0 right-0 px-3 py-1 text-xs font-semibold', rarityInfo.bgColor, rarityInfo.color)}>
        {rarityInfo.label}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className={cn('p-3 rounded-lg bg-muted', item.iconColor)}>
            <Icon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {item.name}
              {owned && (
                <Badge variant="secondary" className="text-xs">
                  <Check className="h-3 w-3 mr-1" />
                  Owned
                </Badge>
              )}
              {isActive && remainingTime !== undefined && (
                <Badge variant="default" className="text-xs bg-yellow-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(remainingTime)}
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              {item.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Duration for consumables */}
        {item.type === 'consumable' && item.duration && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Duration: {item.duration < 60 ? `${item.duration} minutes` : `${Math.floor(item.duration / 60)} hours`}
          </div>
        )}

        {/* Type Badge */}
        <Badge variant="outline" className="text-xs">
          {item.type === 'consumable' ? '⚡ Consumable' : '♾️ Permanent'}
        </Badge>

        {/* Purchase Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-amber-500" />
            <span className="text-2xl font-bold text-amber-600">
              {item.price}
            </span>
          </div>

          <Button
            onClick={() => onPurchase(item)}
            disabled={owned && item.type === 'permanent'}
            variant={owned && item.type === 'permanent' ? 'secondary' : 'default'}
            className={cn(
              !canAfford && !(owned && item.type === 'permanent') && 'opacity-50 cursor-not-allowed'
            )}
          >
            {owned && item.type === 'permanent' ? (
              'Owned'
            ) : owned && item.type === 'consumable' ? (
              'Buy Again'
            ) : (
              'Purchase'
            )}
          </Button>
        </div>

        {!canAfford && !(owned && item.type === 'permanent') && (
          <p className="text-xs text-red-500 text-center">
            Need {item.price - currentBalance} more coins
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopItemCard;
