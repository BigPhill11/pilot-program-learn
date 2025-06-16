
export interface BigPurchasesLevel {
  id: number;
  title: string;
  description: string;
  flashcards: FlashcardData[];
  quiz: QuizData;
  activity?: DragDropActivity;
}

export interface FlashcardData {
  term: string;
  definition: string;
}

export interface QuizData {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedbackForIncorrect?: string;
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

export const bigPurchasesJourneyData: BigPurchasesLevel[] = [
  {
    id: 1,
    title: "Buying a Car",
    description: "Learn the basics of car purchasing, from loans to insurance to total cost of ownership.",
    flashcards: [
      {
        term: "Lease",
        definition: "A long-term rental agreement where you pay monthly to use a car but don't own it."
      },
      {
        term: "Car Loan",
        definition: "Money borrowed from a bank or dealer to buy a car, paid back with interest over time."
      },
      {
        term: "APR (Annual Percentage Rate)",
        definition: "The yearly cost of a loan, including interest and fees, expressed as a percentage."
      },
      {
        term: "Total Cost of Ownership",
        definition: "All expenses of owning a car: purchase price, insurance, gas, maintenance, and repairs."
      },
      {
        term: "Depreciation",
        definition: "How much a car loses value over time - new cars lose value faster than used ones."
      }
    ],
    quiz: {
      question: "What's the main advantage of buying a used car over a new car?",
      options: [
        "Better warranty coverage",
        "Latest technology features", 
        "Lower depreciation and cost",
        "Higher resale value"
      ],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "Used cars have already taken their biggest depreciation hit, making them more affordable and cost-effective."
    },
    activity: {
      instruction: "Sort these car-buying considerations into 'One-Time Costs' vs 'Ongoing Costs':",
      items: [
        { id: "1", text: "Down Payment", category: "one-time" },
        { id: "2", text: "Monthly Insurance", category: "ongoing" },
        { id: "3", text: "Registration Fees", category: "one-time" },
        { id: "4", text: "Gas", category: "ongoing" },
        { id: "5", text: "Sales Tax", category: "one-time" },
        { id: "6", text: "Oil Changes", category: "ongoing" }
      ],
      categories: [
        { id: "one-time", name: "One-Time Costs" },
        { id: "ongoing", name: "Ongoing Costs" }
      ]
    }
  },
  {
    id: 2,
    title: "Buying or Renting a Home",
    description: "Understand mortgages, down payments, and the costs of homeownership vs renting.",
    flashcards: [
      {
        term: "Mortgage",
        definition: "A loan to buy a house, where the house itself serves as collateral for the loan."
      },
      {
        term: "Down Payment",
        definition: "Money paid upfront when buying a house, typically 10-20% of the home's price."
      },
      {
        term: "Escrow",
        definition: "Money held by a third party to pay property taxes and insurance on your behalf."
      },
      {
        term: "HOA Fees",
        definition: "Monthly fees paid to a homeowners association for community maintenance and amenities."
      },
      {
        term: "PMI (Private Mortgage Insurance)",
        definition: "Insurance you pay if your down payment is less than 20% of the home's value."
      }
    ],
    quiz: {
      question: "What's typically required as a down payment for a first-time home buyer?",
      options: [
        "5-10% of home price",
        "10-20% of home price",
        "25-30% of home price",
        "50% of home price"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Most lenders require 10-20% down, though some first-time buyer programs allow as little as 3-5%."
    },
    activity: {
      instruction: "Categorize these housing costs as 'Renting' or 'Buying':",
      items: [
        { id: "1", text: "Monthly Rent", category: "renting" },
        { id: "2", text: "Property Taxes", category: "buying" },
        { id: "3", text: "Security Deposit", category: "renting" },
        { id: "4", text: "Home Insurance", category: "buying" },
        { id: "5", text: "Renter's Insurance", category: "renting" },
        { id: "6", text: "Mortgage Payment", category: "buying" }
      ],
      categories: [
        { id: "renting", name: "Renting Costs" },
        { id: "buying", name: "Buying Costs" }
      ]
    }
  },
  {
    id: 3,
    title: "Credit's Role in Big Purchases",
    description: "Learn how your credit score affects loan terms and interest rates for major purchases.",
    flashcards: [
      {
        term: "Credit Score Impact",
        definition: "Higher credit scores get lower interest rates, saving thousands on big purchases."
      },
      {
        term: "Pre-approval",
        definition: "Getting approved for a loan amount before shopping, showing sellers you're a serious buyer."
      },
      {
        term: "Interest Rate",
        definition: "The cost of borrowing money, expressed as a yearly percentage of the loan amount."
      },
      {
        term: "Loan Term",
        definition: "How long you have to pay back a loan - longer terms mean lower monthly payments but more interest."
      },
      {
        term: "Debt-to-Income Ratio",
        definition: "How much of your monthly income goes to debt payments - lenders want this below 36%."
      }
    ],
    quiz: {
      question: "How much can a good credit score save you on a $20,000 car loan?",
      options: [
        "$100-200 total",
        "$500-1,000 total", 
        "$1,000-3,000 total",
        "$5,000+ total"
      ],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "A good credit score can save you $1,000-3,000 or more over the life of a car loan through lower interest rates."
    }
  },
  {
    id: 4,
    title: "Comparing Prices & Offers",
    description: "Develop negotiation skills and learn to compare total costs, not just monthly payments.",
    flashcards: [
      {
        term: "Negotiation",
        definition: "The process of discussing terms to reach a mutually acceptable agreement on price."
      },
      {
        term: "MSRP",
        definition: "Manufacturer's Suggested Retail Price - the 'sticker price' before any discounts or negotiations."
      },
      {
        term: "Trade-in Value",
        definition: "How much a dealer will pay for your old car when you buy a new one."
      },
      {
        term: "Closing Costs",
        definition: "Fees paid when finalizing a home purchase, typically 2-5% of the home's price."
      },
      {
        term: "Total Cost",
        definition: "The complete amount you'll pay including price, taxes, fees, and interest over time."
      }
    ],
    quiz: {
      question: "When comparing car deals, what's most important to focus on?",
      options: [
        "Monthly payment amount",
        "Total cost over loan term",
        "Down payment required",
        "Warranty length"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Focus on total cost - dealers can manipulate monthly payments by extending loan terms, costing you more overall."
    },
    activity: {
      instruction: "Sort these into 'Good Negotiation Tactics' vs 'Things to Avoid':",
      items: [
        { id: "1", text: "Research market prices first", category: "good" },
        { id: "2", text: "Focus only on monthly payments", category: "avoid" },
        { id: "3", text: "Get pre-approved for financing", category: "good" },
        { id: "4", text: "Accept the first offer", category: "avoid" },
        { id: "5", text: "Compare multiple dealers", category: "good" },
        { id: "6", text: "Make decisions under pressure", category: "avoid" }
      ],
      categories: [
        { id: "good", name: "Good Negotiation Tactics" },
        { id: "avoid", name: "Things to Avoid" }
      ]
    }
  },
  {
    id: 5,
    title: "What to Watch Out For",
    description: "Learn to spot common traps and red flags in contracts and financing offers.",
    flashcards: [
      {
        term: "Balloon Payment",
        definition: "A large final payment due at the end of a loan term - often a trap for buyers."
      },
      {
        term: "Extended Warranty",
        definition: "Additional coverage beyond the standard warranty - often overpriced and unnecessary."
      },
      {
        term: "Predatory Lending",
        definition: "Unfair loan practices that take advantage of borrowers with high fees and rates."
      },
      {
        term: "Fine Print",
        definition: "Important contract details written in small text that many people skip reading."
      },
      {
        term: "Cooling-off Period",
        definition: "Time after signing a contract when you can cancel without penalty - rare for cars, common for homes."
      }
    ],
    quiz: {
      question: "What should you do if a salesperson pressures you to 'sign today or lose the deal'?",
      options: [
        "Sign immediately to get the deal",
        "Ask for time to think it over",
        "Negotiate for a better price first",
        "Bring a friend for support"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "High-pressure tactics are a red flag. Legitimate deals will still be available after you've had time to consider them carefully."
    }
  }
];
