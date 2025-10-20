import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, X, BookOpen, TrendingUp, Star, Newspaper, Briefcase } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';

interface AppWalkthroughTourProps {
  open: boolean;
  onClose: () => void;
}

const AppWalkthroughTour: React.FC<AppWalkthroughTourProps> = ({ open, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { markAppWalkthroughComplete } = useOnboarding();

  const slides = [
    {
      title: "Meet Phil & The Mission",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto"
          >
            <PandaLogo className="h-32 w-32 mx-auto text-primary" />
          </motion.div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">I'm Phil the Panda! 🐼</h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              I make finance fun & easy to understand.
            </p>
            <p className="text-base text-muted-foreground max-w-md mx-auto">
              No boring lectures. Just games, stories, and real-world skills you'll actually use!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Your Learning Journey",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <span className="font-semibold">Learn</span>
            </motion.div>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <span className="font-semibold">Play</span>
            </motion.div>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-2">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <span className="font-semibold">Master</span>
            </motion.div>
          </div>
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="text-xl">📚</span>
              <p className="text-sm">Adaptive lessons adjust to YOUR pace</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="text-xl">🎮</span>
              <p className="text-sm">Interactive games make learning stick</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="text-xl">🏆</span>
              <p className="text-sm">Track progress with XP & rank up!</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Explore the App",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg border border-blue-200"
          >
            <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <h4 className="font-semibold mb-1">Learn Tab</h4>
            <p className="text-sm text-muted-foreground">Lessons, games & quizzes</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg border border-green-200"
          >
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold mb-1">Paper Trading</h4>
            <p className="text-sm text-muted-foreground">Practice investing (no real $)</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg border border-purple-200"
          >
            <Newspaper className="h-8 w-8 text-purple-600 mb-2" />
            <h4 className="font-semibold mb-1">Headlines</h4>
            <p className="text-sm text-muted-foreground">Daily finance news</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-lg border border-orange-200"
          >
            <Briefcase className="h-8 w-8 text-orange-600 mb-2" />
            <h4 className="font-semibold mb-1">Careers</h4>
            <p className="text-sm text-muted-foreground">Explore finance jobs</p>
          </motion.div>
        </div>
      ),
    },
    {
      title: "Ready to Level Up?",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PandaLogo className="h-32 w-32 mx-auto text-primary" />
          </motion.div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">You're all set!</h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Time to start your finance adventure. First stop: The Learn Tab Tutorial!
            </p>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg inline-block">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                🎁 Complete it to earn your first badge!
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const progress = ((currentSlide + 1) / slides.length) * 100;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    markAppWalkthroughComplete();
    onClose();
  };

  const handleComplete = async () => {
    await markAppWalkthroughComplete();
    onClose();
    navigate('/learn');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleSkip}
          title="Close tour"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {currentSlide + 1} of {slides.length}</span>
              <button 
                onClick={handleSkip} 
                className="text-primary hover:underline font-medium"
              >
                Skip Tour
              </button>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 min-h-[400px]"
            >
              <h2 className="text-3xl font-bold text-center text-primary">
                {slides[currentSlide].title}
              </h2>
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              {currentSlide === slides.length - 1 ? (
                <>🚀 Start Learn Tab Tutorial</>
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppWalkthroughTour;
