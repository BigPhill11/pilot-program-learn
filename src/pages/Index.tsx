
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee, Users, Building2, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Panda Networking</h1>
        <p className="text-xl text-muted-foreground mb-8">Your personal CRM for meaningful professional connections</p>
        <Button asChild size="lg">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Coffee className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h1 className="text-4xl font-bold mb-4">Panda Networking</h1>
        <p className="text-xl text-muted-foreground mb-8">Your personal CRM for meaningful professional connections</p>
        <Button asChild size="lg">
          <Link to="/auth">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
