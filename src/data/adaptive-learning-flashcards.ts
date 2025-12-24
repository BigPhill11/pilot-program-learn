export interface AdaptiveFlashcard {
  id: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  level: 'beginner' | 'intermediate' | 'pro';
  category: string;
  masteryLevel?: 'new' | 'unsure' | 'learning' | 'mastered';
  timesShown?: number;
  lastShown?: string;
}

// Beginner Level - 15 Terms
export const beginnerFlashcards: AdaptiveFlashcard[] = [
  {
    id: 'beginner-1',
    term: 'Stock',
    definition: 'A share of ownership in a company',
    philExample: 'Like owning a slice of pizza from the whole pizza! The more slices you have, the bigger your share of the pizza (company).',
    realWorldExample: 'If you buy Apple stock, you own a tiny piece of Apple Inc. and can benefit from their success.',
    level: 'beginner',
    category: 'investing'
  },
  {
    id: 'beginner-2',
    term: 'Bond',
    definition: 'A loan to a company or government that pays interest',
    philExample: "It's like lending money to your friend, but they promise to pay you back with a little extra for being so nice!",
    realWorldExample: 'US Treasury bonds are loans to the government that pay you interest over time.',
    level: 'beginner',
    category: 'investing'
  },
  {
    id: 'beginner-3',
    term: 'Dividend',
    definition: 'Payment made by companies to shareholders',
    philExample: 'Like getting a thank-you gift from a company for believing in them and buying their stock!',
    realWorldExample: 'Coca-Cola pays quarterly dividends to shareholders, sharing their profits.',
    level: 'beginner',
    category: 'investing'
  },
  {
    id: 'beginner-4',
    term: 'Investment Bank',
    definition: 'A financial institution that helps companies raise money and provides advice on deals',
    philExample: 'Like a real estate agent who helps people buy and sell houses, but for companies!',
    realWorldExample: 'Goldman Sachs is an investment bank that helped companies like Facebook go public.',
    level: 'beginner',
    category: 'banking'
  },
  {
    id: 'beginner-5',
    term: 'IPO',
    definition: 'Initial Public Offering: When a company sells shares to the public for the first time',
    philExample: 'Like a lemonade stand going from neighborhood-only to stores everywhere!',
    realWorldExample: 'When Airbnb had its IPO in 2020, anyone could buy shares of the company.',
    level: 'beginner',
    category: 'banking'
  },
  {
    id: 'beginner-6',
    term: 'Merger',
    definition: 'Two companies combining to become one',
    philExample: 'Two friend groups becoming one big group!',
    realWorldExample: 'Disney merged with Pixar to create more amazing movies together.',
    level: 'beginner',
    category: 'banking'
  },
  {
    id: 'beginner-7',
    term: 'Capital',
    definition: 'Money used to start or grow a business',
    philExample: 'Like seed money to plant and grow a garden!',
    realWorldExample: 'Startups raise capital from investors to build their products and hire employees.',
    level: 'beginner',
    category: 'banking'
  },
  {
    id: 'beginner-8',
    term: 'Phishing',
    definition: 'Fake emails or messages that trick you into giving personal information',
    philExample: "Like someone pretending to be your friend to get your lunch money!",
    realWorldExample: 'Scammers send emails that look like your bank asking for your password.',
    level: 'beginner',
    category: 'safety'
  },
  {
    id: 'beginner-9',
    term: 'Two-Factor Authentication',
    definition: 'Extra security requiring two verification methods to log in',
    philExample: 'Like needing both a key and a secret code to open a treasure chest!',
    realWorldExample: 'Your bank sends a text code after you enter your password for extra security.',
    level: 'beginner',
    category: 'safety'
  },
  {
    id: 'beginner-10',
    term: 'Insurance Premium',
    definition: 'The amount you pay monthly or yearly for insurance coverage',
    philExample: 'Like a membership fee to be part of a safety club!',
    realWorldExample: 'You pay a car insurance premium every month to be protected if you get in an accident.',
    level: 'beginner',
    category: 'personal-finance'
  },
  {
    id: 'beginner-11',
    term: 'Deductible',
    definition: 'Amount you pay before insurance covers the rest',
    philExample: "Like having to pay the first $5 of a video game before your parents cover the rest!",
    realWorldExample: 'If your deductible is $500, you pay the first $500 of medical bills before insurance kicks in.',
    level: 'beginner',
    category: 'personal-finance'
  },
  {
    id: 'beginner-12',
    term: 'Emergency Fund',
    definition: 'Money saved for unexpected expenses or emergencies',
    philExample: 'Like keeping extra snacks in your backpack for when you get hungry!',
    realWorldExample: 'Financial experts recommend saving 3-6 months of expenses in an emergency fund.',
    level: 'beginner',
    category: 'personal-finance'
  },
  {
    id: 'beginner-13',
    term: 'Budget',
    definition: 'A plan for how to spend and save your money',
    philExample: 'Like planning how to spend your allowance on games, snacks, and savings!',
    realWorldExample: 'Creating a monthly budget helps you track where your money goes.',
    level: 'beginner',
    category: 'personal-finance'
  },
  {
    id: 'beginner-14',
    term: 'Compound Interest',
    definition: 'Interest earned on both the principal amount and previous interest',
    philExample: 'Like a snowball rolling downhill - it gets bigger and bigger as it picks up more snow!',
    realWorldExample: 'If you invest $1,000 at 8% compound interest, you earn interest on your interest each year.',
    level: 'beginner',
    category: 'personal-finance'
  },
  {
    id: 'beginner-15',
    term: 'Credit Score',
    definition: 'A number that shows how reliable you are at paying back money',
    philExample: 'Like a report card for how responsible you are with borrowing money!',
    realWorldExample: 'A good credit score (700+) helps you get better rates on loans and credit cards.',
    level: 'beginner',
    category: 'personal-finance'
  }
];

