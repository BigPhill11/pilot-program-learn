import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Zap, Target, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const GamesPreview: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  const gameTypes = [
    {
      icon: Zap,
      title: 'Flashcard Challenges',
      description: 'Master financial terms fast with spaced repetition',
      color: 'text-yellow-600 border-yellow-200 bg-yellow-50'
    },
    {
      icon: Target,
      title: 'Budget Builders',
      description: 'Create realistic monthly budgets and see results',
      color: 'text-blue-600 border-blue-200 bg-blue-50'
    },
    {
      icon: Trophy,
      title: 'Quiz Battles',
      description: 'Test your knowledge and earn XP rewards',
      color: 'text-purple-600 border-purple-200 bg-purple-50'
    },
    {
      icon: Gamepad2,
      title: 'Real-world Scenarios',
      description: 'Make decisions in simulated financial situations',
      color: 'text-green-600 border-green-200 bg-green-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">What it is:</h3>
        <p className="text-muted-foreground leading-relaxed">
          Learn by doing! Play financial games, complete challenges, and practice real-world scenarios. All the education, none of the boring lectures. Interactive learning that makes concepts stick.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">How it works:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {gameTypes.map((game, index) => {
            const IconComponent = game.icon;
            return (
              <Card key={index} className={`p-4 border-2 ${game.color}`}>
                <IconComponent className="h-6 w-6 mb-2" />
                <p className="font-semibold text-sm mb-1">{game.title}</p>
                <p className="text-xs text-muted-foreground">{game.description}</p>
              </Card>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Games unlock as you level up in other tabs. Complete lessons to access more activities!
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
        <h3 className="text-lg font-semibold mb-2">Why it matters:</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Reading about money is one thing—practicing with it is another. Games let you fail safely, experiment freely, and learn faster by doing. Plus, earning XP and badges makes learning addictive!
        </p>
        
        <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
          <p className="font-semibold text-sm mb-3 text-center">Try a sample flashcard:</p>
          <motion.div
            className="relative h-32 cursor-pointer"
            onClick={() => setFlipped(!flipped)}
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className="text-center font-semibold">
                What does "compound interest" mean?
              </p>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-lg"
              animate={{ rotateY: flipped ? 0 : -180 }}
              transition={{ duration: 0.4 }}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-center text-sm">
                Interest earned on both your initial money AND previously earned interest. It's how money grows exponentially!
              </p>
            </motion.div>
          </motion.div>
          <p className="text-xs text-muted-foreground text-center mt-2">Click the card to flip it!</p>
        </div>
      </div>
    </div>
  );
};

export default GamesPreview;
