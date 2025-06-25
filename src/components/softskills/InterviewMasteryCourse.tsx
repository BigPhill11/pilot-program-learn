
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import InterviewMasteryModule from './InterviewMasteryModule';
import CourseHeader from './interview-course/CourseHeader';
import ModuleGrid from './interview-course/ModuleGrid';
import CourseCompletion from './interview-course/CourseCompletion';
import { interviewMasteryModules } from '@/data/interview-mastery-modules';

interface InterviewMasteryCourseProps {
  onBack: () => void;
}

const InterviewMasteryCourse: React.FC<InterviewMasteryCourseProps> = ({ onBack }) => {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, boolean>>({});
  const [currentModule, setCurrentModule] = useState<number | null>(null);

  const handleModuleComplete = (moduleId: number) => {
    setCompletedModules(prev => [...prev, moduleId]);
    setCurrentModule(null);
  };

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    setQuizScores(prev => ({
      ...prev,
      [topicId]: isCorrect
    }));
  };

  const isModuleUnlocked = (moduleId: number) => {
    return moduleId === 1 || completedModules.includes(moduleId - 1);
  };

  const isModuleCompleted = (moduleId: number) => {
    return completedModules.includes(moduleId);
  };

  const isCourseCompleted = completedModules.length === interviewMasteryModules.length;

  if (currentModule !== null) {
    const module = interviewMasteryModules.find(m => m.id === currentModule);
    if (!module) return null;

    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setCurrentModule(null)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course Overview
        </Button>
        
        <InterviewMasteryModule
          module={module}
          isUnlocked={isModuleUnlocked(module.id)}
          isCompleted={isModuleCompleted(module.id)}
          onComplete={handleModuleComplete}
          onQuizComplete={handleQuizComplete}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>

      <CourseHeader 
        completedModules={completedModules}
        totalModules={interviewMasteryModules.length}
      />

      <ModuleGrid
        modules={interviewMasteryModules}
        completedModules={completedModules}
        onModuleClick={setCurrentModule}
        isModuleUnlocked={isModuleUnlocked}
        isModuleCompleted={isModuleCompleted}
      />

      <CourseCompletion isCompleted={isCourseCompleted} />
    </div>
  );
};

export default InterviewMasteryCourse;
