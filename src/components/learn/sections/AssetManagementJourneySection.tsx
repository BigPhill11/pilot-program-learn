import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, CheckCircle2, Play } from 'lucide-react';
import AssetManagementJourney from '../AssetManagementJourney';

const AssetManagementJourneySection: React.FC = () => {
  const [showJourney, setShowJourney] = useState(false);

  const getAssetManagementProgress = () => {
    const saved = localStorage.getItem('assetManagementJourneyProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      return {
        completed: progress.journeyCompleted || false,
        levelsCompleted: progress.completedLevels?.length || 0,
        totalLevels: 4
      };
    }
    return { completed: false, levelsCompleted: 0, totalLevels: 4 };
  };

  if (showJourney) {
    return <AssetManagementJourney onBack={() => setShowJourney(false)} />;
  }

  const progress = getAssetManagementProgress();

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg border-blue-500/30 ${
        progress.completed ? 'border-2' : 'border'
      }`}
      onClick={() => setShowJourney(true)}
    >
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💼</span>
            <CardTitle className="text-lg">Asset Management Mastery</CardTitle>
          </div>
          {progress.completed && (
            <Badge className="bg-blue-500 text-white">
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
          Master professional investing through industry fundamentals, research & analysis, portfolio construction, and risk management
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
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Journey Complete!</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              You've earned your "Portfolio Pro" achievement badge.
            </p>
          </div>
        )}
        
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600"
          size="sm"
        >
          <Play className="h-4 w-4 mr-2" />
          {progress.levelsCompleted > 0 ? 'Continue Journey' : 'Start Journey'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssetManagementJourneySection;