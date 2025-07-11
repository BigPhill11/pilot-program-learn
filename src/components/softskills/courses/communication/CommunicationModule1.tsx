import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, MessageSquare, CheckCircle2, Volume2, Users, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useSoftSkillsProgress } from '@/hooks/useSoftSkillsProgress';
import { PandaCelebration } from '@/components/ui/panda-celebration';

interface CommunicationModule1Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule1: React.FC<CommunicationModule1Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  
  const {
    saveResponse,
    saveGameScore,
    updateCompletionPercentage,
    completeModule
  } = useSoftSkillsProgress('business_communication', 'module_1', 'Communication Foundations');

  // Communication Styles Match Game
  const [stylesGame, setStylesGame] = useState({
    completed: false,
    score: 0,
    matches: {} as Record<string, string>
  });

  const communicationStylesData = useMemo(() => [
    { style: 'Assertive', description: 'Direct, honest, and respectful communication' },
    { style: 'Passive', description: 'Avoiding conflict, difficulty expressing needs' },
    { style: 'Aggressive', description: 'Forceful, often disrespectful to others' },
    { style: 'Passive-Aggressive', description: 'Indirect expression of negative feelings' }
  ], []);

  const shuffledOptions = useMemo(() => {
    const descriptions = [...communicationStylesData.map(item => item.description)];
    return descriptions.sort(() => Math.random() - 0.5);
  }, [communicationStylesData]);

  const steps = [
    {
      type: 'content',
      title: 'Welcome to Communication Foundations',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-purple-600" />
            <h2 className="text-2xl font-bold mb-4">Communication Foundations</h2>
            <p className="text-lg text-muted-foreground">
              Master the building blocks of effective professional communication
            </p>
          </div>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-purple-800 mb-3">🎯 In this module, you'll learn:</h3>
              <ul className="space-y-2 text-purple-700">
                <li>• The four fundamental communication styles</li>
                <li>• Active listening techniques for better understanding</li>
                <li>• How to craft clear, concise messages</li>
                <li>• Building blocks of professional communication</li>
                <li>• Adapting your style to different audiences</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      type: 'content',
      title: 'The Communication Process',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-4">Understanding Communication Flow</h3>
            <p className="text-muted-foreground">
              Effective communication is a two-way process involving sender, message, channel, and receiver.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-purple-600" />
                  <span>Sender's Role</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Encode the message clearly</li>
                  <li>• Choose appropriate channel</li>
                  <li>• Consider audience needs</li>
                  <li>• Ensure message alignment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Receiver's Role</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Active listening and attention</li>
                  <li>• Decode message accurately</li>
                  <li>• Provide meaningful feedback</li>
                  <li>• Ask clarifying questions</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-3">💡 Pro Tip:</h4>
              <p className="text-sm">
                The most effective communicators are those who can adapt their style and approach 
                based on their audience, context, and desired outcome.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      type: 'interactive',
      title: 'Active Listening Techniques',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-4">Mastering Active Listening</h3>
            <p className="text-muted-foreground">
              Active listening is the foundation of effective communication.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                technique: 'Paraphrasing',
                description: 'Restating what you heard in your own words',
                example: '"So what I\'m hearing is that you\'re concerned about the project timeline..."'
              },
              {
                technique: 'Reflecting Emotions',
                description: 'Acknowledging the speaker\'s feelings',
                example: '"I can see that this situation is really frustrating for you."'
              },
              {
                technique: 'Asking Open Questions',
                description: 'Questions that encourage elaboration',
                example: '"Can you tell me more about what led to this decision?"'
              },
              {
                technique: 'Summarizing',
                description: 'Capturing key points and next steps',
                example: '"Let me summarize the main points we\'ve discussed..."'
              }
            ].map((item, index) => (
              <Card key={index} className="border-purple-200">
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{item.technique}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <p className="text-xs bg-gray-50 p-2 rounded italic">{item.example}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      type: 'game',
      title: 'Communication Styles Match',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-4">Match Communication Styles</h3>
            <p className="text-muted-foreground">
              Match each communication style with its correct description.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Communication Styles</h4>
              <div className="space-y-2">
                {communicationStylesData.map((item) => (
                  <Button
                    key={item.style}
                    variant="outline"
                    className={`w-full justify-start ${
                      stylesGame.matches[item.style] ? 'bg-green-50 border-green-300' : ''
                    }`}
                    onClick={() => {
                      if (!stylesGame.completed) {
                        // Reset any previous incorrect matches for this style
                        const newMatches = { ...stylesGame.matches };
                        delete newMatches[item.style];
                        setStylesGame(prev => ({ ...prev, matches: newMatches }));
                      }
                    }}
                    disabled={stylesGame.completed}
                  >
                    {item.style}
                    {stylesGame.matches[item.style] && <CheckCircle2 className="h-4 w-4 ml-auto text-green-600" />}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Descriptions</h4>
              <div className="space-y-2">
                {shuffledOptions.map((description, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-3 ${
                      Object.values(stylesGame.matches).includes(description) 
                        ? 'bg-green-50 border-green-300' 
                        : ''
                    }`}
                    onClick={() => {
                      if (!stylesGame.completed) {
                        const style = communicationStylesData.find(item => item.description === description)?.style;
                        if (style) {
                          const newMatches = { ...stylesGame.matches, [style]: description };
                          setStylesGame(prev => ({ ...prev, matches: newMatches }));
                          
                          if (Object.keys(newMatches).length === communicationStylesData.length) {
                            const score = 100;
                            setStylesGame(prev => ({ ...prev, completed: true, score }));
                            saveGameScore('communication_styles_match', score, 100);
                          }
                        }
                      }
                    }}
                    disabled={stylesGame.completed || Object.values(stylesGame.matches).includes(description)}
                  >
                    {description}
                    {Object.values(stylesGame.matches).includes(description) && (
                      <CheckCircle2 className="h-4 w-4 ml-auto text-green-600" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {stylesGame.completed && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold text-green-800">Excellent work!</h4>
                  <p className="text-sm text-green-700">
                    You've successfully matched all communication styles. Score: {stylesGame.score}/100
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-4">Test Your Knowledge</h3>
            <p className="text-muted-foreground">
              Let's check your understanding of communication foundations.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-purple-200">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4">
                  1. Which communication style is characterized by being direct, honest, and respectful?
                </h4>
                <div className="space-y-2">
                  {[
                    'Passive',
                    'Assertive',
                    'Aggressive',
                    'Passive-Aggressive'
                  ].map((option, index) => (
                    <Button
                      key={index}
                      variant={quizAnswers[0] === index ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => {
                        setQuizAnswers(prev => ({ ...prev, 0: index }));
                        saveResponse('0', 'Which communication style is characterized by being direct, honest, and respectful?', index, option, index === 1);
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4">
                  2. What is the most important element of active listening?
                </h4>
                <div className="space-y-2">
                  {[
                    'Preparing your response while the other person speaks',
                    'Fully focusing on understanding the speaker\'s message',
                    'Agreeing with everything the speaker says',
                    'Taking detailed notes during the conversation'
                  ].map((option, index) => (
                    <Button
                      key={index}
                      variant={quizAnswers[1] === index ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => {
                        setQuizAnswers(prev => ({ ...prev, 1: index }));
                        saveResponse('1', 'What is the most important element of active listening?', index, option, index === 1);
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ];

  const isQuizComplete = Object.keys(quizAnswers).length >= 2;
  const isGameComplete = stylesGame.completed;
  
  // Check if user can proceed to next step or complete module
  const canProceed = currentStep < steps.length - 1 || 
    (currentStep === steps.length - 1 && isQuizComplete && isGameComplete);
  
  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      await updateCompletionPercentage(((currentStep + 2) / steps.length) * 100);
    } else if (canProceed) {
      await completeModule();
      // Show celebration animation for completed module
      setShowCelebration(true);
    }
  };

  const handleModuleComplete = async () => {
    setShowCelebration(false);
    // Mark as completed and trigger parent callback
    onComplete();
    // Also auto-advance to next module after short delay
    setTimeout(() => {
      onBack(); // Go back to course overview where next module will be unlocked
    }, 1000);
  };

  useEffect(() => {
    updateCompletionPercentage(((currentStep + 1) / steps.length) * 100);
  }, [currentStep, updateCompletionPercentage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Module 1 of 6
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Communication Foundations</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span>{steps[currentStep].title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {steps[currentStep].content}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className="hover:scale-105 transition-transform"
          >
            {currentStep === steps.length - 1 ? 'Complete Module' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Celebration Modal */}
        {showCelebration && (
          <PandaCelebration
            isVisible={showCelebration}
            onClose={handleModuleComplete}
            moduleTitle="Communication Foundations"
            score={stylesGame.score}
            achievements={['Communication Foundation Master', 'Active Listener']}
          />
        )}
      </div>
    </div>
  );
};

export default CommunicationModule1;