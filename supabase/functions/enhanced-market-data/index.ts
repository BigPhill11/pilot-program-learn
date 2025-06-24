
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
    console.log('Returning fallback market data...')

    // Cache the data in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const fallbackResponse = {
      marketData: [
        { symbol: '^GSPC', name: 'S&P 500', price: 4783.45, change_percent: 0.85, asset_type: 'index' },
        { symbol: '^DJI', name: 'Dow Jones', price: 37248.90, change_percent: -0.45, asset_type: 'index' },
        { symbol: '^IXIC', name: 'NASDAQ', price: 15832.80, change_percent: 1.25, asset_type: 'index' },
        { symbol: 'GCUSD', name: 'Gold', price: 2650.30, change_percent: -0.25, asset_type: 'commodity' },
        { symbol: 'CLUSD', name: 'Crude Oil', price: 78.45, change_percent: 2.15, asset_type: 'commodity' }
      ],
      movers: [
        { name: 'Technology Sector', change: 2.1 },
        { name: 'Energy Stocks', change: -1.3 },
        { name: 'Financial Services', change: 0.8 }
      ],
      insights: [
        'Markets are ready for new data integration.',
        'Prepare to connect your preferred market data provider.',
        'System is clean and ready for fresh API endpoints.'
      ],
      headlines: [
        {
          id: '1',
          title: "Market System Ready for New Data Integration",
          description: "The market data system has been cleaned and is ready to connect to your preferred data provider. Configure your new API endpoints to start receiving real-time market information.",
          url: "#",
          publishedAt: new Date().toISOString(),
          source: { name: "System Status" },
          urlToImage: null
        }
      ],
      marketRecap: {
        paragraphs: [
          'The market data system has been successfully cleaned and prepared for new API integration.',
          'You can now configure your preferred market data endpoints to start receiving real-time information.'
        ],
        tldr: 'System ready for new market data API integration.',
        sentiment: 'neutral',
        dominantSector: 'technology'
      },
      lastUpdated: new Date().toISOString()
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

  } catch (error) {
    console.error('Error in enhanced-market-data function:', error)
    
    return new Response(
      JSON.stringify({ error: 'System ready for new API configuration' }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
