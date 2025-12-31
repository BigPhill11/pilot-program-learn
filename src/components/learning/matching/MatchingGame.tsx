
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Timer, CheckCircle } from 'lucide-react';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { PLATFORM_REWARDS } from '@/config/gameConfig';
import { getFlashcardsByCategory } from '@/data/flashcard-categories';

interface MatchingGameProps {
  level: 'beginner' | 'intermediate' | 'pro';
  onComplete: () => void;
  onExit: () => void;
}

interface MatchingPair {
  id: string;
  term: string;
  definition: string;
  matched: boolean;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ level, onComplete, onExit }) => {
  const [pairs, setPairs] = useState<MatchingPair[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Platform integration for Bamboo Empire rewards
  const { awardResources } = usePlatformIntegration();
  const rewardedRef = useRef(false);

  // Memoize shuffled definitions to prevent re-shuffling
  const shuffledDefinitions = useMemo(() => {
    if (pairs.length === 0) return [];
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [pairs.length]);

  useEffect(() => {
    initializeGame();
  }, [level]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && matches < pairs.length) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, matches, pairs.length]);

  const initializeGame = () => {
    const pairCounts = { beginner: 6, intermediate: 8, pro: 12 };
    const pairCount = pairCounts[level];

    // Get Personal Finance flashcards from the unified system
    const flashcards = getFlashcardsByCategory('personal-finance');
    
    // Filter by difficulty level
    const filteredCards = flashcards.filter(card => card.level === level);
    
    // Use all cards if not enough at the specific level
    const availableCards = filteredCards.length >= pairCount ? filteredCards : flashcards;
    
    let gamePairs: MatchingPair[];
    
    if (availableCards.length >= pairCount) {
      // Shuffle and select cards
      const shuffledCards = [...availableCards].sort(() => Math.random() - 0.5);
      gamePairs = shuffledCards.slice(0, pairCount).map((card, index) => ({
        id: `pair-${index}`,
        term: card.term,
        definition: card.definition,
        matched: false
      }));
    } else {
      // Fallback to default pairs
      const defaultPairs: Record<string, MatchingPair[]> = {
        beginner: [
          { id: '1', term: 'Budget', definition: 'A plan for managing income and expenses', matched: false },
          { id: '2', term: 'Savings', definition: 'Money set aside for future use', matched: false },
          { id: '3', term: 'Income', definition: 'Money received from work or investments', matched: false },
          { id: '4', term: 'Expense', definition: 'Money spent on goods or services', matched: false },
          { id: '5', term: 'Interest', definition: 'Cost of borrowing or reward for saving', matched: false },
          { id: '6', term: 'Credit Score', definition: 'Number representing creditworthiness', matched: false }
        ],
        intermediate: [
          { id: '1', term: 'Emergency Fund', definition: 'Savings for unexpected expenses', matched: false },
          { id: '2', term: 'Net Worth', definition: 'Assets minus liabilities', matched: false },
          { id: '3', term: 'Compound Interest', definition: 'Interest on interest earned', matched: false },
          { id: '4', term: 'Debt-to-Income', definition: 'Ratio of debt payments to income', matched: false },
          { id: '5', term: 'Tax Deduction', definition: 'Expense that reduces taxable income', matched: false },
          { id: '6', term: 'Retirement Account', definition: 'Tax-advantaged savings for retirement', matched: false },
          { id: '7', term: 'Insurance Premium', definition: 'Regular payment for coverage', matched: false },
          { id: '8', term: 'Investment Return', definition: 'Profit or loss from an investment', matched: false }
        ],
        pro: [
          { id: '1', term: 'Asset Allocation', definition: 'Distribution of investments across categories', matched: false },
          { id: '2', term: 'Tax-Loss Harvesting', definition: 'Selling losses to offset gains', matched: false },
          { id: '3', term: 'Rebalancing', definition: 'Adjusting portfolio to target allocation', matched: false },
          { id: '4', term: 'Dollar-Cost Averaging', definition: 'Investing fixed amounts regularly', matched: false },
          { id: '5', term: 'Marginal Tax Rate', definition: 'Tax rate on last dollar earned', matched: false },
          { id: '6', term: 'Capital Gains', definition: 'Profit from selling an asset', matched: false },
          { id: '7', term: 'Liquidity', definition: 'Ease of converting asset to cash', matched: false },
          { id: '8', term: 'Diversification', definition: 'Spreading risk across investments', matched: false },
          { id: '9', term: 'Inflation', definition: 'General increase in prices over time', matched: false },
          { id: '10', term: 'Opportunity Cost', definition: 'Value of next best alternative', matched: false },
          { id: '11', term: 'Time Value of Money', definition: 'Money today worth more than later', matched: false },
          { id: '12', term: 'Risk Tolerance', definition: 'Ability to handle investment volatility', matched: false }
        ]
      };
      gamePairs = defaultPairs[level] || [];
    }

    setPairs(gamePairs);
    setGameStarted(true);
  };

  const handleTermClick = (id: string, term: string) => {
    if (pairs.find(p => p.id === id)?.matched) return;
    setSelectedTerm(selectedTerm === id ? null : id);
    setSelectedDefinition(null);
  };

  const handleDefinitionClick = (id: string, definition: string) => {
    if (pairs.find(p => p.id === id)?.matched) return;
    
    if (selectedTerm) {
      setAttempts(prev => prev + 1);
      
      if (selectedTerm === id) {
        // Match found!
        setPairs(prev => prev.map(p => 
          p.id === id ? { ...p, matched: true } : p
        ));
        setMatches(prev => prev + 1);
        setSelectedTerm(null);
        
        if (matches + 1 === pairs.length) {
          // Award to Bamboo Empire on game completion
          if (!rewardedRef.current) {
            rewardedRef.current = true;
            awardResources(
              PLATFORM_REWARDS.matchingGameComplete,
              PLATFORM_REWARDS.matchingGameXp,
              'Matching Game',
              true
            );
          }
          setTimeout(onComplete, 1000);
        }
      } else {
        // Wrong match
        setSelectedTerm(null);
      }
    } else {
      setSelectedDefinition(selectedDefinition === id ? null : id);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracy = attempts > 0 ? Math.round((matches / attempts) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                Matching Game - {level}
                <Badge variant="outline">
                  {matches}/{pairs.length} matched
                </Badge>
              </CardTitle>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  {formatTime(timeElapsed)}
                </span>
                <span>Accuracy: {accuracy}%</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onExit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Terms Column */}
            <div>
              <h3 className="font-semibold mb-4 text-center">Terms</h3>
              <div className="space-y-2">
                {pairs.map((pair) => (
                  <Button
                    key={`term-${pair.id}`}
                    variant={
                      pair.matched ? "secondary" : 
                      selectedTerm === pair.id ? "default" : "outline"
                    }
                    className={`w-full justify-start h-auto p-4 text-left break-words whitespace-normal ${
                      pair.matched ? 'opacity-50' : ''
                    }`}
                    onClick={() => handleTermClick(pair.id, pair.term)}
                    disabled={pair.matched}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {pair.matched && <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />}
                      <span className="text-wrap">{pair.term}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Definitions Column - Use memoized shuffled order */}
            <div>
              <h3 className="font-semibold mb-4 text-center">Definitions</h3>
              <div className="space-y-2">
                {shuffledDefinitions.map((pair) => (
                  <Button
                    key={`def-${pair.id}`}
                    variant={
                      pair.matched ? "secondary" : 
                      selectedDefinition === pair.id ? "default" : "outline"
                    }
                    className={`w-full justify-start h-auto p-4 text-left break-words whitespace-normal ${
                      pair.matched ? 'opacity-50' : ''
                    }`}
                    onClick={() => handleDefinitionClick(pair.id, pair.definition)}
                    disabled={pair.matched}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {pair.matched && <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />}
                      <span className="text-wrap">{pair.definition}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {matches === pairs.length && pairs.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <h3 className="font-semibold text-green-800 mb-2">Congratulations! 🎉</h3>
              <p className="text-green-700">
                You completed the game in {formatTime(timeElapsed)} with {accuracy}% accuracy!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchingGame;
