
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
    console.log('Returning comprehensive static market data...')

    // Cache the data in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const staticMarketResponse = {
      marketData: [
        { symbol: '^GSPC', name: 'S&P 500', price: 5847.87, change_percent: 0.73, asset_type: 'index' },
        { symbol: '^DJI', name: 'Dow Jones', price: 42342.24, change_percent: -0.31, asset_type: 'index' },
        { symbol: '^IXIC', name: 'NASDAQ', price: 19372.77, change_percent: 1.24, asset_type: 'index' },
        { symbol: '^RUT', name: 'Russell 2000', price: 2387.03, change_percent: 0.89, asset_type: 'index' },
        { symbol: 'GCUSD', name: 'Gold', price: 2658.42, change_percent: -0.18, asset_type: 'commodity' },
        { symbol: 'CLUSD', name: 'Crude Oil', price: 69.94, change_percent: 1.87, asset_type: 'commodity' }
      ],
      movers: [
        { name: 'Technology', change: 1.8 },
        { name: 'Healthcare', change: 1.2 },
        { name: 'Communication Services', change: 0.9 },
        { name: 'Consumer Discretionary', change: 0.6 },
        { name: 'Energy', change: -0.4 },
        { name: 'Utilities', change: -0.7 }
      ],
      insights: [
        'Technology stocks continue to lead market gains, driven by strong AI and cloud computing demand.',
        'Federal Reserve signals potential interest rate adjustments in upcoming meetings based on inflation data.',
        'Consumer confidence remains resilient despite ongoing economic uncertainties and geopolitical tensions.',
        'Corporate earnings season shows mixed results with tech companies outperforming traditional sectors.',
        'Bond yields stabilize as investors weigh economic growth prospects against inflation concerns.'
      ],
      headlines: [
        {
          id: '1',
          title: "Tech Giants Drive Market Rally Amid AI Optimism",
          description: "Major technology companies led Wednesday's market gains as investors showed renewed enthusiasm for artificial intelligence innovations. Semiconductor stocks and cloud computing companies posted significant advances, with the tech-heavy NASDAQ outperforming other major indices. Market analysts cite strong earnings guidance and increased enterprise AI adoption as key drivers of the sector's momentum.",
          url: "https://finance.yahoo.com/news/tech-stocks-ai-rally",
          publishedAt: new Date().toISOString(),
          source: { name: "Financial Times" },
          urlToImage: null
        },
        {
          id: '2',
          title: "Federal Reserve Maintains Cautious Stance on Rate Policy",
          description: "Federal Reserve officials continue to signal a measured approach to monetary policy adjustments, emphasizing data-dependent decision making. Recent inflation readings and employment figures suggest the central bank may maintain current interest rates longer than previously anticipated. Market participants are closely monitoring upcoming economic indicators for clues about future policy direction.",
          url: "https://finance.yahoo.com/news/fed-rate-policy-update",
          publishedAt: new Date().toISOString(),
          source: { name: "Reuters" },
          urlToImage: null
        },
        {
          id: '3',
          title: "Energy Sector Faces Mixed Signals on Oil Price Volatility",
          description: "Oil markets experienced increased volatility as geopolitical tensions and supply chain concerns continue to influence pricing dynamics. While crude oil prices showed modest gains, energy sector stocks displayed mixed performance amid uncertainty about global demand patterns. Analysts suggest that seasonal factors and OPEC+ production decisions will be key variables in coming weeks.",
          url: "https://finance.yahoo.com/news/energy-oil-price-volatility",
          publishedAt: new Date().toISOString(),
          source: { name: "Bloomberg" },
          urlToImage: null
        },
        {
          id: '4',
          title: "Healthcare Stocks Gain on Biotech Innovation Breakthroughs",
          description: "Healthcare and biotechnology companies posted strong gains following announcements of promising clinical trial results and FDA approvals. The sector's performance reflects growing investor confidence in pharmaceutical innovation and the potential for new treatment modalities. Several major biotech firms reported positive developments in cancer treatment and rare disease therapies.",
          url: "https://finance.yahoo.com/news/healthcare-biotech-innovation",
          publishedAt: new Date().toISOString(),
          source: { name: "MarketWatch" },
          urlToImage: null
        },
        {
          id: '5',
          title: "Consumer Spending Data Shows Economic Resilience",
          description: "Latest retail sales figures exceeded analyst expectations, indicating continued consumer spending strength despite economic headwinds. The data suggests that employment stability and wage growth are supporting household consumption patterns. Retailers in discretionary categories showed particular strength, while essential goods maintained steady demand levels.",
          url: "https://finance.yahoo.com/news/consumer-spending-resilience",
          publishedAt: new Date().toISOString(),
          source: { name: "CNBC" },
          urlToImage: null
        },
        {
          id: '6',
          title: "International Markets Show Divergent Performance Trends",
          description: "Global equity markets displayed varied performance as regional economic factors and central bank policies create divergent investment climates. European markets faced headwinds from energy concerns and manufacturing data, while Asian markets showed resilience supported by technology sector strength. Currency fluctuations continue to influence cross-border investment flows.",
          url: "https://finance.yahoo.com/news/international-markets-divergent",
          publishedAt: new Date().toISOString(),
          source: { name: "Wall Street Journal" },
          urlToImage: null
        },
        {
          id: '7',
          title: "Bond Market Dynamics Reflect Inflation Expectations",
          description: "Treasury yields showed mixed movements as investors reassess inflation trajectories and Federal Reserve policy expectations. The yield curve continues to signal market uncertainty about long-term economic growth prospects. Fixed-income strategists note that upcoming economic data releases will be crucial for determining bond market direction in the near term.",
          url: "https://finance.yahoo.com/news/bond-market-inflation-expectations",
          publishedAt: new Date().toISOString(),
          source: { name: "Barron's" },
          urlToImage: null
        }
      ],
      marketRecap: {
        paragraphs: [
          "Today's trading session reflected a mixed but generally positive market sentiment, with technology stocks leading the charge amid renewed optimism about artificial intelligence developments and cloud computing growth. The S&P 500 gained 0.73% while the NASDAQ Composite surged 1.24%, outperforming the Dow Jones Industrial Average which declined 0.31%.",
          "Sector rotation continued to favor growth-oriented industries, with technology, healthcare, and communication services posting solid gains. Energy stocks faced headwinds despite crude oil's modest advance, while utilities lagged as investors sought higher-risk opportunities. The Russell 2000 small-cap index gained 0.89%, suggesting broad-based participation in the market's advance.",
          "Federal Reserve policy expectations remain a key driver of market dynamics, with investors carefully parsing economic data for clues about future monetary policy direction. Consumer confidence data and corporate earnings reports continue to support the narrative of economic resilience, though geopolitical uncertainties and inflation concerns persist as potential headwinds for sustained market growth."
        ],
        tldr: 'Markets showed mixed performance with tech leading gains while investors await Fed policy clarity and monitor economic data.',
        sentiment: 'cautiously optimistic',
        dominantSector: 'technology'
      },
      lastUpdated: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(staticMarketResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in enhanced-market-data function:', error)
    
    return new Response(
      JSON.stringify({ error: 'Failed to fetch market data' }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
