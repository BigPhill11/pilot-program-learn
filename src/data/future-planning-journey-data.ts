
export interface FuturePlanningFlashcard {
  term: string;
  definition: string;
}

export interface FuturePlanningDragDropActivity {
  title: string;
  description: string;
  items: Array<{
    id: string;
    content: string;
    category: string;
  }>;
  categories: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export interface FuturePlanningLevel {
  id: number;
  title: string;
  description: string;
  flashcards: FuturePlanningFlashcard[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  activity?: FuturePlanningDragDropActivity;
}

export interface FuturePlanningMiniGame {
  title: string;
  description: string;
  scenarios: Array<{
    id: string;
    title: string;
    description: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

export const futurePlanningJourneyData: FuturePlanningLevel[] = [
  {
    id: 1,
    title: "Emergency Funds",
    description: "Build your financial safety net for unexpected expenses",
    flashcards: [
      {
        term: "Emergency Fund",
        definition: "Money saved specifically for unexpected expenses or income loss"
      },
      {
        term: "Liquid Savings",
        definition: "Money that can be easily accessed without penalties"
      },
      {
        term: "3-6 Month Rule",
        definition: "Recommended emergency fund size covering 3-6 months of expenses"
      }
    ],
    quiz: {
      question: "How much should you typically have in an emergency fund?",
      options: [
        "1-2 months of expenses",
        "3-6 months of expenses", 
        "12 months of expenses",
        "Whatever you can afford"
      ],
      correctAnswer: 1,
      explanation: "Financial experts recommend saving 3-6 months of living expenses for emergencies."
    }
  },
  {
    id: 2,
    title: "Retirement Planning",
    description: "Start planning for your financial future",
    flashcards: [
      {
        term: "401(k)",
        definition: "Employer-sponsored retirement savings plan with tax advantages"
      },
      {
        term: "Compound Interest",
        definition: "Interest earned on both principal and previously earned interest"
      },
      {
        term: "Employer Match",
        definition: "Money your employer contributes to your retirement plan"
      }
    ],
    quiz: {
      question: "What's the main advantage of starting retirement savings early?",
      options: [
        "You'll have more money to invest",
        "Compound interest has more time to work",
        "Retirement plans are cheaper when you're young",
        "You can retire earlier"
      ],
      correctAnswer: 1,
      explanation: "Starting early gives compound interest more time to grow your investments exponentially."
    },
    activity: {
      title: "Retirement Planning Priorities",
      description: "Organize these retirement planning steps in order of priority:",
      items: [
        { id: "emergency", content: "Build emergency fund", category: "first" },
        { id: "match", content: "Get full employer 401(k) match", category: "second" },
        { id: "debt", content: "Pay off high-interest debt", category: "first" },
        { id: "ira", content: "Max out IRA contributions", category: "third" }
      ],
      categories: [
        { id: "first", title: "First Priority", description: "Do these before retirement investing" },
        { id: "second", title: "Second Priority", description: "Free money from employer" },
        { id: "third", title: "Third Priority", description: "Additional retirement savings" }
      ]
    }
  },
  {
    id: 3,
    title: "Investment Basics",
    description: "Learn the fundamentals of growing your money",
    flashcards: [
      {
        term: "Stock",
        definition: "A share of ownership in a company"
      },
      {
        term: "Bond",
        definition: "A loan you give to a government or corporation"
      },
      {
        term: "Diversification",
        definition: "Spreading investments across different types of assets"
      },
      {
        term: "Risk Tolerance",
        definition: "Your comfort level with investment ups and downs"
      }
    ],
    quiz: {
      question: "What is diversification in investing?",
      options: [
        "Putting all money in one stock",
        "Only investing in bonds",
        "Spreading money across different investments",
        "Avoiding the stock market entirely"
      ],
      correctAnswer: 2,
      explanation: "Diversification means spreading your investments across different assets to reduce risk."
    }
  },
  {
    id: 4,
    title: "Insurance Planning",
    description: "Protect your financial future with proper insurance",
    flashcards: [
      {
        term: "Life Insurance",
        definition: "Coverage that pays beneficiaries when the insured person dies"
      },
      {
        term: "Health Insurance",
        definition: "Coverage for medical expenses and healthcare costs"
      },
      {
        term: "Disability Insurance",
        definition: "Income replacement if you can't work due to illness or injury"
      },
      {
        term: "Deductible",
        definition: "Amount you pay out-of-pocket before insurance coverage begins"
      }
    ],
    quiz: {
      question: "Which type of insurance is most important for young, healthy adults?",
      options: [
        "Life insurance",
        "Health insurance",
        "Disability insurance", 
        "Travel insurance"
      ],
      correctAnswer: 1,
      explanation: "Health insurance is crucial because medical costs can be financially devastating even for young, healthy people."
    }
  },
  {
    id: 5,
    title: "Estate Planning Basics",
    description: "Plan for the transfer of your assets",
    flashcards: [
      {
        term: "Will",
        definition: "Legal document specifying how your assets should be distributed"
      },
      {
        term: "Beneficiary",
        definition: "Person designated to receive assets from an account or policy"
      },
      {
        term: "Power of Attorney",
        definition: "Legal authority to make decisions on someone else's behalf"
      },
      {
        term: "Trust",
        definition: "Legal arrangement where assets are held for another person's benefit"
      }
    ],
    quiz: {
      question: "What happens if you die without a will?",
      options: [
        "Your assets go to the government",
        "Your family automatically inherits everything",
        "State laws determine how assets are distributed",
        "Your debts are forgiven"
      ],
      correctAnswer: 2,
      explanation: "Without a will, state intestacy laws determine how your assets are distributed, which may not match your wishes."
    }
  }
];

export const futurePlanningMiniGame: FuturePlanningMiniGame = {
  title: "Life Planning Simulator",
  description: "Navigate major life decisions and their financial implications",
  scenarios: [
    {
      id: "scenario1",
      title: "First Job Decision",
      description: "You're choosing between two job offers",
      question: "Company A offers $50k with great benefits. Company B offers $55k with basic benefits. Which is better long-term?",
      options: [
        "Company A - benefits matter more than salary",
        "Company B - higher salary is always better",
        "Negotiate with both companies",
        "Consider total compensation, not just salary"
      ],
      correctAnswer: 3,
      explanation: "Total compensation includes salary, benefits, retirement matching, and growth potential - not just the base salary number."
    }
  ]
};
