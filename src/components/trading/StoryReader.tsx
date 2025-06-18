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

  // Create different stories based on adventure ID
  const getStoryChapters = (adventureId: string): StoryChapter[] => {
    switch (adventureId) {
      case 'bamboo-business':
        return [
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

      case 'forest-sentiment':
        return [
          {
            id: 1,
            title: "The Day the Forest Went Crazy",
            content: `Phil was having a perfectly normal day, munching on his favorite bamboo when suddenly, CHAOS! All the pandas in the forest started running around frantically. Some were shouting "SELL ALL THE BAMBOO!" while others screamed "BUY EVERYTHING!"

"What's happening?" Phil asked his friend Mei, who was frantically digging holes to bury her bamboo stash.

"Haven't you heard?" Mei panted. "Old Panda Wu sneezed three times this morning! You know what that means!"

Phil scratched his head. "That he has allergies?"

"NO!" Mei exclaimed. "It's a sign that bamboo prices will crash! Everyone's selling!"

But then Phil noticed something odd. While everyone was panicking about Wu's sneeze, the bamboo groves themselves looked exactly the same as yesterday. The soil was still rich, the water still flowed, and the bamboo was still growing strong.

Phil realized he was witnessing something called "market sentiment" - when emotions, not facts, drive everyone's decisions.`,
            illustration: "😱🐼📈📉",
            keyLearning: "Market sentiment can cause prices to move independently of actual fundamentals - emotions often override logic in the short term.",
            quiz: {
              question: "What caused the pandas to panic in Phil's story?",
              options: ["Bad bamboo harvest", "Wu sneezed three times", "A real economic crisis", "Bamboo shortage"],
              correctAnswer: 1,
              explanation: "The pandas panicked because Wu sneezed three times, showing how market sentiment can be driven by irrelevant events rather than real fundamentals."
            }
          },
          {
            id: 2,
            title: "Phil Learns About Fear and Greed",
            content: `The next week, the exact opposite happened. Panda Lin found a single extra-large bamboo shoot, and word spread like wildfire. "HUGE BAMBOO DISCOVERY!" pandas shouted. "BUY EVERYTHING!"

Now everyone wanted to buy bamboo, driving prices sky-high. Phil watched as pandas paid 10 times the normal price for ordinary bamboo, convinced they were getting rich quick.

"This is madness!" Phil thought. "Yesterday they were selling perfectly good bamboo for almost nothing because of a sneeze, and today they're paying crazy prices for normal bamboo because of one lucky find!"

Phil's wise grandmother pulled him aside. "Young Phil," she said, "the forest has two powerful spirits that control most pandas: Fear and Greed. When Fear visits, everyone wants to sell everything. When Greed visits, everyone wants to buy everything. The wise panda learns to think when others are feeling."

Phil nodded. "So when everyone is fearful, it might be a good time to buy? And when everyone is greedy, it might be time to be careful?"

"Exactly," Grandma smiled. "Be fearful when others are greedy, and greedy when others are fearful."`,
            illustration: "😨💰🐼🧠",
            keyLearning: "Fear and greed drive market cycles - successful investors often do the opposite of what the crowd is doing.",
            quiz: {
              question: "According to Phil's grandmother, when should you be greedy?",
              options: ["When others are greedy", "When others are fearful", "When bamboo is expensive", "When everyone is buying"],
              correctAnswer: 1,
              explanation: "Phil's grandmother taught him to 'be greedy when others are fearful' - meaning look for opportunities when others are selling in panic."
            }
          },
          {
            id: 3,
            title: "The Great Bamboo Bubble",
            content: `Months later, Phil witnessed the strangest thing yet. A rumor started that purple bamboo (which didn't even exist) would soon grow in the forest. Somehow, pandas began trading regular bamboo claiming it would turn purple!

Prices went absolutely crazy. Pandas who had never even tasted bamboo were borrowing honey to buy "future purple bamboo." Phil's neighbor sold his house to buy bamboo seeds, convinced he'd become the richest panda in history.

"But there's no such thing as purple bamboo," Phil told anyone who would listen. Nobody cared. The FOMO (Fear of Missing Out) was too strong.

Then one day, reality hit. Someone asked, "Where exactly is this purple bamboo?" Nobody had an answer. The spell broke. Prices crashed harder than a sleepy panda falling from a tree.

Phil watched sadly as many of his friends lost their savings. "The market can stay irrational longer than you can stay rational," his grandmother had warned him. Phil learned that bubbles happen when prices become completely disconnected from reality, driven by pure emotion and speculation.`,
            illustration: "💜🎈💥🐼",
            keyLearning: "Market bubbles form when prices become disconnected from reality, driven by speculation and FOMO rather than fundamentals.",
            quiz: {
              question: "What created the bamboo bubble in Phil's story?",
              options: ["Real purple bamboo discovery", "Government announcement", "Rumors and speculation", "Actual bamboo shortage"],
              correctAnswer: 2,
              explanation: "The bubble was created by rumors and speculation about purple bamboo that didn't even exist, showing how markets can become disconnected from reality."
            }
          },
          {
            id: 4,
            title: "Phil Becomes a Sentiment Detective",
            content: `After learning about fear, greed, and bubbles, Phil decided to become a "sentiment detective." He developed ways to figure out what the forest was really feeling, beyond the noise.

Phil started watching specific signs: How many pandas were at the bamboo markets vs. at home? Were pandas talking about get-rich-quick schemes, or were they focused on long-term grove health? Were experienced old pandas buying or selling?

He created his own "Forest Fear & Greed Index." When young pandas were giving bamboo advice to elder pandas, when everyone was borrowing to buy bamboo, and when pandas quit their day jobs to become "bamboo traders," Phil knew greed was at dangerous levels.

Conversely, when pandas wouldn't even look at bamboo groves, when good bamboo sold for cheap, and when everyone said "bamboo will never grow again," Phil knew fear had taken over.

Phil learned that being aware of market sentiment helped him make better decisions. He didn't fight the sentiment, but he didn't let it control him either. Instead, he used it as one more piece of information in his decision-making process.

"The market is a voting machine in the short run," he remembered reading, "but a weighing machine in the long run."`,
            illustration: "🕵️🐼📊💭",
            keyLearning: "Successful investors monitor market sentiment as a contrarian indicator, using crowd emotions as valuable information for timing decisions.",
            quiz: {
              question: "What should high levels of greed in the market indicate to a smart investor?",
              options: ["Time to buy more", "Time to be cautious", "Time to follow the crowd", "Time to panic"],
              correctAnswer: 1,
              explanation: "High greed levels often indicate market tops, so smart investors become cautious when everyone else is euphoric."
            }
          }
        ];

      case 'weather-forecasting':
        return [
          {
            id: 1,
            title: "Phil's First Weather Prediction Disaster",
            content: `Phil decided to become the forest's weather predictor after getting caught in three surprise rainstorms in one week. "How hard can it be?" he thought, looking at the sunny sky.

"Tomorrow will be sunny!" Phil announced confidently to all the forest animals. He based this prediction on one simple fact: today was sunny.

The next day brought the biggest thunderstorm the forest had seen in months. Phil was soaked, embarrassed, and realized he knew absolutely nothing about weather forecasting.

"Predicting is harder than it looks," laughed Oliver, the old wise panda. "You can't just look at today and assume tomorrow will be the same. Weather has patterns, cycles, and many variables that interact in complex ways."

Oliver continued, "It's just like predicting stock prices or economic trends. You need to look at multiple indicators, understand cycles, and know that sometimes even the best predictions are wrong."

Phil nodded, dripping wet. "So where do I start?"

"With humility," Oliver smiled. "And by learning to read the signs that actually matter."`,
            illustration: "🌦️🐼🔮❌",
            keyLearning: "Forecasting requires understanding multiple variables and their interactions - simple extrapolation from current conditions usually fails.",
            quiz: {
              question: "What was Phil's mistake in his first weather prediction?",
              options: ["He ignored the clouds", "He only looked at one day's weather", "He didn't check the forecast", "He predicted rain instead of sun"],
              correctAnswer: 1,
              explanation: "Phil's mistake was assuming tomorrow would be like today - he only looked at one data point instead of considering multiple indicators and patterns."
            }
          },
          {
            id: 2,
            title: "Learning to Read the Wind",
            content: `Oliver began Phil's forecasting education with the basics: "The wind tells stories, Phil. You just need to learn its language."

"When the wind shifts from south to north, it often brings cooler air. When it comes from the east in the morning, afternoon storms are likely. When the wind dies completely on a humid day, a big storm is brewing."

Phil practiced feeling the wind direction and strength throughout each day, noting patterns. He discovered that subtle changes hours earlier often predicted major weather shifts.

"This is like economic indicators!" Phil realized. "Interest rate changes, employment numbers, and consumer spending are like wind shifts - they give clues about where the economic weather is heading."

Oliver nodded approvingly. "Exactly! Leading indicators help predict future conditions. But remember, Phil - the wind can lie sometimes. Always look for confirmation from other signals."

Phil learned to watch not just the wind, but also how the forest animals behaved, the color and movement of clouds, and the feel of the air. Each indicator told part of the story.`,
            illustration: "🌪️🐼📖🎯",
            keyLearning: "Leading indicators provide early signals about future trends, but multiple indicators should be used for confirmation.",
            quiz: {
              question: "Why does Oliver say to look for confirmation from other signals?",
              options: ["Wind never changes", "Single indicators can be misleading", "Animals are always right", "Clouds are unreliable"],
              correctAnswer: 1,
              explanation: "Single indicators can be misleading, so successful forecasters use multiple indicators to confirm their predictions."
            }
          },
          {
            id: 3,
            title: "The Art of Probability Thinking",
            content: `After weeks of practice, Phil was getting better at weather prediction, but he was still frustrated when he was wrong. "Why can't I be right 100% of the time?" he complained.

Oliver chuckled. "Phil, even the best weather forecasters are only right about 70-80% of the time for next-day predictions. And for longer forecasts? Even less."

"But that seems terrible!" Phil protested.

"Not at all," Oliver explained. "Think in probabilities, not certainties. Instead of saying 'It will rain tomorrow,' say 'There's a 70% chance of rain tomorrow.' This way, you acknowledge uncertainty and make better decisions."

Phil learned to express his forecasts as probabilities: "60% chance of sunshine," "80% chance of afternoon storms," "30% chance of overnight frost."

"This is revolutionary!" Phil exclaimed. "Instead of being wrong when my prediction doesn't happen, I'm just dealing with the percentage that didn't occur!"

Oliver smiled. "And this is exactly how smart investors think about markets. They don't predict with certainty - they assess probabilities and manage risk accordingly."`,
            illustration: "🎲🐼📊🤔",
            keyLearning: "Successful forecasting involves thinking in probabilities rather than certainties, which allows for better risk management.",
            quiz: {
              question: "What's the advantage of thinking in probabilities rather than certainties?",
              options: ["You're always right", "You acknowledge uncertainty and manage risk better", "Predictions become easier", "You never need to update forecasts"],
              correctAnswer: 1,
              explanation: "Thinking in probabilities acknowledges uncertainty and allows for better decision-making and risk management."
            }
          },
          {
            id: 4,
            title: "Seasonal Patterns and Cycles",
            content: `As Phil's skills improved, Oliver taught him about larger patterns. "Weather isn't random, Phil. There are cycles within cycles. Daily cycles, seasonal cycles, and even longer patterns."

Phil learned that spring brought predictable warming trends, summer had typical afternoon thunderstorm patterns, autumn brought cooling and increased wind, and winter had its own rhythm.

"But here's the key," Oliver emphasized, "cycles give you the framework, but each year is still unique. This spring might be warmer or cooler than average. This summer might have more or fewer storms."

Phil discovered how to use historical patterns as a baseline, then adjust based on current conditions. "It's like economic cycles!" he realized. "There are typical patterns for recessions and recoveries, but each one is unique based on the specific conditions of that time."

Oliver nodded. "Exactly! Understanding cycles helps you prepare for what's likely to come, but you must always stay flexible and adapt to current reality."

Phil began making seasonal forecasts: "This summer will likely be 10% wetter than average, with most rain coming in late afternoon storms." He was learning to blend historical patterns with current indicators.`,
            illustration: "🔄🐼🌸❄️",
            keyLearning: "Cycles provide a framework for forecasting, but each situation is unique and requires adaptation to current conditions.",
            quiz: {
              question: "How should historical patterns be used in forecasting?",
              options: ["As exact predictions", "As a baseline adjusted for current conditions", "They should be ignored", "Only for short-term forecasts"],
              correctAnswer: 1,
              explanation: "Historical patterns provide a baseline framework, but must be adjusted based on current unique conditions."
            }
          },
          {
            id: 5,
            title: "When Forecasts Fail",
            content: `One day, despite all his learning and careful analysis, Phil predicted sunny weather but got caught in an unexpected blizzard. All his indicators had pointed to clear skies, but nature had other plans.

Shivering and confused, Phil found Oliver, who was calmly sitting under shelter. "I don't understand!" Phil complained. "All my indicators were right, I used probabilities, I checked multiple signals - why was I so wrong?"

Oliver smiled warmly. "Phil, this is the most important lesson of all. Sometimes, despite perfect analysis, unexpected events happen. Black swans, as they're called. Your job isn't to predict these perfectly - it's to be prepared for them."

"How do I prepare for the unpredictable?" Phil asked.

"Always have a backup plan," Oliver explained. "When I go out, I carry rain gear even when forecasting sunny weather. When investors buy stocks, they use stop-losses even when they're confident. When pandas store bamboo, they diversify locations even when they trust their main storage."

Phil learned that the best forecasters aren't those who are right most often - they're those who survive and thrive even when they're wrong. Risk management became as important as prediction accuracy in Phil's toolkit.`,
            illustration: "🌨️🐼🛡️⚡",
            keyLearning: "The best forecasters prepare for being wrong through risk management and contingency planning, not just accuracy.",
            quiz: {
              question: "What's the most important lesson when forecasts fail?",
              options: ["Give up forecasting", "Try harder to be accurate", "Always have backup plans and risk management", "Blame the data"],
              correctAnswer: 2,
              explanation: "The key lesson is to always have backup plans and risk management strategies for when forecasts inevitably fail."
            }
          },
          {
            id: 6,
            title: "Phil's Forecasting Mastery",
            content: `After a year of learning, Phil had become the forest's most trusted weather forecaster. But his success wasn't because he was always right - it was because of how he approached forecasting.

Phil's method had five key principles:
1. Use multiple indicators, never rely on just one signal
2. Think in probabilities, not certainties
3. Understand cycles but adapt to current conditions
4. Always have contingency plans for when you're wrong
5. Continuously learn and update your methods

"The goal isn't to predict the future perfectly," Phil would tell other pandas. "The goal is to make better decisions under uncertainty."

Phil's weather reports became famous throughout the forest: "Tomorrow has a 70% chance of sunshine with possible afternoon clouds. Recommended actions: Plan outdoor activities for morning, carry light rain gear as backup."

Other pandas started asking Phil to forecast bamboo market trends, population cycles, and forest health. Phil realized that forecasting principles applied far beyond weather - they were tools for thinking about any uncertain future.

"Whether you're predicting weather, markets, or life changes," Phil would say, "the process is the same: gather information, assess probabilities, plan for multiple scenarios, and stay humble about what you don't know."`,
            illustration: "🎓🐼🔮✨",
            keyLearning: "Mastery in forecasting comes from having a systematic process that manages uncertainty rather than eliminating it.",
            quiz: {
              question: "What makes Phil a successful forecaster?",
              options: ["He's always right", "He has a systematic process for managing uncertainty", "He only makes short-term predictions", "He avoids making predictions"],
              correctAnswer: 1,
              explanation: "Phil's success comes from having a systematic process that manages uncertainty through multiple indicators, probabilities, and risk management."
            }
          }
        ];

      case 'panda-economics':
        return [
          {
            id: 1,
            title: "Phil Discovers the Great Panda Valley Economy",
            content: `Phil had always lived in his small bamboo grove, never thinking much about the bigger picture. But one day, his friend Maya returned from a journey to other parts of Panda Valley with shocking news.

"Phil, you won't believe what I've learned!" Maya exclaimed. "Our little grove is just one tiny part of a HUGE economic system! There are thousands of pandas, hundreds of bamboo farms, panda banks, bamboo processing factories, and even a Panda Central Bank that controls the whole valley's money supply!"

Phil was amazed. "You mean there's more to the economy than just growing and eating bamboo?"

Maya nodded enthusiastically. "So much more! There are pandas who specialize in bamboo cultivation, others who transport it, some who process it into different products, pandas who lend honey (which serves as money), and even pandas who create tools and technology to make everything more efficient!"

Phil realized he'd been thinking too small. The economy wasn't just about individual pandas and their bamboo - it was a vast, interconnected web where everyone's actions affected everyone else.

"I need to understand this bigger picture," Phil decided. "How does it all fit together?"`,
            illustration: "🐼🌍💰🔗",
            keyLearning: "Economies are complex, interconnected systems where individual actions create ripple effects throughout the entire network.",
            quiz: {
              question: "What did Phil realize about the economy?",
              options: ["It's just about bamboo", "It's a vast interconnected system", "Only banks matter", "Individual actions don't matter"],
              correctAnswer: 1,
              explanation: "Phil realized the economy is a vast, interconnected system where everyone's actions affect everyone else, not just individual bamboo trading."
            }
          },
          {
            id: 2,
            title: "The Flow of Honey Money",
            content: `Maya took Phil to visit the Panda Central Bank, where Governor Panda Wise explained how money flowed through their economy.

"You see, Phil," Governor Wise began, "honey serves as our money. When we print more honey tokens, there's more money in circulation. When pandas have more money, they spend more on bamboo, tools, and services."

Phil watched as Governor Wise showed him charts of money flow. "When the Central Bank lowers interest rates, it becomes cheaper for pandas to borrow honey. This encourages spending and investment. When we raise rates, borrowing becomes more expensive, which slows down spending."

"But why would you want to slow down spending?" Phil asked.

"Great question!" Governor Wise smiled. "Sometimes the economy gets too hot - too much money chasing too few bamboo stalks drives prices up rapidly. That's inflation. By raising rates, we cool things down. But if we're too aggressive, pandas stop spending altogether and the economy shrinks. That's recession."

Phil was fascinated. "So you're like the thermostat for the whole valley's economy?"

"Exactly! We try to keep economic temperature just right - not too hot, not too cold. It's called monetary policy, and it affects every panda in the valley."`,
            illustration: "🍯💰🌡️🏦",
            keyLearning: "Central banks control money supply and interest rates to manage economic temperature, balancing growth with price stability.",
            quiz: {
              question: "Why might a central bank raise interest rates?",
              options: ["To increase spending", "To lower unemployment", "To cool down inflation", "To print more money"],
              correctAnswer: 2,
              explanation: "Central banks raise interest rates to cool down inflation when too much money is chasing too few goods, driving prices up too rapidly."
            }
          },
          {
            id: 3,
            title: "Supply, Demand, and the Great Bamboo Shortage",
            content: `Just as Phil was getting comfortable with monetary policy, a crisis hit Panda Valley. A bamboo disease wiped out 30% of the valley's bamboo crops overnight.

Phil watched in amazement as bamboo prices skyrocketed. "Why are prices going up so fast?" he asked Maya.

"Supply and demand!" Maya explained. "There's now much less bamboo available (supply dropped), but pandas still need the same amount to eat (demand stayed the same). When supply is low and demand is high, prices go up."

But then Phil noticed something interesting. As bamboo prices rose, several things happened:
- Pandas started eating less bamboo and more berries and nuts
- Some pandas began growing bamboo in their backyards
- Entrepreneurs started importing bamboo from neighboring valleys
- Scientists worked harder on developing disease-resistant bamboo

"Look!" Phil exclaimed. "High prices are solving the shortage! They're encouraging people to use less, produce more, and find alternatives!"

Maya nodded. "That's the magic of price signals in a market economy. Prices automatically coordinate millions of individual decisions without anyone being in charge of the whole system."

Within months, the crisis had passed. New supply sources emerged, demand had adjusted, and prices stabilized at a new level.`,
            illustration: "📊🐼🌿⚖️",
            keyLearning: "Price signals in free markets automatically coordinate supply and demand, encouraging conservation, production, and innovation.",
            quiz: {
              question: "How did high bamboo prices help solve the shortage?",
              options: ["Government intervention", "They encouraged less consumption and more production", "Prices don't affect behavior", "Only the Central Bank could fix it"],
              correctAnswer: 1,
              explanation: "High prices encouraged pandas to consume less, produce more, find alternatives, and innovate - automatically coordinating the response to shortage."
            }
          },
          {
            id: 4,
            title: "The Business Cycle Rollercoaster",
            content: `Over the next few years, Phil observed that Panda Valley's economy seemed to go through regular cycles, like seasons but longer and less predictable.

"First, there's expansion," Maya explained as they watched a period of growth. "Pandas are optimistic, spending increases, businesses grow, unemployment falls, and new pandas move to the valley seeking opportunities."

Phil noticed more construction, busier markets, and generally happy pandas during these times.

"But then," Maya continued, "expansion can turn into euphoria. Pandas start speculating, borrowing too much, and prices for everything rise rapidly. This creates imbalances."

Phil watched as some pandas borrowed heavily to buy bamboo farms at inflated prices, convinced prices would only go up.

"Then comes the correction," Maya said sadly. "Reality hits, spending slows, businesses cut back, unemployment rises, and the economy contracts. This is recession."

During recession, Phil saw empty shops, worried pandas, and reduced activity throughout the valley.

"But here's the important part," Maya emphasized. "After recession comes recovery. Pandas adjust, inefficient businesses close, productive ones survive and grow stronger, and eventually expansion begins again."

Phil realized: "So the business cycle is like the valley breathing - expansion and contraction are both natural parts of economic life!"`,
            illustration: "🎢🐼📈📉",
            keyLearning: "Business cycles of expansion and contraction are natural features of economies, driven by psychology, debt, and adjustment processes.",
            quiz: {
              question: "What typically happens during the recession phase of the business cycle?",
              options: ["Rapid expansion", "Spending slows and unemployment rises", "Inflation accelerates", "Everyone gets richer"],
              correctAnswer: 1,
              explanation: "During recession, spending slows, businesses cut back, and unemployment rises as the economy contracts and adjusts."
            }
          },
          {
            id: 5,
            title: "Globalization and the Wider World",
            content: `One day, strange pandas appeared in the valley - they looked different and spoke with accents. "We're from Bear Mountain Valley," they explained. "We've come to trade!"

Phil was fascinated. These pandas grew different varieties of bamboo, made tools the local pandas had never seen, and wanted to buy honey and traditional Panda Valley crafts.

"This is globalization," Maya explained. "When different economic regions connect and trade with each other."

Phil watched as amazing things happened:
- Panda Valley got access to new bamboo varieties and tools
- Bear Mountain pandas loved Panda Valley honey and crafts
- Both valleys specialized in what they did best
- Everyone had more choices and lower prices

But not everything was positive. Some local bamboo growers struggled to compete with cheaper Bear Mountain bamboo. Some traditional craft makers lost business to mass-produced Bear Mountain goods.

"Globalization creates winners and losers," Maya noted. "Overall, both valleys benefit, but some individuals face challenges."

Phil learned about comparative advantage - how each region could benefit by specializing in what they did relatively better, even if one region was better at everything.

The valley government had to help displaced workers retrain for new jobs and ensure the benefits of trade were shared more broadly.`,
            illustration: "🌍🐼🤝🌉",
            keyLearning: "Globalization allows regions to specialize and trade based on comparative advantage, creating overall benefits but requiring adjustment support.",
            quiz: {
              question: "What is comparative advantage in trade?",
              options: ["Being better at everything", "Specializing in what you do relatively better", "Having more money", "Avoiding all trade"],
              correctAnswer: 1,
              explanation: "Comparative advantage means specializing in what you do relatively better, even if other regions are absolutely better at everything."
            }
          },
          {
            id: 6,
            title: "Technology and Economic Transformation",
            content: `Phil's world changed dramatically when a genius panda named Edison invented the bamboo-processing machine. This device could process bamboo 10 times faster than paws alone.

"This will put all the bamboo processors out of work!" worried some pandas. But Phil observed something different happening.

Initially, yes, some traditional processors lost their jobs. But the machine made bamboo products so much cheaper that demand exploded. New jobs emerged: machine operators, maintenance pandas, designers of new bamboo products, and even bamboo-machine teachers.

"It's creative destruction," Maya explained. "Technology destroys some old jobs but creates new ones, usually making everyone better off in the long run."

Phil watched as living standards rose throughout the valley. Pandas could afford more and better bamboo products. They had more time for education, arts, and leisure because basic needs were met more efficiently.

But the transition wasn't easy for everyone. Older pandas especially struggled to learn new skills. The valley had to invest in education and retraining programs.

"Technology doesn't just change what we do," Phil realized. "It changes how we live, what skills we need, and even what kinds of lives are possible."

Phil understood that economic progress often meant difficult transitions, but led to higher living standards and new opportunities that previous generations couldn't imagine.`,
            illustration: "🤖🐼⚙️✨",
            keyLearning: "Technology creates 'creative destruction' - eliminating old jobs while creating new ones and raising overall living standards.",
            quiz: {
              question: "What is 'creative destruction'?",
              options: ["Technology only destroys jobs", "Technology destroys old jobs but creates new ones", "Nothing ever changes", "Only destruction occurs"],
              correctAnswer: 1,
              explanation: "Creative destruction means technology destroys old jobs and ways of doing things while creating new opportunities and raising living standards."
            }
          },
          {
            id: 7,
            title: "Phil Becomes an Economic Citizen",
            content: `After learning about all these economic forces, Phil felt both excited and overwhelmed. "How do I make sense of all this as just one panda?" he asked Maya.

Maya smiled. "Remember, Phil, you're not just observing the economy - you're part of it! Every decision you make as a consumer, worker, saver, and voter affects the whole system."

Phil realized his role as an economic citizen:

As a consumer, his spending decisions signaled what products were valuable. As a worker, he contributed skills and labor. As a saver and investor, he provided capital for businesses to grow. As a voter, he influenced policies that shaped the economic framework.

"The economy isn't something that happens to you," Maya emphasized. "It's something you participate in creating every day."

Phil learned to think about his decisions more broadly:
- When choosing where to spend money, he considered supporting businesses aligned with his values
- When developing skills, he thought about both personal interest and economic demand
- When saving and investing, he balanced personal returns with supporting productive enterprises
- When voting, he considered long-term economic health, not just short-term benefits

"The most important economic skill," Phil concluded, "isn't predicting what will happen. It's understanding how the system works so you can make better decisions and adapt to change."

Phil had become an informed economic citizen, ready to thrive in Panda Valley's dynamic economy.`,
            illustration: "🎓🐼🗳️🌟",
            keyLearning: "Economic citizenship means understanding your role as consumer, worker, saver, and voter in shaping the economic system you participate in.",
            quiz: {
              question: "What does it mean to be an economic citizen?",
              options: ["Just earning money", "Understanding and actively participating in the economic system", "Only voting", "Avoiding all economic decisions"],
              correctAnswer: 1,
              explanation: "Economic citizenship means understanding how the economy works and actively participating through informed decisions as consumer, worker, saver, and voter."
            }
          }
        ];

      default:
        return [];
    }
  };

  const storyChapters = getStoryChapters(adventure.id);
  const currentStory = storyChapters[currentChapter];
  const progress = ((currentChapter + 1) / storyChapters.length) * 100;

  const handleQuizComplete = (quizId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCompletedQuizzes(prev => new Set([...prev, currentChapter]));
    }
  };

  const canProceed = currentStory?.quiz ? completedQuizzes.has(currentChapter) : true;

  if (!currentStory) {
    return (
      <div className="text-center p-8">
        <p>Story content coming soon!</p>
        <Button onClick={onBack} className="mt-4">Back to Adventures</Button>
      </div>
    );
  }

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
