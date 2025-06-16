
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Play, ArrowRight } from 'lucide-react';
import FinancialSafetyFlashcard from './FinancialSafetyFlashcard';
import FinancialSafetyDragDrop from './FinancialSafetyDragDrop';
import InteractiveQuiz from '@/components/InteractiveQuiz';

interface FinancialSafetyLevelProps {
  levelNumber: number;
  levelData: any;
  onComplete: () => void;
  isCompleted: boolean;
}

const FinancialSafetyLevel: React.FC<FinancialSafetyLevelProps> = ({
  levelNumber,
  levelData,
  onComplete,
  isCompleted
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [masteredFlashcards, setMasteredFlashcards] = useState<string[]>([]);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const steps = ['flashcards', 'dragdrop', 'quiz'];
  const stepTitles = ['Learn Key Terms', 'Practice Activity', 'Knowledge Check'];

  const handleFlashcardMastered = (term: string) => {
    if (!masteredFlashcards.includes(term)) {
      setMasteredFlashcards(prev => [...prev, term]);
    }
  };

  const handleActivityComplete = (activity: string) => {
    if (!completedActivities.includes(activity)) {
      setCompletedActivities(prev => [...prev, activity]);
    }
  };

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    if (isCorrect) {
      handleActivityComplete('quiz');
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: // Flashcards
        return masteredFlashcards.length >= Math.ceil(levelData.flashcards.length * 0.75);
      case 1: // Drag & Drop
        return completedActivities.includes('dragdrop');
      case 2: // Quiz
        return completedActivities.includes('quiz');
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isCompleted) {
    return (
      <Card className="w-full border-purple-500">
        <CardContent className="p-6 text-center">
          <CheckCircle2 className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-purple-700 mb-2">Level {levelNumber} Complete!</h3>
          <p className="text-muted-foreground">You've mastered {levelData.title}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Level {levelNumber}: {levelData.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{stepTitles[currentStep]}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Flashcards Step */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Study These Key Terms</h3>
            <p className="text-sm text-muted-foreground">
              Master at least {Math.ceil(levelData.flashcards.length * 0.75)} terms to continue
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {levelData.flashcards.map((flashcard: any, index: number) => (
              <FinancialSafetyFlashcard
                key={index}
                term={flashcard.term}
                definition={flashcard.definition}
                onMastered={() => handleFlashcardMastered(flashcard.term)}
                isMastered={masteredFlashcards.includes(flashcard.term)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Drag & Drop Step */}
      {currentStep === 1 && (
        <FinancialSafetyDragDrop
          title={levelData.dragDropActivity.title}
          instruction={levelData.dragDropActivity.instruction}
          items={levelData.dragDropActivity.items}
          categories={levelData.dragDropActivity.categories}
          onComplete={() => handleActivityComplete('dragdrop')}
        />
      )}

      {/* Quiz Step */}
      {currentStep === 2 && (
        <Card>
          <CardContent className="p-6">
            <InteractiveQuiz
              topicId={`safety-level-${levelNumber}`}
              question={levelData.quiz.question}
              options={levelData.quiz.options}
              correctAnswerIndex={levelData.quiz.correctAnswer}
              feedbackForIncorrect={levelData.quiz.explanation}
              onQuizComplete={handleQuizComplete}
              isCompleted={completedActivities.includes('quiz')}
            />
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-center">
        <Button
          onClick={handleNext}
          disabled={!canProceedToNext()}
          className="bg-purple-500 hover:bg-purple-600"
          size="lg"
        >
          {currentStep < steps.length - 1 ? (
            <>
              Next Step <ArrowRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Complete Level <CheckCircle2 className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FinancialSafetyLevel;
