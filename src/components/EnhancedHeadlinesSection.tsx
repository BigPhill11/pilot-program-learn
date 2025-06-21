
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import useHeadlines from '@/hooks/useHeadlines';
import { useFinancialTerms } from '@/hooks/useFinancialTerms';
import TermHighlighter from '@/components/TermHighlighter';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const EnhancedHeadlinesSection = () => {
  const { profile } = useAuth();
  const { data: headlinesData, isLoading: headlinesLoading } = useHeadlines();
  const { terms: financialTerms = [] } = useFinancialTerms();

  // Fetch FMP headlines with real-time updates
  const { data: fmpHeadlinesData, isLoading: fmpLoading, error: fmpError } = useQuery({
    queryKey: ['fmpRealTimeHeadlines'],
    queryFn: async () => {
      console.log('Fetching real-time FMP headlines...');
      const { data, error } = await supabase.functions.invoke('fmp-market-data', {
        body: { type: 'headlines' }
      });
      if (error) {
        console.error('FMP headlines fetch error:', error);
        throw error;
      }
      console.log('FMP headlines data received:', data);
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 15, // Auto-refresh every 15 minutes
    retry: 2,
  });

  const handleHeadlineClick = (headline: any) => {
    console.log('Clicking headline:', headline);
    console.log('URL:', headline.url);
    
    if (headline.url && headline.url !== "#" && headline.url !== "") {
      // Try to open the URL
      const newWindow = window.open(headline.url, '_blank', 'noopener,noreferrer');
      
      // If popup was blocked, try a fallback
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        console.warn('Popup blocked, trying fallback method');
        // Fallback: create a temporary link element
        const link = document.createElement('a');
        link.href = headline.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      console.warn('No valid URL found for headline:', headline);
    }
  };

  const userLevel = profile?.app_version || 'beginner';
  const isLoading = headlinesLoading || fmpLoading;

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Market Headlines</h2>
            <p className="mt-2 text-muted-foreground">Stay updated with the latest financial news</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Prioritize FMP headlines if available, fallback to regular headlines
  let headlines = [];
  let dataSource = "static";
  
  if (fmpHeadlinesData?.headlines && Array.isArray(fmpHeadlinesData.headlines) && fmpHeadlinesData.headlines.length > 0) {
    headlines = fmpHeadlinesData.headlines;
    dataSource = "real-time FMP";
  } else if (headlinesData?.headlines && Array.isArray(headlinesData.headlines) && headlinesData.headlines.length > 0) {
    headlines = headlinesData.headlines;
    dataSource = "cached API";
  }

  const displayHeadlines = headlines.length === 0 ? [
    {
      id: '1',
      title: "Markets Show Strong Performance Amid Economic Data Release",
      description: "Major stock indices posted gains as investors processed the latest economic indicators and corporate earnings reports. Technology and healthcare sectors led the rally with particularly strong performance across growth-oriented equities.",
      url: "https://finance.yahoo.com",
      publishedAt: new Date().toISOString(),
      source: { name: "Financial Markets Today" }
    },
    {
      id: '2',
      title: "Federal Reserve Policy Expectations Shape Trading Activity",
      description: "Market participants continue to adjust positions based on Federal Reserve communications and anticipated monetary policy changes. Bond yields and equity valuations reflect evolving expectations about future interest rate decisions.",
      url: "https://finance.yahoo.com",
      publishedAt: new Date().toISOString(),
      source: { name: "Economic Policy Watch" }
    },
    {
      id: '3',
      title: "Sector Rotation Patterns Indicate Shifting Investment Sentiment", 
      description: "Institutional and retail investors demonstrate changing risk appetite through notable sector rotation patterns. Growth stocks continue attracting capital while defensive positions maintain appeal among conservative portfolios.",
      url: "https://finance.yahoo.com",
      publishedAt: new Date().toISOString(),
      source: { name: "Investment Trends" }
    }
  ] : headlines;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700">Market Headlines</h2>
          <p className="mt-2 text-muted-foreground">
            Stay updated with financial news - terms are highlighted based on your level!
          </p>
          <div className="mt-2 text-sm text-primary">
            🐼 Current Level: {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)} Phil • Data: {dataSource}
            {fmpError && <span className="text-amber-600 ml-2">• Live data temporarily unavailable</span>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayHeadlines.map((headline, index) => (
            <Card key={`${headline.id || index}-${dataSource}`} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleHeadlineClick(headline)}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {headline.urlToImage && (
                    <img 
                      src={headline.urlToImage} 
                      alt=""
                      className="w-20 h-20 object-cover rounded flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      <TermHighlighter 
                        text={headline.title} 
                        terms={financialTerms}
                      />
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-3">
                      <TermHighlighter 
                        text={headline.description || ''} 
                        terms={financialTerms}
                      />
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{headline.source?.name || 'Market Data'}</span>
                      <span>{new Date(headline.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeadlinesSection;
