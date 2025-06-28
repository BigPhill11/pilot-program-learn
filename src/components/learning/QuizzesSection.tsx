
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Play, Trophy } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import QuizGame from './quizzes/QuizGame';

const QuizzesSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');
  const [activeQuiz, setActiveQuiz] = useState(false);
  const isMobile = useIsMobile();

  const levels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-500', questions: 10 },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500', questions: 15 },
    { value: 'pro', label: 'Pro', color: 'bg-red-500', questions: 20 }
  ] as const;

  if (activeQuiz) {
    return (
      <QuizGame 
        level={selectedLevel} 
        onComplete={() => setActiveQuiz(false)}
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
              <h3 className="font-semibold mb-2">{level.questions} Questions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {level.value === 'beginner' && 'Multiple choice format'}
                {level.value === 'intermediate' && 'Mixed question types'}
                {level.value === 'pro' && 'Complex scenarios'}
              </p>
              <Button 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveQuiz(true);
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quiz Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">0</div>
              <div className="text-sm text-muted-foreground">Quizzes Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">0%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">0</div>
              <div className="text-sm text-muted-foreground">Best Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizzesSection;
