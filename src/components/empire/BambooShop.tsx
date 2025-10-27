import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Zap, Palette, Lock, Crown } from 'lucide-react';
import { SHOP_CATALOG, CATEGORY_INFO, ShopItemCategory } from '@/lib/shop-catalog';
import { useShopItems } from '@/hooks/useShopItems';
import { useBambooCoins } from '@/hooks/useBambooCoins';
import ShopItemCard from './ShopItemCard';
import ActivePowerUps from './ActivePowerUps';

const BambooShop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ShopItemCategory>('power-ups');
  const { balance } = useBambooCoins();
  const { ownsItem, isItemActive, purchaseItem, getRemainingTime, loading } = useShopItems();

  const categoryIcons = {
    'power-ups': Zap,
    'cosmetics': Palette,
    'exclusive-content': Lock,
    'status-symbols': Crown,
  };

  const filteredItems = SHOP_CATALOG.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Active Power-Ups */}
      <ActivePowerUps />

      {/* Shop */}
      <Card className="border-2 border-amber-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6 text-amber-600" />
              <CardTitle className="text-amber-700 dark:text-amber-400">Bamboo Shop</CardTitle>
            </div>
            <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-950/30 px-4 py-2 rounded-lg">
              <span className="text-sm text-muted-foreground">Your Balance:</span>
              <span className="text-xl font-bold text-amber-600">
                {balance.total_coins} 🪙
              </span>
            </div>
          </div>
          <CardDescription>
            Spend your Bamboo Coins on power-ups, cosmetics, and exclusive content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as ShopItemCategory)}>
            <TabsList className="grid w-full grid-cols-4">
              {Object.entries(CATEGORY_INFO).map(([key, info]) => {
                const Icon = categoryIcons[key as ShopItemCategory];
                return (
                  <TabsTrigger key={key} value={key} className="gap-1">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{info.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.keys(CATEGORY_INFO).map((category) => {
              const categoryKey = category as ShopItemCategory;
              const categoryInfo = CATEGORY_INFO[categoryKey];
              const items = SHOP_CATALOG.filter((item) => item.category === categoryKey);

              return (
                <TabsContent key={categoryKey} value={categoryKey} className="space-y-4 mt-6">
                  {/* Category Header */}
                  <div className={`p-4 rounded-lg border ${categoryInfo.borderColor} ${categoryInfo.bgColor}`}>
                    <h3 className={`font-semibold ${categoryInfo.color}`}>{categoryInfo.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{categoryInfo.description}</p>
                  </div>

                  {/* Items Grid */}
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((item) => (
                        <ShopItemCard
                          key={item.id}
                          item={item}
                          owned={ownsItem(item.id)}
                          isActive={isItemActive(item.id)}
                          remainingTime={isItemActive(item.id) ? getRemainingTime(item.id) : undefined}
                          onPurchase={purchaseItem}
                          canAfford={balance.total_coins >= item.price}
                          currentBalance={balance.total_coins}
                        />
                      ))}
                    </div>
                  )}

                  {items.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Store className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>No items in this category yet. Check back soon!</p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BambooShop;
