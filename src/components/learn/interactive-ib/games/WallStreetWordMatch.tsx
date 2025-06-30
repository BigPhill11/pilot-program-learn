
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, RotateCcw } from 'lucide-react';

interface MatchPair {
  id: string;
  term: string;
  definition: string;
  analogy: string;
  matched: boolean;
}

interface WallStreetWordMatchProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const WallStreetWordMatch: React.FC<WallStreetWordMatchProps> = ({ onComplete, onExit }) => {
  const [pairs] = useState<MatchPair[]>([
    {
      id: '1',
      term: 'IPO',
      definition: 'When a company sells shares to the public for the first time',
      analogy: 'Like a lemonade stand going from neighborhood-only to stores everywhere!',
      matched: false
    },
    {
      id: '2',
      term: 'Merger',
      definition: 'Two companies combining to become one',
      analogy: 'Two friend groups becoming one big group!',
      matched: false
    },
    {
      id: '3',
      term: 'Stock',
      definition: 'A piece of ownership in a company',
      analogy: 'Like owning a slice of pizza!',
      matched: false
    },
    {
      id: '4',
      term: 'Client',
      definition: 'Company asking for investment banking help',
      analogy: 'A friend asking for important advice!',
      matched: false
    }
  ]);

  const [gameState, setGameState] = useState({
    selectedTerm: null as string | null,
    selectedDefinition: null as string | null,
    matches: 0,
    attempts: 0,
    showFeedback: false,
    feedbackMessage: '',
    isCorrect: false,
    matchedPairs: [] as string[]
  });

  const handleTermClick = (id: string) => {
    if (gameState.matchedPairs.includes(id)) return;
    
    setGameState(prev => ({
      ...prev,
      selectedTerm: prev.selectedTerm === id ? null : id,
      selectedDefinition: null,
      showFeedback: false
    }));
  };

  const handleDefinitionClick = (id: string) => {
    if (gameState.matchedPairs.includes(id)) return;

    if (gameState.selectedTerm) {
      const newAttempts = gameState.attempts + 1;
      const isMatch = gameState.selectedTerm === id;
      
      if (isMatch) {
        const newMatches = gameState.matches + 1;
        const newMatchedPairs = [...gameState.matchedPairs, id];
        
        setGameState(prev => ({
          ...prev,
          matches: newMatches,
          attempts: newAttempts,
          matchedPairs: newMatchedPairs,
          selectedTerm: null,
          showFeedback: true,
          feedbackMessage: `Correct! ${pairs.find(p => p.id === id)?.analogy}`,
          isCorrect: true
        }));

        if (newMatches === pairs.length) {
          setTimeout(() => {
            onComplete(Math.round((newMatches / newAttempts) * 100));
          }, 2000);
        }
      } else {
        setGameState(prev => ({
          ...prev,
          attempts: newAttempts,
          selectedTerm: null,
          showFeedback: true,
          feedbackMessage: 'Not quite right! Try again.',
          isCorrect: false
        }));
      }
    } else {
      setGameState(prev => ({
        ...prev,
        selectedDefinition: prev.selectedDefinition === id ? null : id
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      selectedTerm: null,
      selectedDefinition: null,
      matches: 0,
      attempts: 0,
      showFeedback: false,
      feedbackMessage: '',
      isCorrect: false,
      matchedPairs: []
    });
  };

  useEffect(() => {
    if (gameState.showFeedback) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, showFeedback: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState.showFeedback]);

  const accuracy = gameState.attempts > 0 ? Math.round((gameState.matches / gameState.attempts) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              🎯 Wall Street Word Match
              <Badge variant="outline">
                {gameState.matches}/{pairs.length} matched
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
            <span>Accuracy: {accuracy}%</span>
            <span>Attempts: {gameState.attempts}</span>
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
                      gameState.matchedPairs.includes(pair.id) ? "secondary" : 
                      gameState.selectedTerm === pair.id ? "default" : "outline"
                    }
                    className={`w-full justify-start h-auto p-4 text-left break-words whitespace-normal min-h-[60px] ${
                      gameState.matchedPairs.includes(pair.id) ? 'opacity-70' : ''
                    }`}
                    onClick={() => handleTermClick(pair.id)}
                    disabled={gameState.matchedPairs.includes(pair.id)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {gameState.matchedPairs.includes(pair.id) && 
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      }
                      <span className="font-semibold text-wrap">{pair.term}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Definitions Column */}
            <div>
              <h3 className="font-semibold mb-4 text-center">Definitions</h3>
              <div className="space-y-2">
                {pairs.map((pair) => (
                  <Button
                    key={`def-${pair.id}`}
                    variant={
                      gameState.matchedPairs.includes(pair.id) ? "secondary" : 
                      gameState.selectedDefinition === pair.id ? "default" : "outline"
                    }
                    className={`w-full justify-start h-auto p-4 text-left break-words whitespace-normal min-h-[60px] ${
                      gameState.matchedPairs.includes(pair.id) ? 'opacity-70' : ''
                    }`}
                    onClick={() => handleDefinitionClick(pair.id)}
                    disabled={gameState.matchedPairs.includes(pair.id)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {gameState.matchedPairs.includes(pair.id) && 
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      }
                      <span className="text-wrap">{pair.definition}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {gameState.showFeedback && (
            <div className={`mt-4 p-4 rounded-lg border break-words ${
              gameState.isCorrect 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <p className="font-medium whitespace-pre-wrap">{gameState.feedbackMessage}</p>
            </div>
          )}

          {gameState.matches === pairs.length && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <h3 className="font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
              <p className="text-green-700">
                You matched all terms with {accuracy}% accuracy! You've earned 50 XP!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WallStreetWordMatch;
