
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Module } from '@/types/interview-module';

interface LockedModuleProps {
  module: Module;
}

const LockedModule: React.FC<LockedModuleProps> = ({ module }) => {
  return (
    <Card className="opacity-60">
      <CardContent className="p-6 text-center">
        <div className="text-gray-400 mb-2">🔒</div>
        <h3 className="font-semibold text-gray-600 mb-2">{module.title}</h3>
        <p className="text-gray-500">Complete previous modules to unlock</p>
      </CardContent>
    </Card>
  );
};

export default LockedModule;
