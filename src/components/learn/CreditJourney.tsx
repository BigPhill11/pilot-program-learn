
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Trophy, Play } from 'lucide-react';
import { creditJourneyData } from '@/data/credit-journey-data';
import CreditLevel from './CreditLevel';
import CreditMiniGame from './CreditMiniGame';
import CreditJourneyHeader from './CreditJourneyHeader';
import CreditJourneyLevelCard from './CreditJourneyLevelCard';
import CreditJourneyCompletion from './CreditJourneyCompletion';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface CreditJourneyProps {
  onBack: () => void;
}

interface JourneyProgress {
  completedLevels: number[];
  currentLevel: number;
  journeyCompleted: boolean;
  totalPointsEarned: number;
}

const CreditJourney: React.FC<CreditJourneyProps> = ({ onBack }) => {
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
    const saved = localStorage.getItem('creditJourneyProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: JourneyProgress) => {
    setProgress(newProgress);
    localStorage.setItem('creditJourneyProgress', JSON.stringify(newProgress));
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

    if (newCompletedLevels.length === creditJourneyData.length) {
      setShowMiniGame(true);
    }

    saveProgress(newProgress);
    updateLearningProgress(20);
    setSelectedLevel(null);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('credit-journey', isCorrect);
  };

  const handleMiniGameComplete = () => {
    const newProgress = {
      ...progress,
      journeyCompleted: true,
      totalPointsEarned: progress.totalPointsEarned + 15
    };
    saveProgress(newProgress);
    updateLearningProgress(20);
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
          <h1 className="text-3xl font-bold">Credit Score Builder Challenge</h1>
        </div>
        <CreditMiniGame onComplete={handleMiniGameComplete} />
      </div>
    );
  }

  if (selectedLevel !== null) {
    const level = creditJourneyData.find(l => l.id === selectedLevel);
    if (!level) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedLevel(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Credit Journey
          </Button>
        </div>
        
        <CreditLevel
          level={level}
          isUnlocked={isLevelUnlocked(selectedLevel)}
          isCompleted={isLevelCompleted(selectedLevel)}
          onComplete={() => handleLevelComplete(selectedLevel)}
          onQuizComplete={handleQuizComplete}
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
        <CreditJourneyCompletion
          totalLevels={creditJourneyData.length}
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

      <CreditJourneyHeader
        completedLevels={progress.completedLevels.length}
        totalLevels={creditJourneyData.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creditJourneyData.map((level) => (
          <CreditJourneyLevelCard
            key={level.id}
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={isLevelCompleted(level.id)}
            onLevelSelect={setSelectedLevel}
          />
        ))}

        {progress.completedLevels.length === creditJourneyData.length && (
          <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Final Challenge: Credit Score Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You've completed all 5 levels! Test your skills in the interactive credit score simulation.
              </p>
              <Button 
                onClick={() => setShowMiniGame(true)} 
                size="lg" 
                className="w-full bg-yellow-500 hover:bg-yellow-600"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Credit Challenge
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreditJourney;
