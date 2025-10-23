import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PageNavigationTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentTab = location.pathname === '/learn' ? 'learn' : 'home';
  
  const handleTabChange = (value: string) => {
    if (value === 'home') {
      navigate('/');
    } else if (value === 'learn') {
      navigate('/learn');
    }
  };
  
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="h-12 w-full md:w-auto bg-transparent border-0">
            <TabsTrigger 
              value="home" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
            >
              Home
            </TabsTrigger>
            <TabsTrigger 
              value="learn" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
            >
              Learn
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default PageNavigationTabs;
