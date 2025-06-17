
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BudgetLevel } from '@/data/budgeting-journey-data';
import { BudgetLevelStep } from './BudgetLevelSteps';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import BudgetFlashcard from './BudgetFlashcard';
import BudgetDragDrop from './BudgetDragDrop';

interface BudgetLevelContentProps {
  level: BudgetLevel;
  currentStep: BudgetLevelStep;
  masteredFlashcards: Set<string>;
  quizCompleted: boolean;
  quizCorrect: boolean;
  activityCompleted: boolean;
  challengeCompleted: boolean;
  challengeCorrect: boolean;
  onFlashcardMastered: (term: string) => void;
  onQuizComplete: (topicId: string, isCorrect: boolean) => void;
  onActivityComplete: (isCorrect: boolean) => void;
  onChallengeComplete: (isCorrect: boolean) => void;
}

const BudgetLevelContent: React.FC<BudgetLevelContentProps> = ({
  level,
  currentStep,
  masteredFlashcards,
  quizCompleted,
  quizCorrect,
  activityCompleted,
  challengeCompleted,
  challengeCorrect,
  onFlashcardMastered,
  onQuizComplete,
  onActivityComplete,
  onChallengeComplete
}) => {
  switch (currentStep) {
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
                onMastered={() => onFlashcardMastered(flashcard.term)}
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
            onQuizComplete={onQuizComplete}
            isCompleted={quizCompleted && quizCorrect}
          />
        </div>
      );

    case 'activity':
      return level.activity ? (
        <BudgetDragDrop
          activity={level.activity}
          onComplete={onActivityComplete}
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
            onQuizComplete={(_, isCorrect) => onChallengeComplete(isCorrect)}
            isCompleted={challengeCompleted && challengeCorrect}
          />
        </div>
      );

    default:
      return null;
  }
};

export default BudgetLevelContent;
