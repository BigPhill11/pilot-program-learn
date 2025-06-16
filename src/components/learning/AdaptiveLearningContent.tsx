
import React from 'react';
import LearningModule from './LearningModule';
import HighlightableTerm from '@/components/HighlightableTerm';
import { useAuth } from '@/hooks/useAuth';

const AdaptiveLearningContent: React.FC = () => {
  const { profile } = useAuth();

  const stockBasicsContent = (
    <div className="space-y-4">
      <p>
        A <HighlightableTerm 
          term="stock" 
          definition="A share of ownership in a company" 
          analogy="Think of a stock like owning a tiny slice of your favorite pizza place. The more slices you own, the bigger piece of the profits you get!"
        >
          stock
        </HighlightableTerm> represents ownership in a company. When you buy stock, you become a 
        <HighlightableTerm 
          term="shareholder" 
          definition="Someone who owns shares in a company" 
          analogy="Like being part of a club where everyone owns a piece of the clubhouse!"
        >
          shareholder
        </HighlightableTerm>.
      </p>
      <p>
        Companies sell stocks to raise money for growth, and investors buy them hoping the company will become more valuable over time.
      </p>
    </div>
  );

  const dividendContent = (
    <div className="space-y-4">
      <p>
        <HighlightableTerm 
          term="dividends" 
          definition="Regular payments companies make to shareholders from their profits" 
          analogy="Like getting your share of the pizza place's profits every quarter - even if you don't sell your slice!"
        >
          Dividends
        </HighlightableTerm> are payments companies make to shareholders from their profits. Not all companies pay dividends.
      </p>
      <p>
        The <HighlightableTerm 
          term="dividend yield" 
          definition="The annual dividend payment divided by the stock price, expressed as a percentage" 
          analogy="Like calculating what percentage return you get on your investment each year from dividend payments alone"
        >
          dividend yield
        </HighlightableTerm> tells you how much you earn in dividends relative to the stock price.
      </p>
    </div>
  );

  const optionsContent = (
    <div className="space-y-4">
      <p>
        <HighlightableTerm 
          term="options" 
          definition="Financial contracts that give you the right (but not obligation) to buy or sell a stock at a specific price" 
          analogy="Like having a coupon that lets you buy something at a set price, but you don't have to use it if you don't want to"
        >
          Options
        </HighlightableTerm> are contracts that give you the right to buy or sell a stock at a specific price within a certain time.
      </p>
      <p>
        A <HighlightableTerm 
          term="call option" 
          definition="Gives you the right to BUY a stock at a specific price" 
          analogy="Like having a coupon to buy a concert ticket at $50, even if tickets go up to $100"
        >
          call option
        </HighlightableTerm> gives you the right to buy, while a 
        <HighlightableTerm 
          term="put option" 
          definition="Gives you the right to SELL a stock at a specific price" 
          analogy="Like having a guarantee to sell your concert ticket for $50, even if prices drop to $20"
        >
          put option
        </HighlightableTerm> gives you the right to sell.
      </p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Learning Hub</h1>
        <p className="text-muted-foreground">
          Content adapted for {profile?.app_version || 'your'} level learning
        </p>
      </div>

      <LearningModule
        title="Stock Basics"
        level="beginner"
        content={stockBasicsContent}
        quiz={{
          topicId: "stock_basics",
          question: "What does owning a stock represent?",
          options: [
            "Lending money to a company",
            "Owning part of a company", 
            "Working for a company",
            "Buying products from a company"
          ],
          correctAnswerIndex: 1,
          feedbackForIncorrect: "Remember: A stock represents ownership! You become a part-owner of the company, not just a customer or lender."
        }}
      />

      <LearningModule
        title="Understanding Dividends"
        level="intermediate"
        content={dividendContent}
        quiz={{
          topicId: "dividends",
          question: "If a stock costs $100 and pays $4 in annual dividends, what's the dividend yield?",
          options: [
            "2%",
            "4%",
            "6%", 
            "8%"
          ],
          correctAnswerIndex: 1,
          feedbackForIncorrect: "Dividend yield = Annual dividends ÷ Stock price. So $4 ÷ $100 = 4%"
        }}
      />

      <LearningModule
        title="Options Trading"
        level="advanced"
        content={optionsContent}
        quiz={{
          topicId: "options",
          question: "You buy a call option for XYZ stock with a strike price of $50. XYZ is now trading at $60. What should you do?",
          options: [
            "Let the option expire worthless",
            "Exercise the option to buy at $50",
            "Sell the option immediately",
            "Wait for the stock to go higher"
          ],
          correctAnswerIndex: 1,
          feedbackForIncorrect: "Since the stock is at $60 and your call option lets you buy at $50, you should exercise it to capture the $10 difference!"
        }}
      />
    </div>
  );
};

export default AdaptiveLearningContent;
