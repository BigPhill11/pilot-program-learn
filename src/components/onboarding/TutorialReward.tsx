import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TutorialRewardProps {
  xp: number;
  badge?: string;
  onComplete?: () => void;
}

const TutorialReward: React.FC<TutorialRewardProps> = ({ xp, badge, onComplete }) => {
  const [showXp, setShowXp] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Show XP counter animation
    setTimeout(() => setShowXp(true), 300);

    // Show badge animation
    if (badge) {
      setTimeout(() => setShowBadge(true), 800);
    }

    // Call onComplete after animations
    if (onComplete) {
      setTimeout(onComplete, badge ? 2500 : 1500);
    }
  }, [badge, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <AnimatePresence>
        {showXp && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="flex items-center gap-3 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 px-8 py-4 rounded-full border-2 border-amber-400"
          >
            <Sparkles className="h-6 w-6 text-amber-600" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-amber-700 dark:text-amber-400"
            >
              +{xp} XP
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBadge && badge && (
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.7 }}
            className="flex flex-col items-center gap-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-10 py-6 rounded-2xl border-2 border-purple-400 shadow-lg"
          >
            <Award className="h-12 w-12 text-purple-600" />
            <span className="text-lg font-semibold text-purple-700 dark:text-purple-400">
              {badge}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TutorialReward;
