// Personal Finance Module Registry
import { PersonalFinanceModule } from '@/types/personal-finance';
import { activeIncomeBasicsLesson } from './income/lesson-1-active-income';
import { lesson2ControllingPay } from './lessons/lesson-2-controlling-pay';
import { lesson3Negotiation } from './lessons/lesson-3-negotiation';
import { lesson4EnergyBurnout } from './lessons/lesson-4-energy-burnout';
import { lesson5Launchpad } from './lessons/lesson-5-launchpad';
import { 
  lesson1DirectionBeforeSpeed,
  lesson2TimeHorizons,
  lesson3WantsNeedsTargets,
  lesson4PriorityStacking,
  lesson5ProgressMeasurement 
} from './financial-planning';
import {
  lesson1WhySavingComesBeforeSpending,
  lesson2EmergencyFundsAndTargets,
  lesson3AutomatingAndMaintainingSavings,
  lesson4SavingTradeoffsAndOpportunityCost,
  lesson5WhenToIncreaseSavings
} from './saving';
import {
  lesson1OwnershipTimeConsistency,
  lesson2WhatYouBuyWhenInvesting,
  lesson3RiskVolatilityPriceMovement,
  lesson4DiversificationRiskControl,
  lesson5LongTermStrategy
} from './investing';

// Module definitions with metadata
export const PERSONAL_FINANCE_MODULES: Omit<PersonalFinanceModule, 'lessons' | 'testOutQuestions'>[] = [
  {
    id: 'income',
    name: 'Income',
    pillar: 'Foundation',
    icon: '💰',
    description: 'Master the fundamentals of earning money through active and passive income streams.',
    level: 'beginner',
    unlockRequirements: {
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'financial-planning',
    name: 'Financial Planning',
    pillar: 'Foundation',
    icon: '🎯',
    description: 'Set clear financial goals and learn to measure progress without comparison.',
    level: 'beginner',
    unlockRequirements: {
      previousModuleId: 'income',
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'saving',
    name: 'Saving',
    pillar: 'Foundation',
    icon: '🏦',
    description: 'Learn strategies to keep more of what you earn and build your financial cushion.',
    level: 'beginner',
    unlockRequirements: {
      previousModuleId: 'financial-planning',
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'investing',
    name: 'Investing',
    pillar: 'Foundation',
    icon: '📈',
    description: 'Grow your wealth through smart investment strategies and compound growth.',
    level: 'beginner',
    unlockRequirements: {
      previousModuleId: 'saving',
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'debt',
    name: 'Debt',
    pillar: 'Protection',
    icon: '⚖️',
    description: 'Understand different types of debt and strategies to manage or eliminate it.',
    level: 'intermediate',
    unlockRequirements: {
      previousModuleId: 'investing',
      orTestOutScore: 85,
    },
    xpReward: 600,
    coinReward: 60,
  },
  {
    id: 'credit',
    name: 'Credit',
    pillar: 'Protection',
    icon: '💳',
    description: 'Build and maintain excellent credit to unlock financial opportunities.',
    level: 'intermediate',
    unlockRequirements: {
      previousModuleId: 'debt',
      orTestOutScore: 85,
    },
    xpReward: 600,
    coinReward: 60,
  },
  {
    id: 'insurance',
    name: 'Insurance',
    pillar: 'Protection',
    icon: '🛡️',
    description: 'Protect yourself and your assets from unexpected financial setbacks.',
    level: 'intermediate',
    unlockRequirements: {
      previousModuleId: 'credit',
      orTestOutScore: 85,
    },
    xpReward: 600,
    coinReward: 60,
  },
  {
    id: 'taxes',
    name: 'Taxes',
    pillar: 'Growth',
    icon: '📋',
    description: 'Navigate the tax system and optimize your financial decisions.',
    level: 'advanced',
    unlockRequirements: {
      previousModuleId: 'investing',
      orTestOutScore: 85,
    },
    xpReward: 750,
    coinReward: 75,
  },
];

// Full module with lessons (Income module)
export const incomeModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[0],
  lessons: [
    activeIncomeBasicsLesson,
    lesson2ControllingPay,
    lesson3Negotiation,
    lesson4EnergyBurnout,
    lesson5Launchpad,
  ],
  testOutQuestions: [
    {
      question: 'What is active income?',
      options: [
        'Money earned from investments',
        'Money earned by trading time and effort for pay',
        'Money earned from rental properties',
        'Money earned from dividends',
      ],
      correctIndex: 1,
    },
    {
      question: 'Which factor most directly increases hourly income without adding hours?',
      options: [
        'Working overtime',
        'Taking more shifts',
        'Improving valuable skills',
        'Working weekends',
      ],
      correctIndex: 2,
    },
    {
      question: 'What limits active income growth the fastest?',
      options: [
        'Skill development',
        'Available time and energy',
        'Job availability',
        'Education level',
      ],
      correctIndex: 1,
    },
    {
      question: 'A skill premium is earned when you:',
      options: [
        'Work more hours than others',
        'Have more experience in years',
        'Solve harder or more valuable problems',
        'Take on more responsibilities',
      ],
      correctIndex: 2,
    },
    {
      question: 'What happens to active income when you stop working?',
      options: [
        'It continues at a reduced rate',
        'It stops completely',
        'It grows through interest',
        'It remains stable',
      ],
      correctIndex: 1,
    },
  ],
};

// Full module with lessons (Financial Planning module)
export const financialPlanningModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[1],
  lessons: [
    lesson1DirectionBeforeSpeed,
    lesson2TimeHorizons,
    lesson3WantsNeedsTargets,
    lesson4PriorityStacking,
    lesson5ProgressMeasurement,
  ],
  testOutQuestions: [
    {
      question: 'Why do clear goals reduce stress?',
      options: [
        'They increase income',
        'They remove unnecessary choices',
        'They guarantee success',
        'They increase motivation',
      ],
      correctIndex: 1,
    },
    {
      question: 'What is a time horizon?',
      options: [
        'How much time you have to work',
        'The length of time before a goal needs to be achieved',
        'Your daily schedule',
        'The time it takes to earn money',
      ],
      correctIndex: 1,
    },
    {
      question: 'Wants differ from needs because:',
      options: [
        'Wants cost more money',
        'Wants are non-essential but improve comfort',
        'Needs are always expensive',
        'Wants are bad and should be avoided',
      ],
      correctIndex: 1,
    },
    {
      question: 'Priority stacking helps because:',
      options: [
        'It lets you achieve all goals at once',
        'It focuses resources on one goal at a time',
        'It removes the need for goals',
        'It increases your income automatically',
      ],
      correctIndex: 1,
    },
    {
      question: 'The comparison trap occurs when:',
      options: [
        'You compare prices before buying',
        'You evaluate progress using others\' outcomes',
        'You track your own goals',
        'You measure alignment scores',
      ],
      correctIndex: 1,
    },
    {
      question: 'Opportunity cost refers to:',
      options: [
        'The price of an item',
        'The best alternative given up when deciding',
        'Taxes you pay',
        'Interest on savings',
      ],
      correctIndex: 1,
    },
    {
      question: 'Alignment measures:',
      options: [
        'How much you earn',
        'How fast you save',
        'How well actions match goals',
        'How others are doing',
      ],
      correctIndex: 2,
    },
    {
      question: 'Short-term goals usually require:',
      options: [
        'Maximum growth potential',
        'High risk investments',
        'Accessibility and stability',
        'Long holding periods',
      ],
      correctIndex: 2,
    },
    {
      question: 'Goal dilution happens when:',
      options: [
        'Goals become clearer',
        'Resources are spread too thin across goals',
        'You focus on one goal',
        'You complete a goal',
      ],
      correctIndex: 1,
    },
    {
      question: 'Intentional spending means:',
      options: [
        'Spending as little as possible',
        'Never buying wants',
        'Assigning money a purpose before spending',
        'Only buying needs',
      ],
      correctIndex: 2,
    },
  ],
};

// Full module with lessons (Saving module)
export const savingModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[2],
  lessons: [
    lesson1WhySavingComesBeforeSpending,
    lesson2EmergencyFundsAndTargets,
    lesson3AutomatingAndMaintainingSavings,
    lesson4SavingTradeoffsAndOpportunityCost,
    lesson5WhenToIncreaseSavings,
  ],
  testOutQuestions: [
    {
      question: 'Saving usually fails because:',
      options: [
        'Income is too low',
        'Saving waits until the end',
        'Banks limit access',
        'Investing comes first',
      ],
      correctIndex: 1,
    },
    {
      question: 'Paying yourself first means:',
      options: [
        'Saving after bills',
        'Saving when stressed',
        'Saving monthly',
        'Saving immediately when paid',
      ],
      correctIndex: 3,
    },
    {
      question: 'The main purpose of an emergency fund is to:',
      options: [
        'Earn interest',
        'Cover planned expenses',
        'Prevent bad decisions during disruptions',
        'Replace investing',
      ],
      correctIndex: 2,
    },
    {
      question: 'Why is a starter emergency fund useful?',
      options: [
        'It replaces full savings',
        'It stops small problems from escalating',
        'It earns higher returns',
        'It reduces taxes',
      ],
      correctIndex: 1,
    },
    {
      question: 'Automation helps saving because it:',
      options: [
        'Increases income',
        'Removes decision-making',
        'Raises interest rates',
        'Limits spending',
      ],
      correctIndex: 1,
    },
    {
      question: 'Friction is dangerous because it:',
      options: [
        'Slows growth slightly',
        'Makes saving harder to repeat',
        'Lowers returns',
        'Increases taxes',
      ],
      correctIndex: 1,
    },
    {
      question: 'Opportunity cost refers to:',
      options: [
        'Total price paid',
        'Future income',
        'The best alternative given up',
        'Interest earned',
      ],
      correctIndex: 2,
    },
    {
      question: 'Increasing savings works best when:',
      options: [
        'Income feels tight',
        'Emergencies are covered and cash flow is stable',
        'Motivation is high',
        'Expenses are rising',
      ],
      correctIndex: 1,
    },
    {
      question: 'A savings pause is:',
      options: [
        'A failure',
        'Permanent',
        'Strategic during instability',
        'Avoidable always',
      ],
      correctIndex: 2,
    },
    {
      question: 'Why are withdrawal cycles harmful?',
      options: [
        'They reduce interest',
        'They break consistency and confidence',
        'They increase taxes',
        'They lower income',
      ],
      correctIndex: 1,
    },
  ],
};

// Full module with lessons (Investing module)
export const investingModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[3],
  lessons: [
    lesson1OwnershipTimeConsistency,
    lesson2WhatYouBuyWhenInvesting,
    lesson3RiskVolatilityPriceMovement,
    lesson4DiversificationRiskControl,
    lesson5LongTermStrategy,
  ],
  testOutQuestions: [
    {
      question: 'Investing is best described as',
      options: [
        'Betting on prices',
        'Buying ownership in value creation',
        'Saving with risk',
        'Fast money',
      ],
      correctIndex: 1,
    },
    {
      question: 'A longer time horizon does what to risk?',
      options: [
        'Increases it',
        'Removes it',
        'Changes its shape',
        'Makes losses impossible',
      ],
      correctIndex: 2,
    },
    {
      question: 'Stock returns mainly come from',
      options: [
        'Headlines',
        'Trading speed',
        'Business performance',
        'Market timing',
      ],
      correctIndex: 2,
    },
    {
      question: 'Volatility refers to',
      options: [
        'Permanent loss',
        'Business failure',
        'Price movement',
        'Market collapse',
      ],
      correctIndex: 2,
    },
    {
      question: 'Diversification is best described as',
      options: [
        'Avoiding risk',
        'Spreading exposure',
        'Chasing stability',
        'Limiting growth',
      ],
      correctIndex: 1,
    },
    {
      question: 'The biggest cost of leaving the market is',
      options: [
        'Taxes',
        'Fees',
        'Missed growth periods',
        'Stress',
      ],
      correctIndex: 2,
    },
    {
      question: 'Consistency matters because',
      options: [
        'Markets reward effort',
        'Timing is easy',
        'Emotion hurts decisions',
        'Cash loses value instantly',
      ],
      correctIndex: 2,
    },
    {
      question: 'Risk control exists to',
      options: [
        'Increase returns',
        'Predict markets',
        'Avoid volatility',
        'Prevent ruin',
      ],
      correctIndex: 3,
    },
    {
      question: 'Long-term strategies should be',
      options: [
        'Complex',
        'Flexible daily',
        'Rule-based',
        'Reaction-driven',
      ],
      correctIndex: 2,
    },
    {
      question: 'Staying invested works because',
      options: [
        'Markets never fall',
        'Volatility disappears',
        'Time compounds growth',
        'Rules guarantee profits',
      ],
      correctIndex: 2,
    },
  ],
};

// Get all modules for display
export const getAllModules = () => PERSONAL_FINANCE_MODULES;

// Get full module by ID
export const getModuleById = (id: string): PersonalFinanceModule | undefined => {
  if (id === 'income') return incomeModule;
  if (id === 'financial-planning') return financialPlanningModule;
  if (id === 'saving') return savingModule;
  if (id === 'investing') return investingModule;
  return undefined;
};
