
import React from 'react';
import { Building2, ShoppingCart, Stethoscope, Laptop, Brain, TrendingUp, Briefcase } from 'lucide-react';

export interface JourneyLevel {
  level: number;
  title: string;
  description: string;
  estimatedTime: string;
  objectives: string[];
  content: {
    beginner: string;
    intermediate: string;
    pro: string;
  };
}

export interface IndustryJourneyData {
  id: string;
  name: string;
  icon: React.ReactElement;
  overview: string;
  levels: JourneyLevel[];
  totalEstimatedTime: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced';
}

export const industryJourneys: IndustryJourneyData[] = [
  {
    id: 'consumer-goods-retail',
    name: 'Consumer Goods & Retail',
    icon: <ShoppingCart className="h-6 w-6" />,
    overview: 'Understand how consumer brands create, market, and sell products that people use every day.',
    totalEstimatedTime: '45 min',
    difficulty: 'Beginner Friendly',
    levels: [
      {
        level: 1,
        title: 'Introduction to Consumer Goods',
        description: 'Learn what consumer goods are and how they differ from other products',
        estimatedTime: '10 min',
        objectives: [
          'Define consumer goods and their categories',
          'Understand the difference between durable and non-durable goods',
          'Identify major consumer goods companies'
        ],
        content: {
          beginner: 'Consumer goods are products that regular people buy for their daily lives, like food, clothes, and household items.',
          intermediate: 'Consumer goods represent products purchased by consumers for personal use, categorized into convenience, shopping, and specialty goods based on buying behavior.',
          pro: 'Consumer goods encompass tangible products purchased by end consumers, classified by durability, shopping habits, and market positioning within the retail ecosystem.'
        }
      },
      {
        level: 2,
        title: 'Retail Distribution',
        description: 'How products get from manufacturers to consumers',
        estimatedTime: '15 min',
        objectives: [
          'Understand supply chain basics',
          'Learn about different retail channels',
          'Explore e-commerce vs traditional retail'
        ],
        content: {
          beginner: 'Products travel from factories to stores through a chain of warehouses and trucks before you can buy them.',
          intermediate: 'Retail distribution involves complex supply chains connecting manufacturers, distributors, and retailers to deliver products efficiently to consumers.',
          pro: 'Modern retail distribution leverages omnichannel strategies, integrating traditional and digital channels through sophisticated logistics and inventory management systems.'
        }
      },
      {
        level: 3,
        title: 'Market Analysis',
        description: 'Understanding consumer behavior and market trends',
        estimatedTime: '20 min',
        objectives: [
          'Analyze consumer purchasing patterns',
          'Identify market trends and opportunities',
          'Understand competitive positioning'
        ],
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
    overview: 'Explore how medical innovations and biotechnology companies develop treatments and improve health outcomes.',
    totalEstimatedTime: '60 min',
    difficulty: 'Intermediate',
    levels: [
      {
        level: 1,
        title: 'Healthcare Industry Overview',
        description: 'Understanding the healthcare ecosystem',
        estimatedTime: '15 min',
        objectives: [
          'Map the healthcare value chain',
          'Understand different healthcare sectors',
          'Learn about regulatory environment'
        ],
        content: {
          beginner: 'Healthcare includes hospitals, doctors, medicine companies, and insurance that all work together to keep people healthy.',
          intermediate: 'The healthcare industry encompasses providers, payers, pharmaceutical companies, and medical device manufacturers within a heavily regulated environment.',
          pro: 'Healthcare represents a complex ecosystem of stakeholders including providers, payers, pharmaceutical companies, biotechnology firms, and medical device manufacturers, all operating within stringent regulatory frameworks.'
        }
      },
      {
        level: 2,
        title: 'Drug Development Process',
        description: 'How new medicines are created and approved',
        estimatedTime: '20 min',
        objectives: [
          'Understand clinical trial phases',
          'Learn about FDA approval process',
          'Explore drug development costs and timelines'
        ],
        content: {
          beginner: 'Creating new medicines takes many years of testing to make sure they are safe and work well before doctors can give them to patients.',
          intermediate: 'Drug development involves preclinical research, three phases of clinical trials, and regulatory approval processes that typically take 10-15 years and cost billions.',
          pro: 'Pharmaceutical development encompasses discovery, preclinical research, IND application, Phase I-III clinical trials, NDA/BLA submission, and post-market surveillance, with success rates below 10%.'
        }
      },
      {
        level: 3,
        title: 'Biotechnology Innovation',
        description: 'Cutting-edge biotech applications and business models',
        estimatedTime: '25 min',
        objectives: [
          'Explore gene therapy and personalized medicine',
          'Understand biotech investment landscape',
          'Learn about intellectual property in biotech'
        ],
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
    overview: 'Learn how private equity firms acquire, improve, and sell companies to generate returns for investors.',
    totalEstimatedTime: '75 min',
    difficulty: 'Advanced',
    levels: [
      {
        level: 1,
        title: 'Private Equity Fundamentals',
        description: 'Understanding the private equity business model',
        estimatedTime: '25 min',
        objectives: [
          'Define private equity and its role in finance',
          'Understand the fund structure and lifecycle',
          'Learn about different PE strategies'
        ],
        content: {
          beginner: 'Private equity firms buy companies, make them better, and then sell them to make money for their investors.',
          intermediate: 'Private equity involves acquiring companies using investor capital and debt, implementing operational improvements, and exiting through sales or IPOs.',
          pro: 'Private equity represents an alternative asset class where funds acquire controlling stakes in companies, execute value creation strategies, and achieve returns through strategic exits.'
        }
      },
      {
        level: 2,
        title: 'Deal Process & Due Diligence',
        description: 'How private equity deals are structured and executed',
        estimatedTime: '25 min',
        objectives: [
          'Understand the deal sourcing process',
          'Learn about due diligence procedures',
          'Explore deal structuring and financing'
        ],
        content: {
          beginner: 'Before buying a company, private equity firms carefully study it to understand if it will make money and how to make it better.',
          intermediate: 'The deal process involves sourcing opportunities, conducting comprehensive due diligence, structuring transactions, and securing financing.',
          pro: 'Private equity transactions require systematic due diligence across commercial, financial, operational, and legal dimensions, with sophisticated deal structuring and leverage optimization.'
        }
      },
      {
        level: 3,
        title: 'Value Creation & Exit Strategies',
        description: 'How PE firms create value and realize returns',
        estimatedTime: '25 min',
        objectives: [
          'Learn value creation methodologies',
          'Understand operational improvement strategies',
          'Explore exit options and timing'
        ],
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
    overview: 'Discover how investment banks help companies raise capital, execute mergers, and navigate complex financial transactions.',
    totalEstimatedTime: '90 min',
    difficulty: 'Advanced',
    levels: [
      {
        level: 1,
        title: 'Investment Banking Overview',
        description: 'Understanding the core functions of investment banks',
        estimatedTime: '30 min',
        objectives: [
          'Define investment banking services',
          'Understand the industry structure',
          'Learn about different divisions and roles'
        ],
        content: {
          beginner: 'Investment banks help companies get money when they need to grow and help them buy or sell other companies.',
          intermediate: 'Investment banks provide capital raising, M&A advisory, and trading services to corporations, governments, and institutional clients.',
          pro: 'Investment banking encompasses capital markets, advisory services, and principal trading activities, serving as intermediaries in complex financial transactions and market making.'
        }
      },
      {
        level: 2,
        title: 'Capital Markets & IPOs',
        description: 'How companies go public and raise capital',
        estimatedTime: '30 min',
        objectives: [
          'Understand the IPO process',
          'Learn about debt and equity financing',
          'Explore underwriting and syndication'
        ],
        content: {
          beginner: 'When companies want to sell shares to the public for the first time, investment banks help them through the complicated process.',
          intermediate: 'Capital markets involve underwriting securities offerings, managing IPO processes, and distributing debt and equity instruments to investors.',
          pro: 'Capital markets operations encompass origination, structuring, underwriting, and distribution of securities across primary and secondary markets with sophisticated risk management.'
        }
      },
      {
        level: 3,
        title: 'M&A Advisory',
        description: 'Mergers, acquisitions, and strategic transactions',
        estimatedTime: '30 min',
        objectives: [
          'Learn M&A transaction types',
          'Understand valuation methodologies',
          'Explore deal execution and negotiations'
        ],
        content: {
          beginner: 'Investment banks advise companies when they want to buy other companies or when they want to sell themselves.',
          intermediate: 'M&A advisory involves strategic planning, valuation analysis, deal structuring, and transaction execution for mergers and acquisitions.',
          pro: 'M&A advisory requires comprehensive strategic analysis, sophisticated valuation techniques, complex deal structuring, and expert negotiation and execution capabilities.'
        }
      }
    ]
  }
];
