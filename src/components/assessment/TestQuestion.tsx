import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { AssessmentQuestion } from '@/data/personal-finance-assessments';
import { useState } from 'react';

interface TestQuestionProps {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
  showFeedback?: boolean;
}

export function TestQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showFeedback = true
}: TestQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (hasAnswered) return;
    
    setSelectedIndex(index);
    setHasAnswered(true);
    
    const isCorrect = index === question.correctIndex;
    
    // Delay before calling onAnswer to show feedback
    if (showFeedback) {
      setTimeout(() => {
        onAnswer(index, isCorrect);
      }, 2500);
    } else {
      onAnswer(index, isCorrect);
    }
  };

  const isCorrect = selectedIndex === question.correctIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Difficulty Badge */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          question.difficulty === 'easy' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
          question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
          'bg-red-500/20 text-red-700 dark:text-red-400'
        }`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>

      {/* Question */}
      <Card className="p-6 mb-6 border-2">
        <h2 className="text-xl font-semibold mb-6 leading-relaxed">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isCorrectOption = index === question.correctIndex;
            const showCorrectState = hasAnswered && isCorrectOption;
            const showIncorrectState = hasAnswered && isSelected && !isCorrectOption;

            return (
              <motion.button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={hasAnswered}
                whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  hasAnswered
                    ? showCorrectState
                      ? 'border-green-500 bg-green-500/10'
                      : showIncorrectState
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-border bg-muted/30'
                    : isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                } ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${
                      hasAnswered
                        ? showCorrectState
                          ? 'border-green-500 bg-green-500 text-white'
                          : showIncorrectState
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-border bg-background'
                        : isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                  {showCorrectState && (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  )}
                  {showIncorrectState && (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </Card>

      {/* Feedback Panel */}
      <AnimatePresence>
        {hasAnswered && showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
          >
            <Card className={`p-6 border-2 ${
              isCorrect 
                ? 'border-green-500 bg-green-500/5' 
                : 'border-yellow-500 bg-yellow-500/5'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isCorrect ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  ) : (
                    <Lightbulb className="w-7 h-7 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {isCorrect ? "That's correct! 🎉" : "Not quite, but great try! 💪"}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {isCorrect ? question.explanation : question.philFeedback}
                  </p>
                  {question.funFact && isCorrect && (
                    <div className="mt-3 p-3 bg-background/50 rounded-lg border border-border">
                      <p className="text-sm">
                        <span className="font-semibold text-primary">💡 Fun Fact:</span> {question.funFact}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
