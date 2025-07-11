import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Smartphone } from 'lucide-react';

interface CommunicationModule6Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule6: React.FC<CommunicationModule6Props> = ({ onBack, onComplete, isCompleted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-purple-600" />
              <span>Digital Communication</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Module 6: Digital Communication</h3>
              <p className="text-muted-foreground mb-6">
                This module is coming soon! It will cover video conferencing, instant messaging, and digital etiquette.
              </p>
              <Button onClick={onComplete}>
                Mark as Complete (Demo)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationModule6;