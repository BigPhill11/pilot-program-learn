export interface IBTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'basics' | 'ib_services' | 'ib_process' | 'ib_documents' | 'ma' | 'capital_markets' | 'trading' | 'compliance' | 'technology';
}

// Level 1: Welcome to Wall Street - Foundation terms
const level1Terms: Record<string, IBTerm> = {
  investment_bank: {
    term: 'Investment Bank',
    definition: 'A financial institution that helps companies raise money and provides advice on deals',
    analogy: 'Like a real estate agent who helps people buy and sell houses, but for companies',
    level: 1,
    category: 'basics'
  },
  ipo: {
    term: 'IPO',
    definition: 'Initial Public Offering: When a company sells shares to the public for the first time',
    analogy: 'Like a lemonade stand going from neighborhood-only to stores everywhere!',
    level: 1,
    category: 'basics'
  },
  merger: {
    term: 'Merger',
    definition: 'Two companies combining to become one',
    analogy: 'Two friend groups becoming one big group!',
    level: 1,
    category: 'basics'
  },
  financing: {
    term: 'Financing',
    definition: 'The process of providing money to companies for their business needs',
    analogy: 'Like getting a loan from your parents to start a business!',
    level: 1,
    category: 'basics'
  },
  client: {
    term: 'Client',
    definition: 'Company asking for investment banking help',
    analogy: 'A friend asking for important advice!',
    level: 1,
    category: 'basics'
  },
  stock: {
    term: 'Stock',
    definition: 'A piece of ownership in a company',
    analogy: 'Like owning a slice of pizza!',
    level: 1,
    category: 'basics'
  },
  capital: {
    term: 'Capital',
    definition: 'Money used to start or grow a business',
    analogy: 'Like seed money to plant and grow a garden!',
    level: 1,
    category: 'basics'
  }
};

// Level 2: The Deal Factory - Operations & Structure
const level2Terms: Record<string, IBTerm> = {
  underwriting: {
    term: 'Underwriting',
    definition: 'When investment banks buy securities from companies and sell them to investors, taking on the risk',
    analogy: 'Like a store buying products from manufacturers to sell to customers - the store takes the risk that customers will buy',
    level: 2,
    category: 'ib_services'
  },
  syndicate: {
    term: 'Syndicate',
    definition: 'A group of investment banks working together on a large deal to share risk and expertise',
    analogy: 'Like a team of friends pooling money to buy something expensive together - everyone shares the cost and risk',
    level: 2,
    category: 'ib_process'
  },
  prospectus: {
    term: 'Prospectus',
    definition: 'A detailed document describing a company and its stock offering for potential investors',
    analogy: 'Like a detailed product manual that tells you everything about what you\'re buying before you buy it',
    level: 2,
    category: 'ib_documents'
  },
  due_diligence: {
    term: 'Due Diligence',
    definition: 'Thorough investigation and analysis of a company before a deal',
    analogy: 'Like a detective investigating a crime scene to find all the clues',
    level: 2,
    category: 'ib_process'
  },
  pitch_book: {
    term: 'Pitch Book',
    definition: 'A presentation investment bankers create to pitch their services to potential clients',
    analogy: 'Like a portfolio showing your best work when applying for a job - it showcases what you can do',
    level: 2,
    category: 'ib_documents'
  },
  mandates: {
    term: 'Mandates',
    definition: 'When a company officially hires an investment bank to work on a specific deal or project',
    analogy: 'Like hiring a contractor for a home renovation - you give them official permission to do the work',
    level: 2,
    category: 'ib_process'
  },
  roadshow: {
    term: 'Roadshow',
    definition: 'A series of presentations by company management to potential investors before an IPO',
    analogy: 'Like a band going on tour to promote their new album before it releases',
    level: 2,
    category: 'ib_process'
  },
  bookrunner: {
    term: 'Bookrunner',
    definition: 'The lead investment bank that manages the order book and coordinates the deal',
    analogy: 'Like the director of a play who coordinates all the actors and crew',
    level: 2,
    category: 'ib_services'
  }
};

// Level 3: Mergers & Acquisitions - M&A Mastery
const level3Terms: Record<string, IBTerm> = {
  acquisition: {
    term: 'Acquisition',
    definition: 'When one company buys another company, with the target company becoming part of the buyer',
    analogy: 'Like a big fish eating a smaller fish - the smaller one becomes part of the bigger one',
    level: 3,
    category: 'ma'
  },
  hostile_takeover: {
    term: 'Hostile Takeover',
    definition: 'When one company tries to buy another company even though the target doesn\'t want to be bought',
    analogy: 'Like trying to buy someone\'s house even though they don\'t want to sell it',
    level: 3,
    category: 'ma'
  },
  synergies: {
    term: 'Synergies',
    definition: 'Benefits created when two companies work together that wouldn\'t exist if they operated separately',
    analogy: 'Like when two musicians play together and create better music than either could make alone',
    level: 3,
    category: 'ma'
  },
  valuation: {
    term: 'Valuation',
    definition: 'Determining the economic worth of a company or asset',
    analogy: 'Like getting your house appraised to find out its market value',
    level: 3,
    category: 'basics'
  },
  premium: {
    term: 'Premium',
    definition: 'The extra amount paid above a company\'s current market price in an acquisition',
    analogy: 'Like paying extra for a popular toy during the holidays',
    level: 3,
    category: 'ma'
  },
  accretion: {
    term: 'Accretion',
    definition: 'When an acquisition increases the buyer\'s earnings per share',
    analogy: 'Like adding a profitable lemonade stand to your existing business and making more money per store',
    level: 3,
    category: 'ma'
  },
  poison_pill: {
    term: 'Poison Pill',
    definition: 'A defense strategy that makes a company less attractive to hostile takeovers',
    analogy: 'Like putting a security system on your house to discourage burglars',
    level: 3,
    category: 'ma'
  }
};

