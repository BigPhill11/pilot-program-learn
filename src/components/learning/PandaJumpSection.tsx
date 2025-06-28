
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Play, Trophy, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';

const PandaJumpSection: React.FC = () => {
  const isMobile = useIsMobile();

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-500', description: 'Easy jumps with Phil' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500', description: 'Challenging obstacles' },
    { value: 'pro', label: 'Pro', color: 'bg-red-500', description: 'Expert panda moves' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardHeader>
          <div className="flex items-center gap-4">
            <PandaLogo className="h-12 w-12" />
            <div>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Gamepad2 className="h-5 w-5" />
                Panda Jump
                <Badge variant="outline" className="border-emerald-300">Coming Soon</Badge>
              </CardTitle>
              <p className="text-emerald-700">
                Help Phil the Panda jump through financial challenges and collect bamboo coins!
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Level Preview */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        {levels.map((level) => (
          <Card key={level.value} className="opacity-75">
            <CardContent className="p-6 text-center">
              <Badge className={`${level.color} text-white mb-3`}>
                {level.label}
              </Badge>
              <h3 className="font-semibold mb-2">{level.description}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Game mechanics will be explained here once implemented
              </p>
              <Button disabled className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Game Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Game Features (Preview)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Educational Gameplay</h4>
                <p className="text-sm text-muted-foreground">
                  Answer financial questions to help Phil jump higher
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Bamboo Rewards</h4>
                <p className="text-sm text-muted-foreground">
                  Collect bamboo coins for correct answers and achievements
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Progressive Difficulty</h4>
                <p className="text-sm text-muted-foreground">
                  Three difficulty levels with unique challenges
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Leaderboards</h4>
                <p className="text-sm text-muted-foreground">
                  Compete with other learners for the highest scores
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PandaJumpSection;
