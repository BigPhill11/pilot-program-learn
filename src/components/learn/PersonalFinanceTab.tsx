
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PersonalFinanceTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground text-center max-w-md">
            We're building something new and exciting for personal finance education. 
            Check back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalFinanceTab;
