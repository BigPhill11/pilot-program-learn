
import { NewsArticle } from './types.ts';

export async function fetchNewsFromAPI(apiKey: string): Promise<NewsArticle[]> {
  console.log('Fetching headlines from newsdata.io API...');

  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${apiKey}&category=business&language=en&country=us&size=10`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; NewsDataBot/1.0)',
      }
    }
  );
  
  if (!response.ok) {
    console.error('Newsdata.io API error:', response.status, response.statusText);
    const errorText = await response.text();
    console.error('Error details:', errorText);
    throw new Error(`Newsdata.io API error: ${response.status}`);
  }

  const data = await response.json();
  console.log('Newsdata.io API response received:', data);

  const articles = data.results || [];
  console.log(`Processing ${articles.length} articles from newsdata.io`);
  
  return articles;
}
