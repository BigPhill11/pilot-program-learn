
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Play, Trophy } from 'lucide-react';
import { MiniGameConfig } from '@/data/investment-banking-lessons';

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
  return (
    <div className="grid gap-6">
      {filteredMiniGames.map((game) => (
        <Card key={game.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Gamepad2 className="h-5 w-5 text-primary" />
                <span>{game.name}</span>
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
            <p className="text-muted-foreground mb-4">{game.description}</p>
            <Button 
              onClick={() => onActivityComplete(game.id)}
              disabled={completedActivities.includes(game.id)}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              {completedActivities.includes(game.id) ? 'Completed!' : 'Start Game'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MiniGamesTab;
