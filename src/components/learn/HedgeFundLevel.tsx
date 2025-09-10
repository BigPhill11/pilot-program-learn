import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Lock, Lightbulb, BookOpen, Gamepad2, Users, Brain, PenTool } from 'lucide-react';
import HedgeFundFlashcard from './HedgeFundFlashcard';
import InteractiveQuiz from '@/components/InteractiveQuiz';

interface HedgeFundLevelProps {
  level: any;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
}

const HedgeFundLevel: React.FC<HedgeFundLevelProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onComplete,
  onQuizComplete
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  if (!isUnlocked) {
    return (
      <Card className="border-gray-200">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Lock className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-500">Level Locked</h3>
            <p className="text-gray-400">Complete the previous level to unlock this content.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    onQuizComplete(isCorrect);
    if (currentQuizIndex < level.quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setCompletedQuiz(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setCompletedQuiz(false);
  };

  const canComplete = completedQuiz;

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="philsAnalogy" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Phil's Analogy
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="example" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Real Example
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <PenTool className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Level Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {level.overview}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="philsAnalogy" className="space-y-6">
          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-orange-500" />
                Phil's Analogy
                <Badge className="bg-orange-100 text-orange-800">Easy to Understand!</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {level.philsAnalogy}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-500" />
                Key Terms & Definitions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {level.flashcards.map((flashcard: any, index: number) => (
                  <HedgeFundFlashcard
                    key={index}
                    term={flashcard.term}
                    definition={flashcard.definition}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="example" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Real-Life Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {level.realLifeExample}
              </p>
            </CardContent>
          </Card>

          {level.miniGames && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-indigo-500" />
                  Mini Games
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {level.miniGames.map((game: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">{game.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                    <p className="text-sm font-medium mb-2">Learning Goal: {game.learningGoal}</p>
                    <p className="text-sm text-blue-600">{game.completionSystem}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                Knowledge Check
                {completedQuiz && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!completedQuiz ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuizIndex + 1} of {level.quiz.length}
                    </span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuizIndex + 1) / level.quiz.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <InteractiveQuiz
                    topicId={`hedge-fund-level-${level.id}-quiz-${currentQuizIndex}`}
                    question={level.quiz[currentQuizIndex].question}
                    options={level.quiz[currentQuizIndex].options}
                    correctAnswerIndex={level.quiz[currentQuizIndex].correctAnswerIndex}
                    feedbackForIncorrect={level.quiz[currentQuizIndex].feedbackForIncorrect}
                    onQuizComplete={handleQuizComplete}
                    isCompleted={false}
                  />
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold">Quiz Complete!</h3>
                  <p className="text-muted-foreground">
                    Great job! You've answered all {level.quiz.length} questions.
                  </p>
                  <Button variant="outline" onClick={resetQuiz}>
                    Retake Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-teal-500" />
                Take-Home Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {level.takeHomeActivity}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {!isCompleted && canComplete && (
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-green-800">Ready to Complete Level {level.id}?</h3>
              <p className="text-green-700">
                You've completed the quiz! Click below to mark this level as complete.
              </p>
              <Button 
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Level {level.id}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isCompleted && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <CheckCircle className="h-12 w-12 text-blue-500 mx-auto" />
              <h3 className="text-lg font-semibold text-blue-800">Level Complete!</h3>
              <p className="text-blue-700">
                🎉 Congratulations! You've successfully completed Level {level.id}.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HedgeFundLevel;