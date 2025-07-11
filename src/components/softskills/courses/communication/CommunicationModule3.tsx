import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, Volume2, Users, CheckCircle } from 'lucide-react';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';

interface CommunicationModule3Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule3: React.FC<CommunicationModule3Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { type: 'incorrect' | 'completed'; message: string } }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const { toast } = useToast();

  const sections = [
    {
      title: "Voice Projection",
      icon: <Volume2 className="h-5 w-5" />,
      content: {
        overview: "Effective voice projection ensures your message reaches and engages your entire audience with clarity and confidence.",
        keyPoints: [
          "Proper breathing techniques using your diaphragm for sustained vocal power",
          "Strategic volume control that adapts to room size and audience distance",
          "Clear articulation that ensures every word is understood",
          "Vocal variety in pace, pitch, and tone to maintain audience engagement"
        ],
        practicalTips: [
          "Practice the 'candle exercise' - speak as if trying to flicker a candle 6 feet away",
          "Warm up with vocal exercises before important conversations or presentations",
          "Record yourself speaking to identify areas for improvement",
          "Stay hydrated and avoid dairy before important verbal communications"
        ]
      }
    },
    {
      title: "Articulation Excellence", 
      icon: <Mic className="h-5 w-5" />,
      content: {
        overview: "Clear articulation builds credibility and ensures your ideas are understood without confusion or repetition.",
        keyPoints: [
          "Precise consonant pronunciation that gives words their distinct sound",
          "Controlled speaking pace that allows listeners to process information",
          "Strategic pausing to emphasize key points and allow absorption",
          "Elimination of filler words ('um', 'uh', 'like') that distract from content"
        ],
        practicalTips: [
          "Practice tongue twisters daily to improve diction and flexibility",
          "Use the 'pencil technique' - speak with a pencil between your teeth to enhance clarity",
          "Focus on ending consonants to ensure words don't blend together",
          "Practice reading aloud to develop natural rhythm and flow"
        ]
      }
    },
    {
      title: "Conversation Flow",
      icon: <Users className="h-5 w-5" />,
      content: {
        overview: "Masterful conversation flow creates engaging dialogue that builds relationships and achieves communication goals.",
        keyPoints: [
          "Active listening techniques that show genuine interest and understanding",
          "Strategic question asking that deepens conversations and shows engagement",
          "Smooth transitions between topics that maintain conversation momentum",
          "Cultural sensitivity that adapts communication style to diverse audiences"
        ],
        practicalTips: [
          "Use the SOLER method: Square shoulders, Open posture, Lean in, Eye contact, Relax",
          "Practice the 'Yes, and...' technique to build on others' ideas constructively",
          "Develop a repertoire of open-ended questions to encourage dialogue",
          "Mirror the energy and communication style of your conversation partner appropriately"
        ]
      }
    }
  ];

  const quizQuestions = [
    {
      question: "What is the foundation of effective voice projection?",
      options: [
        "Speaking as loudly as possible",
        "Proper diaphragmatic breathing technique", 
        "Talking very quickly to cover more content",
        "Using a microphone in all situations"
      ],
      correct: 1,
      explanation: "Diaphragmatic breathing provides the steady airflow needed for consistent voice projection. It allows you to speak with power and clarity without straining your vocal cords."
    },
    {
      question: "Which technique best improves articulation and speech clarity?",
      options: [
        "Speaking in monotone to maintain consistency",
        "Eliminating all pauses from speech",
        "Practicing tongue twisters and precise consonant pronunciation",
        "Speaking faster to seem more confident"
      ],
      correct: 2,
      explanation: "Tongue twisters and focused consonant practice develop the muscle memory and precision needed for clear articulation. This ensures every word is understood by your audience."
    },
    {
      question: "What characterizes excellent conversation flow?",
      options: [
        "Dominating the conversation with your ideas",
        "Active listening and building on others' contributions",
        "Avoiding any moments of silence",
        "Sticking rigidly to a predetermined agenda"
      ],
      correct: 1,
      explanation: "Great conversation flow involves active listening, thoughtful responses, and building on others' ideas. This creates engaging dialogue that benefits all participants."
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
        title: "Excellent!",
        description: "You understand vocal communication principles well.",
      });
    } else {
      setFeedback({
        ...feedback,
        [questionIndex]: {
          type: 'incorrect',
          message: `Not quite. ${question.explanation}`
        }
      });
      toast({
        title: "Try Again",
        description: "Consider the key elements of effective verbal communication.",
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
      description: "Congratulations on mastering verbal communication skills!",
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
        moduleTitle="Verbal Communication Skills"
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
          <Badge variant="secondary">Module 3 of 6</Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Mic className="h-6 w-6 text-purple-600" />
              <span>Verbal Communication Skills</span>
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
                      <p className="text-gray-600">You've mastered verbal communication skills.</p>
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

export default CommunicationModule3;