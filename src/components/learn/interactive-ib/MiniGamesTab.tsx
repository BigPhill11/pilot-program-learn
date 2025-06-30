import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Play, Trophy, ArrowLeft } from 'lucide-react';
import { MiniGameConfig } from '@/data/investment-banking-lessons';
import WallStreetWordMatch from './games/WallStreetWordMatch';
import DealTypeDetective from './games/DealTypeDetective';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface MiniGamesTabProps {
  filteredMiniGames: MiniGameConfig[];
  completedActivities: string[];
  onActivityComplete: (activityId: string) => void;
}

const MiniGamesTab: React.FC<MiniGamesTabProps> = ({ 
  filteredMiniGames, 
  completedActivities, 
  onActivityComplete 
}) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { updateActivityComplete } = useProgressTracking();

  const handleGameComplete = (gameId: string, score: number) => {
    console.log(`Game ${gameId} completed with score: ${score}`);
    const xpReward = gameId === 'ib-basics-matching' ? 50 : 75;
    updateActivityComplete(gameId, xpReward);
    onActivityComplete(gameId);
    setActiveGame(null);
  };

  const handleGameExit = () => {
    setActiveGame(null);
  };

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
  };

  // If a game is active, render the game component
  if (activeGame === 'ib-basics-matching') {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleGameExit} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>
        <WallStreetWordMatch
          onComplete={(score) => handleGameComplete('ib-basics-matching', score)}
          onExit={handleGameExit}
        />
      </div>
    );
  }

  if (activeGame === 'deal-type-sorter') {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleGameExit} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>
        <DealTypeDetective
          onComplete={(score) => handleGameComplete('deal-type-sorter', score)}
          onExit={handleGameExit}
        />
      </div>
    );
  }

  // Default view - show game selection
  return (
    <div className="grid gap-6">
      {filteredMiniGames.map((game) => (
        <Card key={game.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Gamepad2 className="h-5 w-5 text-primary" />
                <span className="break-words">{game.name}</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant={completedActivities.includes(game.id) ? "default" : "outline"}>
                  {game.xpReward} XP
                </Badge>
                {completedActivities.includes(game.id) && (
                  <Trophy className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 break-words whitespace-normal">{game.description}</p>
            <Button 
              onClick={() => startGame(game.id)}
              disabled={completedActivities.includes(game.id)}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              {completedActivities.includes(game.id) ? 'Play Again' : 'Start Game'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MiniGamesTab;
