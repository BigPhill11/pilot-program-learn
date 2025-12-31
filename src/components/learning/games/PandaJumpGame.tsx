
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
import { getFlashcardsByCategory, CategorizedFlashcard } from '@/data/flashcard-categories';

interface PandaJumpGameProps {
  level: 'beginner' | 'intermediate' | 'pro';
  onExit: () => void;
}

const PandaJumpGame: React.FC<PandaJumpGameProps> = ({ level, onExit }) => {
  const [flashcards, setFlashcards] = useState<CategorizedFlashcard[]>([]);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver'>('waiting');
  const [currentQuestion, setCurrentQuestion] = useState<CategorizedFlashcard | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(5);
  const [baseTime, setBaseTime] = useState(5);
  const [score, setScore] = useState(0);
  const [height, setHeight] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [pandaPosition, setPandaPosition] = useState(50);
  const [branches, setBranches] = useState<Array<{ id: number; position: number; passed: boolean }>>([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [showHeartBreak, setShowHeartBreak] = useState(false);
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
        { id: prev.length, position: Math.random() * 60 + 20, passed: false }
      ]);
    }
  }, [height, branches.length]);

  const loadFlashcards = () => {
    // Get Personal Finance flashcards from the unified system
    const allCards = getFlashcardsByCategory('personal-finance');
    
    // Filter by difficulty level
    const filteredCards = allCards.filter(card => card.level === level);
    
    // Use all cards if not enough at the specific level
    const availableCards = filteredCards.length >= 4 ? filteredCards : allCards;
    
    setFlashcards(availableCards);
  };

  const startGame = () => {
    if (flashcards.length < 4) {
      toast.error("Not enough flashcards available!");
      return;
    }
    
    setGameState('playing');
    setScore(0);
    setHeight(0);
    setStreak(0);
    setLives(3);
    setBaseTime(5);
    setBranches([{ id: 0, position: 50, passed: true }]);
    setPandaPosition(50);
    setIsJumping(false);
    setIsFalling(false);
    rewardedRef.current = false;
    generateQuestion();
  };

  const generateQuestion = useCallback(() => {
    if (flashcards.length < 4) return;

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
    if (!currentQuestion || isJumping) return;

    const isCorrect = selectedAnswer === currentQuestion.definition;
    
    if (isCorrect) {
      setAnsweredCorrectly(true);
      setIsJumping(true);
      
      const points = Math.max(1, Math.floor(timeLeft * 2)) * (streak + 1);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setHeight(prev => prev + 150);
      
      // Move panda to next branch
      const nextBranch = branches.find(b => !b.passed);
      if (nextBranch) {
        setPandaPosition(nextBranch.position);
        setBranches(prev => prev.map(b => 
          b.id === nextBranch.id ? { ...b, passed: true } : b
        ));
      }

      // Decrease time for next question (minimum 3 seconds)
      setBaseTime(prev => Math.max(3, prev - 0.5));
      
      toast.success(`Correct! Phil jumps up! +${points} points`);
      
      setTimeout(() => {
        setIsJumping(false);
        generateQuestion();
      }, 1200);
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
    setIsFalling(true);
    setShowHeartBreak(true);
    setBaseTime(Math.min(5, baseTime + 0.5));
    
    setTimeout(() => {
      setShowHeartBreak(false);
      setIsFalling(false);
    }, 800);
    
    if (lives <= 1) {
      endGame();
    } else {
      toast.warning("Phil slips but catches himself! Be careful!");
      setTimeout(() => {
        generateQuestion();
      }, 1500);
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

  if (flashcards.length < 4) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <PandaLogo className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Not Enough Bamboo!</h3>
          <p className="text-muted-foreground mb-4">
            We need more Personal Finance flashcards to start Phil's jumping adventure!
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
            <div className={`flex justify-center gap-1 mb-2 ${showHeartBreak ? 'animate-shake' : ''}`}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-5 w-5 transition-all duration-300 ${
                    i < lives 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-300'
                  } ${showHeartBreak && i === lives ? 'animate-heart-break' : ''}`}
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
        <Card className="bg-gradient-to-b from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10">
          <CardContent className="p-8 text-center">
            <div className="relative mb-6">
              <PandaLogo className="h-24 w-24 mx-auto animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Phil's Bamboo Jump Challenge!</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Help Phil jump from branch to branch by answering questions correctly!
              You have <span className="font-bold text-primary">{baseTime} seconds</span> per question.
              Answer fast for bonus points!
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
          <Card className="bg-gradient-to-b from-sky-200 to-green-200 dark:from-sky-900/40 dark:to-green-900/40 min-h-[280px] relative overflow-hidden">
            <CardContent className="p-4 h-full relative">
              {/* Time Progress */}
              <div className="absolute top-4 left-4 right-4 z-10">
                <div className="flex items-center justify-between mb-2">
                  <Timer className={`h-4 w-4 ${timeLeft <= 2 ? 'text-red-500 animate-pulse' : ''}`} />
                  <span className={`font-bold ${timeLeft <= 2 ? 'text-red-500' : ''}`}>{timeLeft}s</span>
                </div>
                <Progress 
                  value={(timeLeft / baseTime) * 100} 
                  className={`h-2 ${timeLeft <= 2 ? 'bg-red-100' : ''}`} 
                />
              </div>

              {/* Bamboo Tree Visualization */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 rounded-t-lg"
                   style={{ 
                     height: '100%',
                     background: 'linear-gradient(to right, hsl(142 76% 30%), hsl(142 76% 36%), hsl(142 76% 30%))'
                   }}>
                {/* Bamboo segments */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-full h-1 bg-green-800/30"
                    style={{ bottom: `${i * 50 + 25}px` }}
                  />
                ))}
              </div>

              {/* Branches */}
              {branches.map(branch => (
                <div
                  key={branch.id}
                  className={`absolute h-3 rounded-full transition-all duration-300 ${
                    branch.passed ? 'opacity-40' : 'animate-branch-sway'
                  }`}
                  style={{
                    left: `${branch.position}%`,
                    bottom: `${branch.id * 55 + 45}px`,
                    transform: 'translateX(-50%)',
                    width: '70px',
                    background: 'linear-gradient(to right, hsl(30 60% 35%), hsl(30 60% 45%), hsl(30 60% 35%))',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Leaves on branch */}
                  <div className="absolute -top-2 left-2 w-3 h-3 bg-green-500 rounded-full opacity-70" />
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-green-400 rounded-full opacity-60" />
                </div>
              ))}

              {/* Phil the Panda */}
              <div
                className={`absolute transform -translate-x-1/2 transition-all z-20 ${
                  isJumping ? 'animate-panda-jump' : ''
                } ${isFalling ? 'animate-panda-fall' : ''}`}
                style={{ 
                  left: `${pandaPosition}%`,
                  bottom: `${Math.max(40, height / 3)}px`
                }}
              >
                <div className={`relative ${isJumping ? 'animate-panda-squish' : ''}`}>
                  <PandaLogo className="h-12 w-12" />
                  {/* Jump particles */}
                  {isJumping && (
                    <>
                      <div className="absolute -bottom-2 left-0 w-2 h-2 bg-green-300 rounded-full animate-particle-1" />
                      <div className="absolute -bottom-2 right-0 w-2 h-2 bg-green-300 rounded-full animate-particle-2" />
                      <div className="absolute -bottom-3 left-1/2 w-1 h-1 bg-green-400 rounded-full animate-particle-3" />
                    </>
                  )}
                </div>
              </div>

              {/* Height indicator */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 rounded-lg p-2 shadow">
                <div className="text-sm font-bold">{height}m</div>
              </div>
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className={`border-2 transition-all duration-300 ${
            answeredCorrectly ? 'border-green-300 bg-green-50 dark:bg-green-900/20' : 'border-primary/30'
          }`}>
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
                    className="p-4 h-auto text-left justify-start text-wrap hover:bg-primary/10 hover:border-primary transition-all"
                    onClick={() => handleAnswer(option)}
                    disabled={answeredCorrectly || isJumping}
                  >
                    <span className="font-semibold mr-2 text-primary">{String.fromCharCode(65 + index)}.</span>
                    <span className="break-words">{option}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {gameState === 'gameOver' && (
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-8 text-center">
            <div className="relative mb-4">
              <PandaLogo className="h-20 w-20 mx-auto opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                😵
              </div>
            </div>
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
