
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import CompanyDiscoveryTab from "@/components/learn/CompanyDiscoveryTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import AdaptiveLearningContent from "@/components/learning/AdaptiveLearningContent";
import InteractiveLearningHub from "@/components/learning/InteractiveLearningHub";
import TermOfTheDay from "@/components/learn/TermOfTheDay";
import AdminTab from "@/components/admin/AdminTab";
import LearnTabTutorial from "@/components/onboarding/LearnTabTutorial";
import LearnTabHelpMenu from "@/components/learn/LearnTabHelpMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useOnboarding } from "@/hooks/useOnboarding";

const LearnPage = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('adaptive');
  const { learnTabTutorialCompleted, loading } = useOnboarding();
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Simplified admin check - will be replaced with proper system later
  const isAdmin = false;

  useEffect(() => {
    if (!loading && !learnTabTutorialCompleted) {
      setShowTutorial(true);
    }
  }, [loading, learnTabTutorialCompleted]);

  const handleNavigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const handleRestartTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <TermOfTheDay />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isAdmin ? (isMobile ? 'grid-cols-3' : 'grid-cols-6') : (isMobile ? 'grid-cols-3' : 'grid-cols-5')} ${isMobile ? 'h-auto' : ''}`}>
          <TabsTrigger value="adaptive" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Adaptive' : 'Adaptive Learning'}
          </TabsTrigger>
          <TabsTrigger value="personal-finance" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Personal' : 'Personal Finance'}
          </TabsTrigger>
          <TabsTrigger value="interactive-hub" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Games' : 'Interactive Hub'}
          </TabsTrigger>
          <TabsTrigger value="companies" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Companies' : 'Company Discovery'}
          </TabsTrigger>
          <TabsTrigger value="careers" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Careers' : 'Careers in Finance'}
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="admin" className={isMobile ? 'text-xs py-3' : ''}>
              {isMobile ? 'Admin' : 'Admin Panel'}
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="adaptive" className="mt-6">
          <AdaptiveLearningContent onNavigateToTab={handleNavigateToTab} />
        </TabsContent>
        
        <TabsContent value="personal-finance" className="mt-6">
          <PersonalFinanceTab />
        </TabsContent>
        
        <TabsContent value="interactive-hub" className="mt-6">
          <InteractiveLearningHub />
        </TabsContent>
        
        <TabsContent value="companies" className="mt-6">
          <CompanyDiscoveryTab />
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
  );
};

export default LearnPage;
