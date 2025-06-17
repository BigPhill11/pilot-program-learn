
export interface CreditFlashcard {
  id: string;
  term: string;
  definition: string;
}

export interface CreditDragDropActivity {
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

export interface CreditLevel {
  id: number;
  title: string;
  description: string;
  introCard: {
    title: string;
    content: string;
  };
  flashcards: CreditFlashcard[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  activity?: CreditDragDropActivity;
  scenario?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  takeaway: string;
  toolsHabits: string[];
}

export interface CreditMiniGameScenario {
  step: number;
  context: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  scoreImpact: number;
}

export interface CreditMiniGameData {
  title: string;
  description: string;
  startingScore: number;
  targetScore: number;
  scenarios: CreditMiniGameScenario[];
  badge: {
    title: string;
    icon: string;
    description: string;
  };
}

export const creditJourneyData: CreditLevel[] = [
  {
    id: 1,
    title: "What Is Credit?",
    description: "Understanding what credit is and how it affects your financial opportunities",
    introCard: {
      title: "Credit is Your Money Reputation",
      content: "Credit is your money reputation. It shows how trustworthy you are with borrowing. When you want to rent an apartment, buy a car, or get a phone plan, companies check your credit to see if you're reliable with money."
    },
    flashcards: [
      {
        id: "credit-1",
        term: "Credit",
        definition: "The ability to borrow money or get goods/services now and pay for them later"
      },
      {
        id: "credit-2",
        term: "Credit Score",
        definition: "A three-digit number (300-850) that shows how good you are at managing borrowed money"
      },
      {
        id: "credit-3",
        term: "Credit Report",
        definition: "A detailed record of your borrowing and payment history"
      },
      {
        id: "credit-4",
        term: "Lender",
        definition: "A bank, credit union, or company that loans money"
      },
      {
        id: "credit-5",
        term: "Borrower",
        definition: "The person who receives money or credit and promises to pay it back"
      }
    ],
    activity: {
      instruction: "Drag each group to show who uses your credit report:",
      items: [
        { id: "landlords", text: "Landlords (for apartments)", category: "uses-credit" },
        { id: "banks", text: "Banks (for loans)", category: "uses-credit" },
        { id: "employers", text: "Some employers", category: "uses-credit" },
        { id: "grocery-stores", text: "Grocery stores", category: "doesnt-use-credit" },
        { id: "friends", text: "Your friends", category: "doesnt-use-credit" },
        { id: "social-media", text: "Social media apps", category: "doesnt-use-credit" }
      ],
      categories: [
        { id: "uses-credit", name: "Uses Your Credit Report" },
        { id: "doesnt-use-credit", name: "Doesn't Use Your Credit Report" }
      ]
    },
    scenario: {
      question: "You want to rent an apartment and they check your credit. What are they looking for?",
      options: [
        "How much money you make per month",
        "Whether you pay your bills on time",
        "What college you went to",
        "How many friends you have"
      ],
      correct: 1,
      explanation: "Landlords check your credit to see if you're reliable at paying bills on time. This helps them predict if you'll pay rent consistently."
    },
    quiz: {
      question: "Who provides you with a credit score?",
      options: [
        "Your bank",
        "Credit bureaus (Experian, Equifax, TransUnion)", 
        "Your employer",
        "The government"
      ],
      correct: 1,
      explanation: "Credit bureaus collect information about your borrowing and create your credit score. The three main ones are Experian, Equifax, and TransUnion."
    },
    takeaway: "Credit is your financial reputation that helps you access apartments, loans, and other financial opportunities.",
    toolsHabits: [
      "Start thinking about credit before you need it",
      "Understand that everything you borrow affects your credit",
      "Know that building credit takes time and consistency"
    ]
  },
  {
    id: 2,
    title: "How to Build Credit Safely",
    description: "Learn the smart ways to start building credit without falling into debt traps",
    introCard: {
      title: "Credit Starts Small",
      content: "Credit starts small. You build it by borrowing wisely and paying on time. The key is starting with manageable amounts and proving you're responsible before taking on bigger credit responsibilities."
    },
    flashcards: [
      {
        id: "credit-6",
        term: "Secured Credit Card",
        definition: "A credit card that requires a cash deposit upfront, which becomes your credit limit"
      },
      {
        id: "credit-7",
        term: "Authorized User",
        definition: "When someone adds you to their credit card account so you can build credit history"
      },
      {
        id: "credit-8",
        term: "Student Loan",
        definition: "Money borrowed specifically for education that helps build credit when paid on time"
      },
      {
        id: "credit-9",
        term: "Payment History",
        definition: "The record of whether you've made your credit payments on time"
      },
      {
        id: "credit-10",
        term: "Credit Utilization",
        definition: "The percentage of your available credit that you're currently using"
      }
    ],
    activity: {
      instruction: "Build a good first credit routine by selecting the right habits:",
      items: [
        { id: "pay-full", text: "Pay your balance in full each month", category: "good-habit" },
        { id: "keep-low", text: "Keep your balance under 30% of your limit", category: "good-habit" },
        { id: "track-usage", text: "Track your spending regularly", category: "good-habit" },
        { id: "max-out", text: "Use your entire credit limit", category: "bad-habit" },
        { id: "minimum-only", text: "Only pay the minimum payment", category: "bad-habit" },
        { id: "ignore-balance", text: "Don't check your balance", category: "bad-habit" }
      ],
      categories: [
        { id: "good-habit", name: "Good Credit Habits" },
        { id: "bad-habit", name: "Bad Credit Habits" }
      ]
    },
    scenario: {
      question: "You just got your first credit card with a $500 limit. What should you avoid doing?",
      options: [
        "Using it for small purchases and paying in full",
        "Keeping track of your spending",
        "Maxing it out on your first shopping trip",
        "Setting up automatic payments"
      ],
      correct: 2,
      explanation: "Maxing out your credit card hurts your credit score and can lead to debt problems. Start small and pay in full to build good habits."
    },
    quiz: {
      question: "What's a smart credit utilization rate to maintain?",
      options: [
        "Under 10%",
        "Under 30%",
        "50%",
        "It doesn't matter"
      ],
      correct: 1,
      explanation: "Keeping your credit utilization under 30% (ideally under 10%) shows lenders you're not overextending yourself and can manage credit responsibly."
    },
    takeaway: "Start building credit with small, manageable amounts and always pay on time and in full.",
    toolsHabits: [
      "Consider a secured credit card as your first card",
      "Ask family if you can become an authorized user",
      "Set up automatic payments to never miss a due date",
      "Keep your spending well below your credit limit"
    ]
  },
  {
    id: 3,
    title: "Understanding Credit Scores",
    description: "Learn what makes up your credit score and how each part affects your financial future",
    introCard: {
      title: "Your Credit Score Has 5 Key Parts",
      content: "Your credit score is made of 5 key parts. Understanding these helps you focus on what matters most for building and maintaining good credit."
    },
    flashcards: [
      {
        id: "credit-11",
        term: "Credit Mix",
        definition: "Having different types of credit accounts (credit cards, auto loans, etc.)"
      },
      {
        id: "credit-12",
        term: "New Credit",
        definition: "How many new credit accounts you've opened recently"
      },
      {
        id: "credit-13",
        term: "Length of History",
        definition: "How long you've had credit accounts open"
      },
      {
        id: "credit-14",
        term: "FICO Score",
        definition: "The most common type of credit score, ranging from 300-850"
      },
      {
        id: "credit-15",
        term: "Hard Inquiry",
        definition: "When a lender checks your credit for a loan or credit application"
      }
    ],
    activity: {
      instruction: "Build a FICO Score Wheel by matching each category to its percentage weight:",
      items: [
        { id: "payment-history", text: "Payment History", category: "35-percent" },
        { id: "credit-utilization", text: "Credit Utilization", category: "30-percent" },
        { id: "length-history", text: "Length of Credit History", category: "15-percent" },
        { id: "credit-mix", text: "Credit Mix", category: "10-percent" },
        { id: "new-credit", text: "New Credit", category: "10-percent" }
      ],
      categories: [
        { id: "35-percent", name: "35% of Score" },
        { id: "30-percent", name: "30% of Score" },
        { id: "15-percent", name: "15% of Score" },
        { id: "10-percent", name: "10% of Score" }
      ]
    },
    scenario: {
      question: "You open 3 new credit cards this month. What happens to your score?",
      options: [
        "It goes up because you have more available credit",
        "It goes down because of multiple hard inquiries",
        "Nothing happens",
        "It only affects your score if you use the cards"
      ],
      correct: 1,
      explanation: "Multiple hard inquiries in a short period can lower your score. It looks like you're desperately seeking credit, which worries lenders."
    },
    quiz: {
      question: "What makes up the largest part of your credit score?",
      options: [
        "Credit utilization (30%)",
        "Payment history (35%)",
        "Length of credit history (15%)",
        "Credit mix (10%)"
      ],
      correct: 1,
      explanation: "Payment history is 35% of your credit score - the biggest factor. This is why paying bills on time is the most important credit habit."
    },
    takeaway: "Payment history (35%) and credit utilization (30%) make up 65% of your score - focus on these first.",
    toolsHabits: [
      "Pay every bill on time, every time",
      "Keep credit card balances low",
      "Don't close your oldest credit accounts",
      "Only apply for credit when you really need it"
    ]
  },
  {
    id: 4,
    title: "Credit Mistakes to Avoid",
    description: "Learn the common credit traps and how to avoid costly mistakes",
    introCard: {
      title: "Avoid Common Credit Traps",
      content: "It's easy to fall into bad habits. Let's learn how to avoid common credit traps that can damage your financial future and take years to fix."
    },
    flashcards: [
      {
        id: "credit-16",
        term: "Late Payment",
        definition: "Missing a payment deadline, which can hurt your credit score and incur fees"
      },
      {
        id: "credit-17",
        term: "Default",
        definition: "Failing to repay a loan according to the agreed terms"
      },
      {
        id: "credit-18",
        term: "Maxed Out",
        definition: "Using all or most of your available credit limit"
      },
      {
        id: "credit-19",
        term: "Collections",
        definition: "When unpaid debts are sold to collection agencies"
      },
      {
        id: "credit-20",
        term: "Cosigning",
        definition: "Agreeing to be responsible for someone else's debt if they can't pay"
      }
    ],
    activity: {
      instruction: "Spot the red flags in these credit situations:",
      items: [
        { id: "skip-payment", text: "Skipping a payment because you're short on cash", category: "red-flag" },
        { id: "cosign-friend", text: "Cosigning a loan for a friend without understanding the risk", category: "red-flag" },
        { id: "max-cards", text: "Maxing out multiple credit cards", category: "red-flag" },
        { id: "pay-full", text: "Paying your full balance every month", category: "good-choice" },
        { id: "check-score", text: "Checking your credit score regularly", category: "good-choice" },
        { id: "budget-first", text: "Only spending what you can afford to pay back", category: "good-choice" }
      ],
      categories: [
        { id: "red-flag", name: "Red Flags to Avoid" },
        { id: "good-choice", name: "Smart Credit Choices" }
      ]
    },
    scenario: {
      question: "A friend asks you to cosign a loan. What should you think about first?",
      options: [
        "How much you trust your friend",
        "Whether you can afford to pay the loan if your friend can't",
        "How much the monthly payment is",
        "What your friend needs the money for"
      ],
      correct: 1,
      explanation: "When you cosign, you're legally responsible for the entire debt if your friend can't pay. Only cosign if you can afford to pay the full loan yourself."
    },
    quiz: {
      question: "What happens when you miss a credit card payment?",
      options: [
        "Nothing, as long as you pay it next month",
        "Your score drops and you may be charged a late fee",
        "Your card is automatically cancelled",
        "You have to pay the full balance immediately"
      ],
      correct: 1,
      explanation: "Missing payments hurts your credit score (the most important factor) and usually results in late fees. The impact can last for years."
    },
    takeaway: "Credit mistakes can take years to fix, so prevention is much better than trying to repair damage later.",
    toolsHabits: [
      "Set up automatic minimum payments",
      "Never cosign unless you can pay the full amount",
      "Keep credit utilization under 30%",
      "Create a budget before you spend"
    ]
  },
  {
    id: 5,
    title: "Monitoring & Improving Your Credit",
    description: "Learn how to track your credit and improve it over time using free tools",
    introCard: {
      title: "Check and Improve Your Credit for Free",
      content: "You can check and improve your credit for free — no need to guess. There are legitimate free tools to monitor your progress and catch problems early."
    },
    flashcards: [
      {
        id: "credit-21",
        term: "Credit Monitoring",
        definition: "Regularly checking your credit reports and scores for changes or errors"
      },
      {
        id: "credit-22",
        term: "Dispute Error",
        definition: "The process of correcting mistakes on your credit report"
      },
      {
        id: "credit-23",
        term: "AnnualCreditReport.com",
        definition: "The official free site to get your credit reports from all three bureaus"
      },
      {
        id: "credit-24",
        term: "Credit Builder Loan",
        definition: "A small loan designed specifically to help build credit history"
      },
      {
        id: "credit-25",
        term: "Good Standing",
        definition: "When all your accounts are current and in good condition"
      }
    ],
    activity: {
      instruction: "Create a step-by-step credit monitoring checklist:",
      items: [
        { id: "annual-report", text: "Get free credit report from AnnualCreditReport.com", category: "monitoring-steps" },
        { id: "check-errors", text: "Review report for errors or unfamiliar accounts", category: "monitoring-steps" },
        { id: "dispute-errors", text: "File disputes for any errors you find", category: "monitoring-steps" },
        { id: "monitor-score", text: "Use free apps to track your score monthly", category: "monitoring-steps" },
        { id: "ignore-problems", text: "Ignore errors on your report", category: "avoid" },
        { id: "pay-monitoring", text: "Pay for credit monitoring services", category: "avoid" }
      ],
      categories: [
        { id: "monitoring-steps", name: "Smart Monitoring Steps" },
        { id: "avoid", name: "Don't Do This" }
      ]
    },
    scenario: {
      question: "You see an error on your credit report. What should you do?",
      options: [
        "Ignore it, it will fix itself",
        "Pay someone to fix it for you",
        "File a dispute with the credit bureau for free",
        "Wait until you need credit to worry about it"
      ],
      correct: 2,
      explanation: "You can dispute errors for free directly with the credit bureau. Don't pay someone to do what you can do yourself for free."
    },
    quiz: {
      question: "How often can you check your official credit report for free?",
      options: [
        "Once per month",
        "Once per year from each bureau (3 total per year)",
        "Only when applying for credit",
        "Never for free"
      ],
      correct: 1,
      explanation: "Federal law gives you one free credit report per year from each of the three bureaus, so you can get 3 free reports annually."
    },
    takeaway: "Regular monitoring helps you catch problems early and track your progress toward better credit.",
    toolsHabits: [
      "Check your credit report every 4 months (rotate between the 3 bureaus)",
      "Use free apps like Credit Karma to monitor your score",
      "Set up account alerts for payment due dates",
      "Dispute any errors you find immediately"
    ]
  }
];

export const creditMiniGame: CreditMiniGameData = {
  title: "Build a Better Score Credit Challenge",
  description: "Make credit decisions and watch your simulated score rise or fall",
  startingScore: 580,
  targetScore: 720,
  scenarios: [
    {
      step: 1,
      context: "You're 18 and want to start building credit. You have no credit history.",
      question: "What's the best first step?",
      options: [
        "Apply for multiple credit cards to build credit faster",
        "Get a secured credit card with a $300 deposit",
        "Wait until you're older to start building credit",
        "Ask for a high-limit credit card from your bank"
      ],
      correct: 1,
      explanation: "A secured credit card is perfect for beginners. You put down a deposit (like $300) and that becomes your credit limit. It's safe and helps build credit history.",
      scoreImpact: 35
    },
    {
      step: 2,
      context: "You've had your secured card for 3 months and always paid on time. Your limit is $300.",
      question: "What's a good spending pattern to build credit?",
      options: [
        "Use the full $300 limit every month",
        "Never use the card to avoid debt",
        "Use about $90 (30%) and pay it off in full each month",
        "Only use it for emergencies"
      ],
      correct: 2,
      explanation: "Using about 30% of your limit and paying in full shows responsible usage. This builds payment history (35% of your score) while keeping utilization reasonable.",
      scoreImpact: 40
    },
    {
      step: 3,
      context: "After 6 months of good payment history, your bank offers to upgrade you to an unsecured card.",
      question: "Should you upgrade?",
      options: [
        "No, secured cards are safer",
        "Yes, and ask for a higher credit limit too",
        "Yes, but keep the same spending habits",
        "No, wait until your score is perfect"
      ],
      correct: 2,
      explanation: "Upgrading to an unsecured card is great progress! You get your deposit back and often a higher limit. Keep the same responsible spending habits that got you here.",
      scoreImpact: 25
    },
    {
      step: 4,
      context: "You now have a $1,000 unsecured card. A store offers you their credit card with 10% off your purchase.",
      question: "What should you consider?",
      options: [
        "Apply immediately for the discount",
        "Think about whether you need another card right now",
        "Apply for multiple store cards while you're at it",
        "Never get store credit cards"
      ],
      correct: 1,
      explanation: "Each credit application creates a hard inquiry that can lower your score. Only apply for credit you actually need, not just for small discounts.",
      scoreImpact: 20
    },
    {
      step: 5,
      context: "It's been a year since you started. You have good payment history and want to continue improving.",
      question: "What's the best long-term strategy?",
      options: [
        "Apply for as many cards as possible",
        "Keep making on-time payments and keep balances low",
        "Close your old card since you have a new one",
        "Stop using credit cards altogether"
      ],
      correct: 1,
      explanation: "Consistency is key! Keep making on-time payments and maintaining low balances. Don't close old accounts as they help your credit history length.",
      scoreImpact: 30
    }
  ],
  badge: {
    title: "Credit Champ",
    icon: "🏆",
    description: "You've mastered the fundamentals of building and maintaining excellent credit!"
  }
};
