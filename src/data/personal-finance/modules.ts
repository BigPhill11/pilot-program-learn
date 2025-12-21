// Personal Finance Module Registry
import { PersonalFinanceModule } from '@/types/personal-finance';
import { activeIncomeBasicsLesson } from './income/lesson-1-active-income';
import { lesson2ControllingPay } from './lessons/lesson-2-controlling-pay';
import { lesson3Negotiation } from './lessons/lesson-3-negotiation';
import { lesson4EnergyBurnout } from './lessons/lesson-4-energy-burnout';
import { lesson5Launchpad } from './lessons/lesson-5-launchpad';

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
    id: 'saving',
    name: 'Saving',
    pillar: 'Foundation',
    icon: '🏦',
    description: 'Learn strategies to keep more of what you earn and build your financial cushion.',
    level: 'beginner',
    unlockRequirements: {
      previousModuleId: 'income',
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'budgeting',
    name: 'Budgeting',
    pillar: 'Foundation',
    icon: '📊',
    description: 'Create and maintain a budget that aligns with your goals and lifestyle.',
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
      previousModuleId: 'budgeting',
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
    id: 'investing',
    name: 'Investing',
    pillar: 'Growth',
    icon: '📈',
    description: 'Grow your wealth through smart investment strategies and compound growth.',
    level: 'advanced',
    unlockRequirements: {
      previousModuleId: 'insurance',
      orTestOutScore: 85,
    },
    xpReward: 750,
    coinReward: 75,
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
  {
    id: 'financial-planning',
    name: 'Financial Planning',
    pillar: 'Mastery',
    icon: '🎯',
    description: 'Create a comprehensive plan for long-term financial success and freedom.',
    level: 'advanced',
    unlockRequirements: {
      previousModuleId: 'taxes',
      orTestOutScore: 85,
    },
    xpReward: 1000,
    coinReward: 100,
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
    // 15 questions for test-out assessment
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
    {
      question: 'Overtime is best described as:',
      options: [
        'A long-term income strategy',
        'A way to increase hourly wage',
        'Short-term income boost requiring extra time',
        'Passive income generation',
      ],
      correctIndex: 2,
    },
    {
      question: 'Which metaphor best describes hourly wage?',
      options: [
        'The size of your gas tank',
        'How far one pedal stroke moves you',
        'The speed of your engine',
        'The number of wheels on your vehicle',
      ],
      correctIndex: 1,
    },
    {
      question: 'Schedule constraints affect income by:',
      options: [
        'Increasing your hourly rate',
        'Limiting when and how long you can work',
        'Improving work-life balance',
        'Reducing tax obligations',
      ],
      correctIndex: 1,
    },
    {
      question: 'The main advantage of focusing on skill improvement over hours is:',
      options: [
        'Less stress at work',
        'More vacation time',
        'Higher pay without more time spent',
        'Better relationships with coworkers',
      ],
      correctIndex: 2,
    },
    {
      question: 'Active income is like pedaling a bike because:',
      options: [
        'It gets easier over time',
        'You can coast indefinitely',
        'It requires continuous effort to maintain',
        'The terrain doesn\'t matter',
      ],
      correctIndex: 2,
    },
    {
      question: 'What is the primary risk of relying solely on active income?',
      options: [
        'Too much money saved',
        'Income stops when work stops',
        'Skills become outdated',
        'Too many job opportunities',
      ],
      correctIndex: 1,
    },
    {
      question: 'Which action would NOT increase active income?',
      options: [
        'Learning a new skill',
        'Working additional hours',
        'Putting money in a savings account',
        'Negotiating a higher wage',
      ],
      correctIndex: 2,
    },
    {
      question: 'The two main levers of active income are:',
      options: [
        'Location and timing',
        'Hours worked and hourly wage',
        'Education and networking',
        'Experience and references',
      ],
      correctIndex: 1,
    },
    {
      question: 'Why do most people initially try to increase income by adding hours?',
      options: [
        'It requires less planning',
        'It feels straightforward',
        'It\'s more effective long-term',
        'Skills don\'t affect income',
      ],
      correctIndex: 1,
    },
    {
      question: 'Active income should be viewed as:',
      options: [
        'The only income source needed',
        'A trap to avoid',
        'A foundation and launch point for wealth',
        'Irrelevant to financial success',
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
  // Add other modules as they're built
  return undefined;
};
