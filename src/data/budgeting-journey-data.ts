
export interface BudgetFlashcard {
  term: string;
  definition: string;
}

export interface BudgetDragDropActivity {
  instruction: string;
  items: Array<{
    id: string;
    text: string;
    category: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
  }>;
}

export interface BudgetLevel {
  id: number;
  title: string;
  description: string;
  introCard: string;
  flashcards: BudgetFlashcard[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  activity?: BudgetDragDropActivity;
  challenge: {
    description: string;
    question: string;
    options?: string[];
    correctAnswer: number;
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
    title: "Understanding Money Basics",
    description: "Learn the fundamental concepts of money management",
    introCard: "Welcome to budgeting! In this level, you'll learn the essential concepts that form the foundation of smart money management. We'll cover needs vs wants, income, and expenses.",
    flashcards: [
      {
        term: "Income",
        definition: "Money you receive from work, investments, or other sources"
      },
      {
        term: "Expenses",
        definition: "Money you spend on goods and services"
      },
      {
        term: "Needs",
        definition: "Essential items required for survival like food, shelter, and clothing"
      },
      {
        term: "Wants",
        definition: "Things you desire but aren't essential for survival"
      }
    ],
    quiz: {
      question: "Which of these is a 'need' rather than a 'want'?",
      options: ["Designer shoes", "Grocery bill", "Netflix subscription", "Video games"],
      correctAnswer: 1,
      explanation: "Grocery bills are for food, which is essential for survival. The other options are wants."
    },
    challenge: {
      description: "Time to apply what you've learned about needs vs wants!",
      question: "You have $100 left after paying for rent and groceries. Your car needs an oil change ($30), you want new headphones ($80), and you want to save some money. What's the best choice?",
      options: [
        "Buy the headphones - you deserve them!",
        "Get the oil change and save the rest",
        "Save all the money",
        "Split it evenly between wants and savings"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 2,
    title: "The 50/30/20 Rule",
    description: "Master the popular budgeting framework",
    introCard: "The 50/30/20 rule is a simple budgeting method: 50% for needs, 30% for wants, and 20% for savings and debt repayment. This creates a balanced approach to managing your money.",
    flashcards: [
      {
        term: "50/30/20 Rule",
        definition: "A budgeting guideline: 50% needs, 30% wants, 20% savings/debt"
      },
      {
        term: "Emergency Fund",
        definition: "Money saved specifically for unexpected expenses or income loss"
      },
      {
        term: "Fixed Expenses",
        definition: "Regular, unchanging costs like rent or insurance"
      },
      {
        term: "Variable Expenses",
        definition: "Costs that change month to month like groceries or entertainment"
      }
    ],
    quiz: {
      question: "If you earn $3,000 per month, how much should go to wants according to the 50/30/20 rule?",
      options: ["$600", "$900", "$1,000", "$1,500"],
      correctAnswer: 1,
      explanation: "30% of $3,000 = $900 for wants."
    },
    activity: {
      instruction: "Sort these expenses into the correct 50/30/20 categories:",
      items: [
        { id: "rent", text: "Monthly rent", category: "needs" },
        { id: "movies", text: "Movie tickets", category: "wants" },
        { id: "savings", text: "Emergency fund", category: "savings" },
        { id: "groceries", text: "Grocery shopping", category: "needs" }
      ],
      categories: [
        { id: "needs", name: "Needs (50%)" },
        { id: "wants", name: "Wants (30%)" },
        { id: "savings", name: "Savings & Debt (20%)" }
      ]
    },
    challenge: {
      description: "Apply the 50/30/20 rule to a real budget scenario.",
      question: "Sarah earns $4,000/month. Her rent is $1,200, food is $400, and utilities are $200. She wants to buy clothes ($300) and go out ($200). How much can she put toward savings following the 50/30/20 rule?",
      options: ["$400", "$600", "$800", "$1,000"],
      correctAnswer: 2
    }
  },
  {
    id: 3,
    title: "Tracking Your Spending",
    description: "Learn how to monitor where your money goes",
    introCard: "Tracking your spending is crucial for successful budgeting. You can't manage what you don't measure! We'll explore different methods to keep tabs on your expenses.",
    flashcards: [
      {
        term: "Expense Tracking",
        definition: "Recording and categorizing all money spent to understand spending patterns"
      },
      {
        term: "Budget Category",
        definition: "A grouping of similar expenses like 'Food' or 'Transportation'"
      },
      {
        term: "Cash Flow",
        definition: "The movement of money in and out of your accounts"
      },
      {
        term: "Budget Variance",
        definition: "The difference between budgeted and actual spending"
      }
    ],
    quiz: {
      question: "What's the main benefit of tracking your expenses?",
      options: [
        "It makes you feel guilty about spending",
        "It helps identify spending patterns and areas to improve",
        "It's required by law",
        "It impresses your friends"
      ],
      correctAnswer: 1,
      explanation: "Tracking expenses helps you understand your spending habits and make informed decisions about where to cut back or adjust your budget."
    },
    challenge: {
      description: "Analyze a week of spending to find improvement opportunities.",
      question: "You tracked your spending for a week: Monday - coffee $5, lunch $12; Tuesday - coffee $5, gas $30; Wednesday - coffee $5, lunch $15, groceries $45; Thursday - coffee $5, lunch $10; Friday - coffee $5, dinner out $35. What's your biggest opportunity to save money?",
      options: [
        "Stop buying gas",
        "Reduce coffee purchases",
        "Cook more meals at home",
        "Stop buying groceries"
      ],
      correctAnswer: 2
    }
  },
  {
    id: 4,
    title: "Setting Financial Goals",
    description: "Create SMART financial objectives",
    introCard: "Setting clear financial goals gives your budget purpose and direction. We'll learn how to create SMART goals that motivate you to stick to your budget.",
    flashcards: [
      {
        term: "SMART Goals",
        definition: "Specific, Measurable, Achievable, Relevant, Time-bound objectives"
      },
      {
        term: "Short-term Goal",
        definition: "Financial objective achievable within a year"
      },
      {
        term: "Long-term Goal",
        definition: "Financial objective that takes more than a year to achieve"
      },
      {
        term: "Sinking Fund",
        definition: "Money saved gradually for a specific future expense"
      }
    ],
    quiz: {
      question: "Which is an example of a SMART financial goal?",
      options: [
        "Save money",
        "Save $1,000 for emergency fund by December",
        "Be rich someday",
        "Spend less money"
      ],
      correctAnswer: 1,
      explanation: "This goal is Specific ($1,000), Measurable (can track progress), Achievable (reasonable amount), Relevant (emergency fund is important), and Time-bound (by December)."
    },
    challenge: {
      description: "Help someone create a SMART savings goal.",
      question: "Alex wants to buy a $600 laptop. He can save $50 per month. What's the most SMART way to state this goal?",
      options: [
        "Save money for a laptop",
        "Buy a laptop soon",
        "Save $600 for a laptop in 12 months",
        "Get a laptop somehow"
      ],
      correctAnswer: 2
    }
  },
  {
    id: 5,
    title: "Adjusting When Life Changes",
    description: "Adapt your budget to life's surprises",
    introCard: "Life is unpredictable, and your budget needs to be flexible. Whether it's a job change, moving, or unexpected expenses, learn how to adjust your budget while staying on track with your goals.",
    flashcards: [
      {
        term: "Budget Flexibility",
        definition: "The ability to adjust spending categories based on changing circumstances"
      },
      {
        term: "Lifestyle Inflation",
        definition: "Increasing spending as income rises, often unnecessarily"
      },
      {
        term: "Irregular Income",
        definition: "Income that varies from month to month"
      },
      {
        term: "Budget Review",
        definition: "Regularly examining and updating your budget to ensure it meets your needs"
      }
    ],
    quiz: {
      question: "What should you do if your income suddenly decreases?",
      options: [
        "Keep spending the same and hope for the best",
        "Immediately review and cut non-essential expenses",
        "Quit budgeting altogether",
        "Only buy luxury items"
      ],
      correctAnswer: 1,
      explanation: "When income decreases, you should quickly review your budget and prioritize essential expenses while cutting back on wants."
    },
    challenge: {
      description: "Navigate a budget challenge when circumstances change.",
      question: "You've been budgeting successfully, but your car breaks down and needs $800 in repairs. Your emergency fund only has $300. What's the best approach?",
      options: [
        "Put it all on a credit card and worry later",
        "Use the $300 from emergency fund and temporarily cut wants to pay the remaining $500",
        "Don't fix the car",
        "Borrow money from friends"
      ],
      correctAnswer: 1
    }
  }
];

export const budgetMiniGame: BudgetMiniGame = {
  title: "Budget Builder Challenge",
  description: "Create a balanced budget using the 50/30/20 rule",
  scenario: "You're a recent college graduate starting your first job. Use your monthly income to create a realistic budget that covers your needs, allows for some fun, and builds your financial future.",
  monthlyIncome: 3500,
  categories: [
    {
      id: "housing",
      name: "Housing & Utilities",
      recommended: 30,
      min: 25,
      max: 35
    },
    {
      id: "food",
      name: "Food & Groceries",
      recommended: 12,
      min: 8,
      max: 20
    },
    {
      id: "transportation",
      name: "Transportation",
      recommended: 8,
      min: 5,
      max: 15
    },
    {
      id: "entertainment",
      name: "Entertainment & Dining Out",
      recommended: 15,
      min: 5,
      max: 25
    },
    {
      id: "shopping",
      name: "Shopping & Personal",
      recommended: 10,
      min: 5,
      max: 20
    },
    {
      id: "savings",
      name: "Savings & Emergency Fund",
      recommended: 15,
      min: 10,
      max: 25
    },
    {
      id: "investments",
      name: "Investments & Retirement",
      recommended: 10,
      min: 5,
      max: 20
    }
  ]
};
