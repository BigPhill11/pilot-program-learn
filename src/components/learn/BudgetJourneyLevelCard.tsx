
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import { BudgetLevel } from '@/data/budgeting-journey-data';

interface BudgetJourneyLevelCardProps {
  level: BudgetLevel;
  isUnlocked: boolean;
  isCompleted: boolean;
  onLevelSelect: (levelId: number) => void;
}

const BudgetJourneyLevelCard: React.FC<BudgetJourneyLevelCardProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onLevelSelect
}) => {
  return (
    <Card
      className={`aspect-square cursor-pointer transition-all hover:shadow-lg relative ${
        isCompleted 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : isUnlocked 
            ? 'border-2 border-blue-200 hover:border-blue-400 bg-white' 
            : 'opacity-50 cursor-not-allowed bg-gray-50'
      }`}
      onClick={() => isUnlocked && onLevelSelect(level.id)}
    >
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="text-2xl mb-2">
            {isCompleted ? (
              <CheckCircle2 className="h-8 w-8 text-blue-600 mx-auto" />
            ) : isUnlocked ? (
              <Play className="h-8 w-8 text-blue-600 mx-auto" />
            ) : (
              <Lock className="h-8 w-8 text-gray-400 mx-auto" />
            )}
          </div>
          <h3 className="font-semibold text-sm mb-1">Level {level.id}</h3>
          <p className="text-xs text-muted-foreground leading-tight">{level.title}</p>
        </div>
        
        <div className="text-center">
          {isCompleted && (
            <Badge className="text-xs bg-blue-500 text-white">Complete</Badge>
          )}
          {!isCompleted && isUnlocked && (
            <Badge variant="outline" className="text-xs">Start</Badge>
          )}
          {!isUnlocked && (
            <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetJourneyLevelCard;
