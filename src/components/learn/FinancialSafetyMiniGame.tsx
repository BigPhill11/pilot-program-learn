import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle2, X, AlertTriangle } from 'lucide-react';

interface FinancialSafetyMiniGameProps {
  onComplete: () => void;
}

const FinancialSafetyMiniGame: React.FC<FinancialSafetyMiniGameProps> = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const scenarios = [
    {
      id: 1,
      message: "You've won our daily lottery! Send your bank account number to claim your $5,000 prize!",
      isScam: true,
      redFlags: ["unsolicited prize", "asking for bank info", "urgency"]
    },
    {
      id: 2,
      message: "Your Netflix subscription will expire tomorrow. Please update your payment method at netflix.com",
      isScam: false,
      redFlags: []
    },
    {
      id: 3,
      message: "URGENT: Your Apple ID has been locked. Click here immediately to unlock: apple-security-unlock.net",
      isScam: true,
      redFlags: ["urgency", "suspicious URL", "fake domain"]
    },
    {
      id: 4,
      message: "Hi! Thanks for shopping with us. Your order #12345 will arrive Thursday. Track it on our website.",
      isScam: false,
      redFlags: []
    }
  ];

  const currentScenarioData = scenarios[currentScenario];

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentScenarioData.isScam) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      onComplete();
    }
  };

  const isCorrect = selectedAnswer === currentScenarioData.isScam;
  const progress = ((currentScenario + 1) / scenarios.length) * 100;

  if (currentScenario >= scenarios.length) {
    return (
      <Card className="w-full border-purple-500">
        <CardContent className="p-6 text-center">
          <Shield className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-purple-700 mb-4">Scam Detector Complete!</h3>
          <div className="text-2xl font-bold mb-4">
            Final Score: {score}/{scenarios.length}
          </div>
          <div className="text-lg mb-4">
            {score === scenarios.length ? "Perfect! You're a scam detection expert! 🎉" :
             score >= scenarios.length * 0.75 ? "Great job! You caught most of the scams! 👍" :
             "Good effort! Keep practicing to improve your scam detection skills. 💪"}
          </div>
          <Button onClick={onComplete} className="bg-purple-500 hover:bg-purple-600">
            Complete Journey
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-500" />
            Scam Detector Challenge
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Scenario {currentScenario + 1} of {scenarios.length}</span>
              <span>Score: {score}/{scenarios.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-4">Is this message a scam?</h3>
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 italic text-gray-700">
                "{currentScenarioData.message}"
              </div>
            </div>

            {!showResult ? (
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => handleAnswer(true)}
                  variant="destructive"
                  size="lg"
                  className="flex-1 max-w-xs"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Yes, it's a scam
                </Button>
                <Button
                  onClick={() => handleAnswer(false)}
                  variant="default"
                  size="lg"
                  className="flex-1 max-w-xs bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  No, it's legitimate
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="font-bold text-green-600">Correct!</span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 text-red-600" />
                        <span className="font-bold text-red-600">Incorrect</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm">
                    This message is {currentScenarioData.isScam ? 'a scam' : 'legitimate'}.
                    {currentScenarioData.isScam && currentScenarioData.redFlags.length > 0 && (
                      <span> Red flags: {currentScenarioData.redFlags.join(', ')}</span>
                    )}
                  </p>
                </div>

                <div className="text-center">
                  <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600">
                    {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSafetyMiniGame;
