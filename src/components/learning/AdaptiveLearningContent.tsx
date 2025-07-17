
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Trophy, Target, Brain, PlayCircle, Clock, Users, Star, Zap, TrendingUp, Lightbulb } from 'lucide-react';
import InteractiveLearningHub from './InteractiveLearningHub';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';

const AdaptiveLearningContent: React.FC = () => {
  const { profile } = useAuth();
  const isMobile = useIsMobile();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const learningPaths = [
    {
      id: 'beginner',
      title: 'Foundation Builder',
      icon: BookOpen,
      description: 'Start with basic financial concepts',
      color: 'emerald',
      progress: 45,
      lessons: 12,
      estimated: '2 weeks'
    },
    {
      id: 'stocks',
      title: 'Stock Market Explorer',
      icon: TrendingUp,
      description: 'Learn about stocks and trading',
      color: 'blue',
      progress: 30,
      lessons: 8,
      estimated: '1 week'
    },
    {
      id: 'personal',
      title: 'Personal Finance Pro',
      icon: Target,
      description: 'Master budgeting and planning',
      color: 'purple',
      progress: 60,
      lessons: 15,
      estimated: '3 weeks'
    },
    {
      id: 'games',
      title: 'Learning Games',
      icon: PlayCircle,
      description: 'Interactive financial games',
      color: 'orange',
      progress: 25,
      lessons: 6,
      estimated: '1 week'
    }
  ];

  const dailyTasks = [
    { title: 'Complete Market Quiz', completed: true, points: 10 },
    { title: 'Read Financial Term', completed: true, points: 5 },
    { title: 'Play Panda Jump', completed: false, points: 15 },
    { title: 'Watch Trading Video', completed: false, points: 20 }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'border-emerald-200 hover:border-emerald-400 text-emerald-700',
      blue: 'border-blue-200 hover:border-blue-400 text-blue-700',
      purple: 'border-purple-200 hover:border-purple-400 text-purple-700',
      orange: 'border-orange-200 hover:border-orange-400 text-orange-700'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  if (selectedPath) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Button 
          variant="outline" 
          onClick={() => setSelectedPath(null)}
          className="mb-6"
        >
          ← Back to Learning Hub
        </Button>
        <InteractiveLearningHub />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Enhanced Welcome Card */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 overflow-hidden">
        <CardContent className="p-6">
          <div className={`flex items-center ${isMobile ? 'flex-col text-center space-y-4' : 'justify-between'}`}>
            <div className="flex items-center gap-4">
              <PandaLogo className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
              <div>
                <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-emerald-800 mb-2`}>
                  Your Learning Dashboard 🎓
                </h1>
                <p className={`text-emerald-700 ${isMobile ? 'text-sm' : ''}`}>
                  Content adapted for {profile?.app_version || 'your'} level learning
                </p>
              </div>
            </div>
            <div className={`${isMobile ? 'flex gap-2' : 'text-right space-y-2'}`}>
              <Badge variant="outline" className="text-emerald-700 border-emerald-300">
                {profile?.app_version || 'Beginner'} Level
              </Badge>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-600 flex items-center gap-1`}>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>Keep going! You're doing great!</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-700">12</div>
            <div className="text-xs text-muted-foreground">Concepts Learned</div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-700">85%</div>
            <div className="text-xs text-muted-foreground">Average Score</div>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-700">7</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-700">245</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          Choose Your Learning Path
        </h2>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}>
          {learningPaths.map((path) => {
            const IconComponent = path.icon;
            return (
              <Card 
                key={path.id}
                className={`${getColorClasses(path.color)} cursor-pointer transition-all hover:shadow-lg`}
                onClick={() => setSelectedPath(path.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className="h-8 w-8" />
                    <Badge variant="outline" className="text-xs">
                      {path.lessons} lessons
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{path.estimated}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Daily Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Today's Learning Goals
          </CardTitle>
          <CardDescription>
            Complete these tasks to earn points and build your streak!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.title}
                  </span>
                </div>
                <Badge variant={task.completed ? 'default' : 'outline'}>
                  {task.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        <Button 
          onClick={() => setSelectedPath('games')}
          className="h-20 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <div className="text-center">
            <PlayCircle className="h-8 w-8 mx-auto mb-1" />
            <div>Play Learning Games</div>
          </div>
        </Button>
        <Button 
          onClick={() => setSelectedPath('beginner')}
          variant="outline"
          className="h-20"
        >
          <div className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-1" />
            <div>Continue Learning</div>
          </div>
        </Button>
        <Button 
          onClick={() => setSelectedPath('stocks')}
          variant="outline"
          className="h-20"
        >
          <div className="text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-1" />
            <div>Market Practice</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AdaptiveLearningContent;
