
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Building, 
  Brain, 
  TrendingUp, 
  Globe,
  Lock,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import StoryReader from './StoryReader';
import { useIsMobile } from '@/hooks/use-mobile';

interface Adventure {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  chapters: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  category: 'company-analysis' | 'market-psychology' | 'forecasting' | 'economics';
}

const PhilAdventures = () => {
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null);
  const isMobile = useIsMobile();

  const adventures: Adventure[] = [
    {
      id: 'bamboo-business',
      title: 'Phil\'s Bamboo Business Empire',
      description: 'Join Phil as he learns to evaluate different bamboo forests (companies) by examining their soil quality (assets), water sources (cash flow), and growth potential.',
      icon: Building,
      difficulty: 'beginner',
      estimatedTime: '15-20 min',
      chapters: 5,
      isUnlocked: true,
      isCompleted: false,
      progress: 0,
      category: 'company-analysis'
    },
    {
      id: 'forest-sentiment',
      title: 'The Great Bamboo Forest Mood Swings',
      description: 'Discover how the emotions of all the pandas in the forest affect bamboo prices, and learn to read the mood of the market through Phil\'s adventures.',
      icon: Brain,
      difficulty: 'beginner',
      estimatedTime: '12-15 min',
      chapters: 4,
      isUnlocked: true,
      isCompleted: false,
      progress: 0,
      category: 'market-psychology'
    },
    {
      id: 'weather-forecasting',
      title: 'Phil\'s Weather Prediction Academy',
      description: 'Learn how Phil predicts bamboo seasons by reading weather patterns, soil conditions, and growth cycles - just like forecasting market trends!',
      icon: TrendingUp,
      difficulty: 'intermediate',
      estimatedTime: '18-25 min',
      chapters: 6,
      isUnlocked: true,
      isCompleted: false,
      progress: 0,
      category: 'forecasting'
    },
    {
      id: 'panda-economics',
      title: 'The Great Panda Valley Economy',
      description: 'Explore how the entire Panda Valley economy works - from bamboo supply chains to panda employment, interest rates, and inflation through Phil\'s eyes.',
      icon: Globe,
      difficulty: 'advanced',
      estimatedTime: '25-30 min',
      chapters: 7,
      isUnlocked: false,
      isCompleted: false,
      progress: 0,
      category: 'economics'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartAdventure = (adventure: Adventure) => {
    if (adventure.isUnlocked) {
      setSelectedAdventure(adventure);
    }
  };

  if (selectedAdventure) {
    return (
      <StoryReader 
        adventure={selectedAdventure} 
        onBack={() => setSelectedAdventure(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-center gap-4">
            <PandaLogo className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
            <div>
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-emerald-800 mb-2`}>
                Phil's Adventures in Finance! 📚
              </h2>
              <p className={`text-emerald-700 ${isMobile ? 'text-sm' : ''}`}>
                Join Phil the panda on interactive learning journeys through the bamboo forest of finance. 
                Learn investing concepts through engaging stories and hands-on activities!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-700">Your Learning Journey</CardTitle>
          <CardDescription>Track your progress through Phil's adventures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {adventures.filter(a => a.isCompleted).length}
              </div>
              <div className="text-sm text-muted-foreground">Adventures Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {adventures.reduce((total, a) => total + a.chapters, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {Math.round(adventures.reduce((total, a) => total + a.progress, 0) / adventures.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">⭐</div>
              <div className="text-sm text-muted-foreground">Panda Expert</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Adventures Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
        {adventures.map((adventure) => {
          const IconComponent = adventure.icon;
          
          return (
            <Card 
              key={adventure.id} 
              className={`border-emerald-200 transition-all hover:shadow-lg ${
                adventure.isUnlocked 
                  ? 'cursor-pointer hover:border-emerald-400' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => handleStartAdventure(adventure)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {adventure.isUnlocked ? (
                      <IconComponent className="h-8 w-8 text-emerald-600" />
                    ) : (
                      <Lock className="h-8 w-8 text-gray-400" />
                    )}
                    <div>
                      <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-emerald-800`}>
                        {adventure.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={getDifficultyColor(adventure.difficulty)}
                        >
                          {adventure.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {adventure.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {adventure.isCompleted && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''} mb-4`}>
                  {adventure.description}
                </p>

                {/* Progress Bar */}
                {adventure.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{adventure.progress}%</span>
                    </div>
                    <Progress value={adventure.progress} className="h-2" />
                  </div>
                )}

                {/* Adventure Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{adventure.chapters} chapters</span>
                  <span>Interactive story</span>
                </div>

                {/* Action Button */}
                <Button 
                  className={`w-full ${
                    adventure.isUnlocked 
                      ? 'bg-emerald-600 hover:bg-emerald-700' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!adventure.isUnlocked}
                  size={isMobile ? 'sm' : 'default'}
                >
                  {adventure.isUnlocked ? (
                    <>
                      {adventure.progress > 0 ? 'Continue Adventure' : 'Start Adventure'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Complete previous adventures to unlock
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PhilAdventures;
