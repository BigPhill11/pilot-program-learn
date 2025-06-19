import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  Zap, 
  Heart, 
  ShoppingCart, 
  Laptop,
  Brain,
  Briefcase,
  DollarSign
} from 'lucide-react';

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

export interface InteractiveContent {
  explanation: string;
  realWorldExample: string;
  keyTakeaways: string[];
}

export interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface GameScenario {
  id: string;
  scenario: string;
  options: string[];
  correct: number;
  feedback: string;
  points: number;
}

export interface IndustryGame {
  id: string;
  name: string;
  description: string;
  instructions: string;
  scenarios: GameScenario[];
}

export interface JourneyLevel {
  level: number;
  focusArea: string;
  sampleTopics: string[];
  flashcards: Flashcard[];
  interactiveContent: {
    beginner: InteractiveContent;
    intermediate: InteractiveContent;
    pro: InteractiveContent;
  };
  quiz: Quiz;
}

export interface IndustryJourneyData {
  id: string;
  name: string;
  icon: React.ReactElement;
  overview: string;
  howItWorks: string;
  futureOutlook: string;
  levels: JourneyLevel[];
  game: IndustryGame;
}

export const industryJourneys: IndustryJourneyData[] = [
  {
    id: 'consumer-goods-retail',
    name: 'Consumer Goods & Retail',
    icon: <ShoppingCart className="h-6 w-6" />,
    overview: 'Consumer goods and retail companies create, distribute, and sell products directly to end consumers through various channels.',
    howItWorks: 'These companies generate revenue through product sales, with success driven by brand strength, distribution efficiency, and consumer demand patterns.',
    futureOutlook: 'E-commerce growth, sustainability demands, and changing consumer preferences are reshaping retail landscapes, creating opportunities for innovative brands and direct-to-consumer models.',
    levels: [
      {
        level: 1,
        focusArea: 'Consumer Finance Basics',
        sampleTopics: ['Same-store sales', 'Inventory turnover', 'Gross margins', 'Customer traffic'],
        flashcards: [
          {
            id: 'same-store-sales',
            term: 'Same-Store Sales',
            definition: 'Revenue growth from existing stores, excluding new store openings, measuring organic business growth'
          },
          {
            id: 'inventory-turnover',
            term: 'Inventory Turnover',
            definition: 'How quickly a company sells its inventory, calculated as cost of goods sold divided by average inventory'
          },
          {
            id: 'gross-margins',
            term: 'Gross Margins',
            definition: 'Percentage of revenue remaining after subtracting cost of goods sold, indicating pricing power'
          },
          {
            id: 'customer-traffic',
            term: 'Customer Traffic',
            definition: 'Number of customers visiting stores or websites, a key driver of retail sales growth'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Retail companies make money by buying products cheaply and selling them for more. They track how well existing stores are doing and how fast they sell their inventory.',
            realWorldExample: 'Target tracks same-store sales to see if their existing stores are growing. If same-store sales are up 5%, it means people are buying more at stores that were already open.',
            keyTakeaways: [
              'Same-store sales show if a business is really growing',
              'Fast inventory turnover means products are popular',
              'Higher margins mean better pricing power'
            ]
          },
          intermediate: {
            explanation: 'Retail financial analysis requires understanding comparable store metrics, inventory management efficiency, and margin drivers. Strong retailers balance growth with profitability.',
            realWorldExample: 'Costco maintains low gross margins (11%) but high inventory turnover (12x annually), generating profits through membership fees and volume efficiency.',
            keyTakeaways: [
              'Same-store sales growth indicates brand strength and market share gains',
              'Inventory turnover reflects demand forecasting accuracy and supply chain efficiency',
              'Margin expansion requires either pricing power or cost reduction capabilities'
            ]
          },
          pro: {
            explanation: 'Advanced retail analysis incorporates omnichannel metrics, customer lifetime value, and supply chain optimization. Digital transformation creates new KPIs around e-commerce integration and data monetization.',
            realWorldExample: 'Amazon\'s retail margins appear low (5-7%) but their AWS profits subsidize retail growth, while customer data creates advertising revenue streams worth $30B+ annually.',
            keyTakeaways: [
              'Omnichannel integration requires new metrics beyond traditional same-store sales',
              'Customer data monetization through advertising creates high-margin revenue streams',
              'Supply chain technology investments drive long-term competitive advantages'
            ]
          }
        },
        quiz: {
          question: 'What does a 15% inventory turnover ratio indicate for a retail company?',
          options: [
            'Very fast-moving inventory with potential stockout risks',
            'Healthy inventory management with good demand forecasting',
            'Slow inventory movement indicating weak demand or overstocking',
            'Average performance typical for most retail categories'
          ],
          correct: 0,
          explanation: 'A 15% inventory turnover means inventory is sold 15 times per year, which is very high and suggests either excellent demand or potential inventory shortages that could hurt sales.'
        }
      }
      // Add remaining levels following the same pattern...
    ],
    game: {
      id: 'retail-empire',
      name: 'Retail Empire Builder',
      description: 'Build a successful retail business by making strategic decisions about inventory, pricing, store locations, and market expansion.',
      instructions: 'Start with a small store and grow into a retail empire. Make decisions about product mix, pricing strategies, inventory management, and expansion plans.',
      scenarios: [
        {
          id: 'inventory-decision',
          scenario: 'Your store has slow-moving winter coats in March. Inventory turnover is low. What do you do?',
          options: [
            'Mark down prices significantly to clear inventory quickly',
            'Hold inventory until next winter season to avoid losses',
            'Return unsold items to suppliers if possible',
            'Move inventory to discount outlet stores'
          ],
          correct: 0,
          feedback: 'Marking down seasonal inventory clears space for new products and improves cash flow, even if margins suffer short-term.',
          points: 100
        }
      ]
    }
  },
  {
    id: 'healthcare-biotechnology',
    name: 'Healthcare & Biotechnology', 
    icon: <Heart className="h-6 w-6" />,
    overview: 'Healthcare and biotechnology companies develop medical treatments, devices, and services to improve human health and longevity.',
    howItWorks: 'Revenue comes from drug sales, medical device sales, healthcare services, and licensing of intellectual property, with long development cycles and regulatory approval requirements.',
    futureOutlook: 'Aging populations, personalized medicine, and breakthrough technologies like gene therapy are creating massive growth opportunities while increasing R&D costs and regulatory complexity.',
    levels: [
      {
        level: 1,
        focusArea: 'Healthcare Finance Basics',
        sampleTopics: ['Drug development phases', 'FDA approval process', 'Patent protection', 'Clinical trials'],
        flashcards: [
          {
            id: 'drug-development',
            term: 'Drug Development Phases',
            definition: 'Sequential stages from discovery through Phase I, II, III clinical trials to FDA approval and market launch'
          },
          {
            id: 'fda-approval',
            term: 'FDA Approval Process',
            definition: 'Regulatory review ensuring drug safety and efficacy before allowing commercial sales in the United States'
          },
          {
            id: 'patent-protection',
            term: 'Patent Protection',
            definition: 'Exclusive rights to sell a drug for typically 20 years from filing, protecting investment in R&D'
          },
          {
            id: 'clinical-trials',
            term: 'Clinical Trials',
            definition: 'Human testing phases that evaluate drug safety and effectiveness in progressively larger patient groups'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Drug companies spend many years and billions of dollars testing new medicines to make sure they are safe and work before doctors can prescribe them to patients.',
            realWorldExample: 'A new cancer drug might take 10-15 years from discovery to pharmacy shelves, costing over $1 billion in research and testing.',
            keyTakeaways: [
              'Drug development takes a very long time and costs a lot of money',
              'Most drugs fail during testing and never reach patients',
              'Patents protect successful drugs from competition for about 20 years'
            ]
          },
          intermediate: {
            explanation: 'Pharmaceutical investment analysis requires understanding clinical trial success rates, regulatory pathways, and patent expiration impacts. Risk-adjusted NPV models account for high failure rates.',
            realWorldExample: 'Gilead\'s Hepatitis C drug Sovaldi generated $46B in sales over 4 years before generic competition, demonstrating how successful drugs can create enormous value despite high development costs.',
            keyTakeaways: [
              'Phase III success rates vary significantly by therapeutic area and indication',
              'Patent cliff analysis is crucial for predicting revenue declines from generic competition',
              'Orphan drug designations provide extended exclusivity periods and tax incentives'
            ]
          },
          pro: {
            explanation: 'Advanced biotech analysis incorporates probability-weighted pipeline valuations, regulatory strategy assessment, and competitive landscape evolution. Real-world evidence and accelerated approval pathways are changing traditional development models.',
            realWorldExample: 'Moderna\'s mRNA COVID vaccine leveraged platform technology and government funding to compress typical 10-year timelines to under 1 year, validating new development paradigms.',
            keyTakeaways: [
              'Platform technologies enable rapid development of multiple products from single R&D investments',
              'Regulatory science evolution allows new trial designs and endpoints that can accelerate approvals',
              'Personalized medicine requires companion diagnostics and changes traditional blockbuster drug economics'
            ]
          }
        },
        quiz: {
          question: 'What is the primary risk during Phase III clinical trials?',
          options: [
            'Manufacturing scale-up challenges and supply chain issues',
            'Failure to demonstrate efficacy in large patient populations',
            'Intellectual property disputes with competitors',
            'Regulatory changes in approval requirements'
          ],
          correct: 1,
          explanation: 'Phase III trials test efficacy in large patient groups and are the most expensive phase. Failure here means losing hundreds of millions in investment with no path to market.'
        }
      }
      // Add remaining levels...
    ],
    game: {
      id: 'biotech-lab',
      name: 'Biotech Research Lab',
      description: 'Run a biotechnology company by making decisions about drug development, clinical trials, regulatory strategy, and commercialization.',
      instructions: 'You lead a biotech startup with promising drug candidates. Navigate the complex world of drug development, manage limited resources, and bring life-saving treatments to market.',
      scenarios: [
        {
          id: 'clinical-trial-decision',
          scenario: 'Your Phase II trial shows promising results but with some safety concerns. The FDA wants additional data. What do you do?',
          options: [
            'Proceed to Phase III immediately to maintain timeline',
            'Conduct additional Phase II studies to address safety concerns',
            'Pivot to a different indication with better safety profile',
            'Partner with larger pharma company to share risk and costs'
          ],
          correct: 1,
          feedback: 'Addressing safety concerns early prevents costly Phase III failures and builds stronger regulatory relationships for future approvals.',
          points: 150
        }
      ]
    }
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    icon: <Briefcase className="h-6 w-6" />,
    overview: 'Private equity firms acquire companies using investor capital and debt financing to improve operations and generate returns through eventual sale or IPO.',
    howItWorks: 'PE firms raise funds from institutional investors, acquire companies, implement operational improvements, and exit investments typically within 3-7 years.',
    futureOutlook: 'Growing assets under management, increased competition for deals, and focus on ESG factors are reshaping private equity strategies and return expectations.',
    levels: [
      {
        level: 1,
        focusArea: 'PE Basics',
        sampleTopics: ['Fund structure', 'LBO model', 'Due diligence', 'Portfolio management'],
        flashcards: [],
        interactiveContent: {
          beginner: { explanation: '', realWorldExample: '', keyTakeaways: [] },
          intermediate: { explanation: '', realWorldExample: '', keyTakeaways: [] },
          pro: { explanation: '', realWorldExample: '', keyTakeaways: [] }
        },
        quiz: { question: '', options: [], correct: 0, explanation: '' }
      }
    ],
    game: {
      id: 'pe-fund',
      name: 'Private Equity Fund',
      description: 'Manage a private equity fund by identifying investment opportunities, executing deals, and creating value.',
      instructions: 'Raise capital, find target companies, execute leveraged buyouts, and generate returns for your investors.',
      scenarios: []
    }
  },
  {
    id: 'investment-banking',
    name: 'Investment Banking',
    icon: <DollarSign className="h-6 w-6" />,
    overview: 'Investment banks provide financial services including underwriting, M&A advisory, trading, and capital raising for corporations and institutions.',
    howItWorks: 'Revenue comes from fees on transactions, trading profits, and advisory services, with success driven by deal volume and market relationships.',
    futureOutlook: 'Technology disruption, regulatory changes, and market volatility are reshaping traditional investment banking business models.',
    levels: [
      {
        level: 1,
        focusArea: 'IB Basics',
        sampleTopics: ['M&A process', 'IPO underwriting', 'Pitch books', 'Financial modeling'],
        flashcards: [],
        interactiveContent: {
          beginner: { explanation: '', realWorldExample: '', keyTakeaways: [] },
          intermediate: { explanation: '', realWorldExample: '', keyTakeaways: [] },
          pro: { explanation: '', realWorldExample: '', keyTakeaways: [] }
        },
        quiz: { question: '', options: [], correct: 0, explanation: '' }
      }
    ],
    game: {
      id: 'investment-bank',
      name: 'Investment Bank Simulator',
      description: 'Run an investment banking division by winning deals, managing client relationships, and executing transactions.',
      instructions: 'Build client relationships, win mandates, and execute successful transactions to grow your investment banking business.',
      scenarios: []
    }
  }
];
