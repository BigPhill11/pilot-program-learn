export const hedgeFundJourneyData = [
  {
    id: 1,
    title: "What Are Hedge Funds?",
    description: "Learn the basics of hedge funds and why they matter in finance",
    overview: "Hedge funds are private investment funds that pool money from wealthy investors and institutions to pursue a wide range of investment strategies. Unlike mutual funds, hedge funds face fewer regulations, which allows them to take bigger risks. They aim to generate high returns by using tools like short selling, leverage, and derivatives. Because of their complexity, they usually require high minimum investments, making them inaccessible to everyday investors. Hedge funds are known for being both highly secretive and highly influential in financial markets. This level introduces what hedge funds are and why they matter in corporate finance.",
    philsAnalogy: "Think of hedge funds like an exclusive private poker game in a penthouse. Only the super wealthy can afford the buy-in (minimum investment), and once you're in, the players use advanced strategies and take bigger risks than a regular casino. The game has fewer rules than public gambling, so players can make side bets, borrow chips, and use complex plays that regular people aren't allowed to do. Just like how these high-stakes poker games can make or lose millions in one night, hedge funds can generate huge profits or devastating losses using strategies that regular investors can't access.",
    flashcards: [
      {
        term: "Hedge Fund",
        definition: "A hedge fund is a private investment pool that uses aggressive strategies to seek high returns. They are only open to wealthy investors and institutions."
      },
      {
        term: "Accredited Investor", 
        definition: "Accredited investors are people or institutions with enough wealth or income to legally invest in hedge funds. This rule exists to protect smaller investors from high risk."
      },
      {
        term: "Alternative Investment",
        definition: "Hedge funds are considered 'alternative investments' because they don't follow traditional stock-and-bond rules. Other examples include private equity and real estate funds."
      },
      {
        term: "High Risk, High Reward",
        definition: "Hedge funds use strategies that can make huge profits but also big losses. They take on risk in exchange for potentially higher returns than traditional funds."
      },
      {
        term: "Lock-Up Period",
        definition: "Hedge funds often require investors to keep money in the fund for a certain time. This 'lock-up' allows managers to pursue long-term strategies without withdrawals."
      }
    ],
    realLifeExample: "Bridgewater Associates, founded by Ray Dalio, is one of the largest hedge funds in the world. It manages over $100 billion for governments, pension funds, and wealthy individuals. Bridgewater became famous for its 'Pure Alpha' strategy, which bets on global economic trends. This shows how hedge funds pool massive amounts of money and influence financial markets worldwide.",
    miniGames: [
      {
        name: "Fund or Not?",
        description: "Players see descriptions of investment vehicles (mutual fund, hedge fund, savings account) and decide which ones qualify as hedge funds.",
        learningGoal: "Distinguish hedge funds from other types of investments.",
        completionSystem: "Bronze = 2 correct, Silver = 3–4, Gold = all correct."
      },
      {
        name: "Risk Gauge",
        description: "Players rank different investments (hedge fund, savings account, index fund) from least risky to most risky.",
        learningGoal: "Understand the higher risk profile of hedge funds.",
        completionSystem: "Points for correct rankings."
      }
    ],
    quiz: [
      {
        question: "What is a hedge fund?",
        options: [
          "A public investment fund available to all investors",
          "A private investment pool using aggressive strategies for wealthy investors",
          "A government-regulated savings account",
          "A type of bank loan"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "Hedge funds are private investment pools that use aggressive strategies and are only available to wealthy, accredited investors."
      },
      {
        question: "Who is allowed to invest in hedge funds?",
        options: [
          "Anyone with $1,000",
          "Only government employees",
          "Accredited investors and institutions",
          "College students"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrect: "Only accredited investors (wealthy individuals) and institutions can legally invest in hedge funds due to their high risk nature."
      },
      {
        question: "Why are hedge funds considered 'alternative investments'?",
        options: [
          "They only invest in stocks",
          "They follow traditional investment rules",
          "They don't follow traditional stock-and-bond rules",
          "They are run by the government"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrect: "Hedge funds are 'alternative' because they use non-traditional strategies beyond just buying stocks and bonds."
      },
      {
        question: "In Risk Gauge, which type of fund is riskiest?",
        options: [
          "Savings account",
          "Index fund",
          "Hedge fund",
          "Government bonds"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrect: "Hedge funds are the riskiest because they use aggressive strategies, leverage, and complex financial instruments."
      },
      {
        question: "What is the purpose of a lock-up period?",
        options: [
          "To prevent managers from stealing money",
          "To allow managers to pursue long-term strategies without withdrawals",
          "To lock investors out permanently",
          "To comply with government regulations"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "Lock-up periods prevent withdrawals for a set time, allowing managers to execute long-term strategies without liquidity concerns."
      }
    ],
    takeHomeActivity: "Research a famous hedge fund (Bridgewater, Citadel, or Renaissance Technologies). Write 5–6 sentences about who founded it, what it is known for, and why it is successful or controversial."
  },
  {
    id: 2,
    title: "Hedge Fund Strategies",
    description: "Explore the main investment strategies hedge funds use to generate returns",
    overview: "Hedge funds use many different strategies to make money. Some bet that certain stocks will rise, while others bet they will fall. Many use leverage, or borrowed money, to amplify returns, while others use derivatives like options and futures to manage risk. The most common strategies include long/short equity, global macro, event-driven, and arbitrage. Each strategy carries different levels of risk and reward. This level explores the main approaches hedge funds use to earn profits.",
    philsAnalogy: "Think of hedge fund strategies like different ways to make money at a county fair. Some people play ring toss (long/short equity) - they bet some games are rigged and others are fair. Others watch the weather and bet on which food stands will be busy (global macro) - if it's hot, ice cream sells; if it rains, hot chocolate wins. Some people wait for special events like the pie-eating contest to place bets (event-driven), while others buy cotton candy for $3 and immediately sell it to someone for $5 across the fair (arbitrage). Just like at the fair, each strategy requires different skills and has different risks of winning or losing money.",
    flashcards: [
      {
        term: "Long/Short Equity",
        definition: "In this strategy, funds buy stocks expected to rise and short stocks expected to fall. For example, buying Apple stock and shorting a weaker competitor."
      },
      {
        term: "Global Macro",
        definition: "Global macro strategies bet on economic trends like interest rates, currencies, or oil prices. For example, a fund might bet that the U.S. dollar will strengthen."
      },
      {
        term: "Event-Driven",
        definition: "Event-driven strategies invest based on company events like mergers, bankruptcies, or restructurings. For example, buying stock before a merger announcement."
      },
      {
        term: "Arbitrage",
        definition: "Arbitrage takes advantage of price differences between markets. For example, buying a stock in one market while selling it at a higher price in another."
      },
      {
        term: "Leverage",
        definition: "Leverage means borrowing money to increase investment size. It magnifies gains but also magnifies losses."
      }
    ],
    realLifeExample: "In 1992, George Soros's hedge fund famously used a global macro strategy to 'short' the British pound. The fund believed the pound was overvalued and would fall. Soros's bet paid off, earning his fund over $1 billion in profits in a single day. This event earned him the nickname 'the man who broke the Bank of England.'",
    miniGames: [
      {
        name: "Strategy Sorter",
        description: "Players match real-world scenarios with hedge fund strategies (e.g., merger → event-driven, currency bet → global macro).",
        learningGoal: "Connect strategies with examples.",
        completionSystem: "Bronze = 50% correct, Silver = 75%, Gold = 100%."
      },
      {
        name: "Risk/Reward Balance",
        description: "Players select strategies for different client risk levels (conservative vs aggressive).",
        learningGoal: "See how strategies fit different risk profiles.",
        completionSystem: "Points scored for correct matches."
      }
    ],
    quiz: [
      {
        question: "What is the long/short equity strategy?",
        options: [
          "Only buying stocks expected to rise",
          "Only shorting stocks expected to fall", 
          "Buying stocks expected to rise and shorting stocks expected to fall",
          "Avoiding all stock investments"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrect: "Long/short equity involves both buying stocks you think will go up (long) and shorting stocks you think will go down (short)."
      },
      {
        question: "In Strategy Sorter, what strategy fits a merger opportunity?",
        options: [
          "Global macro",
          "Event-driven",
          "Arbitrage",
          "Long/short equity"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "Event-driven strategies focus on company-specific events like mergers, acquisitions, and restructurings."
      },
      {
        question: "What does 'global macro' mean?",
        options: [
          "Investing only in large companies",
          "Betting on worldwide economic trends",
          "Buying stocks in every country",
          "Avoiding international investments"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrected: "Global macro strategies make bets based on broad economic trends like currencies, interest rates, and commodity prices."
      },
      {
        question: "Why does leverage increase risk?",
        options: [
          "It reduces potential profits",
          "It only allows safe investments",
          "It magnifies both gains and losses",
          "It eliminates all investment opportunities"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrect: "Leverage uses borrowed money to increase investment size, which amplifies both potential profits and potential losses."
      },
      {
        question: "In the Soros example, what currency did his fund short?",
        options: [
          "U.S. Dollar",
          "Euro",
          "British Pound",
          "Japanese Yen"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrect: "George Soros famously shorted the British Pound in 1992, earning over $1 billion when it devalued."
      }
    ],
    takeHomeActivity: "Pick one hedge fund strategy (long/short, global macro, event-driven, or arbitrage). Write 5–6 sentences explaining how it works, why it might be profitable, and what risks it carries."
  },
  {
    id: 3,
    title: "Hedge Fund Fees and Investors",
    description: "Understand how hedge funds charge fees and who invests in them",
    overview: "Hedge funds are expensive to invest in. They usually charge '2 and 20' — a 2% fee on total assets under management and 20% of any profits. This means that even if performance is flat, managers still earn millions from fees. Hedge funds mainly attract pension funds, endowments, and wealthy individuals who can handle the high costs and risks. These investors hope that skilled managers will generate returns higher than traditional markets. This level introduces who invests in hedge funds and how the fee structure works.",
    philsAnalogy: "Imagine hiring a personal trainer who charges like a hedge fund. First, they charge you $200 every month just for being your trainer (that's the 2% management fee) - whether you work out or not! Then, if you actually lose 10 pounds, they take $20 for every pound you lost (that's the 20% performance fee). So if you lose 10 pounds, you pay them an extra $200 on top of your monthly fee. Only rich people can afford this expensive trainer, but they're willing to pay because this trainer has helped other wealthy clients get amazing results that regular gym trainers can't achieve.",
    flashcards: [
      {
        term: "'2 and 20' Fees",
        definition: "Hedge funds typically charge 2% of assets plus 20% of profits. For example, a $1B fund earning $100M profit would keep $22M in fees."
      },
      {
        term: "Management Fee",
        definition: "The management fee is the fixed 2% of assets charged annually. It pays for salaries, research, and operations."
      },
      {
        term: "Performance Fee", 
        definition: "The performance fee is usually 20% of profits earned by the fund. It rewards managers for strong performance."
      },
      {
        term: "Institutional Investors",
        definition: "These are large organizations like pension funds, universities, and insurance companies. They invest in hedge funds to diversify portfolios."
      },
      {
        term: "High Net Worth Individuals",
        definition: "Wealthy people with millions in assets can invest directly in hedge funds. This group provides a large portion of hedge fund capital."
      }
    ],
    realLifeExample: "Renaissance Technologies, a hedge fund known for its 'Medallion Fund,' charges extremely high fees — even more than '2 and 20.' Despite this, investors flock to it because the fund has produced some of the best returns in history. This shows how investors will accept high fees if they believe the manager's skill will deliver strong results.",
    miniGames: [
      {
        name: "Fee Calculator",
        description: "Players enter fund size and profits, then calculate how much goes to managers under '2 and 20.'",
        learningGoal: "Understand how hedge fund fees add up.",
        completionSystem: "Bronze = 1 correct, Silver = 2–3, Gold = all correct."
      },
      {
        name: "Investor Match",
        description: "Players match investors (pension fund, wealthy individual, small retail investor) to whether they can invest in hedge funds.",
        learningGoal: "Learn who hedge funds are open to.",
        completionSystem: "Points for correct matches."
      }
    ],
    quiz: [
      {
        question: "What does '2 and 20' mean?",
        options: [
          "2% of profits and 20% of assets",
          "2% of assets and 20% of profits", 
          "2 years minimum investment and 20% return guarantee",
          "2 million minimum and 20 investors maximum"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "'2 and 20' means 2% annual fee on total assets under management plus 20% of any profits the fund generates."
      },
      {
        question: "In Fee Calculator, what fee applies even if the fund makes no profits?",
        options: [
          "Performance fee",
          "Management fee",
          "Success fee",
          "No fee is charged"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "The management fee (2% of assets) is charged annually regardless of fund performance, while performance fees only apply to profits."
      },
      {
        question: "Who are institutional investors?",
        options: [
          "Individual wealthy people",
          "Small retail investors",
          "Large organizations like pension funds and universities",
          "Government employees only"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrect: "Institutional investors are large organizations like pension funds, endowments, and insurance companies that invest on behalf of others."
      },
      {
        question: "Why can't small retail investors usually invest in hedge funds?",
        options: [
          "Hedge funds don't want their money",
          "High minimum investments and accreditation requirements",
          "Retail investors are too smart",
          "Government prevents all retail investment"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "Hedge funds require high minimum investments (often millions) and investors must be 'accredited,' meaning they meet wealth/income requirements."
      },
      {
        question: "In the Renaissance example, why did investors accept higher fees?",
        options: [
          "They had no other choice",
          "The fund delivered exceptional historical returns",
          "The fees were actually lower",
          "Government required high fees"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "Investors were willing to pay high fees because Renaissance Technologies' Medallion Fund generated some of the best returns in hedge fund history."
      }
    ],
    takeHomeActivity: "Imagine you are an investor with $10 million. Would you invest in a hedge fund with '2 and 20' fees? Write 5–6 sentences explaining your decision, including what risks and rewards you would consider."
  }
];