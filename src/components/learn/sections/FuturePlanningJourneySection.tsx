
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, CheckCircle2, Play } from 'lucide-react';
import FuturePlanningJourney from '../FuturePlanningJourney';

const FuturePlanningJourneySection: React.FC = () => {
  const [showJourney, setShowJourney] = useState(false);

  const getFuturePlanningProgress = () => {
    const saved = localStorage.getItem('futurePlanningJourneyProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      return {
        completed: progress.journeyCompleted || false,
        levelsCompleted: progress.completedLevels?.length || 0,
        totalLevels: 5
      };
    }
    return { completed: false, levelsCompleted: 0, totalLevels: 5 };
  };

  if (showJourney) {
    return <FuturePlanningJourney onBack={() => setShowJourney(false)} />;
  }

  const progress = getFuturePlanningProgress();

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg border-indigo-500/30 ${
        progress.completed ? 'border-2' : 'border'
      }`}
      onClick={() => setShowJourney(true)}
    >
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            <CardTitle className="text-lg">Plan for Later, Start Now</CardTitle>
          </div>
          {progress.completed && (
            <Badge className="bg-indigo-500 text-white">
              <Trophy className="h-3 w-3 mr-1" />
              Complete
            </Badge>
          )}
          {!progress.completed && progress.levelsCompleted > 0 && (
            <Badge variant="outline">
              {progress.levelsCompleted}/{progress.totalLevels}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          Master future planning and build generational wealth through retirement, insurance, and estate planning
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{progress.levelsCompleted}/{progress.totalLevels} levels</span>
          </div>
          <Progress 
            value={(progress.levelsCompleted / progress.totalLevels) * 100} 
            className="h-2"
          />
        </div>

        {progress.completed && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800">Journey Complete!</span>
            </div>
            <p className="text-xs text-indigo-700 mt-1">
              You've earned your "Future Ready" achievement badge.
            </p>
          </div>
        )}
        
        <Button 
          className="w-full bg-indigo-500 hover:bg-indigo-600"
          size="sm"
        >
          <Play className="h-4 w-4 mr-2" />
          {progress.levelsCompleted > 0 ? 'Continue Journey' : 'Start Journey'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FuturePlanningJourneySection;
