import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PieChart } from 'lucide-react';

export const BudgetRatioCustomizer = () => {
  const [income, setIncome] = useState('');
  const [needs, setNeeds] = useState(50);
  const [wants, setWants] = useState(30);
  const [savings, setSavings] = useState(20);

  const handleNeedsChange = (value: number[]) => {
    const newNeeds = value[0];
    const remaining = 100 - newNeeds;
    const wantsRatio = wants / (wants + savings);
    
    setNeeds(newNeeds);
    setWants(Math.round(remaining * wantsRatio));
    setSavings(Math.round(remaining * (1 - wantsRatio)));
  };

  const handleWantsChange = (value: number[]) => {
    const newWants = value[0];
    setSavings(100 - needs - newWants);
    setWants(newWants);
  };

  const monthlyIncome = parseFloat(income) || 0;
  const needsAmount = (monthlyIncome * needs) / 100;
  const wantsAmount = (monthlyIncome * wants) / 100;
  const savingsAmount = (monthlyIncome * savings) / 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Budget Ratio Customizer</h3>
      </div>

      <div className="mb-6">
        <Label htmlFor="income">Monthly Income ($)</Label>
        <Input
          id="income"
          type="number"
          placeholder="3500"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label>Needs</Label>
            <span className="text-sm font-medium">{needs}%</span>
          </div>
          <Slider
            value={[needs]}
            onValueChange={handleNeedsChange}
            min={30}
            max={70}
            step={5}
          />
          {monthlyIncome > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              ${needsAmount.toFixed(2)}/month
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label>Wants</Label>
            <span className="text-sm font-medium">{wants}%</span>
          </div>
          <Slider
            value={[wants]}
            onValueChange={handleWantsChange}
            min={10}
            max={100 - needs - 10}
            step={5}
          />
          {monthlyIncome > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              ${wantsAmount.toFixed(2)}/month
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label>Savings & Debt</Label>
            <span className="text-sm font-medium">{savings}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full">
            <div 
              className="h-2 bg-green-600 rounded-full transition-all"
              style={{ width: `${savings}%` }}
            />
          </div>
          {monthlyIncome > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              ${savingsAmount.toFixed(2)}/month
            </div>
          )}
        </div>
      </div>

      {monthlyIncome > 0 && (
        <div className="mt-6 p-4 bg-background rounded-lg">
          <h4 className="font-semibold mb-3">Your Custom Budget</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Needs ({needs}%):</span>
              <span className="font-semibold">${needsAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Wants ({wants}%):</span>
              <span className="font-semibold">${wantsAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Savings ({savings}%):</span>
              <span className="font-semibold text-green-600">${savingsAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        Adjust your budget ratios based on your situation. High rent area? Increase needs. Extra expenses? Reduce wants temporarily.
      </p>
    </Card>
  );
};
