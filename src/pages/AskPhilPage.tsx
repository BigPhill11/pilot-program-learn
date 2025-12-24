
import React from 'react';
import PhilChatAssistant from '@/components/ai/PhilChatAssistant';

const AskPhilPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen pb-24">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Ask Phil</h1>
        <p className="text-muted-foreground">
          Get personalized financial advice from your friendly AI assistant
        </p>
      </div>

      <PhilChatAssistant />
    </div>
  );
};

export default AskPhilPage;
