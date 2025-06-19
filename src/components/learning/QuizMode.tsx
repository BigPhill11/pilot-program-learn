
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  analogy?: string;
  real_world_example?: string;
  category: string;
  difficulty_level: string;
}

interface QuizModeProps {
  terms: FinancialTerm[];
  userLevel: string;
  selectedDifficulty: string;
  termCount: number;
}

interface QuizQuestion {
  term: FinancialTerm;
  options: string[];
  correctAnswer: string;
}

const QuizMode: React.FC<QuizModeProps> = ({ terms, userLevel, selectedDifficulty, termCount }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Filter terms based on selected difficulty
  const filteredTerms = useMemo(() => {
    if (!terms || !Array.isArray(terms)) return [];
    
    let filtered = terms;
    
    if (selectedDifficulty !== 'all') {
      filtered = terms.filter(term => term.difficulty_level === selectedDifficulty);
    } else {
      // If 'all' is selected, still respect user level for beginners
      if (userLevel === 'beginner') {
        filtered = terms.filter(term => term.difficulty_level === 'beginner');
      } else if (userLevel === 'intermediate') {
        filtered = terms.filter(term => 
          term.difficulty_level === 'beginner' || term.difficulty_level === 'intermediate'
        );
      }
      // Advanced users see all terms when 'all' is selected
    }
    
    return filtered;
  }, [terms, selectedDifficulty, userLevel]);

  const generateQuestions = () => {
    if (filteredTerms.length < 4) return [];

    const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5);
    const selectedTerms = shuffled.slice(0, Math.min(termCount, shuffled.length));
    
    return selectedTerms.map(term => {
      const wrongAnswers = filteredTerms
        .filter(t => t.id !== term.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(t => t.definition);
      
      const allOptions = [term.definition, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      return {
        term,
        options: allOptions,
        correctAnswer: term.definition
      };
    });
  };

  useEffect(() => {
    if (filteredTerms.length >= 4) {
      const newQuestions = generateQuestions();
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [filteredTerms, termCount]);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
      }
    }, 1500);
  };

  const restartQuiz = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!terms || terms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading terms...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Not enough terms available for the selected difficulty level to generate a quiz.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isQuizComplete = currentQuestionIndex >= questions.length - 1 && showResult;

  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <div className="text-3xl font-bold">
            {score} / {questions.length}
          </div>
          <div className="text-lg text-muted-foreground">
            {percentage}% correct
          </div>
          <Progress value={percentage} className="w-full max-w-xs mx-auto" />
          <div className="pt-4">
            <Button onClick={restartQuiz} size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm">Score: {score}/{questions.length}</span>
          <Badge variant="secondary">{currentQuestion.term.difficulty_level}</Badge>
        </div>
      </div>

      <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">
            What is the definition of "{currentQuestion.term.term}"?
          </CardTitle>
          <Badge className="mx-auto w-fit">{currentQuestion.term.category}</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <Button
                key={index}
                variant={showCorrect ? "default" : showIncorrect ? "destructive" : isSelected ? "secondary" : "outline"}
                className={`w-full text-left justify-start h-auto p-4 ${showCorrect ? 'bg-green-500 hover:bg-green-600' : ''}`}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
              >
                <div className="flex items-start gap-3 w-full">
                  {showResult && (
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      ) : isSelected ? (
                        <XCircle className="h-4 w-4 text-white" />
                      ) : null}
                    </div>
                  )}
                  <span className="text-sm leading-relaxed">{option}</span>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {selectedAnswer && !showResult && (
        <div className="text-center">
          <Button onClick={handleNext} size="lg">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizMode;
