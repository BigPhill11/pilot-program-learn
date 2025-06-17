
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
    const NEWSDATA_IO_API_KEY = Deno.env.get('NEWSDATA_IO_API_KEY')
    
    if (!NEWSDATA_IO_API_KEY) {
      throw new Error('NEWSDATA_IO_API_KEY not found')
    }

    console.log('Fetching headlines from newsdata.io API...')

    // Use newsdata.io API for financial news
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${NEWSDATA_IO_API_KEY}&category=business&language=en&country=us&size=15`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    )
    
    if (!response.ok) {
      console.error('Newsdata.io API error:', response.status, response.statusText)
      throw new Error(`Newsdata.io API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Newsdata.io API response received')

    // Transform the data to match our expected format
    const articles = data.results || []
    
    // Process headlines with enhanced summaries
    const processedHeadlines = articles.slice(0, 10).map((article: any, index: number) => {
      // Create summary from article content
      let summary = ''
      if (article.content && article.content.length > 100) {
        // Take first few sentences up to 300 characters
        const sentences = article.content.split('.').filter((s: string) => s.trim().length > 20)
        summary = sentences.slice(0, 3).join('. ').trim()
        if (summary.length > 300) {
          summary = summary.substring(0, 300) + '...'
        }
        if (!summary.endsWith('.') && !summary.endsWith('...')) {
          summary += '.'
        }
      } else if (article.description) {
        summary = article.description
      } else {
        summary = `${article.title}. This is a developing story in the financial markets. More details are expected to emerge as the situation unfolds.`
      }
      
      // Create TL;DR (extract key points)
      const tldr = extractKeyPoints(article.title, article.content || article.description || '')
      
      return {
        id: article.article_id || `headline-${index}`,
        title: article.title || 'Market Update',
        summary: summary,
        tldr: tldr,
        url: article.link || '#',
        publishedDate: article.pubDate || new Date().toISOString(),
        site: article.source_id || 'News Source',
        image: article.image_url || null
      }
    })

    // Generate market recap from the headlines
    const marketRecap = generateMarketRecap(processedHeadlines)

    return new Response(
      JSON.stringify({ 
        headlines: processedHeadlines,
        marketRecap: marketRecap,
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

function generateMarketRecap(headlines: any[]): any {
  // Analyze headlines to create market recap
  const topics = {
    tech: 0,
    finance: 0,
    energy: 0,
    healthcare: 0,
    general: 0
  }
  
  const sentiments = {
    positive: 0,
    negative: 0,
    neutral: 0
  }
  
  headlines.forEach(headline => {
    const titleLower = headline.title.toLowerCase()
    const summaryLower = headline.summary.toLowerCase()
    const content = titleLower + ' ' + summaryLower
    
    // Categorize by sector
    if (content.includes('tech') || content.includes('apple') || content.includes('microsoft') || content.includes('google') || content.includes('meta')) {
      topics.tech++
    } else if (content.includes('bank') || content.includes('fed') || content.includes('interest') || content.includes('finance')) {
      topics.finance++
    } else if (content.includes('oil') || content.includes('energy') || content.includes('gas')) {
      topics.energy++
    } else if (content.includes('health') || content.includes('pharma') || content.includes('drug')) {
      topics.healthcare++
    } else {
      topics.general++
    }
    
    // Analyze sentiment
    if (content.includes('gain') || content.includes('rise') || content.includes('up') || content.includes('positive') || content.includes('growth')) {
      sentiments.positive++
    } else if (content.includes('fall') || content.includes('decline') || content.includes('down') || content.includes('negative') || content.includes('loss')) {
      sentiments.negative++
    } else {
      sentiments.neutral++
    }
  })
  
  // Create dynamic market recap based on the news
  const dominantTopic = Object.keys(topics).reduce((a, b) => topics[a] > topics[b] ? a : b)
  const dominantSentiment = Object.keys(sentiments).reduce((a, b) => sentiments[a] > sentiments[b] ? a : b)
  
  let recap = `Today's market news shows ${dominantSentiment === 'positive' ? 'optimistic' : dominantSentiment === 'negative' ? 'cautious' : 'mixed'} sentiment across major sectors. `
  
  if (topics.tech > 0) {
    recap += `Technology companies are in focus with ${topics.tech} major stories emerging. `
  }
  
  if (topics.finance > 0) {
    recap += `Financial sector developments, including Federal Reserve activities and banking news, are driving ${topics.finance} key stories. `
  }
  
  if (topics.energy > 0) {
    recap += `Energy markets continue to be volatile with ${topics.energy} significant developments. `
  }
  
  recap += `Investors are closely monitoring these developments as they assess market conditions and future investment opportunities.`
  
  const tldr = `Markets showing ${dominantSentiment} sentiment today with focus on ${dominantTopic} sector. Key developments in ${Object.keys(topics).filter(t => topics[t] > 0).join(', ')} sectors.`
  
  return {
    paragraphs: [recap],
    tldr: tldr,
    sentiment: dominantSentiment,
    dominantSector: dominantTopic
  }
}
