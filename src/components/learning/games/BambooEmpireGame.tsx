
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Zap, Heart, TreePine, Coins, Star, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';
import { toast } from 'sonner';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  level: string;
}

interface GameState {
  level: number;
  experience: number;
  bambooCoins: number;
  energy: number;
  territories: number;
  currentQuestion?: Flashcard;
  answeredQuestions: string[];
  achievements: string[];
}

interface BambooEmpireGameProps {
  level: 'beginner' | 'intermediate' | 'pro';
}

const BambooEmpireGame: React.FC<BambooEmpireGameProps> = ({ level }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    experience: 0,
    bambooCoins: 100,
    energy: 100,
    territories: 1,
    answeredQuestions: [],
    achievements: []
  });
  const [currentQuestion, setCurrentQuestion] = useState<Flashcard | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<string[]>([]);
  const [gamePhase, setGamePhase] = useState<'exploration' | 'question' | 'result'>('exploration');
  const isMobile = useIsMobile();

  useEffect(() => {
    loadFlashcards();
    loadGameState();
    
    // Listen for flashcard updates
    const handleFlashcardsUpdate = (event: CustomEvent) => {
      if (event.detail.level === level) {
        setFlashcards(event.detail.cards);
      }
    };
    
    window.addEventListener('flashcardsUpdated', handleFlashcardsUpdate as EventListener);
    return () => window.removeEventListener('flashcardsUpdated', handleFlashcardsUpdate as EventListener);
  }, [level]);

  const loadFlashcards = () => {
    const storageKey = `flashcards_${level}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setFlashcards(JSON.parse(stored));
    }
  };

  const loadGameState = () => {
    const storageKey = `bamboo_empire_${level}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setGameState(JSON.parse(stored));
    }
  };

  const saveGameState = (newState: GameState) => {
    const storageKey = `bamboo_empire_${level}`;
    localStorage.setItem(storageKey, JSON.stringify(newState));
    setGameState(newState);
  };

  const startExploration = () => {
    if (gameState.energy < 10) {
      toast.error("Not enough energy! Rest to recover.");
      return;
    }

    if (flashcards.length === 0) {
      toast.error("Add some flashcards to start exploring!");
      return;
    }

    // Get unanswered questions or reset if all answered
    const unansweredCards = flashcards.filter(card => 
      !gameState.answeredQuestions.includes(card.id)
    );
    const availableCards = unansweredCards.length > 0 ? unansweredCards : flashcards;
    
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    setCurrentQuestion(randomCard);
    
    // Generate multiple choice options
    generateMultipleChoice(randomCard);
    setGamePhase('question');
    setShowAnswer(false);
    setSelectedAnswer('');
  };

  const generateMultipleChoice = (correctCard: Flashcard) => {
    const allDefinitions = flashcards
      .filter(card => card.id !== correctCard.id)
      .map(card => card.definition);
    
    // Get 3 random wrong answers
    const wrongAnswers = allDefinitions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // Mix with correct answer and shuffle
    const options = [...wrongAnswers, correctCard.definition]
      .sort(() => Math.random() - 0.5);
    
    setMultipleChoiceOptions(options);
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;
    
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    const isCorrect = answer === currentQuestion.definition;
    const expGain = isCorrect ? 25 : 5;
    const coinGain = isCorrect ? 50 : 10;
    const energyCost = 10;
    
    const newState = {
      ...gameState,
      experience: gameState.experience + expGain,
      bambooCoins: gameState.bambooCoins + coinGain,
      energy: Math.max(0, gameState.energy - energyCost),
      answeredQuestions: isCorrect ? 
        [...gameState.answeredQuestions, currentQuestion.id] : 
        gameState.answeredQuestions
    };
    
    // Level up check
    const expRequired = newState.level * 100;
    if (newState.experience >= expRequired) {
      newState.level += 1;
      newState.territories += 1;
      newState.energy = 100; // Full energy on level up
      toast.success(`Level up! You're now level ${newState.level}!`);
    }
    
    saveGameState(newState);
    setGamePhase('result');
    
    if (isCorrect) {
      toast.success(`Correct! +${expGain} XP, +${coinGain} bamboo coins!`);
    } else {
      toast.error(`Wrong answer. +${expGain} XP for trying!`);
    }
  };

  const continueExploring = () => {
    setGamePhase('exploration');
    setCurrentQuestion(null);
  };

  const restAndRecover = () => {
    const newState = {
      ...gameState,
      energy: Math.min(100, gameState.energy + 30)
    };
    saveGameState(newState);
    toast.success("You rest by the bamboo grove and recover energy!");
  };

  const getLevelTitle = () => {
    if (gameState.level <= 3) return "Bamboo Sprout";
    if (gameState.level <= 6) return "Grove Guardian";
    if (gameState.level <= 10) return "Bamboo Emperor";
    return "Legendary Bamboo Master";
  };

  const getExpRequired = () => gameState.level * 100;
  const getExpProgress = () => (gameState.experience % getExpRequired()) / getExpRequired() * 100;

  if (flashcards.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <PandaLogo className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Adventures Yet!</h3>
          <p className="text-muted-foreground">
            Add some flashcards to {level} level to start building your Bamboo Empire!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <Badge variant="outline">{getLevelTitle()}</Badge>
            </div>
            <div className="text-2xl font-bold">Level {gameState.level}</div>
            <Progress value={getExpProgress()} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              {gameState.experience % getExpRequired()}/{getExpRequired()} XP
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Coins className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-yellow-600">{gameState.bambooCoins}</div>
            <div className="text-sm text-muted-foreground">Bamboo Coins</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-red-500">{gameState.energy}/100</div>
            <div className="text-sm text-muted-foreground">Energy</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TreePine className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-600">{gameState.territories}</div>
            <div className="text-sm text-muted-foreground">Territories</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Game Area */}
      {gamePhase === 'exploration' && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PandaLogo className="h-8 w-8" />
              Bamboo Forest Exploration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎋</div>
              <p className="text-lg mb-6">
                Phil wanders through the bamboo forest, looking for new territories to expand his empire...
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={startExploration}
                  disabled={gameState.energy < 10}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Explore Territory (-10 Energy)
                </Button>
                <Button 
                  onClick={restAndRecover}
                  variant="outline"
                  size="lg"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Rest & Recover
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {gamePhase === 'question' && currentQuestion && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              Challenge Encountered!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🐼</div>
              <p className="text-lg mb-4">
                Phil encounters a wise bamboo spirit who asks:
              </p>
              <Card className="bg-white border-2 border-blue-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-800">
                    What does "{currentQuestion.term}" mean?
                  </h3>
                  <div className="grid gap-3">
                    {multipleChoiceOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="p-4 h-auto text-left justify-start"
                        onClick={() => handleAnswer(option)}
                        disabled={showAnswer}
                      >
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {gamePhase === 'result' && currentQuestion && (
        <Card className={`${selectedAnswer === currentQuestion.definition ? 
          'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 
          'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedAnswer === currentQuestion.definition ? (
                <span className="text-green-600">✅ Correct!</span>
              ) : (
                <span className="text-red-600">❌ Incorrect</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-4">
                {selectedAnswer === currentQuestion.definition ? '🎉' : '💪'}
              </div>
              <Card className="bg-white mb-4">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{currentQuestion.term}</h4>
                  <p className="mb-3">{currentQuestion.definition}</p>
                  {currentQuestion.philExample && (
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400 mb-2">
                      <p className="text-sm italic">💡 {currentQuestion.philExample}</p>
                    </div>
                  )}
                  {currentQuestion.realWorldExample && (
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                      <p className="text-sm">🌍 {currentQuestion.realWorldExample}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Button onClick={continueExploring} size="lg">
                Continue Adventure
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BambooEmpireGame;
