
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Play, Trophy, ArrowLeft } from 'lucide-react';
import { MiniGameConfig } from '@/data/investment-banking-lessons';
import WallStreetWordMatch from './games/WallStreetWordMatch';
import DealTypeDetective from './games/DealTypeDetective';
import DCFBuilderGame from './games/DCFBuilderGame';
import ValuationBattleGame from './games/ValuationBattleGame';
import DealCoordinatorGame from './games/DealCoordinatorGame';
import CrisisManagerGame from './games/CrisisManagerGame';
import SectorSpecialistGame from './games/SectorSpecialistGame';
import SectorDetectiveGame from './games/SectorDetectiveGame';
import ESGInvestmentChallenge from './games/ESGInvestmentChallenge';
import DivisionDetectiveGame from './games/DivisionDetectiveGame';
import UnderwritingChallengeGame from './games/UnderwritingChallengeGame';
import MADealArchitectGame from './games/MADealArchitectGame';
import CompanyValuationMasterGame from './games/CompanyValuationMasterGame';
import FutureBankerGame from './games/FutureBankerGame';
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

  const handleGameComplete = (gameId: string, score?: number) => {
    console.log(`Game ${gameId} completed with score:`, score);
    const game = filteredMiniGames.find(g => g.id === gameId);
    const xpReward = game?.xpReward || 50;
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

  // Render specific game components based on activeGame
  const renderActiveGame = () => {
    const commonProps = {
      onComplete: (score: number) => handleGameComplete(activeGame!, score)
    };

    switch (activeGame) {
      case 'ib-basics-matching':
        return <WallStreetWordMatch onComplete={handleGameComplete} isCompleted={completedActivities.includes('ib-basics-matching')} />;
      case 'deal-type-sorter':
        return <DealTypeDetective onComplete={handleGameComplete} isCompleted={completedActivities.includes('deal-type-sorter')} />;
      case 'dcf-builder-game':
        return <DCFBuilderGame {...commonProps} />;
      case 'valuation-battle':
        return <ValuationBattleGame {...commonProps} />;
      case 'deal-coordinator-game':
        return <DealCoordinatorGame {...commonProps} />;
      case 'crisis-manager-game':
        return <CrisisManagerGame {...commonProps} />;
      case 'sector-specialist-game':
        return <SectorSpecialistGame {...commonProps} />;
      case 'sector-detective-game':
        return <SectorDetectiveGame {...commonProps} />;
      case 'esg-investment-challenge':
        return <ESGInvestmentChallenge {...commonProps} />;
      case 'ib-divisions-match':
        return <DivisionDetectiveGame onComplete={(score: number) => handleGameComplete('ib-divisions-match', score)} />;
      case 'underwriting-simulator':
        return <UnderwritingChallengeGame onComplete={(score: number) => handleGameComplete('underwriting-simulator', score)} />;
      case 'ma-deal-builder':
        return <MADealArchitectGame onComplete={(score: number) => handleGameComplete('ma-deal-builder', score)} />;
      case 'valuation-challenge':
        return <CompanyValuationMasterGame onComplete={(score: number) => handleGameComplete('valuation-challenge', score)} />;
      case 'future-banker-game':
        return <FutureBankerGame onComplete={(score: number) => handleGameComplete('future-banker-game', score)} />;
      default:
        return <div>Game not found</div>;
    }
  };

  // If a game is active, render the game component
  if (activeGame) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleGameExit} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>
        {renderActiveGame()}
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
