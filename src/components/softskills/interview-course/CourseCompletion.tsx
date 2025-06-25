
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface CourseCompletionProps {
  isCompleted: boolean;
}

const CourseCompletion: React.FC<CourseCompletionProps> = ({ isCompleted }) => {
  if (!isCompleted) return null;

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardContent className="p-6 text-center">
        <Award className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          🎉 Congratulations!
        </h3>
        <p className="text-green-700">
          You've completed the Professional Interviewing Mastery course! 
          You're now ready to excel in any finance interview.
        </p>
      </CardContent>
    </Card>
  );
};

export default CourseCompletion;
