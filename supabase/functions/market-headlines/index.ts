
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
    const YAHOO_FINANCE_API_KEY = Deno.env.get('YAHOO_FINANCE_API_KEY')
    
    if (!YAHOO_FINANCE_API_KEY) {
      throw new Error('YAHOO_FINANCE_API_KEY not found')
    }

    console.log('Fetching headlines from Yahoo Finance API...')

    // Use Yahoo Finance API for financial news
    const response = await fetch(
      'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/news',
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': YAHOO_FINANCE_API_KEY,
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      }
    )
    
    if (!response.ok) {
      console.error('Yahoo Finance API error:', response.status, response.statusText)
      throw new Error(`Yahoo Finance API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Yahoo Finance API response received')

    // Transform the data to match our expected format
    const articles = data.body || []
    
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
      } else if (article.summary) {
        summary = article.summary
      } else {
        summary = `${article.title}. This is a developing story in the financial markets. More details are expected to emerge as the situation unfolds.`
      }
      
      // Create TL;DR (extract key points)
      const tldr = extractKeyPoints(article.title, article.content || article.summary || '')
      
      return {
        id: article.uuid || `headline-${index}`,
        title: article.title || 'Market Update',
        summary: summary,
        tldr: tldr,
        url: article.link || '#',
        publishedDate: article.published_at || new Date().toISOString(),
        site: article.publisher || 'Yahoo Finance',
        image: article.thumbnail?.resolutions?.[0]?.url || null
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
