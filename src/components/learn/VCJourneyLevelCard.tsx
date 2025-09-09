import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, Play, BookOpen, Gamepad2, HelpCircle, FileText } from 'lucide-react';
import { VCLevel } from '@/data/venture-capital-journey-data';

interface VCJourneyLevelCardProps {
  level: VCLevel;
  isCompleted: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}

const VCJourneyLevelCard: React.FC<VCJourneyLevelCardProps> = ({
  level,
  isCompleted,
  isUnlocked,
  onClick
}) => {
  const getButtonText = () => {
    if (isCompleted) return "Review Level";
    if (isUnlocked) return "Start Level";
    return "Locked";
  };

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (isUnlocked) return <Play className="h-5 w-5 text-primary" />;
    return <Lock className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <Card 
      className={`transition-all duration-200 ${
        isUnlocked 
          ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02] border-primary/20' 
          : 'opacity-60 cursor-not-allowed'
      } ${isCompleted ? 'border-green-200 bg-green-50/30' : ''}`}
      onClick={isUnlocked ? onClick : undefined}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant={isCompleted ? "default" : "outline"} className="text-sm">
              Level {level.id}
            </Badge>
            {getStatusIcon()}
          </div>
        </div>
        <CardTitle className="text-xl">{level.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {level.overview.split('.')[0]}.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>{level.flashcards.length} Terms</span>
          </div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-primary" />
            <span>{level.miniGames.length} Games</span>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>{level.quiz.length} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span>{level.activities.length} Activities</span>
          </div>
        </div>
        
        <Button 
          variant={isCompleted ? "outline" : "default"}
          className="w-full"
          disabled={!isUnlocked}
        >
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VCJourneyLevelCard;