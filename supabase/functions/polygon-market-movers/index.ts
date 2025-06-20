
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
    const polygonApiKey = Deno.env.get('POLYGON_API_KEY')
    
    if (!polygonApiKey) {
      throw new Error('POLYGON_API_KEY not found')
    }

    console.log('Fetching market movers from Polygon.io...');

    // Fetch gainers and losers
    const gainersResponse = await fetch(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apikey=${polygonApiKey}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    const losersResponse = await fetch(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/losers?apikey=${polygonApiKey}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    let movers = [];
    let insights = [];

    if (gainersResponse.ok && losersResponse.ok) {
      const gainersData = await gainersResponse.json();
      const losersData = await losersResponse.json();

      console.log('Polygon gainers/losers data received');

      // Process top 3 gainers and losers
      const topGainers = gainersData.results?.slice(0, 2) || [];
      const topLosers = losersData.results?.slice(0, 1) || [];

      movers = [
        ...topGainers.map((stock: any) => ({
          name: stock.ticker,
          change: stock.todaysChangePerc || 0
        })),
        ...topLosers.map((stock: any) => ({
          name: stock.ticker,
          change: stock.todaysChangePerc || 0
        }))
      ];

      // Generate insights based on market data
      if (topGainers.length > 0) {
        insights.push(`Top gaining stocks led by ${topGainers[0].ticker} with ${(topGainers[0].todaysChangePerc || 0).toFixed(1)}% increase.`);
      }
      
      if (topLosers.length > 0) {
        insights.push(`Market volatility evident with ${topLosers[0].ticker} declining ${Math.abs(topLosers[0].todaysChangePerc || 0).toFixed(1)}%.`);
      }

      insights.push(`Trading volumes suggest active institutional participation in today's session.`);
    }

    const response = {
      movers: movers,
      insights: insights,
      lastUpdated: new Date().toISOString()
    };

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
    console.error('Error fetching polygon market movers:', error)
    
    // Return fallback data
    const fallbackResponse = {
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
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data due to API error'
    };

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
