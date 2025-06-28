
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from 'lucide-react';

interface Flashcard {
  term: string;
  definition: string;
}

interface FlashcardDeckProps {
  level: 'beginner' | 'intermediate' | 'pro';
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ level }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  useEffect(() => {
    // Load flashcards from localStorage
    const storageKey = `flashcards_${level}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setFlashcards(JSON.parse(stored));
    } else {
      // Default flashcards for demo
      const defaultCards: Record<string, Flashcard[]> = {
        beginner: [
          { term: "Stock", definition: "A share of ownership in a company" },
          { term: "Bond", definition: "A loan to a company or government that pays interest" },
          { term: "Dividend", definition: "Payment made by companies to shareholders" }
        ],
        intermediate: [
          { term: "P/E Ratio", definition: "Price-to-earnings ratio, a valuation metric" },
          { term: "Market Cap", definition: "Total value of a company's shares" },
          { term: "Volatility", definition: "Measure of price variation over time" }
        ],
        pro: [
          { term: "Beta Coefficient", definition: "Measure of stock's volatility relative to market" },
          { term: "EBITDA", definition: "Earnings before interest, taxes, depreciation, and amortization" },
          { term: "Free Cash Flow", definition: "Cash generated after capital expenditures" }
        ]
      };
      setFlashcards(defaultCards[level] || []);
    }
    setCurrentIndex(0);
    setShowDefinition(false);
  }, [level]);

  const shuffleCards = () => {
    const shuffledCards = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledCards);
    setCurrentIndex(0);
    setShowDefinition(false);
    setShuffled(true);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setShowDefinition(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowDefinition(false);
  };

  if (flashcards.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            No flashcards available for {level} level. Upload some flashcards to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          {currentIndex + 1} of {flashcards.length}
        </Badge>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={shuffleCards}>
            <Shuffle className="h-4 w-4 mr-1" />
            Shuffle
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowDefinition(false)}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="min-h-[300px] cursor-pointer" onClick={() => setShowDefinition(!showDefinition)}>
        <CardContent className="p-8 flex items-center justify-center text-center">
          <div>
            {!showDefinition ? (
              <div>
                <h3 className="text-2xl font-bold mb-4">{currentCard.term}</h3>
                <p className="text-muted-foreground">Click to reveal definition</p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-muted-foreground">{currentCard.term}</h3>
                <p className="text-xl">{currentCard.definition}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button onClick={prevCard} disabled={flashcards.length <= 1}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button onClick={nextCard} disabled={flashcards.length <= 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default FlashcardDeck;
