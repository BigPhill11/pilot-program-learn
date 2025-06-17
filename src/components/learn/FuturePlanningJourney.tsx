
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { futurePlanningJourneyData } from '@/data/future-planning-journey-data';
import FuturePlanningLevelComponent from './FuturePlanningLevel';
import FuturePlanningMiniGame from './FuturePlanningMiniGame';
import FuturePlanningJourneyLevelCard from './FuturePlanningJourneyLevelCard';
import FuturePlanningJourneyHeader from './FuturePlanningJourneyHeader';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface FuturePlanningJourneyProps {
  onBack: () => void;
}

const FuturePlanningJourney: React.FC<FuturePlanningJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
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
      updateLearningProgress(10);
      saveProgress(newCompletedLevels, true);
    } else {
      saveProgress(newCompletedLevels, journeyCompleted);
    }
    
    // Return to main view after completing level
    setSelectedLevel(null);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore(`future-planning-quiz-${Date.now()}`, isCorrect);
  };

  const isLevelUnlocked = (levelId: number) => {
    return levelId === 1 || completedLevels.has(levelId - 1);
  };

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevel(levelId);
  };

  const handleBackToJourney = () => {
    setSelectedLevel(null);
  };

  // Show individual level view
  if (selectedLevel !== null) {
    const level = futurePlanningJourneyData.find(l => l.id === selectedLevel);
    if (level) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackToJourney}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Journey
            </Button>
            <h1 className="text-3xl font-bold text-indigo-600">Level {level.id}: {level.title}</h1>
          </div>
          <FuturePlanningLevelComponent
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={completedLevels.has(level.id)}
            onComplete={() => handleLevelComplete(level.id)}
            onQuizComplete={handleQuizComplete}
          />
        </div>
      );
    }
  }

  // Show mini-game view
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
          Back to Personal Finance
        </Button>
      </div>

      <FuturePlanningJourneyHeader 
        completedLevels={completedLevels.size}
        totalLevels={futurePlanningJourneyData.length}
      />

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
              <Button 
                onClick={() => setShowMiniGame(true)}
                className="bg-indigo-500 hover:bg-indigo-600 mt-4"
                size="lg"
              >
                <Star className="h-4 w-4 mr-1" />
                Play Future Plan Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {futurePlanningJourneyData.map((level) => (
          <FuturePlanningJourneyLevelCard
            key={level.id}
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={completedLevels.has(level.id)}
            onLevelSelect={handleLevelSelect}
          />
        ))}
      </div>

      {completedLevels.size === futurePlanningJourneyData.length && (
        <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Final Challenge Unlocked!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You've completed all 5 levels! Now test your skills in the Future Plan Folder builder.
            </p>
            <Button onClick={() => setShowMiniGame(true)} size="lg" className="w-full">
              Start Future Plan Challenge
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FuturePlanningJourney;
