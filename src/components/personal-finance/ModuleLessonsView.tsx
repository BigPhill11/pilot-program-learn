import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalFinanceModule, ModuleProgress } from '@/types/personal-finance';
import { cn } from '@/lib/utils';

interface ModuleLessonsViewProps {
  module: PersonalFinanceModule;
  progress?: ModuleProgress;
  onLessonClick: (lessonIndex: number) => void;
  onBack: () => void;
}

const ModuleLessonsView: React.FC<ModuleLessonsViewProps> = ({
  module,
  progress,
  onLessonClick,
  onBack,
}) => {
  const completedLessons = progress?.completedLessons || [];

  const getLessonStatus = (lessonId: string, index: number) => {
    if (completedLessons.includes(lessonId)) return 'completed';
    // First uncompleted lesson is unlocked, or if previous is completed
    const previousLessonId = index > 0 ? module.lessons[index - 1]?.id : null;
    if (index === 0 || (previousLessonId && completedLessons.includes(previousLessonId))) {
      return 'unlocked';
    }
    return 'locked';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Modules
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{module.icon}</div>
          <div>
            <h1 className="text-2xl font-bold">{module.name}</h1>
            <p className="text-muted-foreground text-sm">{module.pillar} • {module.level}</p>
          </div>
        </div>

        <p className="text-muted-foreground">{module.description}</p>

        {/* Progress indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="text-primary font-medium">
            {completedLessons.length}/{module.lessons.length} lessons completed
          </span>
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {module.lessons.map((lesson, index) => {
          const status = getLessonStatus(lesson.id, index);
          const isLocked = status === 'locked';
          const isCompleted = status === 'completed';

          return (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !isLocked && onLessonClick(index)}
              disabled={isLocked}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all",
                isLocked && "opacity-50 cursor-not-allowed bg-muted/30 border-border",
                isCompleted && "bg-primary/5 border-primary/20 hover:bg-primary/10",
                !isLocked && !isCompleted && "bg-card border-border hover:border-primary/50 hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-4">
                {/* Status icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  isLocked && "bg-muted text-muted-foreground",
                  isCompleted && "bg-primary text-primary-foreground",
                  !isLocked && !isCompleted && "bg-primary/10 text-primary"
                )}>
                  {isLocked && <Lock className="w-4 h-4" />}
                  {isCompleted && <CheckCircle2 className="w-5 h-5" />}
                  {!isLocked && !isCompleted && <PlayCircle className="w-5 h-5" />}
                </div>

                {/* Lesson info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      Lesson {index + 1}
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-medium truncate",
                    isLocked && "text-muted-foreground"
                  )}>
                    {lesson.title}
                  </h3>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0">
                  <Clock className="w-4 h-4" />
                  {lesson.estimatedMinutes} min
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Module rewards preview */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20">
        <h3 className="font-medium mb-2">Complete all lessons to earn:</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="font-bold text-primary">{module.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            <span className="font-bold text-amber-500">{module.coinReward} coins</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleLessonsView;
