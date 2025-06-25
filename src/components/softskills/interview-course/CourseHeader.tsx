
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

interface CourseHeaderProps {
  completedModules: number[];
  totalModules: number;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ completedModules, totalModules }) => {
  const progressPercentage = (completedModules.length / totalModules) * 100;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Award className="h-12 w-12 text-blue-600" />
          <div>
            <CardTitle className="text-2xl text-blue-800">Professional Interviewing Mastery</CardTitle>
            <p className="text-blue-700">Master every aspect of the finance interview process</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Course Progress</span>
            <span>{completedModules.length}/{totalModules} modules completed</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge variant="outline">6 Interactive Modules</Badge>
            <Badge variant="outline">Hands-on Games</Badge>
            <Badge variant="outline">Real Interview Scenarios</Badge>
            <Badge variant="outline">Practical Assignments</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseHeader;
