
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import BudgetFlashcard from './BudgetFlashcard';
import BudgetDragDrop from './BudgetDragDrop';
import { BudgetLevel } from '@/data/budgeting-journey-data';

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

  const steps = [
    'intro',
    'flashcards',
    'quiz',
    ...(level.activity ? ['activity'] : []),
    'challenge'
  ];

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
      // Only complete if all requirements are met
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

  const renderCurrentStep = () => {
    const step = steps[currentStep];

    switch (step) {
      case 'intro':
        return (
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-3">Welcome to Level {level.id}</h4>
              <p className="text-muted-foreground leading-relaxed">{level.introCard}</p>
            </CardContent>
          </Card>
        );

      case 'flashcards':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-semibold text-lg mb-2">Learn Key Terms</h4>
              <p className="text-sm text-muted-foreground">
                Master at least {Math.ceil(level.flashcards.length / 2)} terms to continue
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Progress: {masteredFlashcards.size}/{level.flashcards.length} terms learned
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {level.flashcards.map((flashcard, index) => (
                <BudgetFlashcard
                  key={index}
                  term={flashcard.term}
                  definition={flashcard.definition}
                  onMastered={() => handleFlashcardMastered(flashcard.term)}
                  isMastered={masteredFlashcards.has(flashcard.term)}
                />
              ))}
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div>
            <div className="text-center mb-4">
              <h4 className="font-semibold text-lg mb-2">Knowledge Check</h4>
              <p className="text-sm text-muted-foreground">You must answer correctly to continue</p>
            </div>
            <InteractiveQuiz
              topicId={`budget-level-${level.id}-quiz`}
              question={level.quiz.question}
              options={level.quiz.options}
              correctAnswerIndex={level.quiz.correctAnswer}
              feedbackForIncorrect={level.quiz.explanation}
              onQuizComplete={handleQuizComplete}
              isCompleted={quizCompleted && quizCorrect}
            />
          </div>
        );

      case 'activity':
        return level.activity ? (
          <BudgetDragDrop
            activity={level.activity}
            onComplete={handleActivityComplete}
          />
        ) : null;

      case 'challenge':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-semibold text-lg mb-2">Real-World Challenge</h4>
              <p className="text-muted-foreground">{level.challenge.description}</p>
              <p className="text-sm text-muted-foreground mt-2">You must answer correctly to complete the level</p>
            </div>
            <InteractiveQuiz
              topicId={`budget-level-${level.id}-challenge`}
              question={level.challenge.question}
              options={level.challenge.options || []}
              correctAnswerIndex={typeof level.challenge.correctAnswer === 'number' ? level.challenge.correctAnswer : 0}
              onQuizComplete={(_, isCorrect) => handleChallengeComplete(isCorrect)}
              isCompleted={challengeCompleted && challengeCorrect}
            />
          </div>
        );

      default:
        return null;
    }
  };

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
        {renderCurrentStep()}
        
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
