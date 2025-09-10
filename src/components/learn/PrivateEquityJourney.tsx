import React, { useState } from 'react';
import { privateEquityJourneyData } from '@/data/private-equity-journey-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import JourneyOverview from './industry-journey/JourneyOverview';
import PrivateEquityLevel from './PrivateEquityLevel';

interface PrivateEquityProgress {
  currentLevel: number;
  completedLevels: number[];
  selectedDifficulty: 'beginner' | 'intermediate' | 'pro';
  totalPointsEarned: number;
}

interface PrivateEquityJourneyProps {
  onBack: () => void;
}

const PrivateEquityJourney: React.FC<PrivateEquityJourneyProps> = ({ onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  
  const [progress, setProgress] = useLocalStorage<PrivateEquityProgress>('privateEquityProgress', {
    currentLevel: 1,
    completedLevels: [],
    selectedDifficulty: 'beginner',
    totalPointsEarned: 0
  });

  const handleLevelComplete = (levelId: number, pointsEarned: number) => {
    setProgress(prev => ({
      ...prev,
      completedLevels: [...new Set([...prev.completedLevels, levelId])],
      currentLevel: Math.max(prev.currentLevel, levelId + 1),
      totalPointsEarned: prev.totalPointsEarned + pointsEarned
    }));
    setSelectedLevel(null);
  };

  if (selectedLevel) {
    const level = privateEquityJourneyData.levels.find(l => l.id === selectedLevel);
    if (!level) return null;
    
    return (
      <PrivateEquityLevel
        level={level}
        progress={progress}
        onBack={() => setSelectedLevel(null)}
        onComplete={(points) => handleLevelComplete(selectedLevel, points)}
      />
    );
  }

  return (
    <JourneyOverview
      journey={privateEquityJourneyData}
      progress={progress}
      onBack={onBack}
      onLevelSelect={setSelectedLevel}
    />
  );
};

export default PrivateEquityJourney;