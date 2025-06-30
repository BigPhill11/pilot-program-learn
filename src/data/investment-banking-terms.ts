
export const investmentBankingTerms = {
  beginner: {
    'ipo': {
      definition: 'Initial Public Offering - when a private company sells shares to the public for the first time',
      analogy: 'Think of it like a lemonade stand going from just your neighborhood to being sold in every store in the city!'
    },
    'merger': {
      definition: 'When two companies combine to become one bigger company',
      analogy: 'Like two friend groups deciding to become one big friend group!'
    },
    'acquisition': {
      definition: 'When one company buys another company',
      analogy: 'Like when your favorite game company buys another game studio to make more games!'
    },
    'stock': {
      definition: 'A tiny piece of ownership in a company that you can buy and sell',
      analogy: 'Like owning a slice of pizza - the more slices you have, the more pizza you own!'
    },
    'valuation': {
      definition: 'How much a company is worth in total',
      analogy: 'Like figuring out how much your entire Pokemon card collection is worth!'
    },
    'client': {
      definition: 'The company that asks investment bankers for help with their business',
      analogy: 'Like a customer who comes to you for advice on something important!'
    },
    'deal': {
      definition: 'A business transaction that investment bankers help make happen',
      analogy: 'Like helping two people trade their lunch items, but for companies!'
    },
    'pitch': {
      definition: 'A presentation to convince a company to work with your bank',
      analogy: 'Like presenting your science project to win first place at the science fair!'
    }
  },
  intermediate: {
    'ipo': {
      definition: 'Initial Public Offering - the process of offering shares of a private corporation to the public',
      analogy: 'Like a popular local restaurant franchise deciding to sell ownership stakes to investors nationwide'
    },
    'merger': {
      definition: 'A combination of two companies where they agree to go forward as a single new entity',
      analogy: 'Like two successful bands combining their talents and fan bases to create a supergroup'
    },
    'acquisition': {
      definition: 'A corporate action where one company purchases most or all of another company to assume control',
      analogy: 'Like a successful streaming service buying a movie studio to control its content library'
    },
    'due_diligence': {
      definition: 'The investigation or audit of a potential investment or product to confirm facts',
      analogy: 'Like thoroughly researching a used car before buying - checking the engine, history, and value'
    },
    'synergy': {
      definition: 'The additional value created when two companies combine that exceeds their individual worth',
      analogy: 'Like a peanut butter and jelly sandwich being worth more than separate peanut butter and jelly'
    },
    'underwriting': {
      definition: 'The process by which investment bankers raise investment capital for companies',
      analogy: 'Like being a matchmaker between companies that need money and investors who have money'
    },
    'roadshow': {
      definition: 'A series of presentations to potential investors before a public offering',
      analogy: 'Like a band going on tour to promote their new album before it releases'
    },
    'book_building': {
      definition: 'The process of generating and recording investor demand for shares during an IPO',
      analogy: 'Like taking pre-orders for a new video game to see how many copies to produce'
    }
  },
  advanced: {
    'leveraged_buyout': {
      definition: 'Acquisition of a company using significant amounts of borrowed money to meet the cost of acquisition',
      analogy: 'Like buying a rental property with mostly borrowed money, using the rental income to pay back the loan'
    },
    'dcf_model': {
      definition: 'Discounted Cash Flow - valuation method using projected future cash flows discounted to present value',
      analogy: 'Like calculating what a fruit tree is worth today based on all the fruit it will produce over its lifetime'
    },
    'accretion_dilution': {
      definition: 'Analysis of whether an acquisition will increase or decrease the acquirer\'s earnings per share',
      analogy: 'Like calculating if adding a new player to your fantasy team will improve or hurt your overall score'
    },
    'fairness_opinion': {
      definition: 'Professional assessment of whether the terms of a M&A transaction are fair from a financial perspective',
      analogy: 'Like getting an independent appraisal to confirm you\'re paying a fair price for a house'
    },
    'proxy_statement': {
      definition: 'Document filed with SEC containing information shareholders need to make informed voting decisions',
      analogy: 'Like a detailed voter guide that explains all the candidates and issues before an election'
    },
    'poison_pill': {
      definition: 'Defense strategy used by companies to prevent hostile takeovers',
      analogy: 'Like a security system that makes your house unattractive to burglars by triggering alarms'
    },
    'comfort_letter': {
      definition: 'Letter from auditors to underwriters providing assurance about financial information in securities offerings',
      analogy: 'Like a mechanic\'s certification that a used car is in good condition before you sell it'
    },
    'greenshoe_option': {
      definition: 'Over-allotment option allowing underwriters to sell additional shares in hot IPOs',
      analogy: 'Like a restaurant being able to add extra tables when there\'s unexpectedly high demand'
    }
  }
};

export const getIBTermsForLevel = (level: string) => {
  switch (level) {
    case 'beginner': return { ...investmentBankingTerms.beginner };
    case 'intermediate': return { ...investmentBankingTerms.beginner, ...investmentBankingTerms.intermediate };
    case 'advanced': return { ...investmentBankingTerms.intermediate, ...investmentBankingTerms.advanced };
    default: return investmentBankingTerms.beginner;
  }
};
