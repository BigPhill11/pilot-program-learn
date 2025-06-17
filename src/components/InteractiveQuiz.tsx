
import React, { useState } from 'react';
import QuizOption from '@/components/quiz/QuizOption';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';

interface InteractiveQuizProps {
  topicId: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedbackForIncorrect?: string;
  onQuizComplete: (topicId: string, isCorrect: boolean) => void;
  isCompleted: boolean;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  topicId,
  question,
  options,
  correctAnswerIndex,
  feedbackForIncorrect,
  onQuizComplete,
  isCompleted
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasAttempted, setHasAttempted] = useState<boolean>(false);

  const handleOptionClick = (index: number) => {
    if (hasAttempted || isCompleted) return;

    setSelectedAnswerIndex(index);
    setHasAttempted(true);
    const isCorrect = index === correctAnswerIndex;
    onQuizComplete(topicId, isCorrect);
  };

  const handleRetry = () => {
    setSelectedAnswerIndex(null);
    setHasAttempted(false);
  };

  const showIncorrectFeedback = hasAttempted && 
    selectedAnswerIndex !== correctAnswerIndex && 
    feedbackForIncorrect;

  const showCompletedFeedback = isCompleted && !hasAttempted;

  return (
    <div className="mt-6 p-4 border rounded-lg bg-muted/30">
      <p className="font-semibold mb-3 text-md">{question}</p>
      <div className="space-y-1">
        {options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswerIndex === index}
            isCorrect={index === correctAnswerIndex}
            hasAttempted={hasAttempted}
            isCompleted={isCompleted}
            onClick={() => handleOptionClick(index)}
          />
        ))}
      </div>
      
      {showIncorrectFeedback && (
        <QuizFeedback type="incorrect" message={feedbackForIncorrect!} />
      )}

      {showCompletedFeedback && (
        <QuizFeedback 
          type="completed" 
          message="You've already answered this correctly!" 
        />
      )}

      <QuizActions
        hasAttempted={hasAttempted}
        isCompleted={isCompleted}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default InteractiveQuiz;
