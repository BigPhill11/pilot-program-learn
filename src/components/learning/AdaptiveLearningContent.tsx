import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Brain, Gamepad2, Trophy, Settings, GraduationCap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFinancialTerms } from '@/hooks/useFinancialTerms';
import FlashcardMode from './FlashcardMode';
import QuizMode from './QuizMode';
import MatchingGame from './MatchingGame';
import LearningModule from './LearningModule';
import StructuredLearningOverview from './StructuredLearningOverview';
import HighlightableTerm from '@/components/HighlightableTerm';

const AdaptiveLearningContent: React.FC = () => {
  const { profile } = useAuth();
  const { terms, loading } = useFinancialTerms();
  const [activeMode, setActiveMode] = useState('structured');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [quizTermCount, setQuizTermCount] = useState(10);
  const [matchingTermCount, setMatchingTermCount] = useState(6);

  const userLevel = profile?.app_version || 'beginner';

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

  if (loading) {
    return <div className="text-center py-8">Loading financial terms...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Learning Hub</h1>
        <p className="text-muted-foreground mb-4">
          Interactive learning adapted for {userLevel} level • {terms.length} terms available
        </p>
        
        {/* Difficulty Level Selector */}
        {(activeMode === 'flashcards' || activeMode === 'quiz' || activeMode === 'matching') && (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Difficulty Level:</span>
              </div>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              
              {(activeMode === 'quiz' || activeMode === 'matching') && (
                <>
                  <span className="text-sm font-medium">
                    {activeMode === 'quiz' ? 'Quiz Questions:' : 'Matching Pairs:'}
                  </span>
                  <Select 
                    value={activeMode === 'quiz' ? quizTermCount.toString() : matchingTermCount.toString()} 
                    onValueChange={(value) => {
                      if (activeMode === 'quiz') {
                        setQuizTermCount(parseInt(value));
                      } else {
                        setMatchingTermCount(parseInt(value));
                      }
                    }}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {activeMode === 'quiz' ? (
                        <>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Button
            variant={activeMode === 'structured' ? 'default' : 'outline'}
            onClick={() => setActiveMode('structured')}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <GraduationCap className="h-6 w-6" />
            <span className="text-sm">Structured</span>
          </Button>
          <Button
            variant={activeMode === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveMode('overview')}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-sm">Overview</span>
          </Button>
          <Button
            variant={activeMode === 'flashcards' ? 'default' : 'outline'}
            onClick={() => setActiveMode('flashcards')}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <Brain className="h-6 w-6" />
            <span className="text-sm">Flashcards</span>
          </Button>
          <Button
            variant={activeMode === 'quiz' ? 'default' : 'outline'}
            onClick={() => setActiveMode('quiz')}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <Trophy className="h-6 w-6" />
            <span className="text-sm">Quiz</span>
          </Button>
          <Button
            variant={activeMode === 'matching' ? 'default' : 'outline'}
            onClick={() => setActiveMode('matching')}
            className="h-auto py-4 flex flex-col gap-2"
          >
            <Gamepad2 className="h-6 w-6" />
            <span className="text-sm">Matching</span>
          </Button>
        </div>
      </div>

      {activeMode === 'structured' && <StructuredLearningOverview />}

      {activeMode === 'overview' && (
        <div className="space-y-6">
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
      )}

      {activeMode === 'flashcards' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Flashcard Study Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FlashcardMode terms={terms} userLevel={userLevel} selectedDifficulty={selectedDifficulty} />
          </CardContent>
        </Card>
      )}

      {activeMode === 'quiz' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Knowledge Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuizMode terms={terms} userLevel={userLevel} selectedDifficulty={selectedDifficulty} termCount={quizTermCount} />
          </CardContent>
        </Card>
      )}

      {activeMode === 'matching' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Matching Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MatchingGame terms={terms} userLevel={userLevel} selectedDifficulty={selectedDifficulty} termCount={matchingTermCount} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdaptiveLearningContent;
