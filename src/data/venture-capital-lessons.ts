export interface VCLessonContent {
  id: string;
  title: string;
  description: string;
  level: number;
  learningObjectives: string[];
  keyQuestions: string[];
  keyTerms: string[];
  miniGames: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedTime: string;
  }>;
  realWorldExamples: Array<{
    title: string;
    description: string;
    company?: string;
    outcome?: string;
    lessonsLearned: string[];
  }>;
  practiceActivity: {
    title: string;
    description: string;
    deliverable: string;
    timeEstimate: string;
  };
  interactiveQuiz: {
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
      difficulty: string;
    }>;
  };
}

export const vcLessons: VCLessonContent[] = [
  {
    id: "vc-fundamentals",
    title: "Venture Capital Fundamentals",
    description: "Master the core concepts of venture capital, understanding how VCs identify, evaluate, and invest in high-growth startups.",
    level: 1,
    learningObjectives: [
      "Understand what venture capital is and how it differs from other forms of financing",
      "Learn the startup ecosystem and where VC fits in the funding lifecycle",
      "Grasp the basic risk-reward profile of venture investing",
      "Identify the key players in the VC ecosystem"
    ],
    keyQuestions: [
      "What makes a company suitable for venture capital investment?",
      "How do VCs make money and what are their return expectations?",
      "What is the typical investment process from initial contact to funding?",
      "How does venture capital impact startup growth and strategy?"
    ],
    keyTerms: ["Venture Capital", "Portfolio Company", "Term Sheet", "Due Diligence", "Equity"],
    miniGames: [
      {
        id: "vc-fundamentals-match",
        title: "VC Fundamentals Match",
        description: "Match venture capital terms with their correct definitions",
        difficulty: "Beginner",
        estimatedTime: "5 minutes"
      },
      {
        id: "startup-vs-traditional-business",
        title: "Startup vs Traditional Business",
        description: "Identify which businesses are suitable for VC investment",
        difficulty: "Beginner",
        estimatedTime: "7 minutes"
      }
    ],
    realWorldExamples: [
      {
        title: "Sequoia's Early Google Investment",
        description: "In 1999, Sequoia Capital invested $12.5M in Google for 12.5% equity when the company was just a search engine idea from Stanford students.",
        company: "Google",
        outcome: "Google went public in 2004, making Sequoia's investment worth over $4 billion - a 300x return.",
        lessonsLearned: [
          "Great founders with deep technical expertise can build massive companies",
          "Large addressable markets create opportunity for exceptional returns",
          "Sometimes the biggest opportunities look small at first"
        ]
      },
      {
        title: "The Power of Platform Thinking",
        description: "Amazon started as an online bookstore but Jeff Bezos had a vision for a broader e-commerce platform.",
        company: "Amazon",
        outcome: "Became one of the world's largest companies with a $1+ trillion market cap.",
        lessonsLearned: [
          "Platform businesses can scale beyond their initial market",
          "Long-term vision matters more than short-term profitability",
          "Customer obsession drives sustainable competitive advantage"
        ]
      }
    ],
    practiceActivity: {
      title: "Startup Investment Evaluation",
      description: "Evaluate three different startup pitches and determine which would be most suitable for VC investment.",
      deliverable: "Investment recommendation memo with reasoning",
      timeEstimate: "30 minutes"
    },
    interactiveQuiz: {
      questions: [
        {
          id: "vc-definition",
          question: "What is the primary way venture capitalists make money?",
          options: [
            "Annual management fees from their funds",
            "Capital gains from successful portfolio company exits",
            "Interest payments from portfolio companies",
            "Consulting fees for advisory services"
          ],
          correctAnswer: 1,
          explanation: "VCs primarily make money through capital gains when their portfolio companies are sold or go public, typically earning 20% of the profits (carried interest).",
          difficulty: "beginner"
        },
        {
          id: "vc-stage",
          question: "At what stage do venture capitalists typically invest?",
          options: [
            "After companies go public",
            "In established, profitable companies",
            "In early to growth-stage companies with high potential",
            "Only in companies that are already generating revenue"
          ],
          correctAnswer: 2,
          explanation: "VCs focus on early to growth-stage companies that show high growth potential, often before they're profitable but with clear paths to significant revenue growth.",
          difficulty: "beginner"
        }
      ]
    }
  },
  {
    id: "deal-sourcing",
    title: "Deal Sourcing & Evaluation",
    description: "Learn how VCs build their investment pipeline, source quality deals, and conduct initial company evaluations.",
    level: 2,
    learningObjectives: [
      "Understand different channels for deal sourcing",
      "Learn how to build and maintain a strong network",
      "Master initial company screening processes",
      "Develop frameworks for early-stage evaluation"
    ],
    keyQuestions: [
      "What are the most effective ways to source high-quality deals?",
      "How do you quickly assess whether a startup is worth deeper investigation?",
      "What role does networking play in venture capital success?",
      "How do you evaluate founding teams and market opportunities?"
    ],
    keyTerms: ["Series A", "Valuation", "Cap Table", "Board of Directors", "Runway"],
    miniGames: [
      {
        id: "startup-pitch-evaluator",
        title: "Startup Pitch Evaluator",
        description: "Evaluate startup pitches and decide which ones to pursue for due diligence",
        difficulty: "Intermediate",
        estimatedTime: "10 minutes"
      },
      {
        id: "network-builder",
        title: "Network Builder",
        description: "Build your VC network by connecting with the right people and organizations",
        difficulty: "Intermediate",
        estimatedTime: "8 minutes"
      }
    ],
    realWorldExamples: [
        {
        title: "Benchmark's Uber Discovery",
        description: "Benchmark discovered Uber through their network and cold outreach, leading to a $11M Series A investment.",
        company: "Uber",
        outcome: "Uber's Series A valued the company at $60M; it later reached a peak valuation of over $80B.",
        lessonsLearned: [
          "Strong networks help identify opportunities early",
          "Sometimes the best deals require proactive outreach",
          "Understanding market timing is crucial for big wins"
        ]
      }
    ],
    practiceActivity: {
      title: "Deal Sourcing Strategy",
      description: "Create a comprehensive deal sourcing strategy for a specific sector or stage focus.",
      deliverable: "Deal sourcing playbook with tactics and metrics",
      timeEstimate: "45 minutes"
    },
    interactiveQuiz: {
      questions: [
        {
          id: "sourcing-channels",
          question: "Which is typically the BEST source of high-quality deal flow for VCs?",
          options: [
            "Cold emails from entrepreneurs",
            "Referrals from existing portfolio companies and other VCs",
            "Demo days at accelerators",
            "Industry conferences and events"
          ],
          correctAnswer: 1,
          explanation: "Referrals from trusted sources like portfolio companies and other VCs typically provide the highest quality deal flow because they come with implicit validation.",
          difficulty: "intermediate"
        }
      ]
    }
  }
  // Additional levels would continue here...
];

export const getVCLessonByLevel = (level: number): VCLessonContent | undefined => {
  return vcLessons.find(lesson => lesson.level === level);
};

export const getAllVCLessons = (): VCLessonContent[] => {
  return vcLessons;
};