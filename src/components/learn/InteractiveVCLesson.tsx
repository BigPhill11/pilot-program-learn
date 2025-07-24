import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Users, BookOpen, Gamepad2, Lightbulb, Brain, Target } from "lucide-react";
import { VCLessonContent } from "@/data/venture-capital-lessons";
import { vcTerms } from "@/data/venture-capital-terms";
import OverviewTab from "./interactive-vc/OverviewTab";
import LearnTermsTab from "./interactive-vc/LearnTermsTab";
import MiniGamesTab from "./interactive-vc/MiniGamesTab";
import EnhancedQuiz from "./interactive-ib/EnhancedQuiz";
import VCLessonHeader from "./interactive-vc/VCLessonHeader";
import ProgressTracker from "./interactive-ib/ProgressTracker";
import HighlightableTerm from "@/components/HighlightableTerm";
import { useAuth } from "@/hooks/useAuth";
import { useVCProgress } from "@/hooks/useVCProgress";

interface InteractiveVCLessonProps {
  lesson: VCLessonContent;
  onBack: () => void;
  onComplete: () => void;
}

const InteractiveVCLesson: React.FC<InteractiveVCLessonProps> = ({
  lesson,
  onBack,
  onComplete
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const { user, profile } = useAuth();
  const { getLevelProgress } = useVCProgress();

  const levelProgress = getLevelProgress(lesson.level);

  useEffect(() => {
    if (levelProgress.totalProgress >= 100) {
      onComplete();
    }
  }, [levelProgress.totalProgress, onComplete]);

  const generateQuizQuestions = () => {
    // Ensure lesson and interactiveQuiz exist
    if (!lesson?.interactiveQuiz?.questions) {
      console.warn('No quiz questions available for lesson:', lesson?.title);
      return [];
    }

    const userLevel = profile?.app_version || 'beginner';
    const difficultyMap: Record<string, string> = {
      'beginner': 'beginner',
      'intermediate': 'intermediate',
      'advanced': 'advanced'
    };
    const targetDifficulty = difficultyMap[userLevel] || 'beginner';

    const filteredQuestions = lesson.interactiveQuiz.questions.filter(
      q => q?.difficulty === targetDifficulty || q?.difficulty === 'beginner'
    ).slice(0, 5);

    console.log('Generated quiz questions:', filteredQuestions.length, 'for difficulty:', targetDifficulty);
    return filteredQuestions;
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    const quizData = {
      gameId: `vc-quiz-level-${lesson.level}`,
      score: Math.round((score / totalQuestions) * 100),
      completedAt: new Date().toISOString()
    };
    
    setCompletedActivities(prev => [...prev, `quiz-level-${lesson.level}`]);
    console.log('VC Quiz completed:', quizData);
  };

  const markActivityCompleted = (activityId: string) => {
    setCompletedActivities(prev => {
      if (!prev.includes(activityId)) {
        return [...prev, activityId];
      }
      return prev;
    });
  };

  const renderTextWithTermHighlights = (text: string): React.ReactNode[] => {
    const allTerms = Object.values(vcTerms).flat();
    const terms = allTerms.map(t => t.term);
    
    // Sort terms by length (descending) to match longer terms first
    const sortedTerms = terms.sort((a, b) => b.length - a.length);
    
    let parts: React.ReactNode[] = [text];
    
    sortedTerms.forEach((term) => {
      const newParts: React.ReactNode[] = [];
      
      parts.forEach((part, index) => {
        if (typeof part === 'string') {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          const splitParts = part.split(regex);
          const matches = part.match(regex) || [];
          
          splitParts.forEach((splitPart, splitIndex) => {
            if (splitIndex > 0) {
              const termData = allTerms.find(t => 
                t.term.toLowerCase() === matches[splitIndex - 1]?.toLowerCase()
              );
              if (termData) {
                newParts.push(
                  <HighlightableTerm
                    key={`${index}-${splitIndex}-${term}`}
                    term={termData.term}
                    definition={termData.definition}
                    analogy={termData.analogy}
                  />
                );
              }
            }
            if (splitPart) {
              newParts.push(splitPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      
      parts = newParts;
    });
    
    return parts;
  };

  const tabsData = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "terms", label: "Key Terms", icon: BookOpen },
    { id: "games", label: "Mini Games", icon: Gamepad2 },
    { id: "examples", label: "Examples", icon: Lightbulb },
    { id: "quiz", label: "Quiz", icon: Brain },
    { id: "practice", label: "Practice", icon: Users }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <VCLessonHeader
        lesson={lesson}
        onBack={onBack}
      />
      
      <ProgressTracker 
        progress={levelProgress.totalProgress}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          {tabsData.map((tab) => {
            const Icon = tab.icon;
            const isCompleted = completedActivities.includes(tab.id);
            
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 text-xs"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {isCompleted && <CheckCircle className="h-3 w-3 text-green-600" />}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab 
            lesson={lesson}
            vcTerms={vcTerms}
            onActivityComplete={() => markActivityCompleted("overview")}
          />
        </TabsContent>

        <TabsContent value="terms">
          <LearnTermsTab
            lesson={lesson}
            vcTerms={vcTerms}
            onActivityComplete={() => markActivityCompleted("terms")}
          />
        </TabsContent>

        <TabsContent value="games">
          <MiniGamesTab
            lesson={lesson}
            completedActivities={completedActivities}
            onActivityComplete={() => markActivityCompleted("games")}
          />
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Real-World Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {lesson.realWorldExamples.map((example, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      {example.company && (
                        <Badge variant="outline">{example.company}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {renderTextWithTermHighlights(example.description)}
                    </p>
                    {example.outcome && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Outcome:</h4>
                        <p className="text-green-700">{example.outcome}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold mb-2">Key Lessons:</h4>
                      <ul className="space-y-1">
                        {example.lessonsLearned.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Knowledge Check
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Test your understanding of the key concepts from this lesson.
              </p>
            </CardHeader>
            <CardContent>
              <EnhancedQuiz
                questions={generateQuizQuestions()}
                onComplete={handleQuizComplete}
                onRetry={() => console.log('Quiz retried')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Practice Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{lesson.practiceActivity.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {renderTextWithTermHighlights(lesson.practiceActivity.description)}
                </p>
                <div className="flex gap-4 text-sm">
                  <Badge variant="outline">
                    Deliverable: {lesson.practiceActivity.deliverable}
                  </Badge>
                  <Badge variant="outline">
                    Time: {lesson.practiceActivity.timeEstimate}
                  </Badge>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Complete this activity on your own and apply the concepts you've learned.
                </p>
                <button 
                  onClick={() => markActivityCompleted("practice")}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Mark as Complete
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveVCLesson;