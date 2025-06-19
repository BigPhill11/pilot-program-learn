import React from 'react';
import { ShoppingBag, Stethoscope, Laptop, Brain, Building2, TrendingUp, Factory, Zap, Car, Plane } from 'lucide-react';

export interface IndustryJourneyData {
  id: string;
  name: string;
  icon: React.ReactElement;
  overview: string;
  howItWorks: string;
  futureOutlook: string;
  levels: IndustryLevel[];
  game?: IndustryGame;
}

export interface IndustryLevel {
  level: number;
  focusArea: string;
  sampleTopics: string[];
  flashcards: Flashcard[];
  interactiveContent: {
    beginner: LevelContent;
    intermediate: LevelContent;
    pro: LevelContent;
  };
  quiz: QuizQuestion;
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

export interface LevelContent {
  explanation: string;
  realWorldExample: string;
  keyTakeaways: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface IndustryGame {
  id: string;
  name: string;
  description: string;
  instructions: string;
  scenarios: GameScenario[];
}

export interface GameScenario {
  id: string;
  scenario: string;
  options: string[];
  correct: number;
  feedback: string;
  points: number;
}

export const industryJourneys: IndustryJourneyData[] = [
  {
    id: 'consumer-goods-retail',
    name: 'Consumer Goods & Retail',
    icon: <ShoppingBag className="h-6 w-6" />,
    overview: 'Consumer goods and retail encompasses companies that manufacture and sell products directly to consumers, from everyday essentials to luxury items.',
    howItWorks: 'This industry operates through various channels including physical stores, e-commerce platforms, and direct-to-consumer models, with success driven by brand strength, distribution efficiency, and consumer preferences.',
    futureOutlook: 'The retail landscape is rapidly evolving with AI-powered personalization, omnichannel experiences, and sustainable practices becoming key differentiators as consumers demand more convenience and ethical consumption options.',
    levels: [
      {
        level: 1,
        focusArea: 'Consumer Finance Basics',
        sampleTopics: ['Same-store sales', 'Inventory turnover', 'Gross margins', 'Comparable store metrics'],
        flashcards: [
          {
            id: 'same-store-sales',
            term: 'Same-Store Sales',
            definition: 'Revenue growth from stores that have been open for at least one year, excluding new store openings'
          },
          {
            id: 'inventory-turnover',
            term: 'Inventory Turnover',
            definition: 'How quickly a company sells its inventory, calculated as cost of goods sold divided by average inventory'
          },
          {
            id: 'gross-margin',
            term: 'Gross Margin',
            definition: 'The difference between revenue and cost of goods sold, expressed as a percentage of revenue'
          },
          {
            id: 'comp-sales',
            term: 'Comparable Sales (Comps)',
            definition: 'Sales metrics that compare current period performance to the same period in the previous year'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'In retail, understanding basic financial metrics helps you see how well stores are performing. Same-store sales show if existing stores are growing, while inventory turnover tells us how fast products are selling.',
            realWorldExample: 'If Target reports 5% same-store sales growth, it means their existing stores sold 5% more than last year, showing healthy customer demand.',
            keyTakeaways: [
              'Same-store sales exclude new store effects',
              'Higher inventory turnover usually means better efficiency',
              'Gross margins show profitability before other expenses'
            ]
          },
          intermediate: {
            explanation: 'Retail metrics provide insights into operational efficiency and market positioning. Same-store sales growth indicates brand strength and market share gains, while inventory turnover ratios reveal supply chain effectiveness and demand forecasting accuracy.',
            realWorldExample: 'Amazon\'s inventory turnover of 8.5x means they sell and replace their entire inventory every 43 days, demonstrating exceptional efficiency compared to traditional retailers at 4-6x.',
            keyTakeaways: [
              'Same-store sales growth above 3% indicates strong performance',
              'Inventory turnover varies by category (fashion vs groceries)',
              'Gross margin trends reveal pricing power and competition'
            ]
          },
          pro: {
            explanation: 'Advanced retail analysis involves decomposing same-store sales into traffic and average transaction value components, analyzing inventory turnover by category and season, and understanding how digital transformation impacts traditional metrics.',
            realWorldExample: 'Nike\'s direct-to-consumer strategy improved gross margins from 43% to 46% by eliminating wholesale markdowns, while digital sales grew 30% annually with higher margins than wholesale channels.',
            keyTakeaways: [
              'Traffic vs. ticket size analysis reveals growth drivers',
              'Category-level inventory metrics identify optimization opportunities',
              'Digital transformation fundamentally changes margin structures'
            ]
          }
        },
        quiz: {
          question: 'What does a same-store sales increase of 8% indicate?',
          options: [
            'Existing stores are performing well with strong customer demand',
            'The company opened many new stores',
            'Inventory levels have increased significantly',
            'The company reduced prices to boost sales'
          ],
          correct: 0,
          explanation: 'Same-store sales growth excludes new store openings and focuses on existing store performance, so 8% growth indicates strong underlying business health.'
        }
      },
      {
        level: 2,
        focusArea: 'Consumer Business Models',
        sampleTopics: ['Retail vs wholesale', 'Subscription models', 'Marketplace platforms', 'Direct-to-consumer'],
        flashcards: [
          {
            id: 'retail-vs-wholesale',
            term: 'Retail vs Wholesale',
            definition: 'Retail sells directly to consumers at higher margins; wholesale sells in bulk to retailers at lower margins but higher volumes'
          },
          {
            id: 'subscription-model',
            term: 'Subscription Model',
            definition: 'Recurring revenue model where customers pay regularly for continued access to products or services'
          },
          {
            id: 'marketplace-platform',
            term: 'Marketplace Platform',
            definition: 'A platform that connects buyers and sellers, earning revenue through commissions, fees, or advertising'
          },
          {
            id: 'dtc-model',
            term: 'Direct-to-Consumer (DTC)',
            definition: 'Business model where manufacturers sell directly to consumers, bypassing traditional retail intermediaries'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Different business models in consumer goods determine how companies make money. Retail means selling directly to you, while wholesale means selling to stores that then sell to you.',
            realWorldExample: 'Netflix uses a subscription model - you pay monthly for access. Amazon is a marketplace - they connect you with sellers and take a cut of each sale.',
            keyTakeaways: [
              'Retail has higher margins but requires more marketing',
              'Subscription models provide predictable recurring revenue',
              'Marketplaces scale efficiently with network effects'
            ]
          },
          intermediate: {
            explanation: 'Business model selection impacts unit economics, scalability, and competitive positioning. Subscription models offer predictable cash flows but require strong retention metrics, while marketplaces benefit from network effects but face platform risk.',
            realWorldExample: 'Warby Parker disrupted eyewear by combining DTC with showrooms, achieving 60% gross margins vs. 40% for traditional retailers, while maintaining customer experience through vertical integration.',
            keyTakeaways: [
              'DTC models capture higher margins but require brand building',
              'Subscription success depends on churn rates and lifetime value',
              'Hybrid models can optimize for both efficiency and experience'
            ]
          },
          pro: {
            explanation: 'Advanced business model analysis considers customer acquisition costs, lifetime value optimization, and strategic moats. Successful models often combine elements - Amazon\'s marketplace funds Prime subscriptions, which drives retail loyalty.',
            realWorldExample: 'Shopify\'s platform model generates 70%+ gross margins on software while payment processing provides volume-based growth, creating a flywheel where merchant success drives platform revenue.',
            keyTakeaways: [
              'Best models create reinforcing flywheels between revenue streams',
              'Platform businesses scale with minimal marginal costs',
              'Vertical integration vs. asset-light models involve strategic tradeoffs'
            ]
          }
        },
        quiz: {
          question: 'What is a key advantage of the direct-to-consumer (DTC) business model?',
          options: [
            'Lower customer acquisition costs',
            'Higher gross margins by eliminating retail markups',
            'Reduced need for marketing and branding',
            'Automatic marketplace distribution'
          ],
          correct: 1,
          explanation: 'DTC models bypass retailer markups, allowing brands to capture higher gross margins while maintaining direct customer relationships.'
        }
      },
      {
        level: 3,
        focusArea: 'Consumer Analytics',
        sampleTopics: ['Market share analysis', 'Pricing power', 'Brand equity', 'Customer lifetime value'],
        flashcards: [
          {
            id: 'market-share',
            term: 'Market Share',
            definition: 'The percentage of total sales in a market captured by a particular company or product'
          },
          {
            id: 'pricing-power',
            term: 'Pricing Power',
            definition: 'A company\'s ability to raise prices without significantly losing customers or market share'
          },
          {
            id: 'brand-equity',
            term: 'Brand Equity',
            definition: 'The commercial value derived from consumer perception and recognition of a brand name'
          },
          {
            id: 'customer-ltv',
            term: 'Customer Lifetime Value (CLV)',
            definition: 'The total revenue a business expects from a single customer throughout their relationship'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Consumer analytics help us understand how strong a company\'s position is in the market. Market share shows how much of the total market they control, while pricing power shows if customers will pay more for their products.',
            realWorldExample: 'Starbucks has strong pricing power - they can charge $5 for coffee that costs $0.50 elsewhere because customers value the brand experience.',
            keyTakeaways: [
              'Higher market share often leads to better economics',
              'Pricing power indicates strong brand loyalty',
              'Brand equity takes years to build but provides lasting advantage'
            ]
          },
          intermediate: {
            explanation: 'Advanced consumer analytics reveal competitive positioning and sustainable advantages. Market share analysis should consider category growth rates and share-of-wallet metrics, while pricing power analysis examines elasticity across customer segments.',
            realWorldExample: 'Apple commands 50%+ smartphone profit share despite 15% unit share, demonstrating exceptional pricing power through brand differentiation and ecosystem lock-in effects.',
            keyTakeaways: [
              'Profit share matters more than unit share in many categories',
              'Pricing power varies by customer segment and purchase occasion',
              'Brand equity measurement includes awareness, consideration, and loyalty metrics'
            ]
          },
          pro: {
            explanation: 'Sophisticated consumer analytics integrate behavioral data, competitive intelligence, and predictive modeling. CLV analysis should incorporate cohort behavior, channel attribution, and scenario planning for retention initiatives.',
            realWorldExample: 'Amazon Prime members spend $1,400 annually vs. $600 for non-members, with 95% renewal rates, demonstrating how subscription models amplify customer lifetime value through behavioral change.',
            keyTakeaways: [
              'Advanced segmentation reveals micro-targeted opportunities',
              'Behavioral analytics predict churn and expansion opportunities',
              'Dynamic pricing optimization requires real-time market feedback'
            ]
          }
        },
        quiz: {
          question: 'Which scenario best demonstrates strong pricing power?',
          options: [
            'A company increases prices 10% and loses 5% of customers',
            'A company matches competitor price cuts to maintain market share',
            'A company offers frequent discounts to drive sales volume',
            'A company expands distribution to increase market reach'
          ],
          correct: 0,
          explanation: 'Strong pricing power means customers are relatively insensitive to price increases, so losing only 5% of customers after a 10% price increase indicates good pricing power.'
        }
      },
      {
        level: 4,
        focusArea: 'Consumer Investing Skills',
        sampleTopics: ['Store-level modeling', 'Comparable analysis', 'Channel checks', 'Private label strategy'],
        flashcards: [
          {
            id: 'store-level-modeling',
            term: 'Store-Level Modeling',
            definition: 'Financial analysis that evaluates individual store performance to build company-wide projections'
          },
          {
            id: 'comparable-analysis',
            term: 'Comparable Analysis',
            definition: 'Valuation method comparing similar companies based on financial metrics and market multiples'
          },
          {
            id: 'channel-checks',
            term: 'Channel Checks',
            definition: 'Primary research involving store visits and supplier interviews to gauge business performance'
          },
          {
            id: 'private-label',
            term: 'Private Label Strategy',
            definition: 'Retailer-branded products that offer higher margins and customer loyalty compared to national brands'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Investing in retail companies requires understanding how individual stores perform and comparing companies fairly. Channel checks mean actually visiting stores to see how busy they are.',
            realWorldExample: 'An analyst might visit 10 Target stores, count customers, and check inventory levels to predict quarterly earnings before the official report.',
            keyTakeaways: [
              'Store visits provide real-time business insights',
              'Compare similar retailers using same metrics',
              'Private label products boost profitability'
            ]
          },
          intermediate: {
            explanation: 'Investment analysis requires building detailed store-level models that account for location quality, demographic factors, and competitive dynamics. Comparable analysis must adjust for business model differences and growth stages.',
            realWorldExample: 'Home Depot\'s store productivity averages $38M annually vs. Lowe\'s $34M, but Home Depot targets pro customers while Lowe\'s focuses on DIY, requiring different investment frameworks.',
            keyTakeaways: [
              'Location demographics drive store-level performance variation',
              'Comparable multiples require business model adjustments',
              'Channel check insights must be weighted by market representation'
            ]
          },
          pro: {
            explanation: 'Advanced retail investment analysis incorporates real estate valuation, omnichannel attribution, and ESG factors. Store-level models should include cannibalization effects, digital integration, and format optimization strategies.',
            realWorldExample: 'Best Buy\'s transformation from big-box to omnichannel hub required revaluing real estate as fulfillment centers rather than just retail space, changing the investment thesis from declining to digital-enabled growth.',
            keyTakeaways: [
              'Real estate strategy increasingly determines retail value',
              'Omnichannel metrics require new analytical frameworks',
              'ESG factors materially impact retail valuations and access to capital'
            ]
          }
        },
        quiz: {
          question: 'What is the primary purpose of conducting channel checks in retail investment analysis?',
          options: [
            'To verify management guidance with real-world observations',
            'To negotiate better supplier contracts',
            'To identify new store locations',
            'To calculate exact financial ratios'
          ],
          correct: 0,
          explanation: 'Channel checks provide independent verification of business trends by observing actual store traffic, inventory levels, and customer behavior to validate or question management projections.'
        }
      },
      {
        level: 5,
        focusArea: 'Consumer in Practice',
        sampleTopics: ['Amazon disruption case', 'Toys R Us bankruptcy', 'Nike DTC strategy', 'Omnichannel transformation'],
        flashcards: [
          {
            id: 'amazon-disruption',
            term: 'Amazon Disruption',
            definition: 'How Amazon\'s e-commerce platform and logistics network transformed retail competition globally'
          },
          {
            id: 'retail-bankruptcy',
            term: 'Retail Bankruptcy',
            definition: 'Financial failure often caused by over-leveraging, digital disruption, or changing consumer preferences'
          },
          {
            id: 'dtc-strategy',
            term: 'DTC Strategy',
            definition: 'Brand strategy to sell directly to consumers, bypassing traditional retail partners'
          },
          {
            id: 'omnichannel',
            term: 'Omnichannel Transformation',
            definition: 'Integrating online and offline channels to create seamless customer experiences'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Real-world retail cases show how companies succeed or fail when markets change. Amazon changed how people shop, forcing traditional retailers to adapt or close.',
            realWorldExample: 'Toys"R"Us went bankrupt because they couldn\'t compete with Amazon\'s prices and convenience, plus they had too much debt from a buyout.',
            keyTakeaways: [
              'Digital disruption requires rapid adaptation',
              'High debt levels make transformation harder',
              'Customer convenience often wins over traditional advantages'
            ]
          },
          intermediate: {
            explanation: 'Case study analysis reveals how strategic decisions, capital structure, and execution capabilities determine retail success during industry transformation. Nike\'s DTC pivot improved margins while maintaining brand control.',
            realWorldExample: 'Nike reduced wholesale partnerships from 30,000 to 40 key accounts, growing DTC from 16% to 35% of revenue while improving gross margins by 400 basis points through pricing control.',
            keyTakeaways: [
              'Strategic focus often requires sacrificing short-term revenue',
              'Brand strength enables successful channel strategy shifts',
              'Omnichannel capabilities require significant technology investment'
            ]
          },
          pro: {
            explanation: 'Advanced case analysis examines how macroeconomic factors, technology adoption curves, and competitive responses create winners and losers. Successful transformation requires simultaneous operational and strategic reinvention.',
            realWorldExample: 'Target\'s $7B digital investment from 2017-2020 enabled same-day fulfillment options that drove 50% digital growth, while competitors without fulfillment capabilities lost market share permanently.',
            keyTakeaways: [
              'Technology investments must be scaled to achieve competitive advantage',
              'Customer acquisition costs increase as digital competition intensifies',
              'Supply chain capabilities become primary competitive differentiators'
            ]
          }
        },
        quiz: {
          question: 'What was the primary factor in Toys"R"Us bankruptcy?',
          options: [
            'Inability to compete with Amazon while managing high debt levels',
            'Poor product selection and customer service',
            'Failure to expand internationally',
            'Manufacturing quality issues'
          ],
          correct: 0,
          explanation: 'Toys"R"Us was burdened with $5B+ debt from a leveraged buyout, limiting their ability to invest in e-commerce and compete with Amazon\'s convenience and pricing.'
        }
      },
      {
        level: 6,
        focusArea: 'Consumer & Economic Cycles',
        sampleTopics: ['Discretionary vs staples', 'Inflation impact', 'Consumer confidence', 'Trade wars effect'],
        flashcards: [
          {
            id: 'discretionary-staples',
            term: 'Discretionary vs Staples',
            definition: 'Discretionary goods are optional purchases; staples are necessities that consumers buy regardless of economic conditions'
          },
          {
            id: 'inflation-impact',
            term: 'Inflation Impact',
            definition: 'How rising prices affect consumer purchasing power and retail business models'
          },
          {
            id: 'consumer-confidence',
            term: 'Consumer Confidence',
            definition: 'Measure of consumer optimism about economic conditions and their willingness to spend money'
          },
          {
            id: 'trade-wars',
            term: 'Trade Wars Effect',
            definition: 'How tariffs and trade disputes impact retail costs, pricing, and supply chains'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Economic conditions greatly affect retail companies. When times are tough, people still buy groceries (staples) but skip vacations and luxury items (discretionary).',
            realWorldExample: 'During the 2008 recession, Walmart (staples) grew sales while luxury retailers like Nordstrom saw big declines as consumers focused on necessities.',
            keyTakeaways: [
              'Staples companies are more recession-resistant',
              'Discretionary retailers are more sensitive to economic cycles',
              'Consumer confidence affects spending patterns'
            ]
          },
          intermediate: {
            explanation: 'Economic cycle analysis helps predict retail performance across different scenarios. Inflation particularly impacts low-income consumers and margin-sensitive categories, while trade policies affect global supply chains.',
            realWorldExample: '2021-2022 inflation hit discount retailers harder as their price-sensitive customers traded down further, while luxury brands maintained pricing power as affluent consumers proved less elastic.',
            keyTakeaways: [
              'Income demographics determine inflation sensitivity',
              'Supply chain diversification mitigates trade war risks',
              'Consumer confidence leads actual spending by 3-6 months'
            ]
          },
          pro: {
            explanation: 'Sophisticated economic analysis integrates multiple indicators: employment trends, wage growth, savings rates, and credit availability. Retail performance often provides early economic indicators through real-time sales data.',
            realWorldExample: 'Credit card data showed consumer spending patterns shifting 2-3 months before official economic statistics, with restaurant spending declining before retail, providing early recession signals.',
            keyTakeaways: [
              'Retail data provides leading economic indicators',
              'Cross-category spending analysis reveals consumer prioritization',
              'Geographic analysis reveals regional economic divergence'
            ]
          }
        },
        quiz: {
          question: 'During economic downturns, which type of retailer typically performs better?',
          options: [
            'Luxury retailers due to wealthy customer base',
            'Consumer staples retailers due to necessity purchases',
            'Electronics retailers due to technology needs',
            'Furniture retailers due to home spending'
          ],
          correct: 1,
          explanation: 'Consumer staples retailers sell necessities like food and household items that people need regardless of economic conditions, making them more recession-resistant.'
        }
      }
    ],
    game: {
      id: 'retail-empire',
      name: 'Retail Empire Builder',
      description: 'Build and manage your retail empire by making strategic decisions about store locations, inventory, pricing, and customer experience.',
      instructions: 'You start with $1M to build your retail business. Make decisions about store format, target customers, pricing strategy, and expansion plans. Each choice affects your profitability and market position.',
      scenarios: [
        {
          id: 'store-format',
          scenario: 'You\'re launching a new retail chain. Which store format should you choose for maximum profitability?',
          options: [
            'Large format stores with wide selection but higher rent costs',
            'Small format stores in high-traffic locations with limited selection',
            'Online-only with fulfillment centers to minimize real estate costs',
            'Pop-up stores to test markets before permanent locations'
          ],
          correct: 1,
          feedback: 'Small format stores in high-traffic locations often generate higher sales per square foot, though the optimal choice depends on your target market and category.',
          points: 100
        },
        {
          id: 'pricing-strategy',
          scenario: 'Inflation is rising 8% annually. How should you adjust your pricing strategy?',
          options: [
            'Raise prices immediately by 8% to maintain margins',
            'Absorb costs temporarily to maintain customer loyalty',
            'Implement gradual price increases while improving value perception', 
            'Switch to lower-cost suppliers to maintain current prices'
          ],
          correct: 2,
          feedback: 'Gradual price increases combined with value enhancement (better service, quality, experience) helps maintain customer loyalty while protecting margins.',
          points: 150
        },
        {
          id: 'inventory-management',
          scenario: 'You notice inventory turnover has dropped from 6x to 4x annually. What\'s your priority action?',
          options: [
            'Increase marketing spend to boost sales velocity',
            'Reduce inventory levels to improve cash flow',
            'Analyze slow-moving items and implement clearance strategy',
            'Negotiate longer payment terms with suppliers'
          ],
          correct: 2,
          feedback: 'Identifying and clearing slow-moving inventory prevents further cash flow deterioration and frees up resources for better-performing products.',
          points: 125
        },
        {
          id: 'competitive-response',
          scenario: 'Amazon is launching a competing product line with 20% lower prices. How do you respond?',
          options: [
            'Match their prices immediately to retain customers',
            'Focus on superior customer service and experience',
            'Launch a private label alternative at competitive prices',
            'Form partnerships with other retailers to compete jointly'
          ],
          correct: 1,
          feedback: 'Competing on service and experience leverages your physical presence advantage, as price wars with Amazon often hurt profitability without winning long-term.',
          points: 175
        },
        {
          id: 'expansion-decision',
          scenario: 'You have $5M for expansion. Which option offers the best long-term value?',
          options: [
            'Open 10 new stores in similar markets',
            'Invest in e-commerce platform and digital capabilities',
            'Acquire a smaller competitor with complementary products',
            'Build a new distribution center for operational efficiency'
          ],
          correct: 1,
          feedback: 'Digital capabilities provide scalable growth potential and omnichannel advantages, offering better long-term returns than linear store expansion.',
          points: 200
        }
      ]
    }
  },
  {
    id: 'healthcare-biotech',
    name: 'Healthcare & Biotechnology',
    icon: <Stethoscope className="h-6 w-6" />,
    overview: 'Healthcare and biotechnology companies develop, manufacture, and distribute medical products, pharmaceuticals, and healthcare services to improve human health outcomes.',
    howItWorks: 'The industry operates through complex regulatory frameworks, long development cycles, and evidence-based medicine, with revenue generated through drug sales, medical devices, and healthcare services.',
    futureOutlook: 'AI-driven drug discovery, personalized medicine, and digital health platforms are revolutionizing healthcare delivery while aging demographics create sustained demand for innovative treatments and services.',
    levels: [
      {
        level: 1,
        focusArea: 'Healthcare Finance Basics',
        sampleTopics: ['Drug development phases', 'FDA approval process', 'Clinical trial costs', 'Patent protection'],
        flashcards: [
          {
            id: 'drug-phases',
            term: 'Drug Development Phases',
            definition: 'Sequential stages of testing: Phase I (safety), Phase II (efficacy), Phase III (large-scale trials), FDA review'
          },
          {
            id: 'fda-approval',
            term: 'FDA Approval Process',
            definition: 'Regulatory review process that evaluates drug safety and efficacy before allowing commercial sales'
          },
          {
            id: 'clinical-trials',
            term: 'Clinical Trial Costs',
            definition: 'Expenses for testing drugs in humans, often $100M+ for Phase III trials due to patient recruitment and monitoring'
          },
          {
            id: 'patent-protection',
            term: 'Patent Protection',
            definition: 'Legal monopoly lasting 20 years from filing, protecting drug developers from generic competition'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Developing new medicines takes 10-15 years and costs over $1 billion. Companies test drugs in phases to make sure they\'re safe and work before selling them.',
            realWorldExample: 'When Pfizer developed their COVID vaccine, they went through Phase I (safety testing), Phase II (does it work?), and Phase III (testing thousands of people) before FDA approval.',
            keyTakeaways: [
              'Drug development is extremely expensive and risky',
              'Most drugs fail during testing phases',
              'Patents provide temporary monopoly protection'
            ]
          },
          intermediate: {
            explanation: 'Healthcare investment analysis requires understanding regulatory pathways, clinical trial design, and commercial potential. Phase II success rates vary by therapeutic area, from 30% in oncology to 60% in cardiovascular.',
            realWorldExample: 'Moderna\'s mRNA platform enabled rapid COVID vaccine development in 11 months vs. typical 10+ years, demonstrating how platform technologies can accelerate timelines and reduce costs.',
            keyTakeaways: [
              'Platform technologies improve development efficiency across multiple products',
              'Regulatory pathway selection affects timeline and probability of success',
              'Orphan drug designation provides incentives for rare disease development'
            ]
          },
          pro: {
            explanation: 'Advanced healthcare analysis incorporates health economics, real-world evidence, and regulatory science. Net present value models must account for probability-weighted outcomes across multiple indications and territories.',
            realWorldExample: 'Gilead\'s Sovaldi hepatitis C treatment was priced at $84,000 despite production costs under $100, justified by curative outcomes eliminating lifelong treatment costs exceeding $300,000.',
            keyTakeaways: [
              'Value-based pricing reflects health economic outcomes rather than cost-plus models',
              'Regulatory agencies increasingly require real-world evidence post-approval',
              'Combination therapies and platform approaches improve risk-adjusted returns'
            ]
          }
        },
        quiz: {
          question: 'What is the typical timeline for bringing a new drug from discovery to market?',
          options: [
            '3-5 years',
            '5-8 years', 
            '10-15 years',
            '20+ years'
          ],
          correct: 2,
          explanation: 'Drug development typically takes 10-15 years from initial discovery through clinical trials, regulatory review, and approval, making it one of the longest product development cycles.'
        }
      },
      {
        level: 2,
        focusArea: 'Healthcare Business Models',
        sampleTopics: ['Pharma vs biotech', 'Medical devices', 'Healthcare services', 'Digital health'],
        flashcards: [
          {
            id: 'pharma-biotech',
            term: 'Pharma vs Biotech',
            definition: 'Pharma companies are large, diversified drug manufacturers; biotech companies are smaller, focused on innovative therapies'
          },
          {
            id: 'medical-devices',
            term: 'Medical Devices',  
            definition: 'Products ranging from simple tools to complex machines used in healthcare diagnosis, treatment, and monitoring'
          },
          {
            id: 'healthcare-services',
            term: 'Healthcare Services',
            definition: 'Companies providing patient care, including hospitals, clinics, insurance, and pharmacy benefit management'
          },
          {
            id: 'digital-health',
            term: 'Digital Health',
            definition: 'Technology-enabled healthcare including telemedicine, health apps, AI diagnostics, and electronic health records'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Healthcare companies make money in different ways. Some make medicines, others make medical equipment, and some provide healthcare services like running hospitals or telemedicine.',
            realWorldExample: 'Johnson & Johnson makes everything from Band-Aids to cancer drugs to artificial hips. Teladoc provides online doctor visits through your phone or computer.',
            keyTakeaways: [
              'Pharma companies have diversified drug portfolios',
              'Medical device margins are often higher than drugs',
              'Healthcare services provide steady recurring revenue'
            ]
          },
          intermediate: {
            explanation: 'Healthcare business models vary significantly in risk profiles, regulatory requirements, and economic characteristics. Device companies often have shorter development cycles but require different clinical evidence than pharmaceuticals.',
            realWorldExample: 'Medtronic\'s insulin pump business generates recurring revenue through consumable supplies (sensors, tubing) while the durable device provides the platform, similar to razor-and-blade models.',
            keyTakeaways: [
              'Device businesses often have recurring consumable revenue streams',
              'Healthcare services businesses scale through operational efficiency',
              'Digital health models focus on engagement and outcomes-based reimbursement'
            ]
          },
          pro: {
            explanation: 'Advanced healthcare business model analysis examines reimbursement dynamics, competitive moats, and regulatory barriers to entry. Value-based care models increasingly tie payment to patient outcomes rather than volume.',
            realWorldExample: 'UnitedHealth\'s Optum division combines pharmacy benefits, healthcare services, and data analytics to create integrated value chains, capturing margins across the healthcare ecosystem while improving outcomes.',
            keyTakeaways: [
              'Integrated healthcare models capture value across multiple touchpoints',
              'Data and analytics create sustainable competitive advantages',
              'Outcomes-based reimbursement models reward innovation and efficiency'
            ]
          }
        },
        quiz: {
          question: 'What is a key difference between pharmaceutical and biotechnology companies?',
          options: [
            'Pharma companies only make generic drugs',
            'Biotech companies are typically smaller and more specialized',
            'Pharma companies don\'t require FDA approval',
            'Biotech companies only make medical devices'
          ],
          correct: 1,
          explanation: 'Biotech companies are typically smaller, more focused companies developing innovative therapies, while pharma companies are large, diversified organizations with broad drug portfolios.'
        }
      },
      {
        level: 3,
        focusArea: 'Healthcare Analysis',
        sampleTopics: ['Pipeline analysis', 'Patent cliffs', 'Regulatory risks', 'Market access'],
        flashcards: [
          {
            id: 'pipeline-analysis',
            term: 'Pipeline Analysis',
            definition: 'Evaluation of drugs in development, assessing probability of success and commercial potential'
          },
          {
            id: 'patent-cliff',
            term: 'Patent Cliff',
            definition: 'Sharp revenue decline when drug patents expire and generic competition enters the market'
          },
          {
            id: 'regulatory-risk',
            term: 'Regulatory Risk',
            definition: 'Possibility that regulatory agencies reject drug applications or require additional studies'
          },
          {
            id: 'market-access',
            term: 'Market Access',
            definition: 'Ability to get drugs covered by insurance and made available to patients at affordable prices'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Analyzing healthcare companies means looking at what drugs they have in development (pipeline) and when their current drug patents expire, which lets cheaper generic versions compete.',
            realWorldExample: 'When Lipitor\'s patent expired in 2011, Pfizer\'s revenue dropped by billions as generic versions captured 80% of the market within months.',
            keyTakeaways: [
              'Pipeline strength determines future growth potential',
              'Patent expiry creates sudden revenue declines',
              'Regulatory approval is never guaranteed'
            ]
          },
          intermediate: {
            explanation: 'Healthcare investment analysis requires probabilistic modeling of clinical outcomes, competitive landscape assessment, and reimbursement analysis. Pipeline valuation uses risk-adjusted NPV across multiple scenarios.',
            realWorldExample: 'Gilead\'s hepatitis C franchise peaked at $19B annually but declined 90% within five years due to market saturation and competitive entry, highlighting the importance of pipeline diversification.',
            keyTakeaways: [
              'Peak sales estimates must consider market size and competition',
              'Clinical trial design affects regulatory and commercial success probability',
              'Reimbursement negotiations significantly impact commercial returns'
            ]
          },
          pro: {
            explanation: 'Sophisticated healthcare analysis integrates health technology assessment, pharmaco-economic modeling, and global regulatory strategies. AI and real-world evidence increasingly influence regulatory decisions and market access.',
            realWorldExample: 'Roche\'s companion diagnostic strategy for cancer drugs created competitive moats by linking treatments to specific genetic markers, improving outcomes while defending market share against biosimilars.',
            keyTakeaways: [
              'Companion diagnostics create precision medicine competitive advantages',
              'Real-world evidence increasingly influences regulatory and reimbursement decisions',
              'Global regulatory harmonization reduces development costs but requires strategic coordination'
            ]
          }
        },
        quiz: {
          question: 'What happens when a blockbuster drug faces a "patent cliff"?',
          options: [
            'The company must reduce manufacturing costs',
            'Revenue typically declines sharply due to generic competition',
            'The drug automatically gets patent extension',
            'Marketing spend increases to maintain market share'
          ],
          correct: 1,
          explanation: 'Patent cliffs cause sharp revenue declines as generic competitors enter the market, often capturing 80-90% market share within months due to lower prices.'
        }
      },
      {
        level: 4,
        focusArea: 'Healthcare Investing Skills',
        sampleTopics: ['DCF modeling', 'Probability-adjusted valuation', 'Comparable analysis', 'Sum-of-the-parts'],
        flashcards: [
          {
            id: 'dcf-healthcare',
            term: 'Healthcare DCF Modeling',
            definition: 'Discounted cash flow analysis that accounts for drug development risks and patent expiry timelines'
          },
          {
            id: 'probability-adjusted',
            term: 'Probability-Adjusted Valuation',
            definition: 'Valuation method that weights potential outcomes by their likelihood of success'
          },
          {
            id: 'healthcare-comps',
            term: 'Healthcare Comparables',
            definition: 'Valuation comparison using metrics like EV/Sales, P/E ratios, and pipeline value per drug'
          },
          {
            id: 'sum-of-parts',
            term: 'Sum-of-the-Parts Valuation',
            definition: 'Valuation method that separately values different business segments or drug programs'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Valuing healthcare companies is tricky because you have to guess which experimental drugs will succeed and how much money they\'ll make. You use probability to weight different outcomes.',
            realWorldExample: 'If a drug has a 30% chance of approval and could make $1B annually, you might value it at $300M (30% × $1B), not the full $1B.',
            keyTakeaways: [
              'Most drugs fail, so you must adjust for success probability',
              'Patents create time limits on revenue streams',
              'Different drugs require different valuation approaches'
            ]
          },
          intermediate: {
            explanation: 'Healthcare valuation combines traditional financial metrics with scientific and regulatory analysis. Monte Carlo modeling helps capture the range of possible outcomes across multiple pipeline programs.',
            realWorldExample: 'Vertex\'s cystic fibrosis franchise trades at 15x sales vs. 5x for typical pharma, reflecting the orphan indication\'s pricing power and limited competition despite smaller market size.',
            keyTakeaways: [
              'Orphan indications often command premium valuations due to limited competition',
              'Platform technologies require different valuation frameworks than single assets',
              'Commercial stage assets provide more predictable valuation than development programs'
            ]
          },
          pro: {
            explanation: 'Advanced healthcare valuation incorporates option theory, competitive dynamics, and health economics. Portfolio theory helps optimize development programs across risk-return profiles and correlation structures.',
            realWorldExample: 'Moderna\'s mRNA platform valuation required modeling multiple potential products across infectious diseases, oncology, and rare diseases, with shared manufacturing and regulatory synergies.',
            keyTakeaways: [
              'Platform valuations must capture synergies across multiple programs',
              'Competitive response modeling affects long-term value capture',
              'Health economic outcomes increasingly drive reimbursement and adoption'
            ]
          }
        },
        quiz: {
          question: 'Why do healthcare companies typically use probability-adjusted valuations?',
          options: [
            'To account for currency exchange rate fluctuations',
            'To reflect the high failure rate of drug development',
            'To adjust for seasonal sales variations',
            'To incorporate manufacturing cost uncertainties'
          ],
          correct: 1,
          explanation: 'Healthcare companies use probability-adjusted valuations because most drugs fail during development, so potential revenues must be weighted by the likelihood of regulatory approval and commercial success.'
        }
      },
      {
        level: 5,
        focusArea: 'Healthcare in Practice',
        sampleTopics: ['COVID vaccine development', 'CVS-Aetna merger', 'Telemedicine growth', 'AI in drug discovery'],
        flashcards: [
          {
            id: 'covid-vaccines',
            term: 'COVID Vaccine Development',
            definition: 'Unprecedented global effort that compressed typical 10+ year timelines into 11 months through parallel development'
          },
          {
            id: 'cvs-aetna',
            term: 'CVS-Aetna Merger',
            definition: '$69B merger combining pharmacy, healthcare services, and insurance to create integrated care model'
          },
          {
            id: 'telemedicine-growth',
            term: 'Telemedicine Growth',
            definition: 'Digital healthcare delivery that expanded 38x during COVID, fundamentally changing care access and delivery'
          },
          {
            id: 'ai-drug-discovery',
            term: 'AI in Drug Discovery',
            definition: 'Machine learning applications to accelerate target identification, compound optimization, and clinical trial design'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Recent healthcare developments show how the industry can move fast during emergencies and how technology is changing how we get medical care. COVID vaccines were developed in record time.',
            realWorldExample: 'Pfizer and Moderna developed COVID vaccines in 11 months instead of the usual 10+ years by running trials in parallel and having governments pre-order doses.',
            keyTakeaways: [
              'Emergency situations can accelerate normal development timelines',
              'Government support reduces financial risks for companies',
              'Digital health adoption increased dramatically during COVID'
            ]
          },
          intermediate: {
            explanation: 'Healthcare transformation case studies reveal how regulatory flexibility, technology adoption, and business model innovation can rapidly reshape industry dynamics during crisis periods.',
            realWorldExample: 'Teladoc\'s revenue grew 85% in 2020 as telehealth visits increased from 1% to 85% of consultations during COVID lockdowns, permanently changing patient care delivery expectations.',
            keyTakeaways: [
              'Crisis periods accelerate adoption of previously slow-growing technologies',
              'Regulatory flexibility during emergencies can become permanent policy changes',
              'Integrated care models gain competitive advantage during system stress'
            ]
          },
          pro: {
            explanation: 'Advanced healthcare case analysis examines how external shocks reveal system inefficiencies and create opportunities for structural change. Platform strategies and vertical integration become defensive necessities.',
            realWorldExample: 'Amazon\'s healthcare initiatives (PillPack acquisition, Amazon Care, Amazon Pharmacy) demonstrate how technology giants leverage data and logistics capabilities to disrupt traditional healthcare value chains.',
            keyTakeaways: [
              'Technology platforms create new competitive dynamics in traditional healthcare',
              'Data integration across care continuum drives value-based outcomes',
              'Vertical integration provides defensive positioning against platform disruption'
            ]
          }
        },
        quiz: {
          question: 'What was the key factor enabling rapid COVID vaccine development?',
          options: [
            'Lower safety requirements during emergencies',
            'Running development phases in parallel rather than sequentially',
            'Using existing approved vaccine technologies',
            'Reducing the number of required clinical trial participants'
          ],
          correct: 1,
          explanation: 'COVID vaccines were developed rapidly by running clinical trial phases in parallel and having manufacturing scale-up occur during trials, rather than waiting for each phase to complete sequentially.'
        }
      },
      {
        level: 6,
        focusArea: 'Healthcare & Macro Trends',
        sampleTopics: ['Aging demographics', 'Healthcare spending trends', 'Global health challenges', 'Drug pricing pressure'],
        flashcards: [
          {
            id: 'aging-demographics',
            term: 'Aging Demographics',
            definition: 'Global population trends showing increasing life expectancy and declining birth rates, driving healthcare demand'
          },
          {
            id: 'healthcare-spending',
            term: 'Healthcare Spending Trends',
            definition: 'Healthcare costs growing faster than GDP in most developed countries, creating sustainability concerns'
          },
          {
            id: 'global-health',
            term: 'Global Health Challenges',
            definition: 'Worldwide health issues including pandemics, antimicrobial resistance, and health equity disparities'
          },
          {
            id: 'drug-pricing',
            term: 'Drug Pricing Pressure',
            definition: 'Political and economic forces pushing for lower pharmaceutical prices through regulation and negotiation'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Big trends affect the entire healthcare industry. As people live longer, they need more medical care. Governments worry about rising healthcare costs and try to control drug prices.',
            realWorldExample: 'In Japan, 28% of people are over 65, creating huge demand for healthcare services and driving innovation in medical technologies for elderly care.',
            keyTakeaways: [
              'Aging populations drive long-term healthcare demand growth',
              'Rising costs create political pressure for price controls',
              'Global health challenges require coordinated responses'
            ]
          },
          intermediate: {
            explanation: 'Macro healthcare trends create both opportunities and challenges for different industry segments. Aging demographics drive demand growth, but sustainability concerns increase pricing pressure and regulatory oversight.',
            realWorldExample: 'Medicare spending grows 6% annually vs. 3% GDP growth, creating fiscal pressure that drives initiatives like drug price negotiation and value-based reimbursement models.',
            keyTakeaways: [
              'Demographic trends create predictable long-term demand patterns',
              'Cost containment efforts focus on high-priced specialty drugs',
              'Value-based care models align provider incentives with health outcomes'
            ]
          },
          pro: {
            explanation: 'Advanced macro analysis integrates demographic projections, health economics, and policy analysis to identify structural investment themes. ESG factors increasingly influence healthcare investment decisions and access to capital.',
            realWorldExample: 'China\'s aging population and rising incomes create a $1T+ healthcare market opportunity, but regulatory complexity and intellectual property concerns require sophisticated market entry strategies.',
            keyTakeaways: [
              'Emerging market demographics create massive long-term growth opportunities',
              'ESG considerations increasingly influence healthcare investment allocation',
              'Policy uncertainty requires scenario planning across multiple regulatory environments'
            ]
          }
        },
        quiz: {
          question: 'How do aging demographics affect healthcare investment opportunities?',
          options: [
            'They reduce overall healthcare demand as fewer babies are born',
            'They create sustained long-term demand growth for medical services',
            'They only affect developed countries with universal healthcare',
            'They primarily impact pharmaceutical companies, not medical devices'
          ],
          correct: 1,
          explanation: 'Aging demographics create sustained long-term demand growth for healthcare services, as older populations require more medical care, treatments, and interventions.'
        }
      }
    ],
    game: {
      id: 'biotech-lab',
      name: 'Biotech Lab Manager',
      description: 'Run your own biotechnology company by making critical decisions about drug development, clinical trials, regulatory strategy, and commercialization.',
      instructions: 'You have $500M in funding to develop breakthrough therapies. Choose your therapeutic focus, manage clinical trials, navigate regulatory requirements, and build commercial partnerships. Balance risk and reward to create life-saving treatments.',
      scenarios: [
        {
          id: 'therapeutic-area',
          scenario: 'You must choose your company\'s primary therapeutic focus. Which area offers the best risk-reward profile?',
          options: [
            'Oncology - large market but high competition and regulatory complexity',
            'Rare diseases - smaller market but less competition and regulatory incentives',
            'Infectious diseases - variable market but urgent medical need',
            'Neurological disorders - huge unmet need but high development risk'
          ],
          correct: 1,
          feedback: 'Rare diseases offer orphan drug incentives, faster regulatory pathways, and less competition, though market size is limited. Many successful biotech companies start here.',
          points: 100
        },
        {
          id: 'clinical-strategy',
          scenario: 'Your Phase II trial shows promising efficacy but some safety concerns. What\'s your next move?',
          options: [
            'Proceed directly to Phase III to accelerate timeline',
            'Conduct additional Phase II studies to better understand safety profile',
            'Pivot to a different indication with better risk-benefit profile',
            'Partner with a larger pharma company to share development risk'
          ],
          correct: 1,
          feedback: 'Additional Phase II studies help optimize dosing and patient selection, improving Phase III success probability and reducing long-term development risk.',
          points: 150
        },
        {
          id: 'regulatory-pathway',
          scenario: 'The FDA offers you breakthrough therapy designation for your novel cancer drug. What are the implications?',
          options: [
            'Guaranteed approval if safety profile is acceptable',
            'Accelerated review timeline and increased FDA guidance',
            'Reduced clinical trial requirements and faster market access',
            'Priority review voucher that can be sold to other companies'
          ],
          correct: 1,
          feedback: 'Breakthrough designation provides accelerated review, more frequent FDA meetings, and potential for accelerated approval, but doesn\'t guarantee success.',
          points: 125
        },
        {
          id: 'funding-decision',
          scenario: 'You need $200M for Phase III trials. Multiple funding options are available. Which provides the best strategic value?',
          options: [
            'Venture capital funding with board control provisions',
            'Strategic partnership with Big Pharma including co-development',
            'Public offering to maintain full control and upside',
            'Government grants with intellectual property restrictions'
          ],
          correct: 1,
          feedback: 'Strategic pharma partnerships provide funding, regulatory expertise, and commercial capabilities, often improving development success rates and market access.',
          points: 175
        },
        {
          id: 'commercial-launch',
          scenario: 'Your drug receives FDA approval for a rare disease affecting 50,000 patients. How should you price and launch?',
          options: [
            'Premium pricing at $300,000 annually to maximize revenue per patient',
            'Moderate pricing at $100,000 annually to ensure broad patient access',
            'Outcomes-based pricing tied to patient improvement metrics',
            'Tiered pricing based on patient income and insurance coverage'
          ],
          correct: 2,
          feedback: 'Outcomes-based pricing aligns company incentives with patient outcomes, improves payer acceptance, and can command premium pricing for superior results.',
          points: 200
        }
      ]
    }
  },
  {
    id: 'technology-software',
    name: 'Technology & Software',
    icon: <Laptop className="h-6 w-6" />,
    overview: 'Technology and software companies develop digital products, platforms, and services that transform how businesses operate and people interact with information.',
    howItWorks: 'This industry generates revenue through software licensing, subscriptions, advertising, transactions, and data monetization, with success driven by user adoption, network effects, and continuous innovation.',
    futureOutlook: 'AI integration, cloud computing maturation, and emerging technologies like quantum computing and AR/VR are creating new market opportunities while increasing competitive intensity and regulatory scrutiny.',
    levels: [
      {
        level: 1,
        focusArea: 'Tech Finance Basics',
        sampleTopics: ['SaaS metrics', 'Monthly recurring revenue', 'Customer acquisition cost', 'Churn rate'],
        flashcards: [
          {
            id: 'saas-metrics',
            term: 'SaaS Metrics',
            definition: 'Key performance indicators for software-as-a-service businesses including MRR, ARR, churn, and CAC'
          },
          {
            id: 'mrr-arr',
            term: 'MRR/ARR',
            definition: 'Monthly/Annual Recurring Revenue - predictable revenue streams from subscription customers'
          },
          {
            id: 'cac-ltv',
            term: 'CAC/LTV',
            definition: 'Customer Acquisition Cost vs. Lifetime Value ratio measuring marketing efficiency and profitability'
          },
          {
            id: 'churn-rate',
            term: 'Churn Rate',
            definition: 'Percentage of customers who cancel subscriptions within a given period, indicating product-market fit'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Tech companies use special metrics because they often sell subscriptions instead of one-time products. They track how much recurring revenue they have and how many customers they keep.',
            realWorldExample: 'If Netflix has 200 million subscribers paying $15/month, their monthly recurring revenue (MRR) is $3 billion, giving them predictable income.',
            keyTakeaways: [
              'Recurring revenue is more valuable than one-time sales',
              'Keeping existing customers is cheaper than finding new ones',
              'Tech metrics focus on growth and retention'
            ]
          },
          intermediate: {
            explanation: 'SaaS financial analysis requires understanding unit economics, cohort behavior, and growth efficiency metrics. The Rule of 40 (growth rate + profit margin) helps evaluate balanced growth vs. profitability.',
            realWorldExample: 'Salesforce maintains 25% revenue growth with 15% margins, achieving a Rule of 40 score of 40, indicating healthy balanced growth and profitability.',
            keyTakeaways: [
              'Rule of 40 balances growth vs. profitability optimization',
              'Cohort analysis reveals customer value evolution over time',
              'Net revenue retention above 110% indicates strong expansion revenue'
            ]
          },
          pro: {
            explanation: 'Advanced SaaS analysis incorporates cohort-based forecasting, multi-product cross-selling dynamics, and usage-based pricing model optimization. Machine learning improves churn prediction and expansion opportunities.',
            realWorldExample: 'Snowflake\'s consumption-based model grew net revenue retention to 158% by aligning pricing with customer value realization, creating compounding growth as customers scale usage.',
            keyTakeaways: [
              'Usage-based pricing aligns company success with customer outcomes',
              'Product-led growth reduces customer acquisition costs through viral adoption',
              'Multi-product platforms create higher switching costs and expansion revenue'
            ]
          }
        },
        quiz: {
          question: 'What does a 15% monthly churn rate indicate for a SaaS company?',
          options: [
            'Strong customer loyalty and product-market fit',
            'Significant customer retention challenges requiring immediate attention',
            'Normal churn rate for most software companies',
            'Seasonal variation in customer usage patterns'
          ],
          correct: 1,
          explanation: 'A 15% monthly churn rate is very high for SaaS companies (good rates are under 5% monthly), indicating serious customer retention issues that threaten business sustainability.'
        }
      },
      {
        level: 2,
        focusArea: 'Tech Business Models',
        sampleTopics: ['Subscription vs licensing', 'Freemium models', 'Platform businesses', 'Network effects'],
        flashcards: [
          {
            id: 'subscription-licensing',
            term: 'Subscription vs Licensing',
            definition: 'Subscription provides ongoing access for recurring fees; licensing grants usage rights for upfront payments'
          },
          {
            id: 'freemium-model',
            term: 'Freemium Model',
            definition: 'Business model offering basic services free while charging for premium features or capabilities'
          },
          {
            id: 'platform-business',
            term: 'Platform Business',
            definition: 'Model that connects different user groups, generating value through interactions and network effects'
          },
          {
            id: 'network-effects',
            term: 'Network Effects',
            definition: 'Phenomenon where product value increases as more people use it, creating competitive moats'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Tech companies make money in different ways. Some charge monthly subscriptions, others let you use basic features free but charge for premium ones, and platforms connect people who pay to use the service.',
            realWorldExample: 'Spotify uses freemium - you can listen with ads for free, but pay $10/month for ad-free premium. Uber is a platform connecting drivers and riders.',
            keyTakeaways: [
              'Subscription models provide predictable recurring revenue',
              'Freemium can attract users but must convert them to paid tiers',
              'Platforms become more valuable as they get more users'
            ]
          },
          intermediate: {
            explanation: 'Business model selection determines unit economics, scalability, and competitive positioning. Platform businesses achieve superior economics through network effects but require critical mass to succeed.',
            realWorldExample: 'Slack\'s freemium model converts 30% of teams to paid plans averaging $8 per user monthly, with viral adoption reducing customer acquisition costs as teams invite colleagues.',
            keyTakeaways: [
              'Freemium conversion rates vary significantly by use case and value proposition',
              'Platform businesses require dual-sided market development and chicken-and-egg solutions',
              'Network effects create increasing returns to scale and defensive moats'
            ]
          },
          pro: {
            explanation: 'Advanced business model analysis examines multi-sided platforms, data monetization strategies, and API ecosystems. Winner-take-all dynamics in platform markets require aggressive growth investment and strategic partnerships.',
            realWorldExample: 'Stripe\'s payment platform generates revenue from transaction fees while providing APIs that create developer lock-in, building a moat through switching costs and integrated workflows.',
            keyTakeaways: [
              'API strategies create developer ecosystems that compound competitive advantages',
              'Data network effects can be more defensible than simple user network effects',
              'Platform marketplaces require careful balance between supply and demand side incentives'
            ]
          }
        },
        quiz: {
          question: 'What is the primary advantage of network effects in platform businesses?',
          options: [
            'Lower development costs for new features',
            'Reduced customer acquisition costs through viral growth',
            'Higher conversion rates from free to paid users',
            'Improved product quality through user feedback'
          ],
          correct: 1,
          explanation: 'Network effects create viral growth where existing users attract new users, reducing customer acquisition costs and creating competitive moats as the platform becomes more valuable with scale.'
        }
      },
      {
        level: 3,
        focusArea: 'Tech Analysis',
        sampleTopics: ['Growth metrics', 'Unit economics', 'Competitive moats', 'TAM analysis'],
        flashcards: [
          {
            id: 'growth-metrics',
            term: 'Growth Metrics',
            definition: 'Key indicators of business expansion including user growth, revenue growth, and market penetration rates'
          },
          {
            id: 'unit-economics',
            term: 'Unit Economics',
            definition: 'Financial analysis of revenue and costs associated with individual customers or transactions'
          },
          {
            id: 'competitive-moats',
            term: 'Competitive Moats',
            definition: 'Sustainable competitive advantages that protect businesses from competition over time'
          },
          {
            id: 'tam-analysis',
            term: 'TAM Analysis',
            definition: 'Total Addressable Market analysis estimating the total market opportunity for a product or service'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Analyzing tech companies means looking at how fast they\'re growing, whether they make money on each customer, and what advantages protect them from competitors.',
            realWorldExample: 'Google has a strong moat because everyone uses their search engine, making it better with more data, and advertisers want to be where the users are.',
            keyTakeaways: [
              'Fast user growth often matters more than immediate profits',
              'Strong competitive advantages protect long-term profits',
              'Market size determines how big a company can grow'
            ]
          },
          intermediate: {
            explanation: 'Technology analysis requires understanding customer cohort behavior, competitive dynamics, and market expansion opportunities. Unit economics must account for blended customer acquisition costs across channels.',
            realWorldExample: 'Zoom\'s freemium model achieved negative net dollar retention during COVID as free users scaled beyond paid tier limits, demonstrating how usage-based models can drive organic conversion.',
            keyTakeaways: [
              'Cohort analysis reveals customer value evolution and retention patterns',
              'Competitive moats in tech often come from data, network effects, or switching costs',
              'TAM expansion through adjacent markets drives long-term growth potential'
            ]
          },
          pro: {
            explanation: 'Advanced tech analysis incorporates product-market fit metrics, technological disruption risk, and platform ecosystem dynamics. AI and machine learning increasingly drive competitive differentiation and unit economics optimization.',
            realWorldExample: 'Amazon Web Services achieved 70%+ gross margins by building scale advantages in infrastructure, data center efficiency, and developer tools that create switching costs exceeding 20% of customer spending.',
            keyTakeaways: [
              'Infrastructure businesses achieve superior unit economics through scale and utilization optimization',
              'Developer ecosystems create multi-layered switching costs beyond simple price comparison',
              'AI integration increasingly determines competitive positioning across software categories'
            ]
          }
        },
        quiz: {
          question: 'What indicates strong unit economics in a tech business?',
          options: [
            'High revenue growth rates above 50% annually',
            'Customer lifetime value significantly exceeding acquisition costs',
            'Large total addressable market opportunity',
            'Strong brand recognition and market share'
          ],
          correct: 1,
          explanation: 'Strong unit economics means the lifetime value of customers significantly exceeds the cost to acquire them, indicating sustainable profitability at the customer level.'
        }
      },
      {
        level: 4,
        focusArea: 'Tech Investing Skills',
        sampleTopics: ['Revenue forecasting', 'Cohort modeling', 'Scenario analysis', 'Platform valuation'],
        flashcards: [
          {
            id: 'revenue-forecasting',
            term: 'Revenue Forecasting',
            definition: 'Projecting future revenue using metrics like user growth, pricing changes, and market expansion'
          },
          {
            id: 'cohort-modeling',
            term: 'Cohort Modeling',
            definition: 'Analyzing groups of customers acquired in the same period to understand retention and value patterns'
          },
          {
            id: 'scenario-analysis',
            term: 'Scenario Analysis',
            definition: 'Valuation technique examining multiple potential outcomes based on different assumptions'
          },
          {
            id: 'platform-valuation',
            term: 'Platform Valuation',
            definition: 'Specialized valuation methods for platform businesses considering network effects and winner-take-all dynamics'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Valuing tech companies requires predicting how many users they\'ll have, how much those users will pay, and considering different scenarios for how the business might grow.',
            realWorldExample: 'To value Netflix, you\'d estimate future subscriber growth, average revenue per user, and content costs, then test different scenarios like increased competition or international expansion.',
            keyTakeaways: [
              'Tech valuations depend heavily on growth assumptions',
              'Multiple scenarios help account for uncertainty',
              'User behavior patterns are key to accurate forecasts'
            ]
          },
          intermediate: {
            explanation: 'Technology investment modeling requires cohort-based forecasting, competitive response analysis, and platform scaling dynamics. DCF models must incorporate high growth phases and terminal value assumptions.',
            realWorldExample: 'Shopify\'s valuation required modeling merchant growth across different business sizes, transaction volume scaling, and competitive responses from Amazon and other platforms.',
            keyTakeaways: [
              'Cohort analysis provides more accurate customer behavior predictions than aggregate metrics',
              'Platform businesses require modeling network effects and multi-sided market dynamics',
              'Competitive response scenarios significantly impact long-term value projections'
            ]
          },
          pro: {
            explanation: 'Advanced tech valuation incorporates option theory for growth opportunities, competitive game theory, and ecosystem value creation. Machine learning models improve forecasting accuracy through pattern recognition.',
            realWorldExample: 'Microsoft\'s cloud transformation required valuing the optionality of enterprise relationships, Office 365 migration paths, and Azure\'s competitive positioning against AWS in a winner-take-most market.',
            keyTakeaways: [
              'Platform ecosystems create option value beyond core business metrics',
              'Winner-take-all markets require different valuation frameworks than traditional industries',
              'Technology disruption risk requires continuous model updating and scenario stress-testing'
            ]
          }
        },
        quiz: {
          question: 'Why is cohort modeling particularly important for SaaS company valuation?',
          options: [
            'It helps predict seasonal revenue variations',
            'It reveals customer retention and expansion patterns over time',
            'It determines optimal pricing strategies for different markets',
            'It identifies the best customer acquisition channels'
          ],
          correct: 1,
          explanation: 'Cohort modeling shows how customer behavior evolves over time, revealing retention rates, expansion revenue, and lifetime value patterns essential for accurate SaaS valuation.'
        }
      },
      {
        level: 5,
        focusArea: 'Tech in Practice',
        sampleTopics: ['Facebook IPO', 'Google YouTube acquisition', 'Microsoft LinkedIn deal', 'Startup funding cycles'],
        flashcards: [
          {
            id: 'facebook-ipo',
            term: 'Facebook IPO',
            definition: '2012 public offering that raised $16B but faced initial trading problems and mobile monetization concerns'
          },
          {
            id: 'youtube-acquisition',
            term: 'YouTube Acquisition',
            definition: 'Google\'s $1.65B purchase of YouTube in 2006, now worth over $100B as video advertising platform'
          },
          {
            id: 'linkedin-deal',
            term: 'Microsoft LinkedIn Deal',
            definition: '$26B acquisition in 2016 to strengthen Microsoft\'s enterprise software and data capabilities'
          },
          {
            id: 'startup-funding',
            term: 'Startup Funding Cycles',
            definition: 'Investment stages from seed to IPO, including Series A, B, C rounds with different investor types'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Real tech deals show how companies grow from startups to big public companies, and how large companies buy smaller ones to get new technologies or eliminate competition.',
            realWorldExample: 'Google bought YouTube for $1.65 billion in 2006. People thought it was expensive, but now YouTube makes over $25 billion annually for Google.',
            keyTakeaways: [
              'Big acquisitions can seem expensive but create huge value',
              'IPOs let private companies raise money from public investors',
              'Startups need multiple rounds of funding to grow'
            ]
          },
          intermediate: {
            explanation: 'Technology M&A and IPO case studies reveal strategic rationales, valuation methodologies, and execution challenges. Integration success depends on cultural fit, technology compatibility, and market timing.',
            realWorldExample: 'Microsoft\'s LinkedIn acquisition provided data for AI training, expanded enterprise customer relationships, and created cross-selling opportunities worth more than the $26B purchase price.',
            keyTakeaways: [
              'Strategic acquisitions often create value through data, customer, and technology synergies',
              'IPO timing depends on market conditions, company readiness, and investor appetite',
              'Platform acquisitions can accelerate ecosystem development and competitive positioning'
            ]
          },
          pro: {
            explanation: 'Advanced M&A analysis examines competitive dynamics, regulatory considerations, and value creation mechanisms. IPO analysis requires understanding public market valuations, growth expectations, and execution risks.',
            realWorldExample: 'Amazon\'s acquisition strategy focuses on logistics (Whole Foods), advertising (Twitch), and voice AI (Ring, Eero) to strengthen platform moats rather than direct revenue accretion.',
            keyTakeaways: [
              'Strategic acquisitions increasingly focus on data, AI capabilities, and ecosystem extension',
              'Regulatory scrutiny of big tech M&A requires antitrust analysis and alternative structure consideration',
              'IPO success requires sustainable unit economics and clear path to profitability for public investors'
            ]
          }
        },
        quiz: {
          question: 'What was the primary strategic rationale behind Microsoft\'s LinkedIn acquisition?',
          options: [
            'To compete directly with Facebook in social networking',
            'To expand enterprise data and customer relationships',
            'To enter the recruiting and HR software market',
            'To acquire LinkedIn\'s advertising technology platform'
          ],
          correct: 1,
          explanation: 'Microsoft acquired LinkedIn primarily to enhance its enterprise software offering with professional data, expand customer relationships, and create cross-selling opportunities across its business suite.'
        }
      },
      {
        level: 6,
        focusArea: 'Tech & Innovation Cycles',
        sampleTopics: ['Technology adoption curves', 'Platform shifts', 'AI transformation', 'Regulatory challenges'],
        flashcards: [
          {
            id: 'adoption-curves',
            term: 'Technology Adoption Curves',
            definition: 'Pattern showing how new technologies spread from innovators to early adopters to mainstream users'
          },
          {
            id: 'platform-shifts',
            term: 'Platform Shifts',
            definition: 'Major technology transitions like mobile, cloud, and AI that reshape competitive landscapes'
          },
          {
            id: 'ai-transformation',
            term: 'AI Transformation',
            definition: 'Current wave of artificial intelligence integration transforming software capabilities and business models'
          },
          {
            id: 'tech-regulation',
            term: 'Technology Regulation',
            definition: 'Government oversight of tech companies addressing privacy, competition, and content moderation concerns'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'Technology goes through cycles where new innovations slowly get adopted, then suddenly become mainstream. Companies that recognize these shifts early often become very successful.',
            realWorldExample: 'Smartphones seemed like expensive toys in 2007, but by 2015 most people had one. Companies like Uber and Instagram were built for the smartphone world.',
            keyTakeaways: [
              'New technologies start slow then accelerate quickly',
              'Platform shifts create opportunities for new companies',
              'Governments are increasingly regulating big tech companies'
            ]
          },
          intermediate: {
            explanation: 'Technology cycle analysis helps identify inflection points where new platforms create winner-take-all opportunities. Early positioning in platform shifts often determines long-term market leadership.',
            realWorldExample: 'Cloud computing adoption accelerated from 10% to 50% of IT spending over five years, enabling companies like Snowflake and Zoom to build multi-billion dollar businesses on cloud-native architectures.',
            keyTakeaways: [
              'Platform transitions create 10-20 year competitive advantages for early leaders',
              'AI integration is becoming table stakes across software categories',
              'Regulatory frameworks lag technology development, creating uncertainty periods'
            ]
          },
          pro: {
            explanation: 'Advanced technology analysis incorporates adoption curve modeling, competitive response theory, and regulatory scenario planning. Platform shift timing requires balancing first-mover advantages against market readiness.',
            realWorldExample: 'OpenAI\'s ChatGPT launch accelerated enterprise AI adoption timelines by 2-3 years, forcing competitors to rapidly deploy AI features and creating new categories like AI-powered search and coding assistants.',
            keyTakeaways: [
              'Breakthrough products can accelerate entire technology adoption curves',
              'Platform leaders must continuously innovate to maintain competitive positioning',
              'Regulatory responses to AI will likely shape competitive dynamics for decades'
            ]
          }
        },
        quiz: {
          question: 'What typically happens during major platform shifts in technology?',
          options: [
            'Existing market leaders maintain their dominant positions',
            'New companies can challenge incumbents with platform-native solutions',
            'Technology adoption slows due to increased complexity',
            'Regulatory oversight increases before innovation occurs'
          ],
          correct: 1,
          explanation: 'Platform shifts like mobile or cloud create opportunities for new companies to build platform-native solutions that can outcompete incumbents constrained by legacy architectures.'
        }
      }
    ],
    game: {
      id: 'tech-startup',
      name: 'Tech Startup Simulator',
      description: 'Build a successful technology startup by making strategic decisions about product development, customer acquisition, funding, and scaling operations.',
      instructions: 'You start with a great idea and $50K in seed funding. Make decisions about product features, target markets, pricing, team building, and growth strategies. Balance growth with sustainability to build a billion-dollar company.',
      scenarios: [
        {
          id: 'product-strategy',
          scenario: 'You\'re launching a new SaaS product. What\'s your go-to-market strategy?',
          options: [
            'Freemium model to maximize user acquisition and viral growth',
            'Premium pricing targeting enterprise customers with high willingness to pay',
            'Product-led growth with free trial converting to paid subscriptions',
            'Partner channel strategy leveraging existing vendor relationships'
          ],
          correct: 2,
          feedback: 'Product-led growth combines user acquisition with natural conversion paths, allowing customers to experience value before purchasing decisions.',
          points: 100
        },
        {
          id: 'scaling-challenge',
          scenario: 'Your startup is growing 20% monthly but churn is increasing to 8%. What\'s your priority?',
          options: [
            'Increase marketing spend to accelerate new customer acquisition',
            'Pause growth initiatives to focus on customer success and retention',
            'Launch new features to increase product stickiness and value',
            'Raise prices to focus on higher-value customers who stay longer'
          ],
          correct: 1,
          feedback: 'High churn undermines growth sustainability. Fixing retention issues before scaling further prevents expensive customer acquisition waste.',
          points: 150
        },
        {
          id: 'funding-round',
          scenario: 'You need $5M Series A funding. VCs are concerned about competitive moats. How do you address this?',
          options: [
            'Demonstrate strong network effects and viral growth patterns',
            'Show proprietary data advantages and machine learning capabilities',
            'Highlight switching costs and integration complexity for customers',
            'Present plans for rapid market expansion and first-mover advantages'
          ],
          correct: 1,
          feedback: 'Proprietary data and AI capabilities create sustainable competitive advantages that improve over time, addressing VC concerns about defensibility.',
          points: 125
        },
        {
          id: 'competition-response',
          scenario: 'A well-funded competitor launches with similar features and aggressive pricing. How do you respond?',
          options: [
            'Match their pricing to prevent customer defection',
            'Double down on unique features and superior customer experience',
            'Pivot to adjacent market where you have stronger positioning',
            'Seek acquisition discussions with strategic partners'
          ],
          correct: 1,
          feedback: 'Differentiation through unique value and customer experience builds stronger competitive positioning than price wars with well-funded competitors.',
          points: 175
        },
        {
          id: 'exit-strategy',
          scenario: 'Your company has reached $50M ARR with strong growth. A strategic buyer offers $500M (10x revenue). What do you do?',
          options: [
            'Accept the offer to guarantee returns for investors and team',
            'Negotiate for higher valuation based on growth trajectory and market potential',
            'Decline and pursue IPO path to capture more long-term value',
            'Use the offer as leverage to raise additional growth capital'
          ],
          correct: 3,
          feedback: 'Strategic acquisition interest validates the business and can be leveraged to raise growth capital on better terms, maintaining independence while accelerating growth.',
          points: 200
        }
      ]
    }
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    icon: <Brain className="h-6 w-6" />,
    overview: 'Artificial Intelligence encompasses companies developing machine learning, neural networks, and automated decision-making systems that augment or replace human cognitive tasks.',
    howItWorks: 'AI companies generate revenue through software licensing, cloud services, data processing, and automation solutions, with success driven by data quality, algorithmic innovation, and practical application.',
    futureOutlook: 'Generative AI, large language models, and autonomous systems are creating trillion-dollar market opportunities while raising important questions about job displacement, ethics, and societal impact.',
    levels: [
      {
        level: 1,
        focusArea: 'AI Finance Basics',
        sampleTopics: ['Machine learning basics', 'Neural networks', 'AI model training', 'Data requirements'],
        flashcards: [
          {
            id: 'machine-learning',
            term: 'Machine Learning',
            definition: 'Computer systems that automatically improve performance through experience without explicit programming'
          },
          {
            id: 'neural-networks',
            term: 'Neural Networks',
            definition: 'AI models inspired by human brain structure, using interconnected nodes to process information'
          },
          {
            id: 'model-training',
            term: 'AI Model Training',
            definition: 'Process of teaching AI systems using large datasets to recognize patterns and make predictions'
          },
          {
            id: 'training-data',
            term: 'Training Data',
            definition: 'Large datasets used to teach AI models, with quality and quantity determining model performance'
          }
        ],
        interactiveContent: {
          beginner: {
            explanation: 'AI is computer software that learns to do tasks by studying lots of examples, similar to how humans learn. The more good examples it sees, the better it gets at the task.',
            realWorldExample: 'Netflix uses AI to recommend movies by studying what millions of users watched and liked. The more people use it, the better its recommendations become.',
            keyTakeaways: [
              'AI learns from data and examples rather than following programmed rules',
              'More and better data usually leads to better AI performance',
              'AI excels at finding patterns humans might miss'
            ]
          },
          intermediate: {
            explanation: 'AI system performance depends on data quality, model architecture, and training methodology. Different AI approaches suit different problem types, from computer vision to natural language processing.',
            realWorldExample: 'OpenAI\'s GPT models required training on billions of text examples and months of computer processing, costing millions of dollars to develop but enabling human-like text generation.',
            keyTakeaways: [
              'AI development requires significant computational resources and technical expertise',
              'Model performance improves with scale but costs increase exponentially',
              'Specialized AI models often outperform general-purpose solutions for specific tasks'
            ]
          },
          pro: {
            explanation: 'Advanced AI development involves transformer architectures, reinforcement learning, and multi-modal training. Model scaling laws predict performance improvements from increased parameters, data, and compute.',
            realWorldExample: 'Google\'s PaLM model with 540B parameters achieved breakthrough performance on complex reasoning tasks, demonstrating how scale unlocks emergent capabilities not present in smaller models.',
            keyTakeaways: [
              'Emergent capabilities appear at specific model scales, creating discontinuous performance improvements',
              'Multi-modal AI systems combining text, images, and audio create more powerful applications',
              'AI model performance follows predictable scaling laws that guide investment decisions'
            ]
          }
        },
        quiz: {
          question: 'What is the most important factor for AI model performance?',
          options: [
            'The programming language used to build the model',
            'The quality and quantity of training data',
            'The speed of the computer processor',
            'The number of software engineers working on it'
          ],
          correct: 1,
          explanation: 'Training data quality and quantity are the most critical factors for AI performance - models can only be as good as the data they learn from.'
        }
      }
      // Additional AI levels would continue here following the same pattern
    ],
    game: {
      id: 'ai-research-lab',
      name: 'AI Research Lab',
      description: 'Run an AI research laboratory by making decisions about research focus, talent acquisition, computational resources, and product development.',
      instructions: 'You lead an AI research lab with $100M in funding. Choose research directions, hire talent, acquire datasets, and build products that demonstrate AI capabilities. Balance long-term research with commercial applications.',
      scenarios: [
        {
          id: 'research-focus',
          scenario: 'Your lab needs to choose a primary research focus. Which area offers the best commercial potential?',
          options: [
            'Large language models for text generation and understanding',
            'Computer vision for autonomous vehicles and robotics',
            'Drug discovery and molecular design applications',
            'Reinforcement learning for game AI and decision optimization'
          ],
          correct: 0,
          feedback: 'Large language models have proven commercial applications across industries and can be adapted to many use cases, offering the broadest market opportunity.',
          points: 100
        },
        {
          id: 'talent-acquisition',
          scenario: 'Top AI researchers are expensive and scarce. How do you build your team?',
          options: [
            'Hire a few elite researchers with proven track records at maximum salaries',
            'Build a larger team of promising junior researchers and train them internally',
            'Partner with universities to access graduate students and research projects',
            'Acquire smaller AI startups to get teams and intellectual property'
          ],
          correct: 0,
          feedback: 'Elite AI researchers have outsized impact on breakthrough discoveries and can attract additional talent, making them worth premium compensation.',
          points: 150
        },
        {
          id: 'compute-strategy',
          scenario: 'Training large AI models requires massive computational resources. What\'s your approach?',
          options: [
            'Build your own GPU clusters for maximum control and long-term cost efficiency',
            'Use cloud computing services for flexibility and reduced capital requirements',
            'Partner with cloud providers for dedicated compute allocations and support',
            'Focus on smaller, more efficient models that require less computational power'
          ],
          correct: 2,
          feedback: 'Cloud partnerships provide dedicated resources, technical support, and cost predictability while avoiding large capital investments in rapidly evolving hardware.',
          points: 125
        },
        {
          id: 'commercialization',
          scenario: 'Your research team develops a breakthrough AI model. How do you commercialize it?',
          options: [
            'License the technology to existing companies in relevant industries',
            'Build your own products and services around the AI capabilities',
            'Open-source the model to build developer ecosystem and brand recognition',
            'Sell the intellectual property to the highest bidder for immediate returns'
          ],
          correct: 1,
          feedback: 'Building your own products captures the full value of AI breakthroughs and creates sustainable competitive advantages rather than one-time licensing revenue.',
          points: 175
        },
        {
          id: 'ethical-considerations',
          scenario: 'Your AI system shows potential bias in hiring recommendations. How do you address this?',
          options: [
            'Adjust the training data to remove biased examples and retrain the model',
            'Add algorithmic bias detection and correction mechanisms to the system',
            'Implement human oversight requirements for all AI-generated recommendations',
            'Transparently disclose the limitations and let users make informed decisions'
          ],
          correct: 1,
          feedback: 'Algorithmic bias correction mechanisms provide systematic solutions that can be validated, audited, and continuously improved as new bias patterns emerge.',
          points: 200
        }
      ]
    }
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    icon: <Building2 className="h-6 w-6" />,
    overview: 'Private equity firms acquire companies using a combination of debt and equity, improve operations, and sell for profits within 3-7 years.',
    howItWorks: 'PE firms raise funds from institutional investors, acquire portfolio companies, implement value creation strategies, and exit through sales or IPOs.',
    futureOutlook: 'The industry faces pressure from rising interest rates, increased competition, and regulatory scrutiny, while opportunities emerge in tech, healthcare, and ESG investing.',
    levels: [
      {
        level: 1,
        focusArea: 'PE Fund Structure',
        sampleTopics: ['Limited partners', 'Management fees', 'Carried interest', 'Fund lifecycle'],
        flashcards: [],
        interactiveContent: {
          beginner: {
            explanation: 'Private equity firms are like real estate flippers, but for entire companies. They buy companies, improve them, and sell them for a profit.',
            realWorldExample: 'KKR bought Dollar General for $7 billion, improved operations, and sold it for $22 billion.',
            keyTakeaways: [
              'PE firms use investor money plus debt to buy companies',
              'They aim to improve company performance over 3-7 years',
              'Profits come from selling improved companies at higher valuations'
            ]
          },
          intermediate: {
            explanation: 'PE fund structure involves limited partners providing capital, general partners managing investments, and complex fee arrangements including management fees and carried interest.',
            realWorldExample: 'A typical PE fund charges 2% annual management fees plus 20% of profits above an 8% hurdle rate.',
            keyTakeaways: [
              '2 and 20 fee structure aligns GP and LP interests',
              'Hurdle rates ensure LPs get minimum returns before GP profit sharing',
              'Fund lifecycle typically spans 10-12 years'
            ]
          },
          pro: {
            explanation: 'Advanced PE analysis involves complex waterfall structures, co-investment opportunities, and secondary market dynamics affecting fund performance and LP allocation strategies.',
            realWorldExample: 'Top-tier funds like Apollo and Blackstone command premium terms due to consistent outperformance and limited capacity.',
            keyTakeaways: [
              'Fund performance persistence creates tier stratification',
              'Co-investment rights provide additional return enhancement',
              'Secondary markets offer liquidity for LP portfolio management'
            ]
          }
        },
        quiz: {
          question: 'What is carried interest in private equity?',
          options: [
            'Interest charged on loans to portfolio companies',
            'The PE firm\'s share of profits above a minimum return threshold',
            'Management fees charged to limited partners',
            'Interest earned on uninvested fund capital'
          ],
          correct: 1,
          explanation: 'Carried interest is the PE firm\'s share of fund profits (typically 20%) paid only after limited partners receive their minimum return hurdle.'
        }
      }
    ]
  },
  {
    id: 'investment-banking',
    name: 'Investment Banking',
    icon: <TrendingUp className="h-6 w-6" />,
    overview: 'Investment banks provide financial services including underwriting securities, facilitating mergers and acquisitions, and trading financial instruments.',
    howItWorks: 'Revenue comes from advisory fees on M&A transactions, underwriting fees for securities issuance, and trading profits from market-making activities.',
    futureOutlook: 'Digital transformation, regulatory changes, and market volatility are reshaping the industry while ESG considerations and fintech disruption create new challenges and opportunities.',
    levels: [
      {
        level: 1,
        focusArea: 'IB Revenue Streams',
        sampleTopics: ['Advisory fees', 'Underwriting', 'Trading revenue', 'Asset management'],
        flashcards: [],
        interactiveContent: {
          beginner: {
            explanation: 'Investment banks help companies raise money and provide financial advice. They make money through fees for their services and profits from trading.',
            realWorldExample: 'When a company goes public, investment banks help price and sell the shares, earning millions in underwriting fees.',
            keyTakeaways: [
              'Investment banks are intermediaries in financial markets',
              'They earn fees for advisory services and underwriting',
              'Trading activities generate additional revenue but add risk'
            ]
          },
          intermediate: {
            explanation: 'Investment banking revenue streams include M&A advisory fees, equity and debt underwriting, sales and trading commissions, and asset management fees from wealth management divisions.',
            realWorldExample: 'Goldman Sachs earned $2.3 billion in investment banking fees in 2021, with M&A advisory representing the largest component.',
            keyTakeaways: [
              'M&A advisory fees are highly cyclical based on deal activity',
              'Underwriting provides steadier revenue but requires capital commitment',
              'Trading revenue is volatile and dependent on market conditions'
            ]
          },
          pro: {
            explanation: 'Advanced IB analysis examines wallet share in key sectors, client relationship durability, and capital efficiency across business lines including prime brokerage and structured products.',
            realWorldExample: 'JPMorgan\'s corporate banking relationships provide defensive moats for investment banking mandates, creating integrated revenue opportunities.',
            keyTakeaways: [
              'Relationship banking creates cross-selling opportunities and defensive positioning',
              'Capital allocation between trading and lending affects ROE optimization',
              'Regulatory capital requirements impact business mix and profitability'
            ]
          }
        },
        quiz: {
          question: 'What is the primary source of revenue for investment banks?',
          options: [
            'Interest income from loans to retail customers',
            'Fees from advisory services and underwriting activities',
            'Dividends from equity investments',
            'Insurance premiums from coverage policies'
          ],
          correct: 1,
          explanation: 'Investment banks primarily generate revenue from fees earned on advisory services (M&A, restructuring) and underwriting activities (IPOs, bond issuances).'
        }
      }
    ]
  }
];
