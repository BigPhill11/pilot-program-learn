
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Trophy, Star, Target, Gamepad2, BookOpen, Users, Brain } from 'lucide-react';
import { InteractiveLessonContent } from '@/data/investment-banking-lessons';
import HighlightableTerm from '@/components/HighlightableTerm';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import { getIBTermsForLevel } from '@/data/investment-banking-terms';
import { useAuth } from '@/hooks/useAuth';
import PandaLogo from '@/components/icons/PandaLogo';

interface InteractiveIBLessonProps {
  lesson: InteractiveLessonContent;
  onBack: () => void;
  onComplete: () => void;
}

const InteractiveIBLesson: React.FC<InteractiveIBLessonProps> = ({
  lesson,
  onBack,
  onComplete
}) => {
  const { profile } = useAuth();
  const [currentTab, setCurrentTab] = useState('overview');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [lessonProgress, setLessonProgress] = useState(0);

  const userLevel = profile?.app_version || 'beginner';
  const ibTerms = getIBTermsForLevel(userLevel);

  const handleActivityComplete = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      const newCompleted = [...completedActivities, activityId];
      setCompletedActivities(newCompleted);
      
      // Calculate progress
      const totalActivities = lesson.miniGames.length + 1 + 1; // games + quiz + practical
      const progress = (newCompleted.length / totalActivities) * 100;
      setLessonProgress(progress);
      
      if (progress >= 100) {
        onComplete();
      }
    }
  };

  const renderTermWithTooltip = (term: string) => {
    const termData = ibTerms[term];
    if (termData) {
      return (
        <HighlightableTerm 
          term={term} 
          definition={termData.definition}
          analogy={termData.analogy}
        >
          <span className="font-semibold text-primary cursor-help underline decoration-dotted">
            {term.replace('_', ' ')}
          </span>
        </HighlightableTerm>
      );
    }
    return <span className="font-semibold">{term.replace('_', ' ')}</span>;
  };

  const getLevelAppropriateContent = (content: any[], userLevel: string) => {
    return content.filter(item => 
      item.difficulty === userLevel || 
      (userLevel === 'intermediate' && item.difficulty === 'beginner') ||
      (userLevel === 'advanced' && ['beginner', 'intermediate'].includes(item.difficulty))
    );
  };

  const filteredMiniGames = getLevelAppropriateContent(lesson.miniGames, userLevel);
  const filteredExamples = getLevelAppropriateContent(lesson.realWorldExamples, userLevel);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary" />
              <span>Level {lesson.level}: {lesson.title}</span>
            </h1>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {lesson.theme}
        </Badge>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Lesson Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(lessonProgress)}%</span>
          </div>
          <Progress value={lessonProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="games">
            <Gamepad2 className="h-4 w-4 mr-2" />
            Mini Games
          </TabsTrigger>
          <TabsTrigger value="examples">
            <Star className="h-4 w-4 mr-2" />
            Real Examples
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Brain className="h-4 w-4 mr-2" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Users className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Learning Objectives</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {lesson.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <span>{objective}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Key Terms You'll Learn</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lesson.terminology.map((term, index) => (
                  <div key={index} className="inline-block">
                    {renderTermWithTooltip(term)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <PandaLogo className="h-12 w-12" />
                <div>
                  <h3 className="font-semibold text-green-800">Phil's Learning Tip</h3>
                  <p className="text-green-700">
                    {userLevel === 'beginner' && 
                      "Take your time with each section! Investment banking has lots of new terms, but I'll help you understand them with simple examples."
                    }
                    {userLevel === 'intermediate' && 
                      "You're building on solid foundations! Focus on connecting the concepts you're learning to real business situations."
                    }
                    {userLevel === 'advanced' && 
                      "Great job reaching this level! Now we're diving into the sophisticated strategies that senior bankers use every day."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <div className="grid gap-6">
            {filteredMiniGames.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Gamepad2 className="h-5 w-5 text-primary" />
                      <span>{game.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={completedActivities.includes(game.id) ? "default" : "outline"}>
                        {game.xpReward} XP
                      </Badge>
                      {completedActivities.includes(game.id) && (
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{game.description}</p>
                  <Button 
                    onClick={() => handleActivityComplete(game.id)}
                    disabled={completedActivities.includes(game.id)}
                    className="w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {completedActivities.includes(game.id) ? 'Completed!' : 'Start Game'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <div className="grid gap-6">
            {filteredExamples.map((example) => (
              <Card key={example.id}>
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{example.company}</span>
                    <span>•</span>
                    <span>{example.year}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{example.description}</p>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">💡 Key Learning:</h4>
                    <p className="text-blue-700">{example.keyLearning}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Test Your Knowledge</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lesson.interactiveQuiz.questions
                .filter(q => q.difficulty === userLevel || 
                  (userLevel === 'intermediate' && q.difficulty === 'beginner') ||
                  (userLevel === 'advanced' && ['beginner', 'intermediate'].includes(q.difficulty)))
                .map((question) => (
                <InteractiveQuiz
                  key={question.id}
                  topicId={question.id}
                  question={question.question}
                  options={question.options}
                  correctAnswerIndex={question.correctAnswer}
                  feedbackForIncorrect={question.explanation}
                  onQuizComplete={(id, isCorrect) => {
                    if (isCorrect) handleActivityComplete('quiz');
                  }}
                  isCompleted={completedActivities.includes('quiz')}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{lesson.practicalActivity.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{lesson.practicalActivity.description}</p>
              
              <div>
                <h4 className="font-semibold mb-3">Steps to Complete:</h4>
                <div className="space-y-2">
                  {lesson.practicalActivity.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">📋 Deliverable:</h4>
                <p className="text-green-700">{lesson.practicalActivity.deliverable}</p>
              </div>

              <Button 
                onClick={() => handleActivityComplete('practice')}
                disabled={completedActivities.includes('practice')}
                className="w-full"
                size="lg"
              >
                {completedActivities.includes('practice') ? 
                  'Activity Completed!' : 
                  'Mark as Complete'
                }
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveIBLesson;
