
export interface CreditFlashcard {
  id: string;
  term: string;
  definition: string;
}

export interface CreditQuiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface CreditDragDropActivity {
  instruction: string;
  items: { id: string; text: string; category: string }[];
  categories: { id: string; name: string }[];
}

export interface CreditScenario {
  question: string;
  context: string;
  options: string[];
  correct: number;
  explanation: string;
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
  quiz: CreditQuiz;
  activity?: CreditDragDropActivity;
  scenario?: CreditScenario;
  takeaway: string;
}

export interface CreditMiniGameScenario {
  step: number;
  question: string;
  context: string;
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
    description: string;
    icon: string;
  };
}

export const creditJourneyData: CreditLevel[] = [
  {
    id: 1,
    title: "What Is Credit?",
    description: "Understanding the basics of borrowing money",
    introCard: {
      title: "Credit is Trust in Action",
      content: "Credit is borrowed money you agree to pay back later. It's a tool — and it comes with responsibility."
    },
    flashcards: [
      {
        id: "credit-1",
        term: "Credit",
        definition: "Money borrowed from a lender that must be paid back, usually with interest."
      },
      {
        id: "credit-2",
        term: "Lender",
        definition: "A person or institution that loans money to borrowers."
      },
      {
        id: "credit-3",
        term: "Borrower",
        definition: "A person who receives money from a lender and agrees to pay it back."
      },
      {
        id: "credit-4",
        term: "Loan",
        definition: "An amount of money that is borrowed and expected to be paid back with interest."
      }
    ],
    quiz: {
      question: "What's another word for the person who gives you money to borrow?",
      options: ["Borrower", "Lender", "Creditor", "Bank Manager"],
      correct: 1,
      explanation: "A lender is the person or institution that provides money to borrowers."
    },
    scenario: {
      question: "Your phone breaks and you can't afford a new one. How could credit help or hurt?",
      context: "You need a phone for work and school, but a new one costs $600.",
      options: [
        "Use a credit card to buy it immediately",
        "Get a personal loan with high interest",
        "Save up for a few months first",
        "Buy a cheaper used phone with credit"
      ],
      correct: 3,
      explanation: "Saving up first avoids debt. If you must use credit, choose the most affordable option."
    },
    takeaway: "Credit is a tool - use it wisely and only when necessary."
  },
  {
    id: 2,
    title: "What Is a Credit Score?",
    description: "Your financial report card explained",
    introCard: {
      title: "Your Financial GPA",
      content: "A credit score is like a financial GPA. It shows how trustworthy you are with borrowed money."
    },
    flashcards: [
      {
        id: "score-1",
        term: "Credit Score",
        definition: "A three-digit number (300-850) that represents your creditworthiness."
      },
      {
        id: "score-2",
        term: "FICO",
        definition: "The most common credit scoring model, ranging from 300 to 850."
      },
      {
        id: "score-3",
        term: "Payment History",
        definition: "A record of whether you've paid your bills on time. Makes up 35% of your credit score."
      },
      {
        id: "score-4",
        term: "Credit Utilization",
        definition: "The percentage of available credit you're using. Ideally should be under 30%."
      },
      {
        id: "score-5",
        term: "Credit Report",
        definition: "A detailed report of your credit history, including accounts, payments, and inquiries."
      }
    ],
    quiz: {
      question: "Which of these is the biggest factor in your credit score?",
      options: ["Credit utilization", "Payment history", "Length of credit history", "Types of credit"],
      correct: 1,
      explanation: "Payment history makes up 35% of your credit score - the largest single factor."
    },
    scenario: {
      question: "You miss a credit card payment. What happens to your score?",
      context: "You forgot to pay your credit card bill and it's now 30 days late.",
      options: [
        "Nothing happens for the first missed payment",
        "Your score drops immediately by 100+ points",
        "Your score may drop by 60-100 points",
        "Only your credit limit is affected"
      ],
      correct: 2,
      explanation: "A 30-day late payment can cause your score to drop significantly, especially if you have good credit."
    },
    takeaway: "Payment history is the most important factor - always pay on time!"
  },
  {
    id: 3,
    title: "How to Build Credit",
    description: "Starting your credit journey the right way",
    introCard: {
      title: "Building Trust Takes Time",
      content: "You don't need to be rich to build credit — just consistent. It's all about showing lenders they can trust you."
    },
    flashcards: [
      {
        id: "build-1",
        term: "Authorized User",
        definition: "Someone added to another person's credit card account who can use the card."
      },
      {
        id: "build-2",
        term: "Student Credit Card",
        definition: "A credit card designed for students with limited credit history."
      },
      {
        id: "build-3",
        term: "Secured Card",
        definition: "A credit card backed by a cash deposit that serves as collateral."
      },
      {
        id: "build-4",
        term: "Credit Builder Loan",
        definition: "A loan designed to help people build credit by making on-time payments."
      }
    ],
    quiz: {
      question: "Which method helps you build credit using someone else's account?",
      options: ["Secured credit card", "Authorized user", "Student loan", "Personal loan"],
      correct: 1,
      explanation: "Becoming an authorized user on someone else's account can help build your credit history."
    },
    activity: {
      instruction: "Choose the best path to start building credit at age 18:",
      items: [
        { id: "path1", text: "Become an authorized user on parent's card", category: "good" },
        { id: "path2", text: "Apply for 5 credit cards at once", category: "bad" },
        { id: "path3", text: "Get a secured credit card", category: "good" },
        { id: "path4", text: "Take out a large personal loan", category: "bad" },
        { id: "path5", text: "Apply for a student credit card", category: "good" },
        { id: "path6", text: "Use only debit cards forever", category: "bad" }
      ],
      categories: [
        { id: "good", name: "Good Ways to Start" },
        { id: "bad", name: "Avoid These Methods" }
      ]
    },
    takeaway: "Start small and be patient - good credit takes time to build."
  },
  {
    id: 4,
    title: "What Hurts Your Credit?",
    description: "Avoiding the credit score killers",
    introCard: {
      title: "Protect Your Progress",
      content: "Good credit takes time to build — and seconds to damage. Let's avoid the traps."
    },
    flashcards: [
      {
        id: "hurt-1",
        term: "Late Payment",
        definition: "A payment made after the due date, which can negatively impact your credit score."
      },
      {
        id: "hurt-2",
        term: "Default",
        definition: "Failure to pay back a loan according to the agreed terms."
      },
      {
        id: "hurt-3",
        term: "Hard Inquiry",
        definition: "A credit check that occurs when you apply for credit and can temporarily lower your score."
      },
      {
        id: "hurt-4",
        term: "Maxing Out",
        definition: "Using all or most of your available credit limit."
      },
      {
        id: "hurt-5",
        term: "Collections",
        definition: "When unpaid debts are sold to collection agencies."
      }
    ],
    quiz: {
      question: "What happens if you max out your credit card and don't pay it off?",
      options: [
        "Your credit score improves",
        "Nothing happens to your score",
        "Your credit score drops significantly",
        "You get a higher credit limit"
      ],
      correct: 2,
      explanation: "High credit utilization can cause your credit score to drop significantly."
    },
    activity: {
      instruction: "Sort these habits into good or bad for your credit:",
      items: [
        { id: "habit1", text: "Paying bills on time every month", category: "good" },
        { id: "habit2", text: "Missing credit card payments", category: "bad" },
        { id: "habit3", text: "Keeping credit utilization under 30%", category: "good" },
        { id: "habit4", text: "Applying for multiple cards in one day", category: "bad" },
        { id: "habit5", text: "Checking your credit report regularly", category: "good" },
        { id: "habit6", text: "Ignoring credit card statements", category: "bad" }
      ],
      categories: [
        { id: "good", name: "Good Credit Habits" },
        { id: "bad", name: "Bad Credit Habits" }
      ]
    },
    takeaway: "Avoid late payments and high balances - these hurt your score the most."
  },
  {
    id: 5,
    title: "Using Credit Responsibly",
    description: "Smart habits for lifelong credit success",
    introCard: {
      title: "Credit is a Tool, Not Free Money",
      content: "Credit is a tool, not free money. Smart habits lead to better loans, apartments, and even jobs."
    },
    flashcards: [
      {
        id: "responsible-1",
        term: "Credit Limit",
        definition: "The maximum amount you can borrow on a credit card or line of credit."
      },
      {
        id: "responsible-2",
        term: "On-Time Payment",
        definition: "Making payments by or before the due date to maintain good credit."
      },
      {
        id: "responsible-3",
        term: "Utilization Ratio",
        definition: "The percentage of available credit you're using. Keep it under 30%."
      },
      {
        id: "responsible-4",
        term: "Annual Fee",
        definition: "A yearly charge for having a credit card, regardless of usage."
      },
      {
        id: "responsible-5",
        term: "APR",
        definition: "Annual Percentage Rate - the yearly interest rate charged on credit card balances."
      }
    ],
    quiz: {
      question: "How much of your credit limit should you use to maintain a good score?",
      options: ["Up to 90%", "Around 50%", "Less than 30%", "Exactly 100%"],
      correct: 2,
      explanation: "Keeping your credit utilization under 30% helps maintain a good credit score."
    },
    scenario: {
      question: "You get your first credit card with a $300 limit. What's the smart approach?",
      context: "You just received your first credit card with a $300 credit limit.",
      options: [
        "Spend the full $300 immediately",
        "Use it for small purchases and pay off monthly",
        "Keep it locked away and never use it",
        "Lend it to friends to help them out"
      ],
      correct: 1,
      explanation: "Using it for small purchases and paying the full balance monthly builds positive payment history."
    },
    takeaway: "Use credit wisely - small purchases, full payments, and patience build great credit."
  }
];

