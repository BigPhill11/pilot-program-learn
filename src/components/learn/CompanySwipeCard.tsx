
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Building2, Briefcase, DollarSign, BarChart2, MapPin } from 'lucide-react';

export interface CompanyProfile {
  id: string;
  name: string;
  ticker: string;
  logoUrl?: string; // Placeholder for actual logo, we'll use an icon for now
  industry: string;
  overview: string;
  marketCap: string;
  revenueTTM: string; // Trailing Twelve Months
  peRatio: string; // Price-to-Earnings Ratio
  headquarters: string;
}

interface CompanySwipeCardProps {
  company: CompanyProfile;
  onSwipe: (companyId: string, liked: boolean) => void;
}

const CompanySwipeCard: React.FC<CompanySwipeCardProps> = ({ company, onSwipe }) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          {company.logoUrl ? (
            <img src={company.logoUrl} alt={`${company.name} logo`} className="h-12 w-12 rounded-full object-contain" />
          ) : (
            <div className="p-3 rounded-full bg-muted">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          )}
          <div>
            <CardTitle className="text-2xl">{company.name} ({company.ticker})</CardTitle>
            <CardDescription>{company.industry}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-1 text-foreground">Overview:</h4>
          <p className="text-sm text-muted-foreground line-clamp-3">{company.overview}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1.5 text-green-500" />
            <span className="font-medium">Market Cap:</span>&nbsp;{company.marketCap}
          </div>
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1.5 text-blue-500" />
            <span className="font-medium">Revenue (TTM):</span>&nbsp;{company.revenueTTM}
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1.5 text-purple-500" />
            <span className="font-medium">P/E Ratio:</span>&nbsp;{company.peRatio}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1.5 text-orange-500" />
            <span className="font-medium">Headquarters:</span>&nbsp;{company.headquarters}
          </div>
        </div>

        <div className="flex justify-around pt-4 mt-4 border-t">
          <Button variant="outline" size="lg" className="text-red-500 border-red-500 hover:bg-red-500/10 w-32" onClick={() => onSwipe(company.id, false)}>
            <ThumbsDown className="mr-2 h-5 w-5" /> Dislike
          </Button>
          <Button variant="outline" size="lg" className="text-green-500 border-green-500 hover:bg-green-500/10 w-32" onClick={() => onSwipe(company.id, true)}>
            <ThumbsUp className="mr-2 h-5 w-5" /> Like
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySwipeCard;
