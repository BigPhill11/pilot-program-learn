
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { fetchNewsFromAPI } from './news-api.ts';
import { fetchMarketOverviewFromNewsData } from './newsdata-api.ts';
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
    const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY')
    const NEWSDATA_IO_API_KEY = Deno.env.get('NEWSDATA_IO_API_KEY')
    
    if (!NEWS_API_KEY) {
      throw new Error('NEWS_API_KEY not found')
    }

    if (!NEWSDATA_IO_API_KEY) {
      throw new Error('NEWSDATA_IO_API_KEY not found')
    }

    // Get user level from request
    let userLevel = 'beginner';
    try {
      const requestData = await req.json();
      userLevel = requestData.userLevel || 'beginner';
    } catch {
      // Default to beginner if no body or parsing fails
      userLevel = 'beginner';
    }

    // Fetch headlines from NewsAPI
    const headlineArticles = await fetchNewsFromAPI(NEWS_API_KEY);
    
    // Process headlines with enhanced summaries based on user level
    const processedHeadlines = processNewsArticles(headlineArticles, userLevel);
    console.log(`Processed ${processedHeadlines.length} headlines from NewsAPI successfully`);

    // Fetch market overview data from newsdata.io for recap generation
    let marketRecapData = [];
    try {
      marketRecapData = await fetchMarketOverviewFromNewsData(NEWSDATA_IO_API_KEY);
      console.log(`Fetched ${marketRecapData.length} market overview articles from newsdata.io`);
    } catch (overviewError) {
      console.warn('Failed to fetch market overview from newsdata.io, using headlines for recap:', overviewError);
      marketRecapData = headlineArticles; // Fallback to headlines data
    }

    // Generate market recap from newsdata.io market overview data with user level
    const processedOverviewData = processNewsArticles(marketRecapData, userLevel);
    const marketRecap = generateMarketRecap(processedOverviewData, userLevel);

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
    const fallbackRecap = generateMarketRecap(fallbackHeadlines, 'beginner');

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
