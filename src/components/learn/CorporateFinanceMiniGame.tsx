import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Trophy, RotateCcw } from 'lucide-react';

interface MiniGame {
  name: string;
  description: string;
  learningGoal: string;
  completionSystem: string;
  keyTerms: string[];
}

interface CorporateFinanceMiniGameProps {
  miniGames: MiniGame[];
  levelId: number;
}

const CorporateFinanceMiniGame: React.FC<CorporateFinanceMiniGameProps> = ({ miniGames, levelId }) => {
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [gameState, setGameState] = useState<any>({});
  const [score, setScore] = useState(0);

  const currentGame = miniGames[selectedGame];

  const getGameContent = () => {
    switch (levelId) {
      case 1:
        return selectedGame === 0 ? renderDebtVsEquityGame() : renderFinanceDetectiveGame();
      case 2:
        return selectedGame === 0 ? renderSortTheMoneyGame() : renderProfitPuzzleGame();
      case 3:
        return selectedGame === 0 ? renderFutureValueGame() : renderPresentValueGame();
      default:
        return renderGenericGame();
    }
  };

  const renderDebtVsEquityGame = () => {
    const scenarios = [
      { text: "Company borrows $100,000 from a bank", answer: "debt", type: "debt" },
      { text: "Startup sells 20% ownership to investor", answer: "equity", type: "equity" },
      { text: "Business issues corporate bonds", answer: "debt", type: "debt" },
      { text: "Company goes public with IPO", answer: "equity", type: "equity" },
      { text: "Firm gets a business loan", answer: "debt", type: "debt" }
    ];

    const [currentScenario, setCurrentScenario] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const handleAnswer = (answer: string) => {
      const newAnswers = [...userAnswers, answer];
      setUserAnswers(newAnswers);
      
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
      } else {
        const correct = newAnswers.filter((ans, idx) => ans === scenarios[idx].type).length;
        setScore(correct);
      }
    };

    const reset = () => {
      setCurrentScenario(0);
      setUserAnswers([]);
      setScore(0);
    };

    if (userAnswers.length === scenarios.length) {
      return (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-2">Game Complete!</h3>
            <p className="text-lg">You scored {score} out of {scenarios.length}</p>
            <Badge className={`mt-2 ${score >= 4 ? 'bg-green-500' : score >= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}>
              {score >= 4 ? 'Gold' : score >= 3 ? 'Silver' : 'Bronze'}
            </Badge>
          </div>
          <Button onClick={reset} className="w-full bg-orange-500 hover:bg-orange-600">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg mb-4">{scenarios[currentScenario].text}</p>
          <p className="text-sm text-gray-600 mb-4">Is this debt or equity?</p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => handleAnswer('debt')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Debt
            </Button>
            <Button 
              onClick={() => handleAnswer('equity')}
              className="bg-green-500 hover:bg-green-600"
            >
              Equity
            </Button>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          Question {currentScenario + 1} of {scenarios.length}
        </div>
      </div>
    );
  };

  const renderFinanceDetectiveGame = () => {
    const stories = [
      { 
        text: "A bakery wants to expand but the owner doesn't want to give up control", 
        answer: "debt",
        explanation: "Debt allows expansion without giving up ownership"
      },
      { 
        text: "A tech startup needs funding but has no revenue to pay back loans", 
        answer: "equity",
        explanation: "Equity doesn't require immediate payments like debt"
      },
      { 
        text: "A profitable restaurant wants to open a second location quickly", 
        answer: "debt",
        explanation: "With profits, they can afford loan payments and keep control"
      }
    ];

    const [currentStory, setCurrentStory] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [showExplanations, setShowExplanations] = useState(false);

    const handleAnswer = (answer: string) => {
      const newAnswers = [...userAnswers, answer];
      setUserAnswers(newAnswers);
      
      if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
      } else {
        setShowExplanations(true);
        const correct = newAnswers.filter((ans, idx) => ans === stories[idx].answer).length;
        setScore(correct);
      }
    };

    const reset = () => {
      setCurrentStory(0);
      setUserAnswers([]);
      setShowExplanations(false);
      setScore(0);
    };

    if (showExplanations) {
      return (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-orange-700 dark:text-orange-300">Results</h3>
            <p>You scored {score} out of {stories.length}</p>
          </div>
          {stories.map((story, idx) => (
            <div key={idx} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="font-medium mb-2">{story.text}</p>
              <p className="text-sm text-gray-600 mb-1">Your answer: {userAnswers[idx]}</p>
              <p className="text-sm text-green-600">Correct: {story.answer}</p>
              <p className="text-sm text-blue-600">{story.explanation}</p>
            </div>
          ))}
          <Button onClick={reset} className="w-full bg-orange-500 hover:bg-orange-600">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg mb-4">{stories[currentStory].text}</p>
          <p className="text-sm text-gray-600 mb-4">What financing method would you recommend?</p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => handleAnswer('debt')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Debt Financing
            </Button>
            <Button 
              onClick={() => handleAnswer('equity')}
              className="bg-green-500 hover:bg-green-600"
            >
              Equity Financing
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderSortTheMoneyGame = () => {
    const items = [
      { name: "Cash in bank", category: "Asset" },
      { name: "Bank loan", category: "Liability" },
      { name: "Sales revenue", category: "Revenue" },
      { name: "Rent payment", category: "Expense" },
      { name: "Delivery truck", category: "Asset" },
      { name: "Unpaid bills", category: "Liability" },
      { name: "Service income", category: "Revenue" },
      { name: "Employee salaries", category: "Expense" }
    ];

    const categories = ["Asset", "Liability", "Revenue", "Expense"];
    const [draggedItem, setDraggedItem] = useState<any>(null);
    const [sorted, setSorted] = useState<Record<string, any[]>>({
      Asset: [], Liability: [], Revenue: [], Expense: [], Unsorted: [...items]
    });

    const handleDrop = (category: string) => {
      if (draggedItem) {
        const newSorted = { ...sorted };
        // Remove from current category
        Object.keys(newSorted).forEach(key => {
          newSorted[key] = newSorted[key].filter(item => item.name !== draggedItem.name);
        });
        // Add to new category
        newSorted[category].push(draggedItem);
        setSorted(newSorted);
        setDraggedItem(null);
      }
    };

    const calculateScore = () => {
      let correct = 0;
      Object.keys(sorted).forEach(category => {
        if (category !== 'Unsorted') {
          sorted[category].forEach(item => {
            if (item.category === category) correct++;
          });
        }
      });
      return correct;
    };

    const reset = () => {
      setSorted({ Asset: [], Liability: [], Revenue: [], Expense: [], Unsorted: [...items] });
      setScore(0);
    };

    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-lg mb-2">Drag items to the correct category</p>
          <Badge variant="outline">Score: {calculateScore()} / {items.length}</Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => (
            <div
              key={category}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-32"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(category)}
            >
              <h4 className="font-bold text-center mb-2 text-orange-600">{category}</h4>
              {sorted[category].map(item => (
                <div
                  key={item.name}
                  className="p-2 bg-blue-100 dark:bg-blue-900 rounded mb-2 text-sm cursor-move"
                  draggable
                  onDragStart={() => setDraggedItem(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-bold text-center mb-2 text-gray-600">Items to Sort</h4>
          <div className="flex flex-wrap gap-2">
            {sorted.Unsorted.map(item => (
              <div
                key={item.name}
                className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded cursor-move"
                draggable
                onDragStart={() => setDraggedItem(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <Button onClick={reset} className="w-full bg-orange-500 hover:bg-orange-600">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Game
        </Button>
      </div>
    );
  };

  const renderProfitPuzzleGame = () => {
    const scenarios = [
      { revenue: 50000, expenses: 30000, answer: 20000 },
      { revenue: 75000, expenses: 45000, answer: 30000 },
      { revenue: 100000, expenses: 80000, answer: 20000 },
      { revenue: 25000, expenses: 35000, answer: -10000 }
    ];

    const [currentScenario, setCurrentScenario] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [results, setResults] = useState<boolean[]>([]);

    const checkAnswer = () => {
      const correct = parseInt(userAnswer) === scenarios[currentScenario].answer;
      const newResults = [...results, correct];
      setResults(newResults);
      
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setUserAnswer('');
      } else {
        setScore(newResults.filter(r => r).length);
      }
    };

    const reset = () => {
      setCurrentScenario(0);
      setUserAnswer('');
      setResults([]);
      setScore(0);
    };

    if (results.length === scenarios.length) {
      return (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-orange-700 dark:text-orange-300">Complete!</h3>
            <p>You got {score} out of {scenarios.length} correct!</p>
          </div>
          <Button onClick={reset} className="w-full bg-orange-500 hover:bg-orange-600">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </div>
      );
    }

    const current = scenarios[currentScenario];
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4">Calculate the Profit</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <p className="text-lg">Revenue: ${current.revenue.toLocaleString()}</p>
            <p className="text-lg">Expenses: ${current.expenses.toLocaleString()}</p>
            <p className="text-lg font-bold">Profit = ?</p>
          </div>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="p-2 border rounded-lg text-center mb-4"
            placeholder="Enter profit amount"
          />
          <br />
          <Button 
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="bg-green-500 hover:bg-green-600"
          >
            Check Answer
          </Button>
        </div>
        <div className="text-center text-sm text-gray-500">
          Scenario {currentScenario + 1} of {scenarios.length}
        </div>
      </div>
    );
  };

  const renderFutureValueGame = () => {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-bold mb-4">Future Value Calculator</h3>
        <p className="text-gray-600 mb-4">Interactive game coming soon!</p>
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
          <p>Learn how money grows over time with compound interest</p>
        </div>
      </div>
    );
  };

  const renderPresentValueGame = () => {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-bold mb-4">Present Value Challenge</h3>
        <p className="text-gray-600 mb-4">Interactive game coming soon!</p>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
          <p>Compare money today vs. money in the future</p>
        </div>
      </div>
    );
  };

  const renderGenericGame = () => (
    <div className="text-center p-8">
      <p className="text-gray-600">Game content coming soon!</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Game Selection */}
      <div className="flex gap-4 justify-center">
        {miniGames.map((game, index) => (
          <Button
            key={index}
            onClick={() => setSelectedGame(index)}
            variant={selectedGame === index ? "default" : "outline"}
            className={selectedGame === index ? "bg-orange-500 hover:bg-orange-600" : "border-orange-300 text-orange-600"}
          >
            <Gamepad2 className="h-4 w-4 mr-2" />
            {game.name}
          </Button>
        ))}
      </div>

      {/* Game Info Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30">
        <CardHeader>
          <CardTitle className="text-orange-700 dark:text-orange-300 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            {currentGame.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700 dark:text-gray-300">{currentGame.description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-orange-300 text-orange-600">
              Goal: {currentGame.learningGoal}
            </Badge>
            <Badge variant="outline" className="border-yellow-300 text-yellow-600">
              {currentGame.completionSystem}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {currentGame.keyTerms.map((term, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {term}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Content */}
      <Card>
        <CardContent className="p-6">
          {getGameContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default CorporateFinanceMiniGame;