
export interface TaxFlashcard {
  term: string;
  definition: string;
}

export interface TaxQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface DragDropActivity {
  type: 'categorize' | 'match';
  instruction: string;
  items: Array<{
    id: string;
    text: string;
    category?: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
  }>;
}

export interface TaxLevel {
  id: number;
  title: string;
  introCard: string;
  flashcards: TaxFlashcard[];
  quiz: TaxQuiz;
  activity?: DragDropActivity;
  challenge: {
    type: 'scenario' | 'calculation' | 'simulation';
    description: string;
    question: string;
    options?: string[];
    correctAnswer?: number | string;
  };
}

export const taxesJourneyData: TaxLevel[] = [
  {
    id: 1,
    title: "What Are Taxes?",
    introCard: "Taxes fund the world around us — roads, schools, and more. Here's what they are and why we pay them.",
    flashcards: [
      {
        term: "Tax",
        definition: "Money collected by the government to pay for public services and infrastructure."
      },
      {
        term: "Government Revenue",
        definition: "Income that the government receives from taxes, fees, and other sources to fund operations."
      },
      {
        term: "Payroll Taxes",
        definition: "Taxes automatically taken from your paycheck to fund Social Security and Medicare."
      }
    ],
    quiz: {
      question: "Which of these is paid when you buy sneakers?",
      options: ["Income Tax", "Sales Tax", "Property Tax", "Payroll Tax"],
      correctAnswer: 1,
      explanation: "Sales tax is added to purchases of goods and services at the point of sale."
    },
    activity: {
      type: 'categorize',
      instruction: "Drag public services into the correct category:",
      items: [
        { id: 'roads', text: 'Roads and Highways', category: 'funded' },
        { id: 'schools', text: 'Public Schools', category: 'funded' },
        { id: 'netflix', text: 'Netflix Subscription', category: 'not-funded' },
        { id: 'police', text: 'Police Department', category: 'funded' },
        { id: 'grocery', text: 'Grocery Store', category: 'not-funded' },
        { id: 'fire', text: 'Fire Department', category: 'funded' }
      ],
      categories: [
        { id: 'funded', name: 'Funded by Taxes' },
        { id: 'not-funded', name: 'Not Funded by Taxes' }
      ]
    },
    challenge: {
      type: 'scenario',
      description: "You live in a community that needs better services.",
      question: "Which improvement would most likely require raising taxes?",
      options: ["Building a new public library", "Opening a private restaurant", "Starting a personal blog", "Buying a new car"],
      correctAnswer: 0
    }
  },
  {
    id: 2,
    title: "Types of Taxes",
    introCard: "Not all taxes are the same. Let's break down where and how you pay them.",
    flashcards: [
      {
        term: "Income Tax",
        definition: "Tax paid on money you earn from work, investments, or other sources."
      },
      {
        term: "Sales Tax",
        definition: "Tax added to the price of goods and services when you buy them."
      },
      {
        term: "Property Tax",
        definition: "Annual tax paid by property owners to local governments."
      },
      {
        term: "Capital Gains Tax",
        definition: "Tax paid on profits from selling investments like stocks or real estate."
      },
      {
        term: "FICA",
        definition: "Federal Insurance Contributions Act - funds Social Security and Medicare."
      }
    ],
    quiz: {
      question: "Which tax applies when you sell a stock for a profit?",
      options: ["Income Tax", "Sales Tax", "Capital Gains Tax", "Property Tax"],
      correctAnswer: 2,
      explanation: "Capital gains tax is specifically for profits made from selling investments."
    },
    challenge: {
      type: 'scenario',
      description: "You have a busy day with different financial activities.",
      question: "You buy lunch ($12), earn a paycheck ($500), and sell a used bike ($50 profit). Which taxes apply? (Select all)",
      options: ["Sales tax on lunch", "Income tax on paycheck", "Capital gains on bike", "Property tax"],
      correctAnswer: "0,1"
    }
  },
  {
    id: 3,
    title: "How Income Taxes Work",
    introCard: "Income taxes are paid on what you earn — but only part of it. Let's see how it really works.",
    flashcards: [
      {
        term: "Tax Bracket",
        definition: "Income ranges with different tax rates. Higher income doesn't mean all income is taxed at the highest rate."
      },
      {
        term: "Standard Deduction",
        definition: "Amount of income you can earn tax-free each year ($13,850 for single filers in 2023)."
      },
      {
        term: "W-2",
        definition: "Form your employer gives you showing how much you earned and how much tax was withheld."
      },
      {
        term: "Withholding",
        definition: "Money your employer automatically takes from your paycheck to pay your taxes."
      },
      {
        term: "Tax Return",
        definition: "Form you file to report your income and calculate if you owe more tax or get a refund."
      }
    ],
    quiz: {
      question: "What's the name of the form your job gives you at the end of the year?",
      options: ["W-2", "1040", "W-4", "1099"],
      correctAnswer: 0,
      explanation: "The W-2 shows your annual wages and tax withholdings from your employer."
    },
    challenge: {
      type: 'calculation',
      description: "Jane earns $40,000/year and is single.",
      question: "Using the standard deduction of $13,850, how much of Jane's income is subject to federal income tax?",
      options: ["$40,000", "$26,150", "$13,850", "$0"],
      correctAnswer: 1
    }
  },
  {
    id: 4,
    title: "Filing Your Taxes",
    introCard: "Filing taxes means telling the IRS what you earned, what you paid, and what you might get back.",
    flashcards: [
      {
        term: "1040",
        definition: "The main tax form individuals use to file their annual income tax return."
      },
      {
        term: "Refund",
        definition: "Money the government owes you when you've paid more tax than required."
      },
      {
        term: "Tax Bill",
        definition: "Additional money you owe when you haven't paid enough tax during the year."
      },
      {
        term: "Filing Status",
        definition: "Category that determines your tax rates (single, married filing jointly, etc.)."
      },
      {
        term: "IRS",
        definition: "Internal Revenue Service - the federal agency that collects taxes."
      }
    ],
    quiz: {
      question: "True or False: Filing taxes always means you owe money.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False! You might get a refund if you paid more than you owe through withholding."
    },
    challenge: {
      type: 'scenario',
      description: "You're filing your first tax return.",
      question: "You earned $12,000 and had $800 withheld from your paychecks. With a standard deduction of $13,850, do you get a refund?",
      options: ["Yes, I get a refund", "No, I owe more money", "I break even"],
      correctAnswer: 0
    }
  },
  {
    id: 5,
    title: "How to Pay Less (Legally!)",
    introCard: "Smart planning = less tax owed. Let's look at legal strategies used by smart savers.",
    flashcards: [
      {
        term: "Roth IRA",
        definition: "Retirement account where you pay taxes now but withdrawals in retirement are tax-free."
      },
      {
        term: "Traditional IRA",
        definition: "Retirement account where contributions may be tax-deductible now, but withdrawals are taxed."
      },
      {
        term: "Tax Credit",
        definition: "Direct reduction in taxes owed, dollar-for-dollar (better than deductions)."
      },
      {
        term: "Tax Deduction",
        definition: "Reduces the amount of income subject to tax, saving you tax rate × deduction amount."
      },
      {
        term: "Capital Gains",
        definition: "Profits from selling investments. Long-term gains (held >1 year) are taxed at lower rates."
      }
    ],
    quiz: {
      question: "Which account gives you tax-free withdrawals in retirement?",
      options: ["Traditional IRA", "Roth IRA", "Regular Savings", "Checking Account"],
      correctAnswer: 1,
      explanation: "Roth IRA contributions are made with after-tax dollars, so qualified withdrawals are tax-free."
    },
    challenge: {
      type: 'scenario',
      description: "You're planning your investments and retirement savings.",
      question: "You invest $2,000 in a stock and hold it for 2 years before selling for $2,500. How can you reduce your tax bill?",
      options: ["Hold for less than 1 year", "Hold for more than 1 year", "Sell immediately", "Don't invest at all"],
      correctAnswer: 1
    }
  }
];

