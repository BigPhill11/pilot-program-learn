
export interface FuturePlanningFlashcard {
  term: string;
  definition: string;
}

export interface FuturePlanningDragDropActivity {
  id: string;
  title: string;
  description: string;
  items: Array<{
    id: string;
    content: string;
    category: string;
  }>;
  categories: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export interface FuturePlanningQuiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedbackForIncorrect: string;
}

export interface FuturePlanningLevel {
  id: number;
  title: string;
  description: string;
  flashcards: FuturePlanningFlashcard[];
  activity?: FuturePlanningDragDropActivity;
  quiz: FuturePlanningQuiz;
}

export const futurePlanningJourneyData: FuturePlanningLevel[] = [
  {
    id: 1,
    title: "Retirement Accounts Explained",
    description: "Learn about 401(k), Roth IRA, and Traditional IRA accounts",
    flashcards: [
      {
        term: "401(k)",
        definition: "An employer-sponsored retirement plan where you can contribute pre-tax dollars, often with employer matching contributions."
      },
      {
        term: "Roth IRA",
        definition: "A retirement account where you pay taxes upfront on contributions, but withdrawals in retirement are tax-free."
      },
      {
        term: "Traditional IRA",
        definition: "A retirement account where contributions may be tax-deductible, but withdrawals in retirement are taxed as income."
      },
      {
        term: "Compound Interest",
        definition: "Interest earned on both the initial principal and previously earned interest, leading to exponential growth over time."
      },
      {
        term: "Employer Match",
        definition: "Free money your employer contributes to your 401(k) based on how much you contribute, often called 'free money'."
      }
    ],
    activity: {
      id: "retirement-accounts",
      title: "Match Retirement Account Features",
      description: "Drag each feature to the correct retirement account type",
      items: [
        { id: "1", content: "Tax-free withdrawals in retirement", category: "roth-ira" },
        { id: "2", content: "Employer matching available", category: "401k" },
        { id: "3", content: "Tax-deductible contributions", category: "traditional-ira" },
        { id: "4", content: "Higher contribution limits", category: "401k" },
        { id: "5", content: "Income limits apply", category: "roth-ira" },
        { id: "6", content: "Required minimum distributions at 73", category: "traditional-ira" }
      ],
      categories: [
        { id: "401k", title: "401(k)", description: "Employer-sponsored plan" },
        { id: "roth-ira", title: "Roth IRA", description: "After-tax contributions" },
        { id: "traditional-ira", title: "Traditional IRA", description: "Pre-tax contributions" }
      ]
    },
    quiz: {
      question: "What is the main advantage of starting to save for retirement early?",
      options: [
        "Higher interest rates",
        "Lower taxes",
        "Compound interest has more time to work",
        "Guaranteed returns"
      ],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "Starting early allows compound interest more time to work its magic. Even small amounts can grow significantly over decades."
    }
  },
  {
    id: 2,
    title: "Life Insurance Basics",
    description: "Understanding term vs. whole life insurance and when you need it",
    flashcards: [
      {
        term: "Term Life Insurance",
        definition: "Temporary life insurance that covers you for a specific period (10, 20, or 30 years) with lower premiums."
      },
      {
        term: "Whole Life Insurance",
        definition: "Permanent life insurance that includes an investment component but has much higher premiums."
      },
      {
        term: "Death Benefit",
        definition: "The amount of money paid to beneficiaries when the insured person dies."
      },
      {
        term: "Premium",
        definition: "The regular payment you make to keep your life insurance policy active."
      },
      {
        term: "Beneficiary",
        definition: "The person or people who receive the death benefit when the insured person dies."
      }
    ],
    activity: {
      id: "life-insurance-scenarios",
      title: "Life Insurance Scenarios",
      description: "Match each person to the most appropriate life insurance recommendation",
      items: [
        { id: "1", content: "22-year-old single college graduate with student loans", category: "minimal" },
        { id: "2", content: "30-year-old married with a mortgage and new baby", category: "term" },
        { id: "3", content: "45-year-old with teenage kids and significant assets", category: "term" },
        { id: "4", content: "65-year-old retiree with grown children", category: "minimal" }
      ],
      categories: [
        { id: "minimal", title: "Minimal/No Life Insurance", description: "Little to no financial dependents" },
        { id: "term", title: "Term Life Insurance", description: "Temporary coverage for dependents" },
        { id: "whole", title: "Whole Life Insurance", description: "Permanent coverage with investment" }
      ]
    },
    quiz: {
      question: "For most young adults starting their careers, which type of life insurance is typically recommended?",
      options: [
        "Whole life insurance for the investment benefits",
        "Term life insurance for affordable coverage",
        "No life insurance needed",
        "Universal life insurance"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Term life insurance provides affordable coverage when you're young and healthy, perfect for protecting dependents during your working years."
    }
  },
  {
    id: 3,
    title: "Estate Planning Basics",
    description: "Essential documents and planning for your future",
    flashcards: [
      {
        term: "Will",
        definition: "A legal document that specifies how your assets should be distributed after death and who should care for minor children."
      },
      {
        term: "Trust",
        definition: "A legal arrangement where assets are held by a trustee for the benefit of beneficiaries, often avoiding probate."
      },
      {
        term: "Power of Attorney",
        definition: "A legal document that gives someone the authority to make financial or medical decisions on your behalf if you're incapacitated."
      },
      {
        term: "Beneficiary",
        definition: "A person designated to receive assets from accounts, insurance policies, or estate planning documents."
      },
      {
        term: "Probate",
        definition: "The legal process of validating a will and distributing assets after someone dies."
      }
    ],
    activity: {
      id: "estate-planning-documents",
      title: "Estate Planning Document Purposes",
      description: "Match each situation to the appropriate estate planning document",
      items: [
        { id: "1", content: "Who gets your savings account when you die", category: "will" },
        { id: "2", content: "Someone to make medical decisions if you're unconscious", category: "power-attorney" },
        { id: "3", content: "Avoiding probate for your home", category: "trust" },
        { id: "4", content: "Who your 401(k) goes to", category: "beneficiary" },
        { id: "5", content: "Who takes care of your minor children", category: "will" },
        { id: "6", content: "Someone to pay your bills if you're hospitalized", category: "power-attorney" }
      ],
      categories: [
        { id: "will", title: "Will", description: "Asset distribution and guardianship" },
        { id: "trust", title: "Trust", description: "Asset management and probate avoidance" },
        { id: "power-attorney", title: "Power of Attorney", description: "Decision-making authority" },
        { id: "beneficiary", title: "Beneficiary Designation", description: "Direct asset transfer" }
      ]
    },
    quiz: {
      question: "Why should even young adults consider basic estate planning?",
      options: [
        "Only wealthy people need estate planning",
        "Everyone has some assets and should plan for unexpected events",
        "Estate planning is only for people over 50",
        "It's too expensive for young people"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Even young adults have assets like bank accounts, cars, or retirement funds. Plus, unexpected events can happen at any age."
    }
  },
  {
    id: 4,
    title: "Major Life Events",
    description: "Financial planning for college, moving, weddings, and family",
    flashcards: [
      {
        term: "Emergency Fund",
        definition: "3-6 months of expenses saved for unexpected costs during major life transitions."
      },
      {
        term: "Moving Costs",
        definition: "Expenses for relocating including deposits, moving services, utility setup, and time off work."
      },
      {
        term: "Wedding Budget",
        definition: "The total amount allocated for wedding expenses, typically 6-12 months of income for couples."
      },
      {
        term: "Childcare Costs",
        definition: "Ongoing expenses for raising children including daycare, medical care, and education."
      },
      {
        term: "College Costs",
        definition: "Tuition, fees, room, board, and other expenses for higher education."
      }
    ],
    activity: {
      id: "life-event-costs",
      title: "Life Event Cost Planning",
      description: "Categorize these expenses by major life event",
      items: [
        { id: "1", content: "Security deposit and first month's rent", category: "moving" },
        { id: "2", content: "Venue rental and catering", category: "wedding" },
        { id: "3", content: "Tuition and textbooks", category: "college" },
        { id: "4", content: "Crib, car seat, and baby clothes", category: "baby" },
        { id: "5", content: "Moving truck and professional movers", category: "moving" },
        { id: "6", content: "Wedding dress and tuxedo rental", category: "wedding" }
      ],
      categories: [
        { id: "moving", title: "Moving Out", description: "Relocation expenses" },
        { id: "wedding", title: "Wedding", description: "Ceremony and celebration costs" },
        { id: "college", title: "College", description: "Education expenses" },
        { id: "baby", title: "Having a Baby", description: "New parent costs" }
      ]
    },
    quiz: {
      question: "What's the most important financial step before a major life event?",
      options: [
        "Take out a loan to cover all costs",
        "Start saving well in advance and create a budget",
        "Use credit cards for everything",
        "Wait until the last minute to plan"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Planning and saving in advance helps you avoid debt and financial stress during major life transitions."
    }
  },
  {
    id: 5,
    title: "Long-Term Financial Goals",
    description: "Building generational wealth and legacy planning",
    flashcards: [
      {
        term: "Generational Wealth",
        definition: "Assets and financial resources passed down from one generation to the next, creating lasting family financial security."
      },
      {
        term: "Legacy Planning",
        definition: "The process of planning how to transfer wealth, values, and assets to future generations."
      },
      {
        term: "Financial Independence",
        definition: "Having enough passive income and assets to live without depending on employment income."
      },
      {
        term: "Net Worth",
        definition: "The total value of your assets minus your debts - a key measure of financial progress."
      },
      {
        term: "Diversification",
        definition: "Spreading investments across different asset types to reduce risk and maximize long-term growth."
      }
    ],
    quiz: {
      question: "What's the foundation of building long-term wealth?",
      options: [
        "Getting rich quick with risky investments",
        "Consistently saving and investing over time",
        "Winning the lottery",
        "Only investing in the stock market"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Building wealth requires patience, consistency, and time. Regular saving and smart investing habits compound over decades."
    }
  }
];
