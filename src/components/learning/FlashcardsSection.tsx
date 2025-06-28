
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Upload, Settings, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import FlashcardUploader from './flashcards/FlashcardUploader';
import FlashcardDeck from './flashcards/FlashcardDeck';
import FlashcardManager from './flashcards/FlashcardManager';

const FlashcardsSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');
  const [refreshKey, setRefreshKey] = useState(0);
  const isMobile = useIsMobile();

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-500' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
    { value: 'pro', label: 'Pro', color: 'bg-red-500' }
  ] as const;

  const handleUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Flashcards
            <Badge variant="outline">Study Mode</Badge>
          </CardTitle>
          <p className="text-muted-foreground mt-1">
            Upload, manage, and study with interactive flashcard sets
          </p>
        </CardHeader>
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="study" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="study" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Study
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Manage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="mt-6">
          <FlashcardDeck key={refreshKey} level={selectedLevel} />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Flashcards</CardTitle>
              <p className="text-muted-foreground">
                Add new flashcards via CSV upload or create individual cards
              </p>
            </CardHeader>
            <CardContent>
              <FlashcardUploader onUploadComplete={handleUpdate} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <FlashcardManager level={selectedLevel} onUpdate={handleUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsSection;