// Level 4: Capital Markets & Trading - Markets in Motion
const level4Terms: Record<string, IBTerm> = {
  market_making: {
    term: 'Market Making',
    definition: 'Providing liquidity by being ready to buy or sell securities at quoted prices',
    analogy: 'Like being a store that always has products in stock and is ready to sell them',
    level: 4,
    category: 'trading'
  },
  fixed_income: {
    term: 'Fixed Income',
    definition: 'Securities that pay regular, fixed interest payments like bonds',
    analogy: 'Like a savings account that pays you the same amount of interest every month',
    level: 4,
    category: 'capital_markets'
  },
  equity_capital_markets: {
    term: 'Equity Capital Markets',
    definition: 'The division that helps companies raise money by selling stock',
    analogy: 'Like a department store section that specializes in selling ownership pieces of companies',
    level: 4,
    category: 'capital_markets'
  },
  debt_capital_markets: {
    term: 'Debt Capital Markets',
    definition: 'The division that helps companies and governments raise money by issuing bonds',
    analogy: 'Like a lending department that helps people create IOUs for investors',
    level: 4,
    category: 'capital_markets'
  },
  bid_ask_spread: {
    term: 'Bid-Ask Spread',
    definition: 'The difference between what buyers want to pay and what sellers want to receive',
    analogy: 'Like the gap between what you\'d pay for a used car and what the seller wants',
    level: 4,
    category: 'trading'
  },
  liquidity: {
    term: 'Liquidity',
    definition: 'How easily an asset can be bought or sold without affecting its price',
    analogy: 'Like how easy it is to sell your bike - popular bikes sell quickly, rare ones take time',
    level: 4,
    category: 'trading'
  },
  volatility: {
    term: 'Volatility',
    definition: 'How much an asset\'s price moves up and down over time',
    analogy: 'Like how much the temperature changes throughout the day - some days are steady, others are all over the place',
    level: 4,
    category: 'trading'
  }
};

// Level 5: Advanced Deal Structures - Financial Engineering
const level5Terms: Record<string, IBTerm> = {
  leveraged_buyout: {
    term: 'Leveraged Buyout',
    definition: 'Acquiring a company using a significant amount of borrowed money',
    analogy: 'Like buying a house with a large mortgage - you use the house as collateral for the loan',
    level: 5,
    category: 'ma'
  },
  mezzanine_financing: {
    term: 'Mezzanine Financing',
    definition: 'A hybrid of debt and equity financing that gives the lender rights to convert to equity',
    analogy: 'Like a loan that can turn into ownership if certain conditions are met',
    level: 5,
    category: 'ib_services'
  },
  convertible_bond: {
    term: 'Convertible Bond',
    definition: 'A bond that can be converted into a predetermined number of company shares',
    analogy: 'Like a movie ticket that can also be exchanged for popcorn if you want',
    level: 5,
    category: 'capital_markets'
  },
  private_placement: {
    term: 'Private Placement',
    definition: 'Selling securities directly to institutional investors rather than through public markets',
    analogy: 'Like selling your art directly to a gallery instead of at a public auction',
    level: 5,
    category: 'capital_markets'
  },
  spac: {
    term: 'SPAC',
    definition: 'Special Purpose Acquisition Company: A shell company that raises money to acquire another business',
    analogy: 'Like creating an empty box, filling it with money from investors, then finding a company to put in the box',
    level: 5,
    category: 'capital_markets'
  },
  derivative: {
    term: 'Derivative',
    definition: 'A financial contract whose value is derived from an underlying asset',
    analogy: 'Like a ticket to a sports game - its value depends on the game itself',
    level: 5,
    category: 'trading'
  },
  credit_rating: {
    term: 'Credit Rating',
    definition: 'An assessment of the creditworthiness of a borrower or debt instrument',
    analogy: 'Like a report card for how well someone pays back money they borrow',
    level: 5,
    category: 'basics'
  }
};

