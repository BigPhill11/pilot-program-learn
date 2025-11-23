import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Trophy, TrendingUp, Target, ArrowRight, CheckCircle } from 'lucide-react';
import { TestQuestion } from './TestQuestion';
import { TestResults } from './TestResults';
import { getAssessmentByModuleId, calculateWeakAreas, calculateStrongAreas } from '@/data/personal-finance-assessments';
import { Progress } from '@/components/ui/progress';

interface ModulePostTestProps {
  moduleId: string;
  moduleName: string;
  preTestScore: number;
  isUnlocked: boolean;
  completedLessons: number;
  totalLessons: number;
  onComplete: (results: {
    score: number;
    answers: number[];
    weakAreas: string[];
    strongAreas: string[];
    improvement: number;
  }) => void;
  onClose?: () => void;
}

export function ModulePostTest({
  moduleId,
  moduleName,
  preTestScore,
  isUnlocked,
  completedLessons,
  totalLessons,
  onComplete,
  onClose
}: ModulePostTestProps) {
  const [stage, setStage] = useState<'locked' | 'welcome' | 'testing' | 'results'>(
    isUnlocked ? 'welcome' : 'locked'
  );
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
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const handleAnswer = (selectedIndex: number, isCorrect: boolean) => {
    const newAnswers = [...userAnswers, selectedIndex];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setStage('results');
      }, 100);
    }
  };

  const handleComplete = () => {
    const weakAreas = calculateWeakAreas(questions, userAnswers);
    const strongAreas = calculateStrongAreas(questions, userAnswers);
    const finalScore = Math.round((score / questions.length) * 100);
    const improvement = finalScore - preTestScore;
    
    onComplete({
      score,
      answers: userAnswers,
      weakAreas,
      strongAreas,
      improvement
    });
  };

  if (stage === 'locked') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <Card className="p-8 border-2 border-muted">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Lock className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Post-Test Locked</h2>
            <p className="text-muted-foreground text-lg">
              Complete all lessons to unlock the post-test!
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <Card className="p-6 bg-muted/50">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Lesson Progress</span>
                  <span className="text-muted-foreground">{completedLessons}/{totalLessons} completed</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              
              <div className="space-y-2">
                {Array.from({ length: totalLessons }, (_, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {i < completedLessons ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className={i < completedLessons ? 'text-green-500' : 'text-muted-foreground'}>
                      Lesson {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl">
                  🐼
                </div>
                <div>
                  <p className="font-semibold mb-2">Keep Going!</p>
                  <p className="text-sm text-muted-foreground">
                    You're making great progress! Complete the remaining {totalLessons - completedLessons} 
                    {totalLessons - completedLessons === 1 ? ' lesson' : ' lessons'} and you'll unlock 
                    the post-test to see how much you've learned!
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                <Target className="w-6 h-6 text-green-500 mb-2" />
                <p className="font-semibold text-sm">Compare Scores</p>
                <p className="text-xs text-muted-foreground">See your improvement</p>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
                <p className="font-semibold text-sm">Track Growth</p>
                <p className="text-xs text-muted-foreground">Measure your progress</p>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                <p className="font-semibold text-sm">Earn Rewards</p>
                <p className="text-xs text-muted-foreground">Get bonus XP!</p>
              </div>
            </div>
          </div>

          {onClose && (
            <Button onClick={onClose} variant="outline" className="w-full">
              Back to Lessons
            </Button>
          )}
        </Card>
      </motion.div>
    );
  }

  if (stage === 'welcome') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <Card className="p-8 border-2">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold mb-2">Post-Test: {moduleName}</h2>
            <p className="text-muted-foreground text-lg">
              Time to show what you've learned!
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Your Pre-Test Score</p>
                  <p className="text-3xl font-bold">{preTestScore}%</p>
                </div>
                <TrendingUp className="w-12 h-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Can you beat your pre-test score? Let's find out!
              </p>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl">
                  🐼
                </div>
                <div>
                  <p className="font-semibold mb-2">You've Got This!</p>
                  <p className="text-sm text-muted-foreground">
                    You've completed all the lessons and practiced the material. 
                    This post-test will show how much you've grown. Take your time, 
                    trust your knowledge, and do your best!
                  </p>
                </div>
              </div>
            </Card>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-center">
                🏆 <span className="font-semibold">Improve by 15%+</span> and earn bonus XP!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {onClose && (
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Not Yet
              </Button>
            )}
            <Button
              onClick={() => setStage('testing')}
              className="flex-1"
              size="lg"
            >
              Start Post-Test
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
        isPreTest={false}
        preTestScore={preTestScore}
        onContinue={handleComplete}
      />
    );
  }

  return (
    <div className="min-h-screen py-8">
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
