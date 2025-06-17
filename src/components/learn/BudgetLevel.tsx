
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import { BudgetLevel } from '@/data/budgeting-journey-data';
import { BudgetLevelStep, useBudgetLevelSteps } from './BudgetLevelSteps';
import BudgetLevelContent from './BudgetLevelContent';

interface BudgetLevelProps {
  level: BudgetLevel;
  onComplete: (levelId: number) => void;
  isUnlocked: boolean;
  isCompleted: boolean;
}

const BudgetLevelComponent: React.FC<BudgetLevelProps> = ({
  level,
  onComplete,
  isUnlocked,
  isCompleted
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [masteredFlashcards, setMasteredFlashcards] = useState<Set<string>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [challengeCorrect, setChallengeCorrect] = useState(false);

  const { getSteps } = useBudgetLevelSteps(level);
  const steps = getSteps();
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleFlashcardMastered = (term: string) => {
    setMasteredFlashcards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(term)) {
        newSet.delete(term);
      } else {
        newSet.add(term);
      }
      return newSet;
    });
  };

  const canProceedToNext = () => {
    const step = steps[currentStep];
    switch (step) {
      case 'intro':
        return true;
      case 'flashcards':
        return masteredFlashcards.size >= Math.ceil(level.flashcards.length / 2);
      case 'quiz':
        return quizCompleted && quizCorrect;
      case 'activity':
        return activityCompleted;
      case 'challenge':
        return challengeCompleted && challengeCorrect;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (canProceedToNext()) {
        onComplete(level.id);
      }
    }
  };

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    setQuizCompleted(true);
    setQuizCorrect(isCorrect);
  };

  const handleActivityComplete = (isCorrect: boolean) => {
    setActivityCompleted(true);
  };

  const handleChallengeComplete = (isCorrect: boolean) => {
    setChallengeCompleted(true);
    setChallengeCorrect(isCorrect);
  };

  if (!isUnlocked) {
    return (
      <Card className="opacity-60">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">{level.title}</h3>
          <p className="text-muted-foreground">Complete previous levels to unlock</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${isCompleted ? 'border-blue-500' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">Level {level.id}: {level.title}</CardTitle>
            {isCompleted && <CheckCircle2 className="h-5 w-5 text-blue-500" />}
          </div>
          <Badge variant={isCompleted ? "default" : "outline"}>
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <BudgetLevelContent
          level={level}
          currentStep={steps[currentStep]}
          masteredFlashcards={masteredFlashcards}
          quizCompleted={quizCompleted}
          quizCorrect={quizCorrect}
          activityCompleted={activityCompleted}
          challengeCompleted={challengeCompleted}
          challengeCorrect={challengeCorrect}
          onFlashcardMastered={handleFlashcardMastered}
          onQuizComplete={handleQuizComplete}
          onActivityComplete={handleActivityComplete}
          onChallengeComplete={handleChallengeComplete}
        />
        
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceedToNext()}
            className="min-w-24"
          >
            {currentStep === steps.length - 1 ? 'Complete Level' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetLevelComponent;
