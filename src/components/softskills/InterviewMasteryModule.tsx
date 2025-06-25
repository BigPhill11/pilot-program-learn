import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Play, BookOpen, GamepadIcon, Award, Info, Target, Lightbulb, ArrowLeft } from 'lucide-react';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import PandaCelebration from '@/components/ui/PandaCelebration';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface ContentItem {
  title: string;
  explanation: string;
  importance: string;
  howTo: string;
}

interface Module {
  id: number;
  title: string;
  objective: string;
  content: ContentItem[];
  assignment: string;
  quiz: {
    topicId: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    feedbackForIncorrect?: string;
  };
  game?: {
    title: string;
    description: string;
    component: React.ComponentType<any>;
  };
}

interface InterviewMasteryModuleProps {
  module: Module;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: (moduleId: number) => void;
  onQuizComplete: (topicId: string, isCorrect: boolean) => void;
}

const InterviewMasteryModule: React.FC<InterviewMasteryModuleProps> = ({
  module,
  isUnlocked,
  isCompleted,
  onComplete,
  onQuizComplete
}) => {
  const [currentSection, setCurrentSection] = useState<'intro' | 'content' | 'game' | 'quiz' | 'assignment'>('intro');
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
    // Award 5 points for module completion and save to soft skills progress
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

  const renderIntro = () => (
    <div className="space-y-4">
      <div className="text-center">
        <Award className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
        <Badge variant="outline" className="mb-4">Module {module.id}</Badge>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Objective
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700">{module.objective}</p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={handleNextSection} size="lg">
          <Play className="h-4 w-4 mr-2" />
          Start Module
        </Button>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Module Content</h3>
        <Badge variant="secondary">{Math.round((contentProgress / module.content.length) * 100)}% Complete</Badge>
      </div>
      
      <Progress value={(contentProgress / module.content.length) * 100} className="mb-4" />
      
      <div className="space-y-6">
        {module.content.map((item, index) => (
          <Card 
            key={index} 
            className={`transition-all ${index <= contentProgress ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                {index < contentProgress ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                ) : index === contentProgress ? (
                  <div className="h-6 w-6 rounded-full border-2 border-primary mt-0.5 flex-shrink-0" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                )}
                <CardTitle className={`text-lg ${index <= contentProgress ? 'text-green-800' : 'text-gray-700'}`}>
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>
            
            {index <= contentProgress && (
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">What is this?</span>
                    </div>
                    <p className="text-blue-700 text-sm">{item.explanation}</p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 border-l-4 border-orange-400">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-800">Why is this important?</span>
                    </div>
                    <p className="text-orange-700 text-sm">{item.importance}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border-l-4 border-green-400">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">How to implement this?</span>
                    </div>
                    <p className="text-green-700 text-sm">{item.howTo}</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {currentSection !== 'intro' && (
          <Button variant="outline" onClick={handleBackSection}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        {contentProgress < module.content.length && (
          <Button onClick={() => setContentProgress(prev => prev + 1)}>
            Next Topic
          </Button>
        )}
        {contentProgress === module.content.length && (
          <Button onClick={handleNextSection}>
            Continue to {module.game ? 'Interactive Game' : 'Quiz'}
          </Button>
        )}
      </div>
    </div>
  );

  const renderGame = () => {
    if (!module.game) return null;
    
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <GamepadIcon className="h-5 w-5" />
              {module.game.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-700 mb-4">{module.game.description}</p>
            <module.game.component />
          </CardContent>
        </Card>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBackSection}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleNextSection}>
            Continue to Quiz
          </Button>
        </div>
      </div>
    );
  };

  const renderQuiz = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Knowledge Check</h3>
      <InteractiveQuiz
        topicId={module.quiz.topicId}
        question={module.quiz.question}
        options={module.quiz.options}
        correctAnswerIndex={module.quiz.correctAnswerIndex}
        feedbackForIncorrect={module.quiz.feedbackForIncorrect}
        onQuizComplete={handleQuizCompleteInternal}
        isCompleted={quizCompleted}
      />
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleBackSection}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        {quizCompleted && (
          <Button onClick={handleNextSection}>
            Continue to Assignment
          </Button>
        )}
      </div>
    </div>
  );

  const renderAssignment = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">Module Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-700">{module.assignment}</p>
        </CardContent>
      </Card>
      
      <div className="flex gap-2 justify-between">
        <Button variant="outline" onClick={handleBackSection}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {canCompleteModule() && (
          <Button onClick={handleModuleComplete} size="lg" className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Module (+5 Points!)
          </Button>
        )}
      </div>
    </div>
  );

  if (!isUnlocked) {
    return (
      <Card className="opacity-60">
        <CardContent className="p-6 text-center">
          <div className="text-gray-400 mb-2">🔒</div>
          <h3 className="font-semibold text-gray-600 mb-2">{module.title}</h3>
          <p className="text-gray-500">Complete previous modules to unlock</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          {currentSection === 'intro' && renderIntro()}
          {currentSection === 'content' && renderContent()}
          {currentSection === 'game' && renderGame()}
          {currentSection === 'quiz' && renderQuiz()}
          {currentSection === 'assignment' && renderAssignment()}
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
