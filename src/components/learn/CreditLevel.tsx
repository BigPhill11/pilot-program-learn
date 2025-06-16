
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { CreditLevel as CreditLevelType } from '@/data/credit-journey-data';
import CreditFlashcard from './CreditFlashcard';
import CreditDragDrop from './CreditDragDrop';
import InteractiveQuiz from '../InteractiveQuiz';

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
  const [currentStep, setCurrentStep] = useState<'intro' | 'flashcards' | 'quiz' | 'activity' | 'scenario' | 'complete'>('intro');
  const [masteredFlashcards, setMasteredFlashcards] = useState<Set<string>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);

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

  const getNextStep = () => {
    switch (currentStep) {
      case 'intro': return 'flashcards';
      case 'flashcards': return 'quiz';
      case 'quiz': return level.activity ? 'activity' : (level.scenario ? 'scenario' : 'complete');
      case 'activity': return level.scenario ? 'scenario' : 'complete';
      case 'scenario': return 'complete';
      default: return 'complete';
    }
  };

  const handleNext = () => {
    const nextStep = getNextStep();
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
        {currentStep === 'intro' && (
          <div className="space-y-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{level.introCard.title}</h3>
                <p className="text-muted-foreground">{level.introCard.content}</p>
              </CardContent>
            </Card>
            <Button onClick={handleNext} className="w-full">
              Start Learning <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {currentStep === 'flashcards' && (
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
                  onMastered={() => handleFlashcardMastered(flashcard.id)}
                  isMastered={masteredFlashcards.has(flashcard.id)}
                />
              ))}
            </div>
            {canProceedToNext() && (
              <Button onClick={handleNext} className="w-full">
                Continue to Quiz <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        )}

        {currentStep === 'quiz' && (
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
              onQuizComplete={handleQuizCompletion}
              isCompleted={quizCompleted}
            />
            {canProceedToNext() && (
              <Button onClick={handleNext} className="w-full">
                {level.activity ? 'Continue to Activity' : level.scenario ? 'Continue to Scenario' : 'Complete Level'} 
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        )}

        {currentStep === 'activity' && level.activity && (
          <div className="space-y-4">
            <CreditDragDrop
              activity={level.activity}
              onComplete={handleActivityCompletion}
            />
            {canProceedToNext() && (
              <Button onClick={handleNext} className="w-full">
                {level.scenario ? 'Continue to Scenario' : 'Complete Level'} <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        )}

        {currentStep === 'scenario' && level.scenario && (
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
              onQuizComplete={handleScenarioCompletion}
              isCompleted={scenarioCompleted}
            />
            {canProceedToNext() && (
              <Button onClick={handleNext} className="w-full">
                Complete Level <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        )}

        {currentStep === 'complete' && (
          <div className="text-center space-y-4">
            <div className="bg-green-100 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">🎉 Level Complete!</h3>
              <p className="text-sm font-medium text-green-800 mb-2">💡 Key Takeaway:</p>
              <p className="text-sm text-green-700">{level.takeaway}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditLevel;