export const taxMiniGameData = {
  title: "File Your First Taxes",
  description: "Congratulations! You've completed all 5 tax levels. Now let's put it all together in a tax filing simulation.",
  scenarios: [
    {
      step: 1,
      question: "What's your filing status?",
      context: "You're 22, unmarried, and live on your own.",
      options: ["Single", "Married Filing Jointly", "Head of Household"],
      correct: 0,
      explanation: "Since you're unmarried with no dependents, you file as Single."
    },
    {
      step: 2,
      question: "Your W-2 shows you earned $35,000. How much is subject to federal income tax?",
      context: "Remember the standard deduction for 2023 is $13,850.",
      options: ["$35,000", "$21,150", "$13,850"],
      correct: 1,
      explanation: "Subtract the standard deduction: $35,000 - $13,850 = $21,150"
    },
    {
      step: 3,
      question: "Your employer withheld $2,800 in federal taxes. You calculate you owe $2,500. What happens?",
      context: "Compare what was withheld vs. what you actually owe.",
      options: ["I owe $300 more", "I get a $300 refund", "I break even"],
      correct: 1,
      explanation: "You get a refund of $300 because you paid more than you owe."
    }
  ],
  badge: {
    title: "Tax Smart Rookie",
    description: "You've mastered the basics of taxes and successfully filed your first return!",
    icon: "🏆"
  }
};