// Level 6: Regulatory & Risk Management - Compliance & Control
const level6Terms: Record<string, IBTerm> = {
  compliance: {
    term: 'Compliance',
    definition: 'Ensuring all business activities follow laws, regulations, and internal policies',
    analogy: 'Like making sure everyone follows the rules of the road when driving',
    level: 6,
    category: 'compliance'
  },
  fiduciary_duty: {
    term: 'Fiduciary Duty',
    definition: 'Legal obligation to act in the best interest of clients',
    analogy: 'Like a babysitter\'s responsibility to take care of kids as if they were their own',
    level: 6,
    category: 'compliance'
  },
  chinese_wall: {
    term: 'Chinese Wall',
    definition: 'Information barriers between different divisions to prevent conflicts of interest',
    analogy: 'Like having separate rooms for different activities so secrets don\'t accidentally get shared',
    level: 6,
    category: 'compliance'
  },
  risk_management: {
    term: 'Risk Management',
    definition: 'Identifying, assessing, and mitigating potential risks in financial activities',
    analogy: 'Like having insurance and safety equipment to protect against unexpected events',
    level: 6,
    category: 'compliance'
  },
  stress_testing: {
    term: 'Stress Testing',
    definition: 'Simulating extreme market conditions to see how portfolios or systems would perform',
    analogy: 'Like testing a bridge with extra heavy trucks to make sure it won\'t collapse',
    level: 6,
    category: 'compliance'
  },
  kyc: {
    term: 'Know Your Customer',
    definition: 'Process of verifying the identity and assessing the risk of clients',
    analogy: 'Like checking someone\'s ID and background before letting them into an exclusive club',
    level: 6,
    category: 'compliance'
  },
  aml: {
    term: 'Anti-Money Laundering',
    definition: 'Regulations and procedures to prevent criminals from disguising illegal funds as legitimate',
    analogy: 'Like having security guards who check that all money coming in is from legal sources',
    level: 6,
    category: 'compliance'
  }
};

// Level 7: Future of Investment Banking - Technology & Innovation
const level7Terms: Record<string, IBTerm> = {
  artificial_intelligence: {
    term: 'Artificial Intelligence',
    definition: 'Computer systems that can perform tasks typically requiring human intelligence',
    analogy: 'Like having a super-smart robot assistant that can analyze data and make recommendations',
    level: 7,
    category: 'technology'
  },
  algorithmic_trading: {
    term: 'Algorithmic Trading',
    definition: 'Using computer programs to automatically execute trades based on pre-set instructions',
    analogy: 'Like setting up a robot to buy and sell stocks for you based on specific rules',
    level: 7,
    category: 'technology'
  },
  blockchain: {
    term: 'Blockchain',
    definition: 'A digital ledger technology that records transactions across multiple computers',
    analogy: 'Like a notebook that everyone has a copy of, and everyone can see when something is written in it',
    level: 7,
    category: 'technology'
  },
  robo_advisor: {
    term: 'Robo-Advisor',
    definition: 'Automated platforms that provide investment advice with minimal human intervention',
    analogy: 'Like having a smart app that manages your investments for you',
    level: 7,
    category: 'technology'
  },
  esg_investing: {
    term: 'ESG Investing',
    definition: 'Environmental, Social, and Governance factors considered in investment decisions',
    analogy: 'Like choosing to shop at stores that treat workers well and protect the environment',
    level: 7,
    category: 'basics'
  },
  fintech: {
    term: 'FinTech',
    definition: 'Technology companies that provide financial services and innovations',
    analogy: 'Like apps that make banking and investing as easy as ordering food on your phone',
    level: 7,
    category: 'technology'
  },
  digital_currency: {
    term: 'Digital Currency',
    definition: 'Electronic forms of money that exist only in digital form',
    analogy: 'Like having money that lives only on computers instead of physical coins and bills',
    level: 7,
    category: 'technology'
  }
};

// Combine all terms
const allTerms = {
  ...level1Terms,
  ...level2Terms,
  ...level3Terms,
  ...level4Terms,
  ...level5Terms,
  ...level6Terms,
  ...level7Terms
};

export const getIBTermsForLevel = (level: string | number): Record<string, IBTerm> => {
  const levelNum = typeof level === 'string' ? parseInt(level) : level;
  
  switch (levelNum) {
    case 1:
      return level1Terms;
    case 2:
      return { ...level1Terms, ...level2Terms };
    case 3:
      return { ...level1Terms, ...level2Terms, ...level3Terms };
    case 4:
      return { ...level1Terms, ...level2Terms, ...level3Terms, ...level4Terms };
    case 5:
      return { ...level1Terms, ...level2Terms, ...level3Terms, ...level4Terms, ...level5Terms };
    case 6:
      return { ...level1Terms, ...level2Terms, ...level3Terms, ...level4Terms, ...level5Terms, ...level6Terms };
    case 7:
      return allTerms;
    default:
      // For backward compatibility with old beginner/intermediate/advanced system
      if (level === 'beginner') return level1Terms;
      if (level === 'intermediate') return { ...level1Terms, ...level2Terms, ...level3Terms };
      if (level === 'advanced') return allTerms;
      return level1Terms;
  }
};

export { allTerms };