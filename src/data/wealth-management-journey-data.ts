export interface WealthLevel {
  id: number;
  title: string;
  overview: string;
  flashcards: Array<{
    term: string;
    definition: string;
  }>;
  realLifeExample: string;
  miniGames: Array<{
    name: string;
    howItWorks: string;
    learningGoal: string;
    completionSystem: string;
    keyTerms: string;
  }>;
  quiz: {
    questions: string[];
  };
}

export const wealthManagementJourneyData: WealthLevel[] = [
  {
    id: 1,
    title: "Introduction to Wealth Management",
    overview: "Wealth management is the business of helping individuals and families grow, protect, and transfer their wealth. Unlike asset management, which focuses mainly on investing money, wealth management is holistic — covering investments, taxes, retirement, estate planning, and even philanthropy. Wealth managers aim to understand a client's life goals and tailor strategies around them. This level introduces the basics of the profession and why it matters.",
    flashcards: [
      {
        term: "Wealth Management",
        definition: "Wealth management is a financial advisory service that helps clients manage investments, taxes, and estate planning. Its goal is to align financial decisions with long-term life goals."
      },
      {
        term: "Financial Plan",
        definition: "A financial plan is a roadmap for how a client will save, invest, and spend. It includes short-term and long-term goals like buying a house or retiring comfortably."
      },
      {
        term: "Holistic Advice",
        definition: "Holistic advice means looking beyond investments to include taxes, insurance, estate planning, and cash flow. Wealth managers focus on the full picture, not just returns."
      },
      {
        term: "Client Relationship",
        definition: "Wealth managers build deep relationships with clients, often spanning decades. Trust and communication are the foundation of these partnerships."
      },
      {
        term: "Personalized Strategy",
        definition: "Every client's needs are different, so strategies must be tailored. For example, a young entrepreneur will have a very different plan than a retired teacher."
      }
    ],
    realLifeExample: "Imagine a doctor who earns a high salary but is unsure how to manage her finances. She hires a wealth manager who helps her invest for retirement, create a tax-efficient plan, and buy life insurance to protect her family. The manager also works with her to set up a college fund for her children. Instead of only investing her money, the wealth manager helps create a strategy that addresses all aspects of her financial life.",
    miniGames: [
      {
        name: "Match the Service",
        howItWorks: "Players match client needs (\"I want to lower my taxes\") with the right wealth management service (tax planning, retirement planning, etc.).",
        learningGoal: "Understand the breadth of wealth management services.",
        completionSystem: "Earn stars for correct matches.",
        keyTerms: "Financial plan, holistic advice, client relationship."
      },
      {
        name: "Scenario Builder",
        howItWorks: "Players are given a fictional client profile and must choose 3 priority services (investment, insurance, estate, etc.).",
        learningGoal: "Learn how wealth management is tailored.",
        completionSystem: "Bronze = 1 correct, Silver = 2, Gold = all 3 aligned with best practice.",
        keyTerms: "Personalized strategy, holistic advice."
      }
    ],
    quiz: {
      questions: [
        "What makes wealth management different from asset management?",
        "In Match the Service, what wealth management service matches \"I want to protect my family if something happens to me\"?",
        "Why is trust important in wealth management client relationships?",
        "In Scenario Builder, why would a retired teacher need estate planning?",
        "In the doctor example, how did the wealth manager go beyond just investments?"
      ]
    }
  },
  {
    id: 2,
    title: "Financial Planning Foundations",
    overview: "Financial planning is the foundation of wealth management. It involves creating a structured plan for saving, investing, spending, and protecting wealth. Wealth managers help clients define goals, assess resources, and design a roadmap. Good planning prevents short-term decisions from derailing long-term success.",
    flashcards: [
      {
        term: "Budgeting",
        definition: "Budgeting is the process of tracking income and expenses. It ensures clients spend wisely and save enough for goals."
      },
      {
        term: "Emergency Fund",
        definition: "An emergency fund is cash set aside for unexpected events like job loss or medical bills. It prevents clients from dipping into investments too early."
      },
      {
        term: "Retirement Planning",
        definition: "Retirement planning prepares clients to live comfortably after they stop working. It includes savings, investments, and withdrawal strategies."
      },
      {
        term: "Insurance Planning",
        definition: "Insurance planning ensures clients have coverage for risks like health issues, disability, or property loss. It protects wealth from sudden shocks."
      },
      {
        term: "Estate Planning",
        definition: "Estate planning is deciding how assets will be transferred after death. Wills, trusts, and beneficiaries are key tools."
      }
    ],
    realLifeExample: "A young couple hires a wealth manager to help them plan for their first home. Together, they create a budget, build an emergency fund, and start saving for a down payment. They also begin investing for retirement, even though it feels far away. By sticking to this financial plan, they balance short-term goals (buying a house) with long-term security (retirement).",
    miniGames: [
      {
        name: "Goal Sorter",
        howItWorks: "Players drag financial goals (house, retirement, emergency fund) into \"short-term\" or \"long-term\" buckets.",
        learningGoal: "Distinguish between time horizons.",
        completionSystem: "Score based on correct sorting.",
        keyTerms: "Budgeting, emergency fund, retirement planning."
      },
      {
        name: "Plan Builder",
        howItWorks: "Players receive a fictional client profile with income, expenses, and goals. They must build a financial plan by allocating percentages to different needs.",
        learningGoal: "Learn trade-offs in financial planning.",
        completionSystem: "Bronze = basic needs covered, Silver = 2 goals met, Gold = balanced plan.",
        keyTerms: "Insurance planning, estate planning, financial plan."
      }
    ],
    quiz: {
      questions: [
        "Why is budgeting important in financial planning?",
        "In Goal Sorter, why is an emergency fund considered a short-term priority?",
        "What's the difference between retirement planning and estate planning?",
        "In Plan Builder, what happens if a client spends too much and saves too little?",
        "In the young couple example, how did the wealth manager balance short-term and long-term goals?"
      ]
    }
  },
  {
    id: 3,
    title: "Investment Basics in Wealth Management",
    overview: "Investing is a critical part of wealth management, but it's tied to client goals, not just performance. Wealth managers balance risk and return to ensure clients meet milestones like retirement or education funding. They use diversification and asset allocation to protect against losses.",
    flashcards: [
      {
        term: "Asset Allocation",
        definition: "Asset allocation is dividing money among stocks, bonds, and cash. It balances risk and return."
      },
      {
        term: "Diversification",
        definition: "Diversification means spreading investments across assets to reduce risk. It prevents one loss from wiping out a portfolio."
      },
      {
        term: "Risk Tolerance",
        definition: "Risk tolerance is how comfortable a client is with losses. Younger clients usually accept more risk; retirees accept less."
      },
      {
        term: "Time Horizon",
        definition: "Time horizon is the length of time before money is needed. Longer horizons allow for more risk."
      },
      {
        term: "Rebalancing",
        definition: "Rebalancing is adjusting a portfolio back to target allocations after market changes. It ensures the portfolio stays aligned with goals."
      }
    ],
    realLifeExample: "A wealth manager helps a 25-year-old client invest for retirement. Because the client has a 40-year horizon, the manager recommends a higher allocation to stocks for growth. As the client ages, the portfolio will shift gradually toward bonds for stability. This approach balances long-term growth with eventual safety.",
    miniGames: [
      {
        name: "Build a Portfolio",
        howItWorks: "Players allocate tokens across stocks, bonds, and cash. A risk/return meter shows the trade-off.",
        learningGoal: "Understand how allocation changes risk.",
        completionSystem: "Bronze = poor balance, Silver = decent balance, Gold = optimized.",
        keyTerms: "Asset allocation, diversification, risk tolerance."
      },
      {
        name: "Risk Match",
        howItWorks: "Players match client profiles (young professional, retiree) with risk levels and time horizons.",
        learningGoal: "Connect portfolios to client needs.",
        completionSystem: "Score points per correct match.",
        keyTerms: "Risk tolerance, time horizon."
      }
    ],
    quiz: {
      questions: [
        "Why is asset allocation important in wealth management?",
        "In Build a Portfolio, what happens if you put everything into stocks?",
        "What is risk tolerance, and how does it change over time?",
        "In Risk Match, which client should invest more heavily in bonds — a 25-year-old or a retiree?",
        "In the 25-year-old example, why did the wealth manager recommend more stocks?"
      ]
    }
  }
];

export const getWealthManagementProgress = () => {
  const progress = localStorage.getItem('wealthManagementProgress');
  if (progress) {
    try {
      return JSON.parse(progress);
    } catch {
      return { completed: false, levelsCompleted: 0, totalLevels: wealthManagementJourneyData.length };
    }
  }
  return { completed: false, levelsCompleted: 0, totalLevels: wealthManagementJourneyData.length };
};