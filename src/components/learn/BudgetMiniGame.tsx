
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Trophy } from 'lucide-react';
import { BudgetMiniGame } from '@/data/budgeting-journey-data';

interface BudgetMiniGameProps {
  miniGameData: BudgetMiniGame;
  onComplete: () => void;
}

const BudgetMiniGameComponent: React.FC<BudgetMiniGameProps> = ({
  miniGameData,
  onComplete
}) => {
  const [allocations, setAllocations] = useState<Record<string, number>>(
    miniGameData.categories.reduce((acc, cat) => ({
      ...acc,
      [cat.id]: cat.recommended
    }), {})
  );
  const [isComplete, setIsComplete] = useState(false);

  const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const remainingPercentage = 100 - totalAllocated;
  const totalAmount = miniGameData.monthlyIncome;

  const handleAllocationChange = (categoryId: string, value: number[]) => {
    setAllocations(prev => ({
      ...prev,
      [categoryId]: value[0]
    }));
  };

  const isValidBudget = () => {
    return Math.abs(totalAllocated - 100) < 1; // Allow 1% tolerance
  };

  const getScoreMessage = () => {
    if (totalAllocated > 101) return "You're over budget! Reduce some categories.";
    if (totalAllocated < 99) return "You have money left unallocated.";
    return "Perfect! Your budget adds up to 100%.";
  };

  const handleComplete = () => {
    if (isValidBudget()) {
      setIsComplete(true);
      setTimeout(() => onComplete(), 2000);
    }
  };

  if (isComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold journey-header mb-4">Budget Complete! 🎉</h3>
          <p className="text-muted-foreground mb-6">
            You've successfully created a balanced budget. Great job managing your money!
          </p>
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold section-header mb-2">Your Final Budget:</h4>
            <div className="space-y-2">
              {miniGameData.categories.map(category => (
                <div key={category.id} className="flex justify-between text-sm">
                  <span>{category.name}:</span>
                  <span>${Math.round((allocations[category.id] / 100) * totalAmount)}/month ({allocations[category.id]}%)</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="journey-header">{miniGameData.title}</CardTitle>
          <p className="text-muted-foreground">{miniGameData.description}</p>
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="section-header font-semibold mb-2">Scenario:</p>
            <p className="text-sm">{miniGameData.scenario}</p>
            <p className="text-lg font-bold mt-2">Monthly Income: ${miniGameData.monthlyIncome}</p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="section-header">Build Your Budget</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isValidBudget() ? "default" : "secondary"}>
                {totalAllocated.toFixed(1)}% allocated
              </Badge>
              {isValidBudget() ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              )}
            </div>
          </div>
          <Progress value={totalAllocated} className="h-3" />
          <p className="text-sm text-muted-foreground">{getScoreMessage()}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {miniGameData.categories.map(category => (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Recommended: {category.recommended}% (${Math.round((category.recommended / 100) * totalAmount)}/month)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    ${Math.round((allocations[category.id] / 100) * totalAmount)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {allocations[category.id]}%
                  </div>
                </div>
              </div>
              
              <Slider
                value={[allocations[category.id]]}
                onValueChange={(value) => handleAllocationChange(category.id, value)}
                min={category.min}
                max={category.max}
                step={1}
                className="w-full"
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Min: {category.min}%</span>
                <span>Max: {category.max}%</span>
              </div>
            </div>
          ))}
          
          <div className="pt-6">
            <Button
              onClick={handleComplete}
              disabled={!isValidBudget()}
              className="w-full"
              size="lg"
            >
              {isValidBudget() ? 'Complete Budget Challenge' : 'Adjust Budget to Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetMiniGameComponent;
