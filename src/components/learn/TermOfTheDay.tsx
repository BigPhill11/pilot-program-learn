
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface TermData {
  term: string;
  definition: string;
  example: string;
  category: string;
}

const financialTerms: TermData[] = [
  {
    term: "Compound Interest",
    definition: "Interest calculated on both the initial principal and the accumulated interest from previous periods.",
    example: "If you invest $1,000 at 5% annual compound interest, after one year you'll have $1,050, and the next year you'll earn interest on $1,050, not just the original $1,000.",
    category: "Investment"
  },
  {
    term: "Diversification",
    definition: "An investment strategy that spreads risk by investing in a variety of different assets or securities.",
    example: "Instead of putting all your money in one stock, you might invest in stocks, bonds, and real estate to reduce overall risk.",
    category: "Portfolio Management"
  },
  {
    term: "Market Capitalization",
    definition: "The total value of a company's shares in the stock market, calculated by multiplying share price by total number of shares.",
    example: "If a company has 1 million shares trading at $50 each, its market cap is $50 million.",
    category: "Valuation"
  },
  {
    term: "Bull Market",
    definition: "A period of rising stock prices and investor optimism, typically lasting months or years.",
    example: "The stock market experienced a bull market from 2009 to 2020, with major indices reaching new highs regularly.",
    category: "Market Trends"
  },
  {
    term: "Dividend Yield",
    definition: "The annual dividend payment expressed as a percentage of the stock's current price.",
    example: "If a stock costs $100 and pays $4 in annual dividends, the dividend yield is 4%.",
    category: "Income Investing"
  }
];

const TermOfTheDay = () => {
  // Get a consistent term based on the current date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const termIndex = dayOfYear % financialTerms.length;
  const todaysTerm = financialTerms[termIndex];

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl text-amber-800">
          <Lightbulb className="h-6 w-6 text-amber-600" />
          Term of the Day
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-2">{todaysTerm.term}</h3>
          <p className="text-amber-800 mb-3">{todaysTerm.definition}</p>
          <div className="bg-white rounded-md p-3 border border-amber-300">
            <p className="text-sm text-amber-700">
              <span className="font-semibold">Example: </span>
              {todaysTerm.example}
            </p>
          </div>
          <div className="mt-3">
            <span className="inline-block bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
              {todaysTerm.category}
            </span>
          </div>
        </div>
        <p className="text-sm text-amber-600">
          🐼 Phil's tip: Understanding these terms will help you navigate the financial world with confidence!
        </p>
      </CardContent>
    </Card>
  );
};

export default TermOfTheDay;
