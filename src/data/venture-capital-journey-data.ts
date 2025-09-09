export interface VCFlashcard {
  term: string;
  definition: string;
}

export interface VCMiniGame {
  id: string;
  name: string;
  howItWorks: string;
  learningGoal: string;
  completionSystem: string;
  keyTerms: string[];
}

export interface VCQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface VCActivity {
  title: string;
  description: string;
}

export interface VCLevel {
  id: number;
  title: string;
  overview: string;
  flashcards: VCFlashcard[];
  realLifeExample: {
    title: string;
    description: string;
  };
  miniGames: VCMiniGame[];
  quiz: VCQuizQuestion[];
  activities: VCActivity[];
}

export const vcJourneyData: VCLevel[] = [
  {
    id: 1,
    title: "Introduction to Venture Capital",
    overview: "Venture capital (VC) is financing provided to early-stage startups with high growth potential. Unlike banks, which require collateral, VCs take equity (ownership) in exchange for funding. The goal is to help companies grow rapidly, with the hope of earning a big return when the company succeeds. This level introduces what VC is, how it differs from traditional finance, and why it powers innovation.",
    flashcards: [
      {
        term: "Venture Capital",
        definition: "Venture capital is funding for early-stage companies with high growth potential. It involves more risk than traditional lending."
      },
      {
        term: "Equity",
        definition: "Equity is ownership in a company. VCs receive shares in return for their investment."
      },
      {
        term: "Startup",
        definition: "A startup is a young company designed to scale quickly, often in technology or innovation-driven industries."
      },
      {
        term: "Return on Investment (ROI)",
        definition: "ROI measures how much profit an investor makes compared to the amount invested."
      },
      {
        term: "High Risk, High Reward",
        definition: "VC investments are risky because most startups fail. However, successful ones can return multiples of the original investment."
      }
    ],
    realLifeExample: {
      title: "Software Startup Success",
      description: "A small software startup builds an app but needs money to hire engineers and market it. A VC firm invests $1 million in exchange for 20% equity. If the app succeeds and the company grows to be worth $50 million, the VC's stake is now worth $10 million. This illustrates how VCs bet on high-growth companies and aim for outsized returns."
    },
    miniGames: [
      {
        id: "finance-match-up",
        name: "Finance Match-Up",
        howItWorks: "Players match funding sources (VC, bank loan, personal savings) to company types (startup, established business, personal project).",
        learningGoal: "Differentiate VC from other funding sources.",
        completionSystem: "Bronze = 2 correct, Silver = 3–4, Gold = all correct.",
        keyTerms: ["Venture capital", "startup", "equity"]
      },
      {
        id: "risk-or-reward",
        name: "Risk or Reward?",
        howItWorks: "Players are given scenarios like 'startup with no revenue but high potential' or 'stable company with slow growth.' They decide if a VC would invest.",
        learningGoal: "Understand VC's appetite for risk.",
        completionSystem: "Earn points for correct choices; leaderboard available.",
        keyTerms: ["High risk", "high reward", "ROI"]
      }
    ],
    quiz: [
      {
        id: "vc-definition",
        question: "What is venture capital, and how is it different from a bank loan?",
        options: [
          "VC provides equity funding to high-growth startups, while bank loans require collateral and fixed repayment",
          "VC only lends money to established companies",
          "VC and bank loans are the same thing",
          "VC only invests in technology companies"
        ],
        correctAnswer: 0,
        explanation: "Venture capital provides equity funding to startups with high growth potential, taking ownership stakes rather than requiring collateral like traditional bank loans."
      },
      {
        id: "funding-source",
        question: "In Finance Match-Up, which funding source fits a high-growth startup?",
        options: [
          "Bank loan",
          "Personal savings",
          "Venture capital",
          "Credit card"
        ],
        correctAnswer: 2,
        explanation: "Venture capital is specifically designed for high-growth startups that need significant funding and expertise to scale rapidly."
      },
      {
        id: "equity-concept",
        question: "What is equity, and why do VCs want it?",
        options: [
          "Equity is debt that must be repaid with interest",
          "Equity is ownership in a company, allowing VCs to share in the company's success",
          "Equity is a type of insurance policy",
          "Equity is the same as a bank loan"
        ],
        correctAnswer: 1,
        explanation: "Equity represents ownership in a company. VCs want equity because it allows them to share in the potential upside if the company becomes very valuable."
      },
      {
        id: "investment-scenario",
        question: "In Risk or Reward, which scenario best fits VC investment?",
        options: [
          "A stable restaurant with steady profits",
          "A tech startup with no revenue but huge market potential",
          "A family business that's been profitable for 20 years",
          "A company seeking a small loan for equipment"
        ],
        correctAnswer: 1,
        explanation: "VCs look for high-growth potential even if there's no current revenue, as they're betting on future massive returns."
      },
      {
        id: "software-example",
        question: "In the software app example, how did the VC turn $1M into $10M?",
        options: [
          "The VC sold their shares back to the company",
          "The company's value grew from $5M to $50M, making the VC's 20% stake worth $10M",
          "The VC received $10M in dividends",
          "The VC lent additional money to the company"
        ],
        correctAnswer: 1,
        explanation: "The VC owned 20% equity, so when the company's value increased to $50M, their stake became worth $10M (20% of $50M)."
      }
    ],
    activities: [
      {
        title: "Company Research",
        description: "List 3 companies you know that started small (e.g., Uber, Spotify, Snapchat). Research: Did they use venture capital? Write a paragraph about why VC was (or wasn't) the right fit."
      }
    ]
  },
  {
    id: 2,
    title: "The VC Ecosystem",
    overview: "Venture capital involves many players — entrepreneurs, investors, limited partners, and accelerators. VC firms raise money from outside investors (called limited partners) and pool it into funds. They then use those funds to invest in startups. This ecosystem relies on relationships and shared goals between startups and investors.",
    flashcards: [
      {
        term: "Limited Partners (LPs)",
        definition: "LPs are institutions or wealthy individuals who invest in VC funds. They provide capital but don't make decisions."
      },
      {
        term: "General Partners (GPs)",
        definition: "GPs manage VC funds, choose startups, and work with founders."
      },
      {
        term: "Accelerator",
        definition: "An accelerator is a program that helps startups grow quickly with mentorship, funding, and networking."
      },
      {
        term: "Fund",
        definition: "A fund is a pool of money raised by a VC firm to invest in startups."
      },
      {
        term: "Entrepreneur",
        definition: "An entrepreneur is someone who starts and grows a business."
      }
    ],
    realLifeExample: {
      title: "VC Fund Money Flow",
      description: "A VC firm raises $100 million from LPs like pension funds and universities. The GPs decide to invest in 20 startups over the next 5 years. One of those startups goes public, making the fund a huge return, which is shared back with LPs after fees. This shows how money flows through the VC ecosystem."
    },
    miniGames: [
      {
        id: "ecosystem-builder",
        name: "Ecosystem Builder",
        howItWorks: "Players drag roles (LP, GP, entrepreneur, accelerator) into a diagram showing the VC ecosystem.",
        learningGoal: "Understand how players interact.",
        completionSystem: "Score based on correct placements.",
        keyTerms: ["LP", "GP", "fund", "entrepreneur"]
      },
      {
        id: "follow-the-money",
        name: "Follow the Money",
        howItWorks: "Players trace a dollar from LP → VC fund → startup → exit → returns back to LP.",
        learningGoal: "Visualize money flow in venture capital.",
        completionSystem: "Bronze = basic flow correct, Silver = mostly correct, Gold = perfect path.",
        keyTerms: ["LPs", "GPs", "fund"]
      }
    ],
    quiz: [
      {
        id: "lp-role",
        question: "Who provides money to VC funds: LPs or entrepreneurs?",
        options: [
          "Entrepreneurs",
          "Limited Partners (LPs)",
          "Government agencies",
          "Banks"
        ],
        correctAnswer: 1,
        explanation: "Limited Partners (LPs) such as pension funds, endowments, and wealthy individuals provide the capital that VC firms use to create their funds."
      },
      {
        id: "entrepreneur-placement",
        question: "In Ecosystem Builder, where do entrepreneurs fit?",
        options: [
          "They provide money to VC funds",
          "They manage VC funds",
          "They receive funding from VC funds for their startups",
          "They are the same as LPs"
        ],
        correctAnswer: 2,
        explanation: "Entrepreneurs are the founders who start companies and seek funding from VC funds to grow their businesses."
      },
      {
        id: "gp-role",
        question: "What is the role of general partners in VC?",
        options: [
          "They provide money to the fund",
          "They manage the fund and make investment decisions",
          "They start companies",
          "They only provide advice"
        ],
        correctAnswer: 1,
        explanation: "General Partners (GPs) are the active managers of VC funds who make investment decisions, work with portfolio companies, and are responsible for fund performance."
      },
      {
        id: "startup-exit",
        question: "In Follow the Money, what happens after a startup exits?",
        options: [
          "The money disappears",
          "Only the entrepreneurs get paid",
          "Returns flow back to the VC fund and then to LPs",
          "The government takes all the money"
        ],
        correctAnswer: 2,
        explanation: "When a startup exits successfully (through acquisition or IPO), the returns flow back to the VC fund, which then distributes profits to its Limited Partners."
      },
      {
        id: "lp-returns",
        question: "In the $100M example, how do LPs make money back?",
        options: [
          "Through fixed interest payments",
          "Through their share of profits when portfolio companies exit successfully",
          "Through management fees only",
          "They never make money back"
        ],
        correctAnswer: 1,
        explanation: "LPs make money when the VC fund's portfolio companies exit successfully, and the profits are distributed back to LPs according to their fund commitments."
      }
    ],
    activities: [
      {
        title: "VC Ecosystem Flowchart",
        description: "Draw a flowchart showing the VC ecosystem (LPs → GPs → startups → exit → LPs). Add one sentence under each step describing what happens."
      }
    ]
  },
  {
    id: 3,
    title: "Startup Evaluation",
    overview: "Before investing, VCs evaluate startups through due diligence. They look at the team, market, product, and potential growth. Since most startups fail, VCs must be selective, balancing gut instinct with data. This level explores how startups are judged.",
    flashcards: [
      {
        term: "Due Diligence",
        definition: "Due diligence is the research process VCs use to evaluate a startup."
      },
      {
        term: "Market Size (TAM)",
        definition: "TAM (Total Addressable Market) is how big the opportunity is. Bigger markets attract more VC interest."
      },
      {
        term: "Product-Market Fit",
        definition: "Product-market fit is when customers strongly want and use a product."
      },
      {
        term: "Competitive Advantage",
        definition: "A competitive advantage is what makes a startup better than rivals (technology, brand, network)."
      },
      {
        term: "Scalability",
        definition: "Scalability is the ability to grow quickly without costs rising equally fast."
      }
    ],
    realLifeExample: {
      title: "Food Delivery Startup Evaluation",
      description: "A VC evaluates a food delivery startup. The team is strong, the market for food delivery is huge, and the app has thousands of daily users (early product-market fit). But they worry about competition from Uber Eats. After considering the risks, they decide to invest because the startup's unique logistics technology could scale faster."
    },
    miniGames: [
      {
        id: "pitch-judge",
        name: "Pitch Judge",
        howItWorks: "Players listen to or read a fictional startup pitch and score team, market, and product.",
        learningGoal: "Practice evaluating startups.",
        completionSystem: "Points for correctly prioritizing strengths.",
        keyTerms: ["Due diligence", "market size", "scalability"]
      },
      {
        id: "fit-or-flop",
        name: "Fit or Flop?",
        howItWorks: "Players are given startup scenarios. They decide if each has product-market fit.",
        learningGoal: "Recognize product-market fit signals.",
        completionSystem: "Score increases with each correct decision.",
        keyTerms: ["Product-market fit", "competitive advantage"]
      }
    ],
    quiz: [
      {
        id: "due-diligence-meaning",
        question: "What does due diligence mean in VC?",
        options: [
          "The legal paperwork for investments",
          "The research process VCs use to evaluate a startup before investing",
          "The amount of money a VC invests",
          "The time it takes to make an investment"
        ],
        correctAnswer: 1,
        explanation: "Due diligence is the comprehensive research and evaluation process VCs conduct to assess a startup's potential before making an investment decision."
      },
      {
        id: "growth-potential-factor",
        question: "In Pitch Judge, which factor matters most for growth potential?",
        options: [
          "The age of the founders",
          "Market size and scalability",
          "The company's current office location",
          "How much money they're asking for"
        ],
        correctAnswer: 1,
        explanation: "Market size and scalability are crucial for growth potential because they determine how big the opportunity is and how quickly the company can expand."
      },
      {
        id: "product-market-fit-definition",
        question: "What is product-market fit?",
        options: [
          "When a product is the right size for the market",
          "When customers strongly want and use a product",
          "When a product costs the right amount",
          "When a product looks good"
        ],
        correctAnswer: 1,
        explanation: "Product-market fit occurs when customers strongly want and actively use a product, indicating genuine demand and market validation."
      },
      {
        id: "product-market-fit-signals",
        question: "In Fit or Flop, what signals product-market fit?",
        options: [
          "High customer acquisition costs",
          "Strong user engagement and organic growth",
          "Lots of competitors",
          "Low profit margins"
        ],
        correctAnswer: 1,
        explanation: "Strong user engagement, customer retention, and organic growth are key indicators that customers truly value the product."
      },
      {
        id: "competition-risk",
        question: "In the food delivery example, why did the VC take the risk despite competition?",
        options: [
          "They ignored the competition",
          "The startup had unique logistics technology that could scale faster",
          "Food delivery has no competition",
          "They wanted to lose money"
        ],
        correctAnswer: 1,
        explanation: "The VC believed the startup's unique logistics technology provided a competitive advantage that could help them scale faster than competitors."
      }
    ],
    activities: [
      {
        title: "Startup Evaluation",
        description: "Pick a startup idea (real or your own). Write a one-page 'evaluation' covering team, market, product, and risks."
      }
    ]
  }
];

export const getVCLevelById = (id: number): VCLevel | undefined => {
  return vcJourneyData.find(level => level.id === id);
};

export const getAllVCLevels = (): VCLevel[] => {
  return vcJourneyData;
};