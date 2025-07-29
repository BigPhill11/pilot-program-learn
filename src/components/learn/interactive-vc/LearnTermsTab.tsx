import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle, Brain } from "lucide-react";
import { VCLessonContent } from "@/data/venture-capital-lessons";
import { getVCTermsByLevel } from "@/data/venture-capital-terms";
import KeyTermFlashcard from "@/components/learn/interactive-ib/KeyTermFlashcard";
import { useVCProgressAdapter } from "@/hooks/useProgressAdapter";

interface LearnTermsTabProps {
  lesson: VCLessonContent;
  vcTerms: any;
  onActivityComplete: () => void;
}

const LearnTermsTab: React.FC<LearnTermsTabProps> = ({ 
  lesson, 
  vcTerms, 
  onActivityComplete 
}) => {
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [viewedTerms, setViewedTerms] = useState<Set<number>>(new Set());
  const [masteredTerms, setMasteredTerms] = useState<Set<number>>(new Set());
  const { updateTermsProgress } = useVCProgressAdapter();

  const levelTerms = getVCTermsByLevel(lesson.level);
  const currentTerm = levelTerms[currentTermIndex];

  useEffect(() => {
    setViewedTerms(prev => new Set([...prev, currentTermIndex]));
  }, [currentTermIndex]);

  const handleMasterTerm = () => {
    setMasteredTerms(prev => new Set([...prev, currentTermIndex]));
  };

  const handleCompleteTerms = async () => {
    try {
      const progress = {
        totalTerms: levelTerms.length,
        masteredTerms: Array.from(masteredTerms),
        completionPercentage: Math.round((masteredTerms.size / levelTerms.length) * 100)
      };
      
      await updateTermsProgress(lesson.level, progress);
      onActivityComplete();
    } catch (error) {
      console.error('Error completing terms:', error);
    }
  };

  const nextTerm = () => {
    setCurrentTermIndex((prev) => (prev + 1) % levelTerms.length);
  };

  const prevTerm = () => {
    setCurrentTermIndex((prev) => (prev - 1 + levelTerms.length) % levelTerms.length);
  };

  const progressPercentage = Math.round((masteredTerms.size / levelTerms.length) * 100);

  if (!currentTerm) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No terms available for this level.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Master Key Terms
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">
                {masteredTerms.size}/{levelTerms.length} Mastered
              </Badge>
              <Badge variant="outline">
                {progressPercentage}% Complete
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Study each term carefully and mark them as mastered when you're confident you understand them.
          </p>
        </CardHeader>
      </Card>

      {/* Current Term Flashcard */}
      <div className="relative">
        <KeyTermFlashcard
          term={currentTerm.term}
          definition={currentTerm.definition}
          analogy={currentTerm.analogy || ""}
          onMastered={handleMasterTerm}
          isMastered={masteredTerms.has(currentTermIndex)}
        />
        
        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={prevTerm}
            disabled={levelTerms.length <= 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentTermIndex + 1} of {levelTerms.length}
            </span>
          </div>
          
          <Button
            variant="outline"
            onClick={nextTerm}
            disabled={levelTerms.length <= 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Terms Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Terms Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {levelTerms.map((term, index) => (
              <Button
                key={index}
                variant={currentTermIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTermIndex(index)}
                className={`text-left justify-start ${
                  masteredTerms.has(index) ? "bg-green-100 border-green-300" : ""
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  {masteredTerms.has(index) && (
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  )}
                  <span className="truncate">{term.term}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completion Action */}
      <Card>
        <CardContent className="text-center py-6">
          {masteredTerms.size === levelTerms.length ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="h-6 w-6" />
                <span className="text-lg font-semibold">All Terms Mastered!</span>
              </div>
              <Button onClick={handleCompleteTerms} size="lg">
                Complete Terms Section
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Master all {levelTerms.length} terms to complete this section.
              </p>
              <Button onClick={handleCompleteTerms} variant="outline" size="lg">
                Save Progress ({masteredTerms.size}/{levelTerms.length})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearnTermsTab;