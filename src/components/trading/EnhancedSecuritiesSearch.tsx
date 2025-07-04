import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Security {
  symbol: string;
  name: string;
  exchange: string;
  assetType: string;
  currency: string;
}

interface SecurityProfile {
  companyName: string;
  sector: string;
  industry: string;
  marketCap: number;
  price: number;
  changesPercentage: number;
  pe: number;
  beta: number;
  description: string;
}

interface EnhancedSecuritiesSearchProps {
  onSelectSecurity: (security: Security, profile: SecurityProfile) => void;
}

const EnhancedSecuritiesSearch: React.FC<EnhancedSecuritiesSearchProps> = ({ onSelectSecurity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Security[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState<Security | null>(null);
  const [securityProfile, setSecurityProfile] = useState<SecurityProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (searchQuery.length < 2) return;

    setIsSearching(true);
    try {
      const response = await supabase.functions.invoke('fmp-securities-search', {
        body: JSON.stringify({ query: searchQuery }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search securities');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const loadSecurityProfile = async (symbol: string): Promise<SecurityProfile | null> => {
    try {
      setIsLoadingProfile(true);
      
      // Get company profile and quote data
      const [profileResponse, quoteResponse] = await Promise.all([
        supabase.functions.invoke('fmp-company-profile', {
          body: JSON.stringify({ symbol }),
          headers: { 'Content-Type': 'application/json' }
        }),
        supabase.functions.invoke('fmp-stock-price', {
          body: JSON.stringify({ symbol }),
          headers: { 'Content-Type': 'application/json' }
        })
      ]);

      if (profileResponse.error || quoteResponse.error) {
        throw new Error('Failed to load security data');
      }

      const profile = profileResponse.data;
      const quote = quoteResponse.data;

      return {
        companyName: profile.companyName || profile.name || symbol,
        sector: profile.sector || 'Unknown',
        industry: profile.industry || 'Unknown',
        marketCap: profile.mktCap || 0,
        price: quote.price || 0,
        changesPercentage: quote.changesPercentage || 0,
        pe: quote.pe || 0,
        beta: profile.beta || 0,
        description: profile.description || 'No description available'
      };
    } catch (error) {
      console.error('Profile loading error:', error);
      return null;
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSelectSecurity = async (security: Security) => {
    setSelectedSecurity(security);
    
    const profile = await loadSecurityProfile(security.symbol);
    if (profile) {
      setSecurityProfile(profile);
      onSelectSecurity(security, profile);
      toast.success(`Selected ${security.name} (${security.symbol})`);
    } else {
      toast.error('Failed to load security details');
    }
  };

  const getAssetTypeColor = (type: string) => {
    switch (type) {
      case 'stock': return 'bg-emerald-100 text-emerald-800';
      case 'etf': return 'bg-blue-100 text-blue-800';
      case 'commodity': return 'bg-yellow-100 text-yellow-800';
      case 'index': return 'bg-purple-100 text-purple-800';
      case 'bond': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Search className="h-5 w-5" />
            Enhanced Securities Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search stocks, ETFs, commodities, bonds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-emerald-200 focus:border-emerald-500"
              />
            </div>

            {isSearching && (
              <div className="text-center py-4 text-emerald-600">Searching...</div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {searchResults.map((security) => (
                  <div
                    key={`${security.symbol}-${security.exchange}`}
                    className="flex items-center justify-between p-3 border border-emerald-100 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectSecurity(security)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-emerald-900">{security.symbol}</span>
                        <Badge className={getAssetTypeColor(security.assetType)}>
                          {security.assetType.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{security.name}</p>
                      <p className="text-xs text-gray-500">{security.exchange} • {security.currency}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
              <div className="text-center py-4 text-gray-500">No securities found</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Profile Display */}
      {selectedSecurity && securityProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {securityProfile.companyName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-lg font-semibold">${securityProfile.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Change</p>
                <div className="flex items-center gap-1">
                  {securityProfile.changesPercentage >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <p className={`text-lg font-semibold ${
                    securityProfile.changesPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {securityProfile.changesPercentage.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">P/E Ratio</p>
                <p className="text-lg font-semibold">{securityProfile.pe ? securityProfile.pe.toFixed(2) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Beta</p>
                <p className="text-lg font-semibold">{securityProfile.beta ? securityProfile.beta.toFixed(2) : 'N/A'}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Sector & Industry</p>
              <div className="flex gap-2 mb-3">
                <Badge variant="outline">{securityProfile.sector}</Badge>
                <Badge variant="outline">{securityProfile.industry}</Badge>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{securityProfile.description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoadingProfile && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-emerald-600">Loading security details...</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSecuritiesSearch;