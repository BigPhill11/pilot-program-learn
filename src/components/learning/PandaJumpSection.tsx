
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Gamepad2, Play, Trophy, Star, Crown, TreePine } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';
import BambooEmpireGame from './games/BambooEmpireGame';
import PandaJumpGame from './games/PandaJumpGame';

const PandaJumpSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');
  const [activeGame, setActiveGame] = useState<'bamboo-empire' | 'panda-jump' | null>(null);
  const isMobile = useIsMobile();

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-500', description: 'Easy jumps with Phil' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500', description: 'Challenging obstacles' },
    { value: 'pro', label: 'Pro', color: 'bg-red-500', description: 'Expert panda moves' }
  ] as const;

  if (activeGame === 'panda-jump') {
    return <PandaJumpGame level={selectedLevel} onExit={() => setActiveGame(null)} />;
  }

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-green-600" />
                Panda Jump Challenge
              </CardTitle>
              <p className="text-muted-foreground">
                Help Phil jump from bamboo branch to bamboo branch by answering questions correctly!
              </p>
            </CardHeader>
            <CardContent>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4 mb-6`}>
                {levels.map((level) => (
                  <Card key={level.value} className="text-center">
                    <CardContent className="p-6">
                      <Badge className={`${level.color} text-white mb-3`}>
                        {level.label}
                      </Badge>
                      <h3 className="font-semibold mb-2">{level.description}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Time-based jumping challenge with decreasing answer time!
                      </p>
                      <Button 
                        className="w-full"
                        onClick={() => {
                          setSelectedLevel(level.value);
                          setActiveGame('panda-jump');
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Jumping
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Game Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Game Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Timed Questions</h4>
                        <p className="text-sm text-muted-foreground">
                          Start with 20 seconds, decrease to 7 seconds per question
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Visual Climbing</h4>
                        <p className="text-sm text-muted-foreground">
                          Watch Phil jump from branch to branch as you answer
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Lives System</h4>
                        <p className="text-sm text-muted-foreground">
                          Three lives to reach the highest bamboo branches
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">High Scores</h4>
                        <p className="text-sm text-muted-foreground">
                          Beat your personal best height and score records
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PandaJumpSection;
