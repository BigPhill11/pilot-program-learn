
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import SecurityDetailsModal from './SecurityDetailsModal';

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

interface SecuritiesSearchProps {
  onSelectSecurity: (security: Security, price: number) => void;
}

const SecuritiesSearch: React.FC<SecuritiesSearchProps> = ({ onSelectSecurity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Security[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState<Security | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

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
      const response = await fetch(
        `https://aqqbxivolegafwuurxxm.supabase.co/functions/v1/securities-search?query=${encodeURIComponent(searchQuery)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcWJ4aXZvbGVnYWZ3dXVyeHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjkwMTcsImV4cCI6MjA2NTU0NTAxN30.W5pB4lv_OTYvXn9dx6146ms16HZdfdfaTv2bs3cK-r0`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Securities search results:', data?.length || 0, 'found');
      setSearchResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search securities');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSecurity = async (security: Security) => {
    setSelectedSecurity(security);
    
    // Generate realistic price based on asset type
    let mockPrice = 100;
    if (security.assetType === 'index') {
      mockPrice = Math.random() * 5000 + 15000;
    } else if (security.assetType === 'etf') {
      mockPrice = Math.random() * 300 + 50;
    } else if (security.assetType === 'commodity') {
      mockPrice = Math.random() * 100 + 50;
    } else {
      mockPrice = Math.random() * 500 + 20;
    }
    
    onSelectSecurity(security, mockPrice);
    toast.success(`Selected ${security.name} (${security.symbol})`);
  };

  const showSecurityDetails = (security: Security) => {
    setSelectedSecurity(security);
    setDetailsModalOpen(true);
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
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Search className="h-5 w-5" />
            Search Securities
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Search and discover stocks, ETFs, commodities, and more with detailed information
          </p>
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
              <div className="text-center py-4 text-emerald-600">Searching securities...</div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {searchResults.map((security, index) => (
                  <div
                    key={`${security.symbol}-${security.exchange}-${index}`}
                    className="flex items-center justify-between p-3 border border-emerald-100 rounded-lg hover:bg-emerald-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-emerald-900">{security.symbol}</span>
                        <Badge className={getAssetTypeColor(security.assetType)}>
                          {security.assetType.toUpperCase()}
                        </Badge>
                        {security.industry && (
                          <Badge variant="outline" className="text-xs">
                            {security.industry}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{security.name}</p>
                      <p className="text-xs text-gray-500">{security.exchange} • {security.currency}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        onClick={() => showSecurityDetails(security)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        onClick={() => handleSelectSecurity(security)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
              <div className="text-center py-4 text-gray-500">
                No securities found for "{searchQuery}"
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <SecurityDetailsModal
        security={selectedSecurity}
        isOpen={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedSecurity(null);
        }}
      />
    </>
  );
};

export default SecuritiesSearch;
