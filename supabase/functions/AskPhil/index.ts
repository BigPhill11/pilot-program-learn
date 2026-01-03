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
    const FOUNDRY_API_KEY = Deno.env.get('MICROSOFT_FOUNDRY_API_KEY');
    const FOUNDRY_ENDPOINT = Deno.env.get('MICROSOFT_FOUNDRY_ENDPOINT');

    if (!FOUNDRY_API_KEY || !FOUNDRY_ENDPOINT) {
      console.error('Missing Foundry configuration');
      throw new Error('Microsoft Foundry is not configured');
    }

    const { messages, stream = false } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages array is required');
    }

    console.log('Calling Microsoft Foundry with', messages.length, 'messages');

    const response = await fetch(`${FOUNDRY_ENDPOINT}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FOUNDRY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { 
            role: 'system', 
            content: 'You are Phil, a friendly and knowledgeable financial education assistant. Help users learn about investing, trading, and personal finance in an approachable way.' 
          },
          ...messages
        ],
        stream,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Foundry API error:', response.status, errorText);
      throw new Error(`Foundry API error: ${response.status}`);
    }

    // Handle streaming response
    if (stream && response.body) {
      return new Response(response.body, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Handle non-streaming response
    const data = await response.json();
    console.log('Foundry response received successfully');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in AskPhil function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
