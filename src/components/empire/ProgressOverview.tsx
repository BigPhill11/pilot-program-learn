import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Building2, 
  Briefcase, 
  CreditCard, 
  Trophy,
  Gamepad2,
  TrendingUp
} from 'lucide-react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { getLevelFromTotalXp, getProgressPercent } from '@/lib/progression';
import { xpToCoins } from '@/lib/coin-conversion';

interface ActivityProgress {
  icon: React.ReactNode;
  name: string;
  description: string;
  xpEarned: number;
  progress: number;
  color: string;
}

const ProgressOverview: React.FC = () => {
  const { progress, loading } = useProgressTracking();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Empire Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-muted rounded" />
            <div className="h-48 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalXp = progress.total_points || 0;
  const currentLevel = getLevelFromTotalXp(totalXp);
  const levelProgress = getProgressPercent(totalXp);
  const totalCoins = xpToCoins(totalXp);

  // Calculate XP by category (estimated breakdown)
  const quizXp = Object.keys(progress.quiz_scores).length * 20;
  const learningXp = Math.round(progress.learning_progress * 10);
  const activitiesXp = progress.completed_activities.length * 50;
  const otherXp = totalXp - quizXp - learningXp - activitiesXp;

  const activities: ActivityProgress[] = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      name: 'Adaptive Learning',
      description: 'Flashcards & Knowledge',
      xpEarned: learningXp,
      progress: Math.min(progress.learning_progress, 100),
      color: 'text-blue-600',
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      name: 'Company Discovery',
      description: 'Explore & Match Companies',
      xpEarned: activitiesXp,
      progress: (progress.completed_activities.length / 50) * 100,
      color: 'text-emerald-600',
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      name: 'Personal Finance',
      description: 'Financial Literacy Modules',
      xpEarned: quizXp,
      progress: (Object.keys(progress.quiz_scores).length / 10) * 100,
      color: 'text-purple-600',
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      name: 'Careers in Finance',
      description: 'Career Path Exploration',
      xpEarned: Math.max(0, otherXp / 2),
      progress: progress.engagement_score,
      color: 'text-orange-600',
    },
    {
      icon: <Gamepad2 className="h-5 w-5" />,
      name: 'Interactive Games',
      description: 'Fun Learning Activities',
      xpEarned: Math.max(0, otherXp / 2),
      progress: Math.min((progress.completed_activities.length / 20) * 100, 100),
      color: 'text-pink-600',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-600" />
          Your Empire Progress
        </CardTitle>
        <CardDescription>Track your achievements across all activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg border border-yellow-200">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold text-yellow-600">Level {currentLevel}</div>
            <div className="text-xs text-muted-foreground">Current Level</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg border border-blue-200">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">{totalXp.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200">
            <Gamepad2 className="h-6 w-6 mx-auto mb-2 text-amber-600" />
            <div className="text-2xl font-bold text-amber-600">{totalCoins.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Coins Earned</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">
              {progress.completed_activities.length}
            </div>
            <div className="text-xs text-muted-foreground">Activities Done</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Level Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(levelProgress)}%
            </span>
          </div>
          <Progress value={levelProgress} className="h-3" />
        </div>

        {/* Activity Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-muted-foreground">Activity Breakdown</h4>
          {activities.map((activity) => (
            <div
              key={activity.name}
              className="p-4 bg-muted/50 rounded-lg space-y-2 hover:bg-muted transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={activity.color}>{activity.icon}</div>
                  <div>
                    <div className="font-semibold text-sm">{activity.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {activity.description}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-amber-600">
                    +{activity.xpEarned} XP
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round(activity.progress)}%
                  </div>
                </div>
              </div>
              <Progress 
                value={Math.min(activity.progress, 100)} 
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-amber-400 to-yellow-500"
              />
            </div>
          ))}
        </div>

        {/* Engagement Score */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Overall Engagement</span>
            <span className="text-lg font-bold text-purple-600">
              {Math.round(progress.engagement_score)}%
            </span>
          </div>
          <Progress 
            value={progress.engagement_score} 
            className="h-2"
            indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
