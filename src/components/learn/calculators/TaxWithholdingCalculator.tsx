import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

export const TaxWithholdingCalculator = () => {
  const [income, setIncome] = useState('');
  const [result, setResult] = useState<{
    grossPay: number;
    federalTax: number;
    fica: number;
    netPay: number;
  } | null>(null);

  const calculate = () => {
    const grossPay = parseFloat(income) || 0;
    const federalRate = 0.12; // Simplified 12% federal
    const ficaRate = 0.0765; // 7.65% FICA
    
    const federalTax = grossPay * federalRate;
    const fica = grossPay * ficaRate;
    const netPay = grossPay - federalTax - fica;

    setResult({ grossPay, federalTax, fica, netPay });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Tax Withholding Estimator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="income">Monthly Gross Income ($)</Label>
          <Input
            id="income"
            type="number"
            placeholder="3000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>

        <Button onClick={calculate} className="w-full">
          Calculate
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-background rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gross Pay:</span>
              <span className="font-semibold">${result.grossPay.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-destructive">
              <span>Federal Tax (12%):</span>
              <span>-${result.federalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-destructive">
              <span>FICA (7.65%):</span>
              <span>-${result.fica.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t">
              <span>Net Take-Home:</span>
              <span>${result.netPay.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
