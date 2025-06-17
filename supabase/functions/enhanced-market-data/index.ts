
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
    const alphaVantageApiKey = Deno.env.get('ALPHA_VANTAGE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!alphaVantageApiKey || !supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Required environment variables not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching market data from Alpha Vantage...');

    // Define the symbols we want to fetch with their Alpha Vantage symbols
    const symbols = [
      { symbol: 'IXIC', name: 'NASDAQ', type: 'index' },
      { symbol: 'DJI', name: 'Dow Jones', type: 'index' },
      { symbol: 'SPX', name: 'S&P 500', type: 'index' },
      { symbol: 'GLD', name: 'Gold', type: 'commodity' }, // Gold ETF as proxy
      { symbol: 'USO', name: 'Crude Oil', type: 'commodity' }, // Oil ETF as proxy
      { symbol: 'VIX', name: 'Volatility Index', type: 'index' }
    ];

    const marketData = [];

    for (const item of symbols) {
      try {
        console.log(`Fetching data for ${item.name} (${item.symbol})`);
        
        // Use Alpha Vantage GLOBAL_QUOTE function for real-time data
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=${alphaVantageApiKey}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(`Response for ${item.name}:`, data);
          
          const quote = data['Global Quote'];
          if (quote && quote['05. price']) {
            const price = parseFloat(quote['05. price']) || 0;
            const change = parseFloat(quote['09. change']) || 0;
            const changePercent = parseFloat(quote['10. change percent']?.replace('%', '')) || 0;
            
            const marketItem = {
              symbol: item.symbol,
              name: item.name,
              price: price,
              change_amount: change,
              change_percent: changePercent,
              asset_type: item.type
            };

            marketData.push(marketItem);
            console.log(`Added ${item.name} to market data:`, marketItem);

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
          } else {
            console.log(`No data returned for ${item.name}:`, data);
          }
        } else {
          console.error(`Failed to fetch ${item.name}: ${response.status} ${response.statusText}`);
        }
        
        // Add delay to respect rate limits (5 calls per minute for free tier)
        await new Promise(resolve => setTimeout(resolve, 12000)); // 12 second delay
        
      } catch (error) {
        console.error(`Error fetching ${item.name}:`, error);
        // Continue with other symbols even if one fails
      }
    }

    console.log('Final market data array:', marketData);
    console.log('Market data fetched and cached successfully with Alpha Vantage');

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
