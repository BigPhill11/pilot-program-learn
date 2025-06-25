
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PandaCelebration from '@/components/ui/PandaCelebration';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { InterviewMasteryModuleProps, SectionType } from '@/types/interview-module';
import ModuleIntro from './interview-module/ModuleIntro';
import ModuleContent from './interview-module/ModuleContent';
import ModuleGame from './interview-module/ModuleGame';
import ModuleQuiz from './interview-module/ModuleQuiz';
import ModuleAssignment from './interview-module/ModuleAssignment';
import LockedModule from './interview-module/LockedModule';

const InterviewMasteryModule: React.FC<InterviewMasteryModuleProps> = ({
  module,
  isUnlocked,
  isCompleted,
  onComplete,
  onQuizComplete
}) => {
  const [currentSection, setCurrentSection] = useState<SectionType>('intro');
  const [contentProgress, setContentProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { updateSoftSkillsProgress } = useProgressTracking();

  const handleNextSection = () => {
    if (currentSection === 'intro') {
      setCurrentSection('content');
    } else if (currentSection === 'content') {
      setCurrentSection(module.game ? 'game' : 'quiz');
    } else if (currentSection === 'game') {
      setCurrentSection('quiz');
    } else if (currentSection === 'quiz') {
      setCurrentSection('assignment');
    }
  };

  const handleBackSection = () => {
    if (currentSection === 'assignment') {
      setCurrentSection('quiz');
    } else if (currentSection === 'quiz') {
      setCurrentSection(module.game ? 'game' : 'content');
    } else if (currentSection === 'game') {
      setCurrentSection('content');
    } else if (currentSection === 'content') {
      setCurrentSection('intro');
    }
  };

  const handleQuizCompleteInternal = (topicId: string, isCorrect: boolean) => {
    setQuizCompleted(true);
    onQuizComplete(topicId, isCorrect);
  };

  const handleModuleComplete = () => {
    updateSoftSkillsProgress('interview-mastery', module.id.toString(), 5);
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      onComplete(module.id);
    }, 3000);
  };

  const canCompleteModule = () => {
    return contentProgress === module.content.length && quizCompleted;
  };

  if (!isUnlocked) {
    return <LockedModule module={module} />;
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          {currentSection === 'intro' && (
            <ModuleIntro module={module} onNext={handleNextSection} />
          )}
          {currentSection === 'content' && (
            <ModuleContent
              module={module}
              contentProgress={contentProgress}
              onProgressUpdate={setContentProgress}
              onNext={handleNextSection}
              onBack={handleBackSection}
            />
          )}
          {currentSection === 'game' && (
            <ModuleGame
              module={module}
              onNext={handleNextSection}
              onBack={handleBackSection}
            />
          )}
          {currentSection === 'quiz' && (
            <ModuleQuiz
              module={module}
              quizCompleted={quizCompleted}
              onQuizComplete={handleQuizCompleteInternal}
              onNext={handleNextSection}
              onBack={handleBackSection}
            />
          )}
          {currentSection === 'assignment' && (
            <ModuleAssignment
              module={module}
              canComplete={canCompleteModule()}
              onComplete={handleModuleComplete}
              onBack={handleBackSection}
            />
          )}
        </CardContent>
      </Card>
      
      {showCelebration && (
        <PandaCelebration 
          onClose={() => setShowCelebration(false)}
          title="Module Completed!"
          message="🎉 Outstanding work! You're becoming an interview master!"
          points={5}
        />
      )}
    </>
  );
};

export default InterviewMasteryModule;
