
import React, { useState } from 'react';
import { Accordion } from "@/components/ui/accordion";
import TaxesJourney from './TaxesJourney';
import BudgetJourney from './BudgetJourney';
import CreditJourney from './CreditJourney';
import BigPurchasesJourney from './BigPurchasesJourney';
import FuturePlanningJourney from './FuturePlanningJourney';
import EarningMoneyJourney from './EarningMoneyJourney';
import FinancialSafetyJourney from './FinancialSafetyJourney';
import BudgetJourneySection from './sections/BudgetJourneySection';
import BigPurchasesJourneySection from './sections/BigPurchasesJourneySection';
import FuturePlanningJourneySection from './sections/FuturePlanningJourneySection';
import CreditJourneySection from './sections/CreditJourneySection';
import TaxesJourneySection from './sections/TaxesJourneySection';
import EarningMoneyJourneySection from './sections/EarningMoneyJourneySection';
import FinancialSafetyJourneySection from './sections/FinancialSafetyJourneySection';
import PodcastRecommendationsSection from './sections/PodcastRecommendationsSection';

const PersonalFinanceTab = () => {
    const [showTaxesJourney, setShowTaxesJourney] = useState(false);
    const [showBudgetJourney, setShowBudgetJourney] = useState(false);
    const [showCreditJourney, setShowCreditJourney] = useState(false);
    const [showBigPurchasesJourney, setShowBigPurchasesJourney] = useState(false);
    const [showFuturePlanningJourney, setShowFuturePlanningJourney] = useState(false);
    const [showEarningMoneyJourney, setShowEarningMoneyJourney] = useState(false);
    const [showFinancialSafetyJourney, setShowFinancialSafetyJourney] = useState(false);

    // Helper functions to get progress for each journey
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

    const getEarningMoneyProgress = () => {
        const saved = localStorage.getItem('earningMoneyJourneyProgress');
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

    const getFinancialSafetyProgress = () => {
        const saved = localStorage.getItem('financialSafetyJourneyProgress');
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

    // Render journey components if active
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

    if (showEarningMoneyJourney) {
        return <EarningMoneyJourney onBack={() => setShowEarningMoneyJourney(false)} />;
    }

    if (showFinancialSafetyJourney) {
        return <FinancialSafetyJourney onBack={() => setShowFinancialSafetyJourney(false)} />;
    }

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">Personal Finance Essentials</h2>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                    <EarningMoneyJourneySection 
                        onStartJourney={() => setShowEarningMoneyJourney(true)}
                        progress={getEarningMoneyProgress()}
                    />
                    <FinancialSafetyJourneySection 
                        onStartJourney={() => setShowFinancialSafetyJourney(true)}
                        progress={getFinancialSafetyProgress()}
                    />
                    <BudgetJourneySection 
                        onStartJourney={() => setShowBudgetJourney(true)}
                        progress={getBudgetProgress()}
                    />
                    <BigPurchasesJourneySection 
                        onStartJourney={() => setShowBigPurchasesJourney(true)}
                        progress={getBigPurchasesProgress()}
                    />
                    <FuturePlanningJourneySection 
                        onStartJourney={() => setShowFuturePlanningJourney(true)}
                        progress={getFuturePlanningProgress()}
                    />
                    <CreditJourneySection 
                        onStartJourney={() => setShowCreditJourney(true)}
                        progress={getCreditProgress()}
                    />
                    <TaxesJourneySection 
                        onStartJourney={() => setShowTaxesJourney(true)}
                        progress={getTaxesProgress()}
                    />
                </Accordion>
            </div>

            <PodcastRecommendationsSection />
        </div>
    );
};

export default PersonalFinanceTab;
