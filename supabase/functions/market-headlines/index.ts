
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

console.log("market-headlines function started");

const FINNHUB_API_KEY = Deno.env.get("FINNHUB_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!FINNHUB_API_KEY) {
      throw new Error("FINNHUB_API_KEY is not set in environment variables.");
    }

    const apiUrl = `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`;
    
    console.log(`Fetching headlines from Finnhub API`);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Finnhub API error response:", errorText);
      throw new Error(`Failed to fetch data from Finnhub API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Received headlines from Finnhub API");

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received from Finnhub API");
    }

    // Filter and map the data to a consistent format and limit to 7
    const headlines = data
      .filter(item => item.summary && item.headline && item.url)
      .map(item => ({
        id: item.id,
        title: item.headline,
        summary: item.summary,
        url: item.url,
      }))
      .slice(0, 7);

    return new Response(JSON.stringify(headlines), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
