
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { Module } from '@/types/interview-module';

interface ModuleGridProps {
  modules: Module[];
  completedModules: number[];
  onModuleClick: (moduleId: number) => void;
  isModuleUnlocked: (moduleId: number) => boolean;
  isModuleCompleted: (moduleId: number) => boolean;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({
  modules,
  completedModules,
  onModuleClick,
  isModuleUnlocked,
  isModuleCompleted
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => {
        const isUnlocked = isModuleUnlocked(module.id);
        const isCompleted = isModuleCompleted(module.id);
        
        return (
          <Card 
            key={module.id} 
            className={`transition-all cursor-pointer hover:shadow-lg ${
              !isUnlocked ? 'opacity-60' : 
              isCompleted ? 'border-green-200 bg-green-50' : 
              'border-primary hover:border-primary'
            }`}
            onClick={() => isUnlocked && onModuleClick(module.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge 
                  variant={isCompleted ? 'default' : 'secondary'}
                  className={isCompleted ? 'bg-green-600' : ''}
                >
                  Module {module.id}
                </Badge>
                {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                {!isUnlocked && <span className="text-2xl">🔒</span>}
              </div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">{module.objective}</p>
              {module.game && (
                <Badge variant="outline" className="text-xs">
                  Interactive Game Included
                </Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ModuleGrid;
