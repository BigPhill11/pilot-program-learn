
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import CompanyDiscoveryTab from "@/components/learn/CompanyDiscoveryTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import AdaptiveLearningContent from "@/components/learning/AdaptiveLearningContent";
import InteractiveLearningHub from "@/components/learning/InteractiveLearningHub";
import TermOfTheDay from "@/components/learn/TermOfTheDay";
import AdminTab from "@/components/admin/AdminTab";
import AdminModeToggle from "@/components/admin/AdminModeToggle";
import AdminNavigationPanel from "@/components/admin/AdminNavigationPanel";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdminModeProvider } from "@/contexts/AdminModeContext";

const LearnPage = () => {
  const isMobile = useIsMobile();
  const { isAdmin, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('adaptive');

  const handleNavigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <AdminModeProvider>
      <div className="container mx-auto px-4 py-8 relative">
        <AdminModeToggle />
        <AdminNavigationPanel onNavigateToTab={handleNavigateToTab} />
        
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
      </div>
    </AdminModeProvider>
  );
};

export default LearnPage;
