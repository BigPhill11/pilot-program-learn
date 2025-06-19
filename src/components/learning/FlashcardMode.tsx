
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from 'lucide-react';

interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  analogy?: string;
  real_world_example?: string;
  category: string;
  difficulty_level: string;
}

interface FlashcardModeProps {
  terms: FinancialTerm[];
  userLevel: string;
  selectedDifficulty: string;
}

const FlashcardMode: React.FC<FlashcardModeProps> = ({ terms, userLevel, selectedDifficulty }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledTerms, setShuffledTerms] = useState<FinancialTerm[]>([]);
  const [masteredTerms, setMasteredTerms] = useState<Set<string>>(new Set());

  // Filter terms based on selected difficulty
  const filteredTerms = useMemo(() => {
    if (!terms || !Array.isArray(terms)) return [];
    
    let filtered = terms;
    
    if (selectedDifficulty !== 'all') {
      filtered = terms.filter(term => term.difficulty_level === selectedDifficulty);
    } else {
      // If 'all' is selected, still respect user level for beginners
      if (userLevel === 'beginner') {
        filtered = terms.filter(term => term.difficulty_level === 'beginner');
      } else if (userLevel === 'intermediate') {
        filtered = terms.filter(term => 
          term.difficulty_level === 'beginner' || term.difficulty_level === 'intermediate'
        );
      }
      // Advanced users see all terms when 'all' is selected
    }
    
    return filtered;
  }, [terms, selectedDifficulty, userLevel]);

  // Initialize shuffled terms
  useEffect(() => {
    if (filteredTerms.length > 0) {
      const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5);
      setShuffledTerms(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [filteredTerms]);

  const currentTerm = shuffledTerms[currentIndex];

  const shuffleTerms = () => {
    if (filteredTerms.length > 0) {
      const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5);
      setShuffledTerms(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledTerms.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + shuffledTerms.length) % shuffledTerms.length);
    setIsFlipped(false);
  };

  const markAsMastered = (termId: string) => {
    setMasteredTerms(prev => new Set([...prev, termId]));
  };

  if (!terms || terms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading terms...</p>
      </div>
    );
  }

  if (!currentTerm || shuffledTerms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No terms available for the selected difficulty level.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {shuffledTerms.length}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={shuffleTerms}>
            <Shuffle className="h-4 w-4 mr-1" />
            Shuffle
          </Button>
          <Badge variant="secondary">
            {currentTerm.difficulty_level}
          </Badge>
        </div>
      </div>

      <div className="perspective-1000 max-w-2xl mx-auto">
        <div 
          className={`relative w-full h-80 transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <Card className="absolute inset-0 backface-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">{currentTerm.term}</h2>
              <Badge className="mb-4">{currentTerm.category}</Badge>
              <p className="text-muted-foreground">Click to reveal definition</p>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card className="absolute inset-0 backface-hidden rotate-y-180 border-2 border-green-500/30 bg-green-50">
            <CardContent className="flex flex-col justify-between h-full p-6">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-lg leading-relaxed mb-4">{currentTerm.definition}</p>
                {currentTerm.analogy && (
                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <p className="text-sm font-medium text-blue-700 mb-1">💡 Analogy:</p>
                    <p className="text-sm text-blue-600">{currentTerm.analogy}</p>
                  </div>
                )}
                {currentTerm.real_world_example && (
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-700 mb-1">🌟 Example:</p>
                    <p className="text-sm text-green-600">{currentTerm.real_world_example}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Flip Back
                </Button>
                <Button
                  variant={masteredTerms.has(currentTerm.id) ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsMastered(currentTerm.id);
                  }}
                >
                  {masteredTerms.has(currentTerm.id) ? "✓ Mastered" : "Mark as Learned"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={prevCard} variant="outline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button onClick={nextCard}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Mastered: {masteredTerms.size} / {shuffledTerms.length} terms
      </div>
    </div>
  );
};

export default FlashcardMode;
