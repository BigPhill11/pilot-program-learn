
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const alphaVantageApiKey = Deno.env.get('ALPHA_VANTAGE_API_KEY');
    
    if (!alphaVantageApiKey) {
      return new Response(
        JSON.stringify({ error: 'Alpha Vantage API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    
    if (!query || query.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Query must be at least 2 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching for securities: ${query}`);

    // Search using Alpha Vantage SYMBOL_SEARCH endpoint
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${alphaVantageApiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Alpha Vantage API error:', errorData);
      return new Response(
        JSON.stringify({ error: errorData.error?.message || 'Failed to search securities' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Alpha Vantage search response received');

    // Transform the data to match our expected format
    const bestMatches = data.bestMatches || [];
    const transformedData = bestMatches.slice(0, 20).map((item: any) => {
      // Determine asset type based on symbol patterns
      let assetType = 'stock';
      const symbol = item['1. symbol'];
      const name = item['2. name'];
      
      if (name.toLowerCase().includes('etf')) {
        assetType = 'etf';
      } else if (name.toLowerCase().includes('bond')) {
        assetType = 'bond';
      } else if (['DJI', 'SPX', 'IXIC', 'VIX'].includes(symbol)) {
        assetType = 'index';
      }

      return {
        symbol: symbol,
        name: name,
        exchange: item['4. region'] || 'US',
        assetType,
        currency: item['8. currency'] || 'USD'
      };
    });

    return new Response(
      JSON.stringify(transformedData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in securities-search function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
