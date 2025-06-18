
import React, { useState } from 'react';
import { Adventure } from '@/types/adventure';
import { adventures } from '@/data/adventures';
import AdventureHeader from './adventures/AdventureHeader';
import ProgressOverview from './adventures/ProgressOverview';
import AdventureCard from './adventures/AdventureCard';
import StoryReader from './StoryReader';
import { useIsMobile } from '@/hooks/use-mobile';

const PhilAdventures = () => {
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null);
  const isMobile = useIsMobile();

  const handleStartAdventure = (adventure: Adventure) => {
    if (adventure.isUnlocked) {
      setSelectedAdventure(adventure);
    }
  };

  if (selectedAdventure) {
    return (
      <StoryReader 
        adventure={selectedAdventure} 
        onBack={() => setSelectedAdventure(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdventureHeader />
      <ProgressOverview adventures={adventures} />
      
      {/* Adventures Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
        {adventures.map((adventure) => (
          <AdventureCard
            key={adventure.id}
            adventure={adventure}
            onStartAdventure={handleStartAdventure}
          />
        ))}
      </div>
    </div>
  );
};

export default PhilAdventures;
