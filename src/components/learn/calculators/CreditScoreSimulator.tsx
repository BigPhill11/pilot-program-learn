import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { TrendingUp } from 'lucide-react';

export const CreditScoreSimulator = () => {
  const [paymentHistory, setPaymentHistory] = useState(100);
  const [utilization, setUtilization] = useState(30);
  const [creditAge, setCreditAge] = useState(5);
  const [newAccounts, setNewAccounts] = useState(0);
  
  const calculateScore = () => {
    // Simplified credit score calculation
    const paymentScore = (paymentHistory / 100) * 350; // 35% weight, max 350
    const utilizationScore = ((100 - utilization) / 100) * 300; // 30% weight, max 300
    const ageScore = Math.min(creditAge / 10, 1) * 150; // 15% weight, max 150
    const newAccountPenalty = Math.min(newAccounts * 10, 50); // Penalty for new accounts
    
    const totalScore = 300 + paymentScore + utilizationScore + ageScore - newAccountPenalty;
    return Math.round(Math.min(Math.max(totalScore, 300), 850));
  };

  const score = calculateScore();
  const getScoreColor = () => {
    if (score >= 740) return 'text-green-600';
    if (score >= 670) return 'text-blue-600';
    if (score >= 580) return 'text-yellow-600';
    return 'text-destructive';
  };

  const getScoreLabel = () => {
    if (score >= 740) return 'Excellent';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Credit Score Simulator</h3>
      </div>

      <div className="text-center mb-6">
        <div className={`text-5xl font-bold ${getScoreColor()}`}>{score}</div>
        <div className="text-sm text-muted-foreground mt-1">{getScoreLabel()}</div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label>On-Time Payments (35%)</Label>
            <span className="text-sm font-medium">{paymentHistory}%</span>
          </div>
          <Slider
            value={[paymentHistory]}
            onValueChange={(v) => setPaymentHistory(v[0])}
            min={0}
            max={100}
            step={5}
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label>Credit Utilization (30%)</Label>
            <span className="text-sm font-medium">{utilization}%</span>
          </div>
          <Slider
            value={[utilization]}
            onValueChange={(v) => setUtilization(v[0])}
            min={0}
            max={100}
            step={5}
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label>Credit Age (years)</Label>
            <span className="text-sm font-medium">{creditAge}</span>
          </div>
          <Slider
            value={[creditAge]}
            onValueChange={(v) => setCreditAge(v[0])}
            min={0}
            max={20}
            step={1}
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label>New Accounts</Label>
            <span className="text-sm font-medium">{newAccounts}</span>
          </div>
          <Slider
            value={[newAccounts]}
            onValueChange={(v) => setNewAccounts(v[0])}
            min={0}
            max={10}
            step={1}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Adjust the sliders to see how different factors impact your credit score
      </p>
    </Card>
  );
};
