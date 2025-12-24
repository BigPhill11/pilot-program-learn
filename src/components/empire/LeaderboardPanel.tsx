import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  RefreshCw,
  Flame,
  Clock
} from 'lucide-react';
import { useEmpireLeaderboard, LeaderboardPeriod } from '@/hooks/useEmpireLeaderboard';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const LeaderboardPanel: React.FC = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState<LeaderboardPeriod>('alltime');
  const { leaderboard, userRank, loading, lastUpdate, refresh } = useEmpireLeaderboard(period);
  const userRowRef = useRef<HTMLDivElement>(null);

  // Scroll to user's position when leaderboard loads
  useEffect(() => {
    if (!loading && userRowRef.current) {
      setTimeout(() => {
        userRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [loading, period]);

  // Get rank icon/color
  const getRankDisplay = (rank: number) => {
    if (rank === 1) {
      return { icon: <Crown className="h-5 w-5" />, color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-950/30' };
    } else if (rank === 2) {
      return { icon: <Medal className="h-5 w-5" />, color: 'text-slate-400', bgColor: 'bg-slate-50 dark:bg-slate-950/30' };
    } else if (rank === 3) {
      return { icon: <Medal className="h-5 w-5" />, color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-950/30' };
    } else if (rank <= 10) {
      return { icon: <Trophy className="h-4 w-4" />, color: 'text-purple-600', bgColor: 'bg-purple-50/50 dark:bg-purple-950/20' };
    }
    return { icon: null, color: 'text-muted-foreground', bgColor: '' };
  };

  // Format time until reset
  const getTimeUntilReset = () => {
    const now = new Date();
    if (period === 'daily') {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const hours = Math.floor((tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60));
      return `${hours}h`;
    } else if (period === 'weekly') {
      const nextMonday = new Date(now);
      nextMonday.setDate(nextMonday.getDate() + ((7 - now.getDay() + 1) % 7 || 7));
      nextMonday.setHours(0, 0, 0, 0);
      const days = Math.ceil((nextMonday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return `${days}d`;
    }
    return null;
  };

  const timeUntilReset = getTimeUntilReset();

  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-purple-600" />
            <CardTitle className="text-purple-700 dark:text-purple-400">Leaderboards</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Compete with other learners and climb the ranks!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User Rank Summary */}
        {userRank && (
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Your Rank</div>
                <div className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                  {getRankDisplay(userRank.rank).icon}
                  #{userRank.rank}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total XP</div>
                <div className="text-2xl font-bold text-amber-600">
                  {userRank.totalXp.toLocaleString()}
                </div>
              </div>
            </div>
            {userRank.xpToNextRank > 0 && (
              <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Earn {userRank.xpToNextRank.toLocaleString()} more XP to reach rank #{userRank.rank - 1}
              </div>
            )}
          </div>
        )}

        {/* Period Tabs */}
        <Tabs value={period} onValueChange={(v) => setPeriod(v as LeaderboardPeriod)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily" className="gap-1">
              <Clock className="h-3 w-3" />
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="gap-1">
              <Flame className="h-3 w-3" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="alltime" className="gap-1">
              <Trophy className="h-3 w-3" />
              All-Time
            </TabsTrigger>
          </TabsList>

          {/* Reset Timer */}
          {timeUntilReset && (
            <div className="mt-2 text-center text-xs text-muted-foreground">
              Resets in {timeUntilReset}
            </div>
          )}

          <TabsContent value={period} className="space-y-2 mt-4">
            {loading ? (
              <div className="space-y-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2">
                {leaderboard.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Trophy className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>No rankings yet. Be the first to earn XP!</p>
                  </div>
                ) : (
                  leaderboard.map((entry) => {
                    const rankDisplay = getRankDisplay(entry.rank);
                    const isCurrentUser = user && entry.user_id === user.id;

                    return (
                      <div
                        key={entry.user_id}
                        ref={isCurrentUser ? userRowRef : null}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg transition-all",
                          rankDisplay.bgColor,
                          isCurrentUser && "ring-2 ring-purple-500 bg-purple-100 dark:bg-purple-900/30",
                          entry.rank <= 3 && "border-2",
                          entry.rank === 1 && "border-yellow-300",
                          entry.rank === 2 && "border-slate-300",
                          entry.rank === 3 && "border-amber-300"
                        )}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {/* Rank */}
                          <div className={cn("font-bold text-lg min-w-[40px] flex items-center gap-1", rankDisplay.color)}>
                            {rankDisplay.icon}
                            {entry.rank}
                          </div>

                          {/* Avatar */}
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                              {entry.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          {/* Username */}
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              {entry.username}
                              {isCurrentUser && (
                                <Badge variant="secondary" className="text-xs">You</Badge>
                              )}
                              {entry.rank <= 3 && (
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "text-xs",
                                    entry.rank === 1 && "border-yellow-400 text-yellow-700 dark:text-yellow-400",
                                    entry.rank === 2 && "border-slate-400 text-slate-700 dark:text-slate-400",
                                    entry.rank === 3 && "border-amber-400 text-amber-700 dark:text-amber-400"
                                  )}
                                >
                                  Top {entry.rank}
                                </Badge>
                              )}
                            </div>
                            {entry.streak_days && entry.streak_days > 0 && (
                              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Flame className="h-3 w-3 text-orange-500" />
                                {entry.streak_days} day streak
                              </div>
                            )}
                          </div>

                          {/* XP */}
                          <div className="text-right">
                            <div className="font-bold text-amber-600">
                              {entry.total_xp.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">XP</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Reward Tiers Info */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-600" />
            Weekly Rewards
          </h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Crown className="h-3 w-3 text-yellow-500" />
                1st Place
              </span>
              <span className="font-semibold text-yellow-700 dark:text-yellow-400">+1,000 🪙 bonus</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Medal className="h-3 w-3 text-slate-400" />
                2nd Place
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-400">+500 🪙 bonus</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Medal className="h-3 w-3 text-amber-600" />
                3rd Place
              </span>
              <span className="font-semibold text-amber-700 dark:text-amber-400">+250 🪙 bonus</span>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-xs text-muted-foreground">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardPanel;
