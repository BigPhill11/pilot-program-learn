
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
    title: "What is Credit?",
    description: "Understanding the basics of credit and how it works",
    introCard: {
      title: "Welcome to Credit 101",
      content: "Credit is your financial reputation - it shows how reliably you pay back borrowed money. Understanding credit is crucial for major purchases like homes and cars."
    },
    flashcards: [
      {
        id: "credit-1",
        term: "Credit",
        definition: "The ability to borrow money or access goods/services with the understanding that you'll pay later"
      },
      {
        id: "credit-2",
        term: "Credit Score",
        definition: "A three-digit number (300-850) that represents your creditworthiness"
      },
      {
        id: "credit-3",
        term: "Credit Report",
        definition: "A detailed record of your credit history, including accounts, payments, and inquiries"
      },
      {
        id: "credit-4",
        term: "Lender",
        definition: "A bank, credit union, or company that loans money or extends credit"
      }
    ],
    quiz: {
      question: "What does a credit score measure?",
      options: [
        "How much money you have in the bank",
        "How likely you are to pay back borrowed money",
        "Your monthly income",
        "Your age and employment status"
      ],
      correct: 1,
      explanation: "A credit score measures your creditworthiness - how likely you are to repay borrowed money based on your past credit behavior."
    },
    takeaway: "Credit is essentially your financial reputation that determines your ability to borrow money for important purchases."
  },
  {
    id: 2,
    title: "Building Credit History",
    description: "Learn how to establish and build your credit profile",
    introCard: {
      title: "Starting Your Credit Journey",
      content: "Building credit takes time and consistent positive behavior. We'll explore the best ways to establish credit history when you're starting from scratch."
    },
    flashcards: [
      {
        id: "credit-5",
        term: "Credit History",
        definition: "The record of how you've managed credit accounts over time"
      },
      {
        id: "credit-6",
        term: "Secured Credit Card",
        definition: "A credit card that requires a cash deposit as collateral"
      },
      {
        id: "credit-7",
        term: "Credit Utilization",
        definition: "The percentage of available credit you're currently using"
      },
      {
        id: "credit-8",
        term: "Authorized User",
        definition: "Someone added to another person's credit account with permission to use it"
      }
    ],
    quiz: {
      question: "What's the recommended credit utilization ratio?",
      options: [
        "Under 10%",
        "Under 30%", 
        "50%",
        "It doesn't matter"
      ],
      correct: 1,
      explanation: "Keeping credit utilization under 30% (ideally under 10%) shows lenders you're not overextending yourself with credit."
    },
    activity: {
      instruction: "Sort these actions by whether they help or hurt your credit:",
      items: [
        { id: "pay-on-time", text: "Paying bills on time", category: "helps" },
        { id: "max-out-cards", text: "Maxing out credit cards", category: "hurts" },
        { id: "long-history", text: "Keeping old accounts open", category: "helps" },
        { id: "many-inquiries", text: "Applying for many cards quickly", category: "hurts" }
      ],
      categories: [
        { id: "helps", name: "Helps Credit" },
        { id: "hurts", name: "Hurts Credit" }
      ]
    },
    takeaway: "Building credit requires time, patience, and consistent positive credit behavior like paying on time and keeping utilization low."
  },
  {
    id: 3,
    title: "Payment History Matters",
    description: "Understand why payment history is the most important factor",
    introCard: {
      title: "The Power of Paying On Time",
      content: "Payment history makes up 35% of your credit score - more than any other factor. Even one late payment can impact your score significantly."
    },
    flashcards: [
      {
        id: "credit-9",
        term: "Payment History",
        definition: "A record of whether you've made credit payments on time"
      },
      {
        id: "credit-10",
        term: "Late Payment",
        definition: "A payment made after the due date, which can negatively impact credit"
      },
      {
        id: "credit-11",
        term: "Grace Period",
        definition: "Time between the statement date and due date when no interest is charged"
      },
      {
        id: "credit-12",
        term: "Minimum Payment",
        definition: "The smallest amount you must pay by the due date to avoid late fees"
      }
    ],
    quiz: {
      question: "What percentage of your credit score is based on payment history?",
      options: ["15%", "25%", "35%", "50%"],
      correct: 2,
      explanation: "Payment history accounts for 35% of your credit score, making it the most important factor in credit scoring."
    },
    scenario: {
      question: "You're short on cash this month. Your credit card minimum payment is $50, but you only have $30. What should you do?",
      options: [
        "Skip the payment this month",
        "Pay the $30 you have",
        "Ask family/friends for $20 to make the full payment",
        "Use a cash advance from another card"
      ],
      correct: 2,
      explanation: "Making the full minimum payment on time is crucial. Asking for help to avoid a late payment is better than damaging your credit history."
    },
    takeaway: "Payment history is the most important factor in your credit score - always prioritize making at least minimum payments on time."
  },
  {
    id: 4,
    title: "Types of Credit",
    description: "Explore different types of credit accounts",
    introCard: {
      title: "Understanding Credit Variety",
      content: "There are different types of credit accounts, and having a mix can positively impact your credit score. Let's explore revolving credit, installment loans, and more."
    },
    flashcards: [
      {
        id: "credit-13",
        term: "Revolving Credit",
        definition: "Credit you can use repeatedly up to a limit, like credit cards"
      },
      {
        id: "credit-14",
        term: "Installment Loan",
        definition: "A loan with fixed payments over a set period, like auto loans"
      },
      {
        id: "credit-15",
        term: "Credit Mix",
        definition: "Having different types of credit accounts (cards, loans, etc.)"
      },
      {
        id: "credit-16",
        term: "Credit Limit",
        definition: "The maximum amount you can borrow on a revolving credit account"
      }
    ],
    quiz: {
      question: "Which is an example of revolving credit?",
      options: [
        "Car loan",
        "Mortgage",
        "Credit card",
        "Student loan"
      ],
      correct: 2,
      explanation: "Credit cards are revolving credit because you can use them repeatedly up to your credit limit, unlike installment loans with fixed terms."
    },
    takeaway: "Having a healthy mix of credit types (revolving and installment) can help improve your overall credit profile."
  },
  {
    id: 5,
    title: "Credit Monitoring",
    description: "Learn how to monitor and protect your credit",
    introCard: {
      title: "Protecting Your Credit",
      content: "Monitoring your credit regularly helps you catch errors, identity theft, and track your progress. Learn how to access your credit reports and what to look for."
    },
    flashcards: [
      {
        id: "credit-17",
        term: "Credit Monitoring",
        definition: "Regularly checking your credit reports and scores for changes"
      },
      {
        id: "credit-18",
        term: "Identity Theft",
        definition: "When someone uses your personal information to open credit accounts"
      },
      {
        id: "credit-19",
        term: "Credit Freeze",
        definition: "Restricting access to your credit report to prevent new accounts"
      },
      {
        id: "credit-20",
        term: "Annual Credit Report",
        definition: "Free yearly credit report from each of the three credit bureaus"
      }
    ],
    quiz: {
      question: "How often should you check your credit report?",
      options: [
        "Once a year",
        "Every few months", 
        "Monthly",
        "Only when applying for credit"
      ],
      correct: 1,
      explanation: "Checking your credit report every few months helps you catch errors early and monitor for signs of identity theft."
    },
    scenario: {
      question: "You notice a credit card account on your report that you didn't open. What should you do first?",
      options: [
        "Ignore it - it might be a mistake",
        "Contact the credit card company immediately",
        "Wait to see if charges appear",
        "Close all your other accounts"
      ],
      correct: 1,
      explanation: "Contact the credit card company immediately to report the unauthorized account. This could be identity theft and needs quick action."
    },
    takeaway: "Regular credit monitoring helps you catch problems early and protect your financial identity from fraud and errors."
  }
];

export const creditMiniGame: CreditMiniGameData = {
  title: "Credit Score Builder",
  description: "Make smart financial decisions to build your credit score from 620 to 740+",
  startingScore: 620,
  targetScore: 740,
  scenarios: [
    {
      step: 1,
      context: "You just got your first credit card with a $1,000 limit.",
      question: "What's the best way to use it for building credit?",
      options: [
        "Max it out immediately to show you use credit",
        "Use about $300 and pay the full balance each month",
        "Never use it to avoid debt",
        "Only use it for emergencies"
      ],
      correct: 1,
      explanation: "Using about 30% of your limit and paying in full shows responsible usage and builds positive payment history.",
      scoreImpact: 25
    },
    {
      step: 2,
      context: "You've been using your card responsibly for 6 months.",
      question: "Your credit card company offers to increase your limit to $2,500. Should you accept?",
      options: [
        "No, higher limits are dangerous",
        "Yes, it will lower your utilization ratio",
        "Only if you plan to spend more",
        "Wait until your score improves first"
      ],
      correct: 1,
      explanation: "A higher credit limit lowers your utilization ratio (if you don't increase spending), which can improve your credit score.",
      scoreImpact: 20
    },
    {
      step: 3,
      context: "You want to finance a car and the dealer suggests applying for store credit cards for discounts.",
      question: "What should you do?",
      options: [
        "Apply for all the store cards for maximum discounts",
        "Apply for just one store card",
        "Focus on the car loan and avoid new credit applications",
        "Apply for store cards after getting the car loan"
      ],
      correct: 2,
      explanation: "Multiple credit inquiries in a short time can hurt your score. Focus on the car loan, then wait before applying for other credit.",
      scoreImpact: 30
    },
    {
      step: 4,
      context: "You got the car loan! Your credit report now shows both a credit card and an auto loan.",
      question: "How does having different types of credit accounts affect your score?",
      options: [
        "It hurts your score by showing you have too much debt",
        "It helps by showing you can manage different types of credit",
        "It has no effect on your credit score",
        "It only matters if you have problems making payments"
      ],
      correct: 1,
      explanation: "Credit mix accounts for 10% of your score. Having both revolving credit (cards) and installment loans shows you can handle variety.",
      scoreImpact: 15
    },
    {
      step: 5,
      context: "After 2 years of responsible credit use, you're considering closing your first credit card to 'clean up' your credit.",
      question: "Should you close your oldest credit card account?",
      options: [
        "Yes, fewer accounts look better to lenders",
        "No, it would hurt your credit history length",
        "Only if it has an annual fee",
        "Yes, but only after opening a new card"
      ],
      correct: 1,
      explanation: "Closing your oldest account shortens your credit history, which can lower your score. Keep old accounts open if there's no annual fee.",
      scoreImpact: 25
    }
  ],
  badge: {
    title: "Credit Champion",
    icon: "🏆",
    description: "You've mastered the fundamentals of building and maintaining excellent credit!"
  }
};
