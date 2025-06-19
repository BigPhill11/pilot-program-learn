
import React from 'react';
import { Building2, ShoppingCart, Stethoscope, Laptop, Brain, TrendingUp, Briefcase } from 'lucide-react';

export interface JourneyLevel {
  level: number;
  title: string;
  focusArea: string;
  description: string;
  estimatedTime: string;
  objectives: string[];
  sampleTopics: string[];
  content: {
    beginner: string;
    intermediate: string;
    pro: string;
  };
  flashcards?: Array<{
    id: string;
    term: string;
    definition: string;
  }>;
  interactiveContent?: {
    beginner: {
      explanation: string;
      realWorldExample: string;
      keyTakeaways: string[];
    };
    intermediate: {
      explanation: string;
      realWorldExample: string;
      keyTakeaways: string[];
    };
    pro: {
      explanation: string;
      realWorldExample: string;
      keyTakeaways: string[];
    };
  };
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface IndustryJourneyData {
  id: string;
  name: string;
  icon: React.ReactElement;
  description: string;
  overview: string;
  howItWorks: string;
  futureOutlook: string;
  levels: JourneyLevel[];
  totalEstimatedTime: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced';
  game?: {
    id: string;
    name: string;
    description: string;
    instructions: string;
    scenarios: Array<{
      id: string;
      scenario: string;
      options: string[];
      correct: number;
      feedback: string;
      points: number;
    }>;
  };
}

export const industryJourneys: IndustryJourneyData[] = [
  {
    id: 'consumer-goods-retail',
    name: 'Consumer Goods & Retail',
    icon: <ShoppingCart className="h-6 w-6" />,
    description: 'Understand how consumer brands create, market, and sell products that people use every day.',
    overview: 'Understand how consumer brands create, market, and sell products that people use every day.',
    howItWorks: 'This industry generates revenue through product sales across multiple channels including retail stores, e-commerce platforms, and direct-to-consumer sales, with success driven by brand strength, distribution networks, and consumer preferences.',
    futureOutlook: 'E-commerce growth, sustainability concerns, and personalization technologies are reshaping how consumer goods companies reach customers and develop products.',
    totalEstimatedTime: '45 min',
    difficulty: 'Beginner Friendly',
    levels: [
      {
        level: 1,
        title: 'Introduction to Consumer Goods',
        focusArea: 'Consumer Goods Basics',
        description: 'Learn what consumer goods are and how they differ from other products',
        estimatedTime: '10 min',
        objectives: [
          'Define consumer goods and their categories',
          'Understand the difference between durable and non-durable goods',
          'Identify major consumer goods companies'
        ],
        sampleTopics: ['Product categories', 'Brand positioning', 'Market segmentation', 'Consumer behavior'],
        content: {
          beginner: 'Consumer goods are products that regular people buy for their daily lives, like food, clothes, and household items.',
          intermediate: 'Consumer goods represent products purchased by consumers for personal use, categorized into convenience, shopping, and specialty goods based on buying behavior.',
          pro: 'Consumer goods encompass tangible products purchased by end consumers, classified by durability, shopping habits, and market positioning within the retail ecosystem.'
        }
      },
      {
        level: 2,
        title: 'Retail Distribution',
        focusArea: 'Distribution Channels',
        description: 'How products get from manufacturers to consumers',
        estimatedTime: '15 min',
        objectives: [
          'Understand supply chain basics',
          'Learn about different retail channels',
          'Explore e-commerce vs traditional retail'
        ],
        sampleTopics: ['Supply chain management', 'Retail channels', 'E-commerce platforms', 'Inventory management'],
        content: {
          beginner: 'Products travel from factories to stores through a chain of warehouses and trucks before you can buy them.',
          intermediate: 'Retail distribution involves complex supply chains connecting manufacturers, distributors, and retailers to deliver products efficiently to consumers.',
          pro: 'Modern retail distribution leverages omnichannel strategies, integrating traditional and digital channels through sophisticated logistics and inventory management systems.'
        }
      },
      {
        level: 3,
        title: 'Market Analysis',
        focusArea: 'Consumer Market Dynamics',
        description: 'Understanding consumer behavior and market trends',
        estimatedTime: '20 min',
        objectives: [
          'Analyze consumer purchasing patterns',
          'Identify market trends and opportunities',
          'Understand competitive positioning'
        ],
        sampleTopics: ['Consumer behavior analysis', 'Market research', 'Competitive analysis', 'Trend forecasting'],
        content: {
          beginner: 'Companies study what people like to buy and when they buy it to make better products and set the right prices.',
          intermediate: 'Market analysis involves studying consumer demographics, purchasing patterns, and competitive landscapes to inform strategic business decisions.',
          pro: 'Comprehensive market analysis employs quantitative and qualitative research methodologies to assess market size, growth potential, and competitive dynamics.'
        }
      }
    ]
  },
  {
    id: 'healthcare-biotech',
    name: 'Healthcare & Biotechnology',
    icon: <Stethoscope className="h-6 w-6" />,
    description: 'Explore how medical innovations and biotechnology companies develop treatments and improve health outcomes.',
    overview: 'Explore how medical innovations and biotechnology companies develop treatments and improve health outcomes.',
    howItWorks: 'This industry generates revenue through drug sales, medical device sales, healthcare services, and research partnerships, with success driven by regulatory approvals, clinical trial results, and market adoption.',
    futureOutlook: 'Personalized medicine, gene therapy, and digital health technologies are creating new treatment possibilities while increasing development costs and regulatory complexity.',
    totalEstimatedTime: '60 min',
    difficulty: 'Intermediate',
    levels: [
      {
        level: 1,
        title: 'Healthcare Industry Overview',
        focusArea: 'Healthcare Ecosystem',
        description: 'Understanding the healthcare ecosystem',
        estimatedTime: '15 min',
        objectives: [
          'Map the healthcare value chain',
          'Understand different healthcare sectors',
          'Learn about regulatory environment'
        ],
        sampleTopics: ['Healthcare providers', 'Insurance systems', 'Pharmaceutical companies', 'Medical devices'],
        content: {
          beginner: 'Healthcare includes hospitals, doctors, medicine companies, and insurance that all work together to keep people healthy.',
          intermediate: 'The healthcare industry encompasses providers, payers, pharmaceutical companies, and medical device manufacturers within a heavily regulated environment.',
          pro: 'Healthcare represents a complex ecosystem of stakeholders including providers, payers, pharmaceutical companies, biotechnology firms, and medical device manufacturers, all operating within stringent regulatory frameworks.'
        }
      },
      {
        level: 2,
        title: 'Drug Development Process',
        focusArea: 'Pharmaceutical Innovation',
        description: 'How new medicines are created and approved',
        estimatedTime: '20 min',
        objectives: [
          'Understand clinical trial phases',
          'Learn about FDA approval process',
          'Explore drug development costs and timelines'
        ],
        sampleTopics: ['Clinical trials', 'FDA approval', 'Drug discovery', 'Regulatory compliance'],
        content: {
          beginner: 'Creating new medicines takes many years of testing to make sure they are safe and work well before doctors can give them to patients.',
          intermediate: 'Drug development involves preclinical research, three phases of clinical trials, and regulatory approval processes that typically take 10-15 years and cost billions.',
          pro: 'Pharmaceutical development encompasses discovery, preclinical research, IND application, Phase I-III clinical trials, NDA/BLA submission, and post-market surveillance, with success rates below 10%.'
        }
      },
      {
        level: 3,
        title: 'Biotechnology Innovation',
        focusArea: 'Biotech Applications',
        description: 'Cutting-edge biotech applications and business models',
        estimatedTime: '25 min',
        objectives: [
          'Explore gene therapy and personalized medicine',
          'Understand biotech investment landscape',
          'Learn about intellectual property in biotech'
        ],
        sampleTopics: ['Gene therapy', 'Personalized medicine', 'Biotech investing', 'IP strategy'],
        content: {
          beginner: 'Biotechnology companies use advanced science to create new treatments that can be designed specifically for individual patients.',
          intermediate: 'Biotechnology leverages molecular biology, genetics, and engineering to develop innovative therapies, diagnostics, and treatment approaches.',
          pro: 'Biotechnology encompasses genomics, proteomics, cell therapy, gene editing, and synthetic biology, creating platform technologies for precision medicine and therapeutic innovation.'
        }
      }
    ]
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    icon: <TrendingUp className="h-6 w-6" />,
    description: 'Learn how private equity firms acquire, improve, and sell companies to generate returns for investors.',
    overview: 'Learn how private equity firms acquire, improve, and sell companies to generate returns for investors.',
    howItWorks: 'Private equity firms raise capital from institutional investors, acquire companies using leverage, implement operational improvements, and exit through sales or IPOs to generate returns.',
    futureOutlook: 'ESG considerations, technology integration, and market volatility are reshaping private equity strategies and investor expectations.',
    totalEstimatedTime: '75 min',
    difficulty: 'Advanced',
    levels: [
      {
        level: 1,
        title: 'Private Equity Fundamentals',
        focusArea: 'PE Business Model',
        description: 'Understanding the private equity business model',
        estimatedTime: '25 min',
        objectives: [
          'Define private equity and its role in finance',
          'Understand the fund structure and lifecycle',
          'Learn about different PE strategies'
        ],
        sampleTopics: ['PE fund structure', 'Investment strategies', 'Portfolio management', 'Exit strategies'],
        content: {
          beginner: 'Private equity firms buy companies, make them better, and then sell them to make money for their investors.',
          intermediate: 'Private equity involves acquiring companies using investor capital and debt, implementing operational improvements, and exiting through sales or IPOs.',
          pro: 'Private equity represents an alternative asset class where funds acquire controlling stakes in companies, execute value creation strategies, and achieve returns through strategic exits.'
        }
      },
      {
        level: 2,
        title: 'Deal Process & Due Diligence',
        focusArea: 'Transaction Execution',
        description: 'How private equity deals are structured and executed',
        estimatedTime: '25 min',
        objectives: [
          'Understand the deal sourcing process',
          'Learn about due diligence procedures',
          'Explore deal structuring and financing'
        ],
        sampleTopics: ['Deal sourcing', 'Due diligence', 'Deal structuring', 'Financing strategies'],
        content: {
          beginner: 'Before buying a company, private equity firms carefully study it to understand if it will make money and how to make it better.',
          intermediate: 'The deal process involves sourcing opportunities, conducting comprehensive due diligence, structuring transactions, and securing financing.',
          pro: 'Private equity transactions require systematic due diligence across commercial, financial, operational, and legal dimensions, with sophisticated deal structuring and leverage optimization.'
        }
      },
      {
        level: 3,
        title: 'Value Creation & Exit Strategies',
        focusArea: 'Value Optimization',
        description: 'How PE firms create value and realize returns',
        estimatedTime: '25 min',
        objectives: [
          'Learn value creation methodologies',
          'Understand operational improvement strategies',
          'Explore exit options and timing'
        ],
        sampleTopics: ['Value creation', 'Operational improvements', 'Exit strategies', 'Return optimization'],
        content: {
          beginner: 'Private equity firms help companies grow by improving how they operate, then sell them when they are worth more money.',
          intermediate: 'Value creation involves operational improvements, strategic initiatives, and financial optimization, followed by exits through sales or public offerings.',
          pro: 'Systematic value creation encompasses operational excellence, strategic repositioning, add-on acquisitions, and financial engineering, culminating in optimally timed exits to maximize returns.'
        }
      }
    ]
  },
  {
    id: 'investment-banking',
    name: 'Investment Banking',
    icon: <Briefcase className="h-6 w-6" />,
    description: 'Discover how investment banks help companies raise capital, execute mergers, and navigate complex financial transactions.',
    overview: 'Discover how investment banks help companies raise capital, execute mergers, and navigate complex financial transactions.',
    howItWorks: 'Investment banks generate revenue through advisory fees, underwriting spreads, and trading profits by providing capital markets, M&A advisory, and financial services to corporations and institutions.',
    futureOutlook: 'Digital transformation, regulatory changes, and market volatility are reshaping investment banking operations and client relationships.',
    totalEstimatedTime: '90 min',
    difficulty: 'Advanced',
    levels: [
      {
        level: 1,
        title: 'Investment Banking Overview',
        focusArea: 'IB Fundamentals',
        description: 'Understanding the core functions of investment banks',
        estimatedTime: '30 min',
        objectives: [
          'Define investment banking services',
          'Understand the industry structure',
          'Learn about different divisions and roles'
        ],
        sampleTopics: ['IB services', 'Industry structure', 'Division roles', 'Client relationships'],
        content: {
          beginner: 'Investment banks help companies get money when they need to grow and help them buy or sell other companies.',
          intermediate: 'Investment banks provide capital raising, M&A advisory, and trading services to corporations, governments, and institutional clients.',
          pro: 'Investment banking encompasses capital markets, advisory services, and principal trading activities, serving as intermediaries in complex financial transactions and market making.'
        }
      },
      {
        level: 2,
        title: 'Capital Markets & IPOs',
        focusArea: 'Capital Raising',
        description: 'How companies go public and raise capital',
        estimatedTime: '30 min',
        objectives: [
          'Understand the IPO process',
          'Learn about debt and equity financing',
          'Explore underwriting and syndication'
        ],
        sampleTopics: ['IPO process', 'Debt financing', 'Equity financing', 'Underwriting'],
        content: {
          beginner: 'When companies want to sell shares to the public for the first time, investment banks help them through the complicated process.',
          intermediate: 'Capital markets involve underwriting securities offerings, managing IPO processes, and distributing debt and equity instruments to investors.',
          pro: 'Capital markets operations encompass origination, structuring, underwriting, and distribution of securities across primary and secondary markets with sophisticated risk management.'
        }
      },
      {
        level: 3,
        title: 'M&A Advisory',
        focusArea: 'Strategic Transactions',
        description: 'Mergers, acquisitions, and strategic transactions',
        estimatedTime: '30 min',
        objectives: [
          'Learn M&A transaction types',
          'Understand valuation methodologies',
          'Explore deal execution and negotiations'
        ],
        sampleTopics: ['M&A types', 'Valuation methods', 'Deal execution', 'Negotiation strategies'],
        content: {
          beginner: 'Investment banks advise companies when they want to buy other companies or when they want to sell themselves.',
          intermediate: 'M&A advisory involves strategic planning, valuation analysis, deal structuring, and transaction execution for mergers and acquisitions.',
          pro: 'M&A advisory requires comprehensive strategic analysis, sophisticated valuation techniques, complex deal structuring, and expert negotiation and execution capabilities.'
        }
      }
    ]
  }
];
