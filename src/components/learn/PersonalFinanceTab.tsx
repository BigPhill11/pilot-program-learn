import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Lock, CheckCircle2, Play } from 'lucide-react';
import TaxesJourney from './TaxesJourney';
import BudgetJourney from './BudgetJourney';
import CreditJourney from './CreditJourney';
import FuturePlanningJourney from './FuturePlanningJourney';
import BigPurchasesJourney from './BigPurchasesJourney';
import FinancialSafetyJourney from './FinancialSafetyJourney';
import EarningMoneyJourney from './EarningMoneyJourney';
import PodcastRecommendationsSection from './sections/PodcastRecommendationsSection';
const PersonalFinanceTab = () => {
  const [showTaxesJourney, setShowTaxesJourney] = useState(false);
  const [showBudgetJourney, setShowBudgetJourney] = useState(false);
  const [showCreditJourney, setShowCreditJourney] = useState(false);
  const [showFuturePlanningJourney, setShowFuturePlanningJourney] = useState(false);
  const [showBigPurchasesJourney, setShowBigPurchasesJourney] = useState(false);
  const [showFinancialSafetyJourney, setShowFinancialSafetyJourney] = useState(false);
  const [showEarningMoneyJourney, setShowEarningMoneyJourney] = useState(false);

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
    return {
      completed: false,
      levelsCompleted: 0,
      totalLevels: 5
    };
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
    return {
      completed: false,
      levelsCompleted: 0,
      totalLevels: 5
    };
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
    return {
      completed: false,
      levelsCompleted: 0,
      totalLevels: 5
    };
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
    return {
      completed: false,
      levelsCompleted: 0,
      totalLevels: 5
    };
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
    return {
      completed: false,
      levelsCompleted: 0,
      totalLevels: 5
    };
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
    return {
      completed: false,
      levelsCompleted: 0,
      totalLevels: 5
    };
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
    return {
      completed: false,
      levelsCompleted: 0,
      totalLevels: 5
    };
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
  if (showFuturePlanningJourney) {
    return <FuturePlanningJourney onBack={() => setShowFuturePlanningJourney(false)} />;
  }
  if (showBigPurchasesJourney) {
    return <BigPurchasesJourney onBack={() => setShowBigPurchasesJourney(false)} />;
  }
  if (showFinancialSafetyJourney) {
    return <FinancialSafetyJourney onBack={() => setShowFinancialSafetyJourney(false)} />;
  }
  if (showEarningMoneyJourney) {
    return <EarningMoneyJourney onBack={() => setShowEarningMoneyJourney(false)} />;
  }
  const journeys = [{
    id: 'earning-money',
    title: 'Making Your First Dollar',
    description: 'Learn how to earn, understand paychecks, and manage your income',
    emoji: '💵',
    progress: getEarningMoneyProgress(),
    onClick: () => setShowEarningMoneyJourney(true),
    gradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-500/30',
    buttonColor: 'bg-green-500 hover:bg-green-600'
  }, {
    id: 'budgeting',
    title: 'Budgeting 101',
    description: 'Master the art of managing your money effectively',
    emoji: '💰',
    progress: getBudgetProgress(),
    onClick: () => setShowBudgetJourney(true),
    gradient: 'from-blue-50 to-green-50',
    borderColor: 'border-blue-500/30',
    buttonColor: 'bg-blue-500 hover:bg-blue-600'
  }, {
    id: 'credit',
    title: 'Building Credit',
    description: 'Build trust with your money and unlock financial opportunities',
    emoji: '🏆',
    progress: getCreditProgress(),
    onClick: () => setShowCreditJourney(true),
    gradient: 'from-green-50 to-blue-50',
    borderColor: 'border-green-500/30',
    buttonColor: 'bg-green-500 hover:bg-green-600'
  }, {
    id: 'taxes',
    title: 'Understanding Taxes',
    description: 'Learn how taxes work and how to file them correctly',
    emoji: '🎓',
    progress: getTaxesProgress(),
    onClick: () => setShowTaxesJourney(true),
    gradient: 'from-yellow-50 to-orange-50',
    borderColor: 'border-primary/30',
    buttonColor: 'bg-primary hover:bg-primary/90'
  }, {
    id: 'future-planning',
    title: 'Plan for Later, Start Now',
    description: 'Master future planning and build generational wealth',
    emoji: '🔮',
    progress: getFuturePlanningProgress(),
    onClick: () => setShowFuturePlanningJourney(true),
    gradient: 'from-indigo-50 to-purple-50',
    borderColor: 'border-indigo-500/30',
    buttonColor: 'bg-indigo-500 hover:bg-indigo-600'
  }, {
    id: 'big-purchases',
    title: 'How to Buy Big',
    description: 'Master smart shopping for cars, homes, and major purchases',
    emoji: '🚗',
    progress: getBigPurchasesProgress(),
    onClick: () => setShowBigPurchasesJourney(true),
    gradient: 'from-purple-50 to-blue-50',
    borderColor: 'border-purple-500/30',
    buttonColor: 'bg-purple-500 hover:bg-purple-600'
  }, {
    id: 'financial-safety',
    title: 'Money Armor',
    description: 'Protect yourself from financial risks, scams, and identity theft',
    emoji: '🛡️',
    progress: getFinancialSafetyProgress(),
    onClick: () => setShowFinancialSafetyJourney(true),
    gradient: 'from-purple-50 to-indigo-50',
    borderColor: 'border-purple-500/30',
    buttonColor: 'bg-purple-500 hover:bg-purple-600'
  }];
  return <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold tracking-tight journey-header text-center mb-8">Personal Wealth Creatio Essentials</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {journeys.map(journey => <Card key={journey.id} className={`cursor-pointer transition-all hover:shadow-lg ${journey.borderColor} ${journey.progress.completed ? 'border-2' : 'border'}`} onClick={journey.onClick}>
                            <CardHeader className={`bg-gradient-to-r ${journey.gradient} rounded-t-lg`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{journey.emoji}</span>
                                        <CardTitle className="text-lg">{journey.title}</CardTitle>
                                    </div>
                                    {journey.progress.completed && <Badge className="bg-green-500 text-white">
                                            <Trophy className="h-3 w-3 mr-1" />
                                            Complete
                                        </Badge>}
                                    {!journey.progress.completed && journey.progress.levelsCompleted > 0 && <Badge variant="outline">
                                            {journey.progress.levelsCompleted}/{journey.progress.totalLevels}
                                        </Badge>}
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                    {journey.description}
                                </p>
                                
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Progress</span>
                                        <span>{journey.progress.levelsCompleted}/{journey.progress.totalLevels} levels</span>
                                    </div>
                                    <Progress value={journey.progress.levelsCompleted / journey.progress.totalLevels * 100} className="h-2" />
                                </div>

                                {journey.progress.completed && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                            <span className="text-sm font-medium text-green-800">Journey Complete!</span>
                                        </div>
                                        <p className="text-xs text-green-700 mt-1">
                                            You've earned your achievement badge.
                                        </p>
                                    </div>}
                                
                                <Button className={`w-full ${journey.buttonColor}`} size="sm">
                                    <Play className="h-4 w-4 mr-2" />
                                    {journey.progress.levelsCompleted > 0 ? 'Continue Journey' : 'Start Journey'}
                                </Button>
                            </CardContent>
                        </Card>)}
                </div>
            </div>

            <PodcastRecommendationsSection />
        </div>;
};
export default PersonalFinanceTab;