
import React from 'react';

interface GameCompletionBannerProps {
  score: number;
}

const GameCompletionBanner: React.FC<GameCompletionBannerProps> = ({ score }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
      <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
      <p className="text-green-700">
        You matched all terms! Final Score: {score} points
      </p>
    </div>
  );
};

export default GameCompletionBanner;
