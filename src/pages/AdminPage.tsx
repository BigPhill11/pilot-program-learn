
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Video, Settings } from 'lucide-react';
import FinancialTermsManager from '@/components/admin/FinancialTermsManager';
import VideoManager from '@/components/admin/VideoManager';

const AdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage financial terms and video submissions</p>
      </div>

      <Tabs defaultValue="financial-terms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="financial-terms" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Financial Terms
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video Management
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial-terms" className="mt-6">
          <FinancialTermsManager />
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          <VideoManager />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Additional admin settings will be added here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
