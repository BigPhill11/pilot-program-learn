
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

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

  const getButtonVariant = (index: number) => {
    if (!hasAttempted && !isCompleted) return "outline";
    if (index === correctAnswerIndex) return "default";
    if (index === selectedAnswerIndex && index !== correctAnswerIndex) return "destructive";
    return "outline";
  };

  const getButtonClassName = (index: number) => {
    let baseClasses = "w-full justify-start text-left text-sm py-2 px-3 h-auto mb-2";
    if (!hasAttempted && !isCompleted) return `${baseClasses} hover:bg-accent`;
    
    if (index === correctAnswerIndex) {
      return `${baseClasses} bg-green-500 hover:bg-green-600 text-white`;
    }
    if (index === selectedAnswerIndex && index !== correctAnswerIndex) {
      return `${baseClasses} bg-red-500 hover:bg-red-600 text-white`;
    }
    return `${baseClasses} opacity-70 cursor-not-allowed`;
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-muted/30">
      <p className="font-semibold mb-3 text-md">{question}</p>
      <div className="space-y-1">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={getButtonVariant(index)}
            className={getButtonClassName(index)}
            onClick={() => handleOptionClick(index)}
            disabled={hasAttempted || isCompleted}
          >
            <span className="flex-grow">{option}</span>
            {(hasAttempted || isCompleted) && index === correctAnswerIndex && <CheckCircle2 className="h-5 w-5 ml-2" />}
            {hasAttempted && index === selectedAnswerIndex && index !== correctAnswerIndex && <XCircle className="h-5 w-5 ml-2" />}
          </Button>
        ))}
      </div>
      {(hasAttempted && selectedAnswerIndex !== correctAnswerIndex && feedbackForIncorrected) && (
        <div className="mt-3 p-3 text-sm bg-destructive/10 text-destructive border border-destructive/30 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{feedbackForIncorrect}</p>
        </div>
      )}
      {(isCompleted && !hasAttempted) && (
         <div className="mt-3 p-2 text-sm bg-green-500/10 text-green-700 border border-green-500/30 rounded-md flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>You've already answered this correctly!</p>
        </div>
      )}
      {(!hasAttempted && !isCompleted) && (
         <p className="text-xs text-muted-foreground mt-3 text-center">Select an option to test your knowledge.</p>
      )}
    </div>
  );
};

export default InteractiveQuiz;
