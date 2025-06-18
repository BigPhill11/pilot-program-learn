
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoryNavigationProps {
  currentChapterIndex: number;
  totalChapters: number;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onBack: () => void;
}

const StoryNavigation: React.FC<StoryNavigationProps> = ({
  currentChapterIndex,
  totalChapters,
  canProceed,
  onPrevious,
  onNext,
  onBack
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex justify-between items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
      <Button 
        variant="outline" 
        onClick={onBack}
        size={isMobile ? 'sm' : 'default'}
      >
        Back to Adventures
      </Button>
      
      <div className={`flex gap-2 ${isMobile ? 'flex-col' : ''}`}>
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={currentChapterIndex === 0}
          size={isMobile ? 'sm' : 'default'}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!canProceed || currentChapterIndex >= totalChapters - 1}
          className="bg-emerald-600 hover:bg-emerald-700"
          size={isMobile ? 'sm' : 'default'}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StoryNavigation;
