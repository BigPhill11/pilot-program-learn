import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { ConsultingLessonContent } from '@/data/management-consulting-lessons';
import KeyTermFlashcard from '../interactive-ib/KeyTermFlashcard';

interface LearnTermsTabProps {
  lesson: ConsultingLessonContent;
  consultingTerms: any;
  onActivityComplete: () => void;
}

const LearnTermsTab: React.FC<LearnTermsTabProps> = ({ 
  lesson, 
  consultingTerms, 
  onActivityComplete 
}) => {
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [viewedTerms, setViewedTerms] = useState<Set<number>>(new Set());

  const keyTerms = lesson.keyTerms.map(termKey => consultingTerms[termKey]).filter(Boolean);

  useEffect(() => {
    setViewedTerms(prev => new Set([...prev, currentTermIndex]));
  }, [currentTermIndex]);

  useEffect(() => {
    if (viewedTerms.size >= keyTerms.length && keyTerms.length > 0) {
      onActivityComplete();
    }
  }, [viewedTerms, keyTerms.length, onActivityComplete]);

  const nextTerm = () => {
    setCurrentTermIndex((prev) => (prev + 1) % keyTerms.length);
  };

  const prevTerm = () => {
    setCurrentTermIndex((prev) => (prev - 1 + keyTerms.length) % keyTerms.length);
  };

  if (keyTerms.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No terms available for this lesson.</p>
        </CardContent>
      </Card>
    );
  }

  const progress = (viewedTerms.size / keyTerms.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <BookOpen className="h-5 w-5" />
            Master Key Terms
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-blue-700">
              <span>Progress: {viewedTerms.size} / {keyTerms.length} terms</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <KeyTermFlashcard
            term={keyTerms[currentTermIndex].term}
            definition={keyTerms[currentTermIndex].definition}
            analogy={keyTerms[currentTermIndex].analogy}
            onMastered={() => {}}
            isMastered={false}
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={prevTerm}
          variant="outline"
          size="sm"
          disabled={keyTerms.length <= 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        <span className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium">
          {currentTermIndex + 1} of {keyTerms.length}
        </span>
        
        <Button
          onClick={nextTerm}
          variant="outline"
          size="sm"
          disabled={keyTerms.length <= 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {viewedTerms.size >= keyTerms.length && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Excellent Work!
              </h3>
              <p className="text-green-700">
                You've reviewed all key terms for this lesson. You're ready to tackle the mini-games and quiz!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Terms Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {keyTerms.map((term, index) => (
              <button
                key={index}
                onClick={() => setCurrentTermIndex(index)}
                className={`p-2 text-sm rounded-md border transition-colors ${
                  currentTermIndex === index
                    ? 'bg-primary text-primary-foreground border-primary'
                    : viewedTerms.has(index)
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {term.term}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearnTermsTab;