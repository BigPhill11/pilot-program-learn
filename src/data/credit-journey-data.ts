
export interface CreditLevel {
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
  };
}

export const creditJourneyData: CreditLevel[] = [
  {
    id: 1,
    title: "What is Credit?",
    description: "Understanding the fundamentals of credit and how it works",
    introCard: "Credit is essentially borrowed money that you promise to pay back. Understanding how credit works is crucial for your financial future, affecting everything from apartment rentals to loan rates.",
    flashcards: [
      {
        term: "Credit",
        definition: "The ability to borrow money or access goods/services with the promise to pay back later, often with interest."
      },
      {
        term: "Credit Score",
        definition: "A three-digit number (300-850) that represents your creditworthiness based on your credit history."
      },
      {
        term: "Credit Report",
        definition: "A detailed record of your credit history, including accounts, payment history, and credit inquiries."
      },
      {
        term: "Creditworthiness",
        definition: "A lender's assessment of how likely you are to repay borrowed money based on your financial history."
      }
    ],
    quiz: {
      question: "What does a higher credit score typically mean?",
      options: [
        "You're more likely to be approved for loans with better terms",
        "You have more money in your bank account",
        "You spend more money monthly",
        "You have a higher income"
      ],
      correctAnswer: 0,
      explanation: "A higher credit score indicates you're a lower-risk borrower, leading to better loan terms and interest rates."
    },
    challenge: {
      description: "Your friend wants to rent an apartment but has no credit history.",
      question: "What advice would you give them?",
      options: [
        "Start building credit now with a secured card or become an authorized user",
        "Don't worry about credit, it's not important",
        "Only use cash for everything",
        "Wait until you're 30 to think about credit"
      ],
      correctAnswer: 0
    }
  },
  {
    id: 2,
    title: "Credit Reports & Scores",
    description: "Learn how credit reports are created and what affects your credit score",
    introCard: "Your credit report is like your financial report card. It tracks your borrowing history and payment behavior, which determines your credit score.",
    flashcards: [
      {
        term: "FICO Score",
        definition: "The most common credit scoring model, ranging from 300-850, used by most lenders to assess credit risk."
      },
      {
        term: "Credit Bureau",
        definition: "Companies (Experian, Equifax, TransUnion) that collect and maintain credit information on consumers."
      },
      {
        term: "Hard Inquiry",
        definition: "A credit check that occurs when you apply for credit, which can temporarily lower your credit score."
      },
      {
        term: "Soft Inquiry",
        definition: "A credit check that doesn't affect your score, like checking your own credit or pre-qualification offers."
      }
    ],
    quiz: {
      question: "How often should you check your credit report?",
      options: [
        "Never, it will hurt your score",
        "At least once per year from each credit bureau",
        "Only when applying for a loan",
        "Every day"
      ],
      correctAnswer: 1,
      explanation: "You should check your credit report at least annually from each bureau to monitor for errors and identity theft."
    },
    challenge: {
      description: "You notice an error on your credit report - a credit card you never opened.",
      question: "What should you do first?",
      options: [
        "Ignore it, errors fix themselves",
        "File a dispute with the credit bureau immediately",
        "Wait to see if it affects your score",
        "Pay the debt to avoid problems"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 3,
    title: "Building Credit from Scratch",
    description: "Practical strategies for establishing your first credit history",
    introCard: "Starting your credit journey can seem overwhelming, but there are several safe and effective ways to begin building a positive credit history.",
    flashcards: [
      {
        term: "Secured Credit Card",
        definition: "A credit card backed by a cash deposit that serves as your credit limit, perfect for building credit."
      },
      {
        term: "Authorized User",
        definition: "Someone added to another person's credit card account who can use the card but isn't responsible for payments."
      },
      {
        term: "Credit Builder Loan",
        definition: "A small loan designed specifically to help people build credit history, where you pay first then receive the money."
      },
      {
        term: "Student Credit Card",
        definition: "Credit cards designed for students with no credit history, often with lower credit limits and educational resources."
      }
    ],
    quiz: {
      question: "What's the safest way for a student to start building credit?",
      options: [
        "Apply for multiple credit cards at once",
        "Get a secured credit card or become an authorized user",
        "Take out a large personal loan",
        "Only use debit cards"
      ],
      correctAnswer: 1,
      explanation: "Secured cards and authorized user status are low-risk ways to start building credit history responsibly."
    },
    challenge: {
      description: "You're 18 with no credit history and want to start building credit responsibly.",
      question: "Which strategy would be most effective?",
      options: [
        "Wait until you have a full-time job",
        "Start with a secured card, make small purchases, and pay in full monthly",
        "Apply for store credit cards at every retailer",
        "Only focus on debit cards and cash"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 4,
    title: "Managing Credit Responsibly",
    description: "Best practices for maintaining and improving your credit score",
    introCard: "Having credit is just the beginning. Managing it responsibly is what builds a strong credit score and opens financial opportunities.",
    flashcards: [
      {
        term: "Payment History",
        definition: "The record of whether you make credit payments on time, which makes up 35% of your credit score."
      },
      {
        term: "Credit Utilization",
        definition: "The percentage of available credit you're using, ideally kept below 30% and preferably under 10%."
      },
      {
        term: "Credit Mix",
        definition: "Having different types of credit accounts (cards, auto loans, etc.) which can positively impact your score."
      },
      {
        term: "Length of Credit History",
        definition: "How long you've had credit accounts open, which accounts for 15% of your credit score."
      }
    ],
    quiz: {
      question: "If you have a $1,000 credit limit, what's the maximum balance you should carry to maintain good credit utilization?",
      options: ["$500", "$300", "$100", "$1,000"],
      correctAnswer: 1,
      explanation: "Keeping utilization below 30% ($300) is recommended, but below 10% ($100) is even better for your credit score."
    },
    challenge: {
      description: "You have two credit cards: one with $500 limit and $150 balance, another with $1,000 limit and $200 balance.",
      question: "What's your overall credit utilization ratio?",
      options: ["23%", "35%", "20%", "30%"],
      correctAnswer: 0
    }
  },
  {
    id: 5,
    title: "Credit Mistakes to Avoid",
    description: "Common pitfalls that can damage your credit and how to avoid them",
    introCard: "Learning what NOT to do with credit is just as important as learning best practices. Avoid these common mistakes that can hurt your credit score.",
    flashcards: [
      {
        term: "Minimum Payment",
        definition: "The smallest amount you must pay monthly to keep your account current, but paying only this leads to interest charges."
      },
      {
        term: "Credit Card Debt",
        definition: "Money owed on credit cards that carries high interest rates, often 15-25% annually."
      },
      {
        term: "Late Payment Fee",
        definition: "A penalty charge for making credit card payments after the due date, typically $25-$40."
      },
      {
        term: "Account Closure",
        definition: "Closing a credit account, which can hurt your credit score by reducing available credit and shortening credit history."
      }
    ],
    quiz: {
      question: "What's the biggest mistake people make with their first credit card?",
      options: [
        "Checking their credit score too often",
        "Only making minimum payments and carrying a balance",
        "Using it for small purchases",
        "Paying the full balance every month"
      ],
      correctAnswer: 1,
      explanation: "Making only minimum payments leads to expensive interest charges and potential debt problems."
    },
    challenge: {
      description: "Your friend maxed out their $2,000 credit card and only makes minimum payments of $50/month with 22% APR.",
      question: "What would you advise them?",
      options: [
        "Continue minimum payments, it's fine",
        "Pay as much as possible above minimum to reduce interest",
        "Close the card immediately",
        "Apply for more credit cards"
      ],
      correctAnswer: 1
    }
  }
];

export const creditMiniGame = {
  title: "Credit Score Simulator",
  description: "Make financial decisions and see how they affect your credit score!",
  initialScore: 650,
  scenarios: [
    {
      id: 1,
      situation: "You have a $500 credit card bill due tomorrow but only $200 in your account.",
      options: [
        { text: "Pay $200 now, rest next week", scoreChange: -15 },
        { text: "Pay minimum $25 only", scoreChange: -5 },
        { text: "Skip payment this month", scoreChange: -30 },
        { text: "Ask family for help to pay full amount", scoreChange: +5 }
      ]
    },
    {
      id: 2,
      situation: "You want to buy a $800 laptop and have a $1,000 credit limit with $100 current balance.",
      options: [
        { text: "Charge it all to the card", scoreChange: -20 },
        { text: "Save up and pay cash", scoreChange: +10 },
        { text: "Charge half, pay half cash", scoreChange: -5 },
        { text: "Apply for a new card with higher limit", scoreChange: -10 }
      ]
    }
  ]
};
