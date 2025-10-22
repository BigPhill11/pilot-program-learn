import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export const EmergencyFundCalculator = () => {
  const [rent, setRent] = useState('');
  const [utilities, setUtilities] = useState('');
  const [food, setFood] = useState('');
  const [transportation, setTransportation] = useState('');
  const [other, setOther] = useState('');
  
  const [result, setResult] = useState<{
    monthlyExpenses: number;
    threeMonths: number;
    sixMonths: number;
    weeklyGoal: number;
  } | null>(null);

  const calculate = () => {
    const monthlyExpenses = 
      (parseFloat(rent) || 0) +
      (parseFloat(utilities) || 0) +
      (parseFloat(food) || 0) +
      (parseFloat(transportation) || 0) +
      (parseFloat(other) || 0);

    const threeMonths = monthlyExpenses * 3;
    const sixMonths = monthlyExpenses * 6;
    const weeklyGoal = sixMonths / 52; // Weekly savings goal to reach 6 months in 1 year

    setResult({
      monthlyExpenses,
      threeMonths,
      sixMonths,
      weeklyGoal
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Emergency Fund Calculator</h3>
      </div>

      <div className="space-y-4 mb-4">
        <div>
          <Label htmlFor="rent">Monthly Rent/Mortgage ($)</Label>
          <Input
            id="rent"
            type="number"
            placeholder="1200"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="utilities">Utilities ($)</Label>
          <Input
            id="utilities"
            type="number"
            placeholder="150"
            value={utilities}
            onChange={(e) => setUtilities(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="food">Food & Groceries ($)</Label>
          <Input
            id="food"
            type="number"
            placeholder="400"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="transportation">Transportation ($)</Label>
          <Input
            id="transportation"
            type="number"
            placeholder="200"
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="other">Other Essentials ($)</Label>
          <Input
            id="other"
            type="number"
            placeholder="250"
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full mb-4">
        Calculate Emergency Fund Target
      </Button>

      {result && (
        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Your Monthly Essentials</div>
            <div className="text-2xl font-bold text-primary">${result.monthlyExpenses.toFixed(2)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-500/10 rounded-lg text-center">
              <div className="text-xs text-muted-foreground mb-1">Starter Goal (3 months)</div>
              <div className="text-lg font-bold">${result.threeMonths.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg text-center">
              <div className="text-xs text-muted-foreground mb-1">Full Goal (6 months)</div>
              <div className="text-lg font-bold">${result.sixMonths.toFixed(2)}</div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Weekly Savings to Reach Full Goal in 1 Year</div>
            <div className="text-xl font-bold text-blue-600">${result.weeklyGoal.toFixed(2)}/week</div>
          </div>
        </div>
      )}
    </Card>
  );
};
