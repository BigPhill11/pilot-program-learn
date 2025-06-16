
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Trophy, ChevronRight } from 'lucide-react';
import { taxMiniGameData } from '@/data/taxes-journey-data';

interface TaxesMiniGameProps {
  onComplete: () => void;
}

const TaxesMiniGame: React.FC<TaxesMiniGameProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentStep < taxMiniGameData.scenarios.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    taxMiniGameData.scenarios.forEach((scenario, index) => {
      if (answers[index] === scenario.correct) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinish = () => {
    setGameCompleted(true);
    onComplete();
  };

  if (gameCompleted) {
    return (
      <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">{taxMiniGameData.badge.icon}</div>
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">Congratulations!</h2>
          <Badge className="bg-yellow-500 text-white text-lg px-4 py-2 mb-4">
            {taxMiniGameData.badge.title}
          </Badge>
          <p className="text-muted-foreground mb-6">{taxMiniGameData.badge.description}</p>
          <div className="flex justify-center">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / taxMiniGameData.scenarios.length) * 100);

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Tax Filing Simulation Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {score}/{taxMiniGameData.scenarios.length}
            </div>
            <p className="text-muted-foreground">Correct Answers ({percentage}%)</p>
          </div>

          <div className="space-y-4">
            {taxMiniGameData.scenarios.map((scenario, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === scenario.correct;
              
              return (
                <Card key={index} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">Step {scenario.step}</h4>
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-white text-xs">✗</span>
                        </div>
                      )}
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
              {percentage >= 70 ? '🎉 Claim Your Badge!' : '🏆 Claim Your Badge!'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentScenario = taxMiniGameData.scenarios[currentStep];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{taxMiniGameData.title}</CardTitle>
          <Badge variant="outline">
            Step {currentStep + 1} of {taxMiniGameData.scenarios.length}
          </Badge>
        </div>
        <p className="text-muted-foreground">{taxMiniGameData.description}</p>
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

export default TaxesMiniGame;
