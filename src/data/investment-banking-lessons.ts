import { StaticImageData } from 'next/image';

export interface InteractiveLessonContent {
  level: number;
  title: string;
  description: string;
  keyTerms: string[];
  keyQuestions: string[];
  miniGames: MiniGameConfig[];
  realWorldExamples: RealWorldExampleConfig[];
  interactiveQuiz: InteractiveQuizConfig;
  practicalActivity: PracticalActivityConfig;
}

export interface MiniGameConfig {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface RealWorldExampleConfig {
  id: string;
  title: string;
  company: string;
  year: number;
  description: string;
  keyLearning: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface InteractiveQuizConfig {
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

export interface PracticalActivityConfig {
  name: string;
  description: string;
  steps: string[];
  deliverable: string;
}

const level1Lesson: InteractiveLessonContent = {
  level: 1,
  title: "Investment Banking Basics",
  description: "Get an introduction to the world of investment banking and its role in finance",
  keyTerms: ['investment_bank', 'ipo', 'merger', 'financing', 'client'],
  keyQuestions: [
    "What do investment banks do?",
    "What is an IPO?",
    "What is a merger?",
    "What is financing?"
  ],
  miniGames: [
    {
      id: 'ib-basics-matching',
      name: 'Wall Street Word Match',
      description: 'Match key investment banking terms with their definitions',
      xpReward: 50,
      difficulty: 'beginner'
    },
    {
      id: 'deal-type-sorter',
      name: 'Deal Type Detective',
      description: 'Identify different types of investment banking deals',
      xpReward: 75,
      difficulty: 'beginner'
    }
  ],
  realWorldExamples: [
    {
      id: 'apple-ipo-1980',
      title: "Apple's IPO (1980)",
      company: "Apple",
      year: 1980,
      description: "Apple went public in December 1980, raising $100 million and creating more millionaires than any IPO before it. Investment bank Morgan Stanley managed the IPO, valuing Apple at $1.778 billion. This event marked a turning point in the tech industry, demonstrating the potential for high-growth companies to access public markets and fuel further innovation.",
      keyLearning: "IPOs provide companies with capital for growth and can create significant wealth for early investors and employees.",
      difficulty: 'beginner'
    },
    {
      id: 'kraft-heinz-merger-2015',
      title: "Kraft-Heinz Merger (2015)",
      company: "Kraft-Heinz",
      year: 2015,
      description: "In 2015, Kraft Foods and Heinz merged in a deal orchestrated by Warren Buffett's Berkshire Hathaway and 3G Capital. The merger created one of the largest food companies in the world, valued at $87 billion. Investment banks Lazard and Centerview Partners advised on the deal, which aimed to create synergies and cost savings through consolidation.",
      keyLearning: "Mergers can create larger, more efficient companies by combining resources and reducing redundancies.",
      difficulty: 'beginner'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'what-is-ib',
        question: "What is the primary role of an investment bank?",
        options: [
          "Managing personal bank accounts",
          "Providing financial advice and services to corporations and governments",
          "Selling insurance policies",
          "Operating retail stores"
        ],
        correctAnswer: 1,
        explanation: "Investment banks provide financial advice, raise capital, and assist with mergers and acquisitions for corporations and governments.",
        difficulty: 'beginner'
      },
      {
        id: 'what-is-ipo',
        question: "What does IPO stand for?",
        options: [
          "Initial Public Offering",
          "Investment Portfolio Option",
          "Income Property Opportunity",
          "Individual Pension Obligation"
        ],
        correctAnswer: 0,
        explanation: "IPO stands for Initial Public Offering, which is when a company sells shares to the public for the first time.",
        difficulty: 'beginner'
      }
    ]
  },
  practicalActivity: {
    name: "Elevator Pitch",
    description: "Create a 30-second elevator pitch explaining what investment banking is to someone you meet in an elevator.",
    steps: [
      "Start with a hook: 'I help companies grow and achieve their financial goals.'",
      "Explain the core functions: 'We provide advice, raise capital, and facilitate mergers.'",
      "Give a real-world example: 'Like when Apple went public or Kraft and Heinz merged.'",
      "End with a question: 'Interested in learning more?'"
    ],
    deliverable: "A written script for your 30-second elevator pitch."
  }
};

const level2Lesson: InteractiveLessonContent = {
  level: 2,
  title: "The Deal Factory: How Investment Banks Work",
  description: "Learn how investment banks operate, their different divisions, and the key players in Wall Street deals",
  keyTerms: ['underwriting', 'syndicate', 'prospectus', 'due_diligence', 'pitch_book', 'mandates'],
  keyQuestions: [
    "What is underwriting and why is it important?",
    "How do investment banks form syndicates?",
    "What information goes into a prospectus?",
    "Why is due diligence critical for deals?"
  ],
  miniGames: [
    {
      id: 'ib-divisions-match',
      name: 'Division Detective',
      description: 'Match different investment banking divisions with their responsibilities',
      xpReward: 60,
      difficulty: 'beginner'
    },
    {
      id: 'underwriting-simulator',
      name: 'Underwriting Challenge',
      description: 'Help structure and price a new stock offering for a growing company',
      xpReward: 80,
      difficulty: 'intermediate'
    }
  ],
  realWorldExamples: [
    {
      id: 'spotify-ipo-2018',
      title: "Spotify's Revolutionary Direct Listing (2018)",
      company: "Spotify",
      year: 2018,
      description: "In April 2018, Spotify disrupted the traditional IPO process by choosing a direct listing on the NYSE instead of a conventional IPO. Unlike traditional IPOs where investment banks underwrite and sell new shares, Spotify allowed existing shareholders to sell their shares directly to the public without creating new shares or raising capital. This groundbreaking approach saved millions in underwriting fees and avoided the typical 'pop' that new IPOs experience. Goldman Sachs, Morgan Stanley, and Allen & Company served as financial advisors (not underwriters) to guide the process. The company's shares opened at $165.90, giving it a market value of about $29.5 billion. This direct listing method challenged the traditional investment banking model and paved the way for other companies like Slack and Palantir to follow suit. The success demonstrated that companies with strong brand recognition and sufficient liquidity could bypass traditional IPO constraints.",
      keyLearning: "Direct listings show how companies can innovate around traditional investment banking services, though they require strong market presence and don't raise new capital for the company.",
      difficulty: 'beginner'
    },
    {
      id: 'aramco-ipo-2019',
      title: "Saudi Aramco's Record-Breaking IPO (2019)",
      company: "Saudi Aramco",
      year: 2019,
      description: "Saudi Aramco's IPO in December 2019 became the world's largest public offering, raising $25.6 billion and valuing the oil giant at $1.7 trillion. The deal showcased the massive coordination required for mega-IPOs. A syndicate of 27 global investment banks worked together, with JPMorgan Chase, Morgan Stanley, and HSBC as lead underwriters. The process involved extensive due diligence across the company's vast oil operations, geopolitical risk assessments, and regulatory compliance across multiple jurisdictions. The prospectus exceeded 600 pages, detailing everything from oil reserves to environmental risks. The underwriting syndicate had to price the shares carefully - initially targeting $8.53 per share but settling at the top of the range. The deal required coordination between Saudi regulators, international exchanges, and global investor roadshows. This IPO demonstrated how investment banks manage enormous complexity, regulatory requirements, and market timing for transformational deals.",
      keyLearning: "Mega-IPOs require extensive syndicate coordination, thorough due diligence, and careful pricing to balance company objectives with market conditions.",
      difficulty: 'intermediate'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'underwriting-definition',
        question: "What is the primary role of underwriting in investment banking?",
        options: [
          "Buying shares from companies and reselling them to investors",
          "Providing loans to companies for expansion",
          "Managing company bank accounts",
          "Filing tax returns for corporations"
        ],
        correctAnswer: 0,
        explanation: "Underwriting means the investment bank buys shares from the company and takes on the risk of selling them to investors, like a middleman who guarantees the company gets paid.",
        difficulty: 'beginner'
      },
      {
        id: 'syndicate-purpose',
        question: "Why do investment banks form syndicates for large deals?",
        options: [
          "To reduce competition between banks",
          "To share risk and bring more expertise and investor networks",
          "To increase fees charged to companies",
          "To comply with government regulations"
        ],
        correctAnswer: 1,
        explanation: "Syndicates allow banks to share the financial risk of large deals and combine their expertise and investor relationships to ensure successful completion.",
        difficulty: 'beginner'
      },
      {
        id: 'spotify-innovation',
        question: "How did Spotify's 2018 direct listing differ from traditional IPOs?",
        options: [
          "It raised more money than typical IPOs",
          "It used more investment banks as underwriters",
          "It allowed existing shareholders to sell directly without creating new shares",
          "It was only available to institutional investors"
        ],
        correctAnswer: 2,
        explanation: "Spotify's direct listing bypassed traditional underwriting by letting existing shareholders sell directly to the public, without the company issuing new shares or raising capital.",
        difficulty: 'intermediate'
      },
      {
        id: 'aramco-complexity',
        question: "What made Saudi Aramco's IPO particularly complex for the underwriting syndicate?",
        options: [
          "The company was too small for a public offering",
          "No investors were interested in oil companies",
          "It required coordination across 27 banks, multiple jurisdictions, and extensive due diligence",
          "The Saudi government refused to cooperate"
        ],
        correctAnswer: 2,
        explanation: "Aramco's massive scale required unprecedented coordination between 27 global banks, compliance across multiple countries, and extensive due diligence on the world's largest oil company.",
        difficulty: 'intermediate'
      }
    ]
  },
  practicalActivity: {
    name: "Build Your Investment Bank Pitch",
    description: "Create a pitch presentation for a fictional company seeking investment banking services. You'll act as an investment banker pitching your services to TechGrow Inc., a successful software company considering going public.",
    steps: [
      "Research TechGrow Inc.'s business model: cloud-based project management software with 50,000 customers",
      "Identify 3 key reasons why TechGrow should go public now (growth funding, employee stock options, market visibility)",
      "Create a simple pitch outline covering: company overview, IPO benefits, your bank's qualifications, timeline, and next steps",
      "Calculate basic IPO math: if TechGrow wants to raise $100M at a $1B valuation, how many shares should they sell?",
      "Prepare answers to likely client questions: 'How long will the process take?' and 'What are the main risks?'"
    ],
    deliverable: "A 5-slide pitch presentation outline with speaker notes explaining your recommendations for TechGrow's IPO strategy."
  }
};

const level3Lesson: InteractiveLessonContent = {
  level: 3,
  title: "Mergers & Acquisitions: The Art of Corporate Deals",
  description: "Explore how companies buy, sell, and merge with each other, and the investment bankers who make it happen",
  keyTerms: ['merger', 'acquisition', 'hostile_takeover', 'due_diligence', 'synergies', 'valuation'],
  keyQuestions: [
    "What's the difference between a merger and an acquisition?",
    "How do investment bankers value companies in M&A deals?",
    "What are synergies and why do they matter?",
    "How do hostile takeovers work?"
  ],
  miniGames: [
    {
      id: 'ma-deal-builder',
      name: 'M&A Deal Architect',
      description: 'Structure a merger between two companies by identifying synergies and negotiating terms',
      xpReward: 75,
      difficulty: 'intermediate'
    },
    {
      id: 'valuation-challenge',
      name: 'Company Valuation Master',
      description: 'Use different methods to value companies and see which price makes sense',
      xpReward: 85,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'disney-fox-2019',
      title: "Disney's $71 Billion Acquisition of 21st Century Fox (2019)",
      company: "Disney & 21st Century Fox",
      year: 2019,
      description: "Disney's acquisition of 21st Century Fox entertainment assets was one of the largest media deals in history, showcasing complex M&A strategy and execution. The deal took nearly two years to complete, involving intense negotiations, regulatory approvals across multiple countries, and a bidding war with Comcast. Goldman Sachs and JPMorgan advised Disney, while Centerview Partners and Guggenheim Securities advised Fox. The transaction included Fox's movie studio, TV production companies, cable networks like FX, and international properties like Star India. Disney's strategic rationale centered on content synergies for its streaming service Disney+ and international expansion. The investment banks had to navigate complex regulatory reviews, including antitrust concerns about Disney's growing media dominance. The deal structure included both cash and stock, requiring careful valuation work as both companies' share prices fluctuated during the lengthy process. Due diligence involved analyzing thousands of content assets, international operations, and potential regulatory outcomes.",
      keyLearning: "Large M&A deals require extensive regulatory navigation, multiple valuation approaches, and strategic vision to identify and execute on synergies across different business lines.",
      difficulty: 'intermediate'
    },
    {
      id: 'broadcom-qualcomm-failed',
      title: "Broadcom's Failed $117 Billion Hostile Takeover of Qualcomm (2018)",
      company: "Broadcom & Qualcomm",
      year: 2018,
      description: "Broadcom's attempted hostile takeover of Qualcomm demonstrated the complexities and risks of unsolicited M&A deals. Broadcom, advised by Citi and JPMorgan, offered $117 billion for Qualcomm, which was advised by Goldman Sachs and Evercore. The deal became hostile when Qualcomm's board rejected multiple offers, forcing Broadcom to attempt a proxy fight to replace Qualcomm's directors. The transaction faced multiple obstacles: national security concerns over foreign ownership of critical U.S. semiconductor technology, regulatory scrutiny from multiple countries, and Qualcomm's own pending acquisition of NXP Semiconductors. Investment bankers had to navigate geopolitical risks, technology transfer concerns, and complex semiconductor industry dynamics. The deal ultimately collapsed when the U.S. Treasury's CFIUS (Committee on Foreign Investment) blocked it due to national security concerns, despite Broadcom's promise to move its headquarters to the U.S. This case highlighted how geopolitical factors can override financial logic in major M&A transactions.",
      keyLearning: "Hostile takeovers face additional complexities including proxy battles, regulatory risks, and geopolitical considerations that can derail even well-financed deals.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'merger-vs-acquisition',
        question: "What's the key difference between a merger and an acquisition?",
        options: [
          "Mergers are always larger than acquisitions",
          "In mergers, companies combine as equals; in acquisitions, one company buys another",
          "Mergers only happen between competitors",
          "Acquisitions require more regulatory approval"
        ],
        correctAnswer: 1,
        explanation: "In a merger, two companies combine to form a new entity as relative equals. In an acquisition, one company (acquirer) buys and absorbs another company (target).",
        difficulty: 'beginner'
      },
      {
        id: 'synergies-meaning',
        question: "What are synergies in M&A deals?",
        options: [
          "The total value of both companies combined",
          "Legal fees paid to investment banks",
          "Benefits created when two companies work better together than separately",
          "The premium paid above market price"
        ],
        correctAnswer: 2,
        explanation: "Synergies are the additional value created when two companies combine - like cost savings from eliminating duplicate departments or increased revenue from cross-selling products.",
        difficulty: 'beginner'
      },
      {
        id: 'disney-fox-strategy',
        question: "What was Disney's main strategic rationale for acquiring Fox's entertainment assets?",
        options: [
          "To eliminate a competitor from the market",
          "To gain content and international assets for Disney+ streaming service",
          "To reduce operating costs through layoffs",
          "To diversify into news and sports broadcasting"
        ],
        correctAnswer: 1,
        explanation: "Disney acquired Fox primarily to gain valuable content for its Disney+ streaming service and expand internationally, especially with assets like Star India.",
        difficulty: 'intermediate'
      },
      {
        id: 'hostile-takeover-challenges',
        question: "Why did Broadcom's hostile takeover of Qualcomm fail?",
        options: [
          "Broadcom couldn't raise enough financing",
          "Qualcomm's stock price was too high",
          "U.S. government blocked it due to national security concerns",
          "Shareholders rejected the deal"
        ],
        correctAnswer: 2,
        explanation: "The U.S. Treasury's CFIUS blocked the deal due to national security concerns about foreign control of critical U.S. semiconductor technology, showing how geopolitical factors can override financial considerations.",
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "M&A Deal Analysis Project",
    description: "Analyze a potential merger between two fictional companies and create a recommendation memo. You're advising GreenTech Energy (solar panel manufacturer) on whether to acquire CleanCar Motors (electric vehicle startup).",
    steps: [
      "Analyze both companies: GreenTech has $500M revenue, strong manufacturing; CleanCar has $50M revenue, innovative battery technology",
      "Identify potential synergies: shared battery technology, combined clean energy ecosystem, cost savings from shared R&D",
      "Calculate basic valuation: If GreenTech trades at 3x revenue and CleanCar at 5x revenue, what would be fair acquisition prices?",
      "Assess risks: integration challenges, technology compatibility, market competition from Tesla",
      "Make recommendation: Should GreenTech pursue this acquisition? What price range makes sense?"
    ],
    deliverable: "A 2-page executive memo with your analysis and recommendation, including financial calculations and risk assessment."
  }
};

export const investmentBankingLessons: InteractiveLessonContent[] = [
  level1Lesson,
  level2Lesson,
  level3Lesson
  // More levels will be added progressively
];
