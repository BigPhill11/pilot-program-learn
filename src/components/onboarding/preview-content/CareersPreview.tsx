import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Briefcase } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const CareersPreview: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState('');

  const careerStories = [
    {
      id: 'investment-banking',
      title: 'Investment Banking',
      subtitle: 'The Big Deal',
      description: 'Experience a 72-hour sprint to close a $2B merger. High stakes, high rewards.',
      difficulty: 'Intermediate',
      time: '25-35 min',
      emoji: '💼',
      gradient: 'from-blue-50 to-indigo-50'
    },
    {
      id: 'private-equity',
      title: 'Private Equity',
      subtitle: 'The Investment Committee',
      description: 'Defend a $150M buyout to skeptical partners. Can you make the case?',
      difficulty: 'Advanced',
      time: '30-40 min',
      emoji: '💎',
      gradient: 'from-purple-50 to-pink-50'
    },
    {
      id: 'consulting',
      title: 'Management Consulting',
      subtitle: 'The Turnaround Challenge',
      description: 'Save a retail chain from bankruptcy in one week. Think fast, act faster.',
      difficulty: 'Intermediate',
      time: '25-35 min',
      emoji: '🔍',
      gradient: 'from-green-50 to-teal-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">What it is:</h3>
        <p className="text-muted-foreground leading-relaxed">
          Explore high-paying finance careers through interactive day-in-the-life stories. Experience what it's really like to be an investment banker, consultant, or private equity analyst—from the decisions you'll make to the pressure you'll face.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">How it works:</h3>
        <div className="space-y-3">
          {careerStories.map((story) => (
            <Card key={story.id} className={`p-4 border-2 border-muted hover:border-primary/50 transition-all bg-gradient-to-r ${story.gradient}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{story.emoji}</span>
                  <div>
                    <p className="font-bold">{story.title}</p>
                    <p className="text-sm text-muted-foreground italic">"{story.subtitle}"</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Badge variant="outline" className="text-xs">
                    {story.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {story.time}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{story.description}</p>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Make real decisions, see consequences, and learn the skills each career requires through branching storylines!
        </p>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-200">
        <h3 className="text-lg font-semibold mb-2">Why it matters:</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Curious if finance is for you? Instead of reading boring job descriptions, EXPERIENCE these careers through realistic scenarios. Discover which path excites you most, what skills you'll need, and what the day-to-day reality actually looks like.
        </p>
        
        <div className="bg-white p-4 rounded-lg border">
          <p className="font-semibold text-sm mb-3">Quick question: Which sounds most interesting to you?</p>
          <RadioGroup value={selectedCareer} onValueChange={setSelectedCareer}>
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
              <RadioGroupItem value="deals" id="deals" />
              <Label htmlFor="deals" className="text-sm cursor-pointer flex-1">
                💼 Closing big deals and raising billions (Investment Banking)
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
              <RadioGroupItem value="fixing" id="fixing" />
              <Label htmlFor="fixing" className="text-sm cursor-pointer flex-1">
                🔍 Fixing broken companies and solving complex problems (Consulting)
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
              <RadioGroupItem value="investing" id="investing" />
              <Label htmlFor="investing" className="text-sm cursor-pointer flex-1">
                💎 Finding hidden value and making huge bets (Private Equity)
              </Label>
            </div>
          </RadioGroup>
          <p className="text-xs text-muted-foreground mt-3 italic">
            No wrong answer—this helps you explore careers that match your interests!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareersPreview;
