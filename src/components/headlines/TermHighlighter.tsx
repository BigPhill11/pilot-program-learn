
import React from 'react';
import TermHighlighter from '../TermHighlighter';
import { useFinancialTerms } from '@/hooks/useFinancialTerms';

interface HeadlineTermHighlighterProps {
  text: string;
  className?: string;
}

const HeadlineTermHighlighter: React.FC<HeadlineTermHighlighterProps> = ({ text, className }) => {
  const { terms, loading } = useFinancialTerms();

  if (loading) {
    return <span className={className}>{text}</span>;
  }

  return (
    <TermHighlighter 
      text={text} 
      terms={terms} 
      className={className}
    />
  );
};

export default HeadlineTermHighlighter;
