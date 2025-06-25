
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PandaCelebrationProps {
  onClose: () => void;
  title?: string;
  message?: string;
  points?: number;
}

const PandaCelebration: React.FC<PandaCelebrationProps> = ({ 
  onClose, 
  title = "Module Completed!", 
  message,
  points = 5 
}) => {
  const celebrationMessages = [
    "🎉 Outstanding work! You're becoming a finance master!",
    "💪 Fantastic progress! Keep up the amazing effort!",
    "⭐ Brilliant! You're one step closer to your goals!",
    "🚀 Incredible! Your skills are leveling up!",
    "🏆 Well done! You're crushing this course!",
    "🌟 Amazing job! Your dedication is paying off!",
    "💎 Excellent work! You're building valuable skills!",
    "🎯 Perfect! You're hitting all your learning targets!"
  ];

  const pandaAnimations = [
    "🐼💰", // Panda with money
    "🐼🎉", // Panda celebrating
    "🐼📈", // Panda with chart
    "🐼🏆", // Panda with trophy
    "🐼⭐", // Panda with star
    "🐼🎯", // Panda with target
    "🐼💎", // Panda with gem
    "🐼🚀"  // Panda with rocket
  ];

  const randomMessage = message || celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
  const randomPanda = pandaAnimations[Math.floor(Math.random() * pandaAnimations.length)];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="bg-gradient-to-br from-green-100 to-emerald-200 border-green-300 max-w-md mx-4 animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="mb-6 animate-bounce">
            <div className="text-6xl mb-2">{randomPanda}</div>
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-3">
            {title}
          </h3>
          <p className="text-green-700 mb-4 text-lg">
            {randomMessage}
          </p>
          <Badge className="bg-green-600 text-white text-lg px-4 py-2 mb-6">
            +{points} Points Earned! 🎯
          </Badge>
          <Button 
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Continue Learning! 🚀
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PandaCelebration;
