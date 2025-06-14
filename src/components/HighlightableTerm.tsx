
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';

interface HighlightableTermProps {
  term: string;
  definition: string;
  children?: React.ReactNode; // Allow custom trigger elements if needed
}

const HighlightableTerm: React.FC<HighlightableTermProps> = ({ term, definition, children }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children ? children : (
            <span className="underline decoration-dotted cursor-pointer text-primary hover:text-primary/80">
              {term}
              <HelpCircle className="inline-block ml-1 h-3 w-3" />
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-popover text-popover-foreground p-3 rounded-md shadow-lg border">
          <p className="text-sm font-semibold mb-1">{term}</p>
          <p className="text-xs">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HighlightableTerm;
