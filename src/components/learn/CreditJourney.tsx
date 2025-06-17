
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star, CheckCircle2, Lock, Play } from 'lucide-react';
import { creditJourneyData } from '@/data/credit-journey-data';
import CreditLevel from './CreditLevel';
import CreditMiniGame from './CreditMiniGame';
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
    if (newCompletedLevels.length === creditJourneyData.length) {
      setShowMiniGame(true);
    }

    saveProgress(newProgress);
    updateLearningProgress(20); // 20% progress per level
    setSelectedLevel(null); // Return to level selection
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('credit-journey', isCorrect);
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
          <h1 className="text-3xl font-bold">Credit Score Builder Challenge</h1>
        </div>
        
        <CreditMiniGame onComplete={handleMiniGameComplete} />
      </div>
    );
  }

  // Show individual level screen
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

        <Card className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">Journey Complete!</h2>
            <Badge className="bg-green-500 text-white text-lg px-6 py-2 mb-4">
              <Trophy className="h-4 w-4 mr-2" />
              Credit Champ
            </Badge>
            <p className="text-lg text-muted-foreground mb-6">
              You've mastered the fundamentals of building and maintaining excellent credit!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{creditJourneyData.length}</div>
                <div className="text-sm text-muted-foreground">Levels Completed</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{progress.totalPointsEarned}</div>
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

  // Main level selection screen with card layout
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personal Finance
        </Button>
      </div>

      {/* Header Section */}
      <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
        <div className="text-4xl mb-4">🏆</div>
        <h1 className="text-3xl font-bold mb-2">Credit Learning Journey</h1>
        <p className="text-muted-foreground mb-6">
          Master the basics of credit through 5 interactive levels and unlock the credit score builder simulation!
        </p>
        
        {/* Progress Section */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Overall Progress</span>
            <span>{progress.completedLevels.length}/{creditJourneyData.length} levels completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(progress.completedLevels.length / creditJourneyData.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creditJourneyData.map((level) => {
          const isUnlocked = isLevelUnlocked(level.id);
          const isCompleted = isLevelCompleted(level.id);
          
          return (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isCompleted 
                  ? 'border-2 border-green-500/50 bg-green-50/50' 
                  : isUnlocked 
                    ? 'border border-green-500/30 hover:border-green-500/50' 
                    : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => isUnlocked && setSelectedLevel(level.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Level {level.id}
                      </Badge>
                    ) : isUnlocked ? (
                      <Badge variant="outline">Level {level.id}</Badge>
                    ) : (
                      <Badge variant="outline" className="opacity-50">
                        <Lock className="h-3 w-3 mr-1" />
                        Level {level.id}
                      </Badge>
                    )}
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <CardTitle className="text-lg">{level.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {level.description}
                </p>
                
                {isCompleted && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Level Complete!</span>
                    </div>
                  </div>
                )}
                
                <Button 
                  className={`w-full ${
                    isCompleted 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : isUnlocked 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  size="sm"
                  disabled={!isUnlocked}
                >
                  {!isUnlocked ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </>
                  ) : isCompleted ? (
                    'Review Level'
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Level
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {/* Mini-Game Card */}
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
