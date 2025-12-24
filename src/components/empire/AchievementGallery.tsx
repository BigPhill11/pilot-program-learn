import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Loader2, Gift } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';
import { ACHIEVEMENT_CATEGORIES, AchievementCategory } from '@/lib/achievements-catalog';
import AchievementCard from './AchievementCard';

const AchievementGallery: React.FC = () => {
  const { achievements, loading, stats, claimReward } = useAchievements();
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.achievement.category === selectedCategory);

  if (loading) {
    return (
      <Card className="border-2 border-dashed border-muted">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-amber-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-amber-500" />
            <div>
              <CardTitle className="text-2xl">Achievement Gallery</CardTitle>
              <CardDescription>
                Unlock achievements to earn bonus Bamboo Coins
              </CardDescription>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.unlocked}</div>
              <div className="text-xs text-muted-foreground">Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.claimed}</div>
              <div className="text-xs text-muted-foreground">Claimed</div>
            </div>
            {stats.unclaimed > 0 && (
              <div className="text-center animate-pulse">
                <div className="text-2xl font-bold text-orange-600 flex items-center gap-1">
                  {stats.unclaimed}
                  <Gift className="h-5 w-5" />
                </div>
                <div className="text-xs text-muted-foreground">Ready to Claim!</div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{stats.unlocked} / {stats.total}</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-500"
              style={{ width: `${(stats.unlocked / stats.total) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
          <TabsList className="grid grid-cols-7 mb-6">
            <TabsTrigger value="all">
              All ({achievements.length})
            </TabsTrigger>
            {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, category]) => {
              const count = achievements.filter(a => a.achievement.category === key).length;
              return (
                <TabsTrigger key={key} value={key}>
                  <span className="mr-1">{category.icon}</span>
                  {category.name} ({count})
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            {filteredAchievements.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No achievements in this category yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredAchievements
                  .sort((a, b) => {
                    // Unclaimed first, then unlocked, then by progress
                    if (a.unlocked && !a.claimed && !(b.unlocked && !b.claimed)) return -1;
                    if (!(a.unlocked && !a.claimed) && b.unlocked && !b.claimed) return 1;
                    if (a.unlocked && !b.unlocked) return -1;
                    if (!a.unlocked && b.unlocked) return 1;
                    return b.progressPercentage - a.progressPercentage;
                  })
                  .map((progress) => (
                    <AchievementCard
                      key={progress.achievement.id}
                      progress={progress}
                      onClaim={claimReward}
                    />
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AchievementGallery;
