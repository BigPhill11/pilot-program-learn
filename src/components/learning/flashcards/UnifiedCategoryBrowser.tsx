/**
 * UnifiedCategoryBrowser - Browse flashcard categories from unified source
 * 
 * Features:
 * - Categories pulled from unified flashcard data
 * - Filter by source (Personal Finance, Careers, Market Intel)
 * - Filter by difficulty
 * - Mobile-friendly grid layout
 */

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getAllUnifiedFlashcards, 
  getFlashcardsBySource, 
  getFlashcardsByDifficulty,
  getFlashcardsByCategory,
  getFlashcardCategories,
  UnifiedFlashcard 
} from '@/data/unified-flashcards';
import { useIsMobile } from '@/hooks/use-mobile';
import { BookOpen, Briefcase, TrendingUp, Filter } from 'lucide-react';

interface UnifiedCategoryBrowserProps {
  onSelectCards: (cards: UnifiedFlashcard[], title: string) => void;
}

type SourceFilter = 'all' | 'personal-finance' | 'careers' | 'market-intelligence';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

const UnifiedCategoryBrowser: React.FC<UnifiedCategoryBrowserProps> = ({ onSelectCards }) => {
  const isMobile = useIsMobile();
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');

  const categories = useMemo(() => {
    let cards = getAllUnifiedFlashcards();
    
    // Apply source filter
    if (sourceFilter !== 'all') {
      cards = cards.filter(c => c.sourceModule === sourceFilter);
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      cards = cards.filter(c => c.difficulty === difficultyFilter);
    }
    
    // Group by category
    const categoryMap = new Map<string, { cards: UnifiedFlashcard[], icon: string }>();
    cards.forEach(card => {
      const existing = categoryMap.get(card.category);
      if (existing) {
        existing.cards.push(card);
      } else {
        categoryMap.set(card.category, { cards: [card], icon: card.icon });
      }
    });
    
    return Array.from(categoryMap.entries()).map(([title, { cards, icon }]) => ({
      title,
      icon,
      cards,
      cardCount: cards.length,
    }));
  }, [sourceFilter, difficultyFilter]);

  const totalCards = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.cardCount, 0);
  }, [categories]);

  const handleSelectCategory = (category: typeof categories[0]) => {
    onSelectCards(category.cards, category.title);
  };

  const handleStudyAll = () => {
    const allCards = categories.flatMap(c => c.cards);
    const filterName = sourceFilter === 'all' ? 'All Cards' : 
      sourceFilter === 'personal-finance' ? 'Personal Finance' :
      sourceFilter === 'careers' ? 'Careers in Finance' : 'Market Intelligence';
    onSelectCards(allCards, filterName);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500 text-white';
      case 'intermediate': return 'bg-yellow-500 text-white';
      case 'advanced': return 'bg-red-500 text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Source Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter by Source
        </h3>
        <Tabs value={sourceFilter} onValueChange={(v) => setSourceFilter(v as SourceFilter)}>
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-1`}>
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All
            </TabsTrigger>
            <TabsTrigger value="personal-finance" className="text-xs sm:text-sm gap-1">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Finance' : 'Personal Finance'}
            </TabsTrigger>
            <TabsTrigger value="careers" className="text-xs sm:text-sm gap-1">
              <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
              Careers
            </TabsTrigger>
            <TabsTrigger value="market-intelligence" className="text-xs sm:text-sm gap-1">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Markets' : 'Market Intel'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Difficulty Filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Difficulty:</span>
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
          <Badge
            key={diff}
            variant={difficultyFilter === diff ? 'default' : 'outline'}
            className={`cursor-pointer transition-all ${
              difficultyFilter === diff 
                ? diff === 'beginner' ? 'bg-green-500' 
                  : diff === 'intermediate' ? 'bg-yellow-500' 
                  : diff === 'advanced' ? 'bg-red-500' 
                  : '' 
                : 'hover:bg-muted'
            }`}
            onClick={() => setDifficultyFilter(diff)}
          >
            {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
          </Badge>
        ))}
      </div>

      {/* Study All Button */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Study All ({totalCards} cards)</h3>
            <p className="text-sm text-muted-foreground">
              Review all cards matching your filters
            </p>
          </div>
          <Button onClick={handleStudyAll} disabled={totalCards === 0}>
            Start
          </Button>
        </CardContent>
      </Card>

      {/* Category Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {categories.map((category) => (
          <Card 
            key={category.title}
            className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group"
            onClick={() => handleSelectCategory(category)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {category.cardCount} cards
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1 mt-2">
                {/* Show difficulty distribution */}
                {['beginner', 'intermediate', 'advanced'].map(diff => {
                  const count = category.cards.filter(c => c.difficulty === diff).length;
                  if (count === 0) return null;
                  return (
                    <Badge 
                      key={diff} 
                      className={`text-[10px] ${getDifficultyColor(diff)}`}
                    >
                      {count} {diff.charAt(0).toUpperCase()}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No flashcards match your current filters.</p>
          <Button variant="link" onClick={() => {
            setSourceFilter('all');
            setDifficultyFilter('all');
          }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default UnifiedCategoryBrowser;
