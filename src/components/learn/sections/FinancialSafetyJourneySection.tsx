
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Play, Trophy } from "lucide-react";

interface FinancialSafetyJourneySectionProps {
  onStartJourney: () => void;
  progress: {
    completed: boolean;
    levelsCompleted: number;
    totalLevels: number;
  };
}

const FinancialSafetyJourneySection: React.FC<FinancialSafetyJourneySectionProps> = ({
  onStartJourney,
  progress
}) => {
  const progressPercentage = (progress.levelsCompleted / progress.totalLevels) * 100;

  return (
    <AccordionItem value="financial-safety" className="border border-purple-200 rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-purple-700">Money Armor</h3>
              <p className="text-sm text-muted-foreground">Protect yourself from financial risks & scams</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {progress.completed ? (
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                <Trophy className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            ) : progress.levelsCompleted > 0 ? (
              <Badge variant="outline" className="border-purple-300 text-purple-600">
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
            Build your financial defense system! Learn to spot scams, understand insurance, 
            plan for emergencies, practice safe spending, and know your consumer rights.
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
                <li>• Identity theft & fraud prevention</li>
                <li>• Insurance types & protection</li>
                <li>• Emergency fund planning</li>
                <li>• Safe online spending habits</li>
                <li>• Consumer rights & protections</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Skills you'll gain:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Scam detection & avoidance</li>
                <li>• Insurance evaluation</li>
                <li>• Emergency preparedness</li>
                <li>• Secure payment practices</li>
                <li>• Financial advocacy</li>
              </ul>
            </div>
          </div>

          <Button 
            onClick={onStartJourney}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            <Play className="h-4 w-4 mr-2" />
            {progress.completed ? 'Review Journey' : progress.levelsCompleted > 0 ? 'Continue Journey' : 'Start Journey'}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FinancialSafetyJourneySection;
