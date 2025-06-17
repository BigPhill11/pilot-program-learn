
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

export function generateMarketRecap(headlines: ProcessedHeadline[]): MarketRecap {
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
  
  // Create dynamic market recap based on the news
  const dominantTopic = Object.keys(topics).reduce((a, b) => topics[a as keyof TopicAnalysis] > topics[b as keyof TopicAnalysis] ? a : b);
  const dominantSentiment = Object.keys(sentiments).reduce((a, b) => sentiments[a as keyof SentimentAnalysis] > sentiments[b as keyof SentimentAnalysis] ? a : b);
  
  let recap = `Today's financial markets reflect ${dominantSentiment === 'positive' ? 'optimistic momentum' : dominantSentiment === 'negative' ? 'cautious sentiment' : 'mixed signals'} across key sectors. `;
  
  const activeSectors = Object.keys(topics).filter(t => topics[t as keyof TopicAnalysis] > 0);
  
  if (topics.tech > 0) {
    recap += `Technology companies continue to drive market attention with ${topics.tech} significant development${topics.tech > 1 ? 's' : ''} in AI, cloud services, and earnings performance. `;
  }
  
  if (topics.finance > 0) {
    recap += `Financial sector dynamics, including Federal Reserve policy discussions and banking developments, are shaping ${topics.finance} key market narrative${topics.finance > 1 ? 's' : ''}. `;
  }
  
  if (topics.energy > 0) {
    recap += `Energy markets remain in focus with ${topics.energy} major story${topics.energy > 1 ? 'ies' : 'y'} covering oil prices, renewable investments, and supply chain considerations. `;
  }
  
  if (topics.retail > 0) {
    recap += `Consumer and retail sectors show ${topics.retail > 1 ? 'multiple indicators' : 'signs'} of economic resilience and spending patterns. `;
  }
  
  if (topics.crypto > 0) {
    recap += `Cryptocurrency markets are experiencing renewed attention with ${topics.crypto} development${topics.crypto > 1 ? 's' : ''} in institutional adoption and regulatory progress. `;
  }
  
  recap += `Market participants are monitoring these developments closely as they evaluate investment opportunities and assess economic trends for the coming weeks.`;
  
  const tldr = `Markets showing ${dominantSentiment} sentiment today with ${dominantTopic === 'general' ? 'broad-based' : dominantTopic} sector focus. Key themes: ${activeSectors.slice(0, 3).join(', ')} developments driving investor attention.`;
  
  return {
    paragraphs: [recap],
    tldr: tldr,
    sentiment: dominantSentiment,
    dominantSector: dominantTopic
  };
}
