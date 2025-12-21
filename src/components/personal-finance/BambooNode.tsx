import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { ModuleStatus } from '@/types/personal-finance';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface BambooNodeProps {
  module: {
    id: string;
    name: string;
    icon: string;
    description: string;
    level: string;
  };
  status: ModuleStatus;
  completedLessons: number;
  totalLessons: number;
  onClick: () => void;
  alternatePosition: boolean;
}

const BambooNode: React.FC<BambooNodeProps> = ({
  module,
  status,
  completedLessons,
  totalLessons,
  onClick,
  alternatePosition,
}) => {
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const statusConfig = {
    locked: {
      bg: 'bg-muted/50',
      border: 'border-muted',
      text: 'text-muted-foreground',
      glow: '',
      icon: <Lock className="w-4 h-4" />,
    },
    unlocked: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/50',
      text: 'text-foreground',
      glow: 'shadow-lg shadow-emerald-500/20',
      icon: <ChevronRight className="w-4 h-4 text-emerald-500" />,
    },
    active: {
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-400',
      text: 'text-foreground',
      glow: 'shadow-xl shadow-emerald-500/30 ring-2 ring-emerald-400/50',
      icon: <ChevronRight className="w-4 h-4 text-emerald-400" />,
    },
    completed: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-400',
      text: 'text-foreground',
      glow: 'shadow-lg shadow-amber-500/30',
      icon: <Check className="w-4 h-4 text-amber-400" />,
    },
  };

  const config = statusConfig[status];

  return (
    <motion.button
      onClick={onClick}
      whileHover={status !== 'locked' ? { scale: 1.05 } : {}}
      whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
      className={cn(
        "relative w-64 p-4 rounded-xl border-2 transition-all duration-300",
        config.bg,
        config.border,
        config.glow,
        status === 'locked' ? 'cursor-pointer grayscale hover:grayscale-[50%]' : 'cursor-pointer',
        alternatePosition && 'text-right'
      )}
    >
      {/* Module content */}
      <div className={cn("flex items-start gap-3", alternatePosition && "flex-row-reverse")}>
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
            status === 'locked' ? 'bg-muted/30' : 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20',
            status === 'completed' && 'bg-gradient-to-br from-amber-500/20 to-amber-600/20'
          )}
        >
          {module.icon}
        </div>

        {/* Text content */}
        <div className={cn("flex-1 min-w-0", alternatePosition && "text-right")}>
          <div className={cn("flex items-center gap-2", alternatePosition && "flex-row-reverse")}>
            <h3 className={cn("font-semibold truncate", config.text)}>
              {module.name}
            </h3>
            {config.icon}
          </div>
          
          <p className={cn(
            "text-xs mt-1 line-clamp-2",
            status === 'locked' ? 'text-muted-foreground/60' : 'text-muted-foreground'
          )}>
            {status === 'locked' ? 'Test into this module to unlock' : module.description}
          </p>

          {/* Progress bar for non-locked modules */}
          {status !== 'locked' && (
            <div className="mt-2">
              <div className={cn("flex items-center justify-between text-xs mb-1", alternatePosition && "flex-row-reverse")}>
                <span className="text-muted-foreground">
                  {completedLessons}/{totalLessons} lessons
                </span>
                {status === 'completed' && (
                  <span className="text-amber-400 font-medium">Complete!</span>
                )}
              </div>
              <Progress 
                value={progressPercent} 
                className={cn(
                  "h-1.5",
                  status === 'completed' ? '[&>div]:bg-amber-400' : '[&>div]:bg-emerald-500'
                )}
              />
            </div>
          )}
        </div>
      </div>

      {/* Locked overlay hint */}
      {status === 'locked' && (
        <div className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-t from-background/80 to-transparent",
          "flex items-end justify-center pb-2 opacity-0 hover:opacity-100 transition-opacity"
        )}>
          <span className="text-xs font-medium text-primary">Click to test out →</span>
        </div>
      )}

      {/* Completed sparkle effect */}
      {status === 'completed' && (
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 bg-amber-400 rounded-full blur-sm opacity-60" />
          <div className="absolute inset-1 bg-amber-300 rounded-full" />
        </motion.div>
      )}

      {/* Level badge */}
      <div className={cn(
        "absolute -bottom-2 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider",
        status === 'locked' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary',
        alternatePosition ? 'right-4' : 'left-4'
      )}>
        {module.level}
      </div>
    </motion.button>
  );
};

export default BambooNode;
