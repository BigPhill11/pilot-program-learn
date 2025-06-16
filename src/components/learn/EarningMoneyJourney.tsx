
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy } from 'lucide-react';
import { earningMoneyJourneyData } from '@/data/earning-money-journey-data';
import EarningMoneyLevel from './EarningMoneyLevel';
import EarningMoneyMiniGame from './EarningMoneyMiniGame';

interface EarningMoneyJourneyProps {
  onBack: () => void;
}

const EarningMoneyJourney: React.FC<EarningMoneyJourneyProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [journeyCompleted, setJourneyCompleted] = useState(false);

  const totalLevels = 5;

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('earningMoneyJourneyProgress');
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
    localStorage.setItem('earningMoneyJourneyProgress', JSON.stringify(progress));
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
    const levelKey = `level${level}` as keyof typeof earningMoneyJourneyData;
    return earningMoneyJourneyData[levelKey];
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
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            You've completed the "Making Your First Dollar" journey!
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-bold text-green-800 mb-2">What You've Learned:</h3>
            <ul className="text-left text-green-700 space-y-1">
              <li>• Different ways to earn money as a teen</li>
              <li>• How to read and understand paychecks</li>
              <li>• Hourly pay vs salary differences</li>
              <li>• Gig work and entrepreneurship basics</li>
              <li>• Tax responsibilities for earners</li>
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

        <EarningMoneyMiniGame onComplete={handleMiniGameComplete} />
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
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Making Your First Dollar
          </h1>
          <p className="text-muted-foreground">
            Learn how to earn, understand, and manage your income
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

      <EarningMoneyLevel
        levelNumber={currentLevel}
        levelData={getLevelData(currentLevel)}
        onComplete={handleLevelComplete}
        isCompleted={completedLevels.includes(currentLevel)}
      />
    </div>
  );
};

export default EarningMoneyJourney;
