
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Module } from '@/types/interview-module';

interface ModuleAssignmentProps {
  module: Module;
  canComplete: boolean;
  onComplete: () => void;
  onBack: () => void;
}

const ModuleAssignment: React.FC<ModuleAssignmentProps> = ({
  module,
  canComplete,
  onComplete,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">Module Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-700">{module.assignment}</p>
        </CardContent>
      </Card>
      
      <div className="flex gap-2 justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {canComplete && (
          <Button onClick={onComplete} size="lg" className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Module (+5 Points!)
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModuleAssignment;
