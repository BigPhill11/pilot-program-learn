
import React from 'react';
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Briefcase, Landmark, Building, Users, Handshake, Home, BrainCircuit } from 'lucide-react';

const industries = [
    { name: "Investment Banking", icon: <Landmark className="h-8 w-8 text-primary" /> },
    { name: "Private Equity", icon: <Briefcase className="h-8 w-8 text-primary" /> },
    { name: "Credit", icon: <Building className="h-8 w-8 text-primary" /> },
    { name: "Wealth Management", icon: <Users className="h-8 w-8 text-primary" /> },
    { name: "M&A", icon: <Handshake className="h-8 w-8 text-primary" /> },
    { name: "Real Estate", icon: <Home className="h-8 w-8 text-primary" /> },
    { name: "Consulting", icon: <BrainCircuit className="h-8 w-8 text-primary" /> },
];

const IndustryDeepDiveTab = () => {
    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Industry Deep Dives</h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Explore different sectors in the world of finance. Content for these sections is coming soon!
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries.map(industry => (
                    <Card key={industry.name} className="flex flex-col items-center text-center p-6 hover:shadow-md transition-shadow">
                        <div className="p-4 rounded-full bg-muted mb-4">
                            {industry.icon}
                        </div>
                        <CardTitle className="text-xl mb-2">{industry.name}</CardTitle>
                        <Badge variant="outline">Coming Soon</Badge>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default IndustryDeepDiveTab;
