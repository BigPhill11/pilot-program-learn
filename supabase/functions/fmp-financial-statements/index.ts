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
    const { symbol, statement, period = 'annual' } = await req.json();
    
    if (!symbol || !statement) {
      return new Response(
        JSON.stringify({ error: 'Symbol and statement type required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let apiKey: string | undefined;
    let endpoint: string;

    // Select appropriate API key and endpoint based on statement type
    switch (statement) {
      case 'income':
        apiKey = Deno.env.get('FMP_INCOME_STATEMENT_API_KEY');
        endpoint = `income-statement/${symbol}`;
        break;
      case 'balance':
        apiKey = Deno.env.get('FMP_BALANCE_SHEET_API_KEY');
        endpoint = `balance-sheet-statement/${symbol}`;
        break;
      case 'cashflow':
        apiKey = Deno.env.get('FMP_CASH_FLOW_API_KEY');
        endpoint = `cash-flow-statement/${symbol}`;
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid statement type. Use: income, balance, or cashflow' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    if (!apiKey) {
      throw new Error(`API key not configured for ${statement} statement`);
    }

    console.log(`Fetching ${statement} statement for: ${symbol}`);
    
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/${endpoint}?period=${period}&limit=5&apikey=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'FMP-Financial-Statements-Service/1.0',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${statement} statement for ${symbol}`);
    
    return new Response(
      JSON.stringify(data || []),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in financial statements service:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});