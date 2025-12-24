import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Sparkles, TrendingUp, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import PandaLogo from '@/components/icons/PandaLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface WelcomeOnboardingBannerProps {
  onStartTour: () => void;
}

const WelcomeOnboardingBanner: React.FC<WelcomeOnboardingBannerProps> = ({ onStartTour }) => {
  const { user, profile } = useAuth();
  const { appWalkthroughCompleted, markAppWalkthroughComplete } = useOnboarding();
  const { currentStreak } = useUnifiedStreak();
  const navigate = useNavigate();
  const handleDismiss = async () => {
    // Mark as complete to never show again
    await markAppWalkthroughComplete();
  };

  const handleStartLearning = () => {
    navigate('/learn');
  };

  // Only show if app walkthrough not completed
  if (appWalkthroughCompleted) return null;

  const isFirstTime = !appWalkthroughCompleted;
  const currentLevel = profile?.current_level || 1;
  const totalPoints = profile?.total_points || 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-6"
      >
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/50 dark:to-blue-950/50">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>

          <CardContent className="p-6">
            {isFirstTime ? (
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <PandaLogo className="h-20 w-20 text-primary" />
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    Hey there! I'm Phil, your finance buddy! 🐼
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Phil's Financials helps you:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-2 bg-background/50 p-3 rounded-lg">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                      <span className="text-sm">Learn finance in bite-sized, fun lessons</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 p-3 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Play interactive games to practice</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 p-3 rounded-lg">
                      <Trophy className="h-5 w-5 text-purple-500" />
                      <span className="text-sm">Track your growth with XP & badges</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={onStartTour}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: [-100, 200] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    Tutorial - Get familiar with the app
                  </Button>
                  <Button
                    onClick={handleStartLearning}
                    variant="outline"
                    size="lg"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    Skip to Learning →
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-6">
                <PandaLogo className="h-16 w-16 text-primary" />

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    Welcome back, {user?.email?.split('@')[0] || 'Learner'}! 🌟
                  </h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                    {currentStreak > 0 && (
                      <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                        <span>Streak: 🔥 {currentStreak} days</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                      <span>Level {currentLevel}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                      <span>{totalPoints} XP</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleStartLearning}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Continue Learning →
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeOnboardingBanner;
