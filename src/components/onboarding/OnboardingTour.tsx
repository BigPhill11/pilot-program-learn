
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: string;
  pandaMessage: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Phil Finance! 🐼',
    description: 'Your journey to financial literacy starts here',
    content: 'Hi there! I\'m Phil, your friendly panda guide. I\'ll help you learn about investing, trading, and building wealth. No matter what level you tested into, I\'ll show you all the amazing features we have!',
    pandaMessage: 'I\'m so excited to be your financial learning buddy! 🎉'
  },
  {
    id: 'dashboard',
    title: 'Your Personal Dashboard 📊',
    description: 'Track your progress and see market data',
    content: 'This is your home base! Here you\'ll see real-time market data, your learning progress, trading performance, and daily streaks. The more you engage, the more you\'ll advance through the app versions!',
    pandaMessage: 'Think of this as your financial command center! 🎮'
  },
  {
    id: 'learning',
    title: 'Learn Finance Concepts 📚',
    description: 'Interactive lessons with quizzes',
    content: 'Our Learn section has tons of financial concepts explained in simple terms with fun analogies. Take quizzes to test your knowledge and unlock achievements. I\'ll be there to explain complex terms!',
    pandaMessage: 'Learning is like leveling up in a game - but for your brain! 🧠✨'
  },
  {
    id: 'paper_trading',
    title: 'Paper Trading Practice 💼',
    description: 'Practice investing with virtual money',
    content: 'Try your hand at investing without any real money risk! Build portfolios, track performance, and learn from your decisions. Advanced users get access to options and margin trading simulation.',
    pandaMessage: 'It\'s like a video game, but you\'re learning real investing skills! 🎯'
  },
  {
    id: 'ask_phil',
    title: 'Ask Phil Anything 💬',
    description: 'Get personalized financial advice',
    content: 'Stuck on something? Just ask me! I can help explain concepts, analyze your trades, or give advice on your financial goals. I\'m here 24/7 to help you succeed.',
    pandaMessage: 'No question is too small - I love helping you learn! 🤗'
  },
  {
    id: 'headlines',
    title: 'Market News & Analysis 📰',
    description: 'Stay updated with financial terms explained',
    content: 'Read the latest market news with financial terms highlighted and explained. The number of highlighted terms adapts to your level - beginners see more explanations, pros see fewer.',
    pandaMessage: 'Understanding news is key to making smart financial decisions! 📈'
  },
  {
    id: 'progress',
    title: 'Your Progress Journey 🏆',
    description: 'Level up through app versions',
    content: 'You\'ll progress from Beginner Phil to Intermediate Phil to Advanced Phil based on your quiz scores, trading performance, and daily engagement. Each level unlocks new features and capabilities!',
    pandaMessage: 'I believe in you - let\'s reach Pro level together! 🌟'
  }
];

interface OnboardingTourProps {
  userLevel: string;
  onComplete: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ userLevel, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Welcome to Phil Finance! Your journey begins now! 🎉');
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-xl">{step.title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {onboardingSteps.length}
            </span>
          </div>
          <Progress value={progress} className="w-full h-2" />
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-4 border">
            <p className="text-sm leading-relaxed">{step.content}</p>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🐼</div>
              <div>
                <p className="font-medium text-primary">Phil says:</p>
                <p className="text-sm text-primary/80 mt-1">{step.pandaMessage}</p>
              </div>
            </div>
          </div>

          {userLevel && (
            <div className="bg-secondary/10 rounded-lg p-3 border border-secondary/20">
              <p className="text-sm">
                <span className="font-medium">Your Level:</span> {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)} Phil
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                'Completing...'
              ) : isLastStep ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Start Learning!
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTour;
