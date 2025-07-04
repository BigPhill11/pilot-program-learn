import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, limit = 20 } = await req.json();
    
    if (!query || query.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Query must be at least 2 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FMP_STOCK_SYMBOL_SEARCH_API_KEY');
    if (!apiKey) {
      throw new Error('FMP Stock Symbol Search API key not configured');
    }

    console.log(`Searching securities for: ${query}`);
    
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/search?query=${encodeURIComponent(query)}&limit=${limit}&apikey=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'FMP-Securities-Search-Service/1.0',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the data to match our expected format
    const transformedResults = data.map((item: any) => ({
      symbol: item.symbol,
      name: item.name || item.symbol,
      exchange: item.exchangeShortName || item.exchange || 'US',
      assetType: item.type?.toLowerCase() || 'stock',
      currency: item.currency || 'USD'
    }));

    console.log(`Found ${transformedResults.length} securities for query: ${query}`);
    
    return new Response(
      JSON.stringify(transformedResults),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in securities search service:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});