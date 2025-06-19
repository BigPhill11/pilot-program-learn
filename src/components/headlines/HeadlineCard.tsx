
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFinancialTerms } from '@/hooks/useFinancialTerms';
import TermHighlighter from '@/components/TermHighlighter';

interface HeadlineCardProps {
  headline: {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source?: {
      name: string;
    };
    urlToImage?: string;
  };
}

const HeadlineCard: React.FC<HeadlineCardProps> = ({ headline }) => {
  const { terms: financialTerms = [] } = useFinancialTerms();

  return (
    <Card className="hover:shadow-md transition-shadow">
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
              <span>{headline.source?.name || 'Unknown Source'}</span>
              <span>{new Date(headline.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeadlineCard;
