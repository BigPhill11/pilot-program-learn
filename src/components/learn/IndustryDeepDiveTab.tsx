
import React, { useState } from 'react';
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { industryJourneys, IndustryJourneyData } from '@/data/industry-journeys';
import IndustryJourney from './IndustryJourney';

const IndustryDeepDiveTab = () => {
    const [selectedIndustry, setSelectedIndustry] = useState<IndustryJourneyData | null>(null);

    if (selectedIndustry) {
        return <IndustryJourney journey={selectedIndustry} onBack={() => setSelectedIndustry(null)} />;
    }

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Industry Deep Dives</h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Choose an industry to start your learning journey.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {industryJourneys.map(industry => (
                    <Card 
                        key={industry.id} 
                        className="flex flex-col items-center text-center p-6 hover:shadow-lg hover:border-primary transition-all cursor-pointer group"
                        onClick={() => setSelectedIndustry(industry)}
                    >
                        <div className="p-4 rounded-full bg-muted mb-4 transition-transform group-hover:scale-110">
                            {React.cloneElement(industry.icon, { className: 'h-8 w-8 text-primary' })}
                        </div>
                        <CardTitle className="text-xl mb-2">{industry.name}</CardTitle>
                        <Badge variant="outline">{industry.levels.length} Levels</Badge>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default IndustryDeepDiveTab;
