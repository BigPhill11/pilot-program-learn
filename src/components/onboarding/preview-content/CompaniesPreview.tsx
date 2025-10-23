import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, BarChart3, Eye, Search } from 'lucide-react';

const CompaniesPreview: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Company Research',
      description: 'Discover real companies with detailed profiles',
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Financial Metrics',
      description: 'Understand revenue, profit margins, and growth',
      color: 'text-green-600'
    },
    {
      icon: Eye,
      title: 'News & Analysis',
      description: 'Stay updated with latest headlines and expert takes',
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Comparison Tools',
      description: 'Compare multiple companies side-by-side',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">What it is:</h3>
        <p className="text-muted-foreground leading-relaxed">
          Explore real companies, learn how to evaluate businesses, and understand what makes stocks go up or down. Research like a professional analyst and discover investment opportunities.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">How it works:</h3>
        
        <div className="bg-white border-2 border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <p className="font-semibold">Apple Inc.</p>
              <p className="text-xs text-muted-foreground">AAPL • Technology</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-muted-foreground">Revenue</p>
              <p className="font-semibold">$394.3B</p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <p className="text-muted-foreground">Profit Margin</p>
              <p className="font-semibold">25.3%</p>
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <p className="text-muted-foreground">Growth</p>
              <p className="font-semibold">+8.2%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-3 border-2 border-muted">
                <IconComponent className={`h-5 w-5 mb-2 ${feature.color}`} />
                <p className="font-semibold text-sm mb-1">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground mt-3">
          Start with "Company Fundamentals" lesson, then unlock full company discovery!
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-200">
        <h3 className="text-lg font-semibold mb-2">Why it matters:</h3>
        <p className="text-muted-foreground leading-relaxed">
          Before investing a dollar, you need to know what you're buying. Learn to separate good companies from bad ones, spot red flags early, and make informed decisions. It's the difference between gambling and investing.
        </p>
      </div>
    </div>
  );
};

export default CompaniesPreview;
