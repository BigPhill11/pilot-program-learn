
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle, RotateCcw } from 'lucide-react';
import { getIBTermsForLevel } from '@/data/investment-banking-terms';
import { useAuth } from '@/hooks/useAuth';
import HighlightableTerm from '@/components/HighlightableTerm';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface WallStreetWordMatchProps {
  onComplete: (gameId: string) => void;
  isCompleted: boolean;
}

const WallStreetWordMatch: React.FC<WallStreetWordMatchProps> = ({ onComplete, isCompleted }) => {
  const { profile } = useAuth();
  const { updateActivityComplete } = useProgressTracking();
  const userLevel = profile?.app_version || 'beginner';
  const ibTerms = getIBTermsForLevel(userLevel);
  
  // Get appropriate terms for the game
  const gameTerms = Object.entries(ibTerms).slice(0, 6);
  
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matches, setMatches] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [shuffledTerms, setShuffledTerms] = useState<Array<[string, any]>>([]);
  const [shuffledDefinitions, setShuffledDefinitions] = useState<Array<[string, any]>>([]);

  useEffect(() => {
    shuffleGame();
  }, []);

  const shuffleGame = () => {
    const shuffled1 = [...gameTerms].sort(() => Math.random() - 0.5);
    const shuffled2 = [...gameTerms].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled1);
    setShuffledDefinitions(shuffled2);
  };

  const handleTermClick = (termKey: string) => {
    if (matches.has(termKey) || gameCompleted) return;
    
    if (selectedTerm === termKey) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(termKey);
    }
  };

  const handleDefinitionClick = (termKey: string) => {
    if (matches.has(termKey) || gameCompleted) return;
    
    if (selectedDefinition === termKey) {
      setSelectedDefinition(null);
    } else {
      setSelectedDefinition(termKey);
      
      if (selectedTerm) {
        setAttempts(prev => prev + 1);
        
        if (selectedTerm === termKey) {
          // Correct match
          const newMatches = new Set([...matches, termKey]);
          setMatches(newMatches);
          setScore(prev => prev + 10);
          setSelectedTerm(null);
          setSelectedDefinition(null);
          
          if (newMatches.size === gameTerms.length) {
            setGameCompleted(true);
            const finalScore = score + 10;
            const bonusPoints = attempts < gameTerms.length * 1.5 ? 25 : 15;
            updateActivityComplete('wall-street-word-match', bonusPoints);
            onComplete('wall-street-word-match');
          }
        } else {
          // Incorrect match
          setTimeout(() => {
            setSelectedTerm(null);
            setSelectedDefinition(null);
          }, 1000);
        }
      }
    }
  };

  const resetGame = () => {
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setMatches(new Set());
    setScore(0);
    setAttempts(0);
    setGameCompleted(false);
    shuffleGame();
  };

  const getButtonClass = (termKey: string, isDefinition: boolean = false) => {
    const isMatched = matches.has(termKey);
    const isSelected = isDefinition ? selectedDefinition === termKey : selectedTerm === termKey;
    
    if (isMatched) return "bg-green-500 text-white cursor-default";
    if (isSelected) return "bg-blue-500 text-white";
    return "bg-white hover:bg-gray-100 border-2 border-gray-200";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Wall Street Word Match</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-normal">Score: {score}</span>
            <span className="text-sm font-normal">Attempts: {attempts}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {gameCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
            <p className="text-green-700">
              You matched all terms! Final Score: {score} points
            </p>
          </div>
        )}

        <div className="flex justify-center gap-2 mb-6">
          <Button onClick={shuffleGame} variant="outline" size="sm">
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-center">Terms</h3>
            <div className="space-y-2">
              {shuffledTerms.map(([termKey, termData]) => (
                <Button
                  key={`term-${termKey}`}
                  onClick={() => handleTermClick(termKey)}
                  className={`w-full p-4 h-auto text-left justify-start text-wrap break-words whitespace-normal ${getButtonClass(termKey)}`}
                  variant="outline"
                  disabled={matches.has(termKey) || gameCompleted}
                >
                  <HighlightableTerm
                    term={termData.term}
                    definition={termData.definition}
                    analogy={termData.analogy}
                  >
                    <span className="font-medium">
                      {termData.term}
                    </span>
                  </HighlightableTerm>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-center">Definitions</h3>
            <div className="space-y-2">
              {shuffledDefinitions.map(([termKey, termData]) => (
                <Button
                  key={`def-${termKey}`}
                  onClick={() => handleDefinitionClick(termKey)}
                  className={`w-full p-4 h-auto text-left justify-start text-wrap break-words whitespace-normal ${getButtonClass(termKey, true)}`}
                  variant="outline"
                  disabled={matches.has(termKey) || gameCompleted}
                >
                  <span className="text-sm leading-relaxed">
                    {termData.definition}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Click a term, then click its matching definition. Hover over terms to see Phil's explanations!
        </div>
      </CardContent>
    </Card>
  );
};

export default WallStreetWordMatch;
