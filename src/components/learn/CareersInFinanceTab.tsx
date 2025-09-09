
import React, { useState } from 'react';
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { financeCareerData, FinanceCareerData } from '@/data/finance-careers';
import EnhancedFinanceCareerJourney from './EnhancedFinanceCareerJourney';
import FinanceCareerJourney from './FinanceCareerJourney';
import InteractiveConsultingLesson from "./InteractiveConsultingLesson";
import IBDivisionsHub from "./IBDivisionsHub";
import { managementConsultingLessons } from "@/data/management-consulting-lessons";
import VCJourney from './VCJourney';
import { ibDivisions } from "@/data/ib-divisions";
import { useIsMobile } from '@/hooks/use-mobile';
import AssetManagementJourney from './AssetManagementJourney';

const CareersInFinanceTab = () => {
    const [selectedCareer, setSelectedCareer] = useState<FinanceCareerData | null>(null);
    const [showIBDivisions, setShowIBDivisions] = useState(false);
    const isMobile = useIsMobile();

    // Show IB Divisions Hub
    if (showIBDivisions) {
      return <IBDivisionsHub divisions={ibDivisions} onBack={() => setShowIBDivisions(false)} />;
    }

    if (selectedCareer) {
      // Interactive lessons for specific careers
      if (selectedCareer.id === 'management-consulting') {
        return <InteractiveConsultingLesson
          lesson={managementConsultingLessons[0]}
          onBack={() => setSelectedCareer(null)}
          onComplete={() => setSelectedCareer(null)}
        />;
      }
      
      if (selectedCareer.id === 'venture-capital') {
        return <VCJourney onBack={() => setSelectedCareer(null)} />;
      }

      if (selectedCareer.id === 'asset-management') {
        return <AssetManagementJourney onBack={() => setSelectedCareer(null)} />;
      }

      
      // Investment Banking - show divisions selection
      if (selectedCareer.id === 'investment-banking') {
        setSelectedCareer(null);
        setShowIBDivisions(true);
        return null;
      }
      
      // Use enhanced journey for Private Equity  
      if (selectedCareer.id === 'private-equity') {
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
                        {(['investment-banking', 'management-consulting', 'private-equity', 'venture-capital', 'asset-management'].includes(career.id)) && (
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
                                {career.id === 'investment-banking' ? 'IB Divisions Available' : 
                                 (['management-consulting', 'private-equity', 'venture-capital', 'asset-management'].includes(career.id)) ? 'Interactive Journey' : '7-Level Journey'}
                            </Badge>
                            
                            <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                                {career.description}
                            </CardDescription>
                            
                            {career.id === 'investment-banking' && (
                                <div className="mt-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                    <p className="text-xs text-blue-700 font-medium">
                                        🏦 Access 6 specialized IB divisions: M&A, DCM, ECM, Leveraged Finance, Sales & Trading, and Restructuring!
                                    </p>
                                </div>
                            )}
                            
                            {(['management-consulting', 'private-equity', 'venture-capital', 'asset-management'].includes(career.id)) && (
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
