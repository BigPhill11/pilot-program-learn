// Unified FMP API Handler that combines all available API keys
export class FMPApiHandler {
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
      cashFlow: Deno.env.get('FMP_CASH_FLOW_API_KEY') || ''
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
    if (endpoint.includes('price')) {
      return this.apiKeys.stockPrice || this.apiKeys.stockSymbolSearch;
    }
    if (endpoint.includes('chart')) {
      return this.apiKeys.chart30Min || this.apiKeys.commoditiesChart1Hour;
    }
    if (endpoint.includes('financial-statement')) {
      return this.apiKeys.incomeStatement || this.apiKeys.balanceSheet || this.apiKeys.cashFlow;
    }
    if (endpoint.includes('commodities')) {
      return this.apiKeys.commoditiesList || this.apiKeys.commoditiesChart1Hour;
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

  // New API Methods - Financial Data
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
    const apiKey = this.apiKeys.stockPrice;
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

  async getStockChart(symbol: string, from?: string, to?: string): Promise<any> {
    const apiKey = this.apiKeys.chart30Min;
    if (!apiKey) return null;

    try {
      const fromParam = from || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const toParam = to || new Date().toISOString().split('T')[0];
      
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/historical-chart/30min/${symbol}?from=${fromParam}&to=${toParam}&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching stock chart:', error);
      return null;
    }
  }

  async getCompanyNotes(symbol: string): Promise<any> {
    const apiKey = this.apiKeys.companyNotes;
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v4/company-notes?symbol=${symbol}&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching company notes:', error);
      return null;
    }
  }

  async getPeerComparison(symbol: string): Promise<any> {
    const apiKey = this.apiKeys.peerComparison;
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${symbol}&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching peer comparison:', error);
      return null;
    }
  }

  async getIncomeStatement(symbol: string, period: 'annual' | 'quarter' = 'annual'): Promise<any> {
    const apiKey = this.apiKeys.incomeStatement;
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?period=${period}&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching income statement:', error);
      return null;
    }
  }

  async getBalanceSheet(symbol: string, period: 'annual' | 'quarter' = 'annual'): Promise<any> {
    const apiKey = this.apiKeys.balanceSheet;
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?period=${period}&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching balance sheet:', error);
      return null;
    }
  }

  async getCashFlowStatement(symbol: string, period: 'annual' | 'quarter' = 'annual'): Promise<any> {
    const apiKey = this.apiKeys.cashFlow;
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?period=${period}&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching cash flow statement:', error);
      return null;
    }
  }

  // Market Data Methods
  async getIPOsCalendar(from?: string, to?: string): Promise<any> {
    const apiKey = this.apiKeys.iposCalendar;
    if (!apiKey) return null;

    try {
      const fromParam = from || new Date().toISOString().split('T')[0];
      const toParam = to || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/ipo_calendar?from=${fromParam}&to=${toParam}&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching IPOs calendar:', error);
      return null;
    }
  }

  async getMergersAcquisitions(): Promise<any> {
    const apiKey = this.apiKeys.mergersAcquisitions;
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v4/mergers-acquisitions-rss-feed?page=0&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching M&A data:', error);
      return null;
    }
  }

  async getTreasuryRates(): Promise<any> {
    const apiKey = this.apiKeys.treasuryRates;
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v4/treasury?from=1month&to=30year&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching treasury rates:', error);
      return null;
    }
  }

  async getCommoditiesList(): Promise<any> {
    const apiKey = this.apiKeys.commoditiesList;
    if (!apiKey) return null;

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/quotes/commodity?apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching commodities list:', error);
      return null;
    }
  }

  async getCommodityChart(symbol: string, from?: string, to?: string): Promise<any> {
    const apiKey = this.apiKeys.commoditiesChart1Hour;
    if (!apiKey) return null;

    try {
      const fromParam = from || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const toParam = to || new Date().toISOString().split('T')[0];
      
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/historical-chart/1hour/${symbol}?from=${fromParam}&to=${toParam}&apikey=${apiKey}`
      );
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching commodity chart:', error);
      return null;
    }
  }

  // Utility Methods
  async getAvailableSectors(): Promise<string[]> {
    const apiKey = this.apiKeys.sectors;
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/sector-performance?apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return data.map((item: any) => item.sector).filter(Boolean);
    } catch (error) {
      console.error('Error fetching sectors:', error);
      return [];
    }
  }

  async getAvailableIndustries(): Promise<string[]> {
    const apiKey = this.apiKeys.industries;
    if (!apiKey) return [];

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/industry_price_earning_ratio?exchange=NYSE&apikey=${apiKey}`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      return data.map((item: any) => item.industry).filter(Boolean);
    } catch (error) {
      console.error('Error fetching industries:', error);
      return [];
    }
  }
}
