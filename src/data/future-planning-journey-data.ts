
export interface FuturePlanningLevel {
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

export const futurePlanningJourneyData: FuturePlanningLevel[] = [
  {
    id: 1,
    title: "Starting Early: The Power of Time",
    description: "Understand why starting financial planning young gives you a huge advantage",
    introCard: "Time is your greatest asset when planning for the future! Starting early means compound interest works for decades, turning small amounts into substantial wealth.",
    flashcards: [
      {
        term: "Compound Interest",
        definition: "Earning interest on both your original money and previously earned interest, creating exponential growth over time."
      },
      {
        term: "Time Horizon",
        definition: "The length of time you have until you need the money, which affects your investment strategy."
      },
      {
        term: "Future Value",
        definition: "What money invested today will be worth at a future date, accounting for compound growth."
      },
      {
        term: "Starting Early Advantage",
        definition: "The mathematical benefit of beginning to save and invest at a young age due to compound interest."
      }
    ],
    quiz: {
      question: "If you invest $1,000 at age 20 earning 7% annually, approximately how much will it be worth at age 60?",
      options: ["$2,800", "$7,600", "$14,900", "$22,000"],
      correctAnswer: 2,
      explanation: "With compound interest at 7% for 40 years, $1,000 grows to approximately $14,900."
    },
    challenge: {
      description: "Two friends start investing $100/month. Sarah starts at 22, Jake starts at 32. Both earn 7% and stop at 62.",
      question: "Who has more money at retirement?",
      options: [
        "Jake, because he's more mature",
        "Sarah, despite investing for the same time period",
        "They have the same amount",
        "Jake, because he invests more per month"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 2,
    title: "Retirement Accounts 101",
    description: "Learn about 401(k)s, IRAs, and other retirement savings vehicles",
    introCard: "Retirement accounts offer tax advantages that boost your savings. Understanding these accounts helps you make smart decisions about your financial future.",
    flashcards: [
      {
        term: "401(k)",
        definition: "Employer-sponsored retirement account where you contribute pre-tax dollars, often with company matching."
      },
      {
        term: "IRA (Individual Retirement Account)",
        definition: "Personal retirement account you can open yourself, with tax advantages for long-term savings."
      },
      {
        term: "Employer Match",
        definition: "Free money your employer contributes to your 401(k) when you contribute, often 50-100% of your contribution."
      },
      {
        term: "Roth IRA",
        definition: "Retirement account where you pay taxes now but withdrawals in retirement are tax-free."
      }
    ],
    quiz: {
      question: "What's the main benefit of a 401(k) with employer matching?",
      options: [
        "You can withdraw money anytime",
        "It's free money from your employer plus tax advantages",
        "You don't have to pay any taxes ever",
        "It guarantees a specific return"
      ],
      correctAnswer: 1,
      explanation: "Employer matching is free money, and 401(k)s provide tax advantages for retirement savings."
    },
    challenge: {
      description: "Your employer matches 50% of 401(k) contributions up to 6% of salary. Your salary is $50,000.",
      question: "If you contribute 6%, how much total goes into your 401(k) annually?",
      options: ["$3,000", "$4,500", "$6,000", "$9,000"],
      correctAnswer: 1
    }
  },
  {
    id: 3,
    title: "Basic Investing Concepts",
    description: "Introduction to stocks, bonds, and investment fundamentals",
    introCard: "Investing helps your money grow faster than savings accounts. Learn the basics of stocks, bonds, and how to build a simple investment portfolio.",
    flashcards: [
      {
        term: "Stock",
        definition: "A share of ownership in a company that can increase in value and may pay dividends."
      },
      {
        term: "Bond",
        definition: "A loan you give to a company or government that pays you interest over time."
      },
      {
        term: "Mutual Fund",
        definition: "An investment that pools money from many people to buy a diversified mix of stocks and bonds."
      },
      {
        term: "Diversification",
        definition: "Spreading investments across different types of assets to reduce risk."
      }
    ],
    quiz: {
      question: "Why is diversification important for young investors?",
      options: [
        "It guarantees you'll make money",
        "It reduces risk by not putting all eggs in one basket",
        "It's required by law",
        "It makes investing more complicated"
      ],
      correctAnswer: 1,
      explanation: "Diversification reduces risk because different investments perform well at different times."
    },
    activity: {
      title: "Investment Types",
      instruction: "Categorize these investment options by risk level:",
      items: [
        { id: "savings", text: "High-yield savings account" },
        { id: "bonds", text: "Government bonds" },
        { id: "stocks", text: "Individual company stocks" },
        { id: "mutual", text: "Broad market mutual funds" },
        { id: "crypto", text: "Cryptocurrency" }
      ],
      categories: [
        { id: "low", title: "Low Risk", correctItems: ["savings", "bonds"] },
        { id: "medium", title: "Medium Risk", correctItems: ["mutual"] },
        { id: "high", title: "High Risk", correctItems: ["stocks", "crypto"] }
      ]
    },
    challenge: {
      description: "You have $5,000 to invest for retirement (40+ years away). You're comfortable with some risk.",
      question: "What's the best investment strategy?",
      options: [
        "Put it all in a savings account",
        "Buy stock in one company you like",
        "Invest in a diversified stock market index fund",
        "Buy cryptocurrency"
      ],
      correctAnswer: 2
    }
  },
  {
    id: 4,
    title: "Insurance for Your Future",
    description: "Understanding how insurance protects your financial future",
    introCard: "Insurance might seem boring, but it protects everything you've worked for. Learn which types of insurance are essential and when you need them.",
    flashcards: [
      {
        term: "Life Insurance",
        definition: "Insurance that pays money to your beneficiaries if you die, protecting their financial future."
      },
      {
        term: "Disability Insurance",
        definition: "Insurance that replaces income if you can't work due to illness or injury."
      },
      {
        term: "Term Life Insurance",
        definition: "Temporary life insurance that covers you for a specific period, usually much cheaper than permanent insurance."
      },
      {
        term: "Beneficiary",
        definition: "The person or people who receive insurance money if something happens to you."
      }
    ],
    quiz: {
      question: "When do most people need life insurance?",
      options: [
        "As soon as they turn 18",
        "When they have dependents who rely on their income",
        "Only when they're very old",
        "Never, it's a waste of money"
      ],
      correctAnswer: 1,
      explanation: "Life insurance is most important when others depend on your income, like a spouse or children."
    },
    challenge: {
      description: "You're 25, single, with no dependents, and healthy. You have student loans your parents co-signed.",
      question: "What insurance should be your priority?",
      options: [
        "Expensive whole life insurance",
        "Term life insurance to cover student loans",
        "No insurance needed yet",
        "Only health insurance"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 5,
    title: "Estate Planning Basics",
    description: "Simple steps to protect your assets and loved ones",
    introCard: "Estate planning isn't just for the wealthy! Even young adults need basic documents to protect themselves and their loved ones in emergencies.",
    flashcards: [
      {
        term: "Will",
        definition: "A legal document that specifies how you want your assets distributed after you die."
      },
      {
        term: "Power of Attorney",
        definition: "A document that gives someone authority to make financial decisions for you if you can't."
      },
      {
        term: "Healthcare Directive",
        definition: "Instructions about your medical care preferences if you can't communicate them yourself."
      },
      {
        term: "Beneficiary Designation",
        definition: "Naming who receives assets from accounts like retirement plans or life insurance directly."
      }
    ],
    quiz: {
      question: "What happens if you die without a will?",
      options: [
        "Your family automatically gets everything",
        "The government takes all your money",
        "State laws determine how assets are distributed",
        "Nothing, you don't need a will when young"
      ],
      correctAnswer: 2,
      explanation: "Without a will, state intestacy laws determine asset distribution, which may not match your wishes."
    },
    challenge: {
      description: "You're 23, have $15,000 in savings, a car, and want your sister to handle finances if you're incapacitated.",
      question: "What documents do you need most urgently?",
      options: [
        "Just a will",
        "Power of attorney and healthcare directive",
        "Nothing until you're older",
        "Only beneficiary designations"
      ],
      correctAnswer: 1
    }
  }
];

export const futurePlanningMiniGame = {
  title: "Future Plan Builder",
  description: "Create a comprehensive financial plan for your future!",
  scenario: "You're 22, just graduated, and starting your first job at $45,000/year. Build your financial foundation:",
  categories: [
    {
      id: "emergency",
      name: "Emergency Fund",
      target: 6,
      description: "Months of expenses saved"
    },
    {
      id: "retirement",
      name: "Retirement Savings",
      target: 15,
      description: "Percentage of income"
    },
    {
      id: "insurance",
      name: "Insurance Coverage",
      options: ["Health", "Disability", "Term Life", "Renters/Auto"]
    }
  ]
};
