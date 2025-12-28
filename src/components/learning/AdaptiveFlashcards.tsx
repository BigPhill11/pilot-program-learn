/**
 * AdaptiveFlashcards - Unified flashcard learning hub
 * 
 * Combines Adaptive Learning and Flashcards into a single tab with:
 * - Study Modes: Browse & Study, Speed Challenge, Daily Challenge, Smart Review
 * - Games: Quizzes, Matching Game, Panda Jump
 * - Manage: Upload and manage custom flashcards
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Gamepad2, 
  Settings,
  Zap,
  Calendar,
  Target,
  Shuffle,
  Upload,
  ChevronLeft,
  Flame
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

// Flashcard components
import UnifiedCategoryBrowser from './flashcards/UnifiedCategoryBrowser';
import { SpeedChallenge } from './flashcards/SpeedChallenge';
import { DailyChallenge } from './flashcards/DailyChallenge';
import { SmartReviewMode } from './flashcards/SmartReviewMode';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import FlashcardUploader from './flashcards/FlashcardUploader';
import FlashcardManager from './flashcards/FlashcardManager';
import SwipeableStudyDeck from './flashcards/SwipeableStudyDeck';

// Game components
import QuizzesSection from './QuizzesSection';
import MatchingGameSection from './MatchingGameSection';
import PandaJumpSection from './PandaJumpSection';

// Hooks
import { useFlashcardGamification } from '@/hooks/useFlashcardGamification';
import { getAllUnifiedFlashcards, UnifiedFlashcard } from '@/data/unified-flashcards';

// Compatibility type
type CategorizedFlashcard = UnifiedFlashcard;

type MainSection = 'study' | 'games' | 'manage';
type StudyMode = 'browse' | 'speed' | 'daily' | 'smart' | 'deck';
type GameMode = 'quizzes' | 'matching' | 'panda-jump';
type ManageMode = 'upload' | 'my-cards';

const AdaptiveFlashcards: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  // Unified streak system
  const { currentStreak, streakLevel, recordActivity } = useUnifiedStreak();
  
  // State
  const [mainSection, setMainSection] = useState<MainSection>('study');
  const [studyMode, setStudyMode] = useState<StudyMode>('browse');
  const [gameMode, setGameMode] = useState<GameMode>('quizzes');
  const [manageMode, setManageMode] = useState<ManageMode>('upload');
  
  // Flashcard state
  const [selectedCards, setSelectedCards] = useState<CategorizedFlashcard[]>([]);
  const [selectedDeckTitle, setSelectedDeckTitle] = useState<string>('');
  const [dailyChallengeComplete, setDailyChallengeComplete] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');
  const [refreshKey, setRefreshKey] = useState(0);

  // Gamification hook (for SM2 progress, not streaks)
  const {
    sm2Progress,
    currentSession,
    recordCardReview,
    startSession,
    endSession,
    getAllSM2Progress,
  } = useFlashcardGamification();

  // Check daily challenge status
  useEffect(() => {
    const lastChallenge = localStorage.getItem('last_daily_challenge');
    const today = new Date().toISOString().split('T')[0];
    setDailyChallengeComplete(lastChallenge === today);
  }, []);

  // Handle card selection from category browser
  const handleSelectCards = (cards: CategorizedFlashcard[], title: string) => {
    setSelectedCards(cards);
    setSelectedDeckTitle(title);
    setStudyMode('deck');
    startSession([title], []);
  };

  // Handle speed challenge complete
  const handleSpeedComplete = (score: number, accuracy: number, xpEarned: number) => {
    setStudyMode('browse');
    recordActivity();
  };

  // Handle daily challenge complete
  const handleDailyComplete = (score: number, xpEarned: number) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('last_daily_challenge', today);
    setDailyChallengeComplete(true);
    setStudyMode('browse');
    recordActivity();
  };

  // Handle flashcard upload
  const handleUploadComplete = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Get daily challenge cards
  const getDailyChallengeCards = (): CategorizedFlashcard[] => {
    const allCards = getAllUnifiedFlashcards();
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };

  // Back to browse handler
  const handleBackToBrowse = () => {
    setStudyMode('browse');
    setSelectedCards([]);
    setSelectedDeckTitle('');
  };

  // Render study content based on mode
  const renderStudyContent = () => {
    switch (studyMode) {
      case 'browse':
        return (
          <div className="space-y-6">
            {/* Study Mode Selection */}
            <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
              <Card 
                className="cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20"
                onClick={() => setStudyMode('browse')}
              >
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">Browse & Study</h3>
                  <p className="text-xs text-muted-foreground">Explore flashcard categories</p>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20"
                onClick={() => {
                  const cards = getAllUnifiedFlashcards().slice(0, 15);
                  setSelectedCards(cards);
                  setStudyMode('speed');
                }}
              >
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">Speed Challenge</h3>
                  <p className="text-xs text-muted-foreground">Race against the clock</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer hover:shadow-md transition-all border-2 ${
                  dailyChallengeComplete 
                    ? 'border-green-300 bg-green-50 dark:bg-green-950/20' 
                    : 'border-transparent hover:border-primary/20'
                }`}
                onClick={() => setStudyMode('daily')}
              >
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">Daily Challenge</h3>
                  <p className="text-xs text-muted-foreground">
                    {dailyChallengeComplete ? '✓ Completed today!' : 'New challenge awaits'}
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20"
                onClick={() => setStudyMode('smart')}
              >
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">Smart Review</h3>
                  <p className="text-xs text-muted-foreground">Spaced repetition</p>
                </CardContent>
              </Card>
            </div>

            {/* Unified Streak Display */}
            <Card className={`p-4 ${streakLevel.bg} border-orange-200`}>
              <div className="flex items-center gap-3">
                <Flame className={`h-8 w-8 ${streakLevel.color}`} />
                <div>
                  <div className="text-xl font-bold">{currentStreak} Day Streak</div>
                  <div className={`text-sm ${streakLevel.color}`}>{streakLevel.level}</div>
                </div>
              </div>
            </Card>

            {/* Category Browser */}
            <UnifiedCategoryBrowser onSelectCards={handleSelectCards} />
          </div>
        );

      case 'speed':
        return (
          <SpeedChallenge
            cards={selectedCards.length > 0 ? selectedCards : getAllUnifiedFlashcards().slice(0, 15)}
            onComplete={handleSpeedComplete}
            onCancel={handleBackToBrowse}
          />
        );

      case 'daily':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={handleBackToBrowse} className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
            <DailyChallenge
              cards={getDailyChallengeCards()}
              onComplete={handleDailyComplete}
              isCompleted={dailyChallengeComplete}
            />
          </div>
        );

      case 'smart':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={handleBackToBrowse} className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
            <SmartReviewMode
              allSM2Progress={getAllSM2Progress()}
              onStartReview={() => {
                const allCards = getAllUnifiedFlashcards();
                setSelectedCards(allCards);
                setStudyMode('deck');
              }}
            />
          </div>
        );

      case 'deck':
        return (
          <SwipeableStudyDeck
            cards={selectedCards}
            title={selectedDeckTitle}
            onComplete={(stats) => {
              recordActivity();
              handleBackToBrowse();
            }}
            onBack={handleBackToBrowse}
          />
        );

      default:
        return null;
    }
  };

  // Render games content
  const renderGamesContent = () => {
    return (
      <div className="space-y-6">
        {/* Game Mode Selection */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          <Card 
            className={`cursor-pointer transition-all ${
              gameMode === 'quizzes' ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setGameMode('quizzes')}
          >
            <CardContent className="p-4 text-center">
              <Brain className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold">Quizzes</h3>
              <p className="text-xs text-muted-foreground">Test your knowledge</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${
              gameMode === 'matching' ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setGameMode('matching')}
          >
            <CardContent className="p-4 text-center">
              <Shuffle className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold">Matching Game</h3>
              <p className="text-xs text-muted-foreground">Match terms & definitions</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${
              gameMode === 'panda-jump' ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setGameMode('panda-jump')}
          >
            <CardContent className="p-4 text-center">
              <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold">Panda Jump</h3>
              <p className="text-xs text-muted-foreground">Jump with Phil!</p>
            </CardContent>
          </Card>
        </div>

        {/* Game Content */}
        {gameMode === 'quizzes' && <QuizzesSection />}
        {gameMode === 'matching' && <MatchingGameSection />}
        {gameMode === 'panda-jump' && <PandaJumpSection />}
      </div>
    );
  };

  // Render manage content
  const renderManageContent = () => {
    return (
      <div className="space-y-6">
        {/* Manage Mode Selection */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
          <Card 
            className={`cursor-pointer transition-all ${
              manageMode === 'upload' ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setManageMode('upload')}
          >
            <CardContent className="p-4 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold">Upload Flashcards</h3>
              <p className="text-xs text-muted-foreground">Add new cards via CSV or manually</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${
              manageMode === 'my-cards' ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setManageMode('my-cards')}
          >
            <CardContent className="p-4 text-center">
              <Settings className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <h3 className="font-semibold">My Flashcards</h3>
              <p className="text-xs text-muted-foreground">Edit and manage your cards</p>
            </CardContent>
          </Card>
        </div>

        {/* Level Selection for Management */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          {(['beginner', 'intermediate', 'pro'] as const).map((level) => (
            <Card 
              key={level}
              className={`cursor-pointer transition-all ${
                selectedLevel === level ? 'ring-2 ring-primary' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedLevel(level)}
            >
              <CardContent className="p-4 text-center">
                <Badge className={`mb-2 ${
                  level === 'beginner' ? 'bg-green-500' :
                  level === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                } text-white`}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manage Content */}
        {manageMode === 'upload' && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Flashcards</CardTitle>
              <p className="text-muted-foreground">
                Add new flashcards via CSV upload or create individual cards
              </p>
            </CardHeader>
            <CardContent>
              <FlashcardUploader onUploadComplete={handleUploadComplete} />
            </CardContent>
          </Card>
        )}
        {manageMode === 'my-cards' && (
          <FlashcardManager level={selectedLevel} onUpdate={handleUploadComplete} />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          🎯 Adaptive Flashcards
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master financial terms with smart study modes, challenging games, and personalized review
        </p>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="text-sm">
            <Flame className="h-3 w-3 mr-1 text-orange-500" />
            {currentStreak} Day Streak
          </Badge>
          <Badge variant="outline" className="text-sm">Smart Spaced Repetition</Badge>
          <Badge variant="outline" className="text-sm">XP & Bamboo Rewards</Badge>
        </div>
      </div>

      {/* Main Section Tabs */}
      <Tabs value={mainSection} onValueChange={(v) => setMainSection(v as MainSection)} className="w-full">
        <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'h-auto' : ''}`}>
          <TabsTrigger value="study" className={isMobile ? 'text-xs py-3' : ''}>
            <BookOpen className="h-4 w-4 mr-1" />
            {isMobile ? 'Study' : 'Study Modes'}
          </TabsTrigger>
          <TabsTrigger value="games" className={isMobile ? 'text-xs py-3' : ''}>
            <Gamepad2 className="h-4 w-4 mr-1" />
            Games
          </TabsTrigger>
          <TabsTrigger value="manage" className={isMobile ? 'text-xs py-3' : ''}>
            <Settings className="h-4 w-4 mr-1" />
            Manage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="mt-6">
          {renderStudyContent()}
        </TabsContent>

        <TabsContent value="games" className="mt-6">
          {renderGamesContent()}
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          {renderManageContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdaptiveFlashcards;

