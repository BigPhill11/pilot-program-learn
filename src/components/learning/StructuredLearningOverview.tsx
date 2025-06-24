
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, BookOpen, Target, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface FinancialTerm {
  term: string;
  definition: string;
  analogy?: string;
  real_world_example?: string;
  category: string;
}

interface LearningSection {
  title: string;
  level: 'beginner' | 'intermediate' | 'pro';
  description: string;
  terms: FinancialTerm[];
}

const StructuredLearningOverview: React.FC = () => {
  const { profile } = useAuth();
  const userLevel = profile?.app_version || 'beginner';
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const sections: LearningSection[] = [
    {
      title: "Market Foundations: Stock Market & Economic Overview",
      level: "beginner",
      description: "Essential concepts for understanding how markets work and economic indicators that drive them.",
      terms: [
        {
          term: "Stock",
          definition: "A share of ownership in a company that represents a claim on part of the company's assets and earnings.",
          analogy: "Think of a stock like owning a tiny slice of your favorite pizza place. The more slices you own, the bigger piece of the profits you get!",
          real_world_example: "If you buy 100 shares of Apple stock, you own a tiny fraction of Apple Inc. and are entitled to a portion of their profits.",
          category: "Market Foundations"
        },
        {
          term: "Shareholder",
          definition: "A person, company, or institution that owns at least one share of a company's stock.",
          analogy: "Like being part of a club where everyone owns a piece of the clubhouse!",
          real_world_example: "Warren Buffett is a major shareholder of Coca-Cola, owning billions of dollars worth of their stock.",
          category: "Market Foundations"
        },
        {
          term: "Stock Exchange",
          definition: "A marketplace where stocks and other securities are bought and sold.",
          analogy: "Like a giant farmers market, but instead of buying vegetables, people are buying and selling pieces of companies.",
          real_world_example: "The New York Stock Exchange (NYSE) is where Apple, Microsoft, and thousands of other companies' stocks are traded daily.",
          category: "Market Foundations"
        },
        {
          term: "Ticker Symbol",
          definition: "A unique series of letters assigned to a stock for trading purposes.",
          analogy: "Like a nickname or abbreviation - instead of saying 'Apple Incorporated,' traders just say 'AAPL.'",
          real_world_example: "Apple's ticker symbol is AAPL, Microsoft's is MSFT, and Tesla's is TSLA.",
          category: "Market Foundations"
        },
        {
          term: "IPO (Initial Public Offering)",
          definition: "The first time a company sells its shares to the public on a stock exchange.",
          analogy: "Like a restaurant that's been family-owned deciding to sell shares to customers so they can expand nationwide.",
          real_world_example: "Facebook went public in 2012 with an IPO price of $38 per share, raising $16 billion.",
          category: "Market Foundations"
        },
        {
          term: "Index (e.g., S&P 500, Dow Jones)",
          definition: "A measurement of the performance of a group of stocks, representing a portion of the overall market.",
          analogy: "Like a report card that shows the average grade of the top students in school - it gives you an idea of how well the whole class is doing.",
          real_world_example: "The S&P 500 tracks the performance of 500 large U.S. companies, giving investors a snapshot of the overall market health.",
          category: "Market Foundations"
        },
        {
          term: "Bull Market",
          definition: "A period of rising stock prices and investor optimism, typically lasting months or years.",
          analogy: "Like a party where everyone's in a great mood and the music keeps getting better - prices keep going up and everyone's optimistic.",
          real_world_example: "The longest bull market in U.S. history ran from 2009 to 2020, with the S&P 500 gaining over 400%.",
          category: "Market Foundations"
        },
        {
          term: "Bear Market",
          definition: "A period of declining stock prices, typically defined as a 20% drop from recent highs.",
          analogy: "Like when the party's over and everyone's going home - prices fall and investors get pessimistic.",
          real_world_example: "During the 2008 financial crisis, the S&P 500 fell over 50% from its peak, creating a severe bear market.",
          category: "Market Foundations"
        },
        {
          term: "Market Capitalization",
          definition: "The total value of a company's shares, calculated by multiplying share price by total number of shares.",
          analogy: "Like figuring out how much your entire collection of baseball cards is worth by adding up the value of each card.",
          real_world_example: "Apple has a market cap of over $3 trillion, making it one of the most valuable companies in the world.",
          category: "Market Foundations"
        },
        {
          term: "GDP (Gross Domestic Product)",
          definition: "The total value of all goods and services produced in a country during a specific period.",
          analogy: "Like adding up everything a family produces and earns in a year to see how well they're doing financially.",
          real_world_example: "The U.S. GDP is about $25 trillion, representing the world's largest economy.",
          category: "Market Foundations"
        },
        {
          term: "Inflation",
          definition: "The rate at which the general level of prices for goods and services rises over time.",
          analogy: "Like when your favorite candy bar costs more this year than it did last year - money buys less than it used to.",
          real_world_example: "If inflation is 3%, something that costs $100 today would cost $103 next year.",
          category: "Market Foundations"
        },
        {
          term: "Recession",
          definition: "A period of economic decline characterized by falling GDP, rising unemployment, and reduced consumer spending.",
          analogy: "Like when a neighborhood goes through tough times - businesses close, people lose jobs, and everyone spends less money.",
          real_world_example: "The 2008 recession lasted 18 months and saw unemployment rise to 10% while GDP fell significantly.",
          category: "Market Foundations"
        },
        {
          term: "Interest Rate",
          definition: "The cost of borrowing money, expressed as a percentage of the loan amount.",
          analogy: "Like the fee you pay to borrow your friend's bike - except it's calculated as a percentage of what you're borrowing.",
          real_world_example: "If you get a mortgage at 6% interest, you'll pay 6% of your loan balance in interest each year.",
          category: "Market Foundations"
        },
        {
          term: "Federal Reserve (The Fed)",
          definition: "The central banking system of the United States that manages monetary policy and regulates banks.",
          analogy: "Like the principal of a school who sets the rules and makes sure everyone follows them to keep things running smoothly.",
          real_world_example: "The Fed sets interest rates and can print money to help stabilize the economy during crises.",
          category: "Market Foundations"
        },
        {
          term: "Unemployment Rate",
          definition: "The percentage of people in the labor force who are actively looking for work but cannot find jobs.",
          analogy: "Like measuring what percentage of people who want to play on sports teams can't find a team to join.",
          real_world_example: "During the COVID-19 pandemic, U.S. unemployment peaked at 14.8% in April 2020.",
          category: "Market Foundations"
        }
      ]
    },
    {
      title: "Investing Principles & Strategies + Company Analysis",
      level: "intermediate",
      description: "Core investment strategies and how to analyze companies using financial metrics.",
      terms: [
        // Investing Principles & Strategies
        {
          term: "Diversification",
          definition: "An investment strategy that spreads risk by investing in a variety of different assets or securities.",
          analogy: "Like not putting all your eggs in one basket - if one basket drops, you still have eggs in other baskets.",
          real_world_example: "Instead of buying only tech stocks, you might invest in tech, healthcare, energy, and international markets.",
          category: "Investing Strategies"
        },
        {
          term: "Risk Tolerance",
          definition: "An investor's ability and willingness to lose some or all of their investment in exchange for greater potential returns.",
          analogy: "Like how some people love roller coasters while others prefer the merry-go-round - it's about your comfort level with uncertainty.",
          real_world_example: "A young investor might have high risk tolerance and buy growth stocks, while someone near retirement might prefer bonds.",
          category: "Investing Strategies"
        },
        {
          term: "Asset Allocation",
          definition: "The strategy of dividing investment portfolio among different asset categories like stocks, bonds, and cash.",
          analogy: "Like deciding how to divide your allowance between saving, spending on fun stuff, and buying school supplies.",
          real_world_example: "A common allocation might be 60% stocks, 30% bonds, and 10% cash for a moderate investor.",
          category: "Investing Strategies"
        },
        {
          term: "Mutual Fund",
          definition: "An investment vehicle that pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.",
          analogy: "Like a group of friends pooling their money to buy a variety pack of snacks that they all share.",
          real_world_example: "Vanguard's Total Stock Market Index Fund owns pieces of virtually every public U.S. company.",
          category: "Investing Strategies"
        },
        {
          term: "Index Fund",
          definition: "A type of mutual fund designed to track the performance of a specific market index.",
          analogy: "Like buying a sample platter that represents the entire menu rather than picking individual dishes.",
          real_world_example: "An S&P 500 index fund owns all 500 companies in the S&P 500 in the same proportions as the index.",
          category: "Investing Strategies"
        },
        {
          term: "ETF (Exchange-Traded Fund)",
          definition: "A fund that trades on stock exchanges like individual stocks but holds a diversified portfolio of assets.",
          analogy: "Like a mutual fund that you can buy and sell instantly during market hours, just like a stock.",
          real_world_example: "SPY is an ETF that tracks the S&P 500 and can be bought or sold anytime the market is open.",
          category: "Investing Strategies"
        },
        {
          term: "Value Investing",
          definition: "An investment strategy that involves buying stocks that appear underpriced by fundamental analysis.",
          analogy: "Like shopping for designer clothes at a thrift store - looking for high-quality items selling for less than they're worth.",
          real_world_example: "Warren Buffett is famous for value investing, buying companies like Coca-Cola when their stock price was lower than their intrinsic value.",
          category: "Investing Strategies"
        },
        {
          term: "Growth Investing",
          definition: "An investment strategy focused on companies that are expected to grow at an above-average rate.",
          analogy: "Like betting on the most promising young athlete who might become a superstar, even if their rookie cards cost more now.",
          real_world_example: "Investing in Amazon in the early 2000s was growth investing - paying a premium for a company expected to grow rapidly.",
          category: "Investing Strategies"
        },
        {
          term: "Dollar-Cost Averaging",
          definition: "An investment strategy where you invest a fixed amount of money at regular intervals, regardless of market conditions.",
          analogy: "Like putting the same amount of money in a piggy bank every week, whether you're feeling rich or poor that week.",
          real_world_example: "Investing $500 every month in an index fund, buying more shares when prices are low and fewer when prices are high.",
          category: "Investing Strategies"
        },
        {
          term: "Buy and Hold",
          definition: "A long-term investment strategy where investors buy stocks and hold them for extended periods, regardless of market fluctuations.",
          analogy: "Like planting a tree and letting it grow for decades rather than constantly digging it up to check the roots.",
          real_world_example: "Warren Buffett has held Coca-Cola stock since 1988, through multiple market ups and downs.",
          category: "Investing Strategies"
        },
        // Company & Financial Statement Analysis
        {
          term: "Revenue",
          definition: "The total amount of money a company generates from its business operations before expenses.",
          analogy: "Like the total amount of money a lemonade stand makes from selling lemonade before paying for lemons and sugar.",
          real_world_example: "Apple's revenue in 2023 was $383 billion, mostly from selling iPhones, iPads, and services.",
          category: "Financial Analysis"
        },
        {
          term: "Net Income",
          definition: "A company's profit after all expenses, taxes, and costs have been subtracted from revenue.",
          analogy: "Like how much money you actually get to keep from your lemonade stand after paying for supplies, permits, and taxes.",
          real_world_example: "Apple's net income in 2023 was about $97 billion, meaning they kept about 25% of their revenue as profit.",
          category: "Financial Analysis"
        },
        {
          term: "Earnings Per Share (EPS)",
          definition: "A company's net income divided by the number of outstanding shares of stock.",
          analogy: "Like dividing a pizza equally among friends - EPS tells you how much profit each share gets.",
          real_world_example: "If a company earns $1 million and has 100,000 shares outstanding, the EPS is $10 per share.",
          category: "Financial Analysis"
        },
        {
          term: "P/E Ratio (Price-to-Earnings)",
          definition: "A valuation ratio calculated by dividing a company's current share price by its earnings per share.",
          analogy: "Like asking 'How many years of current earnings would I need to pay for this stock?' - it shows if a stock is expensive or cheap.",
          real_world_example: "If a stock costs $50 and earns $5 per share annually, its P/E ratio is 10, meaning you're paying 10 times annual earnings.",
          category: "Financial Analysis"
        },
        {
          term: "Profit Margin",
          definition: "The percentage of revenue that remains as profit after all expenses are deducted.",
          analogy: "Like figuring out what percentage of your lemonade stand's sales you get to keep as profit.",
          real_world_example: "If a company has $100 in revenue and $20 in profit, their profit margin is 20%.",
          category: "Financial Analysis"
        }
      ]
    },
    {
      title: "Financial Markets & Corporate Finance",
      level: "pro",
      description: "Advanced financial instruments, market mechanics, and corporate finance strategies.",
      terms: [
        // Financial Markets & Instruments
        {
          term: "Bond",
          definition: "A debt security where investors loan money to entities for a defined period at a fixed interest rate.",
          analogy: "Like lending money to a friend with a written promise that they'll pay you back with interest on a specific date.",
          real_world_example: "U.S. Treasury bonds are considered very safe investments where you lend money to the government for 10-30 years.",
          category: "Financial Markets"
        },
        {
          term: "Yield",
          definition: "The income return on an investment, typically expressed as an annual percentage based on cost or current market value.",
          analogy: "Like the annual rent you collect from a rental property compared to what you paid for the house.",
          real_world_example: "A bond that pays $50 annually and costs $1,000 has a 5% yield.",
          category: "Financial Markets"
        },
        {
          term: "Option (Call/Put)",
          definition: "Financial contracts that give the holder the right, but not obligation, to buy (call) or sell (put) an asset at a specific price.",
          analogy: "Like having a coupon that lets you buy something at a set price, but you don't have to use it if you don't want to.",
          real_world_example: "A call option might give you the right to buy Apple stock at $150 even if it rises to $200.",
          category: "Financial Markets"
        },
        {
          term: "Derivative",
          definition: "A financial contract whose value is derived from an underlying asset like stocks, bonds, commodities, or market indices.",
          analogy: "Like betting on a sports game - the bet's value depends on how the actual game plays out, but you're not actually playing.",
          real_world_example: "Stock options, futures contracts, and swaps are all derivatives because their value depends on other assets.",
          category: "Financial Markets"
        },
        {
          term: "Futures Contract",
          definition: "An agreement to buy or sell an asset at a predetermined price at a specified time in the future.",
          analogy: "Like pre-ordering a video game at a set price for delivery next year, regardless of what the price is then.",
          real_world_example: "Oil futures let airlines lock in fuel prices months ahead to protect against price spikes.",
          category: "Financial Markets"
        },
        {
          term: "Volatility",
          definition: "A measure of how much a security's price fluctuates over time.",
          analogy: "Like comparing a roller coaster (high volatility) to a train ride (low volatility) - both get you there, but one's much bumpier.",
          real_world_example: "Bitcoin has high volatility, often moving 10%+ in a day, while utility stocks typically move much less.",
          category: "Financial Markets"
        },
        {
          term: "Liquidity",
          definition: "How easily an asset can be bought or sold in the market without affecting its price.",
          analogy: "Like how quickly you can sell your car - a popular model sells fast (high liquidity), a rare vintage car takes time (low liquidity).",
          real_world_example: "Apple stock has high liquidity because millions of shares trade daily, while small company stocks may have low liquidity.",
          category: "Financial Markets"
        },
        // Corporate Finance & Deal-Making
        {
          term: "Capital Structure",
          definition: "The combination of debt and equity that a company uses to finance its operations and growth.",
          analogy: "Like how you might fund buying a house - some with your own money (equity) and some with a mortgage (debt).",
          real_world_example: "A company might be financed 60% by shareholders' equity and 40% by borrowed money.",
          category: "Corporate Finance"
        },
        {
          term: "M&A (Mergers and Acquisitions)",
          definition: "The process of combining companies through mergers, acquisitions, or other corporate restructuring activities.",
          analogy: "Like when two restaurants decide to combine into one bigger restaurant, or when a big chain buys a small local place.",
          real_world_example: "Disney acquired Marvel Entertainment for $4 billion in 2009 to gain access to superhero characters and franchises.",
          category: "Corporate Finance"
        },
        {
          term: "Leveraged Buyout (LBO)",
          definition: "The acquisition of a company using a significant amount of borrowed money to meet the cost of acquisition.",
          analogy: "Like buying a house with mostly borrowed money, then using the rental income from that house to pay back the loan.",
          real_world_example: "Private equity firms often use LBOs to buy companies, using the target company's assets as collateral for the loans.",
          category: "Corporate Finance"
        },
        {
          term: "Due Diligence",
          definition: "The comprehensive investigation and analysis of a business or investment opportunity before making a decision.",
          analogy: "Like thoroughly inspecting a used car - checking the engine, history, and everything else - before deciding to buy it.",
          real_world_example: "Before acquiring a company, buyers examine financial records, legal issues, market position, and operational efficiency.",
          category: "Corporate Finance"
        },
        {
          term: "Enterprise Value (EV)",
          definition: "A measure of a company's total value, calculated as market capitalization plus debt minus cash.",
          analogy: "Like the true cost of buying an entire company - you get their cash but also take on their debts.",
          real_world_example: "If a company has $100M market cap, $20M debt, and $10M cash, its enterprise value is $110M.",
          category: "Corporate Finance"
        },
        {
          term: "Return on Investment (ROI)",
          definition: "A performance measure used to evaluate the efficiency of an investment, calculated as gain divided by cost.",
          analogy: "Like figuring out if your lemonade stand was worth it by comparing how much profit you made to how much you spent to start it.",
          real_world_example: "If you invest $1,000 and get back $1,200, your ROI is 20% ($200 gain ÷ $1,000 investment).",
          category: "Corporate Finance"
        },
        {
          term: "Working Capital",
          definition: "The difference between a company's current assets and current liabilities, indicating short-term financial health.",
          analogy: "Like having enough money in your checking account to pay this month's bills - it shows if you can handle immediate expenses.",
          real_world_example: "A company with $500,000 in current assets and $300,000 in current liabilities has $200,000 in working capital.",
          category: "Corporate Finance"
        },
        {
          term: "Share Buyback",
          definition: "When a company repurchases its own shares from the marketplace, reducing the number of outstanding shares.",
          analogy: "Like a pizza being shared by 8 people, but 2 people leave - now everyone gets bigger slices of the same pizza.",
          real_world_example: "Apple has spent hundreds of billions on share buybacks, returning cash to shareholders and increasing earnings per share.",
          category: "Corporate Finance"
        }
      ]
    }
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner': return <BookOpen className="h-4 w-4" />;
      case 'intermediate': return <Target className="h-4 w-4" />;
      case 'pro': return <Trophy className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'pro': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelBorder = (level: string, isUserLevel: boolean) => {
    if (isUserLevel) {
      switch (level) {
        case 'beginner': return 'ring-2 ring-green-500';
        case 'intermediate': return 'ring-2 ring-yellow-500';
        case 'pro': return 'ring-2 ring-red-500';
        default: return 'ring-2 ring-gray-500';
      }
    }
    return '';
  };

  const handleCardNavigation = (direction: 'prev' | 'next') => {
    const section = sections.find(s => s.title === activeSection);
    if (!section) return;

    if (direction === 'next') {
      setCurrentCardIndex((prev) => (prev + 1) % section.terms.length);
    } else {
      setCurrentCardIndex((prev) => (prev - 1 + section.terms.length) % section.terms.length);
    }
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    const section = sections.find(s => s.title === activeSection);
    if (!section) return;

    // Create a shuffled version of indices
    const indices = Array.from({ length: section.terms.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    setCurrentCardIndex(indices[0]);
    setIsFlipped(false);
  };

  if (activeSection) {
    const section = sections.find(s => s.title === activeSection);
    if (!section) return null;

    const currentTerm = section.terms[currentCardIndex];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setActiveSection(null);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
          >
            ← Back to Overview
          </Button>
          <div className="flex items-center gap-2">
            <Badge className={`${getLevelColor(section.level)} text-white`}>
              {section.level}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentCardIndex + 1} of {section.terms.length}
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
          <p className="text-muted-foreground">{section.description}</p>
        </div>

        <div className="perspective-1000 max-w-2xl mx-auto">
          <div 
            className={`relative w-full h-80 transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of card */}
            <Card className="absolute inset-0 backface-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                <h2 className="text-3xl font-bold text-primary mb-4 break-words">{currentTerm.term}</h2>
                <Badge className="mb-4">{currentTerm.category}</Badge>
                <p className="text-muted-foreground">Click to reveal definition</p>
              </CardContent>
            </Card>

            {/* Back of card */}
            <Card className="absolute inset-0 backface-hidden rotate-y-180 border-2 border-green-500/30 bg-green-50">
              <CardContent className="flex flex-col justify-between h-full p-6 overflow-y-auto">
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-lg leading-relaxed mb-4 break-words">{currentTerm.definition}</p>
                  {currentTerm.analogy && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                      <p className="text-sm font-medium text-blue-700 mb-1">💡 Phil's Simple Explanation:</p>
                      <p className="text-sm text-blue-600 break-words">{currentTerm.analogy}</p>
                    </div>
                  )}
                  {currentTerm.real_world_example && (
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-700 mb-1">🌟 Real Example:</p>
                      <p className="text-sm text-green-600 break-words">{currentTerm.real_world_example}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Flip Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => handleCardNavigation('prev')} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" onClick={shuffleCards}>
            <Shuffle className="h-4 w-4 mr-1" />
            Shuffle
          </Button>
          <Button onClick={() => handleCardNavigation('next')}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <Progress value={((currentCardIndex + 1) / section.terms.length) * 100} className="max-w-md mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Structured Learning Path</h1>
        <p className="text-muted-foreground">
          Master financial concepts through our comprehensive curriculum designed for every skill level
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => {
          const isUserLevel = userLevel === section.level || (userLevel === 'beginner' && section.level === 'beginner') || (userLevel === 'intermediate' && (section.level === 'beginner' || section.level === 'intermediate'));
          
          return (
            <Card 
              key={section.title}
              className={`transition-all hover:shadow-lg cursor-pointer ${getLevelBorder(section.level, isUserLevel)}`}
              onClick={() => setActiveSection(section.title)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getLevelIcon(section.level)}
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getLevelColor(section.level)} text-white`}>
                    {section.level}
                  </Badge>
                </div>
                {isUserLevel && (
                  <div className="mt-2 p-2 bg-primary/10 rounded-lg">
                    <p className="text-sm text-primary font-medium">✨ This matches your current level!</p>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {section.terms.length} flashcards available
                  </p>
                  <Button variant="outline" size="sm">
                    Start Learning →
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StructuredLearningOverview;
