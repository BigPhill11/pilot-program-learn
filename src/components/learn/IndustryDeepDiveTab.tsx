
import React, { useState } from 'react';
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
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
                    Choose an industry to start your learning journey with AI-powered insights and predictions.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {industryJourneys.map(industry => (
                    <Card 
                        key={industry.id} 
                        className="flex flex-col hover:shadow-lg hover:border-primary transition-all cursor-pointer group h-full"
                        onClick={() => setSelectedIndustry(industry)}
                    >
                        <div className="p-6 flex-grow">
                            <div className="flex items-center justify-center mb-4">
                                <div className="p-4 rounded-full bg-muted transition-transform group-hover:scale-110">
                                    {React.cloneElement(industry.icon, { className: 'h-8 w-8 text-primary' })}
                                </div>
                            </div>
                            <CardTitle className="text-xl mb-2 text-center">{industry.name}</CardTitle>
                            <Badge variant="outline" className="mx-auto block w-fit mb-4">{industry.levels.length} Levels</Badge>
                            
                            <CardDescription className="text-sm leading-relaxed mb-4">
                                {industry.description}
                            </CardDescription>
                            
                            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500 mb-4">
                                <p className="text-xs font-semibold text-blue-700 mb-1">🤖 AI Market Prediction</p>
                                <p className="text-xs text-blue-600 leading-relaxed">
                                    {industry.prediction}
                                </p>
                            </div>
                            
                            <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                                <p className="text-xs font-semibold text-green-700 mb-1">📈 Stocks to Watch</p>
                                <div className="flex flex-wrap gap-1">
                                    {industry.stocksToWatch.map(stock => (
                                        <span key={stock} className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded font-medium">
                                            {stock}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default IndustryDeepDiveTab;
