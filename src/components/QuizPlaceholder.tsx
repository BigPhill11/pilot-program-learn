
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuizPlaceholderProps {
  question: string;
  options: string[];
}

const QuizPlaceholder: React.FC<QuizPlaceholderProps> = ({ question, options }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-muted/50">
      <p className="font-semibold mb-2 text-sm">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <Button key={index} variant="outline" size="sm" className="w-full justify-start text-left">
            {option}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">Interactive quiz coming soon!</p>
    </div>
  );
};

export default QuizPlaceholder;
