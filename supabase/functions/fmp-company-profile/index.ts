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
    const { symbol } = await req.json();
    
    if (!symbol) {
      return new Response(
        JSON.stringify({ error: 'Symbol parameter required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FMP_COMPANY_PROFILE_API_KEY');
    if (!apiKey) {
      throw new Error('FMP Company Profile API key not configured');
    }

    console.log(`Fetching company profile for: ${symbol}`);
    
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'FMP-Company-Profile-Service/1.0',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched profile for ${symbol}`);
    
    return new Response(
      JSON.stringify(data[0] || {}),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in company profile service:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});