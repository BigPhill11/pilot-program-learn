
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, Play } from 'lucide-react';
import { Module } from '@/types/interview-module';

interface ModuleIntroProps {
  module: Module;
  onNext: () => void;
}

const ModuleIntro: React.FC<ModuleIntroProps> = ({ module, onNext }) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Award className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
        <Badge variant="outline" className="mb-4">Module {module.id}</Badge>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Objective
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700">{module.objective}</p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={onNext} size="lg">
          <Play className="h-4 w-4 mr-2" />
          Start Module
        </Button>
      </div>
    </div>
  );
};

export default ModuleIntro;
