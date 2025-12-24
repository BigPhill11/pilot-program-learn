import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import MarketIntelligenceTab from "@/components/learn/MarketIntelligenceTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import LearningDashboard from "@/components/learning/LearningDashboard";
import AdaptiveFlashcards from "@/components/learning/AdaptiveFlashcards";
import AdminTab from "@/components/admin/AdminTab";
import LearnTabTutorial from "@/components/onboarding/LearnTabTutorial";
import LearnTabHelpMenu from "@/components/learn/LearnTabHelpMenu";
import { MobileTabNav } from "@/components/ui/mobile-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useOnboarding } from "@/hooks/useOnboarding";
import { 
  LayoutDashboard, 
  BookOpen, 
  Wallet, 
  TrendingUp, 
  Briefcase,
  Layers
} from 'lucide-react';

const LearnPage = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('interactive-hub');
  const { learnTabTutorialCompleted, loading } = useOnboarding();
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Simplified admin check - will be replaced with proper system later
  const isAdmin = false;

  const handleNavigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const handleRestartTutorial = () => {
    setShowTutorial(true);
  };

  // Mobile navigation items
  const mobileNavItems = [
    { value: 'interactive-hub', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { value: 'adaptive-flashcards', label: 'Flashcards', icon: <Layers className="h-5 w-5" /> },
    { value: 'personal-finance', label: 'Finance', icon: <Wallet className="h-5 w-5" /> },
    { value: 'companies', label: 'Markets', icon: <TrendingUp className="h-5 w-5" /> },
    { value: 'careers', label: 'Careers', icon: <Briefcase className="h-5 w-5" /> },
  ];

  return (
    <div className="relative">
      <div className={`container mx-auto px-4 sm:px-6 ${isMobile ? 'pb-24' : 'py-8'}`}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Tab Navigation */}
          {!isMobile && (
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="interactive-hub" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="adaptive-flashcards" className="gap-2">
                <Layers className="h-4 w-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="personal-finance" className="gap-2">
                <Wallet className="h-4 w-4" />
                Personal Finance
              </TabsTrigger>
              <TabsTrigger value="companies" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Markets
              </TabsTrigger>
              <TabsTrigger value="careers" className="gap-2">
                <Briefcase className="h-4 w-4" />
                Careers
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="adaptive-flashcards" className="mt-0">
            <AdaptiveFlashcards />
          </TabsContent>
          
          <TabsContent value="personal-finance" className={isMobile ? "mt-2" : "mt-6"}>
            <PersonalFinanceTab />
          </TabsContent>
          
          <TabsContent value="interactive-hub" className="mt-0">
            <LearningDashboard onNavigateToTab={handleNavigateToTab} />
          </TabsContent>
          
          <TabsContent value="companies" className={isMobile ? "mt-2" : "mt-6"}>
            <MarketIntelligenceTab />
          </TabsContent>
          
          <TabsContent value="careers" className={isMobile ? "mt-2" : "mt-6"}>
            <CareersInFinanceTab />
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="admin" className="mt-6">
              <AdminTab />
            </TabsContent>
          )}
        </Tabs>
        
        {/* Learn Tab Tutorial */}
        <LearnTabTutorial open={showTutorial} onClose={() => setShowTutorial(false)} />
        
        {/* Help Menu */}
        {learnTabTutorialCompleted && <LearnTabHelpMenu onRestartTutorial={handleRestartTutorial} />}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileTabNav 
        items={mobileNavItems}
        activeValue={activeTab}
        onValueChange={setActiveTab}
      />
    </div>
  );
};

export default LearnPage;
