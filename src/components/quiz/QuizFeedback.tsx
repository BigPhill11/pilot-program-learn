
import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface QuizFeedbackProps {
  type: 'incorrect' | 'completed';
  message: string;
}

const QuizFeedback: React.FC<QuizFeedbackProps> = ({ type, message }) => {
  if (type === 'incorrect') {
    return (
      <div className="mt-3 p-3 text-sm bg-destructive/10 text-destructive border border-destructive/30 rounded-md flex items-start">
        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
        <p>{message}</p>
      </div>
    );
  }

  if (type === 'completed') {
    return (
      <div className="mt-3 p-2 text-sm bg-green-500/10 text-green-700 border border-green-500/30 rounded-md flex items-center">
        <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
        <p>{message}</p>
      </div>
    );
  }

  return null;
};

export default QuizFeedback;
