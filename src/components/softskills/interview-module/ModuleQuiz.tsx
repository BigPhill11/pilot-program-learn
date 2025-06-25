
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import { Module } from '@/types/interview-module';

interface ModuleQuizProps {
  module: Module;
  quizCompleted: boolean;
  onQuizComplete: (topicId: string, isCorrect: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const ModuleQuiz: React.FC<ModuleQuizProps> = ({
  module,
  quizCompleted,
  onQuizComplete,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Knowledge Check</h3>
      <InteractiveQuiz
        topicId={module.quiz.topicId}
        question={module.quiz.question}
        options={module.quiz.options}
        correctAnswerIndex={module.quiz.correctAnswerIndex}
        feedbackForIncorrect={module.quiz.feedbackForIncorrect}
        onQuizComplete={onQuizComplete}
        isCompleted={quizCompleted}
      />
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        {quizCompleted && (
          <Button onClick={onNext}>
            Continue to Assignment
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModuleQuiz;
