
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Play, Timer } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MatchingGame from './matching/MatchingGame';

const MatchingGameSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');
  const [activeGame, setActiveGame] = useState(false);
  const isMobile = useIsMobile();

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-500', pairs: 6 },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500', pairs: 8 },
    { value: 'pro', label: 'Pro', color: 'bg-red-500', pairs: 12 }
  ] as const;

  if (activeGame) {
    return (
      <MatchingGame 
        level={selectedLevel} 
        onComplete={() => setActiveGame(false)}
        onExit={() => setActiveGame(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="h-5 w-5" />
            Matching Game
            <Badge variant="outline">Game Mode</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Match terms with their definitions in this fast-paced game
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
            <CardContent className="p-6 text-center">
              <Badge className={`${level.color} text-white mb-3`}>
                {level.label}
              </Badge>
              <h3 className="font-semibold mb-2">{level.pairs} Pairs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {level.value === 'beginner' && 'Basic matching with hints'}
                {level.value === 'intermediate' && 'Timed matching challenge'}
                {level.value === 'pro' && 'Expert speed matching'}
              </p>
              <Button 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGame(true);
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Game
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Game Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Game Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">0</div>
              <div className="text-sm text-muted-foreground">Games Played</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">--</div>
              <div className="text-sm text-muted-foreground">Best Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">0</div>
              <div className="text-sm text-muted-foreground">Perfect Games</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">0%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchingGameSection;
