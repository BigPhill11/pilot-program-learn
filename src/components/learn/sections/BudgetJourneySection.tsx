
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Play, CheckCircle2 } from 'lucide-react';

interface BudgetJourneySectionProps {
  onStartJourney: () => void;
  progress: {
    completed: boolean;
    levelsCompleted: number;
    totalLevels: number;
  };
}

const BudgetJourneySection: React.FC<BudgetJourneySectionProps> = ({
  onStartJourney,
  progress
}) => {
  return (
    <AccordionItem value="budgeting" className="border-2 border-blue-500/20">
      <AccordionTrigger className="text-lg text-left">
        <div className="flex items-center gap-2">
          Budgeting 101
          {progress.completed && (
            <Badge className="bg-blue-500 text-white">
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
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">💰 Interactive Budgeting Learning Journey</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Master budgeting through 5 gamified levels with flashcards, quizzes, and real-world scenarios. 
                  Complete all levels to unlock the budget builder simulation game!
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>Learn needs vs wants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>50/30/20 budgeting rule</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>Budgeting for goals</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-blue-500" />
                    <span>Final budget builder simulation</span>
                  </div>
                </div>

                {progress.completed && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Badge Earned: Budget Boss!</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      You've completed the entire budgeting journey and earned your achievement badge.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={onStartJourney}
              className="w-full bg-blue-500 hover:bg-blue-600"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              {progress.levelsCompleted > 0 ? 'Continue Budgeting Journey' : 'Start Budgeting Journey'}
            </Button>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BudgetJourneySection;
