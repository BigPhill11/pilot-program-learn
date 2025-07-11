import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, FileText, Send, CheckCircle } from 'lucide-react';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';

interface CommunicationModule2Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule2: React.FC<CommunicationModule2Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { type: 'incorrect' | 'completed'; message: string } }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const { toast } = useToast();

  const sections = [
    {
      title: "Email Fundamentals",
      icon: <Mail className="h-5 w-5" />,
      content: {
        overview: "Professional email communication is the backbone of modern business. Every email you send represents you and your organization.",
        keyPoints: [
          "Clear and concise subject lines that summarize the email's purpose",
          "Professional greeting and closing that match the relationship level",
          "Structured body with logical flow and proper paragraphing",
          "Appropriate tone that considers cultural and hierarchical contexts"
        ],
        practicalTips: [
          "Use the 'BRIEF' method: Brief, Relevant, Informative, Engaging, Friendly",
          "Always proofread before sending - typos undermine credibility",
          "Consider time zones when marking emails as urgent",
          "Use 'Reply All' sparingly - only when everyone needs the information"
        ]
      }
    },
    {
      title: "Report Writing Excellence", 
      icon: <FileText className="h-5 w-5" />,
      content: {
        overview: "Effective reports translate complex information into actionable insights for decision-makers.",
        keyPoints: [
          "Executive summary that captures key findings and recommendations",
          "Clear methodology and data presentation",
          "Logical structure with headings and subheadings",
          "Visual elements (charts, graphs) to support key points"
        ],
        practicalTips: [
          "Start with your conclusion, then provide supporting evidence",
          "Use active voice and concrete language",
          "Include specific recommendations with implementation steps",
          "Tailor technical detail to your audience's expertise level"
        ]
      }
    },
    {
      title: "Document Formatting",
      icon: <Send className="h-5 w-5" />,
      content: {
        overview: "Professional formatting enhances readability and demonstrates attention to detail.",
        keyPoints: [
          "Consistent font choices and sizing throughout documents",
          "Proper use of white space and margins for easy reading",
          "Hierarchical headings that guide the reader's eye",
          "Professional color schemes that enhance rather than distract"
        ],
        practicalTips: [
          "Use templates for consistency across team communications",
          "Ensure accessibility with high contrast and readable fonts",
          "Test documents across different devices and software",
          "Include page numbers and proper headers/footers for longer documents"
        ]
      }
    }
  ];

  const quizQuestions = [
    {
      question: "What is the most important element of a professional email subject line?",
      options: [
        "Making it as short as possible",
        "Clearly summarizing the email's purpose and urgency",
        "Including the recipient's name",
        "Using all capital letters for emphasis"
      ],
      correct: 1,
      explanation: "A clear, descriptive subject line helps recipients prioritize emails and understand the content before opening. It should summarize the purpose and indicate urgency level when appropriate."
    },
    {
      question: "When writing a business report, where should your main conclusion appear?",
      options: [
        "Only at the very end",
        "In the executive summary at the beginning",
        "Scattered throughout the document",
        "In the appendix"
      ],
      correct: 1,
      explanation: "The executive summary should contain your key findings and recommendations upfront. Busy executives may only read this section, so it must contain your most important conclusions."
    },
    {
      question: "What characterizes effective document formatting?",
      options: [
        "Using many different fonts for variety",
        "Filling every inch of space with text",
        "Consistent formatting with proper white space",
        "Bright colors throughout the document"
      ],
      correct: 2,
      explanation: "Consistent formatting with appropriate white space enhances readability and demonstrates professionalism. Too much variety in fonts or colors can distract from the content."
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
        title: "Correct Answer!",
        description: "Great job understanding written communication principles.",
      });
    } else {
      setFeedback({
        ...feedback,
        [questionIndex]: {
          type: 'incorrect',
          message: `Incorrect. ${question.explanation}`
        }
      });
      toast({
        title: "Try Again",
        description: "Consider the key principles of professional written communication.",
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
      description: "Congratulations on mastering written communication!",
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
        moduleTitle="Written Communication Mastery"
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
          <Badge variant="secondary">Module 2 of 6</Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Mail className="h-6 w-6 text-purple-600" />
              <span>Written Communication Mastery</span>
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
                      <p className="text-gray-600">You've mastered written communication principles.</p>
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

export default CommunicationModule2;