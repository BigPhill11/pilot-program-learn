import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BambooSkillTree from '@/components/personal-finance/BambooSkillTree';
import LessonContainer from '@/components/personal-finance/LessonContainer';
import { usePersonalFinanceProgress } from '@/hooks/usePersonalFinanceProgress';
import { getModuleById } from '@/data/personal-finance/modules';
import { Loader2 } from 'lucide-react';

const PersonalFinanceTab: React.FC = () => {
  const { moduleProgress, loading, completeLesson, handleTestOut } = usePersonalFinanceProgress();
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setActiveLessonIndex(0);
  };

  const handleLessonComplete = (xpEarned: number, coinsEarned: number) => {
    if (activeModuleId) {
      const module = getModuleById(activeModuleId);
      const lesson = module?.lessons[activeLessonIndex];
      if (lesson) {
        completeLesson(activeModuleId, lesson.id, xpEarned, coinsEarned);
      }
    }
    setActiveModuleId(null);
  };

  const handleBack = () => {
    setActiveModuleId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeModule = activeModuleId ? getModuleById(activeModuleId) : null;
  const activeLesson = activeModule?.lessons[activeLessonIndex];

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {activeLesson ? (
          <LessonContainer
            key="lesson"
            lesson={activeLesson}
            onComplete={handleLessonComplete}
            onBack={handleBack}
          />
        ) : (
          <div key="tree">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Personal Finance Journey</h1>
              <p className="text-muted-foreground">Master your money, one module at a time</p>
            </div>
            <BambooSkillTree
              moduleProgress={moduleProgress}
              onModuleClick={handleModuleClick}
              onTestOut={handleTestOut}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalFinanceTab;
