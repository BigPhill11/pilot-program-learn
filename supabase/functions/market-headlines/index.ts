
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

    // Use newsdata.io API for financial/business news
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${NEWSDATA_IO_API_KEY}&category=business&language=en&country=us&size=10`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; NewsDataBot/1.0)',
        }
      }
    )
    
    if (!response.ok) {
      console.error('Newsdata.io API error:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error details:', errorText)
      throw new Error(`Newsdata.io API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Newsdata.io API response received:', data)

    // Transform the data to match our expected format
    const articles = data.results || []
    console.log(`Processing ${articles.length} articles from newsdata.io`)
    
    // Process headlines with enhanced summaries
    const processedHeadlines = articles.slice(0, 8).map((article: any, index: number) => {
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
        summary = `${article.title}. This is a developing story in the business and financial markets. More details are expected to emerge as the situation unfolds.`
      }
      
      // Create TL;DR (extract key points)
      const tldr = extractKeyPoints(article.title, article.content || article.description || '')
      
      return {
        id: article.article_id || `headline-${index}`,
        title: article.title || 'Business Update',
        summary: summary,
        tldr: tldr,
        url: article.link || '#',
        publishedDate: article.pubDate || new Date().toISOString(),
        site: article.source_id || 'News Source',
        image: article.image_url || null
      }
    })

    console.log(`Processed ${processedHeadlines.length} headlines successfully`)

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
    
    // Return fallback headlines if API fails
    const fallbackHeadlines = [
      {
        id: 'fallback-1',
        title: "Markets Show Mixed Performance Amid Economic Uncertainty",
        summary: "Stock markets displayed varied performance today as investors weighed economic indicators and corporate earnings reports. Technology stocks led gains while energy sectors faced headwinds from fluctuating commodity prices.",
        tldr: "Mixed market performance with tech gains and energy losses due to economic uncertainty.",
        url: "https://finance.yahoo.com",
        publishedDate: new Date().toISOString(),
        site: "Financial News",
        image: null
      },
      {
        id: 'fallback-2',
        title: "Federal Reserve Maintains Cautious Stance on Interest Rates",
        summary: "The Federal Reserve continues its measured approach to monetary policy, keeping interest rates steady while monitoring inflation trends and employment data. Market participants are closely watching for signals about future rate adjustments.",
        tldr: "Fed keeps rates steady while monitoring economic conditions for future policy changes.",
        url: "https://finance.yahoo.com",
        publishedDate: new Date().toISOString(),
        site: "Economic Times",
        image: null
      },
      {
        id: 'fallback-3',
        title: "Tech Giants Report Strong Quarterly Earnings",
        summary: "Major technology companies exceeded analyst expectations in their latest quarterly reports, driven by robust demand for cloud services and artificial intelligence solutions. Investors remain optimistic about the sector's growth prospects.",
        tldr: "Tech companies beat earnings expectations with strong AI and cloud service growth.",
        url: "https://finance.yahoo.com",
        publishedDate: new Date().toISOString(),
        site: "Tech News",
        image: null
      },
      {
        id: 'fallback-4',
        title: "Oil Prices Fluctuate on Global Supply Concerns",
        summary: "Crude oil prices experienced volatility as geopolitical tensions and supply chain disruptions continue to impact global energy markets. Analysts predict continued price swings as market conditions evolve.",
        tldr: "Oil prices volatile due to geopolitical tensions and supply chain issues.",
        url: "https://finance.yahoo.com",
        publishedDate: new Date().toISOString(),
        site: "Energy Report",
        image: null
      },
      {
        id: 'fallback-5',
        title: "Cryptocurrency Market Sees Renewed Interest",
        summary: "Digital assets are gaining traction as institutional investors show increased interest in cryptocurrency investments. Regulatory clarity and technological improvements are driving market confidence.",
        tldr: "Crypto market gains momentum with institutional investor interest and regulatory clarity.",
        url: "https://finance.yahoo.com",
        publishedDate: new Date().toISOString(),
        site: "Crypto News",
        image: null
      },
      {
        id: 'fallback-6',
        title: "Retail Sales Data Shows Consumer Resilience",
        summary: "Latest retail sales figures indicate consumer spending remains robust despite economic headwinds. Strong employment numbers and wage growth continue to support household spending patterns.",
        tldr: "Consumer spending stays strong with solid employment and wage growth support.",
        url: "https://finance.yahoo.com",
        publishedDate: new Date().toISOString(),
        site: "Retail Monitor",
        image: null
      },
      {
        id: 'fallback-7',
        title: "Manufacturing Sector Adapts to Supply Chain Challenges",
        summary: "Industrial companies are implementing innovative strategies to navigate ongoing supply chain disruptions. Investment in automation and domestic production capabilities is reshaping the manufacturing landscape.",
        tldr: "Manufacturers adapt with automation and domestic production to handle supply chain issues.",
        url: "https://finance.yahoo.com",
        publishedDate: new Date().toISOString(),
        site: "Industry Today",
        image: null
      },
      {
        id: 'fallback-8',
        title: "Green Energy Investments Reach Record Levels",
        summary: "Renewable energy projects are attracting unprecedented investment as companies and governments accelerate their transition to sustainable energy sources. Solar and wind capacity additions continue to break records.",
        tldr: "Record green energy investments as renewable capacity additions hit new highs.",
        url: "https://finance.yahoo.com",
        publishedDate: new Date().toISOString(),
        site: "Green Finance",
        image: null
      }
    ]

    const fallbackRecap = generateMarketRecap(fallbackHeadlines)

    return new Response(
      JSON.stringify({ 
        headlines: fallbackHeadlines,
        marketRecap: fallbackRecap,
        lastUpdated: new Date().toISOString(),
        error: 'Using fallback data due to API error'
      }),
      { 
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
    /earnings|revenue|profit|loss|growth|decline|rates|inflation|GDP/gi, // Financial terms
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
    retail: 0,
    crypto: 0,
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
    if (content.includes('tech') || content.includes('technology') || content.includes('ai') || content.includes('software') || content.includes('cloud')) {
      topics.tech++
    } else if (content.includes('bank') || content.includes('fed') || content.includes('interest') || content.includes('finance') || content.includes('monetary')) {
      topics.finance++
    } else if (content.includes('oil') || content.includes('energy') || content.includes('renewable') || content.includes('gas') || content.includes('crude')) {
      topics.energy++
    } else if (content.includes('health') || content.includes('pharma') || content.includes('drug') || content.includes('medical')) {
      topics.healthcare++
    } else if (content.includes('retail') || content.includes('consumer') || content.includes('sales') || content.includes('shopping')) {
      topics.retail++
    } else if (content.includes('crypto') || content.includes('bitcoin') || content.includes('digital asset') || content.includes('blockchain')) {
      topics.crypto++
    } else {
      topics.general++
    }
    
    // Analyze sentiment
    if (content.includes('gain') || content.includes('rise') || content.includes('up') || content.includes('positive') || content.includes('growth') || content.includes('strong') || content.includes('robust')) {
      sentiments.positive++
    } else if (content.includes('fall') || content.includes('decline') || content.includes('down') || content.includes('negative') || content.includes('loss') || content.includes('weak') || content.includes('concern')) {
      sentiments.negative++
    } else {
      sentiments.neutral++
    }
  })
  
  // Create dynamic market recap based on the news
  const dominantTopic = Object.keys(topics).reduce((a, b) => topics[a] > topics[b] ? a : b)
  const dominantSentiment = Object.keys(sentiments).reduce((a, b) => sentiments[a] > sentiments[b] ? a : b)
  
  let recap = `Today's financial markets reflect ${dominantSentiment === 'positive' ? 'optimistic momentum' : dominantSentiment === 'negative' ? 'cautious sentiment' : 'mixed signals'} across key sectors. `
  
  const activeSectors = Object.keys(topics).filter(t => topics[t] > 0)
  
  if (topics.tech > 0) {
    recap += `Technology companies continue to drive market attention with ${topics.tech} significant development${topics.tech > 1 ? 's' : ''} in AI, cloud services, and earnings performance. `
  }
  
  if (topics.finance > 0) {
    recap += `Financial sector dynamics, including Federal Reserve policy discussions and banking developments, are shaping ${topics.finance} key market narrative${topics.finance > 1 ? 's' : ''}. `
  }
  
  if (topics.energy > 0) {
    recap += `Energy markets remain in focus with ${topics.energy} major story${topics.energy > 1 ? 'ies' : 'y'} covering oil prices, renewable investments, and supply chain considerations. `
  }
  
  if (topics.retail > 0) {
    recap += `Consumer and retail sectors show ${topics.retail > 1 ? 'multiple indicators' : 'signs'} of economic resilience and spending patterns. `
  }
  
  if (topics.crypto > 0) {
    recap += `Cryptocurrency markets are experiencing renewed attention with ${topics.crypto} development${topics.crypto > 1 ? 's' : ''} in institutional adoption and regulatory progress. `
  }
  
  recap += `Market participants are monitoring these developments closely as they evaluate investment opportunities and assess economic trends for the coming weeks.`
  
  const tldr = `Markets showing ${dominantSentiment} sentiment today with ${dominantTopic === 'general' ? 'broad-based' : dominantTopic} sector focus. Key themes: ${activeSectors.slice(0, 3).join(', ')} developments driving investor attention.`
  
  return {
    paragraphs: [recap],
    tldr: tldr,
    sentiment: dominantSentiment,
    dominantSector: dominantTopic
  }
}
