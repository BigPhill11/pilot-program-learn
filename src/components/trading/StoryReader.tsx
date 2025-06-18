
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Lightbulb,
  Target
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import { useIsMobile } from '@/hooks/use-mobile';

interface Adventure {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  chapters: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  category: 'company-analysis' | 'market-psychology' | 'forecasting' | 'economics';
}

interface StoryReaderProps {
  adventure: Adventure;
  onBack: () => void;
}

interface StoryChapter {
  id: number;
  title: string;
  content: string;
  illustration: string;
  keyLearning: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

const StoryReader: React.FC<StoryReaderProps> = ({ adventure, onBack }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number>>(new Set());
  const isMobile = useIsMobile();

  // Sample story content for Phil's Bamboo Business Empire
  const storyChapters: StoryChapter[] = [
    {
      id: 1,
      title: "Phil Discovers the Forest of Opportunities",
      content: `Phil the panda woke up one sunny morning in the great bamboo forest, his tummy rumbling loudly. "I need to find the best bamboo!" he thought. But as he looked around, he noticed something interesting - not all bamboo groves were the same.

Some groves had thick, healthy stalks reaching high into the sky, while others looked thin and weak. Some areas had rich, dark soil, while others seemed dry and cracked. Phil realized he needed to learn how to evaluate these "bamboo businesses" to find the best ones!

"Just like humans evaluate companies," Phil mumbled to himself, "I need to look at the fundamentals of each bamboo grove. The soil quality is like a company's assets - it shows the foundation. The water sources are like cash flow - without them, nothing can grow!"

Phil decided to become a bamboo business analyst. His first lesson: always look beneath the surface.`,
      illustration: "🌿🐼💡",
      keyLearning: "Company analysis starts with understanding the fundamentals - assets, cash flow, and growth potential.",
      quiz: {
        question: "What does Phil compare a company's cash flow to?",
        options: ["Bamboo thickness", "Soil quality", "Water sources", "Sunlight"],
        correctAnswer: 2,
        explanation: "Phil compares cash flow to water sources because just like bamboo needs water to grow, companies need cash flow to operate and expand."
      }
    },
    {
      id: 2,
      title: "The Tale of Two Bamboo Groves",
      content: `Phil approached two bamboo groves that looked equally impressive from the outside. Grove A had flashy, bright green bamboo that caught everyone's attention. Grove B looked more modest but had something special about it.

As Phil dug deeper (literally!), he discovered that Grove A had beautiful bamboo on top, but the roots were shallow and the soil was poor. It was like a company with high revenue but lots of debt and no real assets.

Grove B, however, had deep, strong roots extending far underground. The soil was rich and dark, full of nutrients. The bamboo might not look as flashy, but it was built to last through any storm. This was like a company with strong fundamentals - good assets, low debt, and steady growth.

"Aha!" Phil exclaimed, munching on some quality bamboo from Grove B. "It's not about what looks good on the surface - it's about the foundation and long-term health!"`,
      illustration: "🌱⚖️📊",
      keyLearning: "Strong fundamentals (good balance sheet, low debt, solid assets) matter more than flashy short-term performance.",
      quiz: {
        question: "What made Grove B better than Grove A?",
        options: ["Brighter green bamboo", "Deep roots and rich soil", "More visible bamboo", "Taller stalks"],
        correctAnswer: 1,
        explanation: "Grove B had deep roots and rich soil, representing strong fundamentals like a solid balance sheet and good assets."
      }
    },
    {
      id: 3,
      title: "Phil Learns About Bamboo Debt",
      content: `The next day, Phil met Oliver, an older panda who had been investing in bamboo groves for years. Oliver showed Phil a grove that looked amazing but had a dark secret.

"This grove borrowed nutrients from other parts of the forest," Oliver explained. "They have to pay back more nutrients than they produce. It's like a company with too much debt."

Phil watched as workers came to take away bamboo from the grove to pay back their "bamboo loans." Even though the grove was productive, most of its bamboo went to paying debts instead of feeding the pandas who owned it.

"So debt isn't always bad," Phil realized, "but too much debt means the company works for the lenders, not the shareholders!"

Oliver nodded wisely. "Always check the debt-to-equity ratio, young Phil. A company should be able to comfortably pay its debts from its earnings, just like this grove should produce enough bamboo to feed its owners AND pay back what it owes."`,
      illustration: "💰⚠️📉",
      keyLearning: "Debt can be useful, but excessive debt means a company works for creditors rather than shareholders.",
      quiz: {
        question: "Why is too much debt problematic for companies?",
        options: ["It makes them grow faster", "Most earnings go to debt payments instead of shareholders", "It improves credit rating", "It reduces taxes"],
        correctAnswer: 1,
        explanation: "Excessive debt means most of the company's earnings go to paying creditors rather than benefiting shareholders."
      }
    },
    {
      id: 4,
      title: "The Seasonal Bamboo Business Cycle",
      content: `Phil learned that bamboo groves, like companies, go through different seasons. In spring, young bamboo shoots emerge (like startup companies). In summer, they grow rapidly (growth phase). In autumn, they mature and produce the most food (mature companies). In winter, some bamboo dies back, making room for new growth.

"The key," Oliver taught Phil, "is to understand which season each grove is in, and invest accordingly."

Spring groves (growth companies) might not produce much bamboo now, but they could become the forest giants of tomorrow. Summer groves (rapidly growing companies) produce lots of bamboo but need lots of nutrients to keep growing. Autumn groves (mature companies) produce steady bamboo and often share it with their investors through "bamboo dividends."

Winter groves might look dead, but some are just preparing for an amazing spring comeback (turnaround situations).

Phil realized that successful investing meant understanding these cycles and choosing the right grove for the right season.`,
      illustration: "🌱🌿🍂❄️",
      keyLearning: "Companies go through business cycles - growth, maturity, decline, and renewal. Each stage has different investment characteristics.",
      quiz: {
        question: "What do autumn groves represent in Phil's analogy?",
        options: ["Startup companies", "Failing companies", "Mature companies that pay dividends", "Companies in decline"],
        correctAnswer: 2,
        explanation: "Autumn groves represent mature companies that produce steady returns and often pay dividends to shareholders."
      }
    },
    {
      id: 5,
      title: "Phil's First Investment Decision",
      content: `Armed with his new knowledge, Phil faced his first real investment decision. He had saved up enough bamboo seeds to invest in one grove, and three options stood before him:

Grove Alpha: A flashy new bamboo startup with promises of revolutionary growing techniques. High risk, high potential reward.

Grove Beta: A steady, 20-year-old grove with consistent bamboo production and a track record of sharing harvests with investors. Lower risk, steady returns.

Grove Gamma: A struggling grove with great soil and location, but poor management. High risk, but could be a turnaround opportunity.

Phil thought about everything he'd learned. He looked at the soil quality (assets), water access (cash flow), debt levels, management quality, and which business cycle each grove was in.

After careful analysis, Phil chose Grove Beta. "I want to start with steady returns and learn more before taking big risks," he decided. "This grove has proven it can grow bamboo through good times and bad."

Six months later, Grove Alpha had failed, Grove Gamma was still struggling, but Grove Beta had given Phil his first bamboo dividend and taught him patience pays off in investing.`,
      illustration: "🎯✅💼",
      keyLearning: "Successful investing requires analyzing fundamentals, understanding your risk tolerance, and making informed decisions based on research, not hype.",
      quiz: {
        question: "Why did Phil choose Grove Beta?",
        options: ["It promised the highest returns", "It had proven steady performance and dividends", "It was the newest grove", "It was the cheapest option"],
        correctAnswer: 1,
        explanation: "Phil chose Grove Beta because it had a proven track record of steady performance and sharing returns with investors, which matched his risk tolerance as a beginner."
      }
    }
  ];

  const currentStory = storyChapters[currentChapter];
  const progress = ((currentChapter + 1) / storyChapters.length) * 100;

  const handleQuizComplete = (quizId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCompletedQuizzes(prev => new Set([...prev, currentChapter]));
    }
  };

