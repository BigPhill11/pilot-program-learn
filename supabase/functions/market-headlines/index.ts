
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const API_KEY = Deno.env.get('FMP_API_KEY')
    
    if (!API_KEY) {
      throw new Error('FMP_API_KEY not found')
    }

    // Fetch general news with finance/economy focus
    const generalNewsResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=20&apikey=${API_KEY}`
    )
    
    if (!generalNewsResponse.ok) {
      throw new Error(`General news API error: ${generalNewsResponse.status}`)
    }

    const generalNews = await generalNewsResponse.json()

    // Fetch stock news for major companies
    const stockNewsResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_news?tickers=AAPL,MSFT,GOOGL,AMZN,TSLA&limit=10&apikey=${API_KEY}`
    )
    
    let stockNews = []
    if (stockNewsResponse.ok) {
      stockNews = await stockNewsResponse.json()
    }

    // Combine and filter news
    const allNews = [...(generalNews.content || []), ...stockNews]
    
    // Filter for finance/economy/market related content
    const relevantNews = allNews.filter(article => {
      const title = article.title?.toLowerCase() || ''
      const text = article.text?.toLowerCase() || ''
      
      // Keywords that indicate financial/economic relevance
      const financeKeywords = [
        'market', 'stock', 'economy', 'financial', 'finance', 'trading', 'investment',
        'earnings', 'revenue', 'profit', 'economic', 'federal reserve', 'fed', 'inflation',
        'gdp', 'interest rate', 'bank', 'wall street', 'nasdaq', 's&p', 'dow jones',
        'cryptocurrency', 'bitcoin', 'merger', 'acquisition', 'ipo', 'dividend'
      ]
      
      // Lifestyle keywords to filter out
      const lifestyleKeywords = [
        'celebrity', 'entertainment', 'sports', 'fashion', 'lifestyle', 'travel',
        'food', 'health', 'fitness', 'relationship', 'dating', 'movie', 'music'
      ]
      
      const hasFinanceKeywords = financeKeywords.some(keyword => 
        title.includes(keyword) || text.includes(keyword)
      )
      
      const hasLifestyleKeywords = lifestyleKeywords.some(keyword => 
        title.includes(keyword) || text.includes(keyword)
      )
      
      return hasFinanceKeywords && !hasLifestyleKeywords
    })

    // Process headlines with enhanced summaries
    const processedHeadlines = relevantNews.slice(0, 10).map(article => {
      const sentences = article.text?.split('.').filter(s => s.trim().length > 20) || []
      
      // Create 3-sentence summary
      const summary = sentences.slice(0, 3).join('. ').trim()
      
      // Create TL;DR (extract key points)
      const tldr = extractKeyPoints(article.title, article.text)
      
      return {
        title: article.title,
        summary: summary || article.title,
        tldr: tldr,
        url: article.url,
        publishedDate: article.publishedDate || article.date,
        site: article.site || 'Financial News',
        image: article.image
      }
    })

    return new Response(
      JSON.stringify({ 
        headlines: processedHeadlines,
        lastUpdated: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error fetching headlines:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch headlines',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

function extractKeyPoints(title: string, text: string): string {
  if (!text) return title

  // Extract key financial metrics and important points
  const keyPatterns = [
    /\$[\d,]+\.?\d*[BbMmKkTt]?/g, // Dollar amounts
    /\d+\.?\d*%/g, // Percentages
    /up \d+\.?\d*%|down \d+\.?\d*%|rose \d+\.?\d*%|fell \d+\.?\d*%/gi, // Movement patterns
    /earnings|revenue|profit|loss|growth|decline/gi, // Financial terms
  ]
  
  const keyPoints = []
  
  for (const pattern of keyPatterns) {
    const matches = text.match(pattern)
    if (matches) {
      keyPoints.push(...matches.slice(0, 2)) // Limit to 2 matches per pattern
    }
  }
  
  // If no key points found, extract first meaningful sentence
  if (keyPoints.length === 0) {
    const sentences = text.split('.').filter(s => s.trim().length > 30)
    return sentences[0]?.trim() + '.' || title
  }
  
  return keyPoints.join(', ')
}
