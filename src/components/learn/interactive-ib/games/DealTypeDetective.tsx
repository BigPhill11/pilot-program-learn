
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, RotateCcw, ArrowRight } from 'lucide-react';

interface Scenario {
  id: string;
  text: string;
  category: 'IPO' | 'M&A' | 'Financing';
  explanation: string;
  completed: boolean;
}

interface DealTypeDetectiveProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const DealTypeDetective: React.FC<DealTypeDetectiveProps> = ({ onComplete, onExit }) => {
  const [scenarios] = useState<Scenario[]>([
    {
      id: '1',
      text: 'TechStart wants to sell shares to raise money for expansion',
      category: 'IPO',
      explanation: 'This is an IPO because they\'re selling shares to the public for the first time to raise capital!',
      completed: false
    },
    {
      id: '2',
      text: 'BigCorp wants to buy SmallCorp to expand their business',
      category: 'M&A',
      explanation: 'This is an acquisition (M&A) - one company buying another to grow their business!',
      completed: false
    },
    {
      id: '3',
      text: 'GrowthCo needs a loan to build a new factory',
      category: 'Financing',
      explanation: 'This is financing - borrowing money for a specific business project!',
      completed: false
    },
    {
      id: '4',
      text: 'RetailChain and DeliveryService want to combine forces',
      category: 'M&A',
      explanation: 'This is a merger (M&A) - two companies joining together as equals!',
      completed: false
    },
    {
      id: '5',
      text: 'StartupCorp wants to go public and trade on the stock exchange',
      category: 'IPO',
      explanation: 'This is an IPO - going from private to public company with tradeable shares!',
      completed: false
    },
    {
      id: '6',
      text: 'ManufacturingInc needs to raise funds through corporate bonds',
      category: 'Financing',
      explanation: 'This is financing - raising money by issuing bonds to investors!',
      completed: false
    }
  ]);

  const [gameState, setGameState] = useState({
    currentScenario: 0,
    score: 0,
    attempts: 0,
    showResult: false,
    selectedCategory: null as string | null,
    completedScenarios: [] as string[],
    gameCompleted: false
  });

  const currentScenario = scenarios[gameState.currentScenario];
  const categories = ['IPO', 'M&A', 'Financing'];

  const handleCategorySelect = (category: string) => {
    if (gameState.showResult) return;
    
    setGameState(prev => ({ ...prev, selectedCategory: category }));
  };

  const handleSubmit = () => {
    if (!gameState.selectedCategory || gameState.showResult) return;

    const isCorrect = gameState.selectedCategory === currentScenario.category;
    const newScore = gameState.score + (isCorrect ? 1 : 0);
    const newAttempts = gameState.attempts + 1;
    const newCompleted = [...gameState.completedScenarios, currentScenario.id];

    setGameState(prev => ({
      ...prev,
      score: newScore,
      attempts: newAttempts,
      showResult: true,
      completedScenarios: newCompleted
    }));

    // Auto-advance after showing result
    setTimeout(() => {
      if (gameState.currentScenario < scenarios.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentScenario: prev.currentScenario + 1,
          selectedCategory: null,
          showResult: false
        }));
      } else {
        // Game completed
        setGameState(prev => ({ ...prev, gameCompleted: true }));
        onComplete(Math.round((newScore / scenarios.length) * 100));
      }
    }, 3000);
  };

  const resetGame = () => {
    setGameState({
      currentScenario: 0,
      score: 0,
      attempts: 0,
      showResult: false,
      selectedCategory: null,
      completedScenarios: [],
      gameCompleted: false
    });
  };

  const accuracy = gameState.attempts > 0 ? Math.round((gameState.score / gameState.attempts) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              🕵️ Deal Type Detective
              <Badge variant="outline">
                {gameState.currentScenario + 1}/{scenarios.length}
              </Badge>
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetGame}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button variant="ghost" size="sm" onClick={onExit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Score: {gameState.score}/{gameState.attempts}</span>
            <span>Accuracy: {accuracy}%</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!gameState.gameCompleted ? (
            <>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Business Scenario:</h3>
                <p className="text-lg">{currentScenario.text}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">What type of deal is this?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={gameState.selectedCategory === category ? "default" : "outline"}
                      className="h-auto p-4 text-center"
                      onClick={() => handleCategorySelect(category)}
                      disabled={gameState.showResult}
                    >
                      <div>
                        <div className="font-semibold">{category}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {category === 'IPO' && 'Going Public'}
                          {category === 'M&A' && 'Mergers & Acquisitions'}
                          {category === 'Financing' && 'Raising Capital'}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {gameState.showResult && (
                <div className={`p-4 rounded-lg border ${
                  gameState.selectedCategory === currentScenario.category
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {gameState.selectedCategory === currentScenario.category ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                    <span className="font-semibold">
                      {gameState.selectedCategory === currentScenario.category ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p>{currentScenario.explanation}</p>
                  {gameState.currentScenario < scenarios.length - 1 && (
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <span>Next scenario in 3 seconds...</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              )}

              <Button 
                onClick={handleSubmit}
                disabled={!gameState.selectedCategory || gameState.showResult}
                className="w-full"
                size="lg"
              >
                Submit Answer
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-2">🎉 Game Complete!</h3>
                <p className="text-green-700 mb-4">
                  You completed all scenarios with {accuracy}% accuracy!
                </p>
                <p className="text-green-600">You've earned 75 XP!</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-2xl">{gameState.score}</div>
                  <div className="text-muted-foreground">Correct</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-2xl">{scenarios.length - gameState.score}</div>
                  <div className="text-muted-foreground">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-2xl">{accuracy}%</div>
                  <div className="text-muted-foreground">Accuracy</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DealTypeDetective;
