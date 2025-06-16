
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Play, CheckCircle2 } from 'lucide-react';

interface CreditJourneySectionProps {
  onStartJourney: () => void;
  progress: {
    completed: boolean;
    levelsCompleted: number;
    totalLevels: number;
  };
}

const CreditJourneySection: React.FC<CreditJourneySectionProps> = ({
  onStartJourney,
  progress
}) => {
  return (
    <AccordionItem value="credit" className="border-2 border-green-500/20">
      <AccordionTrigger className="text-lg text-left">
        <div className="flex items-center gap-2">
          How to Build Credit
          {progress.completed && (
            <Badge className="bg-green-500 text-white">
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
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">🏆 Interactive Credit Building Journey</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Master credit through 5 gamified levels with flashcards, quizzes, and real-world scenarios. 
                  Complete all levels to unlock the credit score builder simulation game!
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Understanding credit basics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Credit scores and reports</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Building credit responsibly</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-green-500" />
                    <span>Final credit score builder simulation</span>
                  </div>
                </div>

                {progress.completed && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Badge Earned: Credit Champ!</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      You've completed the entire credit journey and earned your achievement badge.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={onStartJourney}
              className="w-full bg-green-500 hover:bg-green-600"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              {progress.levelsCompleted > 0 ? 'Continue Credit Journey' : 'Start Credit Journey'}
            </Button>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CreditJourneySection;