// Intermediate Level - 15 Terms
export const intermediateFlashcards: AdaptiveFlashcard[] = [
  {
    id: 'intermediate-1',
    term: 'Underwriting',
    definition: 'When investment banks buy securities from companies and sell them to investors',
    philExample: 'Like a store buying products from manufacturers to sell to customers - the store takes the risk!',
    realWorldExample: 'Investment banks underwrote Spotify\'s IPO, buying shares to resell to investors.',
    level: 'intermediate',
    category: 'banking'
  },
  {
    id: 'intermediate-2',
    term: 'Due Diligence',
    definition: 'Thorough investigation of a company before a deal',
    philExample: 'Like a detective investigating a crime scene to find all the clues!',
    realWorldExample: 'Before acquiring WhatsApp, Facebook did due diligence on user data and technology.',
    level: 'intermediate',
    category: 'banking'
  },
  {
    id: 'intermediate-3',
    term: 'Pitch Book',
    definition: 'A presentation to pitch investment banking services to clients',
    philExample: 'Like a portfolio showing your best work when applying for a job!',
    realWorldExample: 'Investment banks create pitch books with analysis and recommendations for potential clients.',
    level: 'intermediate',
    category: 'banking'
  },
  {
    id: 'intermediate-4',
    term: 'Acquisition',
    definition: 'When one company buys another company',
    philExample: 'Like a big fish eating a smaller fish - the smaller one becomes part of the bigger one!',
    realWorldExample: 'Microsoft acquired LinkedIn for $26.2 billion in 2016.',
    level: 'intermediate',
    category: 'banking'
  },
  {
    id: 'intermediate-5',
    term: 'Synergies',
    definition: 'Benefits created when two companies work together',
    philExample: 'Like when two musicians play together and create better music than either could alone!',
    realWorldExample: 'When Disney bought Marvel, they created synergies by using Marvel characters in theme parks.',
    level: 'intermediate',
    category: 'banking'
  },
  {
    id: 'intermediate-6',
    term: 'Valuation',
    definition: 'Determining the economic worth of a company',
    philExample: 'Like getting your house appraised to find out its market value!',
    realWorldExample: 'Analysts valued Twitter at $44 billion when Elon Musk bought it.',
    level: 'intermediate',
    category: 'banking'
  },
  {
    id: 'intermediate-7',
    term: 'P/E Ratio',
    definition: 'Price-to-earnings ratio: how much investors pay for each dollar of earnings',
    philExample: "It's like comparing how much you pay for a burger versus how satisfying it is!",
    realWorldExample: 'A P/E ratio of 15 means investors pay $15 for every $1 of annual earnings.',
    level: 'intermediate',
    category: 'investing'
  },
  {
    id: 'intermediate-8',
    term: 'Market Cap',
    definition: 'Total value of a company\'s shares',
    philExample: 'If a company were a house, market cap would be its total asking price!',
    realWorldExample: 'Apple\'s market cap of $3 trillion makes it one of the world\'s most valuable companies.',
    level: 'intermediate',
    category: 'investing'
  },
  {
    id: 'intermediate-9',
    term: 'Volatility',
    definition: 'Measure of how much a stock price varies over time',
    philExample: 'Like a roller coaster - some stocks are gentle rides, others are loop-de-loops!',
    realWorldExample: 'Bitcoin is highly volatile, with prices that can swing 10%+ in a single day.',
    level: 'intermediate',
    category: 'investing'
  },
  {
    id: 'intermediate-10',
    term: 'Asset Allocation',
    definition: 'Deciding how to distribute investments across different asset types',
    philExample: 'Like not putting all your Halloween candy in one basket - spread it out!',
    realWorldExample: 'A balanced portfolio might be 60% stocks, 30% bonds, and 10% cash.',
    level: 'intermediate',
    category: 'investing'
  },
  {
    id: 'intermediate-11',
    term: 'Diversification',
    definition: 'Spreading investments across different assets to reduce risk',
    philExample: 'Like trying different toppings on pizza so you don\'t get bored with just one!',
    realWorldExample: 'Instead of buying just tech stocks, diversify with healthcare, energy, and finance stocks.',
    level: 'intermediate',
    category: 'investing'
  },
  {
    id: 'intermediate-12',
    term: 'APR',
    definition: 'Annual Percentage Rate: the yearly cost of borrowing money',
    philExample: 'Like the total price tag on borrowing money for a whole year!',
    realWorldExample: 'A credit card with 20% APR means you pay $200 in interest on a $1,000 balance over a year.',
    level: 'intermediate',
    category: 'personal-finance'
  },
  {
    id: 'intermediate-13',
    term: '401(k)',
    definition: 'An employer-sponsored retirement savings plan',
    philExample: 'Like a piggy bank your employer helps you fill up for when you\'re older!',
    realWorldExample: 'Many companies match your 401(k) contributions up to 6% of your salary.',
    level: 'intermediate',
    category: 'personal-finance'
  },
  {
    id: 'intermediate-14',
    term: 'Roth IRA',
    definition: 'A retirement account where you pay taxes now but withdrawals are tax-free later',
    philExample: 'Like paying for a movie ticket now so you can watch unlimited movies later for free!',
    realWorldExample: 'You can contribute up to $6,500/year to a Roth IRA and all growth is tax-free.',
    level: 'intermediate',
    category: 'personal-finance'
  },
  {
    id: 'intermediate-15',
    term: 'Index Fund',
    definition: 'A fund that tracks a market index like the S&P 500',
    philExample: 'Like buying a sampler platter instead of ordering just one dish!',
    realWorldExample: 'An S&P 500 index fund owns a piece of all 500 largest US companies.',
    level: 'intermediate',
    category: 'investing'
  }
];