export const creditMiniGameData: CreditMiniGameData = {
  title: "Credit Score Builder Challenge",
  description: "Make smart financial decisions to build your credit score from 500 to 750+",
  startingScore: 500,
  targetScore: 750,
  scenarios: [
    {
      step: 1,
      question: "You just got your first credit card. What should you do first?",
      context: "You're 18 and just received your first credit card with a $500 limit.",
      options: [
        "Go shopping and spend $400 right away",
        "Make a small purchase and pay it off immediately",
        "Let it sit unused in your wallet",
        "Give it to a friend to help them buy something"
      ],
      correct: 1,
      explanation: "Making small purchases and paying them off immediately starts building positive payment history.",
      scoreImpact: 50
    },
    {
      step: 2,
      question: "It's time to pay your credit card bill. What's the best strategy?",
      context: "You have a $50 balance on your card and the minimum payment is $15.",
      options: [
        "Pay only the minimum ($15)",
        "Pay the full balance ($50)",
        "Skip this payment since it's small",
        "Pay $25 and carry a small balance"
      ],
      correct: 1,
      explanation: "Paying the full balance avoids interest charges and shows responsible credit management.",
      scoreImpact: 40
    },
    {
      step: 3,
      question: "You want to buy a $200 item but only have $50 in cash. What should you do?",
      context: "Your credit card has a $500 limit with currently no balance.",
      options: [
        "Put it all on the credit card and pay minimum payments",
        "Save up the remaining $150 first",
        "Use the credit card but pay it off within a month",
        "Ask friends to lend you money instead"
      ],
      correct: 2,
      explanation: "Using credit responsibly means having a plan to pay it off quickly.",
      scoreImpact: 30
    },
    {
      step: 4,
      question: "You've been managing credit well for 6 months. A store offers you another credit card with rewards. Should you apply?",
      context: "You have one credit card that you manage well. A store offers 10% off if you open their card.",
      options: [
        "Apply immediately for the discount",
        "Research the terms first, then decide",
        "Apply for multiple store cards for more discounts",
        "Never get another credit card"
      ],
      correct: 1,
      explanation: "Research is key. Too many applications can hurt your score, but a second card might help if managed well.",
      scoreImpact: 35
    },
    {
      step: 5,
      question: "Your credit limit was increased from $500 to $1,000. How should you adjust your spending?",
      context: "Your credit card company raised your limit due to good payment history.",
      options: [
        "Start spending up to the new limit",
        "Keep spending the same amount as before",
        "Cancel the card since you don't need the higher limit",
        "Use exactly half of the new limit"
      ],
      correct: 1,
      explanation: "A higher limit improves your utilization ratio if you maintain the same spending level.",
      scoreImpact: 45
    }
  ],
  badge: {
    title: "Credit Champ",
    description: "You've mastered the fundamentals of building and maintaining excellent credit!",
    icon: "🏆"
  }
};
