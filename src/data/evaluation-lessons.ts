export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ModuleQuiz {
  questions: QuizQuestion[];
  passingScore: number;
}

export interface InteractiveElement {
  type: 'calculator' | 'comparison' | 'game' | 'analyzer' | 'simulator';
  component: string;
  title: string;
  description: string;
}

export interface CompanyExample {
  companyName: string;
  scenario: string;
  metrics?: Record<string, string | number>;
  outcome: string;
  lesson: string;
}

export interface ContentSection {
  heading: string;
  content: string;
  bulletPoints?: string[];
  analogy?: string;
}

export interface EvaluationModule {
  id: string;
  moduleNumber: string;
  title: string;
  description: string;
  estimatedTime: string;
  objectives: string[];
  content: {
    introduction: string;
    sections: ContentSection[];
    examples: CompanyExample[];
    interactiveElement: InteractiveElement;
  };
  quiz: ModuleQuiz;
  keyTakeaways: string[];
}

export interface EvaluationLesson {
  id: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  estimatedTime: string;
  badge: {
    name: string;
    emoji: string;
    description: string;
  };
  modules: EvaluationModule[];
}

export const evaluationLessons: EvaluationLesson[] = [
  {
    id: 'lesson-1-performance',
    lessonNumber: 1,
    title: 'Reading Company Performance',
    subtitle: 'The Numbers',
    description: 'Learn to read financial metrics like revenue, profit margins, and valuation ratios to understand a company\'s health.',
    icon: 'TrendingUp',
    estimatedTime: '25-30 minutes',
    badge: {
      name: 'Numbers Ninja',
      emoji: '🥷',
      description: 'Master of financial metrics and company performance analysis'
    },
    modules: [
      {
        id: 'module-1-1',
        moduleNumber: '1.1',
        title: 'Revenue & Growth Metrics',
        description: 'Understand what revenue means and why growth matters for investors',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand the difference between revenue and profit',
          'Calculate year-over-year growth rates',
          'Identify healthy vs concerning growth patterns',
          'Learn why investors care about revenue growth'
        ],
        content: {
          introduction: 'Revenue is the total money a company makes from selling its products or services - think of it as the "top line" before any expenses are paid. It\'s like counting all the money coming into a lemonade stand before buying lemons, sugar, and cups.',
          sections: [
            {
              heading: 'Revenue vs Profit: The Lemonade Stand',
              content: 'Imagine you run a lemonade stand. If you sell 100 cups at $2 each, your revenue is $200. But you spent $80 on supplies, so your profit is only $120. Revenue is ALL the money coming in, profit is what\'s left after expenses.',
              analogy: '🍋 Revenue = All sales ($200) | Profit = Sales - Expenses ($120)',
              bulletPoints: [
                'Revenue: Total money from sales (the "top line")',
                'Profit: Money left after paying all costs (the "bottom line")',
                'Companies can have high revenue but low profit if expenses are too high',
                'Both numbers matter, but they tell different stories'
              ]
            },
            {
              heading: 'Why Growth Matters',
              content: 'Investors love growth because it shows the company is expanding and attracting more customers. A company growing 30% per year is doubling in size every 2-3 years!',
              bulletPoints: [
                'Growth shows demand for the company\'s products',
                'Fast growth = more customers = more value',
                'Consistent growth is better than one-time spikes',
                'Compare growth to competitors in the same industry'
              ]
            },
            {
              heading: 'Calculating Year-Over-Year Growth',
              content: 'The formula is simple: ((This Year - Last Year) / Last Year) × 100. If a company made $100M last year and $130M this year, that\'s 30% growth.',
              bulletPoints: [
                'Growth Rate = (New Revenue - Old Revenue) / Old Revenue × 100',
                '10-20% growth is solid for most companies',
                '30%+ growth is exceptional (but check if sustainable)',
                'Negative growth (shrinking) is a red flag'
              ]
            },
            {
              heading: 'Red Flags vs Green Flags',
              content: 'Not all revenue is created equal. Watch for warning signs and positive indicators.',
              bulletPoints: [
                '🚩 RED FLAG: Declining revenue (shrinking)',
                '🚩 RED FLAG: Revenue depends on 1-2 big customers',
                '🚩 RED FLAG: Growth slowing dramatically',
                '✅ GREEN FLAG: Steady, consistent growth',
                '✅ GREEN FLAG: Growth faster than competitors',
                '✅ GREEN FLAG: Diverse revenue sources'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Tesla',
              scenario: 'Tesla\'s revenue grew from $31.5B in 2020 to $81.5B in 2022',
              metrics: {
                '2020 Revenue': '$31.5B',
                '2022 Revenue': '$81.5B',
                'Growth Rate': '159%'
              },
              outcome: 'This massive growth showed Tesla was scaling production and meeting demand',
              lesson: 'Strong revenue growth attracted investors and drove stock price up'
            },
            {
              companyName: 'Netflix',
              scenario: 'Netflix revenue grew steadily at 10-20% annually for years',
              metrics: {
                'Growth Pattern': 'Consistent 10-20%',
                'Revenue Model': 'Subscriptions'
              },
              outcome: 'Consistent growth showed reliable business model',
              lesson: 'Steady growth can be more valuable than erratic spikes'
            }
          ],
          interactiveElement: {
            type: 'calculator',
            component: 'RevenueGrowthCalculator',
            title: 'Revenue Growth Calculator',
            description: 'Practice calculating growth rates with real company examples'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q1-1-1',
              question: 'A company made $50M last year and $65M this year. What\'s the growth rate?',
              options: ['15%', '20%', '30%', '25%'],
              correctAnswer: 2,
              explanation: '($65M - $50M) / $50M = $15M / $50M = 0.30 = 30% growth'
            },
            {
              id: 'q1-1-2',
              question: 'What\'s the difference between revenue and profit?',
              options: [
                'They mean the same thing',
                'Revenue is total sales, profit is what\'s left after expenses',
                'Profit is always higher than revenue',
                'Revenue only counts cash payments'
              ],
              correctAnswer: 1,
              explanation: 'Revenue is the total money coming in from sales, while profit is what remains after paying all expenses.'
            },
            {
              id: 'q1-1-3',
              question: 'Which growth pattern is BEST for a company?',
              options: [
                'Huge spike one year, then negative growth',
                'Declining revenue every year',
                'Steady 15-20% growth year after year',
                'No growth but high profit'
              ],
              correctAnswer: 2,
              explanation: 'Consistent, steady growth shows a healthy, sustainable business model that investors can rely on.'
            },
            {
              id: 'q1-1-4',
              question: 'Why do investors care about revenue growth?',
              options: [
                'It shows the company is paying dividends',
                'It shows increasing demand and market expansion',
                'It means the stock price will always go up',
                'It doesn\'t matter, only profit matters'
              ],
              correctAnswer: 1,
              explanation: 'Revenue growth indicates the company is attracting more customers and expanding its market presence, which suggests future value.'
            },
            {
              id: 'q1-1-5',
              question: 'What\'s a RED FLAG for revenue?',
              options: [
                'Growing 25% per year',
                'Depends on many small customers',
                'Declining revenue for 3 years straight',
                'Revenue matches competitor growth'
              ],
              correctAnswer: 2,
              explanation: 'Consistently declining revenue means the company is shrinking and losing market share - a major warning sign.'
            }
          ]
        },
        keyTakeaways: [
          'Revenue = total sales, Profit = sales minus expenses',
          'Growth shows whether the company is expanding or shrinking',
          'Calculate growth: (This Year - Last Year) / Last Year × 100',
          'Consistent growth (10-20%+) is ideal',
          'Watch for red flags: declining revenue, slowing growth, dependency on few customers'
        ]
      },
      {
        id: 'module-1-2',
        moduleNumber: '1.2',
        title: 'Profitability & Margins',
        description: 'Learn how to evaluate if a company is actually making money efficiently',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand profit margins and why they matter',
          'Differentiate between gross, operating, and net margins',
          'Identify healthy vs unhealthy margin trends',
          'Compare profitability across companies and industries'
        ],
        content: {
          introduction: 'Making money is great, but keeping money is even better. Profit margins tell you how efficiently a company converts revenue into actual profit - it\'s the difference between a successful business and one that\'s just treading water.',
          sections: [
            {
              heading: 'The Pizza Shop Analogy',
              content: 'Imagine two pizza shops both making $100,000 in revenue. Shop A keeps $20,000 profit (20% margin), Shop B keeps only $5,000 (5% margin). Shop A is much more efficient at making money!',
              analogy: '🍕 Shop A: $100k revenue → $20k profit (20% margin) | Shop B: $100k revenue → $5k profit (5% margin)',
              bulletPoints: [
                'Profit Margin = (Profit / Revenue) × 100',
                'Higher margins = more efficient business',
                'Shows how much of each dollar in sales becomes profit',
                'Compare margins to industry averages'
              ]
            },
            {
              heading: 'Three Types of Margins',
              content: 'Companies report different types of margins, each telling a different story about profitability.',
              bulletPoints: [
                'Gross Margin: Profit after ONLY production costs (shows product pricing power)',
                'Operating Margin: Profit after operating expenses (shows business efficiency)',
                'Net Margin: Final profit after ALL expenses and taxes (the bottom line)',
                'Tech companies often have 60-80% gross margins (software is cheap to produce)',
                'Retailers have 20-40% gross margins (physical goods cost more)'
              ]
            },
            {
              heading: 'What\'s a Good Margin?',
              content: 'It depends on the industry! Software companies should have high margins (60%+), while grocery stores typically have low margins (2-3%).',
              bulletPoints: [
                'Software/Tech: 60-80% gross margin is normal',
                'Retail: 20-40% gross margin is typical',
                'Restaurants: 10-15% net margin is good',
                'Groceries: 2-3% net margin is standard',
                'Always compare to industry peers, not across industries'
              ]
            },
            {
              heading: 'Margin Trends Matter More Than Single Numbers',
              content: 'A company with improving margins is getting more efficient. Declining margins suggest problems like rising costs or price competition.',
              bulletPoints: [
                '📈 GOOD: Margins improving over time (getting more efficient)',
                '📉 BAD: Margins declining consistently (losing pricing power)',
                '🚩 RED FLAG: Negative margins (losing money on each sale)',
                '✅ GREEN FLAG: Margins above industry average',
                '⚠️ WARNING: Margins far below competitors'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Apple',
              scenario: 'Apple maintains a ~40% gross margin on iPhones',
              metrics: {
                'Gross Margin': '40%',
                'Operating Margin': '30%',
                'Net Margin': '25%'
              },
              outcome: 'High margins show strong brand pricing power',
              lesson: 'Premium products can command premium margins if customers see value'
            },
            {
              companyName: 'Amazon',
              scenario: 'Amazon has low margins (3-6% net) but massive revenue',
              metrics: {
                'Net Margin': '3-6%',
                'Strategy': 'High volume, low margin'
              },
              outcome: 'Makes money through scale, not high prices',
              lesson: 'Low margins can work with huge revenue volumes'
            },
            {
              companyName: 'Shopify',
              scenario: 'Shopify went from negative to positive margins in 2 years',
              metrics: {
                '2020': 'Negative margins',
                '2022': 'Positive margins'
              },
              outcome: 'Improved efficiency and cost control',
              lesson: 'Improving margins show the company is maturing and optimizing'
            }
          ],
          interactiveElement: {
            type: 'comparison',
            component: 'MarginComparisonTool',
            title: 'Margin Comparison Tool',
            description: 'Compare profit margins across different companies and industries'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q1-2-1',
              question: 'A company has $100M revenue and $20M profit. What\'s the profit margin?',
              options: ['10%', '20%', '30%', '5%'],
              correctAnswer: 1,
              explanation: 'Profit Margin = ($20M / $100M) × 100 = 20%'
            },
            {
              id: 'q1-2-2',
              question: 'Which type of margin shows the final "bottom line" profit?',
              options: ['Gross margin', 'Operating margin', 'Net margin', 'Revenue margin'],
              correctAnswer: 2,
              explanation: 'Net margin is the final profit after all expenses, taxes, and costs are paid - the true bottom line.'
            },
            {
              id: 'q1-2-3',
              question: 'Company A: 5% margin, $1B revenue. Company B: 25% margin, $200M revenue. Who makes more profit?',
              options: [
                'Company A makes $50M profit',
                'Company B makes $50M profit',
                'They make the same profit',
                'Both A and B are correct'
              ],
              correctAnswer: 3,
              explanation: 'Company A: 5% of $1B = $50M. Company B: 25% of $200M = $50M. Same profit, different strategies!'
            },
            {
              id: 'q1-2-4',
              question: 'What does DECLINING profit margins usually indicate?',
              options: [
                'The company is growing efficiently',
                'Rising costs or increased competition',
                'The stock will definitely go up',
                'Higher revenue next quarter'
              ],
              correctAnswer: 1,
              explanation: 'Declining margins suggest the company is facing pressure from rising costs, price competition, or losing efficiency.'
            },
            {
              id: 'q1-2-5',
              question: 'Why do software companies typically have higher margins than grocery stores?',
              options: [
                'Software is more expensive to produce',
                'Software has low production costs once built',
                'Grocery stores have higher revenue',
                'Software companies pay less taxes'
              ],
              correctAnswer: 1,
              explanation: 'After initial development, software can be copied/distributed at almost no cost, while groceries have ongoing inventory and logistics expenses.'
            }
          ]
        },
        keyTakeaways: [
          'Profit Margin = (Profit / Revenue) × 100 - shows efficiency',
          'Gross, Operating, and Net margins tell different profitability stories',
          'Compare margins to industry peers, not across different industries',
          'Improving margins = getting more efficient (good sign)',
          'Declining margins = losing pricing power or rising costs (red flag)'
        ]
      },
      {
        id: 'module-1-3',
        moduleNumber: '1.3',
        title: 'Valuation Ratios',
        description: 'Learn if a company\'s stock price is reasonable compared to its earnings and size',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand the P/E ratio and what it reveals',
          'Learn what market cap tells you about company size',
          'Evaluate debt levels using the debt-to-equity ratio',
          'Determine if a stock is overvalued or undervalued'
        ],
        content: {
          introduction: 'Just because a company is successful doesn\'t mean its stock is a good buy. Valuation ratios help you determine if you\'re paying a fair price - like checking if a $5 coffee is worth it compared to a $2 coffee.',
          sections: [
            {
              heading: 'P/E Ratio: The "Price Tag" of Stocks',
              content: 'The Price-to-Earnings (P/E) ratio compares the stock price to the company\'s earnings per share. It tells you how many years of earnings you\'re paying for.',
              analogy: '💰 If a stock trades at $100 and earns $5/share annually, P/E = 20 (you\'re paying 20x annual earnings)',
              bulletPoints: [
                'P/E Ratio = Stock Price / Earnings Per Share',
                'P/E of 15-25 is typical for most companies',
                'High P/E (30+) = investors expect high future growth',
                'Low P/E (under 15) = might be undervalued OR has problems',
                'Always compare P/E to industry average'
              ]
            },
            {
              heading: 'What Does P/E Really Mean?',
              content: 'A P/E of 20 means you\'re paying $20 for every $1 of annual earnings. It\'s like paying 20 years of profit upfront.',
              bulletPoints: [
                'Low P/E might mean the stock is cheap (bargain!) or risky',
                'High P/E means investors expect fast growth',
                'Tech companies often have P/E of 30-50+',
                'Banks and utilities typically have P/E of 10-15',
                'Compare P/E to the company\'s growth rate'
              ]
            },
            {
              heading: 'Market Cap: Company Size',
              content: 'Market capitalization is the total value of all shares. It tells you if a company is small, medium, or huge.',
              bulletPoints: [
                'Market Cap = Share Price × Total Shares Outstanding',
                'Small-cap: Under $2B (higher risk, higher growth potential)',
                'Mid-cap: $2B-$10B (balanced risk/reward)',
                'Large-cap: $10B-$200B (stable, slower growth)',
                'Mega-cap: $200B+ (Apple, Microsoft, Google)'
              ]
            },
            {
              heading: 'Debt-to-Equity Ratio: Borrowing Wisely',
              content: 'This ratio shows how much debt a company has compared to shareholder equity. Too much debt is dangerous!',
              analogy: '🏠 Like a mortgage: Some debt is fine, but too much means you\'re overleveraged',
              bulletPoints: [
                'Debt-to-Equity = Total Debt / Shareholder Equity',
                'Below 1.0 is generally safe (debt less than equity)',
                '1.0-2.0 is moderate (keep an eye on it)',
                'Above 2.0 is high (red flag, especially in downturns)',
                'Some industries (utilities, real estate) naturally have higher debt'
              ]
            },
            {
              heading: 'Putting Valuation Together',
              content: 'Use multiple ratios together for a complete picture. Don\'t rely on just one metric!',
              bulletPoints: [
                '✅ Low P/E + High growth = Potential bargain',
                '⚠️ High P/E + Slowing growth = Overvalued risk',
                '🚩 High debt + Declining revenue = Danger zone',
                '✅ Large market cap + Low debt = Stable investment',
                'Always compare to industry peers'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Amazon (2010)',
              scenario: 'Amazon had a P/E of 50+ when most retailers had P/E of 15',
              metrics: {
                'P/E Ratio': '50+',
                'Industry Average': '15'
              },
              outcome: 'High P/E reflected massive growth expectations',
              lesson: 'High P/E can be justified if growth is exceptional'
            },
            {
              companyName: 'Ford vs Tesla',
              scenario: 'Ford: P/E of 6, Tesla: P/E of 50 (as of certain periods)',
              metrics: {
                'Ford P/E': '6 (mature, slow growth)',
                'Tesla P/E': '50 (high growth expectations)'
              },
              outcome: 'P/E reflects growth expectations, not just current earnings',
              lesson: 'Different P/E ratios make sense for different growth stages'
            },
            {
              companyName: 'WeWork',
              scenario: 'Had massive debt and negative earnings before collapse',
              metrics: {
                'Debt': 'Very high',
                'Profitability': 'Negative'
              },
              outcome: 'High debt without profits led to failure',
              lesson: 'Watch debt levels carefully, especially if the company isn\'t profitable'
            }
          ],
          interactiveElement: {
            type: 'comparison',
            component: 'CompanyComparisonMatrix',
            title: 'Company Valuation Comparison',
            description: 'Compare P/E ratios, market caps, and debt levels across companies'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q1-3-1',
              question: 'A stock price is $50, and earnings per share is $2. What\'s the P/E ratio?',
              options: ['20', '25', '30', '10'],
              correctAnswer: 1,
              explanation: 'P/E Ratio = $50 / $2 = 25'
            },
            {
              id: 'q1-3-2',
              question: 'What does a P/E ratio of 30 usually indicate?',
              options: [
                'The company is losing money',
                'Investors expect high future growth',
                'The stock is definitely overpriced',
                'The company has high debt'
              ],
              correctAnswer: 1,
              explanation: 'A high P/E ratio (like 30) typically means investors are willing to pay more because they expect strong growth in the future.'
            },
            {
              id: 'q1-3-3',
              question: 'A company has $100B market cap. What category is it?',
              options: ['Small-cap', 'Mid-cap', 'Large-cap', 'Micro-cap'],
              correctAnswer: 2,
              explanation: 'At $100B market cap, this is a Large-cap company ($10B-$200B range).'
            },
            {
              id: 'q1-3-4',
              question: 'Company has $50M debt and $25M equity. What\'s the debt-to-equity ratio?',
              options: ['0.5', '1.0', '2.0', '3.0'],
              correctAnswer: 2,
              explanation: 'Debt-to-Equity = $50M / $25M = 2.0 (this is moderately high and worth watching)'
            },
            {
              id: 'q1-3-5',
              question: 'What\'s a RED FLAG when looking at valuation?',
              options: [
                'P/E ratio similar to industry average',
                'Large market cap with low debt',
                'High debt-to-equity ratio (3.0+) with declining revenue',
                'P/E ratio of 20 for a growing company'
              ],
              correctAnswer: 2,
              explanation: 'High debt combined with declining revenue is a dangerous situation - the company may struggle to pay back loans.'
            }
          ]
        },
        keyTakeaways: [
          'P/E Ratio = Stock Price / Earnings - shows if stock is expensive or cheap',
          'P/E of 15-25 is typical; compare to industry peers',
          'Market Cap shows company size: small, mid, large, or mega',
          'Debt-to-Equity below 1.0 is safe, above 2.0 is risky',
          'Use multiple ratios together - never rely on just one metric'
        ]
      }
    ]
  },
  {
    id: 'lesson-2-sentiment',
    lessonNumber: 2,
    title: 'Understanding Market Sentiment',
    subtitle: 'The Vibes',
    description: 'Discover how news, analyst opinions, and social media affect stock prices and investor behavior.',
    icon: 'TrendingUp',
    estimatedTime: '25-30 minutes',
    badge: {
      name: 'Sentiment Detective',
      emoji: '🕵️',
      description: 'Expert at reading market sentiment and investor psychology'
    },
    modules: [] // To be implemented in Phase 1B
  },
  {
    id: 'lesson-3-decision',
    lessonNumber: 3,
    title: 'Putting It All Together',
    subtitle: 'The Decision',
    description: 'Combine performance data and market sentiment to make informed investment decisions.',
    icon: 'Target',
    estimatedTime: '25-30 minutes',
    badge: {
      name: 'Investment Guru',
      emoji: '🧙',
      description: 'Master decision-maker who combines analysis and judgment'
    },
    modules: [] // To be implemented in Phase 1B
  }
];
