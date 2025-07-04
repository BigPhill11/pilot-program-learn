import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, DollarSign, Calendar, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FinancialData {
  date: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  operatingCashFlow: number;
  freeCashFlow: number;
}

interface CompanyProfile {
  companyName: string;
  sector: string;
  industry: string;
  marketCap: number;
  description: string;
}

const FinancialStatementsViewer: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [incomeData, setIncomeData] = useState<FinancialData[]>([]);
  const [balanceData, setBalanceData] = useState<FinancialData[]>([]);
  const [cashFlowData, setCashFlowData] = useState<FinancialData[]>([]);

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  const getChangeColor = (current: number, previous: number) => {
    if (current > previous) return 'text-emerald-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-emerald-600" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const searchCompany = async () => {
    if (!symbol.trim()) {
      toast.error('Please enter a company symbol');
      return;
    }

    setLoading(true);
    try {
      // Get company profile
      const profileResponse = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol.toUpperCase()}?apikey=${import.meta.env.VITE_FMP_API_KEY || 'demo'}`);
      const profileData = await profileResponse.json();
      
      if (!profileData || profileData.length === 0) {
        throw new Error('Company not found');
      }

      setCompany({
        companyName: profileData[0].companyName,
        sector: profileData[0].sector || 'Unknown',
        industry: profileData[0].industry || 'Unknown',
        marketCap: profileData[0].mktCap || 0,
        description: profileData[0].description || 'No description available'
      });

      // Get financial statements
      const [incomeResponse, balanceResponse, cashFlowResponse] = await Promise.all([
        fetch(`https://financialmodelingprep.com/api/v3/income-statement/${symbol.toUpperCase()}?period=annual&limit=3&apikey=${import.meta.env.VITE_FMP_API_KEY || 'demo'}`),
        fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol.toUpperCase()}?period=annual&limit=3&apikey=${import.meta.env.VITE_FMP_API_KEY || 'demo'}`),
        fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol.toUpperCase()}?period=annual&limit=3&apikey=${import.meta.env.VITE_FMP_API_KEY || 'demo'}`)
      ]);

      const [incomeJson, balanceJson, cashFlowJson] = await Promise.all([
        incomeResponse.json(),
        balanceResponse.json(),
        cashFlowResponse.json()
      ]);

      // Process income statement data
      const processedIncome = incomeJson.map((item: any) => ({
        date: item.date,
        revenue: item.revenue || 0,
        grossProfit: item.grossProfit || 0,
        operatingIncome: item.operatingIncome || 0,
        netIncome: item.netIncome || 0,
        totalAssets: 0,
        totalLiabilities: 0,
        totalEquity: 0,
        operatingCashFlow: 0,
        freeCashFlow: 0
      }));

      // Process balance sheet data
      const processedBalance = balanceJson.map((item: any) => ({
        date: item.date,
        revenue: 0,
        grossProfit: 0,
        operatingIncome: 0,
        netIncome: 0,
        totalAssets: item.totalAssets || 0,
        totalLiabilities: item.totalLiabilities || 0,
        totalEquity: item.totalStockholdersEquity || 0,
        operatingCashFlow: 0,
        freeCashFlow: 0
      }));

      // Process cash flow data
      const processedCashFlow = cashFlowJson.map((item: any) => ({
        date: item.date,
        revenue: 0,
        grossProfit: 0,
        operatingIncome: 0,
        netIncome: 0,
        totalAssets: 0,
        totalLiabilities: 0,
        totalEquity: 0,
        operatingCashFlow: item.operatingCashFlow || 0,
        freeCashFlow: item.freeCashFlow || 0
      }));

      setIncomeData(processedIncome);
      setBalanceData(processedBalance);
      setCashFlowData(processedCashFlow);

      toast.success(`Found financial data for ${profileData[0].companyName}`);
    } catch (error) {
      console.error('Error fetching financial data:', error);
      toast.error('Failed to fetch financial data. Please check the symbol and try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFinancialTable = (data: FinancialData[], type: 'income' | 'balance' | 'cashflow') => {
    if (data.length === 0) return <div className="text-center py-8 text-gray-500">No data available</div>;

    const getMetrics = () => {
      switch (type) {
        case 'income':
          return [
            { key: 'revenue', label: 'Revenue' },
            { key: 'grossProfit', label: 'Gross Profit' },
            { key: 'operatingIncome', label: 'Operating Income' },
            { key: 'netIncome', label: 'Net Income' }
          ];
        case 'balance':
          return [
            { key: 'totalAssets', label: 'Total Assets' },
            { key: 'totalLiabilities', label: 'Total Liabilities' },
            { key: 'totalEquity', label: 'Total Equity' }
          ];
        case 'cashflow':
          return [
            { key: 'operatingCashFlow', label: 'Operating Cash Flow' },
            { key: 'freeCashFlow', label: 'Free Cash Flow' }
          ];
      }
    };

    const metrics = getMetrics();

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-emerald-200">
              <th className="text-left py-3 px-4 font-semibold text-emerald-700">Metric</th>
              {data.map((item, index) => (
                <th key={index} className="text-right py-3 px-4 font-semibold text-emerald-700">
                  <div className="flex items-center justify-end gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.date).getFullYear()}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.key} className="border-b border-emerald-100 hover:bg-emerald-50">
                <td className="py-3 px-4 font-medium text-emerald-900">{metric.label}</td>
                {data.map((item, index) => {
                  const value = item[metric.key as keyof FinancialData] as number;
                  const prevValue = index < data.length - 1 ? data[index + 1][metric.key as keyof FinancialData] as number : 0;
                  
                  return (
                    <td key={index} className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`font-semibold ${getChangeColor(value, prevValue)}`}>
                          {formatCurrency(value)}
                        </span>
                        {index < data.length - 1 && getChangeIcon(value, prevValue)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Search className="h-5 w-5" />
            Financial Statements Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter company symbol (e.g., AAPL, GOOGL, MSFT)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && searchCompany()}
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>
            <Button 
              onClick={searchCompany} 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Company Profile */}
      {company && (
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Building2 className="h-5 w-5" />
              {company.companyName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Sector</p>
                <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                  {company.sector}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Industry</p>
                <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                  {company.industry}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Market Cap</p>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">
                    {formatCurrency(company.marketCap)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">{company.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Financial Statements */}
      {(incomeData.length > 0 || balanceData.length > 0 || cashFlowData.length > 0) && (
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-700">Financial Statements</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="income" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-emerald-50 border border-emerald-200">
                <TabsTrigger value="income" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  Income Statement
                </TabsTrigger>
                <TabsTrigger value="balance" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  Balance Sheet
                </TabsTrigger>
                <TabsTrigger value="cashflow" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                  Cash Flow
                </TabsTrigger>
              </TabsList>

              <TabsContent value="income" className="mt-6">
                {renderFinancialTable(incomeData, 'income')}
              </TabsContent>

              <TabsContent value="balance" className="mt-6">
                {renderFinancialTable(balanceData, 'balance')}
              </TabsContent>

              <TabsContent value="cashflow" className="mt-6">
                {renderFinancialTable(cashFlowData, 'cashflow')}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialStatementsViewer;