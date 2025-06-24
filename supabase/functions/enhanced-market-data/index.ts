
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const FMP_API_KEY = Deno.env.get('FMP_API_KEY')
    
    if (!FMP_API_KEY) {
      throw new Error('FMP_API_KEY not found')
    }

    console.log('Fetching consolidated market data from FMP API...')

    // Fetch market indexes data
    const indexesResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/%5EGSPC,%5EDJI,%5EIXIC?apikey=${FMP_API_KEY}`
    )
    
    // Fetch market movers (gainers and losers)
    const gainersResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${FMP_API_KEY}`
    )
    
    const losersResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${FMP_API_KEY}`
    )
    
    // Fetch commodities data
    const commoditiesResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/GCUSD,CLUSD?apikey=${FMP_API_KEY}`
    )
    
    // Fetch market news
    const newsResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_news?limit=10&apikey=${FMP_API_KEY}`
    )

    let marketData = []
    let movers = []
    let insights = []
    let headlines = []

    // Process indexes data
    if (indexesResponse.ok) {
      const indexesData = await indexesResponse.json()
      console.log('Indexes data received:', indexesData)
      
      marketData = indexesData.map((item: any) => {
        let name = item.name
        if (item.symbol === '^GSPC') name = 'S&P 500'
        if (item.symbol === '^DJI') name = 'Dow Jones'
        if (item.symbol === '^IXIC') name = 'NASDAQ'
        
        return {
          symbol: item.symbol,
          name: name,
          price: item.price || 0,
          change_amount: item.change || 0,
          change_percent: item.changesPercentage || 0,
          asset_type: 'index'
        }
      })
    }

    // Process commodities data
    if (commoditiesResponse.ok) {
      const commoditiesData = await commoditiesResponse.json()
      console.log('Commodities data received:', commoditiesData)
      
      const commodityMapped = commoditiesData.map((item: any) => {
        let name = item.name
        if (item.symbol === 'GCUSD') name = 'Gold'
        if (item.symbol === 'CLUSD') name = 'Crude Oil'
        
        return {
          symbol: item.symbol,
          name: name,
          price: item.price || 0,
          change_amount: item.change || 0,
          change_percent: item.changesPercentage || 0,
          asset_type: 'commodity'
        }
      })
      
      marketData = [...marketData, ...commodityMapped]
    }

    // Process market movers
    if (gainersResponse.ok && losersResponse.ok) {
      const gainersData = await gainersResponse.json()
      const losersData = await losersResponse.json()
      
      console.log('Market movers data received')
      
      // Get top 2 gainers and top 1 loser
      const topGainers = gainersData.slice(0, 2)
      const topLosers = losersData.slice(0, 1)
      
      movers = [
        ...topGainers.map((stock: any) => ({
          symbol: stock.symbol,
          name: stock.name || stock.symbol,
          price: stock.price,
          change: stock.changesPercentage || 0
        })),
        ...topLosers.map((stock: any) => ({
          symbol: stock.symbol,
          name: stock.name || stock.symbol,
          price: stock.price,
          change: stock.changesPercentage || 0
        }))
      ]

      // Generate insights based on market data
      if (topGainers.length > 0) {
        insights.push(`Top gaining stock ${topGainers[0].symbol} surged ${topGainers[0].changesPercentage?.toFixed(1)}% leading market optimism.`)
      }
      
      if (topLosers.length > 0) {
        insights.push(`Market volatility evident with ${topLosers[0].symbol} declining ${Math.abs(topLosers[0].changesPercentage || 0).toFixed(1)}%.`)
      }

      insights.push(`Trading volumes indicate active institutional participation across major market sectors.`)
    }

    // Process market news
    if (newsResponse.ok) {
      const newsData = await newsResponse.json()
      console.log('Market news received:', newsData?.length || 0, 'articles')
      
      headlines = newsData.slice(0, 8).map((article: any, index: number) => ({
        id: article.url || `headline-${index}`,
        title: article.title || 'Market Update',
        description: article.text || article.summary || 'Market news update',
        url: article.url || '#',
        publishedAt: article.publishedDate || new Date().toISOString(),
        source: { name: article.site || 'Financial News' },
        urlToImage: article.image
      }))
    }

    // Cache the data in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Store market data cache
    for (const item of marketData) {
      await supabase
        .from('market_data_cache')
        .upsert({
          symbol: item.symbol,
          name: item.name,
          price: item.price,
          change_percent: item.change_percent,
          asset_type: item.asset_type,
          last_updated: new Date().toISOString()
        })
    }

    console.log('Market data cached successfully')

    const response = {
      marketData: marketData,
      movers: movers,
      insights: insights,
      headlines: headlines,
      marketRecap: {
        paragraphs: [
          `Today's market showed mixed signals as major indices fluctuated throughout the trading session. ${marketData.find(d => d.name === 'S&P 500')?.change_percent > 0 ? 'The S&P 500 posted gains' : 'The S&P 500 faced headwinds'} while technology stocks ${marketData.find(d => d.name === 'NASDAQ')?.change_percent > 0 ? 'led the rally' : 'experienced pressure'}.`,
          `Market volatility continues as investors weigh economic indicators and corporate earnings. ${movers.length > 0 ? `Leading movers include ${movers[0]?.name} with significant price action.` : 'Trading volumes remain elevated across sectors.'} Portfolio diversification remains crucial amid ongoing market uncertainty.`
        ],
        tldr: `Markets showed ${marketData.some(d => d.change_percent > 0) ? 'mixed' : 'volatile'} performance with ${movers.length > 0 ? `${movers[0]?.name} leading moves` : 'sector rotation continuing'}.`,
        sentiment: marketData.filter(d => d.change_percent > 0).length > marketData.filter(d => d.change_percent < 0).length ? 'positive' : 'negative',
        dominantSector: 'mixed'
      },
      lastUpdated: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error fetching consolidated market data:', error)
    
    // Return fallback data
    const fallbackResponse = {
      marketData: [
        { symbol: '^GSPC', name: 'S&P 500', price: 4783.45, change_percent: 0.85, asset_type: 'index' },
        { symbol: '^DJI', name: 'Dow Jones', price: 37248.90, change_percent: -0.45, asset_type: 'index' },
        { symbol: '^IXIC', name: 'NASDAQ', price: 15832.80, change_percent: 1.25, asset_type: 'index' }
      ],
      movers: [
        { name: 'Technology Sector', change: 2.1 },
        { name: 'Energy Stocks', change: -1.3 },
        { name: 'Financial Services', change: 0.8 }
      ],
      insights: [
        'Strong quarterly earnings boosted investor confidence in growth stocks.',
        'Interest rate speculation continues to influence bond market dynamics.',
        'Commodity prices showed resilience despite global economic concerns.'
      ],
      headlines: [],
      marketRecap: {
        paragraphs: [
          'Today\'s market showed mixed signals as major indices fluctuated throughout the trading session.',
          'Market volatility continues as investors weigh economic indicators and corporate earnings.'
        ],
        tldr: 'Markets showed mixed performance with technology leading gains.',
        sentiment: 'neutral',
        dominantSector: 'technology'
      },
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data due to API error'
    }

    return new Response(
      JSON.stringify(fallbackResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
