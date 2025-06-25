
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Info, Target, Lightbulb, ArrowLeft } from 'lucide-react';
import { Module } from '@/types/interview-module';

interface ModuleContentProps {
  module: Module;
  contentProgress: number;
  onProgressUpdate: (progress: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({
  module,
  contentProgress,
  onProgressUpdate,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Module Content</h3>
        <Badge variant="secondary">{Math.round((contentProgress / module.content.length) * 100)}% Complete</Badge>
      </div>
      
      <Progress value={(contentProgress / module.content.length) * 100} className="mb-4" />
      
      <div className="space-y-6">
        {module.content.map((item, index) => (
          <Card 
            key={index} 
            className={`transition-all ${index <= contentProgress ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                {index < contentProgress ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                ) : index === contentProgress ? (
                  <div className="h-6 w-6 rounded-full border-2 border-primary mt-0.5 flex-shrink-0" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                )}
                <CardTitle className={`text-lg ${index <= contentProgress ? 'text-green-800' : 'text-gray-700'}`}>
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>
            
            {index <= contentProgress && (
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">What is this?</span>
                    </div>
                    <p className="text-blue-700 text-sm">{item.explanation}</p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 border-l-4 border-orange-400">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-800">Why is this important?</span>
                    </div>
                    <p className="text-orange-700 text-sm">{item.importance}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border-l-4 border-green-400">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">How to implement this?</span>
                    </div>
                    <p className="text-green-700 text-sm">{item.howTo}</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        {contentProgress < module.content.length && (
          <Button onClick={() => onProgressUpdate(contentProgress + 1)}>
            Next Topic
          </Button>
        )}
        {contentProgress === module.content.length && (
          <Button onClick={onNext}>
            Continue to {module.game ? 'Interactive Game' : 'Quiz'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModuleContent;
