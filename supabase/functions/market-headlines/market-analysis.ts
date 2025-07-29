
import { ProcessedHeadline, MarketRecap } from './types.ts';

interface TopicAnalysis {
  tech: number;
  finance: number;
  energy: number;
  healthcare: number;
  retail: number;
  crypto: number;
  general: number;
}

interface SentimentAnalysis {
  positive: number;
  negative: number;
  neutral: number;
}

export function generateMarketRecap(headlines: ProcessedHeadline[], userLevel: string = 'beginner'): MarketRecap {
  const topics: TopicAnalysis = {
    tech: 0,
    finance: 0,
    energy: 0,
    healthcare: 0,
    retail: 0,
    crypto: 0,
    general: 0
  };
  
  const sentiments: SentimentAnalysis = {
    positive: 0,
    negative: 0,
    neutral: 0
  };
  
  headlines.forEach(headline => {
    const titleLower = headline.title.toLowerCase();
    const summaryLower = headline.summary.toLowerCase();
    const content = titleLower + ' ' + summaryLower;
    
    // Categorize by sector
    if (content.includes('tech') || content.includes('technology') || content.includes('ai') || content.includes('software') || content.includes('cloud')) {
      topics.tech++;
    } else if (content.includes('bank') || content.includes('fed') || content.includes('interest') || content.includes('finance') || content.includes('monetary')) {
      topics.finance++;
    } else if (content.includes('oil') || content.includes('energy') || content.includes('renewable') || content.includes('gas') || content.includes('crude')) {
      topics.energy++;
    } else if (content.includes('health') || content.includes('pharma') || content.includes('drug') || content.includes('medical')) {
      topics.healthcare++;
    } else if (content.includes('retail') || content.includes('consumer') || content.includes('sales') || content.includes('shopping')) {
      topics.retail++;
    } else if (content.includes('crypto') || content.includes('bitcoin') || content.includes('digital asset') || content.includes('blockchain')) {
      topics.crypto++;
    } else {
      topics.general++;
    }
    
    // Analyze sentiment
    if (content.includes('gain') || content.includes('rise') || content.includes('up') || content.includes('positive') || content.includes('growth') || content.includes('strong') || content.includes('robust')) {
      sentiments.positive++;
    } else if (content.includes('fall') || content.includes('decline') || content.includes('down') || content.includes('negative') || content.includes('loss') || content.includes('weak') || content.includes('concern')) {
      sentiments.negative++;
    } else {
      sentiments.neutral++;
    }
  });
  
  const dominantTopic = Object.keys(topics).reduce((a, b) => topics[a as keyof TopicAnalysis] > topics[b as keyof TopicAnalysis] ? a : b);
  const dominantSentiment = Object.keys(sentiments).reduce((a, b) => sentiments[a as keyof SentimentAnalysis] > sentiments[b as keyof SentimentAnalysis] ? a : b);
  
  const activeSectors = Object.keys(topics).filter(t => topics[t as keyof TopicAnalysis] > 0);
  
  // Generate level-appropriate content
  let paragraph1 = '';
  let paragraph2 = '';
  let tldr = '';
  
  switch (userLevel) {
    case 'beginner':
      paragraph1 = generateBeginnerParagraph1(dominantSentiment, dominantTopic, topics);
      paragraph2 = generateBeginnerParagraph2(activeSectors, sentiments);
      tldr = generateBeginnerTldr(dominantSentiment, dominantTopic);
      break;
    case 'intermediate':
      paragraph1 = generateIntermediateParagraph1(dominantSentiment, dominantTopic, topics);
      paragraph2 = generateIntermediateParagraph2(activeSectors, sentiments);
      tldr = generateIntermediateTldr(dominantSentiment, dominantTopic);
      break;
    case 'advanced':
      paragraph1 = generateAdvancedParagraph1(dominantSentiment, dominantTopic, topics);
      paragraph2 = generateAdvancedParagraph2(activeSectors, sentiments);
      tldr = generateAdvancedTldr(dominantSentiment, dominantTopic);
      break;
    default:
      paragraph1 = generateBeginnerParagraph1(dominantSentiment, dominantTopic, topics);
      paragraph2 = generateBeginnerParagraph2(activeSectors, sentiments);
      tldr = generateBeginnerTldr(dominantSentiment, dominantTopic);
  }
  
  return {
    paragraphs: [paragraph1, paragraph2],
    tldr: tldr,
    sentiment: dominantSentiment,
    dominantSector: dominantTopic
  };
}

function generateBeginnerParagraph1(sentiment: string, topic: string, topics: TopicAnalysis): string {
  const moodText = sentiment === 'positive' ? 'good news and rising prices' : sentiment === 'negative' ? 'concerns and falling prices' : 'mixed results';
  const sectorText = topic === 'tech' ? 'technology companies like Apple, Google, and Microsoft' : topic === 'finance' ? 'banks and financial companies like JPMorgan and Bank of America' : topic === 'energy' ? 'oil and energy companies like ExxonMobil and Chevron' : 'various businesses across different industries';
  
  return `Today's stock market showed ${moodText} as investors focused heavily on ${sectorText}. The market reflects how people feel about buying and selling company shares, which directly affects the value of businesses we interact with every day. When stock prices go up, it usually means companies are doing well and making good profits, which can lead to more jobs and economic growth. Understanding these daily market movements helps us see how the broader economy is performing and what it might mean for our personal finances and future investment opportunities.`;
}

function generateBeginnerParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const totalNews = sentiments.positive + sentiments.negative + sentiments.neutral;
  const mainMood = sentiments.positive > sentiments.negative ? 'optimistic' : sentiments.negative > sentiments.positive ? 'cautious' : 'uncertain';
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return `As of ${currentDate}, with ${totalNews} major news stories affecting different industries, investors are feeling ${mainMood} about the future direction of the market. This sentiment matters tremendously because when stock prices change, it directly affects millions of Americans' retirement accounts, college savings plans, and the overall health of our economy. The ripple effects extend beyond Wall Street to Main Street, influencing everything from job creation to consumer spending patterns. Smart investors pay attention to these daily market signals to make informed decisions about their long-term financial goals and understand how current events might impact their investment portfolios.`;
}

function generateBeginnerTldr(sentiment: string, topic: string): string {
  const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  return `On ${todayDate}, the stock market had a ${sentiment} day with ${topic} companies getting the most attention from investors. This market movement affects everyone's investments and gives us clues about where the economy might be heading in the coming weeks.`;
}

function generateIntermediateParagraph1(sentiment: string, topic: string, topics: TopicAnalysis): string {
  const sectorCount = Object.values(topics).filter(count => count > 0).length;
  const leadingSector = topic === 'tech' ? 'technology sector' : topic === 'finance' ? 'financial services' : topic === 'energy' ? 'energy sector' : 'mixed sectors';
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return `As of ${currentDate}, market sentiment reflected ${sentiment} momentum across ${sectorCount} key sectors, with the ${leadingSector} driving primary investor focus and capital allocation decisions. Equity valuations responded dynamically to fundamental news flow, corporate earnings updates, and macroeconomic indicators that influence sector rotation strategies among institutional portfolios. The broader market's price action suggests that professional investors are carefully weighing risk-adjusted returns while positioning for potential shifts in monetary policy and economic growth trajectories. Current market conditions indicate a complex interplay between technical indicators and fundamental analysis driving investment decisions across asset classes.`;
}

function generateIntermediateParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const sentimentRatio = Math.round((sentiments.positive / (sentiments.positive + sentiments.negative)) * 100);
  const totalSectors = sectors.length;
  
  return `Portfolio managers and institutional investors are strategically positioning for continued volatility as ${sentimentRatio}% of market-moving news carried positive implications across ${totalSectors} distinct sectors. The broad market's response suggests risk appetite remains measured, with sector-specific catalysts driving individual equity performance more than systematic market factors or macro themes. Active fund managers are leveraging this environment to generate alpha through security selection and tactical asset allocation, while passive investors continue to benefit from long-term diversification strategies. The current market regime favors investors who can identify quality companies with strong fundamentals and sustainable competitive advantages, particularly as earnings season reveals which businesses can maintain profitability amid changing economic conditions.`;
}

function generateIntermediateTldr(sentiment: string, topic: string): string {
  const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  return `On ${todayDate}, markets showed ${sentiment} bias with ${topic} sector leadership driving institutional positioning and retail investor sentiment. Professional investors are focusing on fundamental analysis and sector rotation strategies while managing portfolio risk in the current environment.`;
}

function generateAdvancedParagraph1(sentiment: string, topic: string, topics: TopicAnalysis): string {
  const sectorDispersion = Object.values(topics).filter(count => count > 0).length;
  const alpha = topic === 'tech' ? 'technology beta exposure' : topic === 'finance' ? 'financial sector duration risk' : 'sector-neutral positioning';
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return `As of ${currentDate}, cross-sectional momentum indicators suggest ${sentiment} market microstructure with ${sectorDispersion}-factor sector dispersion driving alpha generation opportunities across multiple timeframes and volatility regimes. Factor loadings indicate ${alpha} as the primary systematic risk driver, while idiosyncratic volatility patterns suggest active management opportunities in single-name selections and pair trade strategies. The current correlation matrix exhibits regime-dependent characteristics that favor quantitative approaches utilizing alternative risk premia and factor tilts. Portfolio construction models are indicating optimal exposure through multi-factor frameworks that capture both momentum and mean-reversion signals while maintaining appropriate hedge ratios for tail risk scenarios.`;
}

function generateAdvancedParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const sharpeImplication = sentiments.positive > sentiments.negative ? 'positive Sharpe ratio expectations' : 'risk-parity rebalancing';
  const totalSectors = sectors.length;
  
  return `Quantitative models are pricing in ${sharpeImplication} given the current correlation matrix and volatility surface dynamics across ${totalSectors} sector classifications and their respective factor exposures. Options flow and gamma positioning suggest institutional overlays are hedging tail risks while maintaining long bias, indicating sophisticated portfolio construction amid changing market regimes and factor premium compression in alternative risk premia strategies. The term structure of implied volatility reveals opportunities for systematic volatility harvesting and delta-neutral strategies that capitalize on skew and convexity mispricings. Advanced practitioners are leveraging machine learning algorithms and alternative data sources to identify regime changes before they manifest in traditional price-based indicators, enabling superior risk-adjusted returns through dynamic factor allocation and systematic rebalancing protocols.`;
}

function generateAdvancedTldr(sentiment: string, topic: string): string {
  const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  return `On ${todayDate}, factor models indicate ${sentiment} alpha opportunities with ${topic} systematic exposure driving institutional flow and derivative positioning strategies. Quantitative frameworks are identifying regime-dependent opportunities through multi-factor analysis and alternative risk premia optimization in current market conditions.`;
}
