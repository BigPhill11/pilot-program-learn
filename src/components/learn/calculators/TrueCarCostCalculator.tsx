import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

export const TrueCarCostCalculator = () => {
  const [carPrice, setCarPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('60');
  const [insurance, setInsurance] = useState('');
  const [gas, setGas] = useState('');
  const [maintenance, setMaintenance] = useState('');
  
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    monthlyTotal: number;
    fiveYearTotal: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(carPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const months = parseInt(loanTerm) || 60;
    const monthlyInsurance = parseFloat(insurance) || 0;
    const monthlyGas = parseFloat(gas) || 0;
    const monthlyMaintenance = parseFloat(maintenance) || 0;

    const loanAmount = price - down;
    const monthlyPayment = loanAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - loanAmount;
    
    const monthlyTotal = monthlyPayment + monthlyInsurance + monthlyGas + monthlyMaintenance;
    const fiveYearTotal = down + totalPaid + (monthlyInsurance + monthlyGas + monthlyMaintenance) * 60;

    setResult({
      monthlyPayment,
      totalInterest,
      monthlyTotal,
      fiveYearTotal
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-500/5 to-red-500/5">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">True Car Cost Calculator</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="price">Car Price ($)</Label>
          <Input
            id="price"
            type="number"
            placeholder="25000"
            value={carPrice}
            onChange={(e) => setCarPrice(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="down">Down Payment ($)</Label>
          <Input
            id="down"
            type="number"
            placeholder="5000"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="interest">Interest Rate (%)</Label>
          <Input
            id="interest"
            type="number"
            step="0.1"
            placeholder="6.5"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="term">Loan Term (months)</Label>
          <Input
            id="term"
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="insurance">Monthly Insurance ($)</Label>
          <Input
            id="insurance"
            type="number"
            placeholder="150"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="gas">Monthly Gas ($)</Label>
          <Input
            id="gas"
            type="number"
            placeholder="200"
            value={gas}
            onChange={(e) => setGas(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="maintenance">Monthly Maintenance ($)</Label>
          <Input
            id="maintenance"
            type="number"
            placeholder="100"
            value={maintenance}
            onChange={(e) => setMaintenance(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full mb-4">
        Calculate Total Cost
      </Button>

      {result && (
        <div className="space-y-3 p-4 bg-background rounded-lg">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monthly Loan Payment:</span>
            <span className="font-semibold">${result.monthlyPayment.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Interest Paid:</span>
            <span className="text-destructive">${result.totalInterest.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Monthly Total (All Costs):</span>
            <span className="text-primary">${result.monthlyTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-destructive">
            <span>5-Year Total Cost:</span>
            <span>${result.fiveYearTotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </Card>
  );
};