  const canProceed = currentStory.quiz ? completedQuizzes.has(currentChapter) : true;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-emerald-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-emerald-200"
              size={isMobile ? 'sm' : 'default'}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Adventures
            </Button>
            <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
              Chapter {currentChapter + 1} of {storyChapters.length}
            </Badge>
          </div>
          <div className="mt-4">
            <CardTitle className="text-emerald-800 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {adventure.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {currentStory.title}
            </CardDescription>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
      </Card>

      {/* Story Content */}
      <Card className="border-emerald-200">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          {/* Story Illustration */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">{currentStory.illustration}</div>
            <PandaLogo className="h-12 w-12 mx-auto" />
          </div>

          {/* Story Text */}
          <div className={`prose ${isMobile ? 'prose-sm' : ''} max-w-none mb-6`}>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentStory.content}
            </p>
          </div>

          {/* Key Learning */}
          <Card className="bg-emerald-50 border-emerald-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-1">Key Learning</h4>
                  <p className="text-emerald-700 text-sm">{currentStory.keyLearning}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Quiz */}
          {currentStory.quiz && (
            <InteractiveQuiz
              topicId={`chapter-${currentChapter}`}
              question={currentStory.quiz.question}
              options={currentStory.quiz.options}
              correctAnswerIndex={currentStory.quiz.correctAnswer}
              feedbackForIncorrect={currentStory.quiz.explanation}
              onQuizComplete={handleQuizComplete}
              isCompleted={completedQuizzes.has(currentChapter)}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="border-emerald-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline"
              onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
              disabled={currentChapter === 0}
              className="border-emerald-200"
              size={isMobile ? 'sm' : 'default'}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="text-center">
              <div className="text-sm text-muted-foreground">
                Progress: {Math.round(progress)}%
              </div>
            </div>

            <Button 
              onClick={() => setCurrentChapter(Math.min(storyChapters.length - 1, currentChapter + 1))}
              disabled={currentChapter === storyChapters.length - 1 || !canProceed}
              className="bg-emerald-600 hover:bg-emerald-700"
              size={isMobile ? 'sm' : 'default'}
            >
              {currentChapter === storyChapters.length - 1 ? (
                <>
                  Complete
                  <CheckCircle className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {!canProceed && currentStory.quiz && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-center gap-2 text-amber-800 text-sm">
                <Target className="h-4 w-4" />
                Complete the quiz correctly to continue to the next chapter
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryReader;
