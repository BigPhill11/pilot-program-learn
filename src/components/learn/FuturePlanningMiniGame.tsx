
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const FuturePlanningMiniGame: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [gameCompleted, setGameCompleted] = useState(false);

  const gameSteps = [
    {
      id: "retirement",
      title: "Retirement Planning",
      question: "You're 25 and just started your first job. What's your first retirement move?",
      options: [
        { id: "401k", text: "Contribute to employer 401(k) with match", points: 10 },
        { id: "stocks", text: "Invest directly in individual stocks", points: 5 },
        { id: "wait", text: "Wait until I'm older to start", points: 0 }
      ]
    },
    {
      id: "insurance",
      title: "Life Insurance Decision",
      question: "You're 28, married, and buying a house. What life insurance do you choose?",
      options: [
        { id: "term", text: "20-year term life policy", points: 10 },
        { id: "whole", text: "Whole life policy", points: 5 },
        { id: "none", text: "Skip insurance for now", points: 0 }
      ]
    },
    {
      id: "estate",
      title: "Estate Planning",
      question: "You have a child and some assets. What's your priority?",
      options: [
        { id: "will", text: "Create a will and name guardians", points: 10 },
        { id: "trust", text: "Set up an expensive trust fund", points: 5 },
        { id: "later", text: "Deal with it when I'm older", points: 0 }
      ]
    },
    {
      id: "goals",
      title: "Long-term Goals",
      question: "You want to build generational wealth. What's your approach?",
      options: [
        { id: "diversify", text: "Diversified investing and education", points: 10 },
        { id: "risky", text: "High-risk, high-reward investments", points: 5 },
        { id: "savings", text: "Just save money in the bank", points: 3 }
      ]
    }
  ];

  const handleChoice = (optionId: string, points: number) => {
    setUserChoices(prev => ({
      ...prev,
      [gameSteps[currentStep].id]: optionId
    }));

    if (currentStep < gameSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setGameCompleted(true);
    }
  };

  const getTotalScore = () => {
    return Object.entries(userChoices).reduce((total, [stepId, choiceId]) => {
      const step = gameSteps.find(s => s.id === stepId);
      const choice = step?.options.find(o => o.id === choiceId);
      return total + (choice?.points || 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 35) return "Future Planning Master! 🏆";
    if (score >= 25) return "Well on your way! 📈";
    if (score >= 15) return "Good start, room to grow! 🌱";
    return "Consider learning more! 📚";
  };

  const resetGame = () => {
    setCurrentStep(0);
    setUserChoices({});
    setGameCompleted(false);
  };

  if (gameCompleted) {
    const totalScore = getTotalScore();
    return (
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-indigo-600">Future Plan Folder Complete! 📁</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-3xl font-bold text-indigo-600">{totalScore}/40 Points</div>
          <Badge className="bg-indigo-500 text-white text-lg py-2 px-4">
            {getScoreMessage(totalScore)}
          </Badge>
          
          <div className="space-y-3 text-left">
            <h4 className="font-semibold text-indigo-600">Your Future Plan Summary:</h4>
            {gameSteps.map(step => {
              const choice = step.options.find(o => o.id === userChoices[step.id]);
              return (
                <div key={step.id} className="flex justify-between items-center p-2 bg-white rounded border">
                  <span className="text-sm font-medium">{step.title}:</span>
                  <span className="text-sm text-indigo-600">{choice?.text}</span>
                </div>
              );
            })}
          </div>

          <Button onClick={resetGame} className="bg-indigo-500 hover:bg-indigo-600">
            Plan Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = gameSteps[currentStep];
  const progress = ((currentStep) / gameSteps.length) * 100;

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-xl text-indigo-600">Future Plan Folder Builder</CardTitle>
          <Badge variant="outline">Step {currentStep + 1} of {gameSteps.length}</Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">{currentStepData.title}</h3>
            <p className="text-muted-foreground mb-4">{currentStepData.question}</p>
          </div>

          <div className="space-y-3">
            {currentStepData.options.map(option => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4 border-indigo-200 hover:bg-indigo-50"
                onClick={() => handleChoice(option.id, option.points)}
              >
                <div className="flex-1">
                  <div className="font-medium">{option.text}</div>
                  <div className="text-sm text-muted-foreground">+{option.points} points</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuturePlanningMiniGame;
