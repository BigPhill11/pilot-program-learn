
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Trophy } from 'lucide-react';

interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  analogy?: string;
  real_world_example?: string;
  category: string;
  difficulty_level: string;
}

interface MatchingGameProps {
  terms: FinancialTerm[];
  userLevel: string;
}

interface MatchItem {
  id: string;
  content: string;
  type: 'term' | 'definition';
  termId: string;
  matched: boolean;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ terms, userLevel }) => {
  const [gameItems, setGameItems] = useState<MatchItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<MatchItem[]>([]);
  const [matches, setMatches] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Filter terms by user level
  const levelFilteredTerms = terms.filter(term => 
    userLevel === 'advanced' || term.difficulty_level === userLevel || 
    (userLevel === 'intermediate' && term.difficulty_level === 'beginner')
  );

  const initializeGame = () => {
    const gameTerms = levelFilteredTerms
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(6, levelFilteredTerms.length));

    const items: MatchItem[] = [];
    
    gameTerms.forEach(term => {
      items.push({
        id: `term-${term.id}`,
        content: term.term,
        type: 'term',
        termId: term.id,
        matched: false
      });
      items.push({
        id: `def-${term.id}`,
        content: term.definition,
        type: 'definition',
        termId: term.id,
        matched: false
      });
    });

    setGameItems(items.sort(() => Math.random() - 0.5));
    setSelectedItems([]);
    setMatches(new Set());
    setScore(0);
    setGameComplete(false);
  };

  useEffect(() => {
    if (levelFilteredTerms.length > 0) {
      initializeGame();
    }
  }, [levelFilteredTerms]);

  const handleItemClick = (item: MatchItem) => {
    if (item.matched || selectedItems.length >= 2) return;

    const newSelected = [...selectedItems, item];
    setSelectedItems(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      
      if (first.termId === second.termId && first.type !== second.type) {
        // Match found!
        setTimeout(() => {
          setMatches(prev => new Set([...prev, first.termId]));
          setGameItems(prev => prev.map(gameItem => 
            gameItem.termId === first.termId 
              ? { ...gameItem, matched: true }
              : gameItem
          ));
          setScore(prev => prev + 1);
          setSelectedItems([]);
          
          // Check if game is complete
          const totalPairs = gameItems.length / 2;
          if (matches.size + 1 >= totalPairs) {
            setGameComplete(true);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setSelectedItems([]);
        }, 1000);
      }
    }
  };

  const isSelected = (item: MatchItem) => {
    return selectedItems.some(selected => selected.id === item.id);
  };

  const getItemStyle = (item: MatchItem) => {
    if (item.matched) return 'bg-green-100 border-green-500 text-green-700';
    if (isSelected(item)) return 'bg-blue-100 border-blue-500 text-blue-700';
    return 'hover:bg-gray-50 border-gray-200';
  };

  if (levelFilteredTerms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No terms available for matching game.</p>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Congratulations!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl mb-4">🎯</div>
          <div className="text-xl">
            You matched all {score} pairs correctly!
          </div>
          <Button onClick={initializeGame} size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Match the terms with their definitions
        </div>
        <div className="flex gap-4 items-center">
          <Badge variant="secondary">
            Matches: {matches.size} / {gameItems.length / 2}
          </Badge>
          <Button variant="outline" onClick={initializeGame}>
            <RefreshCw className="h-4 w-4 mr-1" />
            New Game
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gameItems.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all duration-200 ${getItemStyle(item)}`}
            onClick={() => handleItemClick(item)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={item.type === 'term' ? 'default' : 'outline'} className="text-xs">
                  {item.type === 'term' ? 'Term' : 'Definition'}
                </Badge>
                {item.matched && (
                  <div className="text-green-500">✓</div>
                )}
              </div>
              <p className={`text-sm leading-relaxed ${
                item.type === 'term' ? 'font-semibold text-lg' : ''
              }`}>
                {item.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Click on a term and its matching definition to score points!
      </div>
    </div>
  );
};

export default MatchingGame;
