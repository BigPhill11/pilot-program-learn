import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CompoundInterestVisualizer = () => {
  const [initialAmount, setInitialAmount] = useState('1000');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [years, setYears] = useState('30');
  const [returnRate, setReturnRate] = useState('8');
  const [chartData, setChartData] = useState<any[]>([]);

  const calculate = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const numYears = parseInt(years) || 0;
    const rate = (parseFloat(returnRate) || 0) / 100;

    const data = [];
    let balance = initial;
    let totalContributions = initial;

    for (let year = 0; year <= numYears; year++) {
      data.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions)
      });

      // Calculate next year
      balance = balance * (1 + rate) + (monthly * 12 * (1 + rate / 2));
      totalContributions += monthly * 12;
    }

    setChartData(data);
  };

  const finalBalance = chartData.length > 0 ? chartData[chartData.length - 1].balance : 0;
  const totalContributions = chartData.length > 0 ? chartData[chartData.length - 1].contributions : 0;
  const earnings = finalBalance - totalContributions;

  return (
    <Card className="p-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Compound Interest Visualizer</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="initial">Initial Amount ($)</Label>
          <Input
            id="initial"
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="monthly">Monthly Contribution ($)</Label>
          <Input
            id="monthly"
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="years">Years</Label>
          <Input
            id="years"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="rate">Annual Return (%)</Label>
          <Input
            id="rate"
            type="number"
            step="0.1"
            value={returnRate}
            onChange={(e) => setReturnRate(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full mb-4">
        Calculate Growth
      </Button>

      {chartData.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-background rounded-lg">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Final Balance</div>
              <div className="text-xl font-bold text-primary">${finalBalance.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Total Contributions</div>
              <div className="text-xl font-bold">${totalContributions.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Earnings</div>
              <div className="text-xl font-bold text-green-600">${earnings.toLocaleString()}</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#10b981" name="Total Value" strokeWidth={2} />
              <Line type="monotone" dataKey="contributions" stroke="#6366f1" name="Contributions" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </Card>
  );
};
