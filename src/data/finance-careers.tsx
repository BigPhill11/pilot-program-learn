import React from 'react';
import { Landmark, Briefcase, CreditCard, Handshake, Users, Home, TrendingUp, Building2, DollarSign } from 'lucide-react';

export interface CareerLevel {
  id: number;
  title: string;
  description: string;
  points: string[];
  isCompleted?: boolean;
  isActive?: boolean;
}

export interface CareerVideo {
  id: string;
  title: string;
  speaker: 'intern' | 'professional' | 'professor';
  duration: string;
  description: string;
  thumbnailUrl?: string;
}

export interface FinanceCareerData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  levels: CareerLevel[];
  videos: CareerVideo[];
}

export const financeCareerData: FinanceCareerData[] = [
  {
    id: 'investment-banking',
    name: 'Investment Banking',
    description: 'Help companies raise capital and execute strategic transactions',
    icon: Building2,
    color: 'from-blue-500 to-indigo-600',
    levels: [
      {
        id: 1,
        title: 'What is Investment Banking?',
        description: 'Understanding the fundamentals of investment banking',
        points: [
          'Definition and role in financial markets',
          'Key services: M&A, underwriting, trading',
          'Major investment banks and their specialties',
          'Career paths and progression'
        ]
      },
      {
        id: 2,
        title: 'Investment Banking Process',
        description: 'How investment banks operate and serve clients',
        points: [
          'Deal flow and client relationships',
          'Pitching and proposal development',
          'Due diligence and valuation methods',
          'Transaction execution and closing'
        ]
      },
      {
        id: 3,
        title: 'Financial Modeling & Analysis',
        description: 'Core technical skills for investment banking',
        points: [
          'Excel modeling fundamentals',
          'Valuation methodologies (DCF, Comps)',
          'LBO and M&A models',
          'Presentation and communication skills'
        ]
      },
      {
        id: 4,
        title: 'Deal Types & Structures',
        description: 'Different types of investment banking transactions',
        points: [
          'Mergers and acquisitions',
          'Equity and debt underwriting',
          'Restructuring and special situations',
          'Strategic advisory services'
        ]
      },
      {
        id: 5,
        title: 'Industry Sectors & Specialization',
        description: 'Sector coverage and industry expertise',
        points: [
          'Technology, healthcare, financial services',
          'Energy, industrials, consumer goods',
          'Cross-border and emerging markets',
          'Regulatory considerations'
        ]
      },
      {
        id: 6,
        title: 'Career Development',
        description: 'Building a successful investment banking career',
        points: [
          'Analyst to associate progression',
          'Exit opportunities and transitions',
          'Networking and relationship building',
          'Work-life balance and compensation'
        ]
      },
      {
        id: 7,
        title: 'Advanced Topics',
        description: 'Cutting-edge developments in investment banking',
        points: [
          'Fintech and digital transformation',
          'ESG and sustainable finance',
          'Cryptocurrency and blockchain',
          'Market trends and future outlook'
        ]
      }
    ],
    videos: [
      {
        id: 'ib-intern-overview',
        speaker: 'intern',
        title: 'Life as an Investment Banking Intern',
        description: 'Day-to-day experience of a summer analyst at a bulge bracket bank',
        duration: '8:30'
      },
      {
        id: 'ib-associate-deals',
        speaker: 'professional', 
        title: 'Managing Director Insights',
        description: 'Career progression, client relationships, and deal leadership',
        duration: '12:15'
      },
      {
        id: 'ib-professor-industry',
        speaker: 'professor',
        title: 'The Evolution of Investment Banking',
        description: 'Academic perspective on industry changes and future trends',
        duration: '15:45'
      }
    ]
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    description: 'Invest in and transform private companies to generate superior returns',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    levels: [
      {
        id: 1,
        title: 'Introduction to Private Equity',
        description: 'Understanding the fundamentals of private equity and how it differs from public markets',
        points: [
          'What is private equity and how it works',
          'General Partners vs Limited Partners',
          'Fund structure and committed capital',
          'Basic investment strategies and timeline'
        ]
      },
      {
        id: 2,
        title: 'Investment Strategies & Deal Types',
        description: 'Exploring different private equity investment strategies and transaction structures',
        points: [
          'Leveraged buyouts (LBOs) and their mechanics',
          'Growth equity vs venture capital',
          'Management buyouts and add-on acquisitions',
          'Platform companies and roll-up strategies'
        ]
      },
      {
        id: 3,
        title: 'Due Diligence & Valuation',
        description: 'Master the due diligence process and valuation methodologies used in private equity',
        points: [
          'Comprehensive due diligence process',
          'DCF and comparable company analysis',
          'Quality of earnings assessments',
          'Management team evaluation and risk assessment'
        ]
      },
      {
        id: 4,
        title: 'Value Creation & Portfolio Management',
        description: 'Learn how private equity firms create value and manage their portfolio companies',
        points: [
          'Operational improvements and efficiency gains',
          'Strategic initiatives and market expansion',
          'Board governance and portfolio monitoring',
          'Key performance indicators and reporting'
        ]
      },
      {
        id: 5,
        title: 'Exit Strategies & Returns',
        description: 'Understanding how private equity firms exit investments and generate returns',
        points: [
          'IPO process and public market exits',
          'Strategic sales to corporate buyers',
          'Secondary buyouts to other PE firms',
          'IRR calculations and performance metrics'
        ]
      },
      {
        id: 6,
        title: 'Fund Management & Investor Relations',
        description: 'Learn about private equity fund operations and managing investor relationships',
        points: [
          'Fund lifecycle and capital deployment',
          'Limited partner relations and reporting',
          'Capital calls and distribution timing',
          'Fund performance and benchmark comparison'
        ]
      },
      {
        id: 7,
        title: 'Advanced Topics & Future Trends',
        description: 'Explore cutting-edge topics and future trends in private equity',
        points: [
          'ESG investing and impact considerations',
          'Technology disruption in PE operations',
          'Global markets and emerging opportunities',
          'Regulatory changes and market evolution'
        ]
      }
    ],
    videos: [
      {
        id: 'pe-intern-overview',
        speaker: 'intern',
        title: 'My Summer as a Private Equity Intern',
        description: 'A recent intern shares their experience working at a mid-market PE fund',
        duration: '8:30'
      },
      {
        id: 'pe-associate-deals',
        speaker: 'professional',
        title: 'Deal Execution: From LOI to Close',
        description: 'An associate walks through the complete deal process',
        duration: '12:15'
      },
      {
        id: 'pe-vp-value-creation',
        speaker: 'professional',
        title: 'Value Creation Strategies That Work',
        description: 'A VP discusses successful portfolio company transformations',
        duration: '15:20'
      },
      {
        id: 'pe-professor-industry',
        speaker: 'professor',
        title: 'The Evolution of Private Equity',
        description: 'Academic perspective on how the industry has changed and future trends',
        duration: '18:45'
      }
    ]
  }
];