
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { PLATFORM_REWARDS } from '@/config/gameConfig';

interface QuizGameProps {
  level: 'beginner' | 'intermediate' | 'pro';
  questionCount: number;
  onComplete: (score: number, totalQuestions: number, streak: number) => void;
  onExit: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizGame: React.FC<QuizGameProps> = ({ level, questionCount, onComplete, onExit }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  
  // Platform integration for Bamboo Empire rewards
  const { awardResources } = usePlatformIntegration();

  useEffect(() => {
    generateQuestions();
  }, [level, questionCount]);

  const generateQuestions = () => {
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
          },
          {
            question: "What is compound interest?",
            options: ["Simple interest", "Interest earned on both principal and previously earned interest", "A loan fee", "A bank charge"],
            correctAnswer: 1,
            explanation: "Compound interest is interest calculated on the initial principal and accumulated interest."
          }
        ],
        intermediate: [
          {
            question: "What does P/E ratio measure?",
            options: ["Company's debt", "Stock's valuation relative to earnings", "Dividend yield", "Market volatility"],
            correctAnswer: 1,
            explanation: "P/E ratio compares a company's stock price to its earnings per share."
          }
        ],
        pro: [
          {
            question: "What is Beta coefficient?",
            options: ["Dividend rate", "Stock's volatility compared to market", "Profit margin", "Interest rate"],
            correctAnswer: 1,
            explanation: "Beta measures how much a stock's price moves relative to the overall market."
          }
        ]
      };
      
      const availableQuestions = defaultQuestions[level] || [];
      const repeatedQuestions = [];
      
      // Repeat questions if we need more than available
      for (let i = 0; i < questionCount; i++) {
        repeatedQuestions.push(availableQuestions[i % availableQuestions.length]);
      }
      
      setQuestions(repeatedQuestions);
    } else {
      // Generate questions from uploaded flashcards
      const shuffledCards = [...flashcards].sort(() => Math.random() - 0.5);
      const selectedCards = shuffledCards.slice(0, Math.min(questionCount, flashcards.length));
      
      // If we need more questions than available cards, repeat some
      const repeatedCards = [];
      for (let i = 0; i < questionCount; i++) {
        repeatedCards.push(selectedCards[i % selectedCards.length]);
      }
      
      const generatedQuestions = repeatedCards.map((card: any) => {
        // Generate wrong answers from other cards
        const wrongOptions = flashcards
          .filter((c: any) => c.id !== card.id)
          .map((c: any) => c.definition)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        const allOptions = [card.definition, ...wrongOptions].sort(() => Math.random() - 0.5);
        const correctIndex = allOptions.findIndex(option => option === card.definition);
        
        return {
          question: `What is the definition of "${card.term}"?`,
          options: allOptions,
          correctAnswer: correctIndex,
          explanation: `${card.term}: ${card.definition}${card.philExample ? `\n\n💡 Phil's Example: ${card.philExample}` : ''}`
        };
      });
      
      setQuestions(generatedQuestions);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setBestStreak(Math.max(bestStreak, streak + 1));
      
      // Award to Bamboo Empire for correct answer
      awardResources(
        PLATFORM_REWARDS.quizGameCorrect,
        PLATFORM_REWARDS.quizGameXp,
        'Quiz Correct',
        false // Don't show toast for each answer, will show at end
      );
    } else {
      setStreak(0);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        onComplete(score + (isCorrect ? 1 : 0), questions.length, bestStreak);
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
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span>Score: {score}/{answers.length}</span>
                <span>Streak: {streak}</span>
                <span>Best: {bestStreak}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onExit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 break-words">{question.question}</h3>
            
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto p-4 break-words whitespace-normal ${
                    showResult && index === question.correctAnswer ? 'bg-green-500 hover:bg-green-600 text-white' :
                    showResult && selectedAnswer === index && index !== question.correctAnswer ? 'bg-red-500 hover:bg-red-600 text-white' : 
                    showResult ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="w-full text-wrap">{option}</span>
                </Button>
              ))}
            </div>
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg border ${
              selectedAnswer === question.correctAnswer 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
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
              <p className="text-sm text-muted-foreground whitespace-pre-line break-words">
                {question.explanation}
              </p>
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
