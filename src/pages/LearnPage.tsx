import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, HelpCircle } from 'lucide-react';
import QuizPlaceholder from '@/components/QuizPlaceholder';

interface LearningTopic {
  title: string;
  icon: React.ReactNode;
  definition: string;
  easyExplanation: string;
  analogy: string;
  quiz: {
    question: string;
    options: string[];
    // correctAnswerIndex: number; // We'll use this later for quiz logic
  };
}

const LearnPage = () => {
  const learningTopics: LearningTopic[] = [
    {
      title: "What is a Stock?",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      definition: "A stock represents a share in the ownership of a company. When you buy a stock, you are buying a piece of that company and become a part-owner or shareholder. Companies issue stock to raise money for various purposes like expanding their business or funding new projects.",
      easyExplanation: "Imagine a company is a giant pizza. Buying a stock is like buying a slice of that pizza. If the pizza place (company) does well and becomes more popular, your slice (stock) might become more valuable!",
      analogy: "Think of stocks like collectible trading cards. Some cards are rare and valuable because the player (company) is performing exceptionally well. Others might be less valuable if the player isn't doing so great.",
      quiz: {
        question: "What does buying a stock mean?",
        options: ["Loaning money to a company", "Buying a product from a company", "Owning a small piece of a company", "Managing a company's operations"],
      }
    },
    {
      title: "Understanding Bonds",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      definition: "A bond is essentially an IOU (I Owe You) issued by a government or corporation when they need to borrow money. When you buy a bond, you are lending money to the issuer, and they promise to pay you back the face value of the bond on a specific date (maturity date), plus periodic interest payments.",
      easyExplanation: "Buying a bond is like lending your friend $10. They promise to pay you back the $10 later, and maybe give you a little extra (like $1 each month) for letting them borrow it.",
      analogy: "Bonds are like a savings account at a 'company bank'. You deposit money (lend it to them), and they pay you interest. At the end of a set period, you get your original deposit back.",
      quiz: {
        question: "When you buy a bond, you are primarily:",
        options: ["Buying ownership in a company", "Lending money to an entity", "Betting on market fluctuations", "Getting a share of profits"],
      }
    },
    // Add more topics here later (up to 40)
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Learn About Finance</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Expand your financial knowledge with our curated learning modules. (More topics coming soon!)
        </p>
      </div>

      <div className="space-y-8">
        {learningTopics.map((topic, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                {topic.icon}
                <CardTitle>{topic.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Definition:</h3>
                  <p className="text-muted-foreground">{topic.definition}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1.5 text-blue-500" />
                    Easy Explanation:
                  </h3>
                  <p className="text-muted-foreground italic">{topic.easyExplanation}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Analogy:</h3>
                  <p className="text-muted-foreground">{topic.analogy}</p>
                </div>
              </div>
              <QuizPlaceholder question={topic.quiz.question} options={topic.quiz.options} />
               <Button variant="outline" className="w-full mt-6" disabled>
                Mark as Learned (Functionality coming soon)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">
          We'll be adding many more terms and interactive quizzes soon!
        </p>
        <Button asChild size="lg">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default LearnPage;
