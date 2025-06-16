
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, DollarSign, CreditCard, AlertTriangle } from 'lucide-react';

interface BigPurchasesMiniGameProps {
  onComplete: () => void;
}

interface CarOption {
  id: string;
  name: string;
  price: number;
  condition: 'new' | 'used';
  mileage?: number;
  features: string[];
}

const carOptions: CarOption[] = [
  {
    id: 'new-sedan',
    name: '2024 Honda Civic',
    price: 25000,
    condition: 'new',
    features: ['Warranty', 'Latest Tech', 'New Car Smell']
  },
  {
    id: 'used-sedan',
    name: '2020 Honda Civic',
    price: 18000,
    condition: 'used',
    mileage: 35000,
    features: ['Good Reliability', 'Lower Insurance', 'Less Depreciation']
  },
  {
    id: 'used-budget',
    name: '2018 Toyota Corolla',
    price: 14000,
    condition: 'used',
    mileage: 55000,
    features: ['Very Reliable', 'Great MPG', 'Low Maintenance']
  }
];

const BigPurchasesMiniGame: React.FC<BigPurchasesMiniGameProps> = ({ onComplete }) => {
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);
  const [downPayment, setDownPayment] = useState(0);
  const [loanTerm, setLoanTerm] = useState(60);
  const [creditScore, setCreditScore] = useState(700);
  const [showResults, setShowResults] = useState(false);

  const getInterestRate = (score: number) => {
    if (score >= 750) return 3.5;
    if (score >= 700) return 5.0;
    if (score >= 650) return 7.5;
    return 10.0;
  };

  const calculateMonthlyPayment = () => {
    if (!selectedCar) return 0;
    
    const loanAmount = selectedCar.price - downPayment;
    const monthlyRate = getInterestRate(creditScore) / 100 / 12;
    const numPayments = loanTerm;
    
    if (loanAmount <= 0) return 0;
    
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                   (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return Math.round(payment);
  };

  const getTotalCost = () => {
    if (!selectedCar) return 0;
    const monthlyPayment = calculateMonthlyPayment();
    return downPayment + (monthlyPayment * loanTerm);
  };

  const getRecommendation = () => {
    if (!selectedCar) return '';
    
    const monthlyPayment = calculateMonthlyPayment();
    const totalCost = getTotalCost();
    const interestPaid = totalCost - selectedCar.price;
    
    let recommendation = '';
    
    if (monthlyPayment > 500) {
      recommendation += '⚠️ High monthly payment - consider a less expensive car or larger down payment. ';
    }
    
    if (downPayment < selectedCar.price * 0.1) {
      recommendation += '💡 Consider a larger down payment to reduce monthly costs. ';
    }
    
    if (selectedCar.condition === 'used' && interestPaid < selectedCar.price * 0.2) {
      recommendation += '✅ Good choice! Used cars often provide better value. ';
    }
    
    if (creditScore < 650) {
      recommendation += '📈 Work on improving your credit score before buying to get better rates. ';
    }
    
    return recommendation || '✅ This looks like a reasonable car purchase!';
  };

  const handleFinalize = () => {
    setShowResults(true);
    onComplete();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Car Buying Simulator
          </CardTitle>
          <p className="text-muted-foreground">
            Choose a car and financing options to see how your decisions affect the total cost.
          </p>
        </CardHeader>
      </Card>

      {/* Car Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">1. Choose Your Car</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {carOptions.map((car) => (
            <Card
              key={car.id}
              className={`cursor-pointer transition-all ${
                selectedCar?.id === car.id 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'hover:border-purple-300'
              }`}
              onClick={() => setSelectedCar(car)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-semibold">{car.name}</h4>
                  <Badge className={car.condition === 'new' ? 'bg-green-500' : 'bg-blue-500'}>
                    {car.condition}
                  </Badge>
                  <p className="text-2xl font-bold text-purple-600 mt-2">
                    ${car.price.toLocaleString()}
                  </p>
                  {car.mileage && (
                    <p className="text-sm text-muted-foreground">
                      {car.mileage.toLocaleString()} miles
                    </p>
                  )}
                  <div className="mt-2 space-y-1">
                    {car.features.map((feature, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        • {feature}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedCar && (
        <>
          {/* Financing Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Down Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>$0</span>
                    <span>${selectedCar.price.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={selectedCar.price}
                    step="500"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-purple-600">
                      ${downPayment.toLocaleString()}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((downPayment / selectedCar.price) * 100)}% of car price
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3. Your Credit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Credit Score</label>
                    <select
                      value={creditScore}
                      onChange={(e) => setCreditScore(Number(e.target.value))}
                      className="w-full mt-1 p-2 border rounded"
                    >
                      <option value={800}>Excellent (800+)</option>
                      <option value={750}>Very Good (750-799)</option>
                      <option value={700}>Good (700-749)</option>
                      <option value={650}>Fair (650-699)</option>
                      <option value={600}>Poor (Below 650)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Loan Term</label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full mt-1 p-2 border rounded"
                    >
                      <option value={36}>3 years (36 months)</option>
                      <option value={48}>4 years (48 months)</option>
                      <option value={60}>5 years (60 months)</option>
                      <option value={72}>6 years (72 months)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <Card className="border-2 border-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Your Car Purchase Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-xl font-bold text-purple-600">
                    ${calculateMonthlyPayment()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="text-xl font-bold">
                    {getInterestRate(creditScore)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-xl font-bold">
                    ${getTotalCost().toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Interest Paid</p>
                  <p className="text-xl font-bold text-red-600">
                    ${(getTotalCost() - selectedCar.price).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-800">Financial Advisor Says:</p>
                    <p className="text-sm text-yellow-700">{getRecommendation()}</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleFinalize} 
                className="w-full" 
                size="lg"
                disabled={!selectedCar}
              >
                Finalize Purchase Decision
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {showResults && (
        <Card className="border-2 border-green-500 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Purchase Complete!</h3>
            <p className="text-green-600 mb-4">
              You've successfully navigated the car buying process and learned about 
              the true costs of major purchases.
            </p>
            <Badge className="bg-purple-500 text-white">
              <Car className="h-4 w-4 mr-1" />
              Smart Buyer Badge Earned!
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BigPurchasesMiniGame;
