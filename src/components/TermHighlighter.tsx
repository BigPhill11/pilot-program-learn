
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  analogy?: string;
  real_world_example?: string;
  category: string;
  difficulty_level: string;
}

interface TermHighlighterProps {
  text: string;
  terms: FinancialTerm[];
  className?: string;
}

const TermHighlighter: React.FC<TermHighlighterProps> = ({ text, terms, className = '' }) => {
  if (!terms.length || !text) {
    return <span className={className}>{text}</span>;
  }

  // Sort terms by length (longest first) to avoid partial matches
  const sortedTerms = terms.sort((a, b) => b.term.length - a.term.length);
  
  // Create a map for quick lookup
  const termMap = new Map();
  sortedTerms.forEach(term => {
    termMap.set(term.term.toLowerCase(), term);
  });

  // Build regex pattern for all terms
  const termPattern = sortedTerms
    .map(term => term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  
  if (!termPattern) {
    return <span className={className}>{text}</span>;
  }

  const regex = new RegExp(`\\b(${termPattern})\\b`, 'gi');
  const parts = text.split(regex);

  return (
    <TooltipProvider>
      <span className={className}>
        {parts.map((part, index) => {
          const lowerPart = part.toLowerCase();
          const term = termMap.get(lowerPart);
          
          if (term) {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <span className="font-bold text-blue-600 cursor-help underline decoration-dotted">
                    {part}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold">{term.term}</p>
                      <p className="text-sm">{term.definition}</p>
                    </div>
                    {term.analogy && (
                      <div>
                        <p className="text-xs font-medium text-blue-600">Analogy:</p>
                        <p className="text-xs">{term.analogy}</p>
                      </div>
                    )}
                    {term.real_world_example && (
                      <div>
                        <p className="text-xs font-medium text-green-600">Example:</p>
                        <p className="text-xs">{term.real_world_example}</p>
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }
          
          return <span key={index}>{part}</span>;
        })}
      </span>
    </TooltipProvider>
  );
};

export default TermHighlighter;
