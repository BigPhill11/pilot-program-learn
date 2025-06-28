
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Shuffle, Gamepad2 } from 'lucide-react';
import FlashcardsSection from './FlashcardsSection';
import QuizzesSection from './QuizzesSection';
import MatchingGameSection from './MatchingGameSection';
import PandaJumpSection from './PandaJumpSection';
import { useIsMobile } from '@/hooks/use-mobile';

const InteractiveLearningHub: React.FC = () => {
  const isMobile = useIsMobile();

  const sections = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      icon: BookOpen,
      description: 'Study with interactive flashcards',
      component: FlashcardsSection
    },
    {
      id: 'quizzes',
      title: 'Quizzes',
      icon: Brain,
      description: 'Test your knowledge with quizzes',
      component: QuizzesSection
    },
    {
      id: 'matching',
      title: 'Matching Game',
      icon: Shuffle,
      description: 'Match terms with definitions',
      component: MatchingGameSection
    },
    {
      id: 'panda-jump',
      title: 'Panda Jump',
      icon: Gamepad2,
      description: 'Fun game with Phil the Panda',
      component: PandaJumpSection
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Interactive Learning Hub
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your learning style and difficulty level to master financial concepts
        </p>
      </div>

      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className={`grid w-full grid-cols-4 ${isMobile ? 'h-auto' : ''}`}>
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <TabsTrigger 
                key={section.id}
                value={section.id} 
                className={`${isMobile ? 'text-xs py-3 px-2' : ''}`}
              >
                <IconComponent className="h-4 w-4 mr-1" />
                {isMobile ? section.title.split(' ')[0] : section.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {sections.map((section) => {
          const Component = section.component;
          return (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              <Component />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default InteractiveLearningHub;
