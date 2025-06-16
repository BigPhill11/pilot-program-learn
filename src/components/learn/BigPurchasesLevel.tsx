
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { BigPurchasesLevel } from '@/data/big-purchases-journey-data';
import BigPurchasesFlashcard from './BigPurchasesFlashcard';
import BigPurchasesDragDrop from './BigPurchasesDragDrop';
import InteractiveQuiz from '../InteractiveQuiz';

interface BigPurchasesLevelProps {
  level: BigPurchasesLevel;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
}

const BigPurchasesLevelComponent: React.FC<BigPurchasesLevelProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onComplete,
  onQuizComplete
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [masteredFlashcards, setMasteredFlashcards] = useState<Set<number>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);

  const handleFlashcardMastered = (index: number) => {
    setMasteredFlashcards(prev => new Set(prev).add(index));
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    setQuizCompleted(true);
    onQuizComplete(isCorrect);
    checkLevelCompletion(true, activityCompleted);
  };

  const handleActivityComplete = (isCorrect: boolean) => {
    setActivityCompleted(true);
    checkLevelCompletion(quizCompleted, true);
  };

  const checkLevelCompletion = (quiz: boolean, activity: boolean) => {
    const flashcardsComplete = masteredFlashcards.size === level.flashcards.length;
    const activityComplete = !level.activity || activity;
    
    if (flashcardsComplete && quiz && activityComplete && !isCompleted) {
      onComplete();
    }
  };

  if (!isUnlocked) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-lg">{level.title}</CardTitle>
                <p className="text-sm text-muted-foreground">Complete previous levels to unlock</p>
              </div>
            </div>
            <Badge variant="secondary">Locked</Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={`${isCompleted ? 'border-green-500 bg-green-50/30' : 'border-purple-500/30'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-600" />}
            <div>
              <CardTitle className="text-lg">{level.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{level.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <Badge className="bg-green-500 text-white">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Flashcards Section */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              📚 Key Terms 
              <Badge variant="outline">
                {masteredFlashcards.size}/{level.flashcards.length} mastered
              </Badge>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {level.flashcards.map((flashcard, index) => (
                <BigPurchasesFlashcard
                  key={index}
                  term={flashcard.term}
                  definition={flashcard.definition}
                  onMastered={() => handleFlashcardMastered(index)}
                  isMastered={masteredFlashcards.has(index)}
                />
              ))}
            </div>
          </div>

          {/* Activity Section */}
          {level.activity && (
            <div>
              <h4 className="font-semibold mb-4">🎯 Interactive Activity</h4>
              <BigPurchasesDragDrop
                activity={level.activity}
                onComplete={handleActivityComplete}
              />
            </div>
          )}

          {/* Quiz Section */}
          <div>
            <h4 className="font-semibold mb-4">🧠 Knowledge Check</h4>
            <InteractiveQuiz
              topicId={`big-purchases-level-${level.id}`}
              question={level.quiz.question}
              options={level.quiz.options}
              correctAnswerIndex={level.quiz.correctAnswerIndex}
              feedbackForIncorrect={level.quiz.feedbackForIncorrect}
              onQuizComplete={handleQuizComplete}
              isCompleted={quizCompleted}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default BigPurchasesLevelComponent;
