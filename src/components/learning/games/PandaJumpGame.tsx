
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TreePine, Timer, Zap, Heart, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';
import { toast } from 'sonner';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { PLATFORM_REWARDS } from '@/config/gameConfig';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  level: string;
}

interface PandaJumpGameProps {
  level: 'beginner' | 'intermediate' | 'pro';
  onExit: () => void;
}

const PandaJumpGame: React.FC<PandaJumpGameProps> = ({ level, onExit }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver'>('waiting');
  const [currentQuestion, setCurrentQuestion] = useState<Flashcard | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [baseTime, setBaseTime] = useState(20);
  const [score, setScore] = useState(0);
  const [height, setHeight] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [pandaPosition, setPandaPosition] = useState(50); // percentage from left
  const [branches, setBranches] = useState<Array<{ id: number; position: number; passed: boolean }>>([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const isMobile = useIsMobile();
  
  // Platform integration for Bamboo Empire rewards
  const { awardResources } = usePlatformIntegration();
  const rewardedRef = useRef(false);

  useEffect(() => {
    loadFlashcards();
  }, [level]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  useEffect(() => {
    // Generate branches as Phil climbs
    if (height > branches.length * 100) {
      setBranches(prev => [
        ...prev,
        { id: prev.length, position: Math.random() * 80 + 10, passed: false }
      ]);
    }
  }, [height, branches.length]);

  const loadFlashcards = () => {
    const storageKey = `flashcards_${level}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const cards = JSON.parse(stored);
      setFlashcards(cards);
    }
  };

  const startGame = () => {
    if (flashcards.length === 0) {
      toast.error("Add some flashcards to start jumping!");
      return;
    }
    
    setGameState('playing');
    setScore(0);
    setHeight(0);
    setStreak(0);
    setLives(3);
    setBaseTime(20);
    setBranches([{ id: 0, position: 50, passed: true }]);
    setPandaPosition(50);
    rewardedRef.current = false; // Reset reward tracking for new game
    generateQuestion();
  };

  const generateQuestion = useCallback(() => {
    if (flashcards.length === 0) return;

    const randomCard = flashcards[Math.floor(Math.random() * flashcards.length)];
    setCurrentQuestion(randomCard);

    // Generate wrong answers from other cards
    const wrongAnswers = flashcards
      .filter(card => card.id !== randomCard.id)
      .map(card => card.definition)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [...wrongAnswers, randomCard.definition]
      .sort(() => Math.random() - 0.5);

    setOptions(allOptions);
    setTimeLeft(baseTime);
    setAnsweredCorrectly(false);
  }, [flashcards, baseTime]);

  const handleAnswer = (selectedAnswer: string) => {
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.definition;
    
    if (isCorrect) {
      setAnsweredCorrectly(true);
      const points = Math.max(1, Math.floor(timeLeft / 2)) * (streak + 1);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setHeight(prev => prev + 150); // Phil jumps higher!
      
      // Move panda to next branch
      const nextBranch = branches.find(b => !b.passed);
      if (nextBranch) {
        setPandaPosition(nextBranch.position);
        setBranches(prev => prev.map(b => 
          b.id === nextBranch.id ? { ...b, passed: true } : b
        ));
      }

      // Decrease time for next question (minimum 7 seconds)
      setBaseTime(prev => Math.max(7, prev - 1));
      
      toast.success(`Correct! Phil jumps up! +${points} points`);
      
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      handleWrongAnswer();
    }
  };

  const handleTimeUp = () => {
    toast.error("Time's up! Phil slips!");
    handleWrongAnswer();
  };

  const handleWrongAnswer = () => {
    setStreak(0);
    setLives(prev => prev - 1);
    setBaseTime(Math.min(20, baseTime + 2)); // Give back some time after mistake
    
    if (lives <= 1) {
      endGame();
    } else {
      toast.warning("Phil slips but catches himself! Be more careful!");
      setTimeout(() => {
        generateQuestion();
      }, 2000);
    }
  };

  const endGame = () => {
    setGameState('gameOver');
    
    // Award to Bamboo Empire on game completion
    if (!rewardedRef.current && score > 0) {
      rewardedRef.current = true;
      awardResources(
        PLATFORM_REWARDS.pandaJumpComplete,
        PLATFORM_REWARDS.pandaJumpXp,
        'Panda Jump',
        true
      );
    }
    
    // Save high score
    const storageKey = `panda_jump_highscore_${level}`;
    const currentHighScore = parseInt(localStorage.getItem(storageKey) || '0');
    if (score > currentHighScore) {
      localStorage.setItem(storageKey, score.toString());
      toast.success("New High Score! 🎉");
    }
  };

  const getHighScore = () => {
    const storageKey = `panda_jump_highscore_${level}`;
    return parseInt(localStorage.getItem(storageKey) || '0');
  };

  if (flashcards.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <PandaLogo className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Bamboo to Jump!</h3>
          <p className="text-muted-foreground mb-4">
            Add some flashcards to {level} level to start Phil's jumping adventure!
          </p>
          <Button onClick={onExit}>Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Game Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-green-600" />
              Panda Jump - {level}
              <Badge variant="outline">Height: {height}m</Badge>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onExit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Game Stats */}
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{streak}</div>
            <div className="text-sm text-muted-foreground">Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-5 w-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Lives</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{getHighScore()}</div>
            <div className="text-sm text-muted-foreground">High Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Game Area */}
      {gameState === 'waiting' && (
        <Card className="bg-gradient-to-b from-green-100 to-green-50">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🐼</div>
            <h2 className="text-2xl font-bold mb-4">Phil's Bamboo Jump Challenge!</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Help Phil jump from branch to branch by answering questions correctly!
              Start with {baseTime} seconds per question, but time decreases with each correct answer.
            </p>
            <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
              <Zap className="h-4 w-4 mr-2" />
              Start Jumping!
            </Button>
          </CardContent>
        </Card>
      )}

      {gameState === 'playing' && currentQuestion && (
        <div className="space-y-4">
          {/* Visual Game Area */}
          <Card className="bg-gradient-to-b from-sky-200 to-green-200 min-h-[300px] relative overflow-hidden">
            <CardContent className="p-4 h-full relative">
              {/* Time Progress */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center justify-between mb-2">
                  <Timer className="h-4 w-4" />
                  <span className="font-bold">{timeLeft}s</span>
                </div>
                <Progress value={(timeLeft / baseTime) * 100} className="h-2" />
              </div>

              {/* Bamboo Tree Visualization */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 bg-green-700 opacity-30"
                   style={{ height: '100%' }}>
              </div>

              {/* Branches */}
              {branches.map(branch => (
                <div
                  key={branch.id}
                  className={`absolute w-16 h-3 bg-amber-600 rounded-full ${branch.passed ? 'opacity-50' : ''}`}
                  style={{
                    left: `${branch.position}%`,
                    bottom: `${branch.id * 60 + 50}px`,
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}

              {/* Phil the Panda */}
              <div
                className="absolute bottom-12 transform -translate-x-1/2 transition-all duration-1000"
                style={{ 
                  left: `${pandaPosition}%`,
                  bottom: `${Math.max(50, height / 3)}px`
                }}
              >
                <div className="text-4xl animate-bounce">🐼</div>
              </div>

              {/* Height indicator */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded p-2">
                <div className="text-sm font-bold">{height}m</div>
              </div>
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className={`border-2 ${answeredCorrectly ? 'border-green-300 bg-green-50' : 'border-blue-300'}`}>
            <CardHeader>
              <CardTitle className="text-center">
                What does "{currentQuestion.term}" mean?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-4 h-auto text-left justify-start text-wrap"
                    onClick={() => handleAnswer(option)}
                    disabled={answeredCorrectly}
                  >
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    <span className="break-words">{option}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {gameState === 'gameOver' && (
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-2xl font-bold mb-4">Phil Falls Down!</h2>
            <div className="space-y-2 mb-6">
              <p className="text-lg">Final Score: <span className="font-bold text-blue-600">{score}</span></p>
              <p className="text-lg">Max Height: <span className="font-bold text-green-600">{height}m</span></p>
              <p className="text-lg">Best Streak: <span className="font-bold text-purple-600">{streak}</span></p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                Try Again
              </Button>
              <Button onClick={onExit} variant="outline" size="lg">
                Exit Game
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PandaJumpGame;
