
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import { FuturePlanningLevel } from '@/data/future-planning-journey-data';

interface FuturePlanningJourneyLevelCardProps {
  level: FuturePlanningLevel;
  isUnlocked: boolean;
  isCompleted: boolean;
  onLevelSelect: (levelId: number) => void;
}

const FuturePlanningJourneyLevelCard: React.FC<FuturePlanningJourneyLevelCardProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onLevelSelect
}) => {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isCompleted 
          ? 'border-2 border-indigo-500/50 bg-indigo-50/50' 
          : isUnlocked 
            ? 'border border-indigo-500/30 hover:border-indigo-500/50' 
            : 'opacity-50 cursor-not-allowed'
      }`}
      onClick={() => isUnlocked && onLevelSelect(level.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <Badge className="bg-indigo-500 text-white">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Level {level.id}
              </Badge>
            ) : isUnlocked ? (
              <Badge variant="outline">Level {level.id}</Badge>
            ) : (
              <Badge variant="outline" className="opacity-50">
                <Lock className="h-3 w-3 mr-1" />
                Level {level.id}
              </Badge>
            )}
          </div>
          {isCompleted && (
            <CheckCircle2 className="h-5 w-5 text-indigo-600" />
          )}
        </div>
        <CardTitle className="text-lg">{level.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {level.description}
        </p>
        
        {isCompleted && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800">Level Complete!</span>
            </div>
          </div>
        )}
        
        <Button 
          className={`w-full ${
            isCompleted 
              ? 'bg-indigo-500 hover:bg-indigo-600' 
              : isUnlocked 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-gray-300 cursor-not-allowed'
          }`}
          size="sm"
          disabled={!isUnlocked}
        >
          {!isUnlocked ? (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Locked
            </>
          ) : isCompleted ? (
            'Review Level'
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Level
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FuturePlanningJourneyLevelCard;
