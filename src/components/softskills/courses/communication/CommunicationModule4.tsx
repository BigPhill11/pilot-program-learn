import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Presentation, Lightbulb, Target, CheckCircle } from 'lucide-react';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';

interface CommunicationModule4Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule4: React.FC<CommunicationModule4Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { type: 'incorrect' | 'completed'; message: string } }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const { toast } = useToast();

  const sections = [
    {
      title: "Slide Design Mastery",
      icon: <Presentation className="h-5 w-5" />,
      content: {
        overview: "Exceptional slide design transforms complex information into visually compelling stories that captivate and inform your audience.",
        keyPoints: [
          "Clean, uncluttered layouts that focus attention on key messages",
          "Strategic use of whitespace to improve readability and visual appeal",
          "Consistent typography and color schemes that reinforce brand identity",
          "High-quality images and graphics that support rather than distract from content"
        ],
        practicalTips: [
          "Follow the 6x6 rule: maximum 6 bullet points with 6 words each",
          "Use high-contrast color combinations for accessibility and clarity",
          "Incorporate your organization's brand colors and fonts consistently",
          "Test slides on different devices and projection sizes before presenting"
        ]
      }
    },
    {
      title: "Storytelling Techniques", 
      icon: <Lightbulb className="h-5 w-5" />,
      content: {
        overview: "Masterful storytelling transforms dry data into compelling narratives that resonate emotionally and drive action.",
        keyPoints: [
          "Clear narrative arc with beginning, middle, and end that guides audience journey",
          "Relatable characters and scenarios that help audience connect personally",
          "Strategic use of conflict and resolution to maintain engagement",
          "Data visualization that tells a story rather than just displaying numbers"
        ],
        practicalTips: [
          "Start with the 'So what?' - explain why your audience should care",
          "Use the STAR method: Situation, Task, Action, Result for case studies",
          "Include personal anecdotes that illustrate key points memorably",
          "End with a clear call-to-action that gives audience next steps"
        ]
      }
    },
    {
      title: "Audience Engagement",
      icon: <Target className="h-5 w-5" />,
      content: {
        overview: "Dynamic audience engagement transforms passive listeners into active participants who are invested in your message.",
        keyPoints: [
          "Interactive elements like polls, Q&A sessions, and group discussions",
          "Strategic use of humor and relevant examples that resonate with your audience",
          "Body language and movement that project confidence and enthusiasm",
          "Technology integration that enhances rather than complicates the message"
        ],
        practicalTips: [
          "Arrive early to test all technology and interact with early attendees",
          "Use the 'look, hook, took' approach: capture attention, engage interest, provide takeaway",
          "Plan interactive moments every 5-7 minutes to maintain attention",
          "Prepare backup plans for technology failures or unexpected audience reactions"
        ]
      }
    }
  ];

  const quizQuestions = [
    {
      question: "What is the most important principle of effective slide design?",
      options: [
        "Including as much information as possible on each slide",
        "Using many different colors and fonts for variety",
        "Clean, uncluttered layouts that focus on key messages",
        "Adding animations to every slide element"
      ],
      correct: 2,
      explanation: "Clean, uncluttered layouts help your audience focus on what's most important. Too much information or visual variety can overwhelm and distract from your core message."
    },
    {
      question: "What makes storytelling effective in presentations?",
      options: [
        "Using only fictional characters and scenarios",
        "Creating a clear narrative arc with emotional connection",
        "Avoiding any personal anecdotes or examples",
        "Focusing solely on data without context"
      ],
      correct: 1,
      explanation: "Effective storytelling creates an emotional connection through a clear narrative arc. This helps audiences remember and act on your message long after the presentation ends."
    },
    {
      question: "How often should you include interactive elements in a presentation?",
      options: [
        "Only at the very beginning",
        "Every 5-7 minutes to maintain attention",
        "Only during the Q&A at the end",
        "Never - presentations should be one-way communication"
      ],
      correct: 1,
      explanation: "Regular interactive moments every 5-7 minutes help maintain audience attention and engagement. This prevents the 'zone-out' effect that often occurs in longer presentations."
    }
  ];

  const handleQuizAnswer = (questionIndex: number, selectedAnswer: number) => {
    const newAnswers = { ...quizAnswers, [questionIndex]: selectedAnswer };
    setQuizAnswers(newAnswers);

    const question = quizQuestions[questionIndex];
    const isCorrect = selectedAnswer === question.correct;

    if (isCorrect) {
      setFeedback({
        ...feedback,
        [questionIndex]: {
          type: 'completed',
          message: `Correct! ${question.explanation}`
        }
      });
      toast({
        title: "Outstanding!",
        description: "You understand presentation excellence principles.",
      });
    } else {
      setFeedback({
        ...feedback,
        [questionIndex]: {
          type: 'incorrect',
          message: `Not quite right. ${question.explanation}`
        }
      });
      toast({
        title: "Try Again",
        description: "Think about what makes presentations truly engaging.",
        variant: "destructive",
      });
    }
  };

  const resetQuiz = (questionIndex: number) => {
    const newAnswers = { ...quizAnswers };
    const newFeedback = { ...feedback };
    delete newAnswers[questionIndex];
    delete newFeedback[questionIndex];
    setQuizAnswers(newAnswers);
    setFeedback(newFeedback);
  };

  const allQuizQuestionsAnsweredCorrectly = () => {
    return quizQuestions.every((_, index) => {
      const answer = quizAnswers[index];
      return answer !== undefined && answer === quizQuestions[index].correct;
    });
  };

  const handleCompleteModule = () => {
    setShowCelebration(true);
    setModuleCompleted(true);
    toast({
      title: "Module Completed!",
      description: "Congratulations on mastering presentation excellence!",
    });
    
    setTimeout(() => {
      setShowCelebration(false);
      onComplete();
    }, 3000);
  };

  if (showCelebration) {
    return (
      <PandaCelebration 
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        moduleTitle="Presentation Excellence"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          <Badge variant="secondary">Module 4 of 6</Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Presentation className="h-6 w-6 text-purple-600" />
              <span>Presentation Excellence</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {sections.map((section, index) => (
                <Button
                  key={index}
                  variant={currentSection === index ? "default" : "outline"}
                  onClick={() => setCurrentSection(index)}
                  className="h-auto p-4 justify-start"
                >
                  <div className="flex items-center space-x-2">
                    {section.icon}
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                </Button>
              ))}
            </div>

            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                {sections[currentSection].icon}
                <span>{sections[currentSection].title}</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-purple-700">Overview</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {sections[currentSection].content.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-purple-700">Key Points</h4>
                  <ul className="space-y-2">
                    {sections[currentSection].content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-purple-700">Practical Tips</h4>
                  <ul className="space-y-2">
                    {sections[currentSection].content.practicalTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="h-2 w-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Knowledge Check</h3>
              <div className="space-y-8">
                {quizQuestions.map((question, questionIndex) => (
                  <div key={questionIndex} className="border-l-4 border-purple-400 pl-6">
                    <h4 className="font-medium mb-4">{question.question}</h4>
                    <div className="grid gap-3">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = quizAnswers[questionIndex] === optionIndex;
                        const isCorrect = optionIndex === question.correct;
                        const hasAnswered = quizAnswers[questionIndex] !== undefined;
                        
                        let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "outline";
                        if (hasAnswered) {
                          if (isSelected && isCorrect) buttonVariant = "default";
                          else if (isSelected && !isCorrect) buttonVariant = "destructive";
                          else if (isCorrect) buttonVariant = "secondary";
                        }

                        return (
                          <Button
                            key={optionIndex}
                            variant={buttonVariant}
                            onClick={() => handleQuizAnswer(questionIndex, optionIndex)}
                            disabled={hasAnswered}
                            className="justify-start text-left h-auto py-3 px-4"
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                    
                    {feedback[questionIndex] && (
                      <QuizFeedback 
                        type={feedback[questionIndex].type}
                        message={feedback[questionIndex].message}
                      />
                    )}
                    
                    <QuizActions
                      hasAttempted={quizAnswers[questionIndex] !== undefined}
                      isCompleted={quizAnswers[questionIndex] === question.correct}
                      onRetry={() => resetQuiz(questionIndex)}
                    />
                  </div>
                ))}
              </div>

              {allQuizQuestionsAnsweredCorrectly() && !moduleCompleted && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="mb-4">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-green-700">Module Complete!</h3>
                      <p className="text-gray-600">You've mastered presentation excellence.</p>
                    </div>
                    <Button onClick={handleCompleteModule} size="lg" className="px-8">
                      Complete Module
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationModule4;