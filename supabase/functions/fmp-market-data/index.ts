import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Unified FMP API Handler - copied directly to make function self-contained
class FMPApiHandler {
  private apiKeys: { [key: string]: string };

  constructor() {
    this.apiKeys = {
      // Existing APIs
      stockSymbolSearch: Deno.env.get('FMP_STOCK_SYMBOL_SEARCH_API_KEY') || '',
      companyNameSearch: Deno.env.get('FMP_COMPANY_NAME_SEARCH_API_KEY') || '',
      cik: Deno.env.get('FMP_CIK_API_KEY') || '',
      cusip: Deno.env.get('FMP_CUSIP_API_KEY') || '',
      stockScreener: Deno.env.get('FMP_STOCK_SCREENER_API_KEY') || '',
      companySymbolsList: Deno.env.get('FMP_COMPANY_SYMBOLS_LIST_API_KEY') || '',
      financialStatementSymbols: Deno.env.get('FMP_FINANCIAL_STATEMENT_SYMBOLS_LIST_API_KEY') || '',
      symbolChanges: Deno.env.get('FMP_SYMBOL_CHANGES_LIST_API_KEY') || '',
      etfSymbolSearch: Deno.env.get('FMP_ETF_SYMBOL_SEARCH_API_KEY') || '',
      earningsTranscript: Deno.env.get('FMP_EARNINGS_TRANSCRIPT_LIST_API_KEY') || '',
      sectors: Deno.env.get('FMP_AVAILABLE_SECTORS_API_KEY') || '',
      industries: Deno.env.get('FMP_AVAILABLE_INDUSTRIES_API_KEY') || '',
      countries: Deno.env.get('FMP_AVAILABLE_COUNTRIES_API_KEY') || '',
      financialEstimates: Deno.env.get('FMP_FINANCIAL_ESTIMATES_API_KEY') || '',
      ratingsSnapshot: Deno.env.get('FMP_RATINGS_SNAPSHOT_API_KEY') || '',
      
      // New APIs
      iposCalendar: Deno.env.get('FMP_IPOS_CALENDAR_API_KEY') || '',
      stockPrice: Deno.env.get('FMP_STOCK_PRICE_API_KEY') || '',
      chart30Min: Deno.env.get('FMP_30MIN_CHART_API_KEY') || '',
      companyProfile: Deno.env.get('FMP_COMPANY_PROFILE_API_KEY') || '',
      companyNotes: Deno.env.get('FMP_COMPANY_NOTES_API_KEY') || '',
      peerComparison: Deno.env.get('FMP_PEER_COMPARISON_API_KEY') || '',
      mergersAcquisitions: Deno.env.get('FMP_MERGERS_ACQUISITIONS_API_KEY') || '',
      treasuryRates: Deno.env.get('FMP_TREASURY_RATES_API_KEY') || '',
      commoditiesList: Deno.env.get('FMP_COMMODITIES_LIST_API_KEY') || '',
      commoditiesChart1Hour: Deno.env.get('FMP_1HOUR_COMMODITIES_CHART_API_KEY') || '',
      incomeStatement: Deno.env.get('FMP_INCOME_STATEMENT_API_KEY') || '',
      balanceSheet: Deno.env.get('FMP_BALANCE_SHEET_API_KEY') || '',
      cashFlow: Deno.env.get('FMP_CASH_FLOW_API_KEY') || '',
      majorIndexes: Deno.env.get('FMP_MAJOR_INDEXES_API_KEY') || '',
      sectorPerformance: Deno.env.get('FMP_SECTOR_PERFORMANCE_API_KEY') || '',
      stockGainers: Deno.env.get('FMP_STOCK_GAINERS_API_KEY') || '',
      stockLosers: Deno.env.get('FMP_STOCK_LOSERS_API_KEY') || '',
      commodityPrices: Deno.env.get('FMP_COMMODITY_PRICES_API_KEY') || ''
    };
  }

