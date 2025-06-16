
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Lock, CheckCircle2 } from 'lucide-react';
import TaxesLevel from './TaxesLevel';
import TaxesMiniGame from './TaxesMiniGame';
import { taxesJourneyData } from '@/data/taxes-journey-data';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface TaxesJourneyProps {
  onBack: () => void;
}

const TaxesJourney: React.FC<TaxesJourneyProps> = ({ onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const { updateQuizScore } = useProgressTracking();

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('taxesJourneyProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedLevels(new Set(progress.completedLevels || []));
      setJourneyCompleted(progress.journeyCompleted || false);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (levels: Set<number>, completed: boolean = false) => {
    const progress = {
      completedLevels: Array.from(levels),
      journeyCompleted: completed
    };
    localStorage.setItem('taxesJourneyProgress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompleted = new Set(completedLevels);
    newCompleted.add(levelId);
    setCompletedLevels(newCompleted);
    saveProgress(newCompleted);
    
    // Award points for level completion
    updateQuizScore(`tax-level-${levelId}-completion`, true);
    
    // Check if all levels are completed
    if (newCompleted.size === taxesJourneyData.length) {
      setShowMiniGame(true);
    } else {
      setSelectedLevel(null);
    }
  };

  const handleMiniGameComplete = () => {
    setJourneyCompleted(true);
    saveProgress(completedLevels, true);
    setShowMiniGame(false);
    setSelectedLevel(null);
    
    // Award bonus points for completing the entire journey
    updateQuizScore('taxes-journey-completion', true);
  };

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return completedLevels.has(levelId - 1);
  };

  const overallProgress = (completedLevels.size / taxesJourneyData.length) * 100;

  // Show mini-game
  if (showMiniGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setShowMiniGame(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
        </div>
        <TaxesMiniGame onComplete={handleMiniGameComplete} />
      </div>
    );
  }

  // Show individual level
  if (selectedLevel) {
    const level = taxesJourneyData.find(l => l.id === selectedLevel);
    if (!level) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedLevel(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <Badge variant="outline">
            Level {selectedLevel} of {taxesJourneyData.length}
          </Badge>
        </div>
        <TaxesLevel
          level={level}
          onComplete={handleLevelComplete}
          isUnlocked={isLevelUnlocked(selectedLevel)}
          isCompleted={completedLevels.has(selectedLevel)}
        />
      </div>
    );
  }

  // Show journey overview
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personal Finance
        </Button>
        {journeyCompleted && (
          <Badge className="bg-yellow-500 text-white">
            <Trophy className="h-4 w-4 mr-1" />
            Journey Complete
          </Badge>
        )}
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">🎓 Taxes Learning Journey</CardTitle>
          <p className="text-center text-muted-foreground">
            Master the basics of taxes through 5 interactive levels and unlock the tax filing simulation!
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{completedLevels.size}/{taxesJourneyData.length} levels completed</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            
            {completedLevels.size === taxesJourneyData.length && !journeyCompleted && (
              <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="font-semibold text-yellow-800">Ready for the Final Challenge!</p>
                <p className="text-sm text-yellow-700 mb-3">
                  Complete the tax filing simulation to earn your badge
                </p>
                <Button onClick={() => setShowMiniGame(true)} className="bg-yellow-500 hover:bg-yellow-600">
                  Start Tax Filing Simulation
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taxesJourneyData.map((level) => {
          const isUnlocked = isLevelUnlocked(level.id);
          const isCompleted = completedLevels.has(level.id);
          
          return (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isCompleted ? 'border-green-500 bg-green-50' :
                isUnlocked ? 'border-primary/30 hover:border-primary' :
                'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => isUnlocked && setSelectedLevel(level.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={isCompleted ? "default" : isUnlocked ? "outline" : "secondary"}>
                    Level {level.id}
                  </Badge>
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : !isUnlocked ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : null}
                </div>
                <h3 className="font-semibold text-lg mb-2">{level.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {level.introCard}
                </p>
                {isUnlocked && (
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full">
                      {isCompleted ? 'Review Level' : 'Start Level'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {journeyCompleted && (
        <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-yellow-700 mb-2">Journey Complete!</h3>
            <p className="text-muted-foreground mb-4">
              Congratulations! You've mastered the Tax Smart Rookie level and earned your badge.
            </p>
            <Badge className="bg-yellow-500 text-white text-lg px-4 py-2">
              🏆 Tax Smart Rookie
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxesJourney;
