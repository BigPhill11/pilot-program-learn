
import React, { useState } from 'react';
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { financeCareerData, FinanceCareerData } from '@/data/finance-careers';
import EnhancedFinanceCareerJourney from './EnhancedFinanceCareerJourney';
import FinanceCareerJourney from './FinanceCareerJourney';
import { useIsMobile } from '@/hooks/use-mobile';

const CareersInFinanceTab = () => {
    const [selectedCareer, setSelectedCareer] = useState<FinanceCareerData | null>(null);
    const isMobile = useIsMobile();

    if (selectedCareer) {
        // Use enhanced journey for Investment Banking, Private Equity, and Management Consulting
        if (selectedCareer.id === 'investment-banking' || selectedCareer.id === 'private-equity' || selectedCareer.id === 'management-consulting') {
            return <EnhancedFinanceCareerJourney career={selectedCareer} onBack={() => setSelectedCareer(null)} />;
        } else {
            return <FinanceCareerJourney career={selectedCareer} onBack={() => setSelectedCareer(null)} />;
        }
    }

    return (
        <div>
            <div className="text-center mb-8 md:mb-12">
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight text-foreground`}>
                    Careers in Finance
                </h2>
                <p className={`mt-3 max-w-2xl mx-auto ${isMobile ? 'text-base px-4' : 'text-lg'} text-muted-foreground`}>
                    Explore different finance career paths with interactive learning journeys. Master each field step by step with Phil as your guide!
                </p>
            </div>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'} gap-4 md:gap-6`}>
                {financeCareerData.map(career => (
                    <Card 
                        key={career.id} 
                        className="flex flex-col hover:shadow-lg hover:border-primary transition-all cursor-pointer group h-full relative"
                        onClick={() => setSelectedCareer(career)}
                    >
                        {(career.id === 'investment-banking' || career.id === 'private-equity' || career.id === 'management-consulting') && (
                            <div className="absolute top-2 right-2">
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                    ✨ Interactive
                                </Badge>
                            </div>
                        )}
                        <div className={`${isMobile ? 'p-4' : 'p-6'} flex-grow`}>
                            <div className="flex items-center justify-center mb-4">
                                <div className={`${isMobile ? 'p-3' : 'p-4'} rounded-full bg-muted transition-transform group-hover:scale-110`}>
                                    <career.icon className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-primary`} />
                                </div>
                            </div>
                            <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} mb-2 text-center`}>
                                {career.name}
                            </CardTitle>
                            <Badge variant="outline" className="mx-auto block w-fit mb-4">
                                {(career.id === 'investment-banking' || career.id === 'private-equity' || career.id === 'management-consulting') ? 'Interactive Journey' : '7-Level Journey'}
                            </Badge>
                            
                            <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                                {career.description}
                            </CardDescription>
                            
                            {(career.id === 'investment-banking' || career.id === 'private-equity' || career.id === 'management-consulting') && (
                                <div className="mt-3 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-orange-200">
                                    <p className="text-xs text-orange-700 font-medium">
                                        🎮 Now with interactive games, quizzes, and real-world examples!
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CareersInFinanceTab;
