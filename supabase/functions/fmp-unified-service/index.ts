import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// FMP API Key rotation and failover system
class FMPKeyManager {
  private keys: string[];
  private currentKeyIndex: number = 0;
  private keyUsage: Map<string, { requests: number, lastReset: number }>;
  
  constructor() {
    this.keys = this.loadKeys();
    this.keyUsage = new Map();
    this.initializeUsageTracking();
  }
  
  private loadKeys(): string[] {
    const keys = [
      Deno.env.get('FMP_API_KEY'),
      Deno.env.get('FMP_STOCK_SYMBOL_SEARCH_API_KEY'),
      Deno.env.get('FMP_COMPANY_NAME_SEARCH_API_KEY'),
      Deno.env.get('FMP_STOCK_PRICE_API_KEY'),
      Deno.env.get('FMP_COMPANY_PROFILE_API_KEY'),
      Deno.env.get('FMP_INCOME_STATEMENT_API_KEY'),
      Deno.env.get('FMP_BALANCE_SHEET_API_KEY'),
      Deno.env.get('FMP_CASH_FLOW_API_KEY'),
      Deno.env.get('FMP_STOCK_SCREENER_API_KEY'),
      Deno.env.get('FMP_RATINGS_SNAPSHOT_API_KEY'),
    ].filter(key => key !== null && key !== undefined) as string[];
    
    if (keys.length === 0) {
      throw new Error('No FMP API keys configured');
    }
    
    return keys;
  }
  
  private initializeUsageTracking() {
    this.keys.forEach(key => {
      this.keyUsage.set(key, { requests: 0, lastReset: Date.now() });
    });
  }
  
  private resetDailyUsageIfNeeded(key: string) {
    const usage = this.keyUsage.get(key);
    if (!usage) return;
    
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    if (now - usage.lastReset > dayInMs) {
      this.keyUsage.set(key, { requests: 0, lastReset: now });
    }
  }
  
  getKey(): string {
    const key = this.keys[this.currentKeyIndex];
    this.resetDailyUsageIfNeeded(key);
    
    const usage = this.keyUsage.get(key);
    if (usage) {
      usage.requests++;
    }
    
    return key;
  }
  
  rotateKey() {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
    console.log(`Rotated to API key index: ${this.currentKeyIndex}`);
  }
  
  getUsageStats() {
    return Array.from(this.keyUsage.entries()).map(([key, usage]) => ({
      keyIndex: this.keys.indexOf(key),
      requests: usage.requests,
      lastReset: new Date(usage.lastReset).toISOString()
    }));
  }
}

const keyManager = new FMPKeyManager();

