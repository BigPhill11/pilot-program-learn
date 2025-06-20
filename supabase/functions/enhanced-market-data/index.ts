
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const polygonApiKey = Deno.env.get('POLYGON_API_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Required environment variables not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching market data from Polygon.io...');

    // Define the symbols we want to fetch with their Polygon symbols
    const symbols = [
      { symbol: 'I:NDX', name: 'NASDAQ', type: 'index' },
      { symbol: 'I:DJI', name: 'Dow Jones', type: 'index' },
      { symbol: 'I:SPX', name: 'S&P 500', type: 'index' },
      { symbol: 'X:XAUUSD', name: 'Gold', type: 'commodity' },
      { symbol: 'X:USOIL', name: 'Crude Oil', type: 'commodity' },
      { symbol: 'I:VIX', name: 'Volatility Index', type: 'index' }
    ];

    const marketData = [];

    // Try Polygon.io first if API key is available
    if (polygonApiKey) {
      console.log('Using Polygon.io API for market data');
      
      for (const item of symbols) {
        try {
          console.log(`Fetching data for ${item.name} (${item.symbol})`);
          
          const response = await fetch(
            `https://api.polygon.io/v2/aggs/ticker/${item.symbol}/prev?adjusted=true&apikey=${polygonApiKey}`,
            {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(`Polygon response for ${item.name}:`, data);
            
            if (data?.results?.[0]) {
              const result = data.results[0];
              const price = result.c || 0; // closing price
              const openPrice = result.o || price;
              const change = price - openPrice;
              const changePercent = openPrice !== 0 ? (change / openPrice) * 100 : 0;
              
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
            }
          } else {
            console.error(`Failed to fetch ${item.name} from Polygon: ${response.status}`);
          }
          
          // Small delay to be respectful to the API
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error(`Error fetching ${item.name} from Polygon:`, error);
        }
      }
    }

    // Fallback to Yahoo Finance if Polygon failed or no API key
    if (marketData.length === 0) {
      console.log('Falling back to Yahoo Finance API');
      
      const yahooPrices = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/^IXIC,^DJI,^GSPC,GLD,CL=F,^VIX?interval=1d&range=2d`,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json',
          },
        }
      );

      if (yahooPrices.ok) {
        const data = await yahooPrices.json();
        
        if (data?.chart?.result) {
          for (let i = 0; i < data.chart.result.length; i++) {
            const result = data.chart.result[i];
            const meta = result.meta;
            
            if (meta) {
              const currentPrice = meta.regularMarketPrice || meta.previousClose || 0;
              const previousClose = meta.previousClose || currentPrice;
              const change = currentPrice - previousClose;
              const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;
              
              let name = '';
              let type = 'index';
              
              switch (meta.symbol) {
                case '^IXIC': name = 'NASDAQ'; break;
                case '^DJI': name = 'Dow Jones'; break;
                case '^GSPC': name = 'S&P 500'; break;
                case 'GLD': name = 'Gold'; type = 'commodity'; break;
                case 'CL=F': name = 'Crude Oil'; type = 'commodity'; break;
                case '^VIX': name = 'Volatility Index'; break;
              }
              
              if (name) {
                const marketItem = {
                  symbol: meta.symbol,
                  name: name,
                  price: currentPrice,
                  change_amount: change,
                  change_percent: changePercent,
                  asset_type: type
                };

                marketData.push(marketItem);
                
                // Update cache
                await supabase
                  .from('market_data_cache')
                  .upsert({
                    symbol: meta.symbol,
                    name: name,
                    price: currentPrice,
                    change_amount: change,
                    change_percent: changePercent,
                    asset_type: type,
                    last_updated: new Date().toISOString()
                  });
              }
            }
          }
        }
      }
    }

    console.log('Final market data array:', marketData);
    console.log('Market data fetched and cached successfully');

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
