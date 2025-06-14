
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const LearnPage = () => {
  const learningTopics = [
    { title: "What is a Stock?", description: "Understand the basics of stocks and ownership.", icon: <BookOpen className="h-6 w-6 text-primary" /> },
    { title: "Understanding Bonds", description: "Learn how bonds work and their role in a portfolio.", icon: <BookOpen className="h-6 w-6 text-primary" /> },
    { title: "Introduction to ETFs", description: "Discover Exchange Traded Funds.", icon: <BookOpen className="h-6 w-6 text-primary" /> },
    { title: "Basics of Budgeting", description: "Essential skills for managing your money.", icon: <BookOpen className="h-6 w-6 text-primary" /> },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Learn About Finance</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Expand your financial knowledge with our curated learning modules.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {learningTopics.map((topic, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                {topic.icon}
                <CardTitle>{topic.title}</CardTitle>
              </div>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button asChild size="lg">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default LearnPage;