  private getApiKey(endpoint: string): string {
    // Smart key selection based on endpoint type
    if (endpoint.includes('search')) {
      return this.apiKeys.stockSymbolSearch || this.apiKeys.companyNameSearch;
    }
    if (endpoint.includes('etf')) {
      return this.apiKeys.etfSymbolSearch || this.apiKeys.stockSymbolSearch;
    }
    if (endpoint.includes('symbol')) {
      return this.apiKeys.companySymbolsList || this.apiKeys.stockSymbolSearch;
    }
    if (endpoint.includes('profile')) {
      return this.apiKeys.companyProfile || this.apiKeys.stockSymbolSearch;
    }
    if (endpoint.includes('price') || endpoint.includes('quote')) {
      return this.apiKeys.stockPrice || this.apiKeys.stockSymbolSearch;
    }
    if (endpoint.includes('chart')) {
      return this.apiKeys.chart30Min || this.apiKeys.commoditiesChart1Hour;
    }
    if (endpoint.includes('financial-statement')) {
      return this.apiKeys.incomeStatement || this.apiKeys.balanceSheet || this.apiKeys.cashFlow;
    }
    if (endpoint.includes('commodities')) {
      return this.apiKeys.commoditiesList || this.apiKeys.commoditiesChart1Hour || this.apiKeys.commodityPrices;
    }
    if (endpoint.includes('sector')) {
      return this.apiKeys.sectorPerformance || this.apiKeys.stockSymbolSearch;
    }
    if (endpoint.includes('gainers') || endpoint.includes('losers')) {
      return this.apiKeys.stockGainers || this.apiKeys.stockLosers || this.apiKeys.stockSymbolSearch;
    }
    if (endpoint.includes('indexes') || endpoint.includes('majors')) {
      return this.apiKeys.majorIndexes || this.apiKeys.stockSymbolSearch;
    }
    
    // Default fallback
    return this.apiKeys.stockSymbolSearch || Object.values(this.apiKeys).find(key => key) || '';
  }

  async searchSecurities(query: string): Promise<any[]> {
    const results: any[] = [];
    
    try {
      // 1. Stock Symbol Search
      const stockResults = await this.fetchStockSymbols(query);
      results.push(...stockResults);

      // 2. Company Name Search  
      const companyResults = await this.fetchCompanyByName(query);
      results.push(...companyResults);

      // 3. ETF Search
      const etfResults = await this.fetchETFs(query);
      results.push(...etfResults);

      // 4. Enhanced search with company profiles
      const enhancedResults = await this.enhanceSearchResults(results.slice(0, 10));
      
      // Remove duplicates based on symbol
      const uniqueResults = enhancedResults.filter((item, index, self) => 
        index === self.findIndex(t => t.symbol === item.symbol)
      );

      return uniqueResults.slice(0, 20); // Limit to top 20 results
    } catch (error) {
      console.error('Error in searchSecurities:', error);
      return [];
    }
  }

  private async enhanceSearchResults(results: any[]): Promise<any[]> {
    const enhanced = [];
    
    for (const result of results) {
      try {
        const profile = await this.getCompanyProfile(result.symbol);
        if (profile && profile.length > 0) {
          const profileData = profile[0];
          enhanced.push({
            ...result,
            industry: profileData.industry || '',
            sector: profileData.sector || '',
            marketCap: profileData.mktCap || 0,
            description: profileData.description || '',
            website: profileData.website || '',
            country: profileData.country || ''
          });
        } else {
          enhanced.push(result);
        }
      } catch (error) {
        console.error(`Error enhancing ${result.symbol}:`, error);
        enhanced.push(result);
      }
    }
    
    return enhanced;
  }

