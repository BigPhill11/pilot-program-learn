
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, CheckCircle2, Lock, Play } from 'lucide-react';
import { budgetJourneyData, budgetMiniGame } from '@/data/budgeting-journey-data';
import BudgetLevel from './BudgetLevel';
import BudgetMiniGame from './BudgetMiniGame';
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
    
    // Only add if not already completed
    if (!newCompletedLevels.includes(levelId)) {
      newCompletedLevels.push(levelId);
    }
    
    const newProgress = {
      ...progress,
      completedLevels: newCompletedLevels,
      currentLevel: Math.max(progress.currentLevel, levelId + 1), // Unlock next level
      totalPointsEarned: progress.totalPointsEarned + 5
    };

    // Check if all levels are completed
    if (newCompletedLevels.length === budgetJourneyData.length) {
      setShowMiniGame(true);
    }

    saveProgress(newProgress);
    updateLearningProgress(20); // 20% progress per level
    setSelectedLevel(null); // Return to level selection
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('budget-journey', isCorrect);
  };

  const handleMiniGameComplete = () => {
    const newProgress = {
      ...progress,
      journeyCompleted: true,
      totalPointsEarned: progress.totalPointsEarned + 15 // Bonus points for completing mini-game
    };
    saveProgress(newProgress);
    updateLearningProgress(20); // Final 20% for mini-game completion
    setShowMiniGame(false);
  };

  const isLevelUnlocked = (levelId: number) => {
    return levelId <= progress.currentLevel;
  };

  const isLevelCompleted = (levelId: number) => {
    return progress.completedLevels.includes(levelId);
  };

  // Show mini-game screen
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

  // Show individual level screen
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

  // Show journey completion screen
  if (progress.journeyCompleted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personal Finance
          </Button>
        </div>

        <Card className="border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-green-50">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">💰</div>
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Journey Complete!</h2>
            <Badge className="bg-blue-500 text-white text-lg px-6 py-2 mb-4">
              <Trophy className="h-4 w-4 mr-2" />
              Budget Boss
            </Badge>
            <p className="text-lg text-muted-foreground mb-6">
              You've mastered the art of managing your money effectively!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{budgetJourneyData.length}</div>
                <div className="text-sm text-muted-foreground">Levels Completed</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{progress.totalPointsEarned}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">100%</div>
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

  // Main level selection screen with grid layout
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personal Finance
        </Button>
      </div>

      {/* Header Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
        <div className="text-4xl mb-4">💰</div>
        <h1 className="text-3xl font-bold mb-2">Budgeting 101</h1>
        <p className="text-muted-foreground mb-6">
          Master the art of managing your money through 5 interactive levels!
        </p>
        
        {/* Progress Section */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Overall Progress</span>
            <span>{progress.completedLevels.length}/{budgetJourneyData.length} levels completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-400 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(progress.completedLevels.length / budgetJourneyData.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {budgetJourneyData.map((level) => {
          const isUnlocked = isLevelUnlocked(level.id);
          const isCompleted = isLevelCompleted(level.id);
          
          return (
            <Card
              key={level.id}
              className={`aspect-square cursor-pointer transition-all hover:shadow-lg relative ${
                isCompleted 
                  ? 'border-2 border-blue-500 bg-blue-50' 
                  : isUnlocked 
                    ? 'border-2 border-blue-200 hover:border-blue-400 bg-white' 
                    : 'opacity-50 cursor-not-allowed bg-gray-50'
              }`}
              onClick={() => isUnlocked && setSelectedLevel(level.id)}
            >
              <CardContent className="p-4 h-full flex flex-col justify-between">
                <div className="text-center flex-1 flex flex-col justify-center">
                  <div className="text-2xl mb-2">
                    {isCompleted ? (
                      <CheckCircle2 className="h-8 w-8 text-blue-600 mx-auto" />
                    ) : isUnlocked ? (
                      <Play className="h-8 w-8 text-blue-600 mx-auto" />
                    ) : (
                      <Lock className="h-8 w-8 text-gray-400 mx-auto" />
                    )}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Level {level.id}</h3>
                  <p className="text-xs text-muted-foreground leading-tight">{level.title}</p>
                </div>
                
                <div className="text-center">
                  {isCompleted && (
                    <Badge className="text-xs bg-blue-500 text-white">Complete</Badge>
                  )}
                  {!isCompleted && isUnlocked && (
                    <Badge variant="outline" className="text-xs">Start</Badge>
                  )}
                  {!isUnlocked && (
                    <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Mini-Game Card */}
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
