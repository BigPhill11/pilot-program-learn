
export interface BudgetLevel {
  id: number;
  title: string;
  description: string;
  introCard: string;
  flashcards: Array<{
    term: string;
    definition: string;
  }>;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  activity?: {
    title: string;
    instruction: string;
    items: Array<{
      id: string;
      text: string;
    }>;
    categories: Array<{
      id: string;
      title: string;
      correctItems: string[];
    }>;
  };
  challenge: {
    description: string;
    question: string;
    options?: string[];
    correctAnswer?: number;
    scenario?: string;
  };
}

export interface BudgetMiniGame {
  title: string;
  description: string;
  scenario: string;
  monthlyIncome: number;
  categories: Array<{
    id: string;
    name: string;
    recommended: number;
    min: number;
    max: number;
  }>;
}

export const budgetJourneyData: BudgetLevel[] = [
  {
    id: 1,
    title: "Needs vs Wants",
    description: "Learn to distinguish between essential expenses and optional purchases",
    introCard: "Welcome to your budgeting journey! In this level, you'll master the fundamental skill of separating needs from wants - the foundation of all good budgeting decisions.",
    flashcards: [
      {
        term: "Needs",
        definition: "Essential expenses required for basic living - like housing, food, transportation, and healthcare."
      },
      {
        term: "Wants",
        definition: "Non-essential items that improve your lifestyle but aren't required for survival - like entertainment, dining out, or luxury items."
      },
      {
        term: "Fixed Expenses",
        definition: "Regular costs that stay the same each month, like rent, insurance, or subscription services."
      },
      {
        term: "Variable Expenses",
        definition: "Costs that change monthly, like groceries, gas, or entertainment spending."
      }
    ],
    quiz: {
      question: "Which of these is considered a 'need' rather than a 'want'?",
      options: ["Netflix subscription", "Grocery shopping", "Designer clothes", "Video games"],
      correctAnswer: 1,
      explanation: "Grocery shopping is a need because food is essential for survival, while the others are wants that enhance lifestyle."
    },
    activity: {
      title: "Categorize Your Expenses",
      instruction: "Sort these common expenses into needs and wants:",
      items: [
        { id: "rent", text: "Monthly rent payment" },
        { id: "coffee", text: "Daily coffee shop visits" },
        { id: "insurance", text: "Health insurance" },
        { id: "streaming", text: "Multiple streaming services" },
        { id: "groceries", text: "Basic groceries" },
        { id: "concert", text: "Concert tickets" }
      ],
      categories: [
        { id: "needs", title: "Needs", correctItems: ["rent", "insurance", "groceries"] },
        { id: "wants", title: "Wants", correctItems: ["coffee", "streaming", "concert"] }
      ]
    },
    challenge: {
      description: "You have $2,000 monthly income. Your rent is $800, groceries $300, insurance $150. You want to save $200. How much is left for wants?",
      question: "How much money is available for wants after covering needs and savings?",
      options: ["$550", "$450", "$650", "$350"],
      correctAnswer: 0
    }
  },
  {
    id: 2,
    title: "The 50/30/20 Rule",
    description: "Master the popular budgeting framework that allocates income into three key categories",
    introCard: "The 50/30/20 rule is a simple but powerful budgeting method: 50% for needs, 30% for wants, and 20% for savings and debt payments.",
    flashcards: [
      {
        term: "50/30/20 Rule",
        definition: "A budgeting guideline where 50% goes to needs, 30% to wants, and 20% to savings and debt repayment."
      },
      {
        term: "Take-Home Pay",
        definition: "Your actual income after taxes and deductions - the amount that goes into your bank account."
      },
      {
        term: "Emergency Fund",
        definition: "Money saved specifically for unexpected expenses, typically 3-6 months of living expenses."
      },
      {
        term: "Debt Repayment",
        definition: "Money allocated to paying off credit cards, student loans, or other debts beyond minimum payments."
      }
    ],
    quiz: {
      question: "If your monthly take-home pay is $3,000, how much should you allocate to wants using the 50/30/20 rule?",
      options: ["$900", "$1,500", "$600", "$1,000"],
      correctAnswer: 0,
      explanation: "30% of $3,000 = $900 for wants according to the 50/30/20 rule."
    },
    challenge: {
      description: "Your friend makes $2,500 monthly after taxes and asks for budgeting help using the 50/30/20 rule.",
      question: "How much should they save each month?",
      options: ["$500", "$750", "$250", "$1,000"],
      correctAnswer: 0
    }
  },
  {
    id: 3,
    title: "Tracking Your Spending",
    description: "Learn effective methods to monitor where your money goes each month",
    introCard: "You can't manage what you don't measure! This level teaches you practical ways to track spending and identify areas for improvement.",
    flashcards: [
      {
        term: "Expense Tracking",
        definition: "Recording and categorizing all your purchases to understand spending patterns and find areas to cut back."
      },
      {
        term: "Budget Categories",
        definition: "Groups of similar expenses like housing, transportation, food, and entertainment to organize your spending."
      },
      {
        term: "Impulse Purchase",
        definition: "Unplanned buying decisions made in the moment, often for wants rather than needs."
      },
      {
        term: "Spending Trigger",
        definition: "Emotions, situations, or events that lead to increased or unplanned spending."
      }
    ],
    quiz: {
      question: "What's the main benefit of tracking your expenses for at least one month?",
      options: [
        "To impress your friends",
        "To identify spending patterns and areas to improve",
        "To make budgeting more complicated",
        "To spend more money"
      ],
      correctAnswer: 1,
      explanation: "Tracking expenses reveals your actual spending habits and helps identify where you can make positive changes."
    },
    challenge: {
      description: "You notice you spent $180 on coffee last month - $6 per day for 30 days.",
      question: "If you made coffee at home for $1 per day instead, how much would you save monthly?",
      options: ["$150", "$120", "$180", "$30"],
      correctAnswer: 0
    }
  },
  {
    id: 4,
    title: "Budgeting for Goals",
    description: "Learn how to allocate money toward specific financial objectives",
    introCard: "Great budgets aren't just about managing expenses - they're about achieving your dreams! Learn to budget for both short-term and long-term goals.",
    flashcards: [
      {
        term: "Financial Goal",
        definition: "A specific amount of money you want to save or achieve by a certain date, like $1,000 for a vacation."
      },
      {
        term: "Short-term Goal",
        definition: "Financial objectives you can achieve within a year, like saving for a phone or building a small emergency fund."
      },
      {
        term: "Long-term Goal",
        definition: "Financial objectives that take more than a year, like saving for college, a car, or retirement."
      },
      {
        term: "Sinking Fund",
        definition: "Money saved gradually for a specific future expense, like car maintenance or holiday gifts."
      }
    ],
    quiz: {
      question: "You want to save $1,200 for a laptop in 8 months. How much should you save monthly?",
      options: ["$100", "$150", "$200", "$120"],
      correctAnswer: 1,
      explanation: "$1,200 ÷ 8 months = $150 per month needed to reach your goal."
    },
    challenge: {
      description: "You're planning for three goals: $500 emergency fund (6 months), $300 phone (3 months), and $2,400 car down payment (12 months).",
      question: "What's your total monthly savings needed for all goals?",
      options: ["$383", "$350", "$400", "$450"],
      correctAnswer: 0
    }
  },
  {
    id: 5,
    title: "Adjusting Your Budget",
    description: "Master the art of adapting your budget when life changes",
    introCard: "Budgets aren't set in stone! Life changes, and your budget should adapt. Learn how to modify your spending plan when circumstances change.",
    flashcards: [
      {
        term: "Budget Variance",
        definition: "The difference between what you planned to spend and what you actually spent in each category."
      },
      {
        term: "Flexible Budgeting",
        definition: "Adjusting spending categories based on changing circumstances while maintaining overall financial goals."
      },
      {
        term: "Budget Review",
        definition: "Regularly examining your budget to see what's working and what needs adjustment."
      },
      {
        term: "Zero-Based Budget",
        definition: "A budgeting method where income minus expenses equals zero - every dollar has a specific purpose."
      }
    ],
    quiz: {
      question: "What should you do if you consistently overspend in your grocery category?",
      options: [
        "Ignore it and hope it gets better",
        "Increase the grocery budget and decrease another category",
        "Stop eating to save money",
        "Give up on budgeting entirely"
      ],
      correctAnswer: 1,
      explanation: "Adjust your budget realistically by increasing the grocery allocation and reducing spending in another category to stay balanced."
    },
    challenge: {
      description: "Your car broke down and needs $400 in repairs. Your current budget has $50 for car maintenance.",
      question: "What's the best strategy to handle this unexpected expense?",
      options: [
        "Use emergency fund and adjust next month's budget",
        "Ignore the problem",
        "Borrow money from friends",
        "Buy a new car instead"
      ],
      correctAnswer: 0
    }
  }
];

export const budgetMiniGame: BudgetMiniGame = {
  title: "Budget Builder Challenge",
  description: "Create a balanced budget using the 50/30/20 rule!",
  scenario: "You're a college student with $2,000 monthly income from part-time work and family support. Build a realistic budget:",
  monthlyIncome: 2000,
  categories: [
    { id: "housing", name: "Housing & Utilities", recommended: 35, min: 25, max: 45 },
    { id: "food", name: "Food & Groceries", recommended: 15, min: 10, max: 25 },
    { id: "transportation", name: "Transportation", recommended: 10, min: 5, max: 20 },
    { id: "entertainment", name: "Entertainment", recommended: 15, min: 5, max: 25 },
    { id: "savings", name: "Savings", recommended: 20, min: 10, max: 30 },
    { id: "other", name: "Other Expenses", recommended: 5, min: 0, max: 15 }
  ]
};