async function makeFMPRequest(endpoint: string, params: Record<string, string> = {}, retries = 3): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const apiKey = keyManager.getKey();
      const queryParams = new URLSearchParams({ ...params, apikey: apiKey });
      const url = `https://financialmodelingprep.com/api/v3/${endpoint}?${queryParams}`;
      
      console.log(`FMP Request (attempt ${attempt + 1}): ${endpoint}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'FMP-Unified-Service/1.0',
          'Accept': 'application/json',
        },
      });
      
      if (response.status === 429) {
        console.log('Rate limit hit, rotating key...');
        keyManager.rotateKey();
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
      
      if (!response.ok) {
        throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`FMP Request successful for ${endpoint}`);
      return data;
      
    } catch (error) {
      console.error(`FMP Request failed (attempt ${attempt + 1}):`, error);
      if (attempt < retries - 1) {
        keyManager.rotateKey();
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let service = url.searchParams.get('service');
    let query = url.searchParams.get('query');
    
    // Handle POST requests with body data
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        service = body.service || service;
        query = body.query || query;
      } catch (e) {
        // If JSON parsing fails, continue with URL params
      }
    }
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Supabase configuration missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    switch (service) {
      case 'market-data': {
        console.log('Fetching market data from FMP...');
        
        const symbols = ['%5EIXIC', '%5EDJI', '%5EGSPC', 'GLD', 'USO', '%5EVIX'];
        const quotes = await makeFMPRequest('quote', { symbol: symbols.join(',') });
        
        const symbolMap: Record<string, { name: string, type: string }> = {
          '^IXIC': { name: 'NASDAQ', type: 'index' },
          '^DJI': { name: 'Dow Jones', type: 'index' },
          '^GSPC': { name: 'S&P 500', type: 'index' },
          'GLD': { name: 'Gold', type: 'commodity' },
          'USO': { name: 'Crude Oil', type: 'commodity' },
          '^VIX': { name: 'Volatility Index', type: 'index' }
        };

        const marketData = quotes.map((quote: any) => {
          const symbol = quote.symbol;
          const info = symbolMap[symbol] || { name: symbol, type: 'unknown' };
          
          return {
            symbol: symbol,
            name: info.name,
            price: quote.price || 0,
            change_amount: quote.change || 0,
            change_percent: quote.changesPercentage || 0,
            asset_type: info.type
          };
        });

        // Cache in database
        for (const item of marketData) {
          await supabase
            .from('market_data_cache')
            .upsert({
              symbol: item.symbol,
              name: item.name,
              price: item.price,
              change_amount: item.change_amount,
              change_percent: item.change_percent,
              asset_type: item.asset_type,
              last_updated: new Date().toISOString()
            });
        }

        return new Response(
          JSON.stringify(marketData),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'search': {
        if (!query || query.length < 2) {
          return new Response(
            JSON.stringify({ error: 'Query must be at least 2 characters' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log(`Searching securities with FMP: ${query}`);
        
        const searchResults = await makeFMPRequest('search', { query, limit: '20' });
        
        const transformedResults = searchResults.map((item: any) => ({
          symbol: item.symbol,
          name: item.name || item.symbol,
          exchange: item.exchangeShortName || item.exchange || 'US',
          assetType: item.type?.toLowerCase() || 'stock',
          currency: item.currency || 'USD'
        }));

        return new Response(
          JSON.stringify(transformedResults),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'company-profile': {
        const symbol = url.searchParams.get('symbol');
        if (!symbol) {
          return new Response(
            JSON.stringify({ error: 'Symbol parameter required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const profile = await makeFMPRequest(`profile/${symbol}`);
        return new Response(
          JSON.stringify(profile[0] || {}),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'financial-ratios': {
        const symbol = url.searchParams.get('symbol');
        if (!symbol) {
          return new Response(
            JSON.stringify({ error: 'Symbol parameter required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const ratios = await makeFMPRequest(`ratios/${symbol}`, { limit: '1' });
        return new Response(
          JSON.stringify(ratios[0] || {}),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'analyst-estimates': {
        const symbol = url.searchParams.get('symbol');
        if (!symbol) {
          return new Response(
            JSON.stringify({ error: 'Symbol parameter required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const estimates = await makeFMPRequest(`analyst-estimates/${symbol}`);
        return new Response(
          JSON.stringify(estimates),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'earnings-calendar': {
        const from = url.searchParams.get('from') || new Date().toISOString().split('T')[0];
        const to = url.searchParams.get('to') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const earnings = await makeFMPRequest('earning_calendar', { from, to });
        return new Response(
          JSON.stringify(earnings),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'sector-performance': {
        const sectors = await makeFMPRequest('sector-performance');
        return new Response(
          JSON.stringify(sectors),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'market-gainers': {
        const gainers = await makeFMPRequest('stock_market/gainers');
        return new Response(
          JSON.stringify(gainers),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'market-losers': {
        const losers = await makeFMPRequest('stock_market/losers');
        return new Response(
          JSON.stringify(losers),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'financial-statements': {
        const symbol = url.searchParams.get('symbol');
        const statement = url.searchParams.get('statement') || 'income'; // income, balance-sheet, cash-flow
        const period = url.searchParams.get('period') || 'annual'; // annual, quarter
        
        if (!symbol) {
          return new Response(
            JSON.stringify({ error: 'Symbol parameter required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        let endpoint = '';
        switch (statement) {
          case 'income':
            endpoint = `income-statement/${symbol}`;
            break;
          case 'balance-sheet':
            endpoint = `balance-sheet-statement/${symbol}`;
            break;
          case 'cash-flow':
            endpoint = `cash-flow-statement/${symbol}`;
            break;
          default:
            endpoint = `income-statement/${symbol}`;
        }

        const statements = await makeFMPRequest(endpoint, { period });
        return new Response(
          JSON.stringify(statements),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'stock-screener': {
        const marketCap = url.searchParams.get('marketCap') || 'largecap';
        const sector = url.searchParams.get('sector') || '';
        const limit = url.searchParams.get('limit') || '50';
        
        const params: Record<string, string> = { limit };
        if (marketCap) params.marketCapMoreThan = marketCap === 'largecap' ? '10000000000' : '1000000000';
        if (sector) params.sector = sector;

        const results = await makeFMPRequest('stock-screener', params);
        return new Response(
          JSON.stringify(results),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'quote': {
        const symbol = url.searchParams.get('symbol');
        if (!symbol) {
          return new Response(
            JSON.stringify({ error: 'Symbol parameter required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const quote = await makeFMPRequest(`quote/${symbol}`);
        return new Response(
          JSON.stringify(quote[0] || {}),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'historical-price': {
        const symbol = url.searchParams.get('symbol');
        const from = url.searchParams.get('from') || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const to = url.searchParams.get('to') || new Date().toISOString().split('T')[0];
        
        if (!symbol) {
          return new Response(
            JSON.stringify({ error: 'Symbol parameter required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const historical = await makeFMPRequest(`historical-price-full/${symbol}`, { from, to });
        return new Response(
          JSON.stringify(historical.historical || []),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'economic-indicators': {
        const indicator = url.searchParams.get('indicator') || 'GDP';
        const economic = await makeFMPRequest(`economic`, { name: indicator });
        return new Response(
          JSON.stringify(economic),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'stats': {
        return new Response(
          JSON.stringify({
            keyUsage: keyManager.getUsageStats(),
            totalKeys: keyManager.keys.length
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default: {
        return new Response(
          JSON.stringify({ 
            error: 'Service not found', 
            availableServices: [
              'market-data', 'search', 'company-profile', 'financial-ratios', 
              'analyst-estimates', 'earnings-calendar', 'sector-performance',
              'market-gainers', 'market-losers', 'financial-statements', 
              'stock-screener', 'quote', 'historical-price', 'economic-indicators', 'stats'
            ]
          }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

  } catch (error) {
    console.error('Error in FMP unified service:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Alias for makeFMPRequest to avoid naming conflicts
async function makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
  return makeFMPRequest(endpoint, params);
}