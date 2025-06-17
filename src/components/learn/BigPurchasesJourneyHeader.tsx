
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy } from 'lucide-react';

interface BigPurchasesJourneyHeaderProps {
  completedLevels: number[];
  totalLevels: number;
  journeyCompleted: boolean;
  totalPointsEarned: number;
}

const BigPurchasesJourneyHeader: React.FC<BigPurchasesJourneyHeaderProps> = ({
  completedLevels,
  totalLevels,
  journeyCompleted,
  totalPointsEarned
}) => {
  const progressPercentage = Math.round((completedLevels.length / totalLevels) * 100);

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-500" />
            Your Progress
          </CardTitle>
          <div className="flex items-center gap-2">
            {journeyCompleted && (
              <Badge className="bg-purple-500 text-white">
                <Trophy className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            )}
            <Badge variant="outline">
              {completedLevels.length}/{totalLevels} Levels
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Journey Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600">{completedLevels.length}</div>
              <div className="text-xs text-muted-foreground">Levels Complete</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{totalPointsEarned}</div>
              <div className="text-xs text-muted-foreground">Points Earned</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-600">{progressPercentage}%</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BigPurchasesJourneyHeader;
