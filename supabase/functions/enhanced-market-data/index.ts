
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const fmpApiKey = Deno.env.get('FMP_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!fmpApiKey || !supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Required environment variables not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching enhanced market data...');

    // Define the symbols we want to fetch with their display names and types
    const symbols = [
      { symbol: '^IXIC', name: 'NASDAQ', type: 'index' },
      { symbol: '^DJI', name: 'Dow Jones', type: 'index' },
      { symbol: '^GSPC', name: 'S&P 500', type: 'index' },
      { symbol: 'GC=F', name: 'Gold', type: 'commodity' },
      { symbol: 'CL=F', name: 'Crude Oil', type: 'commodity' },
      { symbol: '^VIX', name: 'Volatility Index', type: 'index' }
    ];

    const marketData = [];

    for (const item of symbols) {
      try {
        // Use FMP's quote endpoint for real-time data
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/quote/${item.symbol}?apikey=${fmpApiKey}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const quote = data[0];
            
            const marketItem = {
              symbol: item.symbol,
              name: item.name,
              price: parseFloat(quote.price) || 0,
              change_amount: parseFloat(quote.change) || 0,
              change_percent: parseFloat(quote.changesPercentage) || 0,
              asset_type: item.type
            };

            marketData.push(marketItem);

            // Update cache in database
            await supabase
              .from('market_data_cache')
              .upsert({
                symbol: item.symbol,
                name: item.name,
                price: marketItem.price,
                change_amount: marketItem.change_amount,
                change_percent: marketItem.change_percent,
                asset_type: item.type,
                last_updated: new Date().toISOString()
              });
          }
        }
      } catch (error) {
        console.error(`Error fetching ${item.name}:`, error);
        // Continue with other symbols even if one fails
      }
    }

    console.log('Enhanced market data fetched and cached successfully');

    return new Response(
      JSON.stringify(marketData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in enhanced-market-data function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
