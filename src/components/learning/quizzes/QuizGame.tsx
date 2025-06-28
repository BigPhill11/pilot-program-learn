
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface QuizGameProps {
  level: 'beginner' | 'intermediate' | 'pro';
  onComplete: () => void;
  onExit: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizGame: React.FC<QuizGameProps> = ({ level, onComplete, onExit }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    // Generate questions based on flashcards and level
    const storageKey = `flashcards_${level}`;
    const flashcards = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (flashcards.length === 0) {
      // Default questions for demo
      const defaultQuestions: Record<string, QuizQuestion[]> = {
        beginner: [
          {
            question: "What is a stock?",
            options: ["A type of bond", "A share of ownership in a company", "A savings account", "A loan"],
            correctAnswer: 1,
            explanation: "A stock represents partial ownership in a company."
          },
          {
            question: "What is a dividend?",
            options: ["A fee for trading", "A payment to shareholders", "A type of stock", "A market index"],
            correctAnswer: 1,
            explanation: "Dividends are payments made by companies to their shareholders."
          }
        ],
        intermediate: [
          {
            question: "What does P/E ratio measure?",
            options: ["Company's debt", "Stock's valuation", "Dividend yield", "Market volatility"],
            correctAnswer: 1,
            explanation: "P/E ratio compares stock price to earnings per share."
          }
        ],
        pro: [
          {
            question: "What is Beta coefficient?",
            options: ["Dividend rate", "Stock's volatility vs market", "Profit margin", "Interest rate"],
            correctAnswer: 1,
            explanation: "Beta measures how much a stock moves relative to the overall market."
          }
        ]
      };
      setQuestions(defaultQuestions[level] || []);
    } else {
      // Generate questions from uploaded flashcards
      const generatedQuestions = flashcards.slice(0, 10).map((card: any) => ({
        question: `What is the definition of "${card.term}"?`,
        options: [
          card.definition,
          "A type of investment vehicle",
          "A market indicator",
          "A financial instrument"
        ].sort(() => Math.random() - 0.5),
        correctAnswer: 0, // Will need to find correct index after shuffling
        explanation: `${card.term}: ${card.definition}`
      }));
      setQuestions(generatedQuestions);
    }
  }, [level]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);
    if (isCorrect) setScore(score + 1);

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        onComplete();
      }
    }, 2000);
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            No questions available for {level} level. Upload some flashcards first!
          </p>
          <Button onClick={onExit}>Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                Quiz - {level}
                <Badge variant="outline">
                  {currentQuestion + 1}/{questions.length}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Score: {score}/{answers.length}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onExit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
            
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg ${
              selectedAnswer === question.correctAnswer 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === question.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-semibold ${
                  selectedAnswer === question.correctAnswer ? 'text-green-800' : 'text-red-800'
                }`}>
                  {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          )}

          <Button 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="w-full"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGame;
