
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import CompanyDiscoveryTab from "@/components/learn/CompanyDiscoveryTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import AdaptiveLearningContent from "@/components/learning/AdaptiveLearningContent";
import TermOfTheDay from "@/components/learn/TermOfTheDay";
import { useIsMobile } from "@/hooks/use-mobile";

const LearnPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto px-4 py-8">
      <TermOfTheDay />
      
      <Tabs defaultValue="adaptive" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${isMobile ? 'h-auto' : ''}`}>
          <TabsTrigger value="adaptive" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Adaptive' : 'Adaptive Learning'}
          </TabsTrigger>
          <TabsTrigger value="personal-finance" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Personal' : 'Personal Finance'}
          </TabsTrigger>
          <TabsTrigger value="companies" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Companies' : 'Company Discovery'}
          </TabsTrigger>
          <TabsTrigger value="careers" className={isMobile ? 'text-xs py-3' : ''}>
            {isMobile ? 'Careers' : 'Careers in Finance'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="adaptive" className="mt-6">
          <AdaptiveLearningContent />
        </TabsContent>
        
        <TabsContent value="personal-finance" className="mt-6">
          <PersonalFinanceTab />
        </TabsContent>
        
        <TabsContent value="companies" className="mt-6">
          <CompanyDiscoveryTab />
        </TabsContent>
        
        <TabsContent value="careers" className="mt-6">
          <CareersInFinanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnPage;
