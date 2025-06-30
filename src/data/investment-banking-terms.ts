export interface IBTerm {
  term: string;
  definition: string;
  analogy: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'basics' | 'ib_services' | 'ib_process' | 'ib_documents' | 'ma';
}

const beginnerTerms: Record<string, IBTerm> = {
  investment_bank: {
    term: 'Investment Bank',
    definition: 'A financial institution that helps companies raise money and provides advice on deals',
    analogy: 'Like a real estate agent who helps people buy and sell houses, but for companies',
    level: 'beginner',
    category: 'basics'
  },
  ipo: {
    term: 'IPO',
    definition: 'Initial Public Offering: When a company sells shares to the public for the first time',
    analogy: 'Like a lemonade stand going from neighborhood-only to stores everywhere!',
    level: 'beginner',
    category: 'basics'
  },
  merger: {
    term: 'Merger',
    definition: 'Two companies combining to become one',
    analogy: 'Two friend groups becoming one big group!',
    level: 'beginner',
    category: 'basics'
  },
  stock: {
    term: 'Stock',
    definition: 'A piece of ownership in a company',
    analogy: 'Like owning a slice of pizza!',
    level: 'beginner',
    category: 'basics'
  },
  client: {
    term: 'Client',
    definition: 'Company asking for investment banking help',
    analogy: 'A friend asking for important advice!',
    level: 'beginner',
    category: 'basics'
  }
};

const intermediateTerms: Record<string, IBTerm> = {
  financial_modeling: {
    term: 'Financial Modeling',
    definition: 'Creating a mathematical representation of a company\'s financial performance',
    analogy: 'Like building a virtual version of a company to predict its future',
    level: 'intermediate',
    category: 'basics'
  },
  due_diligence: {
    term: 'Due Diligence',
    definition: 'Thorough investigation and analysis of a company before a deal',
    analogy: 'Like a detective investigating a crime scene to find all the clues',
    level: 'intermediate',
    category: 'basics'
  },
  valuation: {
    term: 'Valuation',
    definition: 'Determining the economic worth of a company or asset',
    analogy: 'Like getting your house appraised to find out its market value',
    level: 'intermediate',
    category: 'basics'
  },
  deal_structuring: {
    term: 'Deal Structuring',
    definition: 'Designing the terms and conditions of a financial transaction',
    analogy: 'Like creating the blueprint for a building, outlining all the details',
    level: 'intermediate',
    category: 'basics'
  },
  risk_management: {
    term: 'Risk Management',
    definition: 'Identifying, assessing, and mitigating potential risks in financial activities',
    analogy: 'Like having insurance to protect against unexpected events',
    level: 'intermediate',
    category: 'basics'
  },
  underwriting: {
    term: 'Underwriting',
    definition: 'When investment banks buy securities from companies and sell them to investors, taking on the risk',
    analogy: 'Like a store buying products from manufacturers to sell to customers - the store takes the risk that customers will buy',
    level: 'intermediate',
    category: 'ib_services'
  },
  syndicate: {
    term: 'Syndicate',
    definition: 'A group of investment banks working together on a large deal to share risk and expertise',
    analogy: 'Like a team of friends pooling money to buy something expensive together - everyone shares the cost and risk',
    level: 'intermediate',
    category: 'ib_process'
  },
  prospectus: {
    term: 'Prospectus',
    definition: 'A detailed document describing a company and its stock offering for potential investors',
    analogy: 'Like a detailed product manual that tells you everything about what you\'re buying before you buy it',
    level: 'intermediate',
    category: 'ib_documents'
  },
  pitch_book: {
    term: 'Pitch Book',
    definition: 'A presentation investment bankers create to pitch their services to potential clients',
    analogy: 'Like a portfolio showing your best work when applying for a job - it showcases what you can do',
    level: 'intermediate',
    category: 'ib_documents'
  },
  mandates: {
    term: 'Mandates',
    definition: 'When a company officially hires an investment bank to work on a specific deal or project',
    analogy: 'Like hiring a contractor for a home renovation - you give them official permission to do the work',
    level: 'intermediate',
    category: 'ib_process'
  },
  merger: {
    term: 'Merger',
    definition: 'When two companies combine to form one new company, usually as equals',
    analogy: 'Like two friend groups deciding to become one bigger friend group with a new name',
    level: 'intermediate',
    category: 'ma'
  },
  acquisition: {
    term: 'Acquisition',
    definition: 'When one company buys another company, with the target company becoming part of the buyer',
    analogy: 'Like a big fish eating a smaller fish - the smaller one becomes part of the bigger one',
    level: 'intermediate',
    category: 'ma'
  },
  hostile_takeover: {
    term: 'Hostile Takeover',
    definition: 'When one company tries to buy another company even though the target doesn\'t want to be bought',
    analogy: 'Like trying to buy someone\'s house even though they don\'t want to sell it',
    level: 'intermediate',
    category: 'ma'
  },
  synergies: {
    term: 'Synergies',
    definition: 'Benefits created when two companies work together that wouldn\'t exist if they operated separately',
    analogy: 'Like when two musicians play together and create better music than either could make alone',
    level: 'intermediate',
    category: 'ma'
  }
};

