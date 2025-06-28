
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Plus, RotateCcw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import FlashcardUploader from './flashcards/FlashcardUploader';
import FlashcardDeck from './flashcards/FlashcardDeck';

const FlashcardsSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');
  const [showUploader, setShowUploader] = useState(false);
  const isMobile = useIsMobile();

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-500' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
    { value: 'pro', label: 'Pro', color: 'bg-red-500' }
  ] as const;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                Flashcards
                <Badge variant="outline">Study Mode</Badge>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Upload your own flashcard sets or study from existing decks
              </p>
            </div>
            <Button 
              onClick={() => setShowUploader(!showUploader)}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {isMobile ? 'Upload' : 'Upload CSV'}
            </Button>
          </div>
        </CardHeader>
        
        {showUploader && (
          <CardContent className="border-t">
            <FlashcardUploader onUploadComplete={() => setShowUploader(false)} />
          </CardContent>
        )}
      </Card>

      {/* Level Selection */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        {levels.map((level) => (
          <Card 
            key={level.value}
            className={`cursor-pointer transition-all ${
              selectedLevel === level.value 
                ? 'ring-2 ring-primary border-primary' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedLevel(level.value)}
          >
            <CardContent className="p-4 text-center">
              <Badge className={`${level.color} text-white mb-2`}>
                {level.label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {level.value === 'beginner' && 'Basic terms and concepts'}
                {level.value === 'intermediate' && 'Advanced terminology'}
                {level.value === 'pro' && 'Expert-level knowledge'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flashcard Deck */}
      <FlashcardDeck level={selectedLevel} />
    </div>
  );
};

export default FlashcardsSection;
