
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
  const sectorText = topic === 'tech' ? 'technology companies' : topic === 'finance' ? 'banks and financial companies' : topic === 'energy' ? 'oil and energy companies' : 'various businesses';
  
  return `Today's stock market showed ${moodText} as investors focused on ${sectorText}. The market reflects how people feel about buying and selling company shares, which affects the value of businesses we see every day.`;
}

function generateBeginnerParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const totalNews = sentiments.positive + sentiments.negative + sentiments.neutral;
  const mainMood = sentiments.positive > sentiments.negative ? 'optimistic' : sentiments.negative > sentiments.positive ? 'cautious' : 'uncertain';
  
  return `With ${totalNews} major news stories affecting different industries, investors are feeling ${mainMood} about the future. This matters because when stock prices change, it affects retirement accounts, college savings, and the overall health of our economy.`;
}

function generateBeginnerTldr(sentiment: string, topic: string): string {
  return `Stock market had ${sentiment} day with ${topic} companies getting the most attention from investors.`;
}

function generateIntermediateParagraph1(sentiment: string, topic: string, topics: TopicAnalysis): string {
  const sectorCount = Object.values(topics).filter(count => count > 0).length;
  const leadingSector = topic === 'tech' ? 'technology sector' : topic === 'finance' ? 'financial services' : topic === 'energy' ? 'energy sector' : 'mixed sectors';
  
  return `Market sentiment reflected ${sentiment} momentum across ${sectorCount} key sectors, with the ${leadingSector} driving primary investor focus. Equity valuations responded to fundamental news flow, corporate earnings updates, and macroeconomic indicators that influence sector rotation strategies.`;
}

function generateIntermediateParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const sentimentRatio = Math.round((sentiments.positive / (sentiments.positive + sentiments.negative)) * 100);
  
  return `Portfolio managers and institutional investors are positioning for continued volatility as ${sentimentRatio}% of market-moving news carried positive implications. The broad market's response suggests risk appetite remains measured, with sector-specific catalysts driving individual equity performance more than systematic market factors.`;
}

function generateIntermediateTldr(sentiment: string, topic: string): string {
  return `Markets showed ${sentiment} bias with ${topic} sector leadership driving institutional positioning and retail investor sentiment.`;
}

function generateAdvancedParagraph1(sentiment: string, topic: string, topics: TopicAnalysis): string {
  const sectorDispersion = Object.values(topics).filter(count => count > 0).length;
  const alpha = topic === 'tech' ? 'technology beta exposure' : topic === 'finance' ? 'financial sector duration risk' : 'sector-neutral positioning';
  
  return `Cross-sectional momentum indicators suggest ${sentiment} market microstructure with ${sectorDispersion}-factor sector dispersion driving alpha generation opportunities. Factor loadings indicate ${alpha} as the primary systematic risk driver, while idiosyncratic volatility patterns suggest active management opportunities in single-name selections.`;
}

function generateAdvancedParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const sharpeImplication = sentiments.positive > sentiments.negative ? 'positive Sharpe ratio expectations' : 'risk-parity rebalancing';
  
  return `Quantitative models are pricing in ${sharpeImplication} given the current correlation matrix and volatility surface dynamics. Options flow and gamma positioning suggest institutional overlays are hedging tail risks while maintaining long bias, indicating sophisticated portfolio construction amid changing market regimes and factor premium compression.`;
}

function generateAdvancedTldr(sentiment: string, topic: string): string {
  return `Factor models indicate ${sentiment} alpha opportunities with ${topic} systematic exposure driving institutional flow and derivative positioning.`;
}
