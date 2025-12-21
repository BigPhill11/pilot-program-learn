import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllModules } from '@/data/personal-finance/modules';
import BambooNode from './BambooNode';
import TestOutModal from './TestOutModal';
import { ModuleStatus } from '@/types/personal-finance';
import { cn } from '@/lib/utils';

interface BambooSkillTreeProps {
  moduleProgress: Record<string, { status: ModuleStatus; completedLessons: string[]; testedOut: boolean }>;
  onModuleClick: (moduleId: string) => void;
  onTestOut: (moduleId: string, passed: boolean) => void;
}

const BambooSkillTree: React.FC<BambooSkillTreeProps> = ({
  moduleProgress,
  onModuleClick,
  onTestOut,
}) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showTestOut, setShowTestOut] = useState(false);
  const modules = getAllModules();

  const getModuleStatus = (moduleId: string, index: number): ModuleStatus => {
    const progress = moduleProgress[moduleId];
    if (progress?.status) return progress.status;
    
    // First module is always unlocked
    if (index === 0) return 'unlocked';
    
    // Check if previous module is completed
    const prevModuleId = modules[index - 1]?.id;
    const prevProgress = moduleProgress[prevModuleId];
    if (prevProgress?.status === 'completed') return 'unlocked';
    
    return 'locked';
  };

  const handleNodeClick = (moduleId: string, status: ModuleStatus) => {
    if (status === 'locked') {
      setSelectedModule(moduleId);
      setShowTestOut(true);
    } else {
      onModuleClick(moduleId);
    }
  };

  const handleTestOutComplete = (passed: boolean) => {
    if (selectedModule) {
      onTestOut(selectedModule, passed);
    }
    setShowTestOut(false);
    setSelectedModule(null);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto py-8">
      {/* Background bamboo stalk */}
      <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-800/80 via-amber-700/90 to-amber-800/80 rounded-full" />
        {/* Bamboo segments/joints */}
        {modules.map((_, idx) => (
          <div
            key={`joint-${idx}`}
            className="absolute left-1/2 -translate-x-1/2 w-6 h-2 bg-amber-900/60 rounded-full"
            style={{ top: `${(idx + 1) * (100 / (modules.length + 1))}%` }}
          />
        ))}
      </div>

      {/* Module nodes */}
      <div className="relative flex flex-col gap-8 items-center">
        {modules.map((module, index) => {
          const status = getModuleStatus(module.id, index);
          const progress = moduleProgress[module.id];
          const completedLessons = progress?.completedLessons?.length || 0;
          const totalLessons = 5; // 5 lessons per module

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn(
                "relative w-full flex",
                index % 2 === 0 ? "justify-start pl-8" : "justify-end pr-8"
              )}
            >
              {/* Connecting branch to stalk */}
              <div
                className={cn(
                  "absolute top-1/2 h-1 -translate-y-1/2",
                  index % 2 === 0 ? "left-8 right-1/2" : "right-8 left-1/2",
                  status === 'locked' ? "bg-muted/40" : "bg-emerald-600/60"
                )}
                style={{
                  background: status === 'locked' 
                    ? 'linear-gradient(90deg, hsl(var(--muted)) 0%, transparent 100%)'
                    : index % 2 === 0
                    ? 'linear-gradient(90deg, hsl(142 76% 36%) 0%, hsl(45 93% 47% / 0.6) 100%)'
                    : 'linear-gradient(270deg, hsl(142 76% 36%) 0%, hsl(45 93% 47% / 0.6) 100%)',
                }}
              />

              {/* Bamboo leaves decoration for unlocked modules */}
              {status !== 'locked' && (
                <motion.div
                  initial={{ scale: 0, rotate: index % 2 === 0 ? -45 : 45 }}
                  animate={{ scale: 1, rotate: index % 2 === 0 ? -15 : 15 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-8 h-12",
                    index % 2 === 0 ? "left-[45%]" : "right-[45%]"
                  )}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full transform rotate-45 scale-x-50" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full transform -rotate-12 scale-x-50 translate-x-1" />
                  </div>
                </motion.div>
              )}

              <BambooNode
                module={module}
                status={status}
                completedLessons={completedLessons}
                totalLessons={totalLessons}
                onClick={() => handleNodeClick(module.id, status)}
                alternatePosition={index % 2 !== 0}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Ground decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-amber-900/30 to-transparent rounded-full blur-xl" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-4 bg-gradient-to-t from-emerald-900/40 to-transparent rounded-full blur-lg" />
      </div>

      {/* Test Out Modal */}
      <AnimatePresence>
        {showTestOut && selectedModule && (
          <TestOutModal
            moduleId={selectedModule}
            onClose={() => {
              setShowTestOut(false);
              setSelectedModule(null);
            }}
            onComplete={handleTestOutComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BambooSkillTree;
