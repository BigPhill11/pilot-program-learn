
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import CompanyDiscoveryTab from "@/components/learn/CompanyDiscoveryTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import AdaptiveLearningContent from "@/components/learning/AdaptiveLearningContent";
import TermOfTheDay from "@/components/learn/TermOfTheDay";

const LearnPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <TermOfTheDay />
      
      <Tabs defaultValue="adaptive" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="adaptive">Adaptive Learning</TabsTrigger>
          <TabsTrigger value="personal-finance">Personal Finance</TabsTrigger>
          <TabsTrigger value="companies">Company Discovery</TabsTrigger>
          <TabsTrigger value="careers">Careers in Finance</TabsTrigger>
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
