import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, TrendingUp, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import TinderCard from './TinderCard';
import SwipeActions from './SwipeActions';
import TinderTutorial from './TinderTutorial';
import MatchesCollection from './MatchesCollection';
import { useTinderSwipe } from './hooks/useTinderSwipe';
import { useGameStats } from './hooks/useGameStats';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface CompanyTinderGameProps {
  companies: CompanyProfile[];
}

const CompanyTinderGame: React.FC<CompanyTinderGameProps> = ({ companies }) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialComplete, setTutorialComplete] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  const {
    currentCompany,
    currentIndex,
    handleSwipe,
    resetDeck,
    goToPrevious,
    goToNext,
    isLastCard,
    allSwiped,
    swipedCompanies,
    matches,
    totalCompanies,
  } = useTinderSwipe(companies);

  const {
    stats,
    achievements,
    loading: statsLoading,
    addXP,
    incrementStat,
    unlockAchievement,
  } = useGameStats();

  useEffect(() => {
    // Check if tutorial has been completed
    const completed = localStorage.getItem('tinderTutorialComplete');
    if (!completed) {
      setShowTutorial(true);
    } else {
      setTutorialComplete(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem('tinderTutorialComplete', 'true');
    setShowTutorial(false);
    setTutorialComplete(true);
    
    // Award tutorial completion rewards
    addXP(100);
    unlockAchievement('speed_dater');
    
    toast.success('🎉 Tutorial Complete! +100 XP', {
      description: 'You earned the Speed Dater badge!',
    });
  };

  const onSwipe = async (action: Parameters<typeof handleSwipe>[0]) => {
    const result = await handleSwipe(action);
    
    // Update stats
    addXP(result.xpEarned);
    incrementStat('swipeCount');
    
    if (action === 'like') {
      incrementStat('likeCount');
    } else if (action === 'super_like') {
      incrementStat('superLikeCount');
    } else if (action === 'pass') {
      incrementStat('passCount');
    }

    // Show feedback
    const actionMessages = {
      pass: '➡️ Passed',
      like: '💚 Liked!',
      super_like: '⭐ Super Liked!',
      skip: '⏭️ Skipped',
      never: '🚫 Hidden',
    };

    toast.success(actionMessages[action], {
      description: `+${result.xpEarned} XP`,
    });

    // Check for special achievements
    if (action === 'super_like') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }

    // Force card re-render with animation
    setCardKey(prev => prev + 1);
  };

  if (showMatches) {
    return <MatchesCollection onBack={() => setShowMatches(false)} companies={companies} />;
  }

  if (allSwiped) {
    return (
      <Card className="text-center py-12">
        <CardContent className="space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold">All Done!</h2>
          <p className="text-lg text-muted-foreground">
            You've swiped through all {totalCompanies} companies
          </p>
          <div className="space-y-2">
            <p className="text-sm">Total XP Earned: <strong>{stats.totalXP}</strong></p>
            <p className="text-sm">Matches Made: <strong>{matches.length}</strong></p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={resetDeck}>
              Start Over
            </Button>
            {matches.length > 0 && (
              <Button variant="outline" onClick={() => setShowMatches(true)}>
                <Heart className="mr-2 h-4 w-4" />
                View Matches ({matches.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tutorial */}
      <TinderTutorial 
        isOpen={showTutorial} 
        onComplete={handleTutorialComplete}
      />

      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="px-3 py-1">
            <TrendingUp className="mr-2 h-4 w-4" />
            {stats.totalXP} XP
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <Award className="mr-2 h-4 w-4" />
            {achievements.filter(a => a.unlocked).length} Badges
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMatches(true)}
          >
            <Heart className="mr-2 h-4 w-4" />
            Matches ({matches.length})
          </Button>
          {!tutorialComplete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTutorial(true)}
            >
              Show Tutorial
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Company {currentIndex + 1} of {totalCompanies}
        </p>
        <div className="w-full bg-secondary h-2 rounded-full mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / totalCompanies) * 100}%` }}
          />
        </div>
      </div>

      {/* Swipe Card */}
      <AnimatePresence mode="wait">
        {currentCompany && (
          <motion.div
            key={`${currentCompany.id}-${cardKey}`}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            transition={{ duration: 0.3 }}
          >
            <TinderCard company={currentCompany} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Actions */}
      <SwipeActions 
        onSwipe={onSwipe}
        superLikesRemaining={stats.superLikesRemaining}
      />

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={goToNext}
          disabled={isLastCard}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Helper Text */}
      <p className="text-center text-xs text-muted-foreground">
        💡 Tip: Drag cards left or right to swipe on desktop!
      </p>
    </div>
  );
};

export default CompanyTinderGame;
