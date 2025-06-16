
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Play, CheckCircle2 } from 'lucide-react';

interface TaxesJourneySectionProps {
  onStartJourney: () => void;
  progress: {
    completed: boolean;
    levelsCompleted: number;
    totalLevels: number;
  };
}

const TaxesJourneySection: React.FC<TaxesJourneySectionProps> = ({
  onStartJourney,
  progress
}) => {
  return (
    <AccordionItem value="taxes" className="border-2 border-primary/20">
      <AccordionTrigger className="text-lg text-left">
        <div className="flex items-center gap-2">
          Understanding Taxes
          {progress.completed && (
            <Badge className="bg-primary text-white">
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
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">🎓 Interactive Taxes Learning Journey</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Master taxes through 5 gamified levels with flashcards, quizzes, and real-world challenges. 
                  Complete all levels to unlock the tax filing simulation game!
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    <span>Interactive flashcards & quizzes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    <span>Drag-and-drop activities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    <span>Real-world tax scenarios</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span>Final tax filing simulation</span>
                  </div>
                </div>

                {progress.completed && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Badge Earned: Tax Smart Rookie!</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      You've completed the entire taxes journey and earned your achievement badge.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={onStartJourney}
              className="w-full"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              {progress.levelsCompleted > 0 ? 'Continue Taxes Journey' : 'Start Taxes Journey'}
            </Button>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TaxesJourneySection;
