
export function extractKeyPoints(title: string, text: string): string {
  if (!text) return title;

  // Extract key financial metrics and important points
  const keyPatterns = [
    /\$[\d,]+\.?\d*[BbMmKkTt]?/g, // Dollar amounts
    /\d+\.?\d*%/g, // Percentages
    /up \d+\.?\d*%|down \d+\.?\d*%|rose \d+\.?\d*%|fell \d+\.?\d*%/gi, // Movement patterns
    /earnings|revenue|profit|loss|growth|decline|rates|inflation|GDP/gi, // Financial terms
  ];
  
  const keyPoints = [];
  
  for (const pattern of keyPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      keyPoints.push(...matches.slice(0, 2)); // Limit to 2 matches per pattern
    }
  }
  
  // If no key points found, extract first meaningful sentence
  if (keyPoints.length === 0) {
    const sentences = text.split('.').filter(s => s.trim().length > 30);
    return sentences[0]?.trim() + '.' || title;
  }
  
  return keyPoints.join(', ');
}

export function createSummary(article: any): string {
  let summary = '';
  if (article.content && article.content.length > 100) {
    // Take first few sentences up to 300 characters
    const sentences = article.content.split('.').filter((s: string) => s.trim().length > 20);
    summary = sentences.slice(0, 3).join('. ').trim();
    if (summary.length > 300) {
      summary = summary.substring(0, 300) + '...';
    }
    if (!summary.endsWith('.') && !summary.endsWith('...')) {
      summary += '.';
    }
  } else if (article.description) {
    summary = article.description;
  } else {
    summary = `${article.title}. This is a developing story in the business and financial markets. More details are expected to emerge as the situation unfolds.`;
  }
  
  return summary;
}
