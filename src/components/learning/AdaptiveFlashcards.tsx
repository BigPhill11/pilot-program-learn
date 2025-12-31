/**
 * AdaptiveFlashcards - Unified flashcard learning hub
 * 
 * Study-only mode with:
 * - Study Modes: Browse & Study, Speed Challenge, Daily Challenge, Smart Review
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Zap,
  Calendar,
  Target,
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
import SwipeableStudyDeck from './flashcards/SwipeableStudyDeck';

// Hooks
import { useFlashcardGamification } from '@/hooks/useFlashcardGamification';
import { getAllUnifiedFlashcards, UnifiedFlashcard } from '@/data/unified-flashcards';

// Compatibility type
type CategorizedFlashcard = UnifiedFlashcard;

type StudyMode = 'browse' | 'speed' | 'daily' | 'smart' | 'deck';

const AdaptiveFlashcards: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  // Unified streak system
  const { currentStreak, streakLevel, recordActivity } = useUnifiedStreak();
  
  // State
  const [studyMode, setStudyMode] = useState<StudyMode>('browse');
  
  // Flashcard state
  const [selectedCards, setSelectedCards] = useState<CategorizedFlashcard[]>([]);
  const [selectedDeckTitle, setSelectedDeckTitle] = useState<string>('');
  const [dailyChallengeComplete, setDailyChallengeComplete] = useState(false);

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
              // Rewards are awarded by SwipeableStudyDeck via usePlatformIntegration
              handleBackToBrowse();
            }}
            onBack={handleBackToBrowse}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          🎯 Adaptive Flashcards
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master financial terms with smart study modes and personalized review
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

      {/* Study Content - No tabs needed, show directly */}
      {renderStudyContent()}
    </div>
  );
};

export default AdaptiveFlashcards;
