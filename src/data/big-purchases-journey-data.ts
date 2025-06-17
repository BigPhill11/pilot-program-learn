
export interface BigPurchasesLevel {
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
    correctAnswerIndex: number;
    feedbackForIncorrect: string;
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

export const bigPurchasesJourneyData: BigPurchasesLevel[] = [
  {
    id: 1,
    title: "Planning Big Purchases",
    description: "Learn the fundamentals of preparing for major expenses",
    introCard: "Big purchases require big planning! Whether it's a car, home, or expensive gadget, smart planning prevents financial stress and buyer's remorse.",
    flashcards: [
      {
        term: "Big Purchase",
        definition: "Any significant expense that's more than your typical monthly spending, usually requiring savings or financing."
      },
      {
        term: "Purchase Planning",
        definition: "Researching, budgeting, and preparing financially before making a major buying decision."
      },
      {
        term: "Total Cost of Ownership",
        definition: "The complete cost of an item including purchase price, maintenance, insurance, and operating expenses over time."
      },
      {
        term: "Opportunity Cost",
        definition: "What you give up when making a purchase decision - the best alternative use of that money."
      }
    ],
    quiz: {
      question: "Why is it important to consider total cost of ownership when making big purchases?",
      options: [
        "To impress salespeople with your knowledge",
        "To understand the true long-term financial impact",
        "To make purchases more complicated",
        "It's not important, only focus on purchase price"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Total cost of ownership helps you understand the true financial impact beyond just the purchase price."
    },
    challenge: {
      description: "You're considering buying a $5,000 used car. Insurance will cost $150/month, maintenance about $100/month.",
      question: "What's the total first-year cost of ownership?",
      options: ["$5,000", "$8,000", "$6,800", "$7,500"],
      correctAnswer: 1
    }
  },
  {
    id: 2,
    title: "Saving vs. Financing",
    description: "Understanding when to save up versus when to finance major purchases",
    introCard: "Should you save up or finance your big purchase? The answer depends on the item, interest rates, and your financial situation. Let's explore both strategies.",
    flashcards: [
      {
        term: "Cash Purchase",
        definition: "Buying something outright with saved money, avoiding debt and interest payments."
      },
      {
        term: "Financing",
        definition: "Borrowing money to make a purchase, then paying it back over time with interest."
      },
      {
        term: "Interest Rate",
        definition: "The cost of borrowing money, expressed as a percentage of the loan amount annually."
      },
      {
        term: "Down Payment",
        definition: "An upfront cash payment when financing, reducing the loan amount and often getting better terms."
      }
    ],
    quiz: {
      question: "When might financing be a better choice than saving up for a purchase?",
      options: [
        "Never, cash is always better",
        "When you can get 0% interest financing",
        "When the item is going out of style",
        "When you want instant gratification"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "0% financing can be beneficial since you keep your cash for other needs while paying no interest."
    },
    challenge: {
      description: "You want a $1,200 laptop. You can save $200/month or finance at 12% APR for 12 months.",
      question: "How much would you save by paying cash instead of financing?",
      options: ["$0", "$79", "$144", "$200"],
      correctAnswer: 1
    }
  },
  {
    id: 3,
    title: "Car Buying Basics",
    description: "Navigate the car buying process like a pro",
    introCard: "Buying a car is often the first major purchase people make. Learn how to research, negotiate, and get the best deal whether buying new or used.",
    flashcards: [
      {
        term: "Kelley Blue Book (KBB)",
        definition: "A trusted resource for determining fair market value of vehicles based on make, model, year, and condition."
      },
      {
        term: "Pre-approval",
        definition: "Getting approved for a loan amount before shopping, giving you negotiating power and a clear budget."
      },
      {
        term: "Trade-in Value",
        definition: "The amount a dealer will pay for your current vehicle when purchasing a new one."
      },
      {
        term: "Vehicle History Report",
        definition: "A record showing accidents, ownership history, and maintenance for a used car (like Carfax)."
      }
    ],
    quiz: {
      question: "What's the first step when buying a used car?",
      options: [
        "Go to the nearest dealership",
        "Research the car's value and history",
        "Get the cheapest option available",
        "Focus only on monthly payment"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Research helps you understand fair pricing and avoid problematic vehicles."
    },
    activity: {
      title: "Car Buying Checklist",
      instruction: "Put these car buying steps in the correct order:",
      items: [
        { id: "research", text: "Research makes/models and prices" },
        { id: "financing", text: "Get pre-approved for financing" },
        { id: "inspect", text: "Inspect and test drive the car" },
        { id: "negotiate", text: "Negotiate price and terms" },
        { id: "paperwork", text: "Complete purchase paperwork" }
      ],
      categories: [
        { id: "preparation", title: "Preparation Phase", correctItems: ["research", "financing"] },
        { id: "shopping", title: "Shopping Phase", correctItems: ["inspect", "negotiate"] },
        { id: "closing", title: "Closing Phase", correctItems: ["paperwork"] }
      ]
    },
    challenge: {
      description: "You found a used car listed for $12,000. KBB shows fair value at $10,500. The dealer won't budge on price.",
      question: "What should you do?",
      options: [
        "Pay the asking price anyway",
        "Walk away and find a better deal",
        "Finance more to afford it",
        "Buy without an inspection"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 4,
    title: "Home Buying vs. Renting",
    description: "Understanding the financial implications of renting versus buying a home",
    introCard: "Rent or buy? This major decision affects your finances for years. Learn the true costs and benefits of each option to make the right choice for your situation.",
    flashcards: [
      {
        term: "Mortgage",
        definition: "A loan used to purchase real estate, typically paid back over 15-30 years with interest."
      },
      {
        term: "Down Payment",
        definition: "Upfront payment when buying a home, typically 3-20% of the purchase price."
      },
      {
        term: "Property Tax",
        definition: "Annual tax paid to local government based on your home's assessed value."
      },
      {
        term: "HOA Fees",
        definition: "Monthly fees paid to a homeowner's association for maintenance of common areas and amenities."
      }
    ],
    quiz: {
      question: "What's typically included in a monthly rent payment that homeowners pay separately?",
      options: [
        "Property taxes and homeowner's insurance",
        "Electricity and internet",
        "Food and transportation",
        "Entertainment and shopping"
      ],
      correctAnswerIndex: 0,
      feedbackForIncorrect: "Rent often includes property taxes and sometimes insurance, while homeowners pay these separately."
    },
    challenge: {
      description: "Monthly rent is $1,500. A similar home costs $300,000 with 20% down, 6% mortgage rate, plus $300/month taxes and insurance.",
      question: "What's the monthly cost of buying (mortgage + taxes + insurance)?",
      options: ["$1,500", "$1,800", "$2,139", "$2,500"],
      correctAnswer: 2
    }
  },
  {
    id: 5,
    title: "Smart Shopping Strategies",
    description: "Master the art of getting the best deals on major purchases",
    introCard: "Smart shoppers save thousands on big purchases! Learn negotiation tactics, timing strategies, and research methods to get the best value.",
    flashcards: [
      {
        term: "Price Comparison",
        definition: "Researching prices across multiple sellers to ensure you're getting the best deal available."
      },
      {
        term: "Negotiation",
        definition: "The process of discussing terms and price to reach a mutually acceptable agreement."
      },
      {
        term: "Seasonal Sales",
        definition: "Predictable times when certain items go on sale, like cars at year-end or appliances in fall."
      },
      {
        term: "Extended Warranty",
        definition: "Additional protection plan beyond manufacturer warranty, often overpriced and unnecessary."
      }
    ],
    quiz: {
      question: "When is the best time to buy a new car model year?",
      options: [
        "Right when the new model is released",
        "In the middle of summer",
        "At the end of the model year when new models arrive",
        "It doesn't matter when you buy"
      ],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "Dealers offer best deals on outgoing models to make room for new inventory."
    },
    challenge: {
      description: "You're negotiating for a $20,000 car. The dealer offers an extended warranty for $2,000 'for peace of mind.'",
      question: "What's the best response?",
      options: [
        "Accept it, warranties are always worth it",
        "Politely decline and research warranty options later",
        "Ask for the warranty to be included free",
        "Walk away from the entire deal"
      ],
      correctAnswer: 1
    }
  }
];

export const bigPurchasesMiniGame = {
  title: "Car Buying Simulator",
  description: "Navigate the car buying process and get the best deal!",
  scenario: "You need a reliable car for college with a $15,000 budget. Make smart decisions throughout the buying process:",
  decisions: [
    {
      id: 1,
      situation: "Choose your research approach",
      options: [
        { text: "Visit dealerships to see what's available", points: 1 },
        { text: "Research online first, then visit with knowledge", points: 3 },
        { text: "Ask friends for recommendations only", points: 2 },
        { text: "Buy the first car you see", points: 0 }
      ]
    },
    {
      id: 2,
      situation: "The dealer offers financing at 8% APR",
      options: [
        { text: "Accept immediately", points: 1 },
        { text: "Compare with bank pre-approval rates", points: 3 },
        { text: "Ask for a better rate", points: 2 },
        { text: "Pay cash if you have it", points: 3 }
      ]
    }
  ]
};
