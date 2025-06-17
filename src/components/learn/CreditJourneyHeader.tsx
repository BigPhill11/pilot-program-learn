
import React from 'react';

interface CreditJourneyHeaderProps {
  completedLevels: number;
  totalLevels: number;
}

const CreditJourneyHeader: React.FC<CreditJourneyHeaderProps> = ({
  completedLevels,
  totalLevels
}) => {
  return (
    <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
      <div className="text-4xl mb-4">🏆</div>
      <h1 className="text-3xl font-bold mb-2">Credit Learning Journey</h1>
      <p className="text-muted-foreground mb-6">
        Master the basics of credit through 5 interactive levels and unlock the credit score builder simulation!
      </p>
      
      <div className="max-w-md mx-auto">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Overall Progress</span>
          <span>{completedLevels}/{totalLevels} levels completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedLevels / totalLevels) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditJourneyHeader;