// Pro Level - 15 Terms
export const proFlashcards: AdaptiveFlashcard[] = [
  {
    id: 'pro-1',
    term: 'DCF Model',
    definition: 'Discounted Cash Flow: values a company by projecting future cash flows',
    philExample: 'Like calculating how much future allowance money is worth today!',
    realWorldExample: 'Analysts use DCF models to value companies like Tesla by forecasting cash flows.',
    level: 'pro',
    category: 'valuation'
  },
  {
    id: 'pro-2',
    term: 'Comparable Companies',
    definition: 'Valuation method comparing a company to similar public companies',
    philExample: 'Like comparing house prices in the same neighborhood to estimate value!',
    realWorldExample: 'Valuing a tech startup by comparing it to similar companies like Zoom or Slack.',
    level: 'pro',
    category: 'valuation'
  },
  {
    id: 'pro-3',
    term: 'LBO Model',
    definition: 'Leveraged Buyout: acquiring a company using significant debt',
    philExample: 'Like buying a rental property with a big mortgage and using rent to pay it off!',
    realWorldExample: 'Private equity firms used LBOs to acquire companies like Toys R Us.',
    level: 'pro',
    category: 'valuation'
  },
  {
    id: 'pro-4',
    term: 'WACC',
    definition: 'Weighted Average Cost of Capital: average rate to finance assets',
    philExample: 'Like the average interest rate across all your credit cards and loans!',
    realWorldExample: 'A company with 8% WACC needs investments to return more than 8% to create value.',
    level: 'pro',
    category: 'finance'
  },
  {
    id: 'pro-5',
    term: 'Beta Coefficient',
    definition: 'Measures how much a stock moves relative to the market',
    philExample: 'Like measuring how much a surfer moves compared to ocean waves!',
    realWorldExample: 'A beta of 1.5 means the stock typically moves 50% more than the overall market.',
    level: 'pro',
    category: 'investing'
  },
  {
    id: 'pro-6',
    term: 'EBITDA',
    definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization',
    philExample: 'Like measuring lemonade stand profit before paying for the stand and permits!',
    realWorldExample: 'Tech companies focus on EBITDA to show operational profitability.',
    level: 'pro',
    category: 'finance'
  },
  {
    id: 'pro-7',
    term: 'Free Cash Flow',
    definition: 'Cash generated after capital expenditures',
    philExample: 'Money left in your piggy bank after buying everything to run your business!',
    realWorldExample: 'Amazon\'s free cash flow shows cash generated after investing in warehouses.',
    level: 'pro',
    category: 'finance'
  },
  {
    id: 'pro-8',
    term: 'IRR',
    definition: 'Internal Rate of Return: annual growth rate an investment generates',
    philExample: 'Like the interest rate your savings would need to match investment returns!',
    realWorldExample: 'Private equity firms target 20%+ IRR on investments.',
    level: 'pro',
    category: 'finance'
  },
  {
    id: 'pro-9',
    term: 'NPV',
    definition: 'Net Present Value: value of future cash flows minus initial investment',
    philExample: 'Like calculating if a lemonade stand is worth starting after setup costs!',
    realWorldExample: 'Positive NPV means a project creates more value than it costs.',
    level: 'pro',
    category: 'finance'
  },
  {
    id: 'pro-10',
    term: 'Terminal Value',
    definition: 'Company value beyond the explicit forecast period',
    philExample: 'Like estimating how much a tree will be worth when fully grown!',
    realWorldExample: 'Terminal value often represents 60-80% of total DCF valuation.',
    level: 'pro',
    category: 'valuation'
  },
  {
    id: 'pro-11',
    term: 'ESG Investing',
    definition: 'Environmental, Social, and Governance factors in investment decisions',
    philExample: 'Like choosing stores that treat workers well and protect the environment!',
    realWorldExample: 'ESG funds avoid companies with poor environmental records or labor practices.',
    level: 'pro',
    category: 'investing'
  },
  {
    id: 'pro-12',
    term: 'FinTech Disruption',
    definition: 'Technology companies changing traditional financial services',
    philExample: 'Like how streaming services changed how we watch movies!',
    realWorldExample: 'Companies like Robinhood disrupted traditional stock brokerages with no-fee trading.',
    level: 'pro',
    category: 'technology'
  },
  {
    id: 'pro-13',
    term: 'Blockchain Finance',
    definition: 'Using distributed ledger technology for financial transactions',
    philExample: 'Like a public ledger everyone can see but no one can cheat!',
    realWorldExample: 'Banks use blockchain for faster international payments and settlements.',
    level: 'pro',
    category: 'technology'
  },
  {
    id: 'pro-14',
    term: 'RegTech',
    definition: 'Technology for regulatory compliance',
    philExample: 'Like a smart assistant that automatically files your taxes correctly!',
    realWorldExample: 'Banks use RegTech to automate anti-money laundering checks.',
    level: 'pro',
    category: 'technology'
  },
  {
    id: 'pro-15',
    term: 'Monte Carlo Simulation',
    definition: 'Mathematical technique using random sampling for financial scenarios',
    philExample: 'Like running thousands of coin flips to predict probability outcomes!',
    realWorldExample: 'Portfolio managers use Monte Carlo to model risk across different market scenarios.',
    level: 'pro',
    category: 'valuation'
  }
];

export const getAllFlashcards = (): AdaptiveFlashcard[] => {
  return [...beginnerFlashcards, ...intermediateFlashcards, ...proFlashcards];
};

export const getFlashcardsByLevel = (level: 'beginner' | 'intermediate' | 'pro'): AdaptiveFlashcard[] => {
  switch (level) {
    case 'beginner':
      return beginnerFlashcards;
    case 'intermediate':
      return intermediateFlashcards;
    case 'pro':
      return proFlashcards;
    default:
      return beginnerFlashcards;
  }
};
