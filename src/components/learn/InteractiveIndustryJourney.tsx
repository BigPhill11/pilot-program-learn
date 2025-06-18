
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, CheckCircle, Play } from 'lucide-react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import type { IndustryJourneyData } from '@/data/industry-journeys';
import { useIsMobile } from '@/hooks/use-mobile';

interface InteractiveIndustryJourneyProps {
  journey: IndustryJourneyData;
  onBack: () => void;
}

interface LessonProgress {
  completedLevels: number[];
  currentLevel: number;
  selectedDifficulty: 'beginner' | 'intermediate' | 'pro';
  totalPointsEarned: number;
}

const InteractiveIndustryJourney: React.FC<InteractiveIndustryJourneyProps> = ({ 
  journey, 
  onBack 
}) => {
  const { updateQuizScore, updateLearningProgress } = useProgressTracking();
  const isMobile = useIsMobile();
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [progress, setProgress] = useState<LessonProgress>({
    completedLevels: [],
    currentLevel: 1,
    selectedDifficulty: 'beginner',
    totalPointsEarned: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem(`industryJourney_${journey.id}_progress`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, [journey.id]);

  const saveProgress = (newProgress: LessonProgress) => {
    setProgress(newProgress);
    localStorage.setItem(`industryJourney_${journey.id}_progress`, JSON.stringify(newProgress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = [...progress.completedLevels, levelId];
    const newProgress = {
      ...progress,
      completedLevels: newCompletedLevels,
      currentLevel: Math.min(levelId + 1, journey.levels.length + 1),
      totalPointsEarned: progress.totalPointsEarned + 10
    };
    saveProgress(newProgress);
    updateLearningProgress(15);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore(`${journey.id}-industry-lesson`, isCorrect);
  };

  const getDifficultyContent = (level: any, difficulty: string) => {
    const content = level.interactiveContent?.[difficulty];
    if (!content) {
      // Fallback content if not defined
      return {
        explanation: `Learn about ${level.focusArea} in ${journey.name}`,
        realWorldExample: "This is an important concept in the industry.",
        keyTakeaways: ["Understanding this topic is crucial", "Apply this knowledge in practice"]
      };
    }
    return content;
  };

  const renderLevelContent = (level: any) => {
    const content = getDifficultyContent(level, progress.selectedDifficulty);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => setSelectedLevelId(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <div>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
              Level {level.level}: {level.focusArea}
            </h2>
            <Badge variant="outline" className="mt-1">
              {progress.selectedDifficulty.charAt(0).toUpperCase() + progress.selectedDifficulty.slice(1)} Level
            </Badge>
          </div>
        </div>

        {/* Difficulty Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Choose Your Learning Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
              {(['beginner', 'intermediate', 'pro'] as const).map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={progress.selectedDifficulty === difficulty ? 'default' : 'outline'}
                  onClick={() => setProgress({ ...progress, selectedDifficulty: difficulty })}
                  className="h-auto p-4 text-left"
                >
                  <div>
                    <div className="font-semibold capitalize">{difficulty}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {difficulty === 'beginner' && 'Simple explanations with analogies'}
                      {difficulty === 'intermediate' && 'Balanced depth and accessibility'}
                      {difficulty === 'pro' && 'Comprehensive and detailed'}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-blue-500" />
              Understanding {level.focusArea}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Explanation</h4>
              <p className="text-muted-foreground leading-relaxed">
                {content.explanation}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Real-World Example</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  {content.realWorldExample}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Key Takeaways</h4>
              <ul className="space-y-2">
                {content.keyTakeaways.map((takeaway: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Quiz */}
        <InteractiveQuiz
          topicId={`${journey.id}-level-${level.level}-${progress.selectedDifficulty}`}
          question={`What did you learn about ${level.focusArea} in ${journey.name}?`}
          options={[
            "I understand the key concepts and real-world applications",
            "I need to review this topic again",
            "I'm ready to move on to the next level",
            "This was very helpful and informative"
          ]}
          correctAnswerIndex={0}
          feedbackForIncorrect="Take your time to review the content. Understanding each level thoroughly will help you succeed!"
          onQuizComplete={handleQuizComplete}
          isCompleted={progress.completedLevels.includes(level.level)}
        />

        {/* Completion Action */}
        {!progress.completedLevels.includes(level.level) && (
          <Button 
            onClick={() => handleLevelComplete(level.level)}
            className="w-full"
            size="lg"
          >
            Complete Level {level.level}
          </Button>
        )}
      </div>
    );
  };

  // Show selected level content
  if (selectedLevelId) {
    const selectedLevel = journey.levels.find(level => level.level === selectedLevelId);
    if (selectedLevel) {
      return renderLevelContent(selectedLevel);
    }
  }

  // Show main journey overview
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Industries
        </Button>
        <div className="flex-1">
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>
            {journey.name} Learning Journey
          </h1>
          <p className="text-muted-foreground">
            Interactive lessons with multiple difficulty levels
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-800">Your Progress</h3>
            <Badge className="bg-blue-500 text-white">
              <Trophy className="h-4 w-4 mr-1" />
              Level {progress.currentLevel}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {progress.completedLevels.length}
              </div>
              <div className="text-sm text-muted-foreground">Levels Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {progress.totalPointsEarned}
              </div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 capitalize">
                {progress.selectedDifficulty}
              </div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
          </div>

          <Progress 
            value={(progress.completedLevels.length / journey.levels.length) * 100} 
            className="mt-4 h-2" 
          />
        </CardContent>
      </Card>

      {/* Learning Levels */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {journey.levels.map((level) => {
          const isCompleted = progress.completedLevels.includes(level.level);
          const isUnlocked = level.level <= progress.currentLevel;
          
          return (
            <Card 
              key={level.level}
              className={`transition-all cursor-pointer hover:shadow-lg ${
                isCompleted ? 'border-green-500 bg-green-50' :
                isUnlocked ? 'border-blue-500 hover:border-blue-600' :
                'border-gray-200 opacity-60 cursor-not-allowed'
              }`}
              onClick={() => isUnlocked && setSelectedLevelId(level.level)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>
                    Level {level.level}
                  </CardTitle>
                  {isCompleted && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <h4 className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                  {level.focusArea}
                </h4>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {level.sampleTopics.slice(0, 3).map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        isCompleted ? 'bg-green-500' : 
                        isUnlocked ? 'bg-blue-500' : 
                        'bg-gray-300'
                      }`}></div>
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full mt-4 ${isMobile ? 'text-sm' : ''}`}
                  size={isMobile ? 'sm' : 'default'}
                  disabled={!isUnlocked}
                  variant={isCompleted ? "secondary" : isUnlocked ? "default" : "ghost"}
                >
                  {isCompleted ? "Completed ✓" : 
                   isUnlocked ? "Start Level" : 
                   "Locked"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveIndustryJourney;