const advancedTerms: Record<string, IBTerm> = {
  derivative: {
    term: 'Derivative',
    definition: 'A financial contract whose value is derived from an underlying asset',
    analogy: 'Like a ticket to a sports game - its value depends on the game itself',
    level: 'advanced',
    category: 'basics'
  },
  arbitrage: {
    term: 'Arbitrage',
    definition: 'Profiting from price differences of the same asset in different markets',
    analogy: 'Like buying a product cheap in one store and selling it for more in another',
    level: 'advanced',
    category: 'basics'
  },
  leverage: {
    term: 'Leverage',
    definition: 'Using borrowed capital to increase the potential return of an investment',
    analogy: 'Like using a seesaw to lift a heavy object with less effort',
    level: 'advanced',
    category: 'basics'
  },
  quantitative_analysis: {
    term: 'Quantitative Analysis',
    definition: 'Using mathematical and statistical methods to analyze financial data',
    analogy: 'Like using a scientific formula to solve a complex problem',
    level: 'advanced',
    category: 'basics'
  },
   restructuring: {
    term: 'Restructuring',
    definition: 'Reorganizing a company\'s debts and operations to improve its financial stability',
    analogy: 'Like renovating a house to make it more functional and valuable',
    level: 'advanced',
    category: 'basics'
  },
  LBO: {
    term: 'LBO',
    definition: 'Leveraged Buyout: Acquisition of a company using a significant amount of borrowed money',
    analogy: 'Like buying a house with a large mortgage',
    level: 'advanced',
    category: 'basics'
  },
  discounted_cash_flow: {
    term: 'Discounted Cash Flow',
    definition: 'A valuation method that estimates the value of an investment based on its expected future cash flows',
    analogy: 'Like predicting how much money a tree will generate in apples over its lifetime to determine its worth',
    level: 'advanced',
    category: 'basics'
  },
  capital_structure: {
    term: 'Capital Structure',
    definition: 'The way a company finances its assets through a combination of debt and equity',
    analogy: 'Like the foundation and frame of a building, which supports the entire structure',
    level: 'advanced',
    category: 'basics'
  },
  derivatives: {
    term: 'Derivatives',
    definition: 'Financial contracts whose value is derived from an underlying asset (e.g., options, futures)',
    analogy: 'Like betting on the outcome of a sports game - the value of your bet depends on the game\'s result',
    level: 'advanced',
    category: 'basics'
  },
  alternative_investments: {
    term: 'Alternative Investments',
    definition: 'Investments outside traditional assets like stocks and bonds (e.g., hedge funds, private equity)',
    analogy: 'Like exploring uncharted territory instead of sticking to well-known paths',
    level: 'advanced',
    category: 'basics'
  },
  financial_engineering: {
    term: 'Financial Engineering',
    definition: 'Using mathematical tools and computer science to solve financial problems',
    analogy: 'Like building a bridge using engineering principles to cross a gap',
    level: 'advanced',
    category: 'basics'
  },
  structured_products: {
    term: 'Structured Products',
    definition: 'Pre-packaged investments that combine different assets to meet specific risk/return objectives',
    analogy: 'Like a custom-built car designed for a specific purpose',
    level: 'advanced',
    category: 'basics'
  },
  quantitative_trading: {
    term: 'Quantitative Trading',
    definition: 'Using algorithms and statistical models to automate trading decisions',
    analogy: 'Like a self-driving car that makes decisions based on data',
    level: 'advanced',
    category: 'basics'
  },
  high_frequency_trading: {
    term: 'High-Frequency Trading',
    definition: 'Using powerful computers to execute a large number of orders at very high speeds',
    analogy: 'Like a super-fast assembly line that produces products in milliseconds',
    level: 'advanced',
    category: 'basics'
  },
  algorithmic_trading: {
    term: 'Algorithmic Trading',
    definition: 'Using computer programs to automatically execute trades based on pre-set instructions',
    analogy: 'Like setting up a robot to buy and sell stocks for you',
    level: 'advanced',
    category: 'basics'
  },
  credit_default_swap: {
    term: 'Credit Default Swap',
    definition: 'A financial contract that provides insurance against the risk of a company defaulting on its debt',
    analogy: 'Like buying a warranty for your car in case it breaks down',
    level: 'advanced',
    category: 'basics'
  }
};

export const getIBTermsForLevel = (level: string): Record<string, IBTerm> => {
  switch (level) {
    case 'beginner':
      return beginnerTerms;
    case 'intermediate':
      return { ...beginnerTerms, ...intermediateTerms };
    case 'advanced':
      return { ...beginnerTerms, ...intermediateTerms, ...advancedTerms };
    default:
      return beginnerTerms;
  }
};
