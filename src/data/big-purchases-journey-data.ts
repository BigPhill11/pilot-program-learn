export interface BigPurchasesFlashcard {
  term: string;
  definition: string;
}

export interface DragDropActivity {
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

export interface BigPurchasesLevel {
  id: number;
  title: string;
  description: string;
  flashcards: BigPurchasesFlashcard[];
  quiz: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    feedbackForIncorrect: string;
  };
  activity?: DragDropActivity;
}

export interface BigPurchasesMiniGame {
  title: string;
  description: string;
  scenarios: Array<{
    id: string;
    situation: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    outcome: string;
  }>;
}

export const bigPurchasesJourneyData: BigPurchasesLevel[] = [
  {
    id: 1,
    title: "Planning for Big Purchases",
    description: "Learn how to prepare financially for major expenses",
    flashcards: [
      {
        term: "Big Purchase",
        definition: "A significant expense that requires planning and saving, typically over $1,000"
      },
      {
        term: "Sinking Fund",
        definition: "Money saved gradually for a specific future expense"
      },
      {
        term: "Purchase Timeline",
        definition: "The planned timeframe for making a major purchase"
      }
    ],
    quiz: {
      question: "What's the best approach for a big purchase you need in 2 years?",
      options: [
        "Put it on a credit card when needed",
        "Take out a personal loan",
        "Start saving monthly now",
        "Wait until you have extra money"
      ],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "Starting to save monthly gives you time to accumulate funds without debt."
    }
  },
  {
    id: 2,
    title: "Researching Before You Buy",
    description: "How to research and compare options for major purchases",
    flashcards: [
      {
        term: "Total Cost of Ownership",
        definition: "The complete cost including purchase price, maintenance, and operating costs"
      },
      {
        term: "Depreciation",
        definition: "The decrease in an item's value over time"
      },
      {
        term: "Warranty",
        definition: "A guarantee covering repair or replacement for a specific period"
      }
    ],
    quiz: {
      question: "When buying a car, what should you consider besides the purchase price?",
      options: [
        "Only the monthly payment",
        "Insurance, maintenance, and fuel costs",
        "Just the brand reputation",
        "The color and features"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Total cost of ownership includes insurance, maintenance, fuel, and depreciation - not just the purchase price."
    }
  },
  {
    id: 3,
    title: "Financing Options",
    description: "Understanding different ways to pay for big purchases",
    flashcards: [
      {
        term: "Down Payment",
        definition: "An upfront payment made when purchasing something with financing"
      },
      {
        term: "Interest Rate",
        definition: "The cost of borrowing money, expressed as a percentage"
      },
      {
        term: "Loan Term",
        definition: "The length of time you have to repay a loan"
      },
      {
        term: "Monthly Payment",
        definition: "The amount you pay each month toward a loan"
      }
    ],
    quiz: {
      question: "How does a larger down payment affect your loan?",
      options: [
        "It increases your monthly payments",
        "It has no effect on the loan",
        "It reduces the amount you need to borrow",
        "It increases the interest rate"
      ],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "A larger down payment reduces the loan amount, which typically means lower monthly payments and less interest paid overall."
    },
    activity: {
      instruction: "Sort these financing options by their typical interest rates (lowest to highest):",
      items: [
        { id: "mortgage", text: "Home mortgage", category: "lowest" },
        { id: "auto", text: "Auto loan", category: "medium" },
        { id: "personal", text: "Personal loan", category: "high" },
        { id: "credit", text: "Credit card", category: "highest" }
      ],
      categories: [
        { id: "lowest", name: "Lowest Interest" },
        { id: "medium", name: "Medium Interest" },
        { id: "high", name: "Higher Interest" },
        { id: "highest", name: "Highest Interest" }
      ]
    }
  },
  {
    id: 4,
    title: "Negotiation Strategies",
    description: "Learn how to negotiate better deals on major purchases",
    flashcards: [
      {
        term: "MSRP",
        definition: "Manufacturer's Suggested Retail Price - the recommended selling price"
      },
      {
        term: "Trade-in Value",
        definition: "The amount a dealer will pay for your current item toward a new purchase"
      },
      {
        term: "Market Research",
        definition: "Investigating current prices and deals for similar items"
      }
    ],
    quiz: {
      question: "What's the most important preparation for negotiating a big purchase?",
      options: [
        "Bringing cash to pay in full",
        "Researching market prices and alternatives",
        "Going to multiple stores in one day",
        "Bringing a friend for support"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Knowledge is power in negotiations. Knowing market prices and alternatives gives you leverage."
    }
  },
  {
    id: 5,
    title: "Timing Your Purchase",
    description: "When to buy for the best deals and financial impact",
    flashcards: [
      {
        term: "Seasonal Sales",
        definition: "Regular sales periods when certain items are discounted"
      },
      {
        term: "Model Year End",
        definition: "When new models are released and previous years go on sale"
      },
      {
        term: "Emergency Purchase",
        definition: "An unplanned purchase needed immediately, often at higher cost"
      }
    ],
    quiz: {
      question: "When is typically the best time to buy a car?",
      options: [
        "Right when you need it",
        "End of the model year or calendar year",
        "Beginning of spring",
        "During summer"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "End of model year and calendar year often bring the best deals as dealers clear inventory."
    }
  }
];

export const bigPurchasesMiniGame: BigPurchasesMiniGame = {
  title: "Smart Purchase Simulator",
  description: "Make smart decisions in realistic big purchase scenarios",
  scenarios: [
    {
      id: "car-scenario",
      situation: "Your 10-year-old car needs $3,000 in repairs, but you could buy a reliable used car for $12,000.",
      question: "What's the smartest financial decision?",
      options: [
        "Fix the old car - it's always cheaper",
        "Buy the new car immediately",
        "Compare repair costs to car payments and reliability",
        "Keep driving and hope for the best"
      ],
      correctAnswer: 2,
      explanation: "Compare the ongoing costs and reliability. If repairs are frequent and expensive, a newer car might be more cost-effective long-term.",
      outcome: "By analyzing total costs, you make a decision based on financial facts, not emotions."
    }
  ]
};
