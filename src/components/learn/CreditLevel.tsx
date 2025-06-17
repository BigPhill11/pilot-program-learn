
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Star } from 'lucide-react';
import { CreditLevel as CreditLevelType } from '@/data/credit-journey-data';
import { CreditLevelStep, useCreditLevelSteps } from './CreditLevelSteps';
import CreditLevelContent from './CreditLevelContent';

interface CreditLevelProps {
  level: CreditLevelType;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
}

const CreditLevel: React.FC<CreditLevelProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onComplete,
  onQuizComplete
}) => {
  const [currentStep, setCurrentStep] = useState<CreditLevelStep>('intro');
  const [masteredFlashcards, setMasteredFlashcards] = useState<Set<string>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);

  const { getNextStep } = useCreditLevelSteps(!!level.activity, !!level.scenario);

  const handleFlashcardMastered = (flashcardId: string) => {
    setMasteredFlashcards(prev => new Set([...prev, flashcardId]));
  };

  const handleQuizCompletion = (topicId: string, isCorrect: boolean) => {
    setQuizCompleted(true);
    onQuizComplete(isCorrect);
  };

  const handleActivityCompletion = (isCorrect: boolean) => {
    setActivityCompleted(true);
  };

  const handleScenarioCompletion = (topicId: string, isCorrect: boolean) => {
    setScenarioCompleted(true);
  };

  const canProceedToNext = () => {
    if (currentStep === 'intro') return true;
    if (currentStep === 'flashcards') return masteredFlashcards.size === level.flashcards.length;
    if (currentStep === 'quiz') return quizCompleted;
    if (currentStep === 'activity') return !level.activity || activityCompleted;
    if (currentStep === 'scenario') return !level.scenario || scenarioCompleted;
    return false;
  };

  const handleNext = () => {
    const nextStep = getNextStep(currentStep);
    if (nextStep === 'complete') {
      onComplete();
    }
    setCurrentStep(nextStep);
  };

  if (!isUnlocked) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">🔒 Level {level.id}: {level.title}</CardTitle>
            <Badge variant="outline">Locked</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Complete the previous level to unlock this one.</p>
        </CardContent>
      </Card>
    );
  }

  if (isCompleted) {
    return (
      <Card className="border-green-500/50 bg-green-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Level {level.id}: {level.title}
            </CardTitle>
            <Badge className="bg-green-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700 mb-2">{level.description}</p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-3">
            <p className="text-sm font-medium text-green-800">💡 Key Takeaway:</p>
            <p className="text-sm text-green-700">{level.takeaway}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Level {level.id}: {level.title}</CardTitle>
          <Badge variant="outline">{currentStep === 'complete' ? 'Complete' : 'In Progress'}</Badge>
        </div>
        <p className="text-muted-foreground text-sm">{level.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <CreditLevelContent
          level={level}
          currentStep={currentStep}
          masteredFlashcards={masteredFlashcards}
          quizCompleted={quizCompleted}
          activityCompleted={activityCompleted}
          scenarioCompleted={scenarioCompleted}
          canProceed={canProceedToNext()}
          onFlashcardMastered={handleFlashcardMastered}
          onQuizComplete={handleQuizCompletion}
          onActivityComplete={handleActivityCompletion}
          onScenarioComplete={handleScenarioCompletion}
          onNext={handleNext}
        />
      </CardContent>
    </Card>
  );
};

export default CreditLevel;
