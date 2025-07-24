import React from 'react';
import VCFundamentalsMatch from './VCFundamentalsMatch';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VCGameRendererProps {
  gameId: string;
  completedActivities: string[];
  onComplete: (gameId: string, score?: number) => void;
}

const VCGameRenderer: React.FC<VCGameRendererProps> = ({ 
  gameId, 
  completedActivities, 
  onComplete 
}) => {
  const isCompleted = completedActivities.includes(gameId);

  const handleGameComplete = (score: number) => {
    onComplete(gameId, score);
  };

  switch (gameId) {
    case 'vc-fundamentals-match':
      return (
        <VCFundamentalsMatch 
          onComplete={handleGameComplete}
        />
      );
    
    case 'startup-pitch-evaluator':
      return (
        <Card>
          <CardHeader>
            <CardTitle>Startup Pitch Evaluator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This game is coming soon! You'll evaluate startup pitches and decide which ones to pursue for due diligence.
            </p>
          </CardContent>
        </Card>
      );
    
    case 'due-diligence-checker':
      return (
        <Card>
          <CardHeader>
            <CardTitle>Due Diligence Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This game is coming soon! You'll complete comprehensive due diligence checklists for potential investments.
            </p>
          </CardContent>
        </Card>
      );
    
    case 'valuation-calculator':
      return (
        <Card>
          <CardHeader>
            <CardTitle>Valuation Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This game is coming soon! You'll practice different startup valuation methods and scenarios.
            </p>
          </CardContent>
        </Card>
      );
    
    case 'term-sheet-negotiator':
      return (
        <Card>
          <CardHeader>
            <CardTitle>Term Sheet Negotiator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This game is coming soon! You'll navigate complex term sheet negotiations with entrepreneurs.
            </p>
          </CardContent>
        </Card>
      );
    
    case 'portfolio-builder':
      return (
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This game is coming soon! You'll build balanced VC portfolios across different sectors and stages.
            </p>
          </CardContent>
        </Card>
      );
    
    case 'fund-raising-simulator':
      return (
        <Card>
          <CardHeader>
            <CardTitle>Fund Raising Simulator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This game is coming soon! You'll simulate raising a new VC fund from limited partners.
            </p>
          </CardContent>
        </Card>
      );
    
    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Game Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The requested game "{gameId}" could not be found.
            </p>
          </CardContent>
        </Card>
      );
  }
};

export default VCGameRenderer;