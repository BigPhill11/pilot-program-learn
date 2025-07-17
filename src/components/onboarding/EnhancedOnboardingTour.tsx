import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Target,
  Star,
  Gift,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PandaLogo from '@/components/icons/PandaLogo';
import SkillsAssessmentQuiz from '@/components/assessment/SkillsAssessmentQuiz';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
  action?: () => void;
  actionText?: string;
}

interface EnhancedOnboardingTourProps {
  onComplete: () => void;
}

const EnhancedOnboardingTour: React.FC<EnhancedOnboardingTourProps> = ({ onComplete }) => {
  const { user, profile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'welcome',
      title: 'Welcome to Phil\'s Finance World! 🐼',
      description: 'Hi there! I\'m Phil, your friendly panda guide. I\'ll help you navigate the exciting world of finance and investing. Let\'s start this journey together!',
      icon: Gift,
      completed: false,
      actionText: 'Meet Phil'
    },
    {
      id: 'assessment',
      title: 'Take Your Skills Assessment',
      description: 'Let me understand your current finance knowledge so I can create a personalized learning path just for you!',
      icon: Target,
      completed: false,
      action: () => setShowAssessment(true),
      actionText: 'Start Assessment'
    },
    {
      id: 'learn',
      title: 'Explore Learning Modules',
      description: 'Discover interactive lessons, games, and real-world scenarios designed to make learning finance fun and engaging.',
      icon: BookOpen,
      completed: false,
      actionText: 'Explore Learning'
    },
    {
      id: 'trading',
      title: 'Try Paper Trading',
      description: 'Practice investing with virtual money! Build your portfolio, track performance, and learn without risk.',
      icon: TrendingUp,
      completed: false,
      actionText: 'Start Trading'
    },
    {
      id: 'community',
      title: 'Join the Community',
      description: 'Connect with other learners, participate in discussions, and share your progress. Learning is better together!',
      icon: Users,
      completed: false,
      actionText: 'Join Community'
    }
  ]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleStepAction = async (step: OnboardingStep) => {
    if (step.action) {
      step.action();
    } else {
      // Mark step as completed
      const updatedSteps = steps.map(s => 
        s.id === step.id ? { ...s, completed: true } : s
      );
      setSteps(updatedSteps);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await completeOnboarding();
      }
    }
  };

  const completeOnboarding = async () => {
    try {
      if (user) {
        await supabase
          .from('profiles')
          .update({ onboarding_completed: true })
          .eq('id', user.id);
        
        toast.success('Welcome aboard! Your learning journey begins now! 🎉');
        onComplete();
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding');
    }
  };

  const handleAssessmentComplete = (level: string) => {
    setShowAssessment(false);
    
    // Mark assessment step as completed
    const updatedSteps = steps.map(s => 
      s.id === 'assessment' ? { ...s, completed: true } : s
    );
    setSteps(updatedSteps);
    
    // Move to next step
    setCurrentStep(currentStep + 1);
    
    toast.success(`Great job! You've been assigned to ${level} level.`);
  };

  if (showAssessment) {
    return <SkillsAssessmentQuiz onComplete={handleAssessmentComplete} />;
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <PandaLogo className="h-20 w-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            Welcome to Phil's Finance Academy!
          </h1>
          <p className="text-emerald-600">Let's get you set up for financial success</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Setup Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${index <= currentStep 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                  ${step.completed ? 'bg-green-500' : ''}
                `}>
                  {step.completed ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-8 h-1 mx-2
                    ${index < currentStep ? 'bg-emerald-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
              <currentStepData.icon className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl mb-2">{currentStepData.title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {currentStepData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step-specific content */}
            {currentStepData.id === 'welcome' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Learn</h4>
                    <p className="text-sm text-blue-600">Interactive lessons & games</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-semibold text-green-800">Practice</h4>
                    <p className="text-sm text-green-600">Paper trading simulation</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Star className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">Achieve</h4>
                    <p className="text-sm text-purple-600">Track your progress</p>
                  </div>
                </div>
              </div>
            )}

            {currentStepData.id === 'learn' && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="h-5 w-5 text-emerald-600" />
                    <h4 className="font-semibold text-emerald-800">Learning Features</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-emerald-700">
                    <li>• Adaptive content based on your skill level</li>
                    <li>• Interactive flashcards and quizzes</li>
                    <li>• Fun mini-games like Panda Jump</li>
                    <li>• Real company analysis exercises</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="text-center">
              <Button 
                onClick={() => handleStepAction(currentStepData)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
              >
                {currentStepData.actionText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Skip Option */}
            {currentStep < steps.length - 1 && (
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="text-muted-foreground"
                >
                  Skip this step
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phil's Tips */}
        <Card className="max-w-2xl mx-auto mt-6 border-emerald-200 bg-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <PandaLogo className="h-8 w-8 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-emerald-800 mb-1">Phil's Tip</h4>
                <p className="text-sm text-emerald-700">
                  {currentStepData.id === 'welcome' && "Take your time exploring! There's no rush - learning finance should be fun and engaging."}
                  {currentStepData.id === 'assessment' && "Be honest with your answers! This helps me create the perfect learning experience for you."}
                  {currentStepData.id === 'learn' && "Start with topics that interest you most. I'll adapt the content to match your pace."}
                  {currentStepData.id === 'trading' && "Don't worry about making mistakes in paper trading - that's how we learn! Every successful investor started here."}
                  {currentStepData.id === 'community' && "Connect with others on the same journey. Sharing knowledge makes everyone stronger!"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedOnboardingTour;