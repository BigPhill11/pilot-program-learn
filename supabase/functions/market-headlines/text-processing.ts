export function extractKeyPoints(title: string, text: string): string {
  if (!text) return createSimpleTLDR(title);

  // Extract key financial metrics and important points
  const keyPatterns = [
    /\$[\d,]+\.?\d*[BbMmKkTt]?/g, // Dollar amounts
    /\d+\.?\d*%/g, // Percentages
    /up \d+\.?\d*%|down \d+\.?\d*%|rose \d+\.?\d*%|fell \d+\.?\d*%|gained \d+\.?\d*%|dropped \d+\.?\d*%/gi, // Movement patterns
    /earnings|revenue|profit|loss|growth|decline|rates|inflation|GDP|stocks?|market|trading|investment/gi, // Financial terms
  ];
  
  const keyPoints = [];
  
  for (const pattern of keyPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      keyPoints.push(...matches.slice(0, 2)); // Limit to 2 matches per pattern
    }
  }
  
  // Create a simple, one-sentence summary for 10th graders
  if (keyPoints.length > 0) {
    return createFinancialTLDR(title, keyPoints);
  }
  
  return createSimpleTLDR(title);
}

function createFinancialTLDR(title: string, keyPoints: string[]): string {
  // Simplify financial terms for 10th grade level
  const simplifiedPoints = keyPoints.map(point => {
    return point
      .replace(/revenue/gi, 'money earned')
      .replace(/earnings/gi, 'profits')
      .replace(/GDP/gi, 'economic growth')
      .replace(/inflation/gi, 'rising prices')
      .replace(/Federal Reserve/gi, 'the Fed (central bank)')
      .replace(/Wall Street/gi, 'stock market');
  });
  
  if (title.toLowerCase().includes('stock') || title.toLowerCase().includes('market')) {
    return `Stock market news showing ${simplifiedPoints.slice(0, 2).join(' and ')}.`;
  } else if (title.toLowerCase().includes('earning') || title.toLowerCase().includes('profit')) {
    return `Company made ${simplifiedPoints[0] || 'money'} in recent business results.`;
  } else if (title.toLowerCase().includes('economy') || title.toLowerCase().includes('GDP')) {
    return `Economic update showing ${simplifiedPoints[0] || 'business activity'} trends.`;
  }
  
  return `Financial news about ${simplifiedPoints.slice(0, 2).join(' and ')}.`;
}

function createSimpleTLDR(title: string): string {
  if (title.toLowerCase().includes('stock') || title.toLowerCase().includes('market')) {
    return 'Stock market news affecting investor decisions.';
  } else if (title.toLowerCase().includes('bank') || title.toLowerCase().includes('finance')) {
    return 'Banking and finance industry updates.';
  } else if (title.toLowerCase().includes('economy')) {
    return 'Economic news that impacts businesses and consumers.';
  } else if (title.toLowerCase().includes('trade') || title.toLowerCase().includes('business')) {
    return 'Business news affecting companies and markets.';
  }
  
  return 'Financial news impacting the economy and markets.';
}

export function createSummary(article: any): string {
  let summary = '';
  
  // Use description first, then content, with better processing
  const sourceText = article.description || article.content || '';
  
  if (sourceText && sourceText.length > 50 && sourceText !== 'ONLY AVAILABLE IN PAID PLANS') {
    // Split into sentences and take first 3-4 meaningful ones
    const sentences = sourceText
      .split(/[.!?]+/)
      .filter((s: string) => s.trim().length > 20)
      .map((s: string) => s.trim())
      .slice(0, 4);
    
    summary = sentences.join('. ');
    
    // Ensure it ends with a period
    if (!summary.endsWith('.')) {
      summary += '.';
    }
    
    // Keep it concise (3-4 sentences max, around 200-300 characters)
    if (summary.length > 300) {
      const truncated = summary.substring(0, 280);
      const lastPeriod = truncated.lastIndexOf('.');
      summary = lastPeriod > 100 ? truncated.substring(0, lastPeriod + 1) : truncated + '...';
    }
  } else {
    // Create a generic but relevant summary based on title
    summary = createGenericFinanceSummary(article.title);
  }
  
  return summary;
}

function createGenericFinanceSummary(title: string): string {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('stock') || lowerTitle.includes('share')) {
    return `${title}. This development affects stock prices and investor sentiment in the market. Traders and analysts are closely monitoring the situation. The news could impact related companies and market sectors.`;
  } else if (lowerTitle.includes('bank') || lowerTitle.includes('financial')) {
    return `${title}. This banking and financial sector news impacts lending, investments, and economic growth. Financial institutions and their customers may see changes. Market analysts are evaluating the broader implications.`;
  } else if (lowerTitle.includes('economy') || lowerTitle.includes('economic')) {
    return `${title}. This economic development affects businesses, consumers, and government policy decisions. The news influences market confidence and future economic planning. Economists are analyzing the potential long-term effects.`;
  } else if (lowerTitle.includes('trade') || lowerTitle.includes('business')) {
    return `${title}. This business news impacts company operations, employment, and market competition. Stakeholders including investors and customers are watching developments closely. The outcome could influence industry trends.`;
  }
  
  return `${title}. This financial news affects market conditions and economic decision-making. Investors and business leaders are monitoring the situation for potential impacts. The development could influence future market trends and economic policy.`;
}
