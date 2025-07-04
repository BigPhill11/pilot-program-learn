import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calculator, FileText, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FinancialStatement {
  date: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  totalAssets?: number;
  totalLiabilities?: number;
  totalEquity?: number;
  operatingCashFlow?: number;
  freeCashFlow?: number;
}

interface FinancialRatios {
  currentRatio: number;
  quickRatio: number;
  debtToEquityRatio: number;
  returnOnEquity: number;
  returnOnAssets: number;
  grossProfitMargin: number;
  operatingMargin: number;
  netProfitMargin: number;
  priceToBookRatio: number;
  priceEarningsRatio: number;
}

interface AnalystEstimates {
  symbol: string;
  estimatedRevenueAvg: number;
  estimatedEpsAvg: number;
  numberAnalystEstimatedRevenue: number;
  numberAnalystEstimatedEps: number;
}

const FinancialAnalysis: React.FC = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [statements, setStatements] = useState<FinancialStatement[]>([]);
  const [ratios, setRatios] = useState<FinancialRatios | null>(null);
  const [estimates, setEstimates] = useState<AnalystEstimates | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeStatement, setActiveStatement] = useState<'income' | 'balance-sheet' | 'cash-flow'>('income');

  const loadFinancialData = async () => {
    if (!symbol) return;
    
    setLoading(true);
    try {
      const [statementsResponse, ratiosResponse, estimatesResponse] = await Promise.all([
        supabase.functions.invoke('fmp-unified-service', {
          body: JSON.stringify({ 
            service: 'financial-statements', 
            symbol, 
            statement: activeStatement,
            period: 'annual'
          }),
          headers: { 'Content-Type': 'application/json' }
        }),
        supabase.functions.invoke('fmp-unified-service', {
          body: JSON.stringify({ service: 'financial-ratios', symbol }),
          headers: { 'Content-Type': 'application/json' }
        }),
        supabase.functions.invoke('fmp-unified-service', {
          body: JSON.stringify({ service: 'analyst-estimates', symbol }),
          headers: { 'Content-Type': 'application/json' }
        })
      ]);

      if (!statementsResponse.error && statementsResponse.data) {
        const data = statementsResponse.data.slice(0, 5).map((item: any) => ({
          date: item.date,
          revenue: item.revenue || 0,
          grossProfit: item.grossProfit || 0,
          operatingIncome: item.operatingIncome || 0,
          netIncome: item.netIncome || 0,
          totalAssets: item.totalAssets || 0,
          totalLiabilities: item.totalLiabilities || 0,
          totalEquity: item.totalStockholdersEquity || 0,
          operatingCashFlow: item.operatingCashFlow || 0,
          freeCashFlow: item.freeCashFlow || 0,
        }));
        setStatements(data.reverse()); // Reverse to show chronological order
      } else {
        console.error('Financial statements error:', statementsResponse.error);
      }

      if (!ratiosResponse.error && ratiosResponse.data) {
        setRatios(ratiosResponse.data);
      } else {
        console.error('Financial ratios error:', ratiosResponse.error);
      }

      if (!estimatesResponse.error && estimatesResponse.data) {
        setEstimates(estimatesResponse.data[0] || null);
      } else {
        console.error('Analyst estimates error:', estimatesResponse.error);
      }
    } catch (error) {
      console.error('Error loading financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFinancialData();
  }, [symbol, activeStatement]);

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatRatio = (value: number | null) => {
    return value ? value.toFixed(2) : 'N/A';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Financial Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Enter symbol (e.g., AAPL)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="max-w-xs"
            />
            <Button onClick={loadFinancialData} disabled={loading}>
              {loading ? 'Loading...' : 'Analyze'}
            </Button>
          </div>

          <Tabs value={activeStatement} onValueChange={(value) => setActiveStatement(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="income">Income Statement</TabsTrigger>
              <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
              <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
            </TabsList>

            <TabsContent value="income" className="space-y-4">
              {statements.length > 0 && (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={statements}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue" strokeWidth={2} />
                      <Line type="monotone" dataKey="grossProfit" stroke="#3b82f6" name="Gross Profit" strokeWidth={2} />
                      <Line type="monotone" dataKey="netIncome" stroke="#8b5cf6" name="Net Income" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </TabsContent>

            <TabsContent value="balance-sheet" className="space-y-4">
              {statements.length > 0 && (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statements}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Bar dataKey="totalAssets" fill="#10b981" name="Total Assets" />
                      <Bar dataKey="totalLiabilities" fill="#ef4444" name="Total Liabilities" />
                      <Bar dataKey="totalEquity" fill="#3b82f6" name="Total Equity" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cash-flow" className="space-y-4">
              {statements.length > 0 && (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={statements}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Line type="monotone" dataKey="operatingCashFlow" stroke="#10b981" name="Operating Cash Flow" strokeWidth={2} />
                      <Line type="monotone" dataKey="freeCashFlow" stroke="#3b82f6" name="Free Cash Flow" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Financial Ratios */}
      {ratios && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Key Financial Ratios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Liquidity</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Current Ratio:</span>
                    <span className="font-medium">{formatRatio(ratios.currentRatio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quick Ratio:</span>
                    <span className="font-medium">{formatRatio(ratios.quickRatio)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Profitability</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">ROE:</span>
                    <span className="font-medium">{formatRatio(ratios.returnOnEquity)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">ROA:</span>
                    <span className="font-medium">{formatRatio(ratios.returnOnAssets)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Margins</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Gross Margin:</span>
                    <span className="font-medium">{formatRatio(ratios.grossProfitMargin)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Net Margin:</span>
                    <span className="font-medium">{formatRatio(ratios.netProfitMargin)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Valuation</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">P/E Ratio:</span>
                    <span className="font-medium">{formatRatio(ratios.priceEarningsRatio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">P/B Ratio:</span>
                    <span className="font-medium">{formatRatio(ratios.priceToBookRatio)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analyst Estimates */}
      {estimates && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Analyst Estimates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Revenue Estimates</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Estimated Revenue:</span>
                    <span className="font-medium">{formatCurrency(estimates.estimatedRevenueAvg)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Analysts:</span>
                    <Badge variant="outline">{estimates.numberAnalystEstimatedRevenue}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">EPS Estimates</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Estimated EPS:</span>
                    <span className="font-medium">${estimates.estimatedEpsAvg.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Analysts:</span>
                    <Badge variant="outline">{estimates.numberAnalystEstimatedEps}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialAnalysis;