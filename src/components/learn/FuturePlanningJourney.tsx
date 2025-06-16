
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { futurePlanningJourneyData } from '@/data/future-planning-journey-data';
import FuturePlanningLevelComponent from './FuturePlanningLevel';
import FuturePlanningMiniGame from './FuturePlanningMiniGame';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface FuturePlanningJourneyProps {
  onBack: () => void;
}

const FuturePlanningJourney: React.FC<FuturePlanningJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const { updateQuizScore, updateLearningProgress } = useProgressTracking();

  useEffect(() => {
    const saved = localStorage.getItem('futurePlanningJourneyProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedLevels(new Set(progress.completedLevels || []));
      setJourneyCompleted(progress.journeyCompleted || false);
    }
  }, []);

  const saveProgress = (newCompletedLevels: Set<number>, completed: boolean) => {
    const progress = {
      completedLevels: Array.from(newCompletedLevels),
      journeyCompleted: completed
    };
    localStorage.setItem('futurePlanningJourneyProgress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = new Set(completedLevels).add(levelId);
    setCompletedLevels(newCompletedLevels);
    
    const allLevelsComplete = newCompletedLevels.size === futurePlanningJourneyData.length;
    if (allLevelsComplete && !journeyCompleted) {
      setJourneyCompleted(true);
      setShowMiniGame(true);
      updateLearningProgress(10);
      saveProgress(newCompletedLevels, true);
    } else {
      saveProgress(newCompletedLevels, journeyCompleted);
    }
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore(`future-planning-quiz-${Date.now()}`, isCorrect);
  };

  const isLevelUnlocked = (levelId: number) => {
    return levelId === 1 || completedLevels.has(levelId - 1);
  };

  const progress = (completedLevels.size / futurePlanningJourneyData.length) * 100;

  if (showMiniGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setShowMiniGame(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <h1 className="text-3xl font-bold text-indigo-600">Future Plan Challenge</h1>
        </div>
        <FuturePlanningMiniGame />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Learn
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-indigo-600">Plan for Later, Start Now</h1>
          <p className="text-muted-foreground">Master future planning and build generational wealth</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-indigo-600">Journey Progress</CardTitle>
            <Badge className="bg-indigo-500 text-white">
              {completedLevels.size}/{futurePlanningJourneyData.length} Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Complete all levels to unlock the Future Plan Folder builder!
              </span>
              {journeyCompleted && (
                <Button 
                  onClick={() => setShowMiniGame(true)}
                  className="bg-indigo-500 hover:bg-indigo-600"
                  size="sm"
                >
                  <Star className="h-4 w-4 mr-1" />
                  Play Mini-Game
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {journeyCompleted && (
        <Card className="border border-indigo-200 bg-indigo-50/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <Trophy className="h-12 w-12 text-indigo-500 mx-auto" />
              <h2 className="text-xl font-bold text-indigo-600">Journey Complete!</h2>
              <p className="text-muted-foreground">
                🎉 Congratulations! You've mastered future planning and earned the "Future Ready" badge!
              </p>
              <Badge className="bg-indigo-500 text-white text-lg py-2 px-4">
                <Trophy className="h-4 w-4 mr-2" />
                Future Ready Achievement Unlocked!
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {futurePlanningJourneyData.map((level) => (
          <FuturePlanningLevelComponent
            key={level.id}
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={completedLevels.has(level.id)}
            onComplete={() => handleLevelComplete(level.id)}
            onQuizComplete={handleQuizComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default FuturePlanningJourney;
