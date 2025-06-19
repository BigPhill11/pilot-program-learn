
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, CheckCircle } from 'lucide-react';

interface InteractiveContentProps {
  level: any;
  content: any;
}

const InteractiveContent: React.FC<InteractiveContentProps> = ({ level, content }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-blue-500" />
          Understanding {level.focusArea}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Explanation</h4>
          <p className="text-muted-foreground leading-relaxed">
            {content.explanation}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Real-World Example</h4>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">
              {content.realWorldExample}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Key Takeaways</h4>
          <ul className="space-y-2">
            {content.keyTakeaways.map((takeaway: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveContent;
