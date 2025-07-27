import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface BlackBusinessModule1Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const BlackBusinessModule1: React.FC<BlackBusinessModule1Props> = ({ onBack, onComplete, isCompleted }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Authentic Leadership & Identity</h1>
          <p className="text-muted-foreground">Module 1 - Black in Business Excellence</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Content Coming Soon</CardTitle>
          <CardDescription>
            This module will cover authentic leadership while staying true to your cultural identity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This module is currently under development. It will include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Understanding authentic leadership principles</li>
            <li>Leveraging cultural identity as a strength</li>
            <li>Building executive presence</li>
            <li>Practical exercises and real-world examples</li>
          </ul>
          
          {!isCompleted && (
            <Button onClick={onComplete} className="w-full mt-6">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Module as Complete
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlackBusinessModule1;