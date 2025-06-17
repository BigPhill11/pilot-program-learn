
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

export interface BigPurchasesQuiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedbackForIncorrect: string;
}

export interface BigPurchasesLevel {
  id: number;
  title: string;
  description: string;
  flashcards: BigPurchasesFlashcard[];
  quiz: BigPurchasesQuiz;
  activity?: DragDropActivity;
}

export const bigPurchasesJourneyData: BigPurchasesLevel[] = [
  {
    id: 1,
    title: "Buying a Car 101",
    description: "Learn the full cost of car ownership beyond the sticker price",
    flashcards: [
      {
        term: "Down Payment",
        definition: "An upfront payment made when purchasing a car, typically 10-20% of the total price"
      },
      {
        term: "Auto Loan",
        definition: "Money borrowed from a lender to purchase a vehicle, paid back with interest over time"
      },
      {
        term: "Interest Rate",
        definition: "The percentage charged by a lender for borrowing money, affects your monthly payment"
      },
      {
        term: "Car Insurance",
        definition: "Required coverage that protects you financially if your car is damaged or causes damage"
      },
      {
        term: "Lease vs. Buy",
        definition: "Leasing means paying to use a car temporarily; buying means owning it outright"
      }
    ],
    quiz: {
      question: "Which cost is recurring after buying a car?",
      options: [
        "Down payment",
        "Car insurance",
        "Sales tax",
        "Registration fee"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Insurance is a monthly expense you'll pay as long as you own the car, while down payment, sales tax, and registration are one-time costs."
    },
    activity: {
      instruction: "Sort these car costs into one-time or recurring expenses:",
      items: [
        { id: "1", text: "Down Payment", category: "one-time" },
        { id: "2", text: "Monthly Insurance", category: "recurring" },
        { id: "3", text: "Gas", category: "recurring" },
        { id: "4", text: "Sales Tax", category: "one-time" },
        { id: "5", text: "Oil Changes", category: "recurring" },
        { id: "6", text: "Registration Fee", category: "one-time" }
      ],
      categories: [
        { id: "one-time", name: "One-Time Costs" },
        { id: "recurring", name: "Recurring Costs" }
      ]
    }
  },
  {
    id: 2,
    title: "Renting or Buying a Home",
    description: "Compare the true costs of renting vs. buying a home",
    flashcards: [
      {
        term: "Rent",
        definition: "Monthly payment to live in someone else's property without owning it"
      },
      {
        term: "Mortgage",
        definition: "A loan used to buy a home, paid back over 15-30 years with interest"
      },
      {
        term: "Security Deposit",
        definition: "Refundable money paid upfront when renting to cover potential damages"
      },
      {
        term: "Property Tax",
        definition: "Annual tax homeowners pay based on their property's value"
      },
      {
        term: "HOA Fees",
        definition: "Monthly fees paid to a homeowners association for community maintenance and amenities"
      }
    ],
    quiz: {
      question: "Which cost do renters pay up front but may get back?",
      options: [
        "First month's rent",
        "Security deposit",
        "Application fee",
        "Utility deposit"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Security deposits are refundable if you don't damage the property, while other upfront costs are not returned."
    },
    activity: {
      instruction: "Match these housing costs to renters or homeowners:",
      items: [
        { id: "1", text: "Property Tax", category: "homeowner" },
        { id: "2", text: "Security Deposit", category: "renter" },
        { id: "3", text: "Homeowners Insurance", category: "homeowner" },
        { id: "4", text: "Rent", category: "renter" },
        { id: "5", text: "Mortgage Payment", category: "homeowner" },
        { id: "6", text: "Renters Insurance", category: "renter" }
      ],
      categories: [
        { id: "renter", name: "Renter Costs" },
        { id: "homeowner", name: "Homeowner Costs" }
      ]
    }
  },
  {
    id: 3,
    title: "How Credit Affects Big Purchases",
    description: "Understand how your credit score impacts the cost of major purchases",
    flashcards: [
      {
        term: "Credit Score",
        definition: "A number (300-850) that shows lenders how likely you are to repay borrowed money"
      },
      {
        term: "APR",
        definition: "Annual Percentage Rate - the total yearly cost of borrowing money, including interest and fees"
      },
      {
        term: "Loan Term",
        definition: "The length of time you have to pay back a loan, typically 3-7 years for cars"
      },
      {
        term: "Pre-Approval",
        definition: "Getting approved for a loan amount before shopping, showing sellers you're a serious buyer"
      },
      {
        term: "Down Payment",
        definition: "Money paid upfront that reduces the amount you need to borrow"
      }
    ],
    quiz: {
      question: "What is APR?",
      options: [
        "The sticker price of a car",
        "Annual Percentage Rate (total cost of borrowing)",
        "The amount of your down payment",
        "Your monthly payment amount"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "APR includes both interest and fees, giving you the true annual cost of borrowing money."
    }
  },
  {
    id: 4,
    title: "Smart Comparison Shopping",
    description: "Learn to compare deals and negotiate like a pro",
    flashcards: [
      {
        term: "Sticker Price",
        definition: "The advertised price on a car or item, often negotiable"
      },
      {
        term: "MSRP",
        definition: "Manufacturer's Suggested Retail Price - the price the manufacturer recommends"
      },
      {
        term: "Negotiation",
        definition: "The process of discussing terms to reach a mutually acceptable deal"
      },
      {
        term: "Total Cost of Ownership",
        definition: "All costs of owning something over its lifetime: purchase price, maintenance, insurance, etc."
      },
      {
        term: "Financing",
        definition: "Using borrowed money to make a purchase, then paying it back over time with interest"
      }
    ],
    quiz: {
      question: "What's one tactic to lower a car's price?",
      options: [
        "Pay the sticker price immediately",
        "Negotiate below MSRP",
        "Only look at the monthly payment",
        "Skip the test drive"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Most car prices are negotiable. Research the car's value and don't be afraid to negotiate below the asking price."
    },
    activity: {
      instruction: "Identify smart shopping strategies vs. poor strategies:",
      items: [
        { id: "1", text: "Compare 3+ options", category: "smart" },
        { id: "2", text: "Buy the first thing you see", category: "poor" },
        { id: "3", text: "Research market prices", category: "smart" },
        { id: "4", text: "Focus only on monthly payment", category: "poor" },
        { id: "5", text: "Get pre-approved for financing", category: "smart" },
        { id: "6", text: "Skip reading reviews", category: "poor" }
      ],
      categories: [
        { id: "smart", name: "Smart Strategy" },
        { id: "poor", name: "Poor Strategy" }
      ]
    }
  },
  {
    id: 5,
    title: "Reading the Fine Print & Avoiding Traps",
    description: "Spot red flags in contracts and protect yourself from bad deals",
    flashcards: [
      {
        term: "Balloon Payment",
        definition: "A large final payment due at the end of a loan term, often a trap for unprepared buyers"
      },
      {
        term: "Warranty",
        definition: "A guarantee that covers repairs or replacements for a specific time period"
      },
      {
        term: "Early Termination Fee",
        definition: "A penalty for ending a contract before the agreed-upon time"
      },
      {
        term: "Fine Print",
        definition: "Important details written in small text that can significantly affect your agreement"
      },
      {
        term: "Loan Agreement",
        definition: "The legal contract that outlines all terms, payments, and conditions of your loan"
      }
    ],
    quiz: {
      question: "Which of these is a warning sign in a loan contract?",
      options: [
        "Clear payment schedule",
        "Balloon payment",
        "Fixed interest rate",
        "Written warranty"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Balloon payments can be a trap because they require a large sum at the end, which many people can't afford."
    },
    activity: {
      instruction: "Identify red flags vs. good signs in contracts:",
      items: [
        { id: "1", text: "Hidden fees", category: "red-flag" },
        { id: "2", text: "Clear payment terms", category: "good-sign" },
        { id: "3", text: "Pressure to sign today", category: "red-flag" },
        { id: "4", text: "Written warranty", category: "good-sign" },
        { id: "5", text: "Balloon payment", category: "red-flag" },
        { id: "6", text: "Right to cancel", category: "good-sign" }
      ],
      categories: [
        { id: "red-flag", name: "Red Flags" },
        { id: "good-sign", name: "Good Signs" }
      ]
    }
  }
];
