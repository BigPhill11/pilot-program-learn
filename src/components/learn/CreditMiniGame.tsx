
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Trophy, ChevronRight, TrendingUp } from 'lucide-react';
import { creditMiniGameData } from '@/data/credit-journey-data';

interface CreditMiniGameProps {
  onComplete: () => void;
}

const CreditMiniGame: React.FC<CreditMiniGameProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentScore, setCurrentScore] = useState(creditMiniGameData.startingScore);
  const [showResults, setShowResults] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    const currentScenario = creditMiniGameData.scenarios[currentStep];
    const isCorrect = answerIndex === currentScenario.correct;
    const newScore = isCorrect ? currentScore + currentScenario.scoreImpact : Math.max(300, currentScore - 20);
    setCurrentScore(newScore);

    if (currentStep < creditMiniGameData.scenarios.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 740) return 'text-green-600';
    if (score >= 670) return 'text-yellow-600';
    if (score >= 580) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 740) return 'Excellent';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  };

  const handleFinish = () => {
    setGameCompleted(true);
    onComplete();
  };

  if (gameCompleted) {
    return (
      <Card className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">{creditMiniGameData.badge.icon}</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Congratulations!</h2>
          <Badge className="bg-green-500 text-white text-lg px-4 py-2 mb-4">
            {creditMiniGameData.badge.title}
          </Badge>
          <p className="text-muted-foreground mb-6">{creditMiniGameData.badge.description}</p>
          <div className="flex justify-center">
            <Trophy className="h-12 w-12 text-green-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const finalScore = currentScore;
    const improvement = finalScore - creditMiniGameData.startingScore;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Credit Score Builder Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">📊</span>
              <div className={`text-4xl font-bold ${getScoreColor(finalScore)}`}>
                {finalScore}
              </div>
            </div>
            <p className="text-muted-foreground">Final Credit Score ({getScoreLabel(finalScore)})</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <TrendingUp className={`h-4 w-4 ${improvement >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {improvement >= 0 ? '+' : ''}{improvement} points from start
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {creditMiniGameData.scenarios.map((scenario, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === scenario.correct;
              
              return (
                <Card key={index} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">Step {scenario.step}</h4>
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              +{scenario.scoreImpact}
                            </Badge>
                          </>
                        ) : (
                          <>
                            <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                              <span className="text-white text-xs">✗</span>
                            </div>
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              -20
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{scenario.question}</p>
                    <p className="text-xs text-muted-foreground mb-2">{scenario.context}</p>
                    <div className="space-y-1">
                      <p className="text-xs">
                        <strong>Your answer:</strong> {scenario.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs">
                          <strong>Correct answer:</strong> {scenario.options[scenario.correct]}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground italic">{scenario.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button onClick={handleFinish} size="lg" className="w-full">
              {finalScore >= creditMiniGameData.targetScore ? '🎉 Claim Your Badge!' : '🏆 Claim Your Badge!'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentScenario = creditMiniGameData.scenarios[currentStep];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{creditMiniGameData.title}</CardTitle>
          <Badge variant="outline">
            Step {currentStep + 1} of {creditMiniGameData.scenarios.length}
          </Badge>
        </div>
        <p className="text-muted-foreground">{creditMiniGameData.description}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(currentScore)}`}>
              {currentScore}
            </div>
            <p className="text-xs text-muted-foreground">Current Score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {creditMiniGameData.targetScore}
            </div>
            <p className="text-xs text-muted-foreground">Target Score</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Step {currentScenario.step}</h3>
            <p className="text-sm text-muted-foreground mb-3">{currentScenario.context}</p>
            <p className="font-medium">{currentScenario.question}</p>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {currentScenario.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 px-4"
              onClick={() => handleAnswer(index)}
            >
              <span className="flex-grow">{option}</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditMiniGame;
