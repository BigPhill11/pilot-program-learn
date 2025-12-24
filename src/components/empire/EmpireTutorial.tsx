/**
 * EmpireTutorial Component
 * 
 * Modal tutorial for Bamboo Empire game, opened via the logo.
 */

import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  X, 
  Target, 
  Leaf, 
  Sparkles, 
  Battery, 
  Building2, 
  Cloud,
  CreditCard
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { empireClasses } from '@/config/empireTheme';
import { cn } from '@/lib/utils';

interface EmpireTutorialProps {
  open: boolean;
  onClose: () => void;
}

const EmpireTutorial: React.FC<EmpireTutorialProps> = ({ open, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Bamboo Empire!",
      icon: <Target className="h-8 w-8 text-[#7A9B7E]" />,
      content: (
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto"
          >
            <PandaLogo className="h-24 w-24 mx-auto" />
          </motion.div>
          <div className="space-y-3">
            <h3 className={cn("text-xl font-bold", empireClasses.textPrimary)}>
              Your Goal
            </h3>
            <p className={cn("text-base max-w-md mx-auto", empireClasses.textSecondary)}>
              Build a stable bamboo production empire while surviving economic shocks.
              Balance growth with protection to thrive long-term!
            </p>
            <div className={cn(
              "p-3 rounded-lg inline-block",
              "bg-[#7A9B7E]/10 border border-[#7A9B7E]/20"
            )}>
              <p className="text-sm font-medium text-[#4F6F57]">
                🎯 Grow bamboo, survive events, build wealth
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Your Resources",
      icon: <Leaf className="h-8 w-8 text-[#7A9B7E]" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "p-4 rounded-lg border text-center",
                empireClasses.bgCard,
                empireClasses.borderDefault
              )}
            >
              <Leaf className="h-10 w-10 mx-auto mb-2 text-[#7A9B7E]" />
              <h4 className={cn("font-semibold mb-1", empireClasses.textPrimary)}>Bamboo</h4>
              <p className={cn("text-sm", empireClasses.textSecondary)}>
                Your main currency. Spend it to upgrade buildings and defenses.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "p-4 rounded-lg border text-center",
                empireClasses.bgCard,
                empireClasses.borderDefault
              )}
            >
              <Sparkles className="h-10 w-10 mx-auto mb-2 text-[#A07C5B]" />
              <h4 className={cn("font-semibold mb-1", empireClasses.textPrimary)}>XP</h4>
              <p className={cn("text-sm", empireClasses.textSecondary)}>
                Unlocks upgrades. Earned by learning and making good decisions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "p-4 rounded-lg border text-center",
                empireClasses.bgCard,
                empireClasses.borderDefault
              )}
            >
              <Battery className="h-10 w-10 mx-auto mb-2 text-[#5A9B5E]" />
              <h4 className={cn("font-semibold mb-1", empireClasses.textPrimary)}>Energy</h4>
              <p className={cn("text-sm", empireClasses.textSecondary)}>
                Multiplies production. Keep it high for best results!
              </p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Your Buildings",
      icon: <Building2 className="h-8 w-8 text-[#7A9B7E]" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            {[
              { name: "Bamboo Farm", desc: "Produces bamboo over time", emoji: "🌱" },
              { name: "Bamboo Storage", desc: "Increases max capacity", emoji: "📦" },
              { name: "Panda House", desc: "Comfort bonus but costs drain", emoji: "🏠" },
              { name: "Workshop", desc: "Generates growth slowly", emoji: "🔧" },
            ].map((building, i) => (
              <motion.div
                key={building.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-3 rounded-lg border",
                  empireClasses.bgCard,
                  empireClasses.borderDefault
                )}
              >
                <span className="text-2xl">{building.emoji}</span>
                <h4 className={cn("font-semibold text-sm mt-1", empireClasses.textPrimary)}>
                  {building.name}
                </h4>
                <p className={cn("text-xs", empireClasses.textSecondary)}>
                  {building.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className={cn(
            "p-3 rounded-lg text-center",
            "bg-[#B8873A]/10 border border-[#B8873A]/20"
          )}>
            <p className="text-sm text-[#8B6520]">
              ⚠️ Tip: Don't rush Panda House upgrades — the drain can hurt your growth!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Economic Events",
      icon: <Cloud className="h-8 w-8 text-[#B8873A]" />,
      content: (
        <div className="space-y-4">
          <p className={cn("text-center", empireClasses.textSecondary)}>
            Life isn't always smooth — economic events will test your empire!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
            {[
              { name: "Income Cut", desc: "Reduces farm output temporarily", type: "warning" },
              { name: "Unexpected Expense", desc: "Lose bamboo immediately", type: "danger" },
              { name: "Burnout", desc: "Energy drops + production penalty", type: "danger" },
              { name: "Opportunity", desc: "Invest for future returns", type: "positive" },
            ].map((event, i) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-3 rounded-lg border",
                  event.type === 'danger' ? "bg-[#B84C4C]/10 border-[#B84C4C]/20" :
                  event.type === 'warning' ? "bg-[#B8873A]/10 border-[#B8873A]/20" :
                  "bg-[#5A9B5E]/10 border-[#5A9B5E]/20"
                )}
              >
                <h4 className={cn(
                  "font-semibold text-sm",
                  event.type === 'danger' ? "text-[#B84C4C]" :
                  event.type === 'warning' ? "text-[#B8873A]" :
                  "text-[#5A9B5E]"
                )}>
                  {event.name}
                </h4>
                <p className={cn("text-xs", empireClasses.textSecondary)}>
                  {event.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <p className={cn("text-center text-sm", empireClasses.textMuted)}>
            Build defenses to reduce event damage. Events happen more frequently as you grow!
          </p>
        </div>
      ),
    },
    {
      title: "Debit vs Credit",
      icon: <CreditCard className="h-8 w-8 text-[#6B4E3D]" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "p-4 rounded-lg border",
                "bg-[#7A9B7E]/10 border-[#7A9B7E]/20"
              )}
            >
              <h4 className="font-semibold text-[#4F6F57] mb-2">💳 Debit</h4>
              <ul className="text-sm text-[#5C6B60] space-y-1">
                <li>• Spend bamboo you have</li>
                <li>• No debt, no risk</li>
                <li>• Safe but slower growth</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "p-4 rounded-lg border",
                "bg-[#6B4E3D]/10 border-[#6B4E3D]/20"
              )}
            >
              <h4 className="font-semibold text-[#6B4E3D] mb-2">💳 Credit</h4>
              <ul className="text-sm text-[#5C6B60] space-y-1">
                <li>• Buy now, pay later</li>
                <li>• Interest accrues daily</li>
                <li>• Affects your credit score!</li>
              </ul>
            </motion.div>
          </div>
          <div className={cn(
            "p-3 rounded-lg text-center",
            "bg-[#B84C4C]/10 border border-[#B84C4C]/20"
          )}>
            <p className="text-sm text-[#8B3030]">
              ⚠️ Missing payments hurts your credit score and adds late fees!
            </p>
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

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('empireTutorialComplete', 'true');
    setCurrentSlide(0);
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('empireTutorialComplete', 'true');
    setCurrentSlide(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-2xl max-h-[90vh] overflow-y-auto",
        empireClasses.bgPrimary
      )}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleSkip}
          title="Close tutorial"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="space-y-6 pt-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className={empireClasses.textSecondary}>
                Step {currentSlide + 1} of {slides.length}
              </span>
              <button 
                onClick={handleSkip} 
                className="text-[#7A9B7E] hover:underline font-medium"
              >
                Skip Tutorial
              </button>
            </div>
            <Progress value={progress} className="h-2 bg-[#E4EBE4]" />
          </div>

          {/* Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 min-h-[350px]"
            >
              <div className="flex items-center justify-center gap-3">
                {slides[currentSlide].icon}
                <h2 className={cn("text-2xl font-bold text-center", empireClasses.textPrimary)}>
                  {slides[currentSlide].title}
                </h2>
              </div>
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={cn(
                "border-[#D6E2D6]",
                empireClasses.textSecondary
              )}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#7A9B7E] hover:bg-[#4F6F57] text-white gap-2"
            >
              {currentSlide < slides.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "Start Playing!"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmpireTutorial;

