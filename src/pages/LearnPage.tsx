
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroSection from '@/components/landing/HeroSection';
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import CompanyDiscoveryTab from "@/components/learn/CompanyDiscoveryTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import LearningDashboard from "@/components/learning/LearningDashboard";
import AdaptiveLearning from "@/components/learning/AdaptiveLearning";
import TermOfTheDay from "@/components/learn/TermOfTheDay";
import AdminTab from "@/components/admin/AdminTab";
import LearnTabTutorial from "@/components/onboarding/LearnTabTutorial";
import LearnTabHelpMenu from "@/components/learn/LearnTabHelpMenu";
import { GamifiedFlashcardHub } from "@/components/learning/flashcards/GamifiedFlashcardHub";
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
      <HeroSection onStartTutorial={() => setShowTutorial(true)} />
      
      <div className="container mx-auto px-4 py-8">
        <TermOfTheDay />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isAdmin ? (isMobile ? 'grid-cols-3' : 'grid-cols-7') : (isMobile ? 'grid-cols-3' : 'grid-cols-6')} ${isMobile ? 'h-auto' : ''}`}>
          <TabsTrigger value="adaptive" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Adaptive' : 'Adaptive Learning'}
          </TabsTrigger>
          <TabsTrigger value="flashcards" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Cards' : 'Flashcards'}
          </TabsTrigger>
          <TabsTrigger value="personal-finance" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Personal' : 'Personal Finance'}
          </TabsTrigger>
          <TabsTrigger value="interactive-hub" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Dashboard' : 'Learning Dashboard'}
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
          <AdaptiveLearning />
        </TabsContent>
        
        <TabsContent value="flashcards" className="mt-6">
          <GamifiedFlashcardHub />
        </TabsContent>
        
        <TabsContent value="personal-finance" className="mt-6">
          <PersonalFinanceTab />
        </TabsContent>
        
        <TabsContent value="interactive-hub" className="mt-6">
          <LearningDashboard onNavigateToTab={handleNavigateToTab} />
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
    </div>
  );
};

export default LearnPage;
