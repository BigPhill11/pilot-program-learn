
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Play, RotateCcw } from 'lucide-react';

const ElevatorPitchGame: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  
  const prompts = [
    "Tell me about yourself and why you're interested in finance.",
    "Explain your background and what makes you unique.",
    "Describe your career goals and how this role fits in.",
    "Share your story and what drives your passion for finance."
  ];

  const tips = [
    "Keep it under 60 seconds",
    "Start with your current situation",
    "Highlight 2-3 key achievements",
    "End with your career aspirations",
    "Practice with confidence and enthusiasm"
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRecording(false);
    }
    return () => clearInterval(interval);
  }, [isRecording, timeLeft]);

  const startRecording = () => {
    setIsRecording(true);
    setGameStarted(true);
    setTimeLeft(60);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const resetGame = () => {
    setIsRecording(false);
    setGameStarted(false);
    setTimeLeft(60);
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="text-center mb-4">
          <h4 className="font-semibold text-lg mb-2">🎤 Elevator Pitch Practice</h4>
          <p className="text-sm text-muted-foreground">
            Practice your 60-second elevator pitch with this timer challenge!
          </p>
        </div>
        
        <div className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <p className="font-medium text-blue-800 mb-2">Your Prompt:</p>
              <p className="text-blue-700">"{prompts[currentPrompt]}"</p>
            </CardContent>
          </Card>

          <div className="text-center">
            <div className={`inline-flex items-center gap-2 text-2xl font-mono ${
              timeLeft <= 10 ? 'text-red-600' : timeLeft <= 30 ? 'text-orange-600' : 'text-green-600'
            }`}>
              <Timer className="h-6 w-6" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            
            {timeLeft <= 10 && isRecording && (
              <Badge variant="destructive" className="ml-2">Time Running Out!</Badge>
            )}
          </div>

          <div className="flex gap-2 justify-center">
            {!gameStarted ? (
              <Button onClick={startRecording} size="lg">
                <Play className="h-4 w-4 mr-2" />
                Start Practice
              </Button>
            ) : (
              <>
                {isRecording ? (
                  <Button onClick={stopRecording} variant="destructive">
                    Stop Recording
                  </Button>
                ) : (
                  <Button onClick={startRecording} variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Prompt
                </Button>
              </>
            )}
          </div>

          {timeLeft === 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-3 text-center">
                <p className="text-green-800 font-medium">🎉 Time's up! How did you do?</p>
                <p className="text-green-700 text-sm mt-1">
                  Remember: A great pitch is clear, confident, and tells your story!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h5 className="font-medium mb-3">💡 Quick Tips for Success:</h5>
          <div className="space-y-2">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElevatorPitchGame;
