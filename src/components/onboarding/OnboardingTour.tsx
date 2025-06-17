
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface OnboardingTourProps {
  onComplete: (profile: UserProfile) => void;
}

interface UserProfile {
  experienceLevel: string;
  interests: string[];
  goals: string[];
  timeCommitment: string;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserProfile>({
    experienceLevel: '',
    interests: [],
    goals: [],
    timeCommitment: ''
  });

  const questions = [
    {
      id: 'experience',
      title: 'What\'s your experience with personal finance?',
      type: 'single',
      options: [
        { value: 'beginner', label: 'Complete beginner - I\'m just starting out' },
        { value: 'some', label: 'Some knowledge - I know basics like budgeting' },
        { value: 'intermediate', label: 'Intermediate - I understand investing basics' },
        { value: 'advanced', label: 'Advanced - I\'m comfortable with complex topics' }
      ]
    },
    {
      id: 'interests',
      title: 'Which topics interest you most?',
      type: 'multiple',
      options: [
        { value: 'budgeting', label: 'Budgeting & saving money' },
        { value: 'investing', label: 'Stock market & investing' },
        { value: 'credit', label: 'Building credit & credit cards' },
        { value: 'taxes', label: 'Understanding taxes' },
        { value: 'bigpurchases', label: 'Big purchases (cars, homes)' },
        { value: 'planning', label: 'Long-term financial planning' }
      ]
    },
    {
      id: 'goals',
      title: 'What are your main financial goals?',
      type: 'multiple',
      options: [
        { value: 'emergency', label: 'Build an emergency fund' },
        { value: 'debt', label: 'Pay off debt' },
        { value: 'invest', label: 'Start investing' },
        { value: 'house', label: 'Save for a house' },
        { value: 'retirement', label: 'Plan for retirement' },
        { value: 'education', label: 'Save for education' }
      ]
    },
    {
      id: 'time',
      title: 'How much time can you dedicate to learning?',
      type: 'single',
      options: [
        { value: '5min', label: '5-10 minutes per day' },
        { value: '15min', label: '15-30 minutes per day' },
        { value: '1hour', label: '1 hour per week' },
        { value: 'weekend', label: 'A few hours on weekends' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    if (currentQuestion.type === 'single') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    } else {
      setAnswers(prev => {
        const currentValues = prev[questionId as keyof UserProfile] as string[];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return {
          ...prev,
          [questionId]: newValues
        };
      });
    }
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id as keyof UserProfile];
    if (currentQuestion.type === 'single') {
      return answer !== '';
    } else {
      return Array.isArray(answer) && answer.length > 0;
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="journey-header text-2xl">Welcome to Phil's Financials!</CardTitle>
            <Badge variant="outline">
              {currentStep + 1} of {questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="section-header text-xl font-semibold mb-4">
              {currentQuestion.title}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.type === 'single'
                  ? answers[currentQuestion.id as keyof UserProfile] === option.value
                  : (answers[currentQuestion.id as keyof UserProfile] as string[]).includes(option.value);
                
                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      isSelected ? 'bg-green-500 hover:bg-green-600' : 'hover:bg-green-50 dark:hover:bg-green-950'
                    }`}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  >
                    <div className="flex items-center">
                      {isSelected && <CheckCircle2 className="h-5 w-5 mr-3" />}
                      <span>{option.label}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-between pt-6">
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
              disabled={!canProceed()}
              className="bg-green-500 hover:bg-green-600"
            >
              {currentStep === questions.length - 1 ? 'Complete Setup' : 'Next'}
              {currentStep < questions.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTour;
