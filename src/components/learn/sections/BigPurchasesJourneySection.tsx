
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Play, CheckCircle2 } from 'lucide-react';

interface BigPurchasesJourneySectionProps {
  onStartJourney: () => void;
  progress: {
    completed: boolean;
    levelsCompleted: number;
    totalLevels: number;
  };
}

const BigPurchasesJourneySection: React.FC<BigPurchasesJourneySectionProps> = ({
  onStartJourney,
  progress
}) => {
  return (
    <AccordionItem value="big-purchases" className="border-2 border-purple-500/20">
      <AccordionTrigger className="text-lg text-left">
        <div className="flex items-center gap-2">
          How to Buy Big
          {progress.completed && (
            <Badge className="bg-purple-500 text-white">
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
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">🚗 Interactive Big Purchases Journey</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Master major purchases through 5 gamified levels covering cars, homes, and smart shopping. 
                  Complete all levels to unlock the car buying simulation game!
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                    <span>Car buying strategies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                    <span>Home buying vs renting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                    <span>Negotiation and comparison skills</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-purple-500" />
                    <span>Final car buying simulation</span>
                  </div>
                </div>

                {progress.completed && (
                  <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Badge Earned: Smart Buyer!</span>
                    </div>
                    <p className="text-sm text-purple-700 mt-1">
                      You've completed the entire big purchases journey and earned your achievement badge.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={onStartJourney}
              className="w-full bg-purple-500 hover:bg-purple-600"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              {progress.levelsCompleted > 0 ? 'Continue Big Purchases Journey' : 'Start Big Purchases Journey'}
            </Button>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BigPurchasesJourneySection;
