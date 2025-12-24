
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import MarketIntelligenceTab from "@/components/learn/MarketIntelligenceTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import LearningDashboard from "@/components/learning/LearningDashboard";
import AdaptiveFlashcards from "@/components/learning/AdaptiveFlashcards";
import AdminTab from "@/components/admin/AdminTab";
import LearnTabTutorial from "@/components/onboarding/LearnTabTutorial";
import LearnTabHelpMenu from "@/components/learn/LearnTabHelpMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useOnboarding } from "@/hooks/useOnboarding";

const LearnPage = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('interactive-hub');
  const { learnTabTutorialCompleted, loading } = useOnboarding();
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Simplified admin check - will be replaced with proper system later
  const isAdmin = false;

  // Don't auto-show tutorial - let user trigger it manually
  // The tutorial is now completely optional

  const handleNavigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const handleRestartTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="adaptive-flashcards" className="mt-0">
          <AdaptiveFlashcards />
        </TabsContent>
        
        <TabsContent value="personal-finance" className="mt-6">
          <PersonalFinanceTab />
        </TabsContent>
        
        <TabsContent value="interactive-hub" className="mt-0">
          <LearningDashboard onNavigateToTab={handleNavigateToTab} />
        </TabsContent>
        
        <TabsContent value="companies" className="mt-6">
          <MarketIntelligenceTab />
        </TabsContent>
        
        <TabsContent value="careers" className="mt-6">
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
    </div>
  );
};

export default LearnPage;
