
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Gamepad2, Play, Trophy, Star, Crown, TreePine } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';
import BambooEmpireGame from './games/BambooEmpireGame';

const PandaJumpSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');
  const isMobile = useIsMobile();

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-500', description: 'Easy jumps with Phil' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500', description: 'Challenging obstacles' },
    { value: 'pro', label: 'Pro', color: 'bg-red-500', description: 'Expert panda moves' }
  ] as const;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardHeader>
          <div className="flex items-center gap-4">
            <PandaLogo className="h-12 w-12" />
            <div>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Gamepad2 className="h-5 w-5" />
                Phil's Gaming Adventure
              </CardTitle>
              <p className="text-emerald-700">
                Help Phil the Panda jump through financial challenges and build his bamboo empire!
              </p>
            </div>
          </div>
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
                {level.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Game Tabs */}
      <Tabs defaultValue="bamboo-empire" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bamboo-empire" className="flex items-center gap-2">
            <TreePine className="h-4 w-4" />
            Bamboo Empire
          </TabsTrigger>
          <TabsTrigger value="panda-jump" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Panda Jump
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bamboo-empire" className="mt-6">
          <BambooEmpireGame level={selectedLevel} />
        </TabsContent>

        <TabsContent value="panda-jump" className="mt-6">
          {/* Panda Jump Preview - Coming Soon */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            {levels.map((level) => (
              <Card key={level.value} className="opacity-75">
                <CardContent className="p-6 text-center">
                  <Badge className={`${level.color} text-white mb-3`}>
                    {level.label}
                  </Badge>
                  <h3 className="font-semibold mb-2">{level.description}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Jump through financial obstacles and collect coins!
                  </p>
                  <Button disabled className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Game Features Preview */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Panda Jump Features (Preview)
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PandaJumpSection;
