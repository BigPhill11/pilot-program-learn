
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Play, Trophy } from "lucide-react";

interface EarningMoneyJourneySectionProps {
  onStartJourney: () => void;
  progress: {
    completed: boolean;
    levelsCompleted: number;
    totalLevels: number;
  };
}

const EarningMoneyJourneySection: React.FC<EarningMoneyJourneySectionProps> = ({
  onStartJourney,
  progress
}) => {
  const progressPercentage = (progress.levelsCompleted / progress.totalLevels) * 100;

  return (
    <AccordionItem value="earning-money" className="border border-green-200 rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-green-700">Making Your First Dollar</h3>
              <p className="text-sm text-muted-foreground">Learn how to earn and manage income</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {progress.completed ? (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <Trophy className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            ) : progress.levelsCompleted > 0 ? (
              <Badge variant="outline" className="border-green-300 text-green-600">
                {progress.levelsCompleted}/{progress.totalLevels} Levels
              </Badge>
            ) : (
              <Badge variant="outline">New</Badge>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-4">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Master the fundamentals of earning money as a teen. Learn about different income sources, 
            understanding paychecks, hourly vs. salary work, gig economy opportunities, and tax basics.
          </p>
          
          {progress.levelsCompleted > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress.levelsCompleted}/{progress.totalLevels} levels completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">What you'll learn:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Different ways to earn money</li>
                <li>• Understanding paychecks & deductions</li>
                <li>• Hourly pay vs salary differences</li>
                <li>• Gig work & entrepreneurship</li>
                <li>• Tax basics for earners</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Skills you'll gain:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Income planning & budgeting</li>
                <li>• Paycheck analysis</li>
                <li>• Tax preparation basics</li>
                <li>• Entrepreneurial mindset</li>
                <li>• Financial record keeping</li>
              </ul>
            </div>
          </div>

          <Button 
            onClick={onStartJourney}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            <Play className="h-4 w-4 mr-2" />
            {progress.completed ? 'Review Journey' : progress.levelsCompleted > 0 ? 'Continue Journey' : 'Start Journey'}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default EarningMoneyJourneySection;
