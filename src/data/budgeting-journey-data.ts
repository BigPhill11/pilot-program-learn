
export interface BudgetFlashcard {
  term: string;
  definition: string;
}

export interface BudgetQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface BudgetDragDropActivity {
  id: string;
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
  introCard: string;
  flashcards: BudgetFlashcard[];
  quiz: BudgetQuiz;
  activity?: BudgetDragDropActivity;
  challenge: {
    description: string;
    question: string;
    options: string[];
    correctAnswer: number;
  };
}

export const budgetingJourneyData: BudgetLevel[] = [
  {
    id: 1,
    title: "What Is a Budget?",
    introCard: "A budget is a plan for your money. It helps you spend smarter and avoid surprises. Think of it as a roadmap that shows you where every dollar should go before you spend it.",
    flashcards: [
      {
        term: "Budget",
        definition: "A plan for how you will spend your money over a certain period, usually a month. It helps you control your spending and reach your financial goals."
      },
      {
        term: "Income",
        definition: "All the money you receive regularly, such as from a job, allowance, or gifts. This is the money you have available to spend or save."
      },
      {
        term: "Expenses",
        definition: "All the money you spend on things you need or want, including bills, food, entertainment, and other purchases."
      }
    ],
    quiz: {
      question: "What does a budget help you avoid?",
      options: ["Making money", "Overspending", "Saving money", "Getting a job"],
      correctAnswer: 1,
      explanation: "A budget helps you plan your spending so you don't spend more money than you have, which is called overspending."
    },
    activity: {
      id: "budget-categories",
      instruction: "You have $500 to budget. Drag the money amounts to different categories and see how they add up.",
      items: [
        { id: "rent-200", text: "$200 - Housing/Rent", category: "needs" },
        { id: "food-150", text: "$150 - Food/Groceries", category: "needs" },
        { id: "transport-50", text: "$50 - Transportation", category: "needs" },
        { id: "entertainment-75", text: "$75 - Entertainment", category: "wants" },
        { id: "savings-25", text: "$25 - Savings", category: "savings" }
      ],
      categories: [
        { id: "needs", name: "Needs (Must Have)" },
        { id: "wants", name: "Wants (Nice to Have)" },
        { id: "savings", name: "Savings (Future Goals)" }
      ]
    },
    challenge: {
      description: "You're helping a friend understand budgeting basics.",
      question: "Your friend asks: 'Why should I make a budget instead of just spending money when I need to?' What's the best answer?",
      options: [
        "Budgets are only for adults",
        "It helps you plan ahead and avoid running out of money",
        "You don't need a budget if you have a job",
        "Budgets make spending less fun"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 2,
    title: "Needs vs. Wants",
    introCard: "Needs keep you going. Wants are the extras. Knowing the difference saves you money and helps you prioritize what's really important in your budget.",
    flashcards: [
      {
        term: "Fixed Expense",
        definition: "Costs that stay the same each month, like rent, phone bills, or insurance. These are predictable and usually needs."
      },
      {
        term: "Variable Expense",
        definition: "Costs that change from month to month, like groceries, gas, or entertainment. These can be needs or wants."
      },
      {
        term: "Need",
        definition: "Something essential for survival and basic living, like food, shelter, clothing, and transportation to work or school."
      },
      {
        term: "Want",
        definition: "Something you desire but don't actually need to survive or function, like designer clothes, eating out, or premium apps."
      }
    ],
    quiz: {
      question: "Which of these is a NEED?",
      options: ["Designer sneakers", "Rent", "Movie tickets", "Video game subscription"],
      correctAnswer: 1,
      explanation: "Rent is a need because you require shelter to live safely. The other options are wants - nice to have but not essential."
    },
    activity: {
      id: "needs-wants-sorting",
      instruction: "Sort these items into 'Needs' or 'Wants' categories. Think about what's essential versus what's extra.",
      items: [
        { id: "groceries", text: "Groceries", category: "needs" },
        { id: "netflix", text: "Netflix subscription", category: "wants" },
        { id: "bus-fare", text: "Bus fare to school", category: "needs" },
        { id: "airpods", text: "AirPods", category: "wants" },
        { id: "textbooks", text: "School textbooks", category: "needs" },
        { id: "coffee-shop", text: "Daily coffee shop visits", category: "wants" },
        { id: "winter-coat", text: "Winter coat", category: "needs" },
        { id: "gaming-chair", text: "Gaming chair", category: "wants" }
      ],
      categories: [
        { id: "needs", name: "Needs (Essential)" },
        { id: "wants", name: "Wants (Nice to Have)" }
      ]
    },
    challenge: {
      description: "You have $100 left in your budget for the month. Multiple expenses come up.",
      question: "You have $100 left and these options: $30 phone bill, $60 concert ticket, $25 groceries, $40 new headphones. What should you prioritize?",
      options: [
        "Concert ticket first, then headphones",
        "Phone bill and groceries first",
        "Headphones and groceries first",
        "Everything costs too much, save it all"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 3,
    title: "Building a Simple Budget",
    introCard: "Now that you know what you spend on, let's plan it out. Budgeting gives every dollar a job. The 50/30/20 rule is a simple way to divide your money wisely.",
    flashcards: [
      {
        term: "50/30/20 Rule",
        definition: "A simple budgeting method: 50% for needs, 30% for wants, and 20% for savings and debt payments. It's a good starting point for any budget."
      },
      {
        term: "Emergency Fund",
        definition: "Money set aside for unexpected expenses like medical bills, car repairs, or job loss. Experts recommend saving 3-6 months of expenses."
      },
      {
        term: "Savings",
        definition: "Money you set aside for future goals or emergencies instead of spending it now. It's the foundation of financial security."
      },
      {
        term: "Tracking",
        definition: "Recording and monitoring your income and expenses to see where your money actually goes versus where you planned to spend it."
      }
    ],
    quiz: {
      question: "In the 50/30/20 rule, how much should go to savings?",
      options: ["50%", "30%", "20%", "10%"],
      correctAnswer: 2,
      explanation: "In the 50/30/20 rule, 20% of your income should go to savings and debt payments to build financial security."
    },
    challenge: {
      description: "You're helping a teen working part-time build their first budget.",
      question: "Alex earns $400/month from a part-time job. Using the 50/30/20 rule, how much should Alex budget for wants?",
      options: [
        "$200 for wants",
        "$120 for wants", 
        "$80 for wants",
        "$160 for wants"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 4,
    title: "Sticking to Your Budget",
    introCard: "Making a budget is one thing. Following it is where the magic happens. Learn practical strategies to stay on track and avoid common budgeting pitfalls.",
    flashcards: [
      {
        term: "Impulse Buying",
        definition: "Making unplanned purchases without thinking about whether you need the item or if it fits in your budget. This can quickly derail your financial plans."
      },
      {
        term: "Budget App",
        definition: "A digital tool or mobile application that helps you track income, expenses, and savings goals automatically. Examples include Mint, YNAB, or simple spreadsheets."
      },
      {
        term: "Cash Envelope System",
        definition: "A budgeting method where you put cash for each budget category in separate envelopes. When the envelope is empty, you can't spend more in that category."
      },
      {
        term: "Spending Journal",
        definition: "A record where you write down every purchase to become more aware of your spending habits and identify areas for improvement."
      }
    ],
    quiz: {
      question: "What tool helps you stay on track with your budget daily?",
      options: ["Credit card", "Budget app", "Shopping list", "Calculator"],
      correctAnswer: 1,
      explanation: "A budget app helps you track your spending in real-time and alerts you when you're approaching your limits for each category."
    },
    challenge: {
      description: "You're shopping and face a common budgeting dilemma.",
      question: "Your favorite shoes go on sale for 50% off, but you've already spent this month's 'wants' budget. What's the best choice?",
      options: [
        "Buy them anyway, it's a great deal",
        "Wait and save up for them next month",
        "Use money from your 'needs' budget",
        "Ask to borrow money from friends"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 5,
    title: "Budgeting for Goals",
    introCard: "A budget isn't just for bills. It helps you save for big dreams, too. Learn how to turn your goals into actionable savings plans.",
    flashcards: [
      {
        term: "Short-Term Goal",
        definition: "A financial goal you want to achieve within a year, like buying a new phone, taking a trip, or building an emergency fund."
      },
      {
        term: "Long-Term Goal",
        definition: "A financial goal that takes more than a year to achieve, like saving for college, buying a car, or starting a business."
      },
      {
        term: "Sinking Fund",
        definition: "Money you save regularly for a specific future expense, like a vacation or car repairs. You 'sink' money into it bit by bit."
      },
      {
        term: "Financial Planning",
        definition: "The process of setting money goals and creating a plan to achieve them through budgeting, saving, and smart spending choices."
      }
    ],
    quiz: {
      question: "What's a good example of what you'd use a sinking fund for?",
      options: ["Daily coffee", "Saving for a laptop", "Paying rent", "Buying groceries"],
      correctAnswer: 1,
      explanation: "A sinking fund is perfect for planned future expenses like a laptop. You save a little each month so you have the full amount when you need it."
    },
    challenge: {
      description: "Time to put goal-setting into action with real numbers.",
      question: "You want to save $300 for a new gaming console in 3 months. How much should you save each week?",
      options: [
        "$25 per week",
        "$50 per week", 
        "$75 per week",
        "$100 per week"
      ],
      correctAnswer: 0
    }
  }
];

export const budgetMiniGameData = {
  title: "Budget Builder Challenge",
  description: "Create your own monthly budget using everything you've learned! Make smart choices and see if you can balance your needs, wants, and savings.",
  scenarios: [
    {
      step: "Income Setup",
      context: "You work part-time and receive an allowance. Let's start by setting up your monthly income.",
      question: "You earn $12/hour working 15 hours per week, plus a $50 monthly allowance. What's your total monthly income?",
      options: [
        "$720 per month",
        "$770 per month", 
        "$800 per month",
        "$850 per month"
      ],
      correct: 1,
      explanation: "$12 × 15 hours × 4 weeks = $720 from work + $50 allowance = $770 total monthly income."
    },
    {
      step: "Fixed Expenses",
      context: "Now let's identify your fixed monthly expenses that stay the same each month.",
      question: "Which of these should be your first priority when budgeting your $770 income?",
      options: [
        "Entertainment and fun activities",
        "Fixed expenses like phone bill and transportation",
        "Shopping for clothes and accessories", 
        "Saving for vacation"
      ],
      correct: 1,
      explanation: "Fixed expenses and needs should always be budgeted first because they're essential and predictable."
    },
    {
      step: "Applying 50/30/20 Rule",
      context: "Let's apply the 50/30/20 rule to your $770 monthly income.",
      question: "Using the 50/30/20 rule with $770 income, how much should you allocate to wants?",
      options: [
        "$231",
        "$385",
        "$154", 
        "$200"
      ],
      correct: 0,
      explanation: "30% of $770 = $231 for wants. This covers entertainment, dining out, and other non-essential purchases."
    },
    {
      step: "Emergency Fund Priority",
      context: "You have $154 allocated for savings. You need to decide how to split it between goals.",
      question: "As a teen, what should be your first savings priority?",
      options: [
        "Saving for a car",
        "Building a small emergency fund",
        "Investing in stocks",
        "Saving for expensive clothes"
      ],
      correct: 1,
      explanation: "An emergency fund should be your first priority. Even $500-1000 can help cover unexpected expenses."
    },
    {
      step: "Budget Adjustment",
      context: "After 2 months, you notice you're spending $280 on wants but only budgeted $231.",
      question: "What's the best way to handle this overspending?",
      options: [
        "Ignore it and keep spending",
        "Take money from your savings",
        "Review and cut some want expenses to fit your budget",
        "Work more hours without adjusting your budget"
      ],
      correct: 2,
      explanation: "The best approach is to review your want expenses and make cuts to stay within your budget. This builds discipline and keeps you on track."
    }
  ],
  badge: {
    title: "Budget Boss",
    description: "You've mastered the art of budgeting! You know how to plan your money, prioritize your spending, and save for your goals.",
    icon: "💰"
  }
};
