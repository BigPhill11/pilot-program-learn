
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
    const fmpApiKey = Deno.env.get('FMP_API_KEY');
    
    if (!fmpApiKey) {
      return new Response(
        JSON.stringify({ error: 'FMP API key not configured' }),
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

    // Search using FMP's search endpoint
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/search?query=${encodeURIComponent(query)}&limit=20&apikey=${fmpApiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('FMP API error:', errorData);
      return new Response(
        JSON.stringify({ error: errorData.error?.message || 'Failed to search securities' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('FMP search response received');

    // Transform the data to match our expected format
    const transformedData = data.map((item: any) => {
      // Determine asset type based on symbol patterns and exchange
      let assetType = 'stock';
      if (item.symbol.includes('=F') || item.exchangeShortName === 'COMMODITY') {
        assetType = 'commodity';
      } else if (item.symbol.includes('^') || ['DJI', 'SPX', 'IXIC'].includes(item.symbol)) {
        assetType = 'index';
      } else if (item.name.toLowerCase().includes('etf') || item.exchangeShortName === 'ETF') {
        assetType = 'etf';
      } else if (item.name.toLowerCase().includes('bond')) {
        assetType = 'bond';
      }

      return {
        symbol: item.symbol,
        name: item.name,
        exchange: item.exchangeShortName || 'UNKNOWN',
        assetType,
        currency: item.currency || 'USD'
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
