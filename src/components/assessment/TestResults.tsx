import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, Target, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface TestResultsProps {
  score: number;
  totalQuestions: number;
  weakAreas: string[];
  strongAreas: string[];
  moduleName: string;
  isPreTest?: boolean;
  preTestScore?: number;
  onContinue: () => void;
  onRetake?: () => void;
}

export function TestResults({
  score,
  totalQuestions,
  weakAreas,
  strongAreas,
  moduleName,
  isPreTest = true,
  preTestScore,
  onContinue,
  onRetake
}: TestResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const improvement = preTestScore !== undefined ? percentage - preTestScore : 0;
  const isPassing = percentage >= 70;
  const isExcellent = percentage >= 85;

  useEffect(() => {
    // Trigger confetti for excellent scores
    if (isExcellent) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isExcellent]);

  const getEmoji = () => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '👍';
    if (percentage >= 60) return '💪';
    return '📚';
  };

  const getMessage = () => {
    if (isPreTest) {
      if (percentage >= 80) return "Wow! You already know a lot about this topic. Let's refine your skills even more!";
      if (percentage >= 60) return "Great foundation! You've got some solid knowledge to build on.";
      return "Perfect starting point! You're about to learn so much. Let's get started!";
    } else {
      if (improvement >= 20) return "INCREDIBLE IMPROVEMENT! You've mastered this material! 🎉";
      if (improvement >= 10) return "Fantastic growth! Your hard work really paid off!";
      if (improvement > 0) return "Nice progress! You're moving in the right direction!";
      return "You maintained your strong knowledge! Well done!";
    }
  };

  const formatTopicName = (topic: string) => {
    return topic
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <Card className="p-8 border-2">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-8xl mb-4"
          >
            {getEmoji()}
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">
            {isPreTest ? 'Pre-Test Complete!' : 'Post-Test Complete!'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {moduleName}
          </p>
        </div>

        {/* Score Display */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="text-6xl font-bold text-primary mb-2">
              {percentage}%
            </div>
            <p className="text-lg text-muted-foreground">
              {score} out of {totalQuestions} correct
            </p>
          </div>
          
          <Progress value={percentage} className="h-3" />
          
          {!isPreTest && preTestScore !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pre-Test Score</p>
                  <p className="text-2xl font-bold">{preTestScore}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Improvement</p>
                  <p className={`text-2xl font-bold ${improvement > 0 ? 'text-green-500' : 'text-muted-foreground'}`}>
                    {improvement > 0 ? '+' : ''}{improvement}%
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Phil's Message */}
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl">
              🐼
            </div>
            <div>
              <p className="font-semibold mb-2">Phil says:</p>
              <p className="text-muted-foreground">{getMessage()}</p>
            </div>
          </div>
        </Card>

        {/* Areas Analysis */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Strong Areas */}
          {strongAreas.length > 0 && (
            <Card className="p-6 border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold">Strong Areas</h3>
              </div>
              <ul className="space-y-2">
                {strongAreas.slice(0, 3).map((area, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    <span>{formatTopicName(area)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <Card className="p-6 border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold">Areas to Focus On</h3>
              </div>
              <ul className="space-y-2">
                {weakAreas.slice(0, 3).map((area, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-yellow-500" />
                    <span>{formatTopicName(area)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* XP Earned (for post-test) */}
        {!isPreTest && improvement >= 15 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border-2 border-yellow-500/50"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <p className="font-semibold text-lg">
                Bonus XP Earned! +{improvement >= 20 ? 50 : 25} XP for your improvement!
              </p>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {onRetake && (
            <Button
              variant="outline"
              onClick={onRetake}
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Test
            </Button>
          )}
          <Button
            onClick={onContinue}
            className="flex-1"
            size="lg"
          >
            {isPreTest ? 'Start Learning' : 'Continue Journey'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
