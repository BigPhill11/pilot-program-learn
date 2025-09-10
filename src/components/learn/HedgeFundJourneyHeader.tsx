import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

interface HedgeFundJourneyHeaderProps {
  completedLevels: number;
  totalLevels: number;
}

const HedgeFundJourneyHeader: React.FC<HedgeFundJourneyHeaderProps> = ({
  completedLevels,
  totalLevels
}) => {
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-blue-600">Hedge Fund Journey</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master the world of hedge funds through this comprehensive 3-level journey. 
          Learn about alternative investments, strategies, and the exclusive world of hedge fund investing.
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {completedLevels} of {totalLevels} levels completed
            </span>
            <span className="text-sm text-blue-600 font-semibold">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">{completedLevels}</div>
              <div className="text-sm text-muted-foreground">Levels Completed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">{completedLevels * 5}</div>
              <div className="text-sm text-muted-foreground">Terms Learned</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">{completedLevels * 15}</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold">Advanced Strategies</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Learn complex investment approaches
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold">Exclusive Access</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Understand who can invest and why
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold">Fee Structure</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Master the "2 and 20" fee model
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HedgeFundJourneyHeader;