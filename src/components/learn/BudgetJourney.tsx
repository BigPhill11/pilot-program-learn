
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy } from 'lucide-react';
import { budgetJourneyData, budgetMiniGame } from '@/data/budgeting-journey-data';
import BudgetLevel from './BudgetLevel';
import BudgetMiniGame from './BudgetMiniGame';

interface BudgetJourneyProps {
  onBack: () => void;
}

const BudgetJourney: React.FC<BudgetJourneyProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [journeyCompleted, setJourneyCompleted] = useState(false);

  const totalLevels = budgetJourneyData.length;

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('budgetJourneyProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedLevels(progress.completedLevels || []);
      setCurrentLevel(progress.currentLevel || 1);
      setJourneyCompleted(progress.journeyCompleted || false);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const progress = {
      completedLevels,
      currentLevel,
      journeyCompleted
    };
    localStorage.setItem('budgetJourneyProgress', JSON.stringify(progress));
  }, [completedLevels, currentLevel, journeyCompleted]);

  const handleLevelComplete = (levelId: number) => {
    if (!completedLevels.includes(levelId)) {
      const newCompletedLevels = [...completedLevels, levelId];
      setCompletedLevels(newCompletedLevels);
      
      if (levelId < totalLevels) {
        setCurrentLevel(levelId + 1);
      } else {
        setShowMiniGame(true);
      }
    }
  };

  const handleMiniGameComplete = () => {
    setJourneyCompleted(true);
    setShowMiniGame(false);
  };

  const getLevelData = (levelNumber: number) => {
    return budgetJourneyData.find(level => level.id === levelNumber);
  };

  const progress = (completedLevels.length / totalLevels) * 100;

  if (journeyCompleted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personal Finance
          </Button>
        </div>

        <div className="text-center py-12">
          <Trophy className="h-24 w-24 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold journey-header mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            You've completed the "Budgeting 101" journey!
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-bold section-header mb-2">What You've Learned:</h3>
            <ul className="text-left text-blue-700 dark:text-blue-300 space-y-1">
              <li>• How to distinguish needs from wants</li>
              <li>• The 50/30/20 budgeting rule</li>
              <li>• Tracking and managing expenses</li>
              <li>• Budgeting for financial goals</li>
              <li>• Adjusting budgets when life changes</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (showMiniGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personal Finance
          </Button>
          <div className="text-sm text-muted-foreground">
            Final Challenge
          </div>
        </div>

        <BudgetMiniGame 
          miniGameData={budgetMiniGame}
          onComplete={handleMiniGameComplete} 
        />
      </div>
    );
  }

  const currentLevelData = getLevelData(currentLevel);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personal Finance
        </Button>
        <div className="text-sm text-muted-foreground">
          Level {currentLevel} of {totalLevels}
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold journey-header mb-2">
            Budgeting 101
          </h1>
          <p className="text-muted-foreground">
            Master the art of managing your money effectively
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{completedLevels.length}/{totalLevels} levels completed</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>

      {currentLevelData && (
        <BudgetLevel
          level={currentLevelData}
          onComplete={handleLevelComplete}
          isUnlocked={true}
          isCompleted={completedLevels.includes(currentLevel)}
        />
      )}
    </div>
  );
};

export default BudgetJourney;
