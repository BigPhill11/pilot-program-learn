import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BambooSkillTree from '@/components/personal-finance/BambooSkillTree';
import LessonContainer from '@/components/personal-finance/LessonContainer';
import ModuleLessonsView from '@/components/personal-finance/ModuleLessonsView';
import PandasFirstPaycheck from '@/components/personal-finance/boss-game/PandasFirstPaycheck';
import PandasGoalCompass from '@/components/personal-finance/boss-game/PandasGoalCompass';
import { usePersonalFinanceProgress } from '@/hooks/usePersonalFinanceProgress';
import { getModuleById } from '@/data/personal-finance/modules';
import { Loader2 } from 'lucide-react';

type ViewState = 'tree' | 'module' | 'lesson' | 'boss-game';

const PersonalFinanceTab: React.FC = () => {
  const { moduleProgress, loading, completeLesson, handleTestOut, completeBossGame } = usePersonalFinanceProgress();
  const [viewState, setViewState] = useState<ViewState>('tree');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setViewState('module');
  };

  const handleLessonClick = (lessonIndex: number) => {
    setActiveLessonIndex(lessonIndex);
    setViewState('lesson');
  };

  const handleBossGameClick = () => {
    setViewState('boss-game');
  };

  const handleBossGameComplete = (xpEarned: number, coinsEarned: number) => {
    if (activeModuleId) {
      completeBossGame(activeModuleId, xpEarned, coinsEarned);
    }
  };

  const handleLessonComplete = (xpEarned: number, coinsEarned: number) => {
    if (activeModuleId) {
      const module = getModuleById(activeModuleId);
      const lesson = module?.lessons[activeLessonIndex];
      if (lesson) {
        completeLesson(activeModuleId, lesson.id, xpEarned, coinsEarned);
      }
    }
    setViewState('module');
  };

  const handleBackToModules = () => {
    setViewState('module');
  };

  const handleBackToTree = () => {
    setActiveModuleId(null);
    setViewState('tree');
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
  const currentModuleProgress = activeModuleId 
    ? moduleProgress[activeModuleId]
    : undefined;

  // Render the appropriate boss game based on module
  const renderBossGame = () => {
    if (activeModuleId === 'income') {
      return (
        <PandasFirstPaycheck
          key="boss-game-income"
          onComplete={handleBossGameComplete}
          onBack={handleBackToModules}
        />
      );
    }
    if (activeModuleId === 'financial-planning') {
      return (
        <PandasGoalCompass
          key="boss-game-financial-planning"
          onComplete={handleBossGameComplete}
          onBack={handleBackToModules}
        />
      );
    }
    // Default fallback
    return (
      <PandasFirstPaycheck
        key="boss-game-default"
        onComplete={handleBossGameComplete}
        onBack={handleBackToModules}
      />
    );
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {viewState === 'boss-game' && activeModuleId ? (
          renderBossGame()
        ) : viewState === 'lesson' && activeLesson ? (
          <LessonContainer
            key="lesson"
            lesson={activeLesson}
            onComplete={handleLessonComplete}
            onBack={handleBackToModules}
          />
        ) : viewState === 'module' && activeModule ? (
          <ModuleLessonsView
            key="module"
            module={activeModule}
            progress={currentModuleProgress}
            onLessonClick={handleLessonClick}
            onBack={handleBackToTree}
            onBossGameClick={handleBossGameClick}
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
