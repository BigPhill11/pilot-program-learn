
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import type { IndustryJourneyData } from '@/data/industry-journeys';
import PandaLogo from '@/components/icons/PandaLogo';
import IndustryJourneyNode from './IndustryJourneyNode';

const IndustryJourney = ({ journey, onBack }: { journey: IndustryJourneyData; onBack: () => void; }) => {
  // For prototype purposes, we'll assume first 2 levels are completed to show all states
  const [completedLevels, setCompletedLevels] = React.useState(2);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Industries
      </Button>
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-2">
          {React.cloneElement(journey.icon, { className: 'h-10 w-10 text-primary' })}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{journey.name} Journey</h2>
        </div>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your path to mastering {journey.name}. Start at level 1 and work your way up!
        </p>
      </header>

      <div className="relative py-8">
        {/* Vertical path line through the center */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-border rounded-full -z-10" />

        <div className="space-y-16">
          {/* Start Point */}
          <div className="flex flex-col items-center gap-2">
            <PandaLogo className="w-24 h-24" />
            <div className="bg-muted p-3 rounded-lg text-center shadow max-w-xs">
              <p className="font-semibold">Hey there!</p>
              <p className="text-sm text-muted-foreground">Let's learn about {journey.name}. Follow the path!</p>
            </div>
          </div>

          {/* Journey Nodes */}
          {journey.levels.map((level, index) => {
            const status = index < completedLevels ? 'completed' : index === completedLevels ? 'active' : 'locked';
            const side = index % 2 === 0 ? 'left' : 'right';
            return (
              <div key={level.level} className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <IndustryJourneyNode levelData={level} status={status} side={side} />
              </div>
            );
          })}

          {/* End Point */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 flex items-center justify-center bg-amber-400 rounded-full text-amber-900 shadow-lg">
              <Trophy className="w-12 h-12"/>
            </div>
            <div className="bg-muted p-3 rounded-lg text-center shadow">
              <p className="font-semibold">Journey Complete!</p>
              <p className="text-xs text-muted-foreground">(Finish all levels to unlock)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryJourney;
