
import React from 'react';

export type CreditLevelStep = 'intro' | 'flashcards' | 'quiz' | 'activity' | 'scenario' | 'complete';

interface CreditLevelStepsProps {
  currentStep: CreditLevelStep;
  hasActivity: boolean;
  hasScenario: boolean;
  canProceed: boolean;
  onNext: () => void;
}

export const useCreditLevelSteps = (hasActivity: boolean, hasScenario: boolean) => {
  const getNextStep = (currentStep: CreditLevelStep): CreditLevelStep => {
    switch (currentStep) {
      case 'intro': return 'flashcards';
      case 'flashcards': return 'quiz';
      case 'quiz': return hasActivity ? 'activity' : (hasScenario ? 'scenario' : 'complete');
      case 'activity': return hasScenario ? 'scenario' : 'complete';
      case 'scenario': return 'complete';
      default: return 'complete';
    }
  };

  const getStepTitle = (step: CreditLevelStep): string => {
    switch (step) {
      case 'intro': return 'Introduction';
      case 'flashcards': return 'Learn Key Terms';
      case 'quiz': return 'Knowledge Check';
      case 'activity': return 'Interactive Activity';
      case 'scenario': return 'Real-World Scenario';
      case 'complete': return 'Complete';
      default: return '';
    }
  };

  return { getNextStep, getStepTitle };
};
