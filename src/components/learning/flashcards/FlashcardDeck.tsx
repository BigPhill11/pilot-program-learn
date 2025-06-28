
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Lightbulb, Globe } from 'lucide-react';

interface Flashcard {
  id?: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  level?: string;
}

interface FlashcardDeckProps {
  level: 'beginner' | 'intermediate' | 'pro';
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ level }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

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
          { 
            term: "Stock", 
            definition: "A share of ownership in a company",
            philExample: "Like owning a slice of pizza from the whole pizza! The more slices you have, the bigger your share of the pizza (company).",
            realWorldExample: "If you buy Apple stock, you own a tiny piece of Apple Inc. and can benefit from their success."
          },
          { 
            term: "Bond", 
            definition: "A loan to a company or government that pays interest",
            philExample: "It's like lending money to your friend, but they promise to pay you back with a little extra for being so nice!",
            realWorldExample: "US Treasury bonds are loans to the government that pay you interest over time."
          },
          { 
            term: "Dividend", 
            definition: "Payment made by companies to shareholders",
            philExample: "Like getting a thank-you gift from a company for believing in them and buying their stock!",
            realWorldExample: "Coca-Cola pays quarterly dividends to shareholders, sharing their profits."
          }
        ],
        intermediate: [
          { 
            term: "P/E Ratio", 
            definition: "Price-to-earnings ratio, a valuation metric",
            philExample: "It's like comparing how much you pay for a burger versus how satisfying it is - tells you if it's worth the price!",
            realWorldExample: "A P/E ratio of 15 means investors pay $15 for every $1 of annual earnings."
          },
          { 
            term: "Market Cap", 
            definition: "Total value of a company's shares",
            philExample: "If a company were a house, market cap would be its total asking price in the real estate market!",
            realWorldExample: "Apple's market cap of $3 trillion makes it one of the world's most valuable companies."
          },
          { 
            term: "Volatility", 
            definition: "Measure of price variation over time",
            philExample: "Like a roller coaster - some stocks are gentle kiddie rides, others are loop-de-loops!",
            realWorldExample: "Bitcoin is highly volatile, with prices that can swing 10%+ in a single day."
          }
        ],
        pro: [
          { 
            term: "Beta Coefficient", 
            definition: "Measure of stock's volatility relative to market",
            philExample: "It's like measuring how much a surfer moves compared to the ocean waves - some ride bigger waves than others!",
            realWorldExample: "A beta of 1.5 means the stock typically moves 50% more than the overall market."
          },
          { 
            term: "EBITDA", 
            definition: "Earnings before interest, taxes, depreciation, and amortization",
            philExample: "Like measuring how much money a lemonade stand makes before paying for the stand, permits, and wear-and-tear!",
            realWorldExample: "Tech companies often focus on EBITDA to show operational profitability excluding heavy depreciation."
          },
          { 
            term: "Free Cash Flow", 
            definition: "Cash generated after capital expenditures",
            philExample: "The money left in your piggy bank after buying everything you need to keep your business running!",
            realWorldExample: "Amazon's free cash flow shows how much cash they generate after investing in warehouses and technology."
          }
        ]
      };
      setFlashcards(defaultCards[level] || []);
    }
    setCurrentIndex(0);
    setShowDefinition(false);
    setShowExamples(false);
  }, [level]);

  const shuffleCards = () => {
    const shuffledCards = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledCards);
    setCurrentIndex(0);
    setShowDefinition(false);
    setShowExamples(false);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setShowDefinition(false);
    setShowExamples(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowDefinition(false);
    setShowExamples(false);
  };

  const resetCard = () => {
    setShowDefinition(false);
    setShowExamples(false);
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
          <Button size="sm" variant="outline" onClick={resetCard}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="min-h-[400px] cursor-pointer" onClick={() => !showDefinition && setShowDefinition(true)}>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">{currentCard.term}</h3>
            
            {!showDefinition && (
              <p className="text-muted-foreground">Click to reveal definition</p>
            )}
            
            {showDefinition && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg font-medium">{currentCard.definition}</p>
                </div>
                
                {(currentCard.philExample || currentCard.realWorldExample) && (
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowExamples(!showExamples);
                    }}
                    className="mt-4"
                  >
                    {showExamples ? 'Hide Examples' : 'Show Examples'}
                  </Button>
                )}
                
                {showExamples && (
                  <div className="grid gap-4 mt-4">
                    {currentCard.philExample && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-yellow-600" />
                          <span className="font-semibold text-yellow-800">Phil's Example</span>
                        </div>
                        <p className="text-sm text-yellow-700 italic">{currentCard.philExample}</p>
                      </div>
                    )}
                    
                    {currentCard.realWorldExample && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-800">Real World Example</span>
                        </div>
                        <p className="text-sm text-green-700">{currentCard.realWorldExample}</p>
                      </div>
                    )}
                  </div>
                )}
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
