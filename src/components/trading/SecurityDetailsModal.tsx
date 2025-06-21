
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Security {
  symbol: string;
  name: string;
  exchange: string;
  assetType: string;
  currency: string;
  industry?: string;
  marketCap?: number;
  description?: string;
}

interface SecurityDetailsModalProps {
  security: Security | null;
  isOpen: boolean;
  onClose: () => void;
}

const SecurityDetailsModal: React.FC<SecurityDetailsModalProps> = ({ security, isOpen, onClose }) => {
  // Fetch additional company details
  const { data: companyData, isLoading } = useQuery({
    queryKey: ['companyDetails', security?.symbol],
    queryFn: async () => {
      if (!security) return null;
      
      // Mock detailed company data - in real app, this would call FMP API
      const mockData = {
        price: Math.random() * 300 + 20,
        change: (Math.random() - 0.5) * 10,
        marketCap: Math.random() * 500000000000 + 10000000000,
        pe: Math.random() * 30 + 5,
        dividend: Math.random() * 5,
        employees: Math.floor(Math.random() * 100000 + 1000),
        description: `${security.name} is a leading company in the ${security.industry || 'technology'} sector, providing innovative solutions and services to customers worldwide.`,
        chartData: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          price: Math.random() * 50 + 100 + i * 2
        }))
      };
      
      return mockData;
    },
    enabled: !!security && isOpen,
    staleTime: 1000 * 60 * 5,
  });

  if (!security) return null;

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Building className="h-6 w-6 text-emerald-600" />
            {security.name} ({security.symbol})
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Price</span>
                </div>
                <div className="text-xl font-bold">
                  ${companyData?.price?.toFixed(2) || '---'}
                </div>
                {companyData?.change && (
                  <div className={`text-sm ${companyData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {companyData.change >= 0 ? '+' : ''}{companyData.change.toFixed(2)}%
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Market Cap</span>
                </div>
                <div className="text-xl font-bold">
                  {companyData?.marketCap ? formatMarketCap(companyData.marketCap) : '---'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">P/E Ratio</span>
                </div>
                <div className="text-xl font-bold">
                  {companyData?.pe?.toFixed(1) || '---'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Employees</span>
                </div>
                <div className="text-xl font-bold">
                  {companyData?.employees?.toLocaleString() || '---'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{security.assetType.toUpperCase()}</Badge>
                <Badge variant="outline">{security.exchange}</Badge>
                {security.industry && <Badge variant="outline">{security.industry}</Badge>}
                <Badge variant="outline">{security.currency}</Badge>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">
                  {isLoading ? 'Loading company details...' : 
                   companyData?.description || security.description || 
                   `${security.name} is traded on ${security.exchange} as a ${security.assetType}.`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Simple Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Price Chart (30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-48 bg-muted rounded flex items-center justify-center">
                  <p className="text-muted-foreground">Loading chart...</p>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-r from-emerald-50 to-blue-50 rounded flex items-center justify-center border">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Real-time price data: ${companyData?.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityDetailsModal;
