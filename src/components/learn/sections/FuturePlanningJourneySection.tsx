
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Play, CheckCircle2 } from 'lucide-react';

interface FuturePlanningJourneySectionProps {
  onStartJourney: () => void;
  progress: {
    completed: boolean;
    levelsCompleted: number;
    totalLevels: number;
  };
}

const FuturePlanningJourneySection: React.FC<FuturePlanningJourneySectionProps> = ({
  onStartJourney,
  progress
}) => {
  return (
    <AccordionItem value="future-planning" className="border-2 border-indigo-500/20">
      <AccordionTrigger className="text-lg text-left">
        <div className="flex items-center gap-2">
          Plan for Later, Start Now
          {progress.completed && (
            <Badge className="bg-indigo-500 text-white">
              <Trophy className="h-3 w-3 mr-1" />
              Complete
            </Badge>
          )}
          {!progress.completed && progress.levelsCompleted > 0 && (
            <Badge variant="outline">
              {progress.levelsCompleted}/{progress.totalLevels} levels
            </Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-500/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">🔮 Interactive Future Planning Journey</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Master future planning through 5 gamified levels covering retirement, insurance, and legacy building. 
                  Complete all levels to unlock the Future Plan Folder builder!
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    <span>Retirement accounts (401k, IRA)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    <span>Life insurance basics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    <span>Estate planning essentials</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-indigo-500" />
                    <span>Final Future Plan Folder builder</span>
                  </div>
                </div>

                {progress.completed && (
                  <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-indigo-600" />
                      <span className="font-semibold text-indigo-800">Badge Earned: Future Ready!</span>
                    </div>
                    <p className="text-sm text-indigo-700 mt-1">
                      You've completed the entire future planning journey and earned your achievement badge.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={onStartJourney}
              className="w-full bg-indigo-500 hover:bg-indigo-600"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              {progress.levelsCompleted > 0 ? 'Continue Future Planning Journey' : 'Start Future Planning Journey'}
            </Button>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FuturePlanningJourneySection;
