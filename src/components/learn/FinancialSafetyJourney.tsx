
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy } from 'lucide-react';
import { financialSafetyJourneyData } from '@/data/financial-safety-journey-data';
import FinancialSafetyLevel from './FinancialSafetyLevel';
import FinancialSafetyMiniGame from './FinancialSafetyMiniGame';

interface FinancialSafetyJourneyProps {
  onBack: () => void;
}

const FinancialSafetyJourney: React.FC<FinancialSafetyJourneyProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [journeyCompleted, setJourneyCompleted] = useState(false);

  const totalLevels = 5;

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('financialSafetyJourneyProgress');
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
    localStorage.setItem('financialSafetyJourneyProgress', JSON.stringify(progress));
  }, [completedLevels, currentLevel, journeyCompleted]);

  const handleLevelComplete = () => {
    if (!completedLevels.includes(currentLevel)) {
      const newCompletedLevels = [...completedLevels, currentLevel];
      setCompletedLevels(newCompletedLevels);
      
      if (currentLevel < totalLevels) {
        setCurrentLevel(currentLevel + 1);
      } else {
        setShowMiniGame(true);
      }
    }
  };

  const handleMiniGameComplete = () => {
    setJourneyCompleted(true);
    setShowMiniGame(false);
  };

  const getLevelData = (level: number) => {
    const levelKey = `level${level}` as keyof typeof financialSafetyJourneyData;
    return financialSafetyJourneyData[levelKey];
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
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            Congratulations! 🛡️
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            You've completed the "Money Armor" journey!
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-bold text-purple-800 mb-2">What You've Learned:</h3>
            <ul className="text-left text-purple-700 space-y-1">
              <li>• How to spot and avoid identity theft & fraud</li>
              <li>• Understanding different types of insurance</li>
              <li>• Building emergency funds and planning ahead</li>
              <li>• Safe spending habits and online security</li>
              <li>• Your consumer rights and protections</li>
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

        <FinancialSafetyMiniGame onComplete={handleMiniGameComplete} />
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-purple-600 mb-2">
            Money Armor
          </h1>
          <p className="text-muted-foreground">
            Protect yourself and your finances from scams and risks
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

      <FinancialSafetyLevel
        levelNumber={currentLevel}
        levelData={getLevelData(currentLevel)}
        onComplete={handleLevelComplete}
        isCompleted={completedLevels.includes(currentLevel)}
      />
    </div>
  );
};

export default FinancialSafetyJourney;
