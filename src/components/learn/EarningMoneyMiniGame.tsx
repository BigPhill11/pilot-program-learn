
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

interface EarningMoneyMiniGameProps {
  onComplete: () => void;
}

const EarningMoneyMiniGame: React.FC<EarningMoneyMiniGameProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [budget, setBudget] = useState({
    savings: 20,
    entertainment: 30,
    food: 25,
    transportation: 15,
    clothes: 10
  });

  const monthlyIncome = 770; // (15 hours × $12 × 4 weeks) + $50 allowance
  const totalBudget = Object.values(budget).reduce((sum, val) => sum + val, 0);
  const remainingBudget = 100 - totalBudget;

  const steps = [
    "Set your savings goal",
    "Plan entertainment budget", 
    "Budget for food & snacks",
    "Transportation costs",
    "Clothing budget"
  ];

  const categories = [
    { key: 'savings', name: 'Savings', recommended: 20, min: 10, max: 50, icon: '💰' },
    { key: 'entertainment', name: 'Entertainment', recommended: 30, min: 10, max: 40, icon: '🎬' },
    { key: 'food', name: 'Food/Snacks', recommended: 25, min: 15, max: 35, icon: '🍕' },
    { key: 'transportation', name: 'Transportation', recommended: 15, min: 5, max: 25, icon: '🚗' },
    { key: 'clothes', name: 'Clothes', recommended: 10, min: 5, max: 20, icon: '👕' }
  ];

  const currentCategory = categories[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const updateBudget = (value: number) => {
    setBudget(prev => ({
      ...prev,
      [currentCategory.key]: value
    }));
  };

  if (currentStep >= steps.length) {
    return (
      <Card className="w-full border-green-500">
        <CardContent className="p-6 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-700 mb-4">Budget Complete!</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat.key} className="flex justify-between items-center">
                <span>{cat.icon} {cat.name}</span>
                <span className="font-medium">{budget[cat.key as keyof typeof budget]}% (${Math.round(monthlyIncome * budget[cat.key as keyof typeof budget] / 100)})</span>
              </div>
            ))}
          </div>
          <Button onClick={onComplete} className="mt-4 bg-green-500 hover:bg-green-600">
            Complete Journey
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Monthly Budget Builder
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>Monthly Income: ${monthlyIncome}</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{currentCategory.icon}</div>
            <h3 className="text-xl font-bold mb-2">{steps[currentStep]}</h3>
            <p className="text-muted-foreground">
              Recommended: {currentCategory.recommended}% (${Math.round(monthlyIncome * currentCategory.recommended / 100)})
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {budget[currentCategory.key as keyof typeof budget]}%
              </div>
              <div className="text-lg text-muted-foreground">
                ${Math.round(monthlyIncome * budget[currentCategory.key as keyof typeof budget] / 100)} per month
              </div>
            </div>

            <input
              type="range"
              min={currentCategory.min}
              max={currentCategory.max}
              value={budget[currentCategory.key as keyof typeof budget]}
              onChange={(e) => updateBudget(Number(e.target.value))}
              className="w-full"
            />

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentCategory.min}%</span>
              <span>{currentCategory.max}%</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button onClick={handleNext} className="bg-green-500 hover:bg-green-600">
              {currentStep < steps.length - 1 ? (
                <>Next Category <ArrowRight className="h-4 w-4 ml-2" /></>
              ) : (
                <>Complete Budget <CheckCircle2 className="h-4 w-4 ml-2" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningMoneyMiniGame;
