import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mic } from 'lucide-react';

interface CommunicationModule3Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule3: React.FC<CommunicationModule3Props> = ({ onBack, onComplete, isCompleted }) => {
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
              <Mic className="h-5 w-5 text-purple-600" />
              <span>Verbal Communication Skills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Module 3: Verbal Communication Skills</h3>
              <p className="text-muted-foreground mb-6">
                This module is coming soon! It will cover voice projection, articulation, and conversation flow.
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

export default CommunicationModule3;