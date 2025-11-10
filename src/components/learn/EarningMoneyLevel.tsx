
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowRight, Award, Lightbulb, Users, BookOpen, AlertTriangle, Target } from 'lucide-react';
import EarningMoneyFlashcard from './EarningMoneyFlashcard';
import EarningMoneyDragDrop from './EarningMoneyDragDrop';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import { earningMoneyEnhancedContent } from '@/data/earning-money-enhanced';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface EarningMoneyLevelProps {
  levelNumber: number;
  levelData: any;
  onComplete: () => void;
  isCompleted: boolean;
}

const EarningMoneyLevel: React.FC<EarningMoneyLevelProps> = ({
  levelNumber,
  levelData,
  onComplete,
  isCompleted
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [masteredFlashcards, setMasteredFlashcards] = useState<string[]>([]);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const steps = ['flashcards', 'dragdrop', 'quiz'];
  const stepTitles = ['Learn Key Terms', 'Practice Activity', 'Knowledge Check'];

  const handleFlashcardMastered = (term: string) => {
    if (!masteredFlashcards.includes(term)) {
      setMasteredFlashcards(prev => [...prev, term]);
    }
  };

  const handleActivityComplete = (activity: string) => {
    if (!completedActivities.includes(activity)) {
      setCompletedActivities(prev => [...prev, activity]);
    }
  };

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    if (isCorrect) {
      handleActivityComplete('quiz');
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: // Flashcards
        return masteredFlashcards.length >= Math.ceil(levelData.flashcards.length * 0.75);
      case 1: // Drag & Drop
        return completedActivities.includes('dragdrop');
      case 2: // Quiz
        return completedActivities.includes('quiz');
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const enhancedContent = earningMoneyEnhancedContent[levelNumber];

  if (isCompleted) {
    return (
      <Card className="w-full border-green-500">
        <CardContent className="p-6 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-700 mb-2">Level {levelNumber} Complete!</h3>
          <p className="text-muted-foreground">You've mastered {levelData.title}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Level {levelNumber}: {levelData.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{stepTitles[currentStep]}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Flashcards Step */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Study These Key Terms</h3>
            <p className="text-sm text-muted-foreground">
              Master at least {Math.ceil(levelData.flashcards.length * 0.75)} terms to continue
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {levelData.flashcards.map((flashcard: any, index: number) => (
              <EarningMoneyFlashcard
                key={index}
                term={flashcard.term}
                definition={flashcard.definition}
                onMastered={() => handleFlashcardMastered(flashcard.term)}
                isMastered={masteredFlashcards.includes(flashcard.term)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Drag & Drop Step */}
      {currentStep === 1 && (
        <EarningMoneyDragDrop
          title={levelData.dragDropActivity.title}
          instruction={levelData.dragDropActivity.instruction}
          items={levelData.dragDropActivity.items}
          categories={levelData.dragDropActivity.categories}
          onComplete={() => handleActivityComplete('dragdrop')}
        />
      )}

      {/* Quiz Step */}
      {currentStep === 2 && (
        <Card>
          <CardContent className="p-6">
            <InteractiveQuiz
              topicId={`earning-level-${levelNumber}`}
              question={levelData.quiz.question}
              options={levelData.quiz.options}
              correctAnswerIndex={levelData.quiz.correctAnswer}
              feedbackForIncorrect={levelData.quiz.explanation}
              onQuizComplete={handleQuizComplete}
              isCompleted={completedActivities.includes('quiz')}
            />
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-center">
        <Button
          onClick={handleNext}
          disabled={!canProceedToNext()}
          className="bg-green-500 hover:bg-green-600"
          size="lg"
        >
          {currentStep < steps.length - 1 ? (
            <>
              Next Step <ArrowRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Complete Level <CheckCircle2 className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Enhanced Content Section */}
      {enhancedContent && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Award className="h-5 w-5" />
              Enhanced Learning Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="tips" className="bg-white rounded-lg border border-green-200 px-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Pro Tips</span>
                    <Badge variant="secondary">{enhancedContent.proTips.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {enhancedContent.proTips.map((tip, i) => (
                      <li key={i} className="text-sm">{tip}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="scenarios" className="bg-white rounded-lg border border-green-200 px-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Real Stories</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {enhancedContent.realScenarios.map((s, i) => (
                      <div key={i} className="p-4 bg-green-50 rounded-lg">
                        <p className="font-bold">{s.name}, {s.age}</p>
                        <p className="text-sm italic mb-2">"{s.story}"</p>
                        <p className="text-sm"><strong>Lesson:</strong> {s.lesson}</p>
                        <p className="text-sm"><strong>Outcome:</strong> {s.outcome}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cheatsheet" className="bg-white rounded-lg border border-green-200 px-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">{enhancedContent.cheatSheet.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {enhancedContent.cheatSheet.items.map((item, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mistakes" className="bg-white rounded-lg border border-orange-200 px-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold">Common Mistakes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {enhancedContent.commonMistakes.map((m, i) => (
                      <div key={i} className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm mb-1"><strong>❌ Mistake:</strong> {m.mistake}</p>
                        <p className="text-sm mb-1"><strong>⚠️ Consequence:</strong> {m.consequence}</p>
                        <p className="text-sm"><strong>✅ Avoid:</strong> {m.avoidanceStrategy}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="nextsteps" className="bg-white rounded-lg border border-blue-200 px-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Your Action Plan</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-1">🚀 This Week:</h4>
                      <ul className="text-sm space-y-1">
                        {enhancedContent.nextSteps.immediate.map((s, i) => <li key={i}>• {s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">📅 This Month:</h4>
                      <ul className="text-sm space-y-1">
                        {enhancedContent.nextSteps.shortTerm.map((s, i) => <li key={i}>• {s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">🎯 This Year:</h4>
                      <ul className="text-sm space-y-1">
                        {enhancedContent.nextSteps.longTerm.map((s, i) => <li key={i}>• {s}</li>)}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EarningMoneyLevel;
