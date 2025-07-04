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
    const { service } = await req.json();
    
    if (!service) {
      return new Response(
        JSON.stringify({ error: 'Service type required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let apiKey: string | undefined;
    let endpoint: string;

    // Select appropriate API key and endpoint based on service type
    switch (service) {
      case 'sector-performance':
        apiKey = Deno.env.get('FMP_AVAILABLE_SECTORS_API_KEY');
        endpoint = 'sector-performance';
        break;
      case 'market-gainers':
        apiKey = Deno.env.get('FMP_STOCK_SCREENER_API_KEY');
        endpoint = 'stock_market/gainers';
        break;
      case 'market-losers':
        apiKey = Deno.env.get('FMP_STOCK_SCREENER_API_KEY');
        endpoint = 'stock_market/losers';
        break;
      case 'earnings-calendar':
        apiKey = Deno.env.get('FMP_EARNINGS_TRANSCRIPT_LIST_API_KEY');
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        endpoint = `earning_calendar?from=${today}&to=${nextWeek}`;
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid service type' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    if (!apiKey) {
      throw new Error(`API key not configured for ${service}`);
    }

    console.log(`Fetching market data for: ${service}`);
    
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/${endpoint}?apikey=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'FMP-Market-Data-Service/1.0',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${service} data`);
    
    return new Response(
      JSON.stringify(data || []),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in market data service:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});