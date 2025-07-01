
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, BookOpen, Trophy } from 'lucide-react';
import { InteractiveLessonContent } from '@/data/investment-banking-lessons';
import HighlightableTerm from '@/components/HighlightableTerm';
import PandaLogo from '@/components/icons/PandaLogo';
import { useAuth } from '@/hooks/useAuth';
import KeyTermFlashcard from './KeyTermFlashcard';

interface OverviewTabProps {
  lesson: InteractiveLessonContent;
  ibTerms: any;
  renderTermWithTooltip: (term: string) => JSX.Element;
  onTermMastered: (term: string) => void;
  masteredTerms: string[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  lesson, 
  ibTerms, 
  renderTermWithTooltip, 
  onTermMastered, 
  masteredTerms 
}) => {
  const { profile } = useAuth();
  const userLevel = profile?.app_version || 'beginner';
  const [showFlashcards, setShowFlashcards] = useState(false);

  // Get terminology terms as flashcard data
  const terminologyFlashcards = lesson.terminology.map(termKey => {
    const termData = ibTerms[termKey];
    return termData ? {
      term: termData.term,
      definition: termData.definition,
      analogy: termData.analogy
    } : null;
  }).filter(Boolean);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Learning Objectives</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {lesson.objectives.map((objective, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <span>{objective}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Key Terms You'll Learn</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-normal text-muted-foreground">
                {masteredTerms.length}/{terminologyFlashcards.length} mastered
              </span>
              <button
                onClick={() => setShowFlashcards(!showFlashcards)}
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                {showFlashcards ? 'Hide Flashcards' : 'Show Flashcards'}
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showFlashcards ? (
            <div className="flex flex-wrap gap-2">
              {lesson.terminology.map((term, index) => (
                <div key={index} className="inline-block">
                  {renderTermWithTooltip(term)}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-2">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <p className="text-sm text-muted-foreground">Study these key terms with interactive flashcards!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {terminologyFlashcards.map((term, index) => (
                  <KeyTermFlashcard
                    key={index}
                    term={term.term}
                    definition={term.definition}
                    analogy={term.analogy}
                    onMastered={onTermMastered}
                    isMastered={masteredTerms.includes(term.term)}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <PandaLogo className="h-12 w-12" />
            <div>
              <h3 className="font-semibold text-green-800">Phil's Learning Tip</h3>
              <p className="text-green-700">
                {userLevel === 'beginner' && 
                  "Take your time with each section! Investment banking has lots of new terms, but I'll help you understand them with simple examples."
                }
                {userLevel === 'intermediate' && 
                  "You're building on solid foundations! Focus on connecting the concepts you're learning to real business situations."
                }
                {userLevel === 'advanced' && 
                  "Great job reaching this level! Now we're diving into the sophisticated strategies that senior bankers use every day."
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
