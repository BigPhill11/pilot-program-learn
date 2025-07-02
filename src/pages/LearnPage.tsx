
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import CompanyDiscoveryTab from "@/components/learn/CompanyDiscoveryTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import AdaptiveLearningContent from "@/components/learning/AdaptiveLearningContent";
import TermOfTheDay from "@/components/learn/TermOfTheDay";
import AdminTab from "@/components/admin/AdminTab";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useIsMobile } from "@/hooks/use-mobile";

const LearnPage = () => {
  const isMobile = useIsMobile();
  const { isAdmin, loading } = useAdminAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <TermOfTheDay />
      
      <Tabs defaultValue="adaptive" className="w-full">
        <TabsList className={`grid w-full ${isAdmin ? (isMobile ? 'grid-cols-3' : 'grid-cols-5') : (isMobile ? 'grid-cols-2' : 'grid-cols-4')} ${isMobile ? 'h-auto' : ''}`}>
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
          {isAdmin && (
            <TabsTrigger value="admin" className={isMobile ? 'text-xs py-3' : ''}>
              {isMobile ? 'Admin' : 'Admin Panel'}
            </TabsTrigger>
          )}
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
        
        {isAdmin && (
          <TabsContent value="admin" className="mt-6">
            <AdminTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default LearnPage;
