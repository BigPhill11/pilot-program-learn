import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Target, Users, Brain } from 'lucide-react';

interface VCJourneyHeaderProps {
  onBack: () => void;
}

const VCJourneyHeader: React.FC<VCJourneyHeaderProps> = ({ onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Careers
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl">
            <TrendingUp className="h-8 w-8 text-primary" />
            Venture Capital Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Master the world of venture capital through hands-on learning, from understanding startup evaluation 
            to building investment portfolios.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <Target className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Learn Core Concepts</h3>
                <p className="text-sm text-muted-foreground">Master VC fundamentals and terminology</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Interactive Practice</h3>
                <p className="text-sm text-muted-foreground">Engage with real-world scenarios</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <Brain className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Test Knowledge</h3>
                <p className="text-sm text-muted-foreground">Quiz yourself and track progress</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VCJourneyHeader;