
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Play, BookOpen, GamepadIcon, Award } from 'lucide-react';
import InteractiveQuiz from '@/components/InteractiveQuiz';

interface Module {
  id: number;
  title: string;
  objective: string;
  content: string[];
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
      
      <div className="space-y-4">
        {module.content.map((item, index) => (
          <Card 
            key={index} 
            className={`transition-all ${index <= contentProgress ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {index < contentProgress ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : index === contentProgress ? (
                  <div className="h-5 w-5 rounded-full border-2 border-primary mt-0.5 flex-shrink-0" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                )}
                <p className={index <= contentProgress ? 'text-green-800' : 'text-gray-600'}>{item}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
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
        
        <Button onClick={handleNextSection}>
          Continue to Quiz
        </Button>
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
        onQuizComplete={onQuizComplete}
        isCompleted={isCompleted}
      />
      
      {isCompleted && (
        <Button onClick={handleNextSection}>
          Continue to Assignment
        </Button>
      )}
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
      
      <div className="text-center">
        <Button onClick={() => onComplete(module.id)} size="lg" className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Complete Module
        </Button>
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
    <Card>
      <CardContent className="p-6">
        {currentSection === 'intro' && renderIntro()}
        {currentSection === 'content' && renderContent()}
        {currentSection === 'game' && renderGame()}
        {currentSection === 'quiz' && renderQuiz()}
        {currentSection === 'assignment' && renderAssignment()}
      </CardContent>
    </Card>
  );
};

export default InterviewMasteryModule;
