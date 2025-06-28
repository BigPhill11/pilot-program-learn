
import React from 'react';
import InteractiveLearningHub from './InteractiveLearningHub';
import { useAuth } from '@/hooks/useAuth';

const AdaptiveLearningContent: React.FC = () => {
  const { profile } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Learning Hub</h1>
        <p className="text-muted-foreground">
          Content adapted for {profile?.app_version || 'your'} level learning
        </p>
      </div>

      <InteractiveLearningHub />
    </div>
  );
};

export default AdaptiveLearningContent;
