
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { CreditLevel as CreditLevelType } from '@/data/credit-journey-data';
import { CreditLevelStep } from './CreditLevelSteps';
import CreditFlashcard from './CreditFlashcard';
import CreditDragDrop from './CreditDragDrop';
import InteractiveQuiz from '../InteractiveQuiz';

interface CreditLevelContentProps {
  level: CreditLevelType;
  currentStep: CreditLevelStep;
  masteredFlashcards: Set<string>;
  quizCompleted: boolean;
  activityCompleted: boolean;
  scenarioCompleted: boolean;
  canProceed: boolean;
  onFlashcardMastered: (flashcardId: string) => void;
  onQuizComplete: (topicId: string, isCorrect: boolean) => void;
  onActivityComplete: (isCorrect: boolean) => void;
  onScenarioComplete: (topicId: string, isCorrect: boolean) => void;
  onNext: () => void;
}

const CreditLevelContent: React.FC<CreditLevelContentProps> = ({
  level,
  currentStep,
  masteredFlashcards,
  quizCompleted,
  activityCompleted,
  scenarioCompleted,
  canProceed,
  onFlashcardMastered,
  onQuizComplete,
  onActivityComplete,
  onScenarioComplete,
  onNext
}) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <div className="space-y-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{level.introCard.title}</h3>
                <p className="text-muted-foreground">{level.introCard.content}</p>
              </CardContent>
            </Card>
            <Button onClick={onNext} className="w-full">
              Start Learning <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      case 'flashcards':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg mb-2">Study the Key Terms</h3>
              <p className="text-sm text-muted-foreground">
                Master all {level.flashcards.length} flashcards to continue ({masteredFlashcards.size}/{level.flashcards.length} learned)
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {level.flashcards.map((flashcard) => (
                <CreditFlashcard
                  key={flashcard.id}
                  term={flashcard.term}
                  definition={flashcard.definition}
                  onMastered={() => onFlashcardMastered(flashcard.id)}
                  isMastered={masteredFlashcards.has(flashcard.id)}
                />
              ))}
            </div>
            {canProceed && (
              <Button onClick={onNext} className="w-full">
                Continue to Quiz <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg mb-2">Test Your Knowledge</h3>
            </div>
            <InteractiveQuiz
              topicId={`credit-level-${level.id}`}
              question={level.quiz.question}
              options={level.quiz.options}
              correctAnswerIndex={level.quiz.correct}
              feedbackForIncorrect={level.quiz.explanation}
              onQuizComplete={onQuizComplete}
              isCompleted={quizCompleted}
            />
            {canProceed && (
              <Button onClick={onNext} className="w-full">
                {level.activity ? 'Continue to Activity' : level.scenario ? 'Continue to Scenario' : 'Complete Level'} 
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        );

      case 'activity':
        return level.activity ? (
          <div className="space-y-4">
            <CreditDragDrop
              activity={level.activity}
              onComplete={onActivityComplete}
            />
            {canProceed && (
              <Button onClick={onNext} className="w-full">
                {level.scenario ? 'Continue to Scenario' : 'Complete Level'} <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        ) : null;

      case 'scenario':
        return level.scenario ? (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg mb-2">Real-World Scenario</h3>
            </div>
            <InteractiveQuiz
              topicId={`credit-scenario-${level.id}`}
              question={level.scenario.question}
              options={level.scenario.options}
              correctAnswerIndex={level.scenario.correct}
              feedbackForIncorrect={level.scenario.explanation}
              onQuizComplete={onScenarioComplete}
              isCompleted={scenarioCompleted}
            />
            {canProceed && (
              <Button onClick={onNext} className="w-full">
                Complete Level <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        ) : null;

      case 'complete':
        return (
          <div className="text-center space-y-4">
            <div className="bg-green-100 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">🎉 Level Complete!</h3>
              <p className="text-sm font-medium text-green-800 mb-2">💡 Key Takeaway:</p>
              <p className="text-sm text-green-700">{level.takeaway}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderStepContent();
};

export default CreditLevelContent;
