import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, Clock, Star } from "lucide-react";
import { VCLessonContent } from "@/data/venture-capital-lessons";
import VCGameRenderer from "./games/VCGameRenderer";
import { useVCProgress } from "@/hooks/useVCProgress";

interface MiniGamesTabProps {
  lesson: VCLessonContent;
  completedActivities: string[];
  onActivityComplete: () => void;
}

const MiniGamesTab: React.FC<MiniGamesTabProps> = ({ 
  lesson, 
  completedActivities, 
  onActivityComplete 
}) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [completedGames, setCompletedGames] = useState<Set<string>>(
    new Set(completedActivities.filter(activity => activity.includes('game')))
  );
  const { saveMiniGameProgress } = useVCProgress();

  const handleGameComplete = async (gameId: string, score: number = 0) => {
    try {
      await saveMiniGameProgress(lesson.level, gameId, score);
      setCompletedGames(prev => new Set([...prev, gameId]));
      setSelectedGame(null);
      
      // If this is the first game completed, trigger activity completion
      if (completedGames.size === 0) {
        onActivityComplete();
      }
    } catch (error) {
      console.error('Error saving game progress:', error);
    }
  };

  const handleGameStart = (gameId: string) => {
    setSelectedGame(gameId);
  };

  if (selectedGame) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedGame(null)}>
            ← Back to Games
          </Button>
          <h2 className="text-xl font-semibold">
            {lesson.miniGames.find(g => g.id === selectedGame)?.title}
          </h2>
        </div>
        <VCGameRenderer
          gameId={selectedGame}
          completedActivities={Array.from(completedGames)}
          onComplete={handleGameComplete}
        />
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Interactive Mini-Games
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Practice your venture capital skills through hands-on interactive games and simulations.
          </p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {lesson.miniGames.map((game) => {
          const isCompleted = completedGames.has(game.id);
          
          return (
            <Card key={game.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  {isCompleted && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Badge 
                    variant="secondary" 
                    className={getDifficultyColor(game.difficulty)}
                  >
                    {game.difficulty}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {game.estimatedTime}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {game.description}
                </p>
                
                <Button
                  onClick={() => handleGameStart(game.id)}
                  className="w-full"
                  variant={isCompleted ? "outline" : "default"}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isCompleted ? "Play Again" : "Start Game"}
                </Button>
                
                {isCompleted && (
                  <div className="text-center">
                    <Badge variant="outline" className="text-green-600">
                      ✓ Completed
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {completedGames.size > 0 && (
        <Card>
          <CardContent className="text-center py-6">
            <div className="space-y-2">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
              <h3 className="font-semibold">Great Progress!</h3>
              <p className="text-sm text-muted-foreground">
                You've completed {completedGames.size} out of {lesson.miniGames.length} mini-games.
                {completedGames.size === lesson.miniGames.length && " All games completed! 🎉"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MiniGamesTab;