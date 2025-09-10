import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, RotateCcw, Trophy } from 'lucide-react';

interface HedgeFundMiniGameProps {
  game: {
    name: string;
    description: string;
    learningGoal: string;
    completionSystem: string;
  };
  levelId: number;
}

const HedgeFundMiniGame: React.FC<HedgeFundMiniGameProps> = ({ game, levelId }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Game content based on game name and level
  const getGameContent = () => {
    if (levelId === 1) {
      if (game.name === "Fund or Not?") {
        return {
          questions: [
            {
              prompt: "Which of these is a hedge fund?",
              options: ["Vanguard S&P 500 Index Fund", "Bridgewater Pure Alpha", "Bank Savings Account", "Government Bond"],
              correct: "Bridgewater Pure Alpha",
              explanation: "Bridgewater Pure Alpha is a famous hedge fund that uses complex strategies and is only available to qualified investors."
            },
            {
              prompt: "Which of these is NOT a hedge fund?",
              options: ["Renaissance Medallion Fund", "Citadel Wellington", "Fidelity 401k Plan", "Two Sigma Compass"],
              correct: "Fidelity 401k Plan",
              explanation: "401k plans are retirement accounts available to employees, not exclusive hedge funds."
            },
            {
              prompt: "Which investment vehicle has the highest minimum investment?",
              options: ["Mutual Fund ($1,000)", "ETF ($100)", "Hedge Fund ($1,000,000)", "Savings Account ($1)"],
              correct: "Hedge Fund ($1,000,000)",
              explanation: "Hedge funds typically require million-dollar minimum investments, making them exclusive to wealthy investors."
            }
          ]
        };
      } else if (game.name === "Risk Gauge") {
        return {
          questions: [
            {
              prompt: "Rank these investments from LEAST to MOST risky:",
              options: ["Savings Account → Index Fund → Hedge Fund", "Hedge Fund → Index Fund → Savings Account", "Index Fund → Savings Account → Hedge Fund", "Savings Account → Hedge Fund → Index Fund"],
              correct: "Savings Account → Index Fund → Hedge Fund",
              explanation: "Savings accounts are FDIC insured (lowest risk), index funds have market risk (medium), hedge funds use leverage and complex strategies (highest risk)."
            },
            {
              prompt: "Why are hedge funds riskier than mutual funds?",
              options: ["They invest in more companies", "They use leverage and derivatives", "They have better managers", "They are government regulated"],
              correct: "They use leverage and derivatives",
              explanation: "Hedge funds use borrowed money (leverage) and complex financial instruments (derivatives) that can amplify both gains and losses."
            }
          ]
        };
      }
    } else if (levelId === 2) {
      if (game.name === "Strategy Sorter") {
        return {
          questions: [
            {
              prompt: "Company A announces a merger. Which strategy would a hedge fund use?",
              options: ["Long/Short Equity", "Global Macro", "Event-Driven", "Arbitrage"],
              correct: "Event-Driven",
              explanation: "Event-driven strategies focus on corporate events like mergers, acquisitions, and restructurings."
            },
            {
              prompt: "A fund bets the Euro will weaken against the Dollar. Which strategy is this?",
              options: ["Long/Short Equity", "Global Macro", "Event-Driven", "Arbitrage"],
              correct: "Global Macro",
              explanation: "Global macro strategies make bets on broad economic trends including currency movements."
            },
            {
              prompt: "A fund buys Apple stock at $150 in New York and sells it for $151 in London. Which strategy?",
              options: ["Long/Short Equity", "Global Macro", "Event-Driven", "Arbitrage"],
              correct: "Arbitrage",
              explanation: "Arbitrage exploits price differences for the same asset in different markets."
            }
          ]
        };
      } else if (game.name === "Risk/Reward Balance") {
        return {
          questions: [
            {
              prompt: "Conservative pension fund client wants steady returns. Best strategy?",
              options: ["High leverage long/short", "Conservative arbitrage", "Aggressive global macro", "Event-driven with leverage"],
              correct: "Conservative arbitrage",
              explanation: "Arbitrage strategies typically have lower risk as they exploit price differences rather than directional bets."
            },
            {
              prompt: "Aggressive investor wants maximum returns and can handle volatility. Best strategy?",
              options: ["Market neutral arbitrage", "High leverage global macro", "Conservative long-only", "Cash and bonds"],
              correct: "High leverage global macro",
              explanation: "Leveraged global macro strategies can generate the highest returns but come with the highest risk."
            }
          ]
        };
      }
    } else if (levelId === 3) {
      if (game.name === "Fee Calculator") {
        return {
          questions: [
            {
              prompt: "Fund has $100M assets, earns $20M profit. Calculate '2 and 20' fees:",
              options: ["$2M management + $4M performance = $6M total", "$4M management + $2M performance = $6M total", "$20M management + $4M performance = $24M total", "$2M management + $20M performance = $22M total"],
              correct: "$2M management + $4M performance = $6M total",
              explanation: "Management fee: 2% of $100M = $2M. Performance fee: 20% of $20M profit = $4M. Total = $6M."
            },
            {
              prompt: "Fund has $500M assets, loses $50M. What fees are charged?",
              options: ["$10M management fee only", "$10M performance fee only", "No fees charged", "$60M total fees"],
              correct: "$10M management fee only",
              explanation: "Management fees (2% of assets = $10M) are charged regardless of performance. No performance fees on losses."
            },
            {
              prompt: "Fund charges '3 and 30' on $200M with $40M profit. Total fees?",
              options: ["$6M + $12M = $18M", "$40M + $12M = $52M", "$6M + $40M = $46M", "$3M + $30M = $33M"],
              correct: "$6M + $12M = $18M",
              explanation: "Management: 3% of $200M = $6M. Performance: 30% of $40M = $12M. Total = $18M."
            }
          ]
        };
      } else if (game.name === "Investor Match") {
        return {
          questions: [
            {
              prompt: "Which investor CAN invest in hedge funds?",
              options: ["College student with $5,000", "Teacher with $50,000 401k", "University endowment with $1B", "Retail investor with $100,000"],
              correct: "University endowment with $1B",
              explanation: "University endowments are institutional investors with sufficient assets and sophistication to invest in hedge funds."
            },
            {
              prompt: "Why can't most retail investors access hedge funds?",
              options: ["Hedge funds don't want their money", "Minimum investments too high + accreditation requirements", "Government forbids all retail investment", "Hedge funds only invest in bonds"],
              correct: "Minimum investments too high + accreditation requirements",
              explanation: "Hedge funds require high minimums (often $1M+) and investors must be 'accredited' with sufficient wealth/income."
            }
          ]
        };
      }
    }
    
    return { questions: [] };
  };

  const gameContent = getGameContent();
  const questions = gameContent.questions || [];

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setGameState('ready');
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getScoreLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { level: 'Gold', color: 'text-yellow-600 bg-yellow-100' };
    if (percentage >= 75) return { level: 'Silver', color: 'text-gray-600 bg-gray-100' };
    if (percentage >= 50) return { level: 'Bronze', color: 'text-orange-600 bg-orange-100' };
    return { level: 'Try Again', color: 'text-red-600 bg-red-100' };
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          Game content coming soon!
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'ready') {
    return (
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <h4 className="font-semibold text-lg">Ready to play {game.name}?</h4>
          <p className="text-sm text-muted-foreground">Test your knowledge with {questions.length} questions</p>
          <Button onClick={startGame} className="bg-indigo-600 hover:bg-indigo-700">
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'playing') {
    const question = questions[currentQuestion];
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="outline">Question {currentQuestion + 1} of {questions.length}</Badge>
            <div className="text-sm text-muted-foreground">Score: {score}/{currentQuestion + (selectedAnswer ? 1 : 0)}</div>
          </div>
          
          <h4 className="font-semibold text-lg">{question.prompt}</h4>
          
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`w-full p-3 text-left border rounded-lg transition-all ${
                  selectedAnswer === option
                    ? option === question.correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : selectedAnswer && option === question.correct
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${selectedAnswer ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer && option === question.correct && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {selectedAnswer === option && option !== question.correct && <X className="h-4 w-4 text-red-600" />}
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}

          {showFeedback && (
            <div className="flex justify-end">
              <Button onClick={nextQuestion} className="bg-indigo-600 hover:bg-indigo-700">
                {currentQuestion + 1 === questions.length ? 'See Results' : 'Next Question'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'completed') {
    const scoreLevel = getScoreLevel();
    return (
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <Trophy className="h-12 w-12 text-yellow-500 mx-auto" />
          <h4 className="font-bold text-xl">Game Complete!</h4>
          <div className="space-y-2">
            <div className="text-lg">Final Score: {score}/{questions.length}</div>
            <Badge className={scoreLevel.color}>{scoreLevel.level}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Great job! You've completed the {game.name} mini-game.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default HedgeFundMiniGame;