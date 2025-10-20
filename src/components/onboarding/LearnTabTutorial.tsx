import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/hooks/useOnboarding';
import TutorialReward from './TutorialReward';
import { toast } from 'sonner';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface LearnTabTutorialProps {
  open: boolean;
  onClose: () => void;
}

const LearnTabTutorial: React.FC<LearnTabTutorialProps> = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  // Companies tab is always unlocked (browse unlocked)
  const [clickedTabs, setClickedTabs] = useState<Set<string>>(new Set(['companies']));
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [budgetAllocated, setBudgetAllocated] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const { markLearnTabTutorialComplete } = useOnboarding();
  const { updateActivityComplete } = useProgressTracking();

  const tabs = [
    { id: 'adaptive', name: 'Adaptive', tooltip: 'AI picks lessons just for you!' },
    { id: 'personal', name: 'Personal Finance', tooltip: 'Budgeting, saving, credit basics' },
    { id: 'games', name: 'Games', tooltip: 'Learn by playing—it\'s fun!' },
    { id: 'companies', name: 'Companies', tooltip: 'Discover & analyze real stocks' },
    { id: 'careers', name: 'Careers', tooltip: 'Explore finance career paths' },
  ];

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Your Learning HQ',
      duration: 15,
      canProceed: () => clickedTabs.size === 5,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <PandaLogo className="h-20 w-20 mx-auto mb-4 text-primary" />
            <p className="text-lg text-muted-foreground">
              This is where the magic happens! 🎩 You've got 5 learning zones here.
            </p>
            <p className="font-semibold text-primary mt-2">
              👉 Click each tab below to see what's inside!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setClickedTabs(new Set(clickedTabs).add(tab.id));
                  toast.success(tab.tooltip, { duration: 2000 });
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  clickedTabs.has(tab.id)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted border-muted-foreground/20 hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-semibold">{tab.name}</div>
                {clickedTabs.has(tab.id) && (
                  <CheckCircle2 className="h-5 w-5 mx-auto mt-2" />
                )}
              </motion.button>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {clickedTabs.size === 0 && '❌ Not clicked (0/5)'}
            {clickedTabs.size > 0 && clickedTabs.size < 5 && `✅ Clicked (${clickedTabs.size}/5)`}
            {clickedTabs.size === 5 && '🎉 All tabs explored! +125 XP'}
          </div>
        </div>
      ),
    },
    {
      id: 'mini-lesson',
      title: 'Try a Mini-Lesson',
      duration: 30,
      canProceed: () => quizAnswer !== null,
      content: (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <PandaLogo className="h-16 w-16 text-primary flex-shrink-0" />
            <div className="bg-muted p-4 rounded-lg flex-1">
              <p className="text-sm text-muted-foreground italic">
                "Let's see how lessons work! This is a SUPER quick demo."
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 p-6 rounded-lg border-2 border-blue-200">
            <h4 className="font-semibold text-lg mb-4">What does "compound interest" mean?</h4>
            <div className="space-y-3">
              {[
                { value: 'correct', label: 'Interest on interest' },
                { value: 'wrong1', label: 'Simple interest' },
                { value: 'wrong2', label: 'Bank fees' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setQuizAnswer(option.value);
                    if (option.value === 'correct') {
                      toast.success('🎉 Yes! That\'s right! +50 XP');
                    } else {
                      toast.info('Not quite, but great try! Here\'s why... +25 XP for trying');
                    }
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    quizAnswer === option.value
                      ? option.value === 'correct'
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                        : 'bg-orange-100 dark:bg-orange-900/30 border-orange-500'
                      : 'bg-background border-muted-foreground/20 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {quizAnswer === option.value && (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {quizAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-muted-foreground bg-muted p-3 rounded-lg"
            >
              💡 All lessons work like this: Learn → Quiz → Earn XP!
            </motion.div>
          )}
        </div>
      ),
    },
    {
      id: 'game',
      title: 'Play a Quick Game',
      duration: 45,
      canProceed: () => budgetAllocated,
      content: (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <PandaLogo className="h-16 w-16 text-primary flex-shrink-0" />
            <div className="bg-muted p-4 rounded-lg flex-1">
              <p className="text-sm text-muted-foreground italic">
                "Games make learning stick! Try this: You have $100. Budget it wisely!"
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 p-6 rounded-lg border-2 border-green-200">
            <h4 className="font-semibold text-lg mb-4">Budget Challenge</h4>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded-lg">
                <label className="text-sm font-medium mb-2 block">Needs: $60</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="60"
                  className="w-full"
                  disabled={budgetAllocated}
                />
              </div>
              <div className="bg-background p-4 rounded-lg">
                <label className="text-sm font-medium mb-2 block">Wants: $30</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="30"
                  className="w-full"
                  disabled={budgetAllocated}
                />
              </div>
              <div className="bg-background p-4 rounded-lg">
                <label className="text-sm font-medium mb-2 block">Savings: $10</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="10"
                  className="w-full"
                  disabled={budgetAllocated}
                />
              </div>
              {!budgetAllocated && (
                <Button
                  onClick={() => {
                    setBudgetAllocated(true);
                    toast.success('Perfect! That\'s smart budgeting! +75 XP');
                  }}
                  className="w-full"
                >
                  Check My Budget
                </Button>
              )}
            </div>
          </div>

          {budgetAllocated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-muted-foreground bg-muted p-3 rounded-lg"
            >
              🎮 Games unlock as you level up. Keep learning!
            </motion.div>
          )}
        </div>
      ),
    },
    {
      id: 'progress',
      title: 'Your Progress Dashboard',
      duration: 15,
      canProceed: () => true,
      content: (
        <div className="space-y-6 max-w-2xl mx-auto text-center">
          <PandaLogo className="h-20 w-20 mx-auto text-primary" />
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              See these progress cards? They track your journey!
            </p>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-lg border-2 border-purple-200">
              <div className="text-4xl mb-2">🐼</div>
              <div className="font-semibold mb-2">Current Rank: Bamboo Sprout</div>
              <div className="bg-background rounded-full h-4 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '27%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                You just earned 275 XP in this tutorial!
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Complete lessons to level up & unlock new content!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'complete',
      title: 'You\'re Ready! 🎓',
      duration: 10,
      canProceed: () => true,
      content: (
        <div className="space-y-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PandaLogo className="h-32 w-32 mx-auto text-primary" />
          </motion.div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Awesome!</h3>
            <div className="max-w-md mx-auto space-y-3">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
                <p className="font-semibold text-amber-800 dark:text-amber-400">
                  🏅 Tutorial Master Badge
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
                <p className="font-semibold text-purple-800 dark:text-purple-400">
                  ⭐ 300 XP Total
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="font-semibold text-green-800 dark:text-green-400">
                  🔓 Full Access to Learn Tab
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Ready to start your first real lesson?
            </p>
          </div>
        </div>
      ),
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowReward(true);
      await updateActivityComplete('learn_tab_tutorial', 300);
      await markLearnTabTutorialComplete(300);
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  if (showReward) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl">
          <TutorialReward xp={300} badge="Tutorial Master" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <div className="flex items-center gap-4">
                <span>~{currentStepData.duration}s</span>
                <button 
                  onClick={onClose} 
                  className="text-primary hover:underline font-medium"
                >
                  Skip Tutorial
                </button>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 min-h-[400px]"
            >
              <h2 className="text-3xl font-bold text-center text-primary">
                {currentStepData.title}
              </h2>
              {currentStepData.content}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!currentStepData.canProceed()}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:opacity-50"
            >
              {currentStep === steps.length - 1 ? (
                <>🚀 Start Level 1, Lesson 1</>
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

export default LearnTabTutorial;
