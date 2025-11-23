
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, ClipboardCheck, Lock } from 'lucide-react';
import { budgetJourneyData, budgetMiniGame } from '@/data/budgeting-journey-data';
import BudgetLevel from './BudgetLevel';
import BudgetMiniGame from './BudgetMiniGame';
import BudgetJourneyHeader from './BudgetJourneyHeader';
import BudgetJourneyLevelCard from './BudgetJourneyLevelCard';
import BudgetJourneyCompletion from './BudgetJourneyCompletion';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { ModulePreTest } from '@/components/assessment/ModulePreTest';
import { ModulePostTest } from '@/components/assessment/ModulePostTest';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
  const { savePreTestResults, savePostTestResults, getTestSummary } = useUnifiedProgress({
    moduleId: 'budget-journey',
    moduleType: 'personal_finance'
  });
  
  const [progress, setProgress] = useState<JourneyProgress>({
    completedLevels: [],
    currentLevel: 1,
    journeyCompleted: false,
    totalPointsEarned: 0
  });
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showPreTest, setShowPreTest] = useState(false);
  const [showPostTest, setShowPostTest] = useState(false);
  const testSummary = getTestSummary();

  useEffect(() => {
    const saved = localStorage.getItem('budgetJourneyProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
    
    // Show pre-test on first visit if not completed
    if (!testSummary.hasPreTest) {
      setShowPreTest(true);
    }
  }, [testSummary.hasPreTest]);

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

  const isPostTestUnlocked = () => {
    return progress.completedLevels.length === budgetJourneyData.length && progress.journeyCompleted;
  };

  const handlePreTestComplete = async (results: any) => {
    await savePreTestResults(results.score, results.answers, results.weakAreas, results.strongAreas);
    setShowPreTest(false);
  };

  const handlePostTestComplete = async (results: any) => {
    await savePostTestResults(results.score, results.answers, results.weakAreas, results.strongAreas);
    setShowPostTest(false);
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

      {/* Pre-Test and Post-Test Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Pre-Test Card */}
        <Card className={`border-2 ${testSummary.hasPreTest ? 'border-green-500/20 bg-green-50/50 dark:bg-green-950/20' : 'border-primary'}`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Pre-Test</h3>
                <p className="text-sm text-muted-foreground">Check your starting knowledge</p>
              </div>
              <ClipboardCheck className={`w-8 h-8 ${testSummary.hasPreTest ? 'text-green-500' : 'text-primary'}`} />
            </div>
            {testSummary.hasPreTest ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="text-sm font-medium">Your Score:</span>
                  <Badge variant="secondary" className="text-lg">{testSummary.preTestScore}%</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setShowPreTest(true)}>
                  View Results
                </Button>
              </div>
            ) : (
              <Button className="w-full" onClick={() => setShowPreTest(true)}>
                Take Pre-Test
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Post-Test Card */}
        <Card className={`border-2 ${isPostTestUnlocked() ? (testSummary.hasPostTest ? 'border-green-500/20 bg-green-50/50 dark:bg-green-950/20' : 'border-primary') : 'border-muted bg-muted/30'}`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Post-Test</h3>
                <p className="text-sm text-muted-foreground">
                  {isPostTestUnlocked() ? 'Show what you learned!' : 'Complete all lessons to unlock'}
                </p>
              </div>
              {isPostTestUnlocked() ? (
                <Trophy className={`w-8 h-8 ${testSummary.hasPostTest ? 'text-green-500' : 'text-yellow-500'}`} />
              ) : (
                <Lock className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            {testSummary.hasPostTest ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="text-sm font-medium">Your Score:</span>
                  <Badge variant="secondary" className="text-lg">{testSummary.postTestScore}%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <span className="text-sm font-medium">Improvement:</span>
                  <Badge className="text-lg">+{testSummary.improvement}%</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setShowPostTest(true)}>
                  View Results
                </Button>
              </div>
            ) : isPostTestUnlocked() ? (
              <Button className="w-full" onClick={() => setShowPostTest(true)}>
                Take Post-Test 🎯
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-center text-muted-foreground">
                  {progress.completedLevels.length}/{budgetJourneyData.length} lessons completed
                </div>
                <Button className="w-full" disabled>
                  <Lock className="w-4 h-4 mr-2" />
                  Locked
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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

      {/* Pre-Test Modal */}
      <Dialog open={showPreTest} onOpenChange={setShowPreTest}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <ModulePreTest
            moduleId="budget-journey"
            moduleName="Budgeting Basics"
            onComplete={handlePreTestComplete}
            onSkip={() => setShowPreTest(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Post-Test Modal */}
      <Dialog open={showPostTest} onOpenChange={setShowPostTest}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <ModulePostTest
            moduleId="budget-journey"
            moduleName="Budgeting Basics"
            preTestScore={testSummary.preTestScore || 0}
            isUnlocked={isPostTestUnlocked()}
            completedLessons={progress.completedLevels.length}
            totalLessons={budgetJourneyData.length}
            onComplete={handlePostTestComplete}
            onClose={() => setShowPostTest(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BudgetJourney;
