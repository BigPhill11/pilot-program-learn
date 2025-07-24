import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Target, HelpCircle } from "lucide-react";
import { VCLessonContent } from "@/data/venture-capital-lessons";
import { vcTerms } from "@/data/venture-capital-terms";
import { HighlightableTerm } from "@/components/HighlightableTerm";
import { useVCProgress } from "@/hooks/useVCProgress";

interface OverviewTabProps {
  lesson: VCLessonContent;
  vcTerms: any;
  onActivityComplete: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  lesson, 
  vcTerms: allVCTerms, 
  onActivityComplete 
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { markOverviewComplete } = useVCProgress();

  const handleCompleteOverview = async () => {
    try {
      await markOverviewComplete(lesson.level);
      setIsCompleted(true);
      onActivityComplete();
    } catch (error) {
      console.error('Error marking overview as complete:', error);
    }
  };

  const renderTextWithTermHighlights = (text: string): React.ReactNode[] => {
    const allTerms = Object.values(vcTerms).flat();
    const terms = allTerms.map(t => t.term);
    
    // Sort terms by length (descending) to match longer terms first
    const sortedTerms = terms.sort((a, b) => b.length - a.length);
    
    let parts: React.ReactNode[] = [text];
    
    sortedTerms.forEach((term) => {
      const newParts: React.ReactNode[] = [];
      
      parts.forEach((part, index) => {
        if (typeof part === 'string') {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          const splitParts = part.split(regex);
          const matches = part.match(regex) || [];
          
          splitParts.forEach((splitPart, splitIndex) => {
            if (splitIndex > 0) {
              const termData = allTerms.find(t => 
                t.term.toLowerCase() === matches[splitIndex - 1]?.toLowerCase()
              );
              if (termData) {
                newParts.push(
                  <HighlightableTerm
                    key={`${index}-${splitIndex}-${term}`}
                    term={termData.term}
                    definition={termData.definition}
                    analogy={termData.analogy}
                  />
                );
              }
            }
            if (splitPart) {
              newParts.push(splitPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      
      parts = newParts;
    });
    
    return parts;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {lesson.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            {renderTextWithTermHighlights(lesson.description)}
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Learning Objectives
              </h3>
              <ul className="space-y-2">
                {lesson.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      {renderTextWithTermHighlights(objective)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Key Questions to Consider
              </h3>
              <ul className="space-y-2">
                {lesson.keyQuestions.map((question, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-medium text-sm">Q{index + 1}:</span>
                    <span className="text-sm">
                      {renderTextWithTermHighlights(question)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            {!isCompleted ? (
              <Button onClick={handleCompleteOverview} size="lg">
                Mark Overview as Complete
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Overview Completed!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;