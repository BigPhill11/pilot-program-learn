
import { NewsArticle, ProcessedHeadline } from './types.ts';
import { extractKeyPoints, createSummary } from './text-processing.ts';

export function processNewsArticles(articles: NewsArticle[]): ProcessedHeadline[] {
  return articles.slice(0, 8).map((article: any, index: number) => {
    const summary = createSummary(article);
    const tldr = extractKeyPoints(article.title, article.content || article.description || '');
    
    return {
      id: article.article_id || `headline-${index}`,
      title: article.title || 'Business Update',
      summary: summary,
      tldr: tldr,
      url: article.link || '#',
      publishedDate: article.pubDate || new Date().toISOString(),
      site: article.source_id || 'News Source',
      image: article.image_url || null
    };
  });
}
