
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy } from 'lucide-react';
import { budgetJourneyData, budgetMiniGame } from '@/data/budgeting-journey-data';
import BudgetLevel from './BudgetLevel';
import BudgetMiniGame from './BudgetMiniGame';
import BudgetJourneyHeader from './BudgetJourneyHeader';
import BudgetJourneyLevelCard from './BudgetJourneyLevelCard';
import BudgetJourneyCompletion from './BudgetJourneyCompletion';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface BudgetJourneyProps {
  onBack: () => void;
}

interface JourneyProgress {
  completedLevels: number[];
  currentLevel: number;
  journeyCompleted: boolean;
  totalPointsEarned: number;
}

const BudgetJourney: React.FC<BudgetJourneyProps> = ({ onBack }) => {
  const { updateQuizScore, updateLearningProgress } = useProgressTracking();
  const [progress, setProgress] = useState<JourneyProgress>({
    completedLevels: [],
    currentLevel: 1,
    journeyCompleted: false,
    totalPointsEarned: 0
  });
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('budgetJourneyProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: JourneyProgress) => {
    setProgress(newProgress);
    localStorage.setItem('budgetJourneyProgress', JSON.stringify(newProgress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = [...progress.completedLevels];
    
    if (!newCompletedLevels.includes(levelId)) {
      newCompletedLevels.push(levelId);
    }
    
    const newProgress = {
      ...progress,
      completedLevels: newCompletedLevels,
      currentLevel: Math.max(progress.currentLevel, levelId + 1),
      totalPointsEarned: progress.totalPointsEarned + 5
    };

    if (newCompletedLevels.length === budgetJourneyData.length) {
      setShowMiniGame(true);
    }

    saveProgress(newProgress);
    // Add XP when completing a level to sync with XP bar
    updateLearningProgress(20, 30);
    setSelectedLevel(null);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('budget-journey', isCorrect);
  };

  const handleMiniGameComplete = () => {
    const newProgress = {
      ...progress,
      journeyCompleted: true,
      totalPointsEarned: progress.totalPointsEarned + 15
    };
    saveProgress(newProgress);
    updateLearningProgress(20, 50);
    setShowMiniGame(false);
  };

  const isLevelUnlocked = (levelId: number) => {
    return levelId <= progress.currentLevel;
  };

  const isLevelCompleted = (levelId: number) => {
    return progress.completedLevels.includes(levelId);
  };

  if (showMiniGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setShowMiniGame(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <h1 className="text-3xl font-bold">Budget Builder Challenge</h1>
        </div>
        
        <BudgetMiniGame 
          miniGameData={budgetMiniGame}
          onComplete={handleMiniGameComplete} 
        />
      </div>
    );
  }

  if (selectedLevel !== null) {
    const level = budgetJourneyData.find(l => l.id === selectedLevel);
    if (!level) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedLevel(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Budget Journey
          </Button>
        </div>
        
        <BudgetLevel
          level={level}
          isUnlocked={isLevelUnlocked(selectedLevel)}
          isCompleted={isLevelCompleted(selectedLevel)}
          onComplete={() => handleLevelComplete(selectedLevel)}
        />
      </div>
    );
  }

  if (progress.journeyCompleted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personal Finance
          </Button>
        </div>
        <BudgetJourneyCompletion
          totalLevels={budgetJourneyData.length}
          totalPointsEarned={progress.totalPointsEarned}
          onContinue={onBack}
        />
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

      <BudgetJourneyHeader
        completedLevels={progress.completedLevels.length}
        totalLevels={budgetJourneyData.length}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {budgetJourneyData.map((level) => (
          <BudgetJourneyLevelCard
            key={level.id}
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={isLevelCompleted(level.id)}
            onLevelSelect={setSelectedLevel}
          />
        ))}

        {progress.completedLevels.length === budgetJourneyData.length && (
          <Card className="aspect-square border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 cursor-pointer hover:shadow-lg">
            <CardContent className="p-4 h-full flex flex-col justify-between" onClick={() => setShowMiniGame(true)}>
              <div className="text-center flex-1 flex flex-col justify-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm mb-1">Final Challenge</h3>
                <p className="text-xs text-muted-foreground leading-tight">Budget Builder</p>
              </div>
              <div className="text-center">
                <Badge className="text-xs bg-yellow-500 text-white">Available</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BudgetJourney;
