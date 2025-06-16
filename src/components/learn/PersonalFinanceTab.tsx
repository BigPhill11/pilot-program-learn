
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Play, CheckCircle2 } from 'lucide-react';
import PodcastCard from './PodcastCard';
import TaxesJourney from './TaxesJourney';

const personalFinanceTopics = [
    {
        value: "budgeting",
        title: "Budgeting 101",
        content: "Budgeting is the process of creating a plan to spend your money. This spending plan is called a budget. Creating this spending plan allows you to determine in advance whether you will have enough money to do the things you need to do or would like to do."
    },
    {
        value: "roth-ira",
        title: "What is a Roth IRA?",
        content: "A Roth IRA is a special individual retirement account (IRA) where you pay taxes on money going into your account, and then all future withdrawals are tax-free. Roth IRAs are best for people who expect their tax rate to be higher in retirement than it is now."
    },
    {
        value: "401k",
        title: "Intro to 401(k) Plans",
        content: "A 401(k) is a retirement savings plan sponsored by an employer. It lets workers save and invest a piece of their paycheck before taxes are taken out. Taxes aren't paid until the money is withdrawn from the account."
    },
    {
        value: "buying-house",
        title: "How to Buy a House",
        content: "Buying a house involves several key steps: determining your budget, getting pre-approved for a mortgage, finding a real estate agent, house hunting, making an offer, getting an inspection and appraisal, and finally, closing the sale."
    },
    {
        value: "building-credit",
        title: "How to Build Credit",
        content: "Building credit is essential for your financial health. You can build credit by opening a new credit account, making payments on time, keeping your credit utilization low, and regularly monitoring your credit report for errors."
    }
];

const podcastRecommendations = [
    {
        name: "The Ramsey Show",
        description: "Dave Ramsey offers practical financial advice, helping listeners get out of debt and build wealth.",
        imageUrl: "/placeholder.svg",
        link: "https://www.ramseysolutions.com/shows/the-ramsey-show"
    },
    {
        name: "Planet Money",
        description: "NPR's podcast that makes complex economic topics accessible and entertaining.",
        imageUrl: "/placeholder.svg",
        link: "https://www.npr.org/sections/money/"
    },
    {
        name: "Afford Anything",
        description: "Hosted by Paula Pant, this podcast explores how to make smarter decisions about money, time, and life.",
        imageUrl: "/placeholder.svg",
        link: "https://affordanything.com/podcast/"
    }
];

const PersonalFinanceTab = () => {
    const [showTaxesJourney, setShowTaxesJourney] = useState(false);

    // Check if taxes journey has been completed
    const getTaxesProgress = () => {
        const saved = localStorage.getItem('taxesJourneyProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            return {
                completed: progress.journeyCompleted || false,
                levelsCompleted: progress.completedLevels?.length || 0,
                totalLevels: 5
            };
        }
        return { completed: false, levelsCompleted: 0, totalLevels: 5 };
    };

    const taxesProgress = getTaxesProgress();

    if (showTaxesJourney) {
        return <TaxesJourney onBack={() => setShowTaxesJourney(false)} />;
    }

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">Personal Finance Essentials</h2>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                    {personalFinanceTopics.map((topic) => (
                        <AccordionItem value={topic.value} key={topic.value}>
                            <AccordionTrigger className="text-lg text-left">{topic.title}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {topic.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                    
                    {/* Special Taxes Journey Section */}
                    <AccordionItem value="taxes" className="border-2 border-primary/20">
                        <AccordionTrigger className="text-lg text-left">
                            <div className="flex items-center gap-2">
                                Understanding Taxes
                                {taxesProgress.completed && (
                                    <Badge className="bg-green-500 text-white">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        Complete
                                    </Badge>
                                )}
                                {!taxesProgress.completed && taxesProgress.levelsCompleted > 0 && (
                                    <Badge variant="outline">
                                        {taxesProgress.levelsCompleted}/{taxesProgress.totalLevels} levels
                                    </Badge>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-primary/30">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg mb-2">🎓 Interactive Taxes Learning Journey</h4>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Master taxes through 5 gamified levels with flashcards, quizzes, and real-world challenges. 
                                                Complete all levels to unlock the tax filing simulation game!
                                            </p>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Interactive flashcards & quizzes</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Drag-and-drop activities</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Real-world tax scenarios</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Trophy className="h-4 w-4 text-yellow-500" />
                                                    <span>Final tax filing simulation</span>
                                                </div>
                                            </div>

                                            {taxesProgress.completed && (
                                                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Trophy className="h-5 w-5 text-yellow-600" />
                                                        <span className="font-semibold text-yellow-800">Badge Earned: Tax Smart Rookie!</span>
                                                    </div>
                                                    <p className="text-sm text-yellow-700 mt-1">
                                                        You've completed the entire taxes journey and earned your achievement badge.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        onClick={() => setShowTaxesJourney(true)}
                                        className="w-full"
                                        size="lg"
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        {taxesProgress.levelsCompleted > 0 ? 'Continue Journey' : 'Start Taxes Journey'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">Podcast Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {podcastRecommendations.map((podcast) => (
                        <PodcastCard key={podcast.name} {...podcast} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PersonalFinanceTab;
