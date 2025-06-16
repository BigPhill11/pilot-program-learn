import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Play, CheckCircle2 } from 'lucide-react';
import PodcastCard from './PodcastCard';
import TaxesJourney from './TaxesJourney';
import BudgetJourney from './BudgetJourney';
import CreditJourney from './CreditJourney';
import BigPurchasesJourney from './BigPurchasesJourney';
import FuturePlanningJourney from './FuturePlanningJourney';

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
    const [showBudgetJourney, setShowBudgetJourney] = useState(false);
    const [showCreditJourney, setShowCreditJourney] = useState(false);
    const [showBigPurchasesJourney, setShowBigPurchasesJourney] = useState(false);
    const [showFuturePlanningJourney, setShowFuturePlanningJourney] = useState(false);

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

    // Check if budget journey has been completed
    const getBudgetProgress = () => {
        const saved = localStorage.getItem('budgetJourneyProgress');
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

    // Check if credit journey has been completed
    const getCreditProgress = () => {
        const saved = localStorage.getItem('creditJourneyProgress');
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

    // Check if big purchases journey has been completed
    const getBigPurchasesProgress = () => {
        const saved = localStorage.getItem('bigPurchasesJourneyProgress');
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

    // Check if future planning journey has been completed
    const getFuturePlanningProgress = () => {
        const saved = localStorage.getItem('futurePlanningJourneyProgress');
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
    const budgetProgress = getBudgetProgress();
    const creditProgress = getCreditProgress();
    const bigPurchasesProgress = getBigPurchasesProgress();
    const futurePlanningProgress = getFuturePlanningProgress();

    if (showTaxesJourney) {
        return <TaxesJourney onBack={() => setShowTaxesJourney(false)} />;
    }

    if (showBudgetJourney) {
        return <BudgetJourney onBack={() => setShowBudgetJourney(false)} />;
    }

    if (showCreditJourney) {
        return <CreditJourney onBack={() => setShowCreditJourney(false)} />;
    }

    if (showBigPurchasesJourney) {
        return <BigPurchasesJourney onBack={() => setShowBigPurchasesJourney(false)} />;
    }

    if (showFuturePlanningJourney) {
        return <FuturePlanningJourney onBack={() => setShowFuturePlanningJourney(false)} />;
    }

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">Personal Finance Essentials</h2>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                    {/* Budgeting Journey Section */}
                    <AccordionItem value="budgeting" className="border-2 border-blue-500/20">
                        <AccordionTrigger className="text-lg text-left">
                            <div className="flex items-center gap-2">
                                Budgeting 101
                                {budgetProgress.completed && (
                                    <Badge className="bg-blue-500 text-white">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        Complete
                                    </Badge>
                                )}
                                {!budgetProgress.completed && budgetProgress.levelsCompleted > 0 && (
                                    <Badge variant="outline">
                                        {budgetProgress.levelsCompleted}/{budgetProgress.totalLevels} levels
                                    </Badge>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-500/30">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg mb-2">💰 Interactive Budgeting Learning Journey</h4>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Master budgeting through 5 gamified levels with flashcards, quizzes, and real-world scenarios. 
                                                Complete all levels to unlock the budget builder simulation game!
                                            </p>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                                    <span>Learn needs vs wants</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                                    <span>50/30/20 budgeting rule</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                                    <span>Budgeting for goals</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Trophy className="h-4 w-4 text-blue-500" />
                                                    <span>Final budget builder simulation</span>
                                                </div>
                                            </div>

                                            {budgetProgress.completed && (
                                                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Trophy className="h-5 w-5 text-blue-600" />
                                                        <span className="font-semibold text-blue-800">Badge Earned: Budget Boss!</span>
                                                    </div>
                                                    <p className="text-sm text-blue-700 mt-1">
                                                        You've completed the entire budgeting journey and earned your achievement badge.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        onClick={() => setShowBudgetJourney(true)}
                                        className="w-full bg-blue-500 hover:bg-blue-600"
                                        size="lg"
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        {budgetProgress.levelsCompleted > 0 ? 'Continue Budgeting Journey' : 'Start Budgeting Journey'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Big Purchases Journey Section */}
                    <AccordionItem value="big-purchases" className="border-2 border-purple-500/20">
                        <AccordionTrigger className="text-lg text-left">
                            <div className="flex items-center gap-2">
                                How to Buy Big
                                {bigPurchasesProgress.completed && (
                                    <Badge className="bg-purple-500 text-white">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        Complete
                                    </Badge>
                                )}
                                {!bigPurchasesProgress.completed && bigPurchasesProgress.levelsCompleted > 0 && (
                                    <Badge variant="outline">
                                        {bigPurchasesProgress.levelsCompleted}/{bigPurchasesProgress.totalLevels} levels
                                    </Badge>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-500/30">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg mb-2">🚗 Interactive Big Purchases Journey</h4>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Master major purchases through 5 gamified levels covering cars, homes, and smart shopping. 
                                                Complete all levels to unlock the car buying simulation game!
                                            </p>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                                    <span>Car buying strategies</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                                    <span>Home buying vs renting</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                                    <span>Negotiation and comparison skills</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Trophy className="h-4 w-4 text-purple-500" />
                                                    <span>Final car buying simulation</span>
                                                </div>
                                            </div>

                                            {bigPurchasesProgress.completed && (
                                                <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Trophy className="h-5 w-5 text-purple-600" />
                                                        <span className="font-semibold text-purple-800">Badge Earned: Smart Buyer!</span>
                                                    </div>
                                                    <p className="text-sm text-purple-700 mt-1">
                                                        You've completed the entire big purchases journey and earned your achievement badge.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        onClick={() => setShowBigPurchasesJourney(true)}
                                        className="w-full bg-purple-500 hover:bg-purple-600"
                                        size="lg"
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        {bigPurchasesProgress.levelsCompleted > 0 ? 'Continue Big Purchases Journey' : 'Start Big Purchases Journey'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Future Planning Journey Section */}
                    <AccordionItem value="future-planning" className="border-2 border-indigo-500/20">
                        <AccordionTrigger className="text-lg text-left">
                            <div className="flex items-center gap-2">
                                Plan for Later, Start Now
                                {futurePlanningProgress.completed && (
                                    <Badge className="bg-indigo-500 text-white">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        Complete
                                    </Badge>
                                )}
                                {!futurePlanningProgress.completed && futurePlanningProgress.levelsCompleted > 0 && (
                                    <Badge variant="outline">
                                        {futurePlanningProgress.levelsCompleted}/{futurePlanningProgress.totalLevels} levels
                                    </Badge>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-500/30">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg mb-2">🔮 Interactive Future Planning Journey</h4>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Master future planning through 5 gamified levels covering retirement, insurance, and legacy building. 
                                                Complete all levels to unlock the Future Plan Folder builder!
                                            </p>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                                                    <span>Retirement accounts (401k, IRA)</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                                                    <span>Life insurance basics</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                                                    <span>Estate planning essentials</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Trophy className="h-4 w-4 text-indigo-500" />
                                                    <span>Final Future Plan Folder builder</span>
                                                </div>
                                            </div>

                                            {futurePlanningProgress.completed && (
                                                <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Trophy className="h-5 w-5 text-indigo-600" />
                                                        <span className="font-semibold text-indigo-800">Badge Earned: Future Ready!</span>
                                                    </div>
                                                    <p className="text-sm text-indigo-700 mt-1">
                                                        You've completed the entire future planning journey and earned your achievement badge.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        onClick={() => setShowFuturePlanningJourney(true)}
                                        className="w-full bg-indigo-500 hover:bg-indigo-600"
                                        size="lg"
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        {futurePlanningProgress.levelsCompleted > 0 ? 'Continue Future Planning Journey' : 'Start Future Planning Journey'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Credit Journey Section */}
                    <AccordionItem value="credit" className="border-2 border-green-500/20">
                        <AccordionTrigger className="text-lg text-left">
                            <div className="flex items-center gap-2">
                                How to Build Credit
                                {creditProgress.completed && (
                                    <Badge className="bg-green-500 text-white">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        Complete
                                    </Badge>
                                )}
                                {!creditProgress.completed && creditProgress.levelsCompleted > 0 && (
                                    <Badge variant="outline">
                                        {creditProgress.levelsCompleted}/{creditProgress.totalLevels} levels
                                    </Badge>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-500/30">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg mb-2">🏆 Interactive Credit Building Journey</h4>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                Master credit through 5 gamified levels with flashcards, quizzes, and real-world scenarios. 
                                                Complete all levels to unlock the credit score builder simulation game!
                                            </p>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Understanding credit basics</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Credit scores and reports</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Building credit responsibly</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Trophy className="h-4 w-4 text-green-500" />
                                                    <span>Final credit score builder simulation</span>
                                                </div>
                                            </div>

                                            {creditProgress.completed && (
                                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Trophy className="h-5 w-5 text-green-600" />
                                                        <span className="font-semibold text-green-800">Badge Earned: Credit Champ!</span>
                                                    </div>
                                                    <p className="text-sm text-green-700 mt-1">
                                                        You've completed the entire credit journey and earned your achievement badge.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        onClick={() => setShowCreditJourney(true)}
                                        className="w-full bg-green-500 hover:bg-green-600"
                                        size="lg"
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        {creditProgress.levelsCompleted > 0 ? 'Continue Credit Journey' : 'Start Credit Journey'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                    
                    {/* Taxes Journey Section */}
                    <AccordionItem value="taxes" className="border-2 border-primary/20">
                        <AccordionTrigger className="text-lg text-left">
                            <div className="flex items-center gap-2">
                                Understanding Taxes
                                {taxesProgress.completed && (
                                    <Badge className="bg-primary text-white">
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
                            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-primary/30">
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
                                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                                    <span>Interactive flashcards & quizzes</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                                    <span>Drag-and-drop activities</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
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
                                        {taxesProgress.levelsCompleted > 0 ? 'Continue Taxes Journey' : 'Start Taxes Journey'}
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
