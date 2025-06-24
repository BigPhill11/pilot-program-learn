
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Brain, TrendingUp } from 'lucide-react';

const TechnicalDrillGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const questions = {
    beginner: [
      {
        question: "What are the three main financial statements?",
        answer: "Income Statement (P&L), Balance Sheet, and Cash Flow Statement. The Income Statement shows profitability over a period, the Balance Sheet shows financial position at a point in time, and the Cash Flow Statement shows actual cash movements.",
        hint: "Think about profit, position, and cash..."
      },
      {
        question: "How do the three financial statements link together?",
        answer: "Net Income from the Income Statement flows to Retained Earnings on the Balance Sheet and is the starting point for the Cash Flow Statement. Changes in Balance Sheet items (except cash) appear in the Cash Flow Statement.",
        hint: "Follow the flow from net income..."
      },
      {
        question: "What is working capital?",
        answer: "Working Capital = Current Assets - Current Liabilities. It measures a company's short-term liquidity and operational efficiency. Positive working capital means you can pay short-term obligations.",
        hint: "Think about short-term assets vs short-term debts..."
      }
    ],
    intermediate: [
      {
        question: "Walk me through a DCF analysis",
        answer: "1) Project Free Cash Flows (FCF) for 5-10 years, 2) Calculate Terminal Value using exit multiple or perpetuity growth, 3) Discount everything back to present value using WACC, 4) Add cash, subtract debt to get equity value, 5) Divide by shares outstanding for per-share value.",
        hint: "Think about cash flows, terminal value, and discounting..."
      },
      {
        question: "If depreciation increases by $10, what happens to the three statements?",
        answer: "Income Statement: Operating income decreases by $10, taxes decrease by $4 (40% rate), net income decreases by $6. Balance Sheet: PPE decreases by $10, cash increases by $4 (tax shield), retained earnings decreases by $6. Cash Flow: Net income down $6, add back depreciation $10, so cash flow increases by $4.",
        hint: "Remember the tax shield benefit of depreciation..."
      }
    ],
    advanced: [
      {
        question: "How would you value a company with negative cash flows?",
        answer: "Use multiple approaches: 1) Revenue multiples (EV/Revenue), 2) Forward-looking DCF with projected profitability, 3) Sum-of-the-parts if applicable, 4) Asset-based valuation for liquidation value, 5) Compare to similar companies at similar stages. Focus on path to profitability and growth metrics.",
        hint: "Think beyond traditional cash flow methods..."
      },
      {
        question: "Explain the difference between Enterprise Value and Equity Value",
        answer: "Enterprise Value is the total value of operations (Equity Value + Net Debt). Equity Value is what equity holders own. EV is capital structure neutral and used for operational metrics (EV/EBITDA), while Equity Value is for per-share metrics (P/E ratio). EV = Market Cap + Debt - Cash.",
        hint: "Think about who gets paid first in a sale..."
      }
    ]
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const startTimer = () => {
    setIsTimerActive(true);
    setTimeLeft(120);
    setShowAnswer(false);
  };

  const currentQuestions = questions[difficulty];
  const current = currentQuestions[currentQuestion];

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % currentQuestions.length);
    setShowAnswer(false);
    setIsTimerActive(false);
    setTimeLeft(120);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
    if (!showAnswer) {
      setIsTimerActive(false);
    }
  };

  const markCorrect = () => {
    setScore(prev => prev + 1);
    nextQuestion();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
          <Button
            key={level}
            variant={difficulty === level ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setDifficulty(level);
              setCurrentQuestion(0);
              setShowAnswer(false);
              setIsTimerActive(false);
              setTimeLeft(120);
            }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Technical Interview Drill
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Score: {score}</Badge>
              <Badge className={
                difficulty === 'beginner' ? 'bg-green-500' :
                difficulty === 'intermediate' ? 'bg-yellow-500' :
                'bg-red-500'
              }>
                {difficulty}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 text-xl font-mono ${
              timeLeft <= 30 ? 'text-red-600' : 'text-green-600'
            }`}>
              <Timer className="h-5 w-5" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p className="font-medium text-blue-800 mb-2">Question {currentQuestion + 1}:</p>
              <p className="text-blue-700">{current.question}</p>
            </CardContent>
          </Card>

          {!showAnswer && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-3">
                <p className="text-yellow-800 text-sm">
                  💡 Hint: {current.hint}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2 justify-center">
            {!isTimerActive ? (
              <Button onClick={startTimer}>
                <Timer className="h-4 w-4 mr-2" />
                Start Timer
              </Button>
            ) : (
              <Button onClick={toggleAnswer} variant="outline">
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </Button>
            )}
          </div>

          {showAnswer && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <p className="font-medium text-green-800 mb-2">Sample Answer:</p>
                <p className="text-green-700 text-sm leading-relaxed">{current.answer}</p>
                
                <div className="flex gap-2 mt-4">
                  <Button onClick={markCorrect} className="bg-green-600 hover:bg-green-700">
                    ✓ I Got It Right
                  </Button>
                  <Button onClick={nextQuestion} variant="outline">
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h5 className="font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Pro Tips for Technical Interviews:
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
              <span>Think out loud - show your thought process</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
              <span>Start with the framework, then add details</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
              <span>It's okay to ask clarifying questions</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
              <span>Practice the basics until they're automatic</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalDrillGame;
