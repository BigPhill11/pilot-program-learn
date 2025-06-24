
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Shirt } from 'lucide-react';

const InterviewEtiquetteGame: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const scenarios = [
    {
      situation: "You arrive at the office building 5 minutes before your interview. What do you do?",
      options: [
        "Go straight up to the interview floor",
        "Wait in the lobby for exactly 15 minutes, then go up",
        "Go up 10-15 minutes early and wait in their reception area",
        "Call to let them know you're here"
      ],
      correctAnswer: 2,
      explanation: "Arrive at the building early, but only go to their floor 10-15 minutes before your appointment. This shows punctuality without being disruptive."
    },
    {
      situation: "During a virtual interview, your internet connection briefly cuts out. What's the best response?",
      options: [
        "Pretend nothing happened and continue",
        "Immediately call them on the phone",
        "Reconnect quickly and briefly acknowledge the technical issue",
        "Send an email apologizing profusely"
      ],
      correctAnswer: 2,
      explanation: "Briefly acknowledge technical issues but don't dwell on them. 'Sorry about that brief technical issue, where were we?' shows professionalism."
    },
    {
      situation: "What's the appropriate dress code for a finance interview?",
      options: [
        "Business casual - nice slacks and a button-down",
        "Smart casual - jeans and a blazer",
        "Full business formal - suit and tie",
        "Whatever makes you feel comfortable"
      ],
      correctAnswer: 2,
      explanation: "Always err on the side of being overdressed. A full business suit shows you take the opportunity seriously and understand professional norms."
    },
    {
      situation: "The interviewer asks if you have any questions. You've already covered everything you planned to ask. What do you do?",
      options: [
        "Say 'No, I think you covered everything'",
        "Ask about salary and benefits",
        "Ask something you already know the answer to",
        "Ask about their experience or the team culture"
      ],
      correctAnswer: 3,
      explanation: "Always have questions ready. Asking about their experience or team culture shows genuine interest and helps you evaluate the opportunity too."
    },
    {
      situation: "You realize you made an error in your technical answer. What should you do?",
      options: [
        "Hope they didn't notice and move on",
        "Interrupt immediately to correct yourself",
        "Wait for an appropriate moment to clarify",
        "Bring it up in your thank-you email"
      ],
      correctAnswer: 2,
      explanation: "If you catch a mistake, it's better to correct it promptly: 'Actually, let me clarify that last point...' This shows attention to detail and integrity."
    },
    {
      situation: "How should you end the interview?",
      options: [
        "Ask when you'll hear back about next steps",
        "Shake hands and leave quickly",
        "Thank them, reiterate your interest, and ask about next steps",
        "Ask for feedback on your interview performance"
      ],
      correctAnswer: 2,
      explanation: "End professionally by thanking them for their time, reiterating your strong interest in the role, and asking about next steps in the process."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === scenarios[currentScenario].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const current = scenarios[currentScenario];
  const isComplete = currentScenario === scenarios.length - 1 && answered;

  if (isComplete) {
    const percentage = Math.round((score / scenarios.length) * 100);
    return (
      <div className="space-y-4">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 text-center">
              🎉 Interview Etiquette Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl mb-4">
              {percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '📚'}
            </div>
            <div className="text-2xl font-bold">
              {score} / {scenarios.length} correct
            </div>
            <div className="text-lg text-muted-foreground">
              {percentage}% - {
                percentage >= 80 ? 'Excellent interview etiquette!' :
                percentage >= 60 ? 'Good foundation, keep practicing!' :
                'Review the basics and try again!'
              }
            </div>
            <Button onClick={resetGame}>
              Practice Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Shirt className="h-5 w-5" />
              Interview Etiquette Challenge
            </CardTitle>
            <Badge variant="secondary">
              Score: {score}/{scenarios.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Scenario {currentScenario + 1} of {scenarios.length}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p className="font-medium text-blue-800">{current.situation}</p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {current.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === current.correctAnswer;
              const showResult = answered;

              return (
                <Button
                  key={index}
                  variant={
                    showResult && isCorrect ? 'default' :
                    showResult && isSelected && !isCorrect ? 'destructive' :
                    isSelected ? 'secondary' : 'outline'
                  }
                  className={`w-full text-left justify-start p-4 h-auto whitespace-normal ${
                    showResult && isCorrect ? 'bg-green-600 hover:bg-green-700' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                >
                  <div className="flex items-start gap-3 w-full">
                    {showResult && (
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : isSelected ? (
                          <XCircle className="h-4 w-4 text-white" />
                        ) : null}
                      </div>
                    )}
                    <span className="text-sm text-left">{option}</span>
                  </div>
                </Button>
              );
            })}
          </div>

          {answered && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <p className="font-medium text-green-800 mb-2">💡 Explanation:</p>
                <p className="text-green-700 text-sm">{current.explanation}</p>
              </CardContent>
            </Card>
          )}

          {answered && currentScenario < scenarios.length - 1 && (
            <div className="text-center">
              <Button onClick={nextScenario}>
                Next Scenario
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewEtiquetteGame;
