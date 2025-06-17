
import React from 'react';
import { BudgetLevel } from '@/data/budgeting-journey-data';

export type BudgetLevelStep = 'intro' | 'flashcards' | 'quiz' | 'activity' | 'challenge';

export const useBudgetLevelSteps = (level: BudgetLevel) => {
  const getSteps = (): BudgetLevelStep[] => {
    return [
      'intro',
      'flashcards',
      'quiz',
      ...(level.activity ? ['activity' as BudgetLevelStep] : []),
      'challenge'
    ];
  };

  const getStepTitle = (step: BudgetLevelStep): string => {
    switch (step) {
      case 'intro': return 'Introduction';
      case 'flashcards': return 'Learn Key Terms';
      case 'quiz': return 'Knowledge Check';
      case 'activity': return 'Interactive Activity';
      case 'challenge': return 'Real-World Challenge';
      default: return '';
    }
  };

  return { getSteps, getStepTitle };
};
