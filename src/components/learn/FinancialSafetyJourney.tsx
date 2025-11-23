
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, ClipboardCheck, Lock } from 'lucide-react';
import { ModulePreTest } from '@/components/assessment/ModulePreTest';
import { ModulePostTest } from '@/components/assessment/ModulePostTest';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';
import { financialSafetyJourneyData } from '@/data/financial-safety-journey-data';
import FinancialSafetyJourneyLevelCard from './FinancialSafetyJourneyLevelCard';
import FinancialSafetyJourneyHeader from './FinancialSafetyJourneyHeader';
import FinancialSafetyLevel from './FinancialSafetyLevel';
import FinancialSafetyMiniGame from './FinancialSafetyMiniGame';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface FinancialSafetyJourneyProps {
  onBack: () => void;
}

interface JourneyProgress {
  completedLevels: number[];
  currentLevel: number;
  journeyCompleted: boolean;
  totalPointsEarned: number;
}

const FinancialSafetyJourney: React.FC<FinancialSafetyJourneyProps> = ({ onBack }) => {
  const { updateQuizScore, updateLearningProgress } = useProgressTracking();
  const unifiedProgress = useUnifiedProgress({
    moduleId: 'financial-safety-journey',
    moduleType: 'personal_finance'
  });
  const [showPreTest, setShowPreTest] = useState(false);
  const [showPostTest, setShowPostTest] = useState(false);
  const testSummary = unifiedProgress.getTestSummary();
  
  const [progress, setProgress] = useState<JourneyProgress>({
    completedLevels: [],
    currentLevel: 1,
    journeyCompleted: false,
    totalPointsEarned: 0
  });
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [showMiniGame, setShowMiniGame] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('financialSafetyJourneyProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!testSummary.hasPreTest && !showPreTest) {
      setShowPreTest(true);
    }
  }, [testSummary.hasPreTest, showPreTest]);

  const saveProgress = (newProgress: JourneyProgress) => {
    setProgress(newProgress);
    localStorage.setItem('financialSafetyJourneyProgress', JSON.stringify(newProgress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = [...progress.completedLevels, levelId];
    const newProgress = {
      ...progress,
      completedLevels: newCompletedLevels,
      currentLevel: Math.min(levelId + 1, financialSafetyJourneyData.length + 1),
      totalPointsEarned: progress.totalPointsEarned + 5
    };

    // Check if all levels are completed
    if (newCompletedLevels.length === financialSafetyJourneyData.length) {
      setShowMiniGame(true);
    }

    saveProgress(newProgress);
    updateLearningProgress(20, 30); // 20% progress per level + XP
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('financial-safety-journey', isCorrect);
  };

  const handleMiniGameComplete = () => {
    const newProgress = {
      ...progress,
      journeyCompleted: true,
      totalPointsEarned: progress.totalPointsEarned + 15 // Bonus points for completing mini-game
    };
    saveProgress(newProgress);
    updateLearningProgress(20, 50); // Final 20% + XP for mini-game completion
    setShowMiniGame(false);
    setSelectedLevelId(null);
  };

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevelId(levelId);
  };

  const handleBackToLevels = () => {
    setSelectedLevelId(null);
    setShowMiniGame(false);
  };

  const isPostTestUnlocked = () => {
    return progress.completedLevels.length === financialSafetyJourneyData.length;
  };

  const handlePreTestComplete = async (results: { score: number; answers: number[]; weakAreas: string[]; strongAreas: string[] }) => {
    await unifiedProgress.savePreTestResults(results.score, results.answers, results.weakAreas, results.strongAreas);
    setShowPreTest(false);
  };

  const handlePostTestComplete = async (results: { score: number; answers: number[]; weakAreas: string[]; strongAreas: string[]; improvement: number }) => {
    await unifiedProgress.savePostTestResults(results.score, results.answers, results.weakAreas, results.strongAreas);
    setShowPostTest(false);
  };

  // Show selected level content
  if (selectedLevelId) {
    const selectedLevel = financialSafetyJourneyData.find(level => level.id === selectedLevelId);
    if (selectedLevel) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackToLevels}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Levels
            </Button>
            <h1 className="text-3xl font-bold">{selectedLevel.title}</h1>
          </div>
          
          <FinancialSafetyLevel
            level={selectedLevel}
            isUnlocked={selectedLevel.id <= progress.currentLevel}
            isCompleted={progress.completedLevels.includes(selectedLevel.id)}
            onComplete={() => handleLevelComplete(selectedLevel.id)}
            onQuizComplete={handleQuizComplete}
          />
        </div>
      );
    }
  }

  // Show mini-game
  if (showMiniGame && !progress.journeyCompleted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBackToLevels}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <h1 className="text-3xl font-bold">Defend Your Wallet</h1>
        </div>
        
        <FinancialSafetyMiniGame onComplete={handleMiniGameComplete} />
      </div>
    );
  }

  // Show completion screen
  if (progress.journeyCompleted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personal Finance
          </Button>
        </div>

        <Card className="border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🛡️</div>
            <h2 className="text-3xl font-bold text-purple-700 mb-4">Journey Complete!</h2>
            <Badge className="bg-purple-500 text-white text-lg px-6 py-2 mb-4">
              <Trophy className="h-4 w-4 mr-2" />
              Money Defender
            </Badge>
            <p className="text-lg text-muted-foreground mb-6">
              You've built your financial armor and are ready to protect your money!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{financialSafetyJourneyData.length}</div>
                <div className="text-sm text-muted-foreground">Levels Completed</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-indigo-600">{progress.totalPointsEarned}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">100%</div>
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

  // Show main journey overview with grid layout
  return (
    <div className="space-y-6">
      <Dialog open={showPreTest} onOpenChange={setShowPreTest}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ModulePreTest
            moduleId="financial-safety-journey"
            moduleName="Financial Safety Journey"
            onComplete={handlePreTestComplete}
            onSkip={() => setShowPreTest(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showPostTest} onOpenChange={setShowPostTest}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ModulePostTest
            moduleId="financial-safety-journey"
            moduleName="Financial Safety Journey"
            preTestScore={testSummary.preTestScore}
            isUnlocked={isPostTestUnlocked()}
            completedLessons={progress.completedLevels.length}
            totalLessons={financialSafetyJourneyData.length}
            onComplete={handlePostTestComplete}
          />
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personal Finance
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Money Armor: Financial Safety & Protection</h1>
          <p className="text-muted-foreground">Protect your money, identity, and future through 5 interactive levels + wallet defense simulation</p>
        </div>
      </div>

      <FinancialSafetyJourneyHeader
        completedLevels={progress.completedLevels}
        totalLevels={financialSafetyJourneyData.length}
        journeyCompleted={progress.journeyCompleted}
        totalPointsEarned={progress.totalPointsEarned}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className={testSummary.hasPreTest ? 'border-green-500' : 'border-blue-500'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardCheck className="h-5 w-5" />
              Pre-Test
              {testSummary.hasPreTest && <span className="text-sm text-green-600">✓ Completed</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {testSummary.hasPreTest ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Score: {testSummary.preTestScore}%</p>
                <Button variant="outline" size="sm" onClick={() => setShowPreTest(true)}>
                  Retake Pre-Test
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Test your current knowledge</p>
                <Button onClick={() => setShowPreTest(true)} size="sm">
                  Start Pre-Test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={!isPostTestUnlocked() ? 'border-muted opacity-60' : testSummary.hasPostTest ? 'border-green-500' : 'border-purple-500'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              {!isPostTestUnlocked() && <Lock className="h-5 w-5" />}
              <ClipboardCheck className="h-5 w-5" />
              Post-Test
              {testSummary.hasPostTest && <span className="text-sm text-green-600">✓ Completed</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isPostTestUnlocked() ? (
              <p className="text-sm text-muted-foreground">Complete all lessons to unlock</p>
            ) : testSummary.hasPostTest ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Score: {testSummary.postTestScore}% ({testSummary.improvement && testSummary.improvement > 0 ? '+' : ''}{testSummary.improvement}%)
                </p>
                <Button variant="outline" size="sm" onClick={() => setShowPostTest(true)}>
                  Retake Post-Test
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Test what you've learned</p>
                <Button onClick={() => setShowPostTest(true)} size="sm">
                  Start Post-Test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financialSafetyJourneyData.map((level) => (
          <FinancialSafetyJourneyLevelCard
            key={level.id}
            level={level}
            isUnlocked={level.id <= progress.currentLevel}
            isCompleted={progress.completedLevels.includes(level.id)}
            onLevelSelect={handleLevelSelect}
          />
        ))}
      </div>

      {progress.completedLevels.length === financialSafetyJourneyData.length && (
        <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Final Challenge Unlocked!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You've completed all 5 levels! Now test your skills in the Defend Your Wallet simulation.
            </p>
            <Button onClick={() => setShowMiniGame(true)} size="lg" className="w-full">
              Start Wallet Defense Game
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialSafetyJourney;
