
import { 
  Building, 
  Brain, 
  TrendingUp, 
  Globe
} from 'lucide-react';
import { Adventure } from '@/types/adventure';

export const adventures: Adventure[] = [
  {
    id: 'bamboo-business',
    title: 'Phil\'s Bamboo Business Empire',
    description: 'Join Phil as he learns to evaluate different bamboo forests (companies) by examining their soil quality (assets), water sources (cash flow), and growth potential.',
    icon: Building,
    difficulty: 'beginner',
    estimatedTime: '15-20 min',
    chapters: 5,
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    category: 'company-analysis'
  },
  {
    id: 'forest-sentiment',
    title: 'The Great Bamboo Forest Mood Swings',
    description: 'Discover how the emotions of all the pandas in the forest affect bamboo prices, and learn to read the mood of the market through Phil\'s adventures.',
    icon: Brain,
    difficulty: 'beginner',
    estimatedTime: '12-15 min',
    chapters: 4,
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    category: 'market-psychology'
  },
  {
    id: 'weather-forecasting',
    title: 'Phil\'s Weather Prediction Academy',
    description: 'Learn how Phil predicts bamboo seasons by reading weather patterns, soil conditions, and growth cycles - just like forecasting market trends!',
    icon: TrendingUp,
    difficulty: 'intermediate',
    estimatedTime: '18-25 min',
    chapters: 6,
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    category: 'forecasting'
  },
  {
    id: 'panda-economics',
    title: 'The Great Panda Valley Economy',
    description: 'Explore how the entire Panda Valley economy works - from bamboo supply chains to panda employment, interest rates, and inflation through Phil\'s eyes.',
    icon: Globe,
    difficulty: 'advanced',
    estimatedTime: '25-30 min',
    chapters: 7,
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    category: 'economics'
  }
];
