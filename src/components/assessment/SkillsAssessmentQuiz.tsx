
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: Array<{
    text: string;
    points: number;
  }>;
}

const assessmentQuestions: Question[] = [
  {
    id: 'investing_comfort',
    question: "You have $100 and want it to grow. What sounds most like you?",
    options: [
      { text: "Put it in a savings account - slow and steady wins the race! 🐢", points: 1 },
      { text: "Buy stocks of companies I know and like 📱", points: 2 },
      { text: "Research different investment options first 📊", points: 3 },
      { text: "Diversify across multiple asset types 💼", points: 4 }
    ]
  },
  {
    id: 'bull_market',
    question: "When you hear 'bull market,' you think...",
    options: [
      { text: "Something about actual bulls? 🐂", points: 1 },
      { text: "Stock prices are going up! 📈", points: 2 },
      { text: "A sustained period of rising stock prices 📊", points: 3 },
      { text: "Optimistic investor sentiment driving price increases 💹", points: 4 }
    ]
  },
  {
    id: 'friend_profit',
    question: "Your friend makes $50 on a stock in one day. Your reaction?",
    options: [
      { text: "Wow, that's awesome! How did they do it? 🤩", points: 1 },
      { text: "Cool! I want to try investing too 💪", points: 2 },
      { text: "Nice! But I'd want to understand the risks first 🤔", points: 3 },
      { text: "Great, but one day doesn't indicate long-term performance 📈", points: 4 }
    ]
  },
  {
    id: 'risk_tolerance',
    question: "If your investment dropped 20% in a month, you would...",
    options: [
      { text: "Panic and sell everything immediately! 😰", points: 1 },
      { text: "Feel nervous but try to wait it out 😅", points: 2 },
      { text: "Review why it happened and decide rationally 🧐", points: 3 },
      { text: "See it as a buying opportunity if fundamentals are strong 🎯", points: 4 }
    ]
  },
  {
    id: 'diversification',
    question: "What does 'don't put all your eggs in one basket' mean for investing?",
    options: [
      { text: "Buy different types of eggs? 🥚", points: 1 },
      { text: "Don't invest all your money in one company 🏢", points: 2 },
      { text: "Spread investments across different stocks and sectors 📊", points: 3 },
      { text: "Allocate across asset classes, geographies, and time horizons 🌍", points: 4 }
    ]
  },
  {
    id: 'compound_interest',
    question: "Your money earning money on the money it already earned is called...",
    options: [
      { text: "Magic money multiplication! ✨", points: 1 },
      { text: "Getting interest on your savings 💰", points: 2 },
      { text: "Compound interest - the 8th wonder of the world! 🌟", points: 3 },
      { text: "The mathematical power of exponential growth over time 📈", points: 4 }
    ]
  },
  {
    id: 'market_crash',
    question: "If the stock market crashed like in a video game, you'd want to...",
    options: [
      { text: "Restart the game! 🔄", points: 1 },
      { text: "Wait for the market to respawn 😅", points: 2 },
      { text: "Buy the dip - everything's on sale! 🛒", points: 3 },
      { text: "Rebalance portfolio and stick to long-term strategy 🎯", points: 4 }
    ]
  },
  {
    id: 'emergency_fund',
    question: "Before investing, you should probably have...",
    options: [
      { text: "A lucky penny! 🪙", points: 1 },
      { text: "Some money saved for emergencies 💳", points: 2 },
      { text: "3-6 months of expenses in an emergency fund 🏦", points: 3 },
      { text: "A fully funded emergency fund and clear financial goals 📋", points: 4 }
    ]
  },
  {
    id: 'inflation',
    question: "When everything gets more expensive over time, that's called...",
    options: [
      { text: "Life being unfair! 😤", points: 1 },
      { text: "Inflation - money loses its buying power 💸", points: 2 },
      { text: "A normal economic phenomenon that affects purchasing power 📊", points: 3 },
      { text: "Why asset allocation should include inflation-hedged investments 💼", points: 4 }
    ]
  },
  {
    id: 'financial_goals',
    question: "When setting financial goals, what's most important?",
    options: [
      { text: "Wanting to be rich! 💎", points: 1 },
      { text: "Setting specific dollar amounts 💰", points: 2 },
      { text: "Making them specific, measurable, and time-bound 🎯", points: 3 },
      { text: "Aligning them with life values and adjusting for life changes 🌟", points: 4 }
    ]
  }
];

interface SkillsAssessmentQuizProps {
  onComplete: (level: string) => void;
}

const SkillsAssessmentQuiz: React.FC<SkillsAssessmentQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  const handleAnswer = (points: number) => {
    const newAnswers = {
      ...answers,
      [assessmentQuestions[currentQuestion].id]: points
    };
    setAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment(newAnswers);
    }
  };

  const completeAssessment = async (finalAnswers: Record<string, number>) => {
    setLoading(true);
    const totalScore = Object.values(finalAnswers).reduce((sum, points) => sum + points, 0);
    const maxScore = assessmentQuestions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let assignedLevel: string;
    if (percentage <= 40) {
      assignedLevel = 'beginner';
    } else if (percentage <= 75) {
      assignedLevel = 'intermediate';
    } else {
      assignedLevel = 'advanced';
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      // Save assessment results
      const { error: assessmentError } = await supabase
        .from('initial_assessments')
        .insert({
          assessment_type: 'skills_assessment',
          score: Math.round(percentage),
          answers: finalAnswers
        });

      if (assessmentError) throw assessmentError;

      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ app_version: assignedLevel })
        .eq('id', user.id);

      if (profileError) throw profileError;

      toast.success(`Assessment complete! You've been assigned to ${assignedLevel} level.`);
      onComplete(assignedLevel);
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error('Failed to save assessment results');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentQuestion];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Analyzing your responses...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-xl">Financial Skills Assessment</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {assessmentQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full h-2" />
          <CardDescription>
            Let Phil help us understand your finance knowledge so we can customize your learning experience!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-4 text-wrap"
                  onClick={() => handleAnswer(option.points)}
                >
                  <span className="flex-grow">{option.text}</span>
                  <ArrowRight className="h-4 w-4 ml-2 flex-shrink-0" />
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsAssessmentQuiz;
