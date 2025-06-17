
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { fetchNewsFromAPI } from './news-api.ts';
import { processNewsArticles } from './data-processor.ts';
import { generateMarketRecap } from './market-analysis.ts';
import { getFallbackHeadlines } from './fallback-data.ts';
import { HeadlinesResponse } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const NEWSDATA_IO_API_KEY = Deno.env.get('NEWSDATA_IO_API_KEY')
    
    if (!NEWSDATA_IO_API_KEY) {
      throw new Error('NEWSDATA_IO_API_KEY not found')
    }

    // Fetch news articles
    const articles = await fetchNewsFromAPI(NEWSDATA_IO_API_KEY);
    
    // Process headlines with enhanced summaries
    const processedHeadlines = processNewsArticles(articles);
    console.log(`Processed ${processedHeadlines.length} headlines successfully`);

    // Generate market recap from the headlines
    const marketRecap = generateMarketRecap(processedHeadlines);

    const response: HeadlinesResponse = {
      headlines: processedHeadlines,
      marketRecap: marketRecap,
      lastUpdated: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error fetching headlines:', error)
    
    // Return fallback headlines if API fails
    const fallbackHeadlines = getFallbackHeadlines();
    const fallbackRecap = generateMarketRecap(fallbackHeadlines);

    const fallbackResponse: HeadlinesResponse = {
      headlines: fallbackHeadlines,
      marketRecap: fallbackRecap,
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback data due to API error'
    };

    return new Response(
      JSON.stringify(fallbackResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
