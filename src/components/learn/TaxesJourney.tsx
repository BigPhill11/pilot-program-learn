
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Lock, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { ModulePreTest } from '@/components/assessment/ModulePreTest';
import { ModulePostTest } from '@/components/assessment/ModulePostTest';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';
import TaxesLevel from './TaxesLevel';
import TaxesMiniGame from './TaxesMiniGame';
import { taxesJourneyData } from '@/data/taxes-journey-data';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface TaxesJourneyProps {
  onBack: () => void;
}

const TaxesJourney: React.FC<TaxesJourneyProps> = ({ onBack }) => {
  const unifiedProgress = useUnifiedProgress({
    moduleId: 'taxes-journey',
    moduleType: 'personal_finance'
  });
  const [showPreTest, setShowPreTest] = useState(false);
  const [showPostTest, setShowPostTest] = useState(false);
  const testSummary = unifiedProgress.getTestSummary();
  
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const { updateQuizScore } = useProgressTracking();

  useEffect(() => {
    const saved = localStorage.getItem('taxesJourneyProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedLevels(progress.completedLevels || []);
      setJourneyCompleted(progress.journeyCompleted || false);
    }
  }, []);

  useEffect(() => {
    if (!testSummary.hasPreTest && !showPreTest) {
      setShowPreTest(true);
    }
  }, [testSummary.hasPreTest, showPreTest]);

  const saveProgress = (levels: number[], completed: boolean = false) => {
    const progress = {
      completedLevels: levels,
      journeyCompleted: completed
    };
    localStorage.setItem('taxesJourneyProgress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompleted = [...completedLevels, levelId];
    setCompletedLevels(newCompleted);
    saveProgress(newCompleted);
    
    updateQuizScore(`tax-level-${levelId}-completion`, true);
    
    if (newCompleted.length === taxesJourneyData.length) {
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
    
    updateQuizScore('taxes-journey-completion', true);
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  };

  const isPostTestUnlocked = () => {
    return completedLevels.length === taxesJourneyData.length;
  };

  const handlePreTestComplete = async (results: { score: number; answers: number[]; weakAreas: string[]; strongAreas: string[] }) => {
    await unifiedProgress.savePreTestResults(results.score, results.answers, results.weakAreas, results.strongAreas);
    setShowPreTest(false);
  };

  const handlePostTestComplete = async (results: { score: number; answers: number[]; weakAreas: string[]; strongAreas: string[]; improvement: number }) => {
    await unifiedProgress.savePostTestResults(results.score, results.answers, results.weakAreas, results.strongAreas);
    setShowPostTest(false);
  };

  const overallProgress = (completedLevels.length / taxesJourneyData.length) * 100;

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
        <TaxesMiniGame onComplete={handleMiniGameComplete} />
      </div>
    );
  }

  // Show individual level
  if (selectedLevel) {
    const level = taxesJourneyData.find(l => l.id === selectedLevel);
    if (!level) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedLevel(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <Badge variant="outline">
            Level {selectedLevel} of {taxesJourneyData.length}
          </Badge>
        </div>
        <TaxesLevel
          level={level}
          onComplete={handleLevelComplete}
          isUnlocked={isLevelUnlocked(selectedLevel)}
          isCompleted={completedLevels.includes(selectedLevel)}
        />
      </div>
    );
  }

  // Main journey overview
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Dialog open={showPreTest} onOpenChange={setShowPreTest}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ModulePreTest
            moduleId="taxes-journey"
            moduleName="Taxes Journey"
            onComplete={handlePreTestComplete}
            onSkip={() => setShowPreTest(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showPostTest} onOpenChange={setShowPostTest}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ModulePostTest
            moduleId="taxes-journey"
            moduleName="Taxes Journey"
            preTestScore={testSummary.preTestScore}
            isUnlocked={isPostTestUnlocked()}
            completedLessons={completedLevels.length}
            totalLessons={taxesJourneyData.length}
            onComplete={handlePostTestComplete}
          />
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Personal Finance
        </Button>
        {journeyCompleted && (
          <Badge className="bg-yellow-500 text-white">
            <Trophy className="h-4 w-4 mr-1" />
            Journey Complete
          </Badge>
        )}
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">🎓 Taxes Learning Journey</CardTitle>
          <p className="text-center text-muted-foreground">
            Master the basics of taxes through 5 interactive levels and unlock the tax filing simulation!
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{completedLevels.length}/{taxesJourneyData.length} levels completed</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            
            {completedLevels.length === taxesJourneyData.length && !journeyCompleted && (
              <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="font-semibold text-yellow-800">Ready for the Final Challenge!</p>
                <p className="text-sm text-yellow-700 mb-3">
                  Complete the tax filing simulation to earn your badge
                </p>
                <Button onClick={() => setShowMiniGame(true)} className="bg-yellow-500 hover:bg-yellow-600">
                  Start Tax Filing Simulation
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taxesJourneyData.map((level) => {
          const isUnlocked = isLevelUnlocked(level.id);
          const isCompleted = completedLevels.includes(level.id);
          
          return (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isCompleted ? 'border-green-500 bg-green-50' :
                isUnlocked ? 'border-primary/30 hover:border-primary' :
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
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
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
        <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-yellow-700 mb-2">Journey Complete!</h3>
            <p className="text-muted-foreground mb-4">
              Congratulations! You've mastered the Tax Smart Rookie level and earned your badge.
            </p>
            <Badge className="bg-yellow-500 text-white text-lg px-4 py-2">
              🏆 Tax Smart Rookie
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxesJourney;
