
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Play, Trophy, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import QuizGame from './quizzes/QuizGame';

interface QuizStats {
  totalCompleted: number;
  totalScore: number;
  bestStreak: number;
  currentStreak: number;
}

const QuizzesSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [customQuestionCount, setCustomQuestionCount] = useState(10);
  const [stats, setStats] = useState<QuizStats>({
    totalCompleted: 0,
    totalScore: 0,
    bestStreak: 0,
    currentStreak: 0
  });
  const isMobile = useIsMobile();

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-500' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
    { value: 'pro', label: 'Pro', color: 'bg-red-500' }
  ] as const;

  useEffect(() => {
    loadStats();
  }, [selectedLevel]);

  const loadStats = () => {
    const storageKey = `quiz_stats_${selectedLevel}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setStats(JSON.parse(stored));
    } else {
      setStats({
        totalCompleted: 0,
        totalScore: 0,
        bestStreak: 0,
        currentStreak: 0
      });
    }
  };

  const updateStats = (score: number, totalQuestions: number, streak: number) => {
    const newStats = {
      totalCompleted: stats.totalCompleted + 1,
      totalScore: stats.totalScore + score,
      bestStreak: Math.max(stats.bestStreak, streak),
      currentStreak: streak
    };
    
    const storageKey = `quiz_stats_${selectedLevel}`;
    localStorage.setItem(storageKey, JSON.stringify(newStats));
    setStats(newStats);
  };

  const getAverageScore = () => {
    if (stats.totalCompleted === 0) return 0;
    return Math.round((stats.totalScore / stats.totalCompleted) * 100) / 100;
  };

  const handleQuizComplete = (score: number, totalQuestions: number, streak: number) => {
    updateStats(score, totalQuestions, streak);
    setActiveQuiz(false);
  };

  if (activeQuiz) {
    return (
      <QuizGame 
        level={selectedLevel} 
        questionCount={customQuestionCount}
        onComplete={handleQuizComplete}
        onExit={() => setActiveQuiz(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Knowledge Quizzes
            <Badge variant="outline">Test Mode</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Challenge yourself with adaptive quizzes based on your uploaded terms
          </p>
        </CardHeader>
      </Card>

      {/* Level Selection */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        {levels.map((level) => (
          <Card 
            key={level.value}
            className={`cursor-pointer transition-all ${
              selectedLevel === level.value 
                ? 'ring-2 ring-primary border-primary' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedLevel(level.value)}
          >
            <CardContent className="p-6 text-center">
              <Badge className={`${level.color} text-white mb-3`}>
                {level.label}
              </Badge>
              <h3 className="font-semibold mb-2">Custom Questions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {level.value === 'beginner' && 'Multiple choice format'}
                {level.value === 'intermediate' && 'Mixed question types'}
                {level.value === 'pro' && 'Complex scenarios'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quiz Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quiz Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="question-count">Number of Questions:</Label>
            <Input
              id="question-count"
              type="number"
              min="5"
              max="50"
              value={customQuestionCount}
              onChange={(e) => setCustomQuestionCount(Math.max(5, Math.min(50, parseInt(e.target.value) || 10)))}
              className="w-24"
            />
            <Button 
              onClick={() => setActiveQuiz(true)}
              className="ml-auto"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Quiz ({customQuestionCount} questions)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Your Progress - {selectedLevel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{stats.totalCompleted}</div>
              <div className="text-sm text-muted-foreground">Quizzes Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{getAverageScore()}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">{stats.bestStreak}</div>
              <div className="text-sm text-muted-foreground">Best Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizzesSection;
