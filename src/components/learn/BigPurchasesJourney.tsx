
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy } from 'lucide-react';
import { bigPurchasesJourneyData } from '@/data/big-purchases-journey-data';
import BigPurchasesJourneyLevelCard from './BigPurchasesJourneyLevelCard';
import BigPurchasesJourneyHeader from './BigPurchasesJourneyHeader';
import BigPurchasesLevelComponent from './BigPurchasesLevel';
import BigPurchasesMiniGame from './BigPurchasesMiniGame';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface BigPurchasesJourneyProps {
  onBack: () => void;
}

interface JourneyProgress {
  completedLevels: number[];
  currentLevel: number;
  journeyCompleted: boolean;
  totalPointsEarned: number;
}

const BigPurchasesJourney: React.FC<BigPurchasesJourneyProps> = ({ onBack }) => {
  const { updateQuizScore, updateLearningProgress } = useProgressTracking();
  const [progress, setProgress] = useState<JourneyProgress>({
    completedLevels: [],
    currentLevel: 1,
    journeyCompleted: false,
    totalPointsEarned: 0
  });
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [showMiniGame, setShowMiniGame] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bigPurchasesJourneyProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: JourneyProgress) => {
    setProgress(newProgress);
    localStorage.setItem('bigPurchasesJourneyProgress', JSON.stringify(newProgress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = [...progress.completedLevels, levelId];
    const newProgress = {
      ...progress,
      completedLevels: newCompletedLevels,
      currentLevel: Math.min(levelId + 1, bigPurchasesJourneyData.length + 1),
      totalPointsEarned: progress.totalPointsEarned + 5
    };

    // Check if all levels are completed
    if (newCompletedLevels.length === bigPurchasesJourneyData.length) {
      setShowMiniGame(true);
    }

    saveProgress(newProgress);
    updateLearningProgress(20, 30); // 20% progress per level + XP
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('big-purchases-journey', isCorrect);
  };

  const handleMiniGameComplete = () => {
    const newProgress = {
      ...progress,
      journeyCompleted: true,
      totalPointsEarned: progress.totalPointsEarned + 15 // Bonus points for completing mini-game
    };
    saveProgress(newProgress);
    updateLearningProgress(20, 50); // Final 20% + XP for completion
    setShowMiniGame(false);
    setSelectedLevelId(null);
  };

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevelId(levelId);
  };

  const handleBackToLevels = () => {
    setSelectedLevelId(null);
    setShowMiniGame(false);
  };

  // Show selected level content
  if (selectedLevelId) {
    const selectedLevel = bigPurchasesJourneyData.find(level => level.id === selectedLevelId);
    if (selectedLevel) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackToLevels}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Levels
            </Button>
            <h1 className="text-3xl font-bold">{selectedLevel.title}</h1>
          </div>
          
          <BigPurchasesLevelComponent
            level={selectedLevel}
            isUnlocked={selectedLevel.id <= progress.currentLevel}
            isCompleted={progress.completedLevels.includes(selectedLevel.id)}
            onComplete={() => handleLevelComplete(selectedLevel.id)}
            onQuizComplete={handleQuizComplete}
          />
        </div>
      );
    }
  }

  // Show mini-game
  if (showMiniGame && !progress.journeyCompleted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBackToLevels}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <h1 className="text-3xl font-bold">Car Buying Simulator</h1>
        </div>
        
        <BigPurchasesMiniGame onComplete={handleMiniGameComplete} />
      </div>
    );
  }

  // Show completion screen
  if (progress.journeyCompleted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personal Finance
          </Button>
        </div>

        <Card className="border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-purple-700 mb-4">Journey Complete!</h2>
            <Badge className="bg-purple-500 text-white text-lg px-6 py-2 mb-4">
              <Trophy className="h-4 w-4 mr-2" />
              Smart Buyer
            </Badge>
            <p className="text-lg text-muted-foreground mb-6">
              You've mastered the art of making smart big purchases!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{bigPurchasesJourneyData.length}</div>
                <div className="text-sm text-muted-foreground">Levels Completed</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{progress.totalPointsEarned}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-muted-foreground">Journey Progress</div>
              </div>
            </div>

            <Button onClick={onBack} size="lg" className="mt-6">
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show main journey overview with grid layout
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personal Finance
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">How to Buy Big: Smart Shopping for Major Purchases</h1>
          <p className="text-muted-foreground">Master big purchases through 5 interactive levels + car buying simulation</p>
        </div>
      </div>

      <BigPurchasesJourneyHeader
        completedLevels={progress.completedLevels}
        totalLevels={bigPurchasesJourneyData.length}
        journeyCompleted={progress.journeyCompleted}
        totalPointsEarned={progress.totalPointsEarned}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bigPurchasesJourneyData.map((level) => (
          <BigPurchasesJourneyLevelCard
            key={level.id}
            level={level}
            isUnlocked={level.id <= progress.currentLevel}
            isCompleted={progress.completedLevels.includes(level.id)}
            onLevelSelect={handleLevelSelect}
          />
        ))}
      </div>

      {progress.completedLevels.length === bigPurchasesJourneyData.length && (
        <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Final Challenge Unlocked!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You've completed all 5 levels! Now test your skills in the Car Buying Simulator.
            </p>
            <Button onClick={() => setShowMiniGame(true)} size="lg" className="w-full">
              Start Car Buying Simulator
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BigPurchasesJourney;
