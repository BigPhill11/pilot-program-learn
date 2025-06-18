
import React, { useState } from 'react';
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { financeCareers, FinanceCareerData } from '@/data/finance-careers';
import FinanceCareerJourney from './FinanceCareerJourney';

const CareersInFinanceTab = () => {
    const [selectedCareer, setSelectedCareer] = useState<FinanceCareerData | null>(null);

    if (selectedCareer) {
        return <FinanceCareerJourney career={selectedCareer} onBack={() => setSelectedCareer(null)} />;
    }

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Careers in Finance</h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Explore different finance career paths with Duolingo-style learning journeys. Master each field step by step with Phil as your guide!
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {financeCareers.map(career => (
                    <Card 
                        key={career.id} 
                        className="flex flex-col hover:shadow-lg hover:border-primary transition-all cursor-pointer group h-full"
                        onClick={() => setSelectedCareer(career)}
                    >
                        <div className="p-6 flex-grow">
                            <div className="flex items-center justify-center mb-4">
                                <div className="p-4 rounded-full bg-muted transition-transform group-hover:scale-110">
                                    {React.cloneElement(career.icon, { className: 'h-8 w-8 text-primary' })}
                                </div>
                            </div>
                            <CardTitle className="text-xl mb-2 text-center">{career.name}</CardTitle>
                            <Badge variant="outline" className="mx-auto block w-fit mb-4">7-Level Journey</Badge>
                            
                            <CardDescription className="text-sm leading-relaxed">
                                {career.description}
                            </CardDescription>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CareersInFinanceTab;
