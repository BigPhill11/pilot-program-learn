
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

interface CreditJourneyCompletionProps {
  totalLevels: number;
  totalPointsEarned: number;
  onContinue: () => void;
}

const CreditJourneyCompletion: React.FC<CreditJourneyCompletionProps> = ({
  totalLevels,
  totalPointsEarned,
  onContinue
}) => {
  return (
    <Card className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-blue-50">
      <CardContent className="p-8 text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-green-700 mb-4">Journey Complete!</h2>
        <Badge className="bg-green-500 text-white text-lg px-6 py-2 mb-4">
          <Trophy className="h-4 w-4 mr-2" />
          Credit Champ
        </Badge>
        <p className="text-lg text-muted-foreground mb-6">
          You've mastered the fundamentals of building and maintaining excellent credit!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{totalLevels}</div>
            <div className="text-sm text-muted-foreground">Levels Completed</div>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{totalPointsEarned}</div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-muted-foreground">Journey Progress</div>
          </div>
        </div>

        <Button onClick={onContinue} size="lg" className="mt-6">
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreditJourneyCompletion;
