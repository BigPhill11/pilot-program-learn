
export const investmentBankingTerms = {
  beginner: {
    'ipo': {
      definition: 'Initial Public Offering - when a private company sells shares to the public for the first time to raise money',
      analogy: 'Think of it like a lemonade stand that was only in your neighborhood deciding to sell bottles in every grocery store in the city! The owners sell pieces of their business to lots of people to get money to grow bigger.'
    },
    'merger': {
      definition: 'When two companies combine to become one bigger, stronger company',
      analogy: 'Like when two friend groups decide to become one big friend group because they can do more fun activities together and share their toys and games!'
    },
    'acquisition': {
      definition: 'When one company buys another company to own it completely',
      analogy: 'Like when your favorite video game company buys another game studio so they can make even more awesome games together!'
    },
    'stock': {
      definition: 'A tiny piece of ownership in a company that you can buy and sell, like owning a slice of pizza',
      analogy: 'Imagine a company is like a giant pizza cut into millions of slices. Each slice is a stock - the more slices you own, the bigger piece of the pizza company you have!'
    },
    'valuation': {
      definition: 'How much a company is worth in total if you added up all its value',
      analogy: 'Like figuring out how much your entire Pokemon card collection is worth by adding up the value of every single card!'
    },
    'client': {
      definition: 'The company that asks investment bankers for help with their business decisions',
      analogy: 'Like a friend who comes to you for advice on something really important, except companies ask banks for help with money decisions!'
    },
    'deal': {
      definition: 'A business transaction or agreement that investment bankers help companies make',
      analogy: 'Like helping two people trade their lunch items, but instead it\'s helping companies trade or combine their businesses!'
    },
    'pitch': {
      definition: 'A presentation to convince a company to work with your investment bank',
      analogy: 'Like presenting your awesome science project to win first place at the science fair - you show why your idea is the best!'
    },
    'investment_bank': {
      definition: 'A special type of bank that helps companies with big financial decisions like going public or buying other companies',
      analogy: 'Like a super smart advisor who helps companies make really big money decisions, kind of like how a coach helps athletes win games!'
    },
    'shares': {
      definition: 'Pieces of a company that people can buy to own part of that business',
      analogy: 'Like if you and your friends all chipped in money to buy a really expensive video game, and each person owns a piece of it based on how much they paid!'
    }
  },
  intermediate: {
    'ipo': {
      definition: 'Initial Public Offering - the process by which a private corporation offers shares to the public for the first time',
      analogy: 'Like a popular local restaurant chain deciding to sell ownership stakes to investors nationwide so they can expand to every major city'
    },
    'merger': {
      definition: 'A combination of two companies where they agree to go forward as a single new entity with shared ownership',
      analogy: 'Like two successful bands combining their talents, fan bases, and resources to create a supergroup that\'s stronger than either band alone'
    },
    'acquisition': {
      definition: 'A corporate action where one company purchases most or all of another company\'s shares to assume control',
      analogy: 'Like a successful streaming service buying a movie studio to control its entire content library and production capabilities'
    },
    'due_diligence': {
      definition: 'The comprehensive investigation and audit of a potential investment to confirm all facts and assess risks',
      analogy: 'Like thoroughly researching a used car before buying - checking the engine, accident history, maintenance records, and comparing prices'
    },
    'synergy': {
      definition: 'The additional value created when two companies combine that exceeds their individual worth',
      analogy: 'Like a peanut butter and jelly sandwich being worth more than separate peanut butter and jelly - together they create something better'
    },
    'underwriting': {
      definition: 'The process by which investment bankers help companies raise capital by guaranteeing the sale of securities',
      analogy: 'Like being a matchmaker between companies that need money and investors who have money, while also promising to buy any leftover shares'
    },
    'roadshow': {
      definition: 'A series of presentations made by company executives to potential investors before a public offering',
      analogy: 'Like a band going on tour to promote their new album before it releases, except executives visit investors to promote their company'
    },
    'book_building': {
      definition: 'The process of generating and recording investor demand for shares during an IPO to determine the final offering price',
      analogy: 'Like taking pre-orders for a new video game to see how many copies to produce and what price people are willing to pay'
    }
  },
  advanced: {
    'leveraged_buyout': {
      definition: 'Acquisition of a company using significant amounts of borrowed money, with the acquired company\'s assets serving as collateral',
      analogy: 'Like buying a rental property with mostly borrowed money, then using the rental income to pay back the loan while building equity'
    },
    'dcf_model': {
      definition: 'Discounted Cash Flow - a valuation method using projected future cash flows discounted to present value',
      analogy: 'Like calculating what a fruit tree is worth today based on all the fruit it will produce over its lifetime, adjusted for the fact that future fruit is worth less than fruit today'
    },
    'accretion_dilution': {
      definition: 'Analysis of whether an acquisition will increase (accretive) or decrease (dilutive) the acquirer\'s earnings per share',
      analogy: 'Like calculating if adding a new player to your fantasy team will improve or hurt your overall team score and ranking'
    },
    'fairness_opinion': {
      definition: 'Professional assessment by an investment bank of whether the terms of an M&A transaction are fair from a financial perspective',
      analogy: 'Like getting an independent home appraisal to confirm you\'re paying a fair market price when buying a house'
    },
    'proxy_statement': {
      definition: 'Document filed with SEC containing information shareholders need to make informed voting decisions on corporate matters',
      analogy: 'Like a detailed voter guide that explains all the candidates and ballot issues before an important election'
    },
    'poison_pill': {
      definition: 'Defensive strategy used by companies to prevent hostile takeovers by making the acquisition prohibitively expensive',
      analogy: 'Like a high-tech security system that makes your house very unattractive to burglars by triggering expensive alarms and complications'
    },
    'comfort_letter': {
      definition: 'Letter from auditors to underwriters providing assurance about financial information in securities offerings',
      analogy: 'Like a mechanic\'s certification that a used car is in excellent condition before you sell it to give buyers confidence'
    },
    'greenshoe_option': {
      definition: 'Over-allotment option allowing underwriters to sell additional shares (typically 15%) if demand exceeds expectations',
      analogy: 'Like a popular restaurant being able to add extra tables and extend hours when there\'s unexpectedly high customer demand'
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
