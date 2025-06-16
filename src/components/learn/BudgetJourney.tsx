
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Lock, CheckCircle2 } from 'lucide-react';
import BudgetLevel from './BudgetLevel';
import BudgetMiniGame from './BudgetMiniGame';
import { budgetingJourneyData } from '@/data/budgeting-journey-data';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface BudgetJourneyProps {
  onBack: () => void;
}

const BudgetJourney: React.FC<BudgetJourneyProps> = ({ onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const { updateQuizScore } = useProgressTracking();

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('budgetJourneyProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedLevels(new Set(progress.completedLevels || []));
      setJourneyCompleted(progress.journeyCompleted || false);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (levels: Set<number>, completed: boolean = false) => {
    const progress = {
      completedLevels: Array.from(levels),
      journeyCompleted: completed
    };
    localStorage.setItem('budgetJourneyProgress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompleted = new Set(completedLevels);
    newCompleted.add(levelId);
    setCompletedLevels(newCompleted);
    saveProgress(newCompleted);
    
    // Award points for level completion (5 points per level as specified)
    updateQuizScore(`budget-level-${levelId}-completion`, true);
    
    // Check if all levels are completed
    if (newCompleted.size === budgetingJourneyData.length) {
      setShowMiniGame(true);
    } else {
      setSelectedLevel(null);
    }
  };

  const handleMiniGameComplete = () => {
    setJourneyCompleted(true);
    saveProgress(completedLevels, true);
    setShowMiniGame(false);
    setSelectedLevel(null);
    
    // Award bonus points for completing the entire journey
    updateQuizScore('budget-journey-completion', true);
  };

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return completedLevels.has(levelId - 1);
  };

  const overallProgress = (completedLevels.size / budgetingJourneyData.length) * 100;

  // Show mini-game
  if (showMiniGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setShowMiniGame(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
        </div>
        <BudgetMiniGame onComplete={handleMiniGameComplete} />
      </div>
    );
  }

  // Show individual level
  if (selectedLevel) {
    const level = budgetingJourneyData.find(l => l.id === selectedLevel);
    if (!level) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedLevel(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <Badge variant="outline">
            Level {selectedLevel} of {budgetingJourneyData.length}
          </Badge>
        </div>
        <BudgetLevel
          level={level}
          onComplete={handleLevelComplete}
          isUnlocked={isLevelUnlocked(selectedLevel)}
          isCompleted={completedLevels.has(selectedLevel)}
        />
      </div>
    );
  }

  // Show journey overview
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personal Finance
        </Button>
        {journeyCompleted && (
          <Badge className="bg-blue-500 text-white">
            <Trophy className="h-4 w-4 mr-1" />
            Journey Complete
          </Badge>
        )}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">💰 Budgeting Learning Journey</CardTitle>
          <p className="text-center text-muted-foreground">
            Master budgeting through 5 interactive levels and unlock the budget builder simulation!
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{completedLevels.size}/{budgetingJourneyData.length} levels completed</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            
            {completedLevels.size === budgetingJourneyData.length && !journeyCompleted && (
              <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-blue-800">Ready for the Final Challenge!</p>
                <p className="text-sm text-blue-700 mb-3">
                  Complete the budget builder simulation to earn your badge
                </p>
                <Button onClick={() => setShowMiniGame(true)} className="bg-blue-500 hover:bg-blue-600">
                  Start Budget Builder Challenge
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgetingJourneyData.map((level) => {
          const isUnlocked = isLevelUnlocked(level.id);
          const isCompleted = completedLevels.has(level.id);
          
          return (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isCompleted ? 'border-blue-500 bg-blue-50' :
                isUnlocked ? 'border-blue-500/30 hover:border-blue-500' :
                'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => isUnlocked && setSelectedLevel(level.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={isCompleted ? "default" : isUnlocked ? "outline" : "secondary"}>
                    Level {level.id}
                  </Badge>
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  ) : !isUnlocked ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : null}
                </div>
                <h3 className="font-semibold text-lg mb-2">{level.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {level.introCard}
                </p>
                {isUnlocked && (
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full">
                      {isCompleted ? 'Review Level' : 'Start Level'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {journeyCompleted && (
        <Card className="border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-700 mb-2">Journey Complete!</h3>
            <p className="text-muted-foreground mb-4">
              Congratulations! You've mastered budgeting and earned your Budget Boss badge.
            </p>
            <Badge className="bg-blue-500 text-white text-lg px-4 py-2">
              💰 Budget Boss
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BudgetJourney;
