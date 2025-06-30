
import { CareerLevel } from '@/data/finance-careers';

export interface InteractiveLessonContent {
  level: number;
  title: string;
  description: string;
  theme: string;
  objectives: string[];
  miniGames: MiniGameConfig[];
  realWorldExamples: RealWorldExample[];
  interactiveQuiz: QuizConfig;
  terminology: string[];
  practicalActivity: PracticalActivity;
}

export interface MiniGameConfig {
  id: string;
  name: string;
  type: 'matching' | 'scenario' | 'simulation' | 'drag-drop' | 'timeline';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
}

export interface RealWorldExample {
  id: string;
  title: string;
  company: string;
  year: number;
  description: string;
  keyLearning: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizConfig {
  id: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PracticalActivity {
  id: string;
  name: string;
  description: string;
  steps: string[];
  deliverable: string;
}

export const investmentBankingLessons: InteractiveLessonContent[] = [
  {
    level: 1,
    title: "Welcome to Wall Street",
    description: "Learn the basics of investment banking through fun games and simple explanations",
    theme: "Foundation Building",
    objectives: [
      "Understand what investment banking is",
      "Learn key terminology in simple terms",
      "Explore different types of deals",
      "Meet your first virtual clients"
    ],
    miniGames: [
      {
        id: "ib-basics-matching",
        name: "Wall Street Word Match",
        type: "matching",
        description: "Match investment banking terms with their simple explanations",
        difficulty: "beginner",
        xpReward: 50
      },
      {
        id: "deal-type-sorter",
        name: "Deal Type Detective",
        type: "drag-drop",
        description: "Sort different business situations into IPO, M&A, or other categories",
        difficulty: "beginner",
        xpReward: 75
      }
    ],
    realWorldExamples: [
      {
        id: "facebook-ipo",
        title: "Facebook Goes Public",
        company: "Facebook (Meta)",
        year: 2012,
        description: "How Facebook sold shares to the public for the first time",
        keyLearning: "IPOs help companies raise money from many investors",
        difficulty: "beginner"
      }
    ],
    interactiveQuiz: {
      id: "level-1-quiz",
      questions: [
        {
          id: "q1-1",
          question: "What does IPO stand for?",
          options: ["Internet Public Offering", "Initial Public Offering", "Investment Portfolio Option", "International Private Office"],
          correctAnswer: 1,
          explanation: "IPO stands for Initial Public Offering - when a company sells shares to the public for the first time!",
          difficulty: "beginner"
        }
      ]
    },
    terminology: ["ipo", "merger", "acquisition", "stock", "client", "deal"],
    practicalActivity: {
      id: "create-pitch",
      name: "Your First Pitch",
      description: "Create a simple presentation about why a lemonade stand should work with your 'bank'",
      steps: [
        "Choose a local business (like a lemonade stand)",
        "Think of one way you could help them grow",
        "Create 3 slides explaining your idea",
        "Present to Phil the Panda"
      ],
      deliverable: "3-slide presentation with simple language"
    }
  },
  {
    level: 2,
    title: "The Deal Making Process",
    description: "Dive deeper into how investment bankers structure and execute deals",
    theme: "Process Mastery",
    objectives: [
      "Understand the complete deal process",
      "Learn about client relationships",
      "Practice basic financial analysis",
      "Experience a mock deal simulation"
    ],
    miniGames: [
      {
        id: "deal-timeline",
        name: "Deal Flow Builder",
        type: "timeline",
        description: "Arrange the steps of an M&A process in the correct order",
        difficulty: "intermediate",
        xpReward: 100
      },
      {
        id: "client-scenario",
        name: "Client Meeting Simulator",
        type: "scenario",
        description: "Navigate different client conversations and choose the best responses",
        difficulty: "intermediate",
        xpReward: 125
      }
    ],
    realWorldExamples: [
      {
        id: "disney-fox",
        title: "Disney Acquires 21st Century Fox",
        company: "Disney & Fox",
        year: 2019,
        description: "How Disney bought Fox's entertainment assets for $71 billion",
        keyLearning: "Large acquisitions require careful planning and regulatory approval",
        difficulty: "intermediate"
      }
    ],
    interactiveQuiz: {
      id: "level-2-quiz",
      questions: [
        {
          id: "q2-1",
          question: "What is the first step in most M&A deals?",
          options: ["Sign the contract", "Do due diligence", "Initial discussion and NDA", "Calculate the price"],
          correctAnswer: 2,
          explanation: "Most deals start with initial discussions and signing a Non-Disclosure Agreement (NDA) to share confidential information.",
          difficulty: "intermediate"
        }
      ]
    },
    terminology: ["due_diligence", "synergy", "nda", "loi", "closing"],
    practicalActivity: {
      id: "mini-deal",
      name: "Mock M&A Deal",
      description: "Guide two fictional companies through a merger process",
      steps: [
        "Review both companies' basic information",
        "Identify potential synergies",
        "Calculate a fair purchase price",
        "Present your recommendation"
      ],
      deliverable: "Deal summary with price recommendation"
    }
  },
  {
    level: 3,
    title: "Life on the Street",
    description: "Experience the daily reality of working in investment banking",
    theme: "Culture & Environment",
    objectives: [
      "Understand IB work culture and expectations",
      "Learn about team dynamics and hierarchy",
      "Practice time management with multiple deals",
      "Develop professional communication skills"
    ],
    miniGames: [
      {
        id: "day-planner",
        name: "IB Day Scheduler",
        type: "simulation",
        description: "Manage a busy day with multiple client calls, due diligence, and pitch prep",
        difficulty: "intermediate",
        xpReward: 150
      },
      {
        id: "hierarchy-game",
        name: "Know Your Team",
        type: "matching",
        description: "Match team members with their roles and responsibilities",
        difficulty: "intermediate",
        xpReward: 100
      }
    ],
    realWorldExamples: [
      {
        id: "goldman-culture",
        title: "Goldman Sachs Team Structure",
        company: "Goldman Sachs",
        year: 2023,
        description: "How investment banking teams are organized and work together",
        keyLearning: "Successful deals require coordination between analysts, associates, VPs, and MDs",
        difficulty: "intermediate"
      }
    ],
    interactiveQuiz: {
      id: "level-3-quiz",
      questions: [
        {
          id: "q3-1",
          question: "What is typically the most junior role in an investment banking team?",
          options: ["Associate", "Vice President", "Analyst", "Managing Director"],
          correctAnswer: 2,
          explanation: "Analysts are typically the most junior role, often recent college graduates who do much of the financial modeling and research.",
          difficulty: "intermediate"
        }
      ]
    },
    terminology: ["analyst", "associate", "vp", "md", "pitch_book", "all_nighter"],
    practicalActivity: {
      id: "team-project",
      name: "Virtual Team Exercise",
      description: "Work with AI teammates to complete a pitch book section",
      steps: [
        "Receive your role assignment",
        "Coordinate with team members",
        "Complete your section of the pitch",
        "Review the final presentation"
      ],
      deliverable: "One section of a professional pitch book"
    }
  },
  {
    level: 4,
    title: "Excel & Analysis Mastery",
    description: "Master the technical skills that make investment bankers valuable",
    theme: "Technical Excellence",
    objectives: [
      "Build financial models from scratch",
      "Learn advanced Excel techniques",
      "Understand valuation methodologies",
      "Practice scenario analysis"
    ],
    miniGames: [
      {
        id: "excel-race",
        name: "Spreadsheet Speed Challenge",
        type: "simulation",
        description: "Complete financial calculations quickly and accurately",
        difficulty: "advanced",
        xpReward: 200
      },
      {
        id: "valuation-builder",
        name: "Company Value Calculator",
        type: "simulation",
        description: "Build a simple DCF model to value a company",
        difficulty: "advanced",
        xpReward: 250
      }
    ],
    realWorldExamples: [
      {
        id: "tesla-valuation",
        title: "Tesla's Unique Valuation Challenge",
        company: "Tesla",
        year: 2020,
        description: "How analysts struggled to value Tesla during its rapid growth phase",
        keyLearning: "Valuing high-growth companies requires multiple methodologies and assumptions",
        difficulty: "advanced"
      }
    ],
    interactiveQuiz: {
      id: "level-4-quiz",
      questions: [
        {
          id: "q4-1",
          question: "What does DCF stand for in valuation?",
          options: ["Direct Cash Flow", "Discounted Cash Flow", "Dividend Capital Fund", "Debt Coverage Factor"],
          correctAnswer: 1,
          explanation: "DCF stands for Discounted Cash Flow - a method to value companies based on their expected future cash flows.",
          difficulty: "advanced"
        }
      ]
    },
    terminology: ["dcf_model", "wacc", "terminal_value", "sensitivity_analysis", "comparable_analysis"],
    practicalActivity: {
      id: "build-model",
      name: "Your First Financial Model",
      description: "Create a complete DCF model for a real company",
      steps: [
        "Download historical financial data",
        "Project future cash flows",
        "Calculate discount rate (WACC)",
        "Determine terminal value",
        "Present your valuation range"
      ],
      deliverable: "Complete DCF model with executive summary"
    }
  },
  {
    level: 5,
    title: "Real Deals & Case Studies",
    description: "Analyze actual investment banking transactions and their impact",
    theme: "Market Reality",
    objectives: [
      "Study famous deals and their outcomes",
      "Understand market cycles and timing",
      "Learn from both successes and failures",
      "Connect theory to practice"
    ],
    miniGames: [
      {
        id: "deal-detective",
        name: "Historical Deal Analysis",
        type: "scenario",
        description: "Investigate famous deals and predict their outcomes",
        difficulty: "advanced",
        xpReward: 300
      },
      {
        id: "market-timing",
        name: "IPO Timing Game",
        type: "simulation",
        description: "Choose the best time to take companies public based on market conditions",
        difficulty: "advanced",
        xpReward: 275
      }
    ],
    realWorldExamples: [
      {
        id: "wework-ipo",
        title: "WeWork's Failed IPO",
        company: "WeWork",
        year: 2019,
        description: "How WeWork's IPO attempt revealed fundamental business problems",
        keyLearning: "Due diligence and honest valuation are crucial - hype doesn't replace fundamentals",
        difficulty: "advanced"
      },
      {
        id: "berkshire-acquisitions",
        title: "Berkshire Hathaway's Acquisition Strategy",
        company: "Berkshire Hathaway",
        year: 2023,
        description: "Warren Buffett's long-term approach to acquiring businesses",
        keyLearning: "Different acquisition strategies work for different types of buyers",
        difficulty: "advanced"
      }
    ],
    interactiveQuiz: {
      id: "level-5-quiz",
      questions: [
        {
          id: "q5-1",
          question: "What often causes IPOs to be postponed or cancelled?",
          options: ["High interest rates", "Market volatility", "Poor company fundamentals", "All of the above"],
          correctAnswer: 3,
          explanation: "IPO timing depends on multiple factors: market conditions, interest rates, and the company's readiness and fundamentals.",
          difficulty: "advanced"
        }
      ]
    },
    terminology: ["market_conditions", "ipo_window", "deal_flow", "sector_rotation", "credit_markets"],
    practicalActivity: {
      id: "case-analysis",
      name: "Deal Post-Mortem Analysis",
      description: "Analyze a completed deal and assess its success factors",
      steps: [
        "Choose a major deal from the past 5 years",
        "Research the strategic rationale",
        "Analyze the execution process",
        "Evaluate the outcomes 2+ years later",
        "Present lessons learned"
      ],
      deliverable: "Comprehensive case study with recommendations"
    }
  },
  {
    level: 6,
    title: "Economics & Global Markets",
    description: "Understand how macroeconomic factors influence investment banking",
    theme: "Macro Perspective",
    objectives: [
      "Connect economic indicators to deal activity",
      "Understand regulatory environment",
      "Learn about cross-border transactions",
      "Analyze sector-specific trends"
    ],
    miniGames: [
      {
        id: "macro-predictor",
        name: "Economic Impact Simulator",
        type: "simulation",
        description: "Predict how economic changes will affect different types of deals",
        difficulty: "advanced",
        xpReward: 350
      },
      {
        id: "global-deals",
        name: "Cross-Border Deal Builder",
        type: "scenario",
        description: "Navigate the complexities of international M&A transactions",
        difficulty: "advanced",
        xpReward: 325
      }
    ],
    realWorldExamples: [
      {
        id: "covid-deals",
        title: "M&A During COVID-19",
        company: "Various",
        year: 2020,
        description: "How the pandemic changed deal dynamics and created new opportunities",
        keyLearning: "Economic disruption creates both challenges and opportunities for strategic transactions",
        difficulty: "advanced"
      }
    ],
    interactiveQuiz: {
      id: "level-6-quiz",
      questions: [
        {
          id: "q6-1",
          question: "How do rising interest rates typically affect M&A activity?",
          options: ["Increase activity", "Decrease activity", "No effect", "Only affects certain sectors"],
          correctAnswer: 1,
          explanation: "Rising interest rates generally decrease M&A activity because financing becomes more expensive and company valuations often decline.",
          difficulty: "advanced"
        }
      ]
    },
    terminology: ["fed_policy", "credit_spreads", "regulatory_approval", "antitrust", "cross_border"],
    practicalActivity: {
      id: "macro-analysis",
      name: "Economic Trend Report",
      description: "Analyze current economic conditions and predict impact on deal activity",
      steps: [
        "Research current economic indicators",
        "Identify key trends affecting M&A",
        "Select 2-3 sectors to analyze in detail",
        "Make predictions for next 12 months",
        "Present findings with supporting data"
      ],
      deliverable: "Economic outlook report with deal activity predictions"
    }
  },
  {
    level: 7,
    title: "Career Mastery & Leadership",
    description: "Prepare for advanced roles and interview success",
    theme: "Professional Excellence",
    objectives: [
      "Master advanced interview techniques",
      "Develop leadership and client skills",
      "Build your professional network",
      "Plan your career trajectory"
    ],
    miniGames: [
      {
        id: "interview-master",
        name: "Investment Banking Interview Simulator",
        type: "scenario",
        description: "Practice technical and behavioral questions with AI feedback",
        difficulty: "advanced",
        xpReward: 400
      },
      {
        id: "client-pitch",
        name: "Executive Presentation Challenge",
        type: "simulation",
        description: "Present to demanding C-suite executives and handle tough questions",
        difficulty: "advanced",
        xpReward: 450
      }
    ],
    realWorldExamples: [
      {
        id: "successful-careers",
        title: "IB Alumni Success Stories",
        company: "Various",
        year: 2023,
        description: "How investment banking experience launches diverse career paths",
        keyLearning: "IB skills transfer to many industries - private equity, corporate development, entrepreneurship",
        difficulty: "advanced"
      }
    ],
    interactiveQuiz: {
      id: "level-7-quiz",
      questions: [
        {
          id: "q7-1",
          question: "What's the most important skill for senior investment bankers?",
          options: ["Excel modeling", "Client relationship management", "Financial analysis", "Working long hours"],
          correctAnswer: 1,
          explanation: "While technical skills are important, senior bankers succeed primarily through building and maintaining strong client relationships.",
          difficulty: "advanced"
        }
      ]
    },
    terminology: ["client_coverage", "origination", "relationship_management", "thought_leadership", "deal_captain"],
    practicalActivity: {
      id: "career-plan",
      name: "Personal Career Strategy",
      description: "Develop a comprehensive plan for your investment banking career",
      steps: [
        "Assess your current skills and experience",
        "Research target firms and roles",
        "Create a networking strategy",
        "Prepare interview materials",
        "Set 6-month and 2-year goals"
      ],
      deliverable: "Personal career development plan with action items"
    }
  }
];
