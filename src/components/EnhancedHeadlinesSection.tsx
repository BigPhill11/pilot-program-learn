
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import useHeadlines from '@/hooks/useHeadlines';

const EnhancedHeadlinesSection = () => {
  const { profile } = useAuth();
  const { data: headlinesData, isLoading, isError } = useHeadlines();

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

  // Extract headlines from the response
  const headlines = headlinesData?.headlines || [];
  console.log('Processing headlines:', headlines);
  
  const displayHeadlines = isError || !Array.isArray(headlines) || headlines.length === 0 ? [
    {
      id: '1',
      title: "Market Reaches New Heights",
      description: "Stock prices continue to rise as investors show confidence in the market's future performance. Major indices are posting significant gains across multiple sectors. Analysts attribute the growth to strong economic indicators and corporate earnings reports.",
      url: "https://finance.yahoo.com",
      publishedAt: new Date().toISOString(),
      source: { name: "Financial News" }
    },
    {
      id: '2',
      title: "Tech Companies Report Strong Earnings",
      description: "Major technology companies exceeded profit expectations, driving significant trading volume. Revenue growth has been particularly strong in cloud computing and artificial intelligence sectors. Investors are responding positively to future growth projections and innovation investments.",
      url: "https://finance.yahoo.com",
      publishedAt: new Date().toISOString(),
      source: { name: "Tech Report" }
    }
  ] : headlines;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700">Market Headlines</h2>
          <p className="mt-2 text-muted-foreground">
            Stay updated with the latest financial news
          </p>
          <div className="mt-2 text-sm text-primary">
            🐼 Current Level: {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)} Phil
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayHeadlines.map((headline, index) => (
            <Card key={headline.id || index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleHeadlineClick(headline)}>
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
                      {headline.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-3">
                      {headline.description || ''}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{headline.source?.name || 'Unknown Source'}</span>
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
