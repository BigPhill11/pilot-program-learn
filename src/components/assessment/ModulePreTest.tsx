import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Target, ArrowRight, X } from 'lucide-react';
import { TestQuestion } from './TestQuestion';
import { TestResults } from './TestResults';
import { getAssessmentByModuleId, calculateWeakAreas, calculateStrongAreas } from '@/data/personal-finance-assessments';

interface ModulePreTestProps {
  moduleId: string;
  moduleName: string;
  onComplete: (results: {
    score: number;
    answers: number[];
    weakAreas: string[];
    strongAreas: string[];
  }) => void;
  onSkip?: () => void;
}

export function ModulePreTest({ moduleId, moduleName, onComplete, onSkip }: ModulePreTestProps) {
  const [stage, setStage] = useState<'welcome' | 'testing' | 'results'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const assessment = getAssessmentByModuleId(moduleId);

  if (!assessment) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Assessment not found for this module.</p>
      </Card>
    );
  }

  const { questions } = assessment;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (selectedIndex: number, isCorrect: boolean) => {
    const newAnswers = [...userAnswers, selectedIndex];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 100);
    } else {
      // Calculate weak and strong areas
      const weakAreas = calculateWeakAreas(questions, newAnswers);
      const strongAreas = calculateStrongAreas(questions, newAnswers);
      
      setTimeout(() => {
        setStage('results');
      }, 100);
    }
  };

  const handleComplete = () => {
    const weakAreas = calculateWeakAreas(questions, userAnswers);
    const strongAreas = calculateStrongAreas(questions, userAnswers);
    
    onComplete({
      score,
      answers: userAnswers,
      weakAreas,
      strongAreas
    });
  };

  if (stage === 'welcome') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <Card className="p-8 border-2">
          {/* Close button if skip is available */}
          {onSkip && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSkip}
              className="float-right"
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-3xl font-bold mb-2">Pre-Test: {moduleName}</h2>
            <p className="text-muted-foreground text-lg">
              Let's see what you already know!
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl">
                  🐼
                </div>
                <div>
                  <p className="font-semibold mb-2">Why take this pre-test?</p>
                  <p className="text-sm text-muted-foreground">
                    This quick assessment helps us understand your current knowledge level. 
                    Don't worry about getting everything right—this helps us personalize 
                    your learning journey and show you exactly how much you've grown!
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Duration</p>
                  <p className="text-xs text-muted-foreground">~5-7 minutes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <BookOpen className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Questions</p>
                  <p className="text-xs text-muted-foreground">{questions.length} total</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Target className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Goal</p>
                  <p className="text-xs text-muted-foreground">Just do your best!</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-center">
                ⏱️ <span className="font-semibold">No time limit!</span> Take your time and think through each question.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {onSkip && (
              <Button
                variant="outline"
                onClick={onSkip}
                className="flex-1"
              >
                Skip for Now
              </Button>
            )}
            <Button
              onClick={() => setStage('testing')}
              className="flex-1"
              size="lg"
            >
              Start Pre-Test
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (stage === 'results') {
    const weakAreas = calculateWeakAreas(questions, userAnswers);
    const strongAreas = calculateStrongAreas(questions, userAnswers);

    return (
      <TestResults
        score={score}
        totalQuestions={questions.length}
        weakAreas={weakAreas}
        strongAreas={strongAreas}
        moduleName={moduleName}
        isPreTest={true}
        onContinue={handleComplete}
      />
    );
  }

  return (
    <div className="min-h-screen py-8 relative">
      {onSkip && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSkip}
            className="rounded-full hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}
      <AnimatePresence mode="wait">
        <TestQuestion
          key={currentQuestionIndex}
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          showFeedback={true}
        />
      </AnimatePresence>
    </div>
  );
}
