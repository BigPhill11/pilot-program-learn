import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, Star } from 'lucide-react';
import { VCFlashcard as FlashcardType } from '@/data/venture-capital-journey-data';

interface VCFlashcardProps {
  flashcards: FlashcardType[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onComplete: () => void;
  levelId: number;
}

const VCFlashcard: React.FC<VCFlashcardProps> = ({ 
  flashcards, 
  currentIndex, 
  onIndexChange, 
  onComplete,
  levelId 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [masteredTerms, setMasteredTerms] = useState<Set<string>>(new Set());

  // Load mastered terms from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`vc-mastered-terms-level-${levelId}`);
    if (saved) {
      setMasteredTerms(new Set(JSON.parse(saved)));
    }
  }, [levelId]);

  // Save mastered terms to localStorage
  const saveMasteredTerms = (terms: Set<string>) => {
    localStorage.setItem(`vc-mastered-terms-level-${levelId}`, JSON.stringify(Array.from(terms)));
  };

  const handleMarkAsMastered = () => {
    const currentTerm = flashcards[currentIndex].term;
    const newMasteredTerms = new Set(masteredTerms);
    newMasteredTerms.add(currentTerm);
    setMasteredTerms(newMasteredTerms);
    saveMasteredTerms(newMasteredTerms);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setStudiedCards(prev => new Set(prev).add(currentIndex));
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % flashcards.length;
    onIndexChange(nextIndex);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? flashcards.length - 1 : currentIndex - 1;
    onIndexChange(prevIndex);
    setIsFlipped(false);
  };

  const currentCard = flashcards[currentIndex];
  const progressPercentage = (studiedCards.size / flashcards.length) * 100;
  const masteryPercentage = (masteredTerms.size / flashcards.length) * 100;
  const allStudied = studiedCards.size === flashcards.length;
  const allMastered = masteredTerms.size === flashcards.length;
  const isCurrentMastered = masteredTerms.has(currentCard.term);

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Flashcard Progress</span>
            <Badge variant="outline">
              {currentIndex + 1} of {flashcards.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Studied: {studiedCards.size}/{flashcards.length}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Mastered: {masteredTerms.size}/{flashcards.length}</span>
              <span>{Math.round(masteryPercentage)}%</span>
            </div>
            <Progress value={masteryPercentage} className="h-2 bg-golden/20">
              <div 
                className="h-full bg-golden transition-all duration-300" 
                style={{ width: `${masteryPercentage}%` }}
              />
            </Progress>
          </div>
        </CardContent>
      </Card>

      {/* Main Flashcard */}
      <Card className="min-h-[300px] cursor-pointer" onClick={handleFlip}>
        <CardContent className="flex flex-col justify-center items-center text-center p-8 min-h-[300px]">
          <div className="w-full">
            {!isFlipped ? (
              <div className="space-y-4">
                <div className="flex justify-center items-center gap-2 mb-4">
                  <Badge variant="outline">Term</Badge>
                  {isCurrentMastered && <Star className="h-5 w-5 text-golden fill-golden" />}
                </div>
                <h2 className="text-2xl font-bold">{currentCard.term}</h2>
                <p className="text-muted-foreground">Click to reveal definition</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Badge variant="secondary">Definition</Badge>
                <p className="text-lg leading-relaxed">{currentCard.definition}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <Button variant="outline" onClick={handleFlip}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Flip
          </Button>
        </div>

        <div className="flex gap-2">
          {isFlipped && !isCurrentMastered && (
            <Button onClick={handleMarkAsMastered} className="bg-golden hover:bg-golden/90">
              <Star className="h-4 w-4 mr-1" />
              Mark as Mastered
            </Button>
          )}
          
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Completion Status */}
      {allStudied && (
        <Card className={allMastered ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}>
          <CardContent className="text-center py-6">
            {allMastered ? (
              <>
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">All Terms Mastered! 🎉</h3>
                <p className="text-green-600 mb-4">You've mastered all flashcards in this level.</p>
                <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                  Complete Flashcards
                </Button>
              </>
            ) : (
              <>
                <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-blue-800 mb-2">All Cards Studied!</h3>
                <p className="text-blue-600 mb-4">
                  Great job! You've studied all cards. Keep reviewing to master them all.
                </p>
                <Button onClick={onComplete} variant="outline">
                  Save Progress
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Navigation Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {flashcards.map((_, index) => (
              <Button
                key={index}
                variant={currentIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onIndexChange(index);
                  setIsFlipped(false);
                }}
                className="relative"
              >
                {index + 1}
                {studiedCards.has(index) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                )}
                {masteredTerms.has(flashcards[index].term) && (
                  <Star className="absolute -top-1 -right-1 w-3 h-3 text-golden fill-golden" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VCFlashcard;