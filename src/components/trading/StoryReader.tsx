import React, { useState } from 'react';
import { Adventure } from '@/types/adventure';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import StoryChapter from './adventures/story/StoryChapter';
import StoryNavigation from './adventures/story/StoryNavigation';
import StoryProgress from './adventures/story/StoryProgress';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoryReaderProps {
  adventure: Adventure;
  onBack: () => void;
}

const StoryReader: React.FC<StoryReaderProps> = ({ adventure, onBack }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number>>(new Set());
  const { updateQuizScore } = useProgressTracking();
  const isMobile = useIsMobile();

  const storyData = {
    'bamboo-business': {
      chapters: [
        {
          title: "Welcome to Phil's Forest",
          content: [
            "🐼 Hi there! I'm Phil, and welcome to my bamboo forest! Just like how you might want to buy the best toys or snacks with your allowance, I need to choose the best bamboo groves to invest in.",
            "In the business world, companies are like different bamboo groves. Some are healthy and growing, while others might be struggling. Today, I'll teach you how to 'read' a company just like I read the health of bamboo groves!",
            "First, let's learn about what makes a bamboo grove (company) valuable. Just like I look at the soil, water, and growth of bamboo, investors look at a company's assets, cash flow, and growth potential."
          ]
        },
        {
          title: "Reading the Soil (Assets & Liabilities)",
          content: [
            "🌱 When I look at a bamboo grove, the first thing I check is the soil. Rich, healthy soil means the bamboo will grow strong. In business, this is like looking at a company's 'balance sheet'.",
            "A company's assets are like the good soil - these are valuable things the company owns: buildings, equipment, cash in the bank, and even ideas (like patents). The more valuable assets, the stronger the foundation!",
            "But wait! Just like bamboo groves can have problems (like pests or poor drainage), companies have liabilities - money they owe to others. It's like having to share your bamboo with other pandas. We want assets to be much bigger than liabilities!"
          ]
        },
        {
          title: "Checking the Water Flow (Cash Flow)",
          content: [
            "💧 Next, I check if there's good water flowing to my bamboo. No water = no growth! In business, this 'water' is cash flow - money flowing in and out of the company.",
            "When a company sells products or services, money flows IN (like rain feeding my bamboo). When they pay employees, rent, or buy materials, money flows OUT (like water being absorbed by roots).",
            "The best companies are like bamboo groves with a steady stream - more water coming in than going out. This leftover water helps the bamboo (company) grow bigger and stronger over time!"
          ]
        },
        {
          title: "Measuring Growth Potential",
          content: [
            "📈 Now comes the exciting part - figuring out which bamboo groves will grow the most! I look for young, healthy shoots that have lots of room to expand.",
            "In business, this means looking at whether a company is growing its sales, expanding to new places, or creating innovative products. Companies in growing industries (like technology) are like bamboo in perfect growing conditions.",
            "I also check if the company has smart leaders (like experienced panda grove-keepers) and if they're spending money wisely on growth rather than wasteful things."
          ]
        },
        {
          title: "Making the Investment Decision",
          content: [
            "🎯 Finally, it's decision time! Just like I choose the best bamboo grove for my family's future, investors must decide if a company is worth buying shares in.",
            "I compare different groves (companies) and pick the ones with: healthy soil (strong balance sheet), good water flow (positive cash flow), growth potential (expanding business), and reasonable prices (not too expensive).",
            "Remember, investing is like planting seeds for the future. The best investors, like the wisest pandas, are patient and choose carefully. Now you know the basics of reading companies like Phil reads bamboo groves!"
          ]
        }
      ]
    },
    'forest-sentiment': {
      chapters: [
        {
          title: "The Mood of the Forest",
          content: [
            "🐼 Hello again! Today I want to tell you about something really interesting - how the emotions of all us pandas affect bamboo prices in our forest market!",
            "You know how when you're excited about something, your friends get excited too? Or when someone is scared, others start feeling worried? The same thing happens in investing!",
            "When most pandas in our forest feel happy and confident about bamboo growing, they want to buy more bamboo stocks. When they're worried or scared, they want to sell. This creates what humans call 'market sentiment' - the overall mood of all investors."
          ]
        },
        {
          title: "Bull Pandas vs Bear Pandas",
          content: [
            "🐂 In our forest, we have two types of pandas when it comes to bamboo investing: Bull Pandas and Bear Pandas!",
            "Bull Pandas are super optimistic! They think bamboo prices will go UP, UP, UP! They're always buying more bamboo stocks because they believe the forest economy will grow. When lots of Bull Pandas are around, prices tend to rise.",
            "🐻 Bear Pandas are more cautious (and sometimes grumpy). They think bamboo prices will go DOWN. They might sell their bamboo stocks because they're worried about problems coming. When Bear Pandas dominate, prices usually fall.",
            "The funny thing is, both Bull and Bear Pandas can be right at different times! The key is understanding which mood is taking over the forest."
          ]
        },
        {
          title: "Fear and Greed in the Bamboo Market",
          content: [
            "😱 Sometimes, fear spreads through our forest like wildfire. Maybe there's news about a bamboo disease, or rumors that winter will be extra cold. When pandas get scared, they panic-sell their bamboo stocks!",
            "This creates what we call a 'Bear Market' - prices fall quickly because everyone wants to sell, but nobody wants to buy. It's like a bamboo clearance sale that nobody asked for!",
            "💰 Other times, greed takes over. Pandas hear stories about other pandas getting rich from bamboo investments. Everyone wants to get rich quick! They buy, buy, buy without thinking carefully.",
            "This creates a 'Bull Market' where prices go up and up. But sometimes they go up too much, too fast - like a bamboo bubble that eventually pops!"
          ]
        },
        {
          title: "Reading the Forest's Emotions",
          content: [
            "🔍 Smart pandas like me learn to read the forest's emotions. We look for clues about how other pandas are feeling:",
            "📰 News and Rumors: Good news makes pandas happy and willing to buy. Bad news makes them scared and eager to sell. But sometimes pandas overreact to news!",
            "📊 Trading Volume: When lots of pandas are buying and selling (high volume), it means strong emotions are involved. Low volume might mean pandas are calm or uncertain.",
            "💭 Social Media and Forums: Just like human investors, pandas talk online about their investments. We can sense if the mood is positive or negative by listening to panda chatter!"
          ]
        }
      ]
    },
    'weather-forecasting': {
      chapters: [
        {
          title: "Phil's Weather Station",
          content: [
            "🌤️ Welcome to my weather prediction academy! Just like meteorologists predict rain and sunshine, smart pandas like me try to predict what will happen to bamboo prices in the future.",
            "Forecasting in investing is like predicting the weather - we look at patterns, use tools and data, and make educated guesses. But just like weather forecasts, we're not always 100% right!",
            "Today I'll teach you the tools and techniques I use to peer into the future of bamboo markets. Remember, the goal isn't to be perfect, but to be right more often than we're wrong!"
          ]
        },
        {
          title: "Reading the Economic Weather Patterns",
          content: [
            "📊 Just like I watch cloud formations to predict rain, I watch economic 'formations' to predict market movements.",
            "Economic indicators are like weather instruments: GDP growth (temperature of the economy), unemployment rates (storm warnings), inflation (pressure changes), and interest rates (wind direction).",
            "When these indicators show the economy heating up, bamboo companies usually do well. When they show cooling or storms ahead, it might be time to be more careful with investments.",
            "I also watch seasonal patterns - just like bamboo grows better in certain seasons, some investments do better at certain times of the year!"
          ]
        },
        {
          title: "Technical Analysis: Reading the Bamboo Charts",
          content: [
            "📈 Now let me show you something really cool - price charts! These are like tracking the growth patterns of bamboo over time.",
            "Technical analysis is like being a bamboo growth detective. I look at how prices moved in the past to guess where they might go next. Prices often make patterns, just like bamboo grows in predictable ways!",
            "Some patterns I watch for: 'Support levels' (like the minimum height bamboo usually grows), 'Resistance levels' (like a ceiling bamboo struggles to break through), and 'Trends' (the general direction - up, down, or sideways).",
            "Moving averages help me see the big picture - it's like looking at average bamboo growth over different time periods to smooth out daily ups and downs."
          ]
        },
        {
          title: "Fundamental Forecasting",
          content: [
            "🔍 While technical analysis looks at price patterns, fundamental forecasting looks at the actual business - like examining the roots and soil of bamboo groves.",
            "I research: How fast is the company growing? Are they making more money each year? Do they have new products coming out? Are they expanding to new forests?",
            "Industry trends matter too - is the whole bamboo industry growing? Are there new technologies that might help or hurt bamboo companies? What about competition from other food sources?",
            "Economic forecasting helps me understand the big picture: Will pandas have more money to spend? Are interest rates going up or down? These macro factors affect all bamboo investments."
          ]
        },
        {
          title: "Putting It All Together",
          content: [
            "🎯 The best forecasting combines multiple approaches - like using both satellite images AND ground sensors to predict weather!",
            "I use technical analysis for timing (when to buy or sell), fundamental analysis for selection (which bamboo stocks to choose), and economic analysis for context (understanding the big picture).",
            "Remember: forecasting is about probabilities, not certainties. I might say 'there's a 70% chance bamboo prices will rise in the next month' rather than 'prices will definitely go up.'",
            "The key is being prepared for different scenarios. Smart pandas always have a plan for what to do if they're wrong, just like carrying an umbrella even when the forecast says sunny!"
          ]
        }
      ]
    },
    'panda-economics': {
      chapters: [
        {
          title: "Welcome to Panda Valley Economy",
          content: [
            "🏔️ Welcome to the grand tour of Panda Valley's economy! I'm Phil, your economic guide, and today we'll explore how our entire valley's financial system works together.",
            "Think of our valley's economy like a giant ecosystem where everything is connected. The bamboo farms, panda employment, banks, shops, and even the weather all affect each other in fascinating ways!",
            "Understanding economics helps us make better decisions about saving, spending, and investing. It's like understanding how all the parts of our forest work together to keep everyone happy and fed."
          ]
        },
        {
          title: "The Bamboo Supply Chain Empire",
          content: [
            "🎋 Let's start with bamboo - the foundation of our valley's economy! From seed to your dinner plate, bamboo goes through an amazing journey.",
            "First, farmer pandas plant and grow bamboo using land, seeds, water, and their hard work. Then harvester pandas collect the bamboo and transport it to processing facilities where it's cleaned and packaged.",
            "Next, distributor pandas move the bamboo to stores throughout the valley. Finally, retail pandas sell it to families like yours! Each step creates jobs and adds value.",
            "When bamboo is abundant and cheap, pandas have more money for other things. When it's scarce and expensive, families must spend more on food and less on entertainment or savings."
          ]
        },
        {
          title: "Panda Employment and the Labor Market",
          content: [
            "👷 Every adult panda in our valley has a role in keeping our economy running smoothly. Some are bamboo farmers, others are teachers, builders, doctors, or shopkeepers.",
            "When businesses are doing well, they hire more pandas (low unemployment). This means more pandas have paychecks to spend, which helps other businesses succeed too - it's a happy cycle!",
            "But sometimes businesses struggle and have to let pandas go (high unemployment). This means fewer pandas can afford to buy things, which can make other businesses struggle too.",
            "The Panda Valley Employment Office tracks how many pandas are working versus looking for work. This 'unemployment rate' tells us a lot about our economy's health."
          ]
        },
        {
          title: "The Central Bank of Panda Valley",
          content: [
            "🏛️ At the heart of our valley sits the Central Bank of Panda Valley, run by the wisest pandas who make important decisions that affect everyone's money.",
            "One of their biggest jobs is setting 'interest rates' - this is like the price of borrowing money. When rates are low, it's cheap for pandas and businesses to borrow money for houses, cars, or expanding businesses.",
            "When too many pandas are borrowing and spending (causing inflation - prices going up everywhere), the Central Bank raises interest rates to cool things down. When the economy is slow, they lower rates to encourage spending.",
            "They also control how much money is in our valley's system. Too much money can cause inflation (everything gets more expensive). Too little money can cause deflation (everything gets cheaper, but pandas lose jobs)."
          ]
        },
        {
          title: "Global Trade and Panda Valley",
          content: [
            "🌍 Our Panda Valley doesn't exist in isolation - we trade with other valleys and regions around the world! This global connection brings both opportunities and challenges.",
            "We export our premium bamboo to other valleys that don't grow it as well. We import things we can't make ourselves, like certain fruits, metals for tools, and technologies.",
            "When other valleys' economies are strong, they buy more of our bamboo exports, bringing money into our valley. When they struggle, demand for our exports falls, affecting our bamboo farmers and related businesses.",
            "Exchange rates matter too - this is like the 'price' of our valley's currency compared to other valleys' currencies. A strong Panda Dollar means our exports cost more for others to buy, but imports are cheaper for us."
          ]
        },
        {
          title: "Economic Cycles and Your Future",
          content: [
            "📊 Economies naturally go through cycles - periods of growth (expansion) followed by periods of slowing down (recession), then recovery and growth again.",
            "During expansions, businesses grow, pandas find jobs easily, and investments often do well. During recessions, the opposite happens - but these tough times also create opportunities for smart, patient pandas.",
            "Understanding these cycles helps us make better decisions: saving more during good times to prepare for tough times, and recognizing opportunities during downturns when others are too scared to act.",
            "Remember, economics affects every aspect of our lives - from job opportunities to the price of bamboo to investment returns. The more you understand these connections, the better financial decisions you'll make throughout your life!"
          ]
        }
      ]
    }
  };

  const currentStory = storyData[adventure.id as keyof typeof storyData];
  const currentChapter = currentStory.chapters[currentChapterIndex];
  const canProceed = completedQuizzes.has(currentChapterIndex);

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    updateQuizScore(topicId, isCorrect);
    if (isCorrect) {
      setCompletedQuizzes(prev => new Set([...prev, currentChapterIndex]));
    }
  };

  const handleNext = () => {
    if (canProceed && currentChapterIndex < currentStory.chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  return (
    <div className={`space-y-6 ${isMobile ? 'px-2' : ''}`}>
      <StoryProgress 
        currentChapter={currentChapterIndex}
        totalChapters={currentStory.chapters.length}
        adventureTitle={adventure.title}
      />

      <StoryChapter 
        chapter={currentChapter}
        chapterIndex={currentChapterIndex}
      />

      <InteractiveQuiz
        topicId={`${adventure.id}-chapter-${currentChapterIndex}`}
        question="What did you learn from this chapter?"
        options={[
          "I understand the main concept explained",
          "I need to review this chapter again",
          "I'm ready to move on to the next topic",
          "I found this very helpful"
        ]}
        correctAnswerIndex={0}
        feedbackForIncorrect="Take your time to review the chapter content. Phil's lessons are designed to help you understand step by step!"
        onQuizComplete={handleQuizComplete}
        isCompleted={completedQuizzes.has(currentChapterIndex)}
      />

      <StoryNavigation
        currentChapterIndex={currentChapterIndex}
        totalChapters={currentStory.chapters.length}
        canProceed={canProceed}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onBack={onBack}
      />
    </div>
  );
};

export default StoryReader;
