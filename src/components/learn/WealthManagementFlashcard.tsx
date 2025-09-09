import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface Flashcard {
  term: string;
  definition: string;
}

interface WealthManagementFlashcardProps {
  flashcards: Flashcard[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onComplete: () => void;
}

const WealthManagementFlashcard: React.FC<WealthManagementFlashcardProps> = ({
  flashcards,
  currentIndex,
  onIndexChange,
  onComplete
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      const newStudied = new Set(studiedCards);
      newStudied.add(currentIndex);
      setStudiedCards(newStudied);
      
      if (newStudied.size === flashcards.length) {
        setTimeout(() => onComplete(), 500);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      onIndexChange(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const allStudied = studiedCards.size === flashcards.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">Flashcards</h3>
        <p className="text-muted-foreground">
          Card {currentIndex + 1} of {flashcards.length} • 
          Studied: {studiedCards.size}/{flashcards.length}
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-md h-64">
          <Card 
            className={`absolute inset-0 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            } bg-emerald-50 border-emerald-200 hover:shadow-lg`}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <CardContent className="flex items-center justify-center h-full p-6 backface-hidden">
              <div className="text-center">
                <div className="text-sm text-emerald-600 font-medium mb-2">TERM</div>
                <h4 className="text-xl font-bold text-emerald-800">{currentCard.term}</h4>
                <p className="text-xs text-muted-foreground mt-4">Click to see definition</p>
              </div>
            </CardContent>

            {/* Back of card */}
            <CardContent className="flex items-center justify-center h-full p-6 absolute inset-0 backface-hidden rotate-y-180 bg-teal-50 border-teal-200">
              <div className="text-center">
                <div className="text-sm text-teal-600 font-medium mb-2">DEFINITION</div>
                <p className="text-sm text-teal-800 leading-relaxed">{currentCard.definition}</p>
                <p className="text-xs text-muted-foreground mt-4">Click to see term</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFlipped(false)}
          disabled={!isFlipped}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {allStudied && (
        <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-emerald-800 font-medium">
            🎉 Great job! You've studied all the flashcards.
          </p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {flashcards.map((_, index) => (
          <Button
            key={index}
            variant={currentIndex === index ? "default" : "outline"}
            size="sm"
            className={`h-8 ${
              studiedCards.has(index) 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                : currentIndex === index 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : ''
            }`}
            onClick={() => {
              onIndexChange(index);
              setIsFlipped(false);
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WealthManagementFlashcard;