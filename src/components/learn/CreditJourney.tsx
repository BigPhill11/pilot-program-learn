
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, Trophy, Play, ClipboardCheck, Lock } from 'lucide-react';
import { ModulePreTest } from '@/components/assessment/ModulePreTest';
import { ModulePostTest } from '@/components/assessment/ModulePostTest';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';
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
  const unifiedProgress = useUnifiedProgress({
    moduleId: 'credit-journey',
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
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('creditJourneyProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Show pre-test on first visit
  useEffect(() => {
    if (!testSummary.hasPreTest && !showPreTest) {
      setShowPreTest(true);
    }
  }, [testSummary.hasPreTest, showPreTest]);

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
    updateLearningProgress(20, 30);
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
    return progress.completedLevels.length === creditJourneyData.length;
  };

  const handlePreTestComplete = async (results: { score: number; answers: number[]; weakAreas: string[]; strongAreas: string[] }) => {
    await unifiedProgress.savePreTestResults(results.score, results.answers, results.weakAreas, results.strongAreas);
    setShowPreTest(false);
  };

  const handlePostTestComplete = async (results: { score: number; answers: number[]; weakAreas: string[]; strongAreas: string[]; improvement: number }) => {
    await unifiedProgress.savePostTestResults(results.score, results.answers, results.weakAreas, results.strongAreas);
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
    <div className="max-w-4xl mx-auto space-y-6">
      <Dialog open={showPreTest} onOpenChange={setShowPreTest}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ModulePreTest
            moduleId="credit-journey"
            moduleName="Credit Journey"
            onComplete={handlePreTestComplete}
            onSkip={() => setShowPreTest(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showPostTest} onOpenChange={setShowPostTest}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ModulePostTest
            moduleId="credit-journey"
            moduleName="Credit Journey"
            preTestScore={testSummary.preTestScore}
            isUnlocked={isPostTestUnlocked()}
            completedLessons={progress.completedLevels.length}
            totalLessons={creditJourneyData.length}
            onComplete={handlePostTestComplete}
          />
        </DialogContent>
      </Dialog>

      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Personal Finance
      </Button>

      <CreditJourneyHeader
        completedLevels={progress.completedLevels.length}
        totalLevels={creditJourneyData.length}
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
