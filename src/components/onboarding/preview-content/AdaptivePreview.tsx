import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, TrendingUp, PlayCircle, Target } from 'lucide-react';

const AdaptivePreview: React.FC = () => {
  const learningPaths = [
    {
      title: 'Personal Finance Pro',
      icon: Target,
      lessons: 15,
      progress: 0,
      color: 'text-purple-600 border-purple-200 bg-purple-50'
    },
    {
      title: 'Company Discovery',
      icon: TrendingUp,
      lessons: 8,
      progress: 0,
      color: 'text-blue-600 border-blue-200 bg-blue-50'
    },
    {
      title: 'Careers in Finance',
      icon: BookOpen,
      lessons: 12,
      progress: 0,
      color: 'text-emerald-600 border-emerald-200 bg-emerald-50'
    },
    {
      title: 'Learning Games',
      icon: PlayCircle,
      lessons: 6,
      progress: 0,
      color: 'text-orange-600 border-orange-200 bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">What it is:</h3>
        <p className="text-muted-foreground leading-relaxed">
          AI-powered learning that adapts to YOUR level. Start with basics or jump to advanced topics—lessons adjust based on your progress and performance. No two learning paths are exactly the same!
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">How it works:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {learningPaths.map((path, index) => {
            const IconComponent = path.icon;
            return (
              <Card key={index} className={`p-4 border-2 ${path.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    <span className="font-semibold text-sm">{path.title}</span>
                  </div>
                  <span className="text-xs font-medium">{path.lessons} lessons</span>
                </div>
                <Progress value={path.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Not started</p>
              </Card>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Each path tracks your progress and unlocks new content as you level up.
        </p>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg border-2 border-emerald-200">
        <h3 className="text-lg font-semibold mb-2">Why it matters:</h3>
        <p className="text-muted-foreground leading-relaxed">
          Never waste time on lessons that are too easy or too hard. Learn at YOUR pace, unlock content as you master skills, and track your progress in real-time. It's like having a personal tutor who knows exactly what you need next!
        </p>
      </div>
    </div>
  );
};

export default AdaptivePreview;
