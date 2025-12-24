import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

const PersonalFinancePreview: React.FC = () => {
  const [needs, setNeeds] = useState(60);
  const [wants, setWants] = useState(30);
  const [savings, setSavings] = useState(10);

  const journeys = [
    { emoji: '💰', title: 'Budgeting 101', description: 'Manage your money effectively', levels: 5 },
    { emoji: '🏆', title: 'Building Credit', description: 'Unlock financial opportunities', levels: 5 },
    { emoji: '🎓', title: 'Understanding Taxes', description: 'Learn how taxes work', levels: 5 },
    { emoji: '🔮', title: 'Plan for Later', description: 'Build generational wealth', levels: 5 },
    { emoji: '🚗', title: 'How to Buy Big', description: 'Smart shopping for major purchases', levels: 5 },
    { emoji: '🛡️', title: 'Money Armor', description: 'Protect yourself from scams', levels: 5 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">What it is:</h3>
        <p className="text-muted-foreground leading-relaxed">
          Master the essential money skills every adult needs: budgeting, building credit, understanding taxes, planning for the future, making big purchases, and protecting yourself from scams and fraud.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">How it works:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {journeys.map((journey, index) => (
            <Card key={index} className="p-3 border-2 border-muted hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{journey.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{journey.title}</p>
                  <p className="text-xs text-muted-foreground">{journey.description}</p>
                </div>
              </div>
              <Progress value={0} className="h-1.5" />
              <p className="text-xs text-muted-foreground mt-1">0/{journey.levels} levels</p>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Each journey has 5 levels with flashcards, quizzes, drag-and-drop activities, and mini-games!
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-200">
        <h3 className="text-lg font-semibold mb-2">Why it matters:</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          These are life skills your school doesn't teach. Whether you're earning your first paycheck or planning your first big purchase, these journeys give you confidence to handle money like an adult.
        </p>
        
        <div className="bg-white p-4 rounded-lg border">
          <p className="font-semibold text-sm mb-3">Quick test: You have $100. How would you split it?</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Needs (rent, food, bills)</span>
                <span className="font-semibold">${needs}</span>
              </div>
              <Slider value={[needs]} onValueChange={(v) => setNeeds(v[0])} max={100} step={5} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Wants (entertainment, fun)</span>
                <span className="font-semibold">${wants}</span>
              </div>
              <Slider value={[wants]} onValueChange={(v) => setWants(v[0])} max={100} step={5} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Savings (emergency fund)</span>
                <span className="font-semibold">${savings}</span>
              </div>
              <Slider value={[savings]} onValueChange={(v) => setSavings(v[0])} max={100} step={5} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            There's no wrong answer—this is just to show you what budgeting looks like!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalFinancePreview;
