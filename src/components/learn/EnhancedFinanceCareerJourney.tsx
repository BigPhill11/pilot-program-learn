import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Lock, CheckCircle, Star, Trophy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PandaLogo from '@/components/icons/PandaLogo';
import InteractiveIBLesson from './InteractiveIBLesson';
import type { FinanceCareerData } from '@/data/finance-careers';
import { investmentBankingLessons } from '@/data/investment-banking-lessons';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedFinanceCareerJourneyProps {
  career: FinanceCareerData;
  onBack: () => void;
}

const EnhancedFinanceCareerJourney: React.FC<EnhancedFinanceCareerJourneyProps> = ({ career, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const { profile } = useAuth();
  const isMobile = useIsMobile();

  const userLevel = profile?.app_version || 'beginner';

  const handleLessonComplete = (levelNumber: number) => {
    if (!completedLevels.includes(levelNumber)) {
      setCompletedLevels([...completedLevels, levelNumber]);
    }
    setCurrentLesson(null);
    if (levelNumber === currentLevel) {
      setCurrentLevel(Math.min(currentLevel + 1, 7));
    }
  };

  // If we're in a lesson, show the lesson component
  if (currentLesson !== null) {
    const lesson = investmentBankingLessons.find(l => l.level === currentLesson);
    if (lesson) {
      return (
        <InteractiveIBLesson
          lesson={lesson}
          onBack={() => setCurrentLesson(null)}
          onComplete={() => handleLessonComplete(currentLesson)}
        />
      );
    }
  }

  const getSpeakerIcon = (speaker: string) => {
    switch (speaker) {
      case 'intern': return <Play className="h-4 w-4" />;
      case 'professional': return <Star className="h-4 w-4" />;
      case 'professor': return <Trophy className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case 'intern': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'professional': return 'text-green-600 bg-green-50 border-green-200';
      case 'professor': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`animate-fade-in ${isMobile ? 'max-w-full' : 'max-w-6xl'} mx-auto`}>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Careers
      </Button>
      
      <header className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
        <div className="flex justify-center items-center gap-4 mb-4">
          <PandaLogo className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'}`} />
          <div>
            <h2 className={`${isMobile ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-bold tracking-tight text-foreground`}>
              {career.name} Mastery
            </h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-muted-foreground`}>
              Interactive lessons adapted for {userLevel} level
            </p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <TabsTrigger value="journey" className={isMobile ? 'text-sm' : ''}>
            {isMobile ? 'Interactive Journey' : 'Interactive Learning Journey'}
          </TabsTrigger>
          <TabsTrigger value="videos" className={isMobile ? 'text-sm' : ''}>
            {isMobile ? 'Videos' : 'Career Videos'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="journey" className="space-y-6">
          {/* Progress Overview */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{completedLevels.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{currentLevel}</div>
                  <div className="text-sm text-muted-foreground">Current Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{userLevel}</div>
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Journey Path */}
          <div className="relative">
            <div className={`absolute ${isMobile ? 'left-8' : 'left-1/2 transform -translate-x-1/2'} w-1 bg-muted h-full`}></div>
            
            <div className="space-y-6">
              {investmentBankingLessons.map((lesson, index) => {
                const isCompleted = completedLevels.includes(lesson.level);
                const isCurrent = lesson.level === currentLevel;
                const isLocked = lesson.level > currentLevel;
                
                return (
                  <div key={lesson.level} className={`flex items-center ${isMobile ? 'flex-row' : (index % 2 === 0 ? 'flex-row' : 'flex-row-reverse')}`}>
                    {/* Level node */}
                    <div className={`flex-shrink-0 ${isMobile ? 'w-16' : 'w-1/2'} flex ${isMobile ? 'justify-start' : 'justify-center'}`}>
                      <div className={`relative z-10 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full flex items-center justify-center border-4 transition-all ${
                        isCompleted ? 'bg-green-500 border-green-500 text-white' :
                        isCurrent ? 'bg-primary border-primary text-white animate-pulse' :
                        'bg-muted border-muted-foreground text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
                        ) : isLocked ? (
                          <Lock className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
                        ) : (
                          <span className={`font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}>{lesson.level}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Lesson content */}
                    <div className={`flex-1 ${isMobile ? 'px-4' : 'px-6'}`}>
                      <Card className={`transition-all cursor-pointer hover:shadow-lg ${
                        isCurrent ? 'border-primary border-2 shadow-lg' :
                        isCompleted ? 'border-green-200 bg-green-50' :
                        isLocked ? 'opacity-60' : 'hover:border-primary'
                      }`} onClick={() => !isLocked && setCurrentLesson(lesson.level)}>
                        <CardHeader className={isMobile ? 'pb-3' : ''}>
                          <div className="flex items-center justify-between">
                            <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} flex items-center gap-2`}>
                              Level {lesson.level}: {lesson.title}
                              <PandaLogo className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
                            </CardTitle>
                            {isCompleted && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {lesson.description}
                          </p>
                        </CardHeader>
                        <CardContent className={isMobile ? 'pt-0' : ''}>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                Theme: {lesson.theme}
                              </span>
                              <span className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                {lesson.objectives.length} objectives
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                              <div className="bg-blue-50 p-2 rounded border border-blue-200">
                                <div className="font-semibold text-blue-700">{lesson.miniGames.length}</div>
                                <div className="text-blue-600">Games</div>
                              </div>
                              <div className="bg-green-50 p-2 rounded border border-green-200">
                                <div className="font-semibold text-green-700">{lesson.realWorldExamples.length}</div>
                                <div className="text-green-600">Examples</div>
                              </div>
                              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                                <div className="font-semibold text-purple-700">1</div>
                                <div className="text-purple-600">Quiz</div>
                              </div>
                            </div>
                            
                            <Button 
                              className={`w-full ${isMobile ? 'text-sm' : ''}`}
                              size={isMobile ? 'sm' : 'default'}
                              disabled={isLocked}
                              variant={isCurrent ? "default" : isCompleted ? "outline" : "ghost"}
                              onClick={(e) => {
                                e.stopPropagation();
                                !isLocked && setCurrentLesson(lesson.level);
                              }}
                            >
                              {isCompleted ? "Review Lesson ✓" : 
                               isCurrent ? "Start Interactive Lesson" : 
                               "Locked"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Phil's encouragement */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="flex items-center gap-4">
                <PandaLogo className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'}`} />
                <div>
                  <h3 className={`font-semibold text-green-800 ${isMobile ? 'text-sm' : ''}`}>Phil's Tip</h3>
                  <p className={`text-green-700 ${isMobile ? 'text-xs' : ''}`}>
                    {currentLevel === 1 ? 
                      `Welcome to interactive ${career.name} learning! Each lesson is customized for your ${userLevel} level with games, quizzes, and real-world examples.` :
                     currentLevel <= 3 ? 
                      "Great progress! These interactive lessons will help you master each concept step by step." :
                     currentLevel <= 5 ? 
                      "You're in the advanced territory now. The real-world examples will show you how professionals think!" :
                     "Almost there! You're learning the skills that senior investment bankers use every day!"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-6">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4 md:gap-6`}>
            {career.videos.map((video) => (
              <Card key={video.id} className={`transition-all hover:shadow-lg cursor-pointer ${getSpeakerColor(video.speaker)}`}>
                <CardHeader className={isMobile ? 'pb-3' : ''}>
                  <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                    {getSpeakerIcon(video.speaker)}
                    {video.speaker.charAt(0).toUpperCase() + video.speaker.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent className={isMobile ? 'pt-0' : ''}>
                  <div className={`aspect-video bg-gray-200 rounded-lg ${isMobile ? 'mb-3' : 'mb-4'} flex items-center justify-center`}>
                    <Play className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-gray-500`} />
                  </div>
                  <h4 className={`font-semibold ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>{video.title}</h4>
                  <p className={`text-muted-foreground ${isMobile ? 'mb-1 text-xs' : 'mb-2 text-sm'}`}>{video.description}</p>
                  <span className={`font-medium ${isMobile ? 'text-xs' : 'text-xs'}`}>Duration: {video.duration}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedFinanceCareerJourney;
