import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Trophy, Clock, BarChart3 } from 'lucide-react';
import { investmentBankingLessons } from '@/data/investment-banking-lessons';
import InteractiveIBLesson from './InteractiveIBLesson';
import { ibDivisions, type IBDivision } from '@/data/ib-divisions';

interface InvestmentBankingJourneyProps {
  onBack: () => void;
}

const InvestmentBankingJourney: React.FC<InvestmentBankingJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isJourneyCompleted, setIsJourneyCompleted] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<IBDivision | null>(null);
  const [selectedDivisionLessonIndex, setSelectedDivisionLessonIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('investmentBanking-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCompletedLevels(new Set(parsed.completedLevels || []));
      setIsJourneyCompleted(Boolean(parsed.isCompleted));
    }
  }, []);

  const saveProgress = (levels: Set<number>, completed: boolean) => {
    localStorage.setItem(
      'investmentBanking-progress',
      JSON.stringify({ completedLevels: Array.from(levels), isCompleted: completed })
    );
  };

  const handleLevelComplete = (levelNum: number) => {
    const next = new Set(completedLevels);
    next.add(levelNum);
    const allDone = next.size === investmentBankingLessons.length;
    setCompletedLevels(next);
    setIsJourneyCompleted(allDone);
    saveProgress(next, allDone);
    setSelectedLevel(null);
  };

  const isLevelUnlocked = (levelNum: number) => {
    if (levelNum === 1) return true;
    return completedLevels.has(levelNum - 1);
  };

  if (selectedLevel !== null) {
    const lesson = investmentBankingLessons.find(l => l.level === selectedLevel);
    if (lesson) {
      return (
        <InteractiveIBLesson
          lesson={lesson}
          onBack={() => setSelectedLevel(null)}
          onComplete={() => handleLevelComplete(selectedLevel)}
        />
      );
    }
  }

  if (selectedDivision) {
    const lesson = selectedDivision.lessons[selectedDivisionLessonIndex];
    return (
      <InteractiveIBLesson
        lesson={lesson}
        onBack={() => setSelectedDivision(null)}
        onComplete={() => {
          if (selectedDivisionLessonIndex < selectedDivision.lessons.length - 1) {
            setSelectedDivisionLessonIndex(selectedDivisionLessonIndex + 1);
          } else {
            setSelectedDivision(null);
            setSelectedDivisionLessonIndex(0);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-blue-700 hover:text-blue-800 hover:bg-blue-100">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Careers
          </Button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300 mb-2">Investment Banking Journey</h2>
          <p className="text-lg text-muted-foreground">Engaging, step-by-step learning in a friendly, sage-green theme</p>
        </div>

        <div className="grid gap-6">
          {investmentBankingLessons.map(level => {
            const locked = !isLevelUnlocked(level.level);
            const done = completedLevels.has(level.level);
            return (
              <Card key={level.level} className={`border-2 ${done ? 'border-emerald-300' : locked ? 'border-muted' : 'border-emerald-200'} bg-white/70 dark:bg-background/60 shadow-sm`}>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-xl text-emerald-800 dark:text-emerald-300">
                      Level {level.level}: {level.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{level.theme}</p>
                  </div>
                  {done ? (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Trophy className="h-5 w-5" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  ) : (
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                  )}
                </CardHeader>
                <CardContent className="flex items-start justify-between gap-4 pt-0">
                  <p className="text-sm text-foreground/90 flex-1 pr-2">{level.description}</p>
                  <div>
                    <Button disabled={locked} onClick={() => setSelectedLevel(level.level)}>
                      {locked ? 'Locked' : done ? 'Review' : 'Start Lesson'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {isJourneyCompleted && (
            <Card className="border-2 border-emerald-300 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 shadow-lg">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <Trophy className="h-16 w-16 text-emerald-500" />
                    <Sparkles className="h-6 w-6 text-teal-500 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-emerald-700 dark:text-emerald-300">🎉 Investment Banking Journey Complete! 🎉</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-emerald-700 dark:text-emerald-300">Great work! Explore specialized IB divisions to deepen your expertise.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-10">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold tracking-tight text-emerald-800 dark:text-emerald-300">Specialized IB Divisions</h3>
            <p className="text-muted-foreground">Deep dives into M&A, DCM, ECM, LevFin, Sales & Trading, and Restructuring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ibDivisions.map((division) => (
              <Card 
                key={division.id}
                className="flex flex-col hover:shadow-lg hover:border-primary transition-all cursor-pointer group h-full"
                onClick={() => setSelectedDivision(division)}
              >
                <CardHeader className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl">{division.icon}</div>
                    <Badge variant={division.difficulty === 'advanced' ? 'destructive' : 'secondary'}>
                      {division.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{division.name}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{division.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{division.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>{division.lessons.length} Levels</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Course Structure:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {division.lessons.map((lesson, idx) => (
                        <div key={idx} className="bg-muted rounded-md p-2 text-center">
                          <div className="text-xs font-medium">Level {lesson.level}</div>
                          <div className="text-xs text-muted-foreground truncate">{lesson.theme}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentBankingJourney;