  private async fetchStockSymbols(query: string): Promise<any[]> {
    const apiKey = this.getApiKey('stock-symbol-search');
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${encodeURIComponent(query)}&limit=10&apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return (data || []).map((item: any) => ({
        symbol: item.symbol,
        name: item.name,
        exchange: item.exchangeShortName || 'US',
        assetType: 'stock',
        currency: item.currency || 'USD'
      }));
    } catch (error) {
      console.error('Error fetching stock symbols:', error);
      return [];
    }
  }

  private async fetchCompanyByName(query: string): Promise<any[]> {
    const apiKey = this.getApiKey('company-name-search');
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/search-name?query=${encodeURIComponent(query)}&limit=10&apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return (data || []).map((item: any) => ({
        symbol: item.symbol,
        name: item.name,
        exchange: item.exchangeShortName || 'US',
        assetType: 'stock',
        currency: item.currency || 'USD'
      }));
    } catch (error) {
      console.error('Error fetching company names:', error);
      return [];
    }
  }

  private async fetchETFs(query: string): Promise<any[]> {
    const apiKey = this.getApiKey('etf-search');
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/etf/search/${encodeURIComponent(query)}?apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return (data || []).map((item: any) => ({
        symbol: item.symbol,
        name: item.name,
        exchange: item.exchange || 'US',
        assetType: 'etf',
        currency: 'USD'
      }));
    } catch (error) {
      console.error('Error fetching ETFs:', error);
      return [];
    }
  }

  async getCompanyProfile(symbol: string): Promise<any> {
    const apiKey = this.getApiKey('profile');
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching company profile:', error);
      return null;
    }
  }

  async getStockPrice(symbol: string): Promise<any> {
    const apiKey = this.getApiKey('quote');
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching stock price:', error);
      return null;
    }
  }

  async getMajorIndexes(): Promise<any[]> {
    const apiKey = this.getApiKey('indexes');
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/quotes/index?apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching major indexes:', error);
      return [];
    }
  }

  async getSectorPerformance(): Promise<any[]> {
    const apiKey = this.getApiKey('sector');
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/sector-performance?apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching sector performance:', error);
      return [];
    }
  }

  async getStockGainers(): Promise<any[]> {
    const apiKey = this.getApiKey('gainers');
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching stock gainers:', error);
      return [];
    }
  }

  async getStockLosers(): Promise<any[]> {
    const apiKey = this.getApiKey('losers');
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching stock losers:', error);
      return [];
    }
  }

  async getCommodityPrices(): Promise<any[]> {
    const apiKey = this.getApiKey('commodities');
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/quotes/commodity?apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching commodity prices:', error);
      return [];
    }
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let dataType = 'all';
    
    // Handle both GET query params and POST body
    if (req.method === 'GET') {
      const { searchParams } = new URL(req.url);
      dataType = searchParams.get('type') || 'all';
    } else if (req.method === 'POST') {
      try {
        const body = await req.json();
        dataType = body.type || 'all';
      } catch {
        dataType = 'all';
      }
    }
    
    console.log(`Fetching FMP market data for type: ${dataType}`);

    const fmpHandler = new FMPApiHandler();
    const response: any = {
      lastUpdated: new Date().toISOString()
    };

    if (dataType === 'all' || dataType === 'indexes') {
      // Fetch real-time major indexes
      try {
        const majorIndexes = await fmpHandler.getMajorIndexes();
        const commodities = await fmpHandler.getCommodityPrices();
        
        const indexData = [];
        
        // Process major stock indexes
        const indexSymbols = ['SPY', 'QQQ', 'DIA', 'IWM', 'VTI'];
        for (const symbol of indexSymbols) {
          const found = majorIndexes.find(idx => idx.symbol === symbol);
          if (found) {
            let title = symbol;
            if (symbol === 'SPY') title = 'S&P 500';
            else if (symbol === 'QQQ') title = 'NASDAQ';
            else if (symbol === 'DIA') title = 'Dow Jones';
            else if (symbol === 'IWM') title = 'Russell 2000';
            else if (symbol === 'VTI') title = 'Total Stock Market';
            
            indexData.push({
              title,
              value: `$${found.price?.toFixed(2) || '0.00'}`,
              change: found.changesPercentage || 0,
              changeSuffix: '%'
            });
          }
        }
        
        // Add Gold from commodities
        const gold = commodities.find(c => c.symbol === 'GCUSD' || c.symbol === 'GC=F');
        if (gold) {
          indexData.push({
            title: 'Gold',
            value: `$${gold.price?.toFixed(2) || '0.00'}`,
            change: gold.changesPercentage || 0,
            changeSuffix: '%'
          });
        }
        
        response.indexes = indexData;
      } catch (error) {
        console.error('Error fetching indexes:', error);
        response.indexes = [];
      }
    }

    if (dataType === 'all' || dataType === 'overview') {
      // Fetch real-time market overview data
      try {
        const [gainers, losers, sectors] = await Promise.all([
          fmpHandler.getStockGainers(),
          fmpHandler.getStockLosers(),
          fmpHandler.getSectorPerformance()
        ]);
        
        const marketMovers = [];
        
        // Add top gainers
        if (gainers && gainers.length > 0) {
          marketMovers.push({
            name: `${gainers[0].symbol} (Top Gainer)`,
            change: gainers[0].changesPercentage || 0
          });
        }
        
        // Add top loser
        if (losers && losers.length > 0) {
          marketMovers.push({
            name: `${losers[0].symbol} (Top Loser)`,
            change: losers[0].changesPercentage || 0
          });
        }
        
        // Add sector performance
        if (sectors && sectors.length > 0) {
          const topSector = sectors[0];
          marketMovers.push({
            name: `${topSector.sector} Sector`,
            change: parseFloat(topSector.changesPercentage?.replace('%', '')) || 0
          });
        }
        
        // Generate real-time insights based on market data
        const insights = [];
        
        if (gainers && gainers.length > 0) {
          insights.push(`${gainers[0].symbol} leads market gains with ${gainers[0].changesPercentage?.toFixed(1)}% increase.`);
        }
        
        if (sectors && sectors.length > 0) {
          const topSector = sectors[0];
          insights.push(`${topSector.sector} sector shows ${topSector.changesPercentage} performance today.`);
        }
        
        if (losers && losers.length > 0) {
          insights.push(`Market volatility evident with ${losers[0].symbol} declining ${Math.abs(losers[0].changesPercentage || 0).toFixed(1)}%.`);
        }
        
        // Add default insights if no data
        if (insights.length === 0) {
          insights.push(
            'Markets showing mixed signals as investors evaluate economic indicators.',
            'Technology and growth stocks continue to attract investor attention.',
            'Federal Reserve policy decisions remain a key market driver.'
          );
        }
        
        response.overview = {
          movers: marketMovers.length > 0 ? marketMovers : [
            { name: 'Technology Sector', change: 2.1 },
            { name: 'Energy Stocks', change: -1.3 },
            { name: 'Financial Services', change: 0.8 }
          ],
          insights
        };
      } catch (error) {
        console.error('Error fetching overview data:', error);
        response.overview = {
          movers: [
            { name: 'Technology Sector', change: 2.1 },
            { name: 'Energy Stocks', change: -1.3 },
            { name: 'Financial Services', change: 0.8 }
          ],
          insights: [
            'Markets showing mixed signals as investors evaluate economic indicators.',
            'Technology and growth stocks continue to attract investor attention.',
            'Federal Reserve policy decisions remain a key market driver.'
          ]
        };
      }
    }

    if (dataType === 'all' || dataType === 'headlines') {
      // Generate market headlines based on current real-time data
      try {
        const headlines = [];
        
        // Get real-time market data for contextual headlines
        const [spyData, sectors, gainers] = await Promise.all([
          fmpHandler.getStockPrice('SPY'),
          fmpHandler.getSectorPerformance(),
          fmpHandler.getStockGainers()
        ]);
        
        if (spyData && spyData.length > 0) {
          const spy = spyData[0];
          const direction = spy.changesPercentage > 0 ? 'gains' : 'declines';
          headlines.push({
            id: '1',
            title: `S&P 500 ${direction} ${Math.abs(spy.changesPercentage).toFixed(1)}% in today's trading session`,
            description: `The S&P 500 index moved ${spy.changesPercentage > 0 ? 'higher' : 'lower'} to $${spy.price?.toFixed(2)} as investors react to recent market developments and economic indicators.`,
            url: 'https://finance.yahoo.com',
            publishedAt: new Date().toISOString(),
            source: { name: 'FMP Market Data' },
            urlToImage: null
          });
        }
        
        if (gainers && gainers.length > 0) {
          const topGainer = gainers[0];
          headlines.push({
            id: '2',
            title: `${topGainer.symbol} surges ${topGainer.changesPercentage?.toFixed(1)}% leading market gains`,
            description: `${topGainer.name || topGainer.symbol} shares jumped to $${topGainer.price?.toFixed(2)}, making it one of today's top performers amid strong investor interest.`,
            url: 'https://finance.yahoo.com',
            publishedAt: new Date().toISOString(),
            source: { name: 'FMP Market Data' },
            urlToImage: null
          });
        }
        
        if (sectors && sectors.length > 0) {
          const topSector = sectors[0];
          headlines.push({
            id: '3',
            title: `${topSector.sector} sector leads with ${topSector.changesPercentage} performance`,
            description: `The ${topSector.sector} sector outperforms broader markets today, reflecting investor confidence in the industry's growth prospects and fundamentals.`,
            url: 'https://finance.yahoo.com',
            publishedAt: new Date().toISOString(),
            source: { name: 'FMP Market Data' },
            urlToImage: null
          });
        }
        
        // Add default headlines if no real-time data
        if (headlines.length === 0) {
          headlines.push({
            id: '1',
            title: 'Markets Show Resilience Amid Economic Uncertainty',
            description: 'Stock indices maintain stability as investors navigate changing economic conditions and policy developments.',
            url: 'https://finance.yahoo.com',
            publishedAt: new Date().toISOString(),
            source: { name: 'FMP Market Data' },
            urlToImage: null
          });
        }
        
        response.headlines = headlines;
      } catch (error) {
        console.error('Error generating headlines:', error);
        response.headlines = [
          {
            id: '1',
            title: 'Market Update: Trading Activity Continues',
            description: 'Financial markets remain active as investors monitor economic developments and corporate earnings reports.',
            url: 'https://finance.yahoo.com',
            publishedAt: new Date().toISOString(),
            source: { name: 'FMP Market Data' },
            urlToImage: null
          }
        ];
      }
    }

    console.log(`FMP market data response:`, response);

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in FMP market data function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
