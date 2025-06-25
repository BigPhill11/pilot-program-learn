
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GamepadIcon, ArrowLeft } from 'lucide-react';
import { Module } from '@/types/interview-module';

interface ModuleGameProps {
  module: Module;
  onNext: () => void;
  onBack: () => void;
}

const ModuleGame: React.FC<ModuleGameProps> = ({ module, onNext, onBack }) => {
  if (!module.game) return null;
  
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800 flex items-center gap-2">
            <GamepadIcon className="h-5 w-5" />
            {module.game.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-700 mb-4">{module.game.description}</p>
          <module.game.component />
        </CardContent>
      </Card>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Quiz
        </Button>
      </div>
    </div>
  );
};

export default ModuleGame;
