
// Unified FMP API Handler that combines all available API keys
export class FMPApiHandler {
  private apiKeys: { [key: string]: string };

  constructor() {
    this.apiKeys = {
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
      ratingsSnapshot: Deno.env.get('FMP_RATINGS_SNAPSHOT_API_KEY') || ''
    };
  }

  private getApiKey(endpoint: string): string {
    // Use the most appropriate API key based on the endpoint
    if (endpoint.includes('search')) {
      return this.apiKeys.stockSymbolSearch || this.apiKeys.companyNameSearch;
    }
    if (endpoint.includes('etf')) {
      return this.apiKeys.etfSymbolSearch || this.apiKeys.stockSymbolSearch;
    }
    if (endpoint.includes('symbol')) {
      return this.apiKeys.companySymbolsList || this.apiKeys.stockSymbolSearch;
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

      // Remove duplicates based on symbol
      const uniqueResults = results.filter((item, index, self) => 
        index === self.findIndex(t => t.symbol === item.symbol)
      );

      return uniqueResults.slice(0, 20); // Limit to top 20 results
    } catch (error) {
      console.error('Error in searchSecurities:', error);
      return [];
    }
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

  // Additional utility methods for other endpoints
  async getCompanyProfile(symbol: string): Promise<any> {
    const apiKey = this.getApiKey('company-profile');
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
}
