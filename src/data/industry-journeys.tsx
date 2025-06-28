import React from 'react';
import { Brain, Building2, TrendingUp, Banknote, Shield, Stethoscope, Laptop, Car, Home, Wrench } from 'lucide-react';

export interface JourneyLevel {
  id: number;
  title: string;
  description: string;
  content: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  activity?: {
    type: string;
    title: string;
    description: string;
    steps: string[];
  };
  keyTakeaways: string[];
}

export interface IndustryJourneyData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  learningObjectives: string[];
  levels: JourneyLevel[];
}

export const industryJourneys: IndustryJourneyData[] = [
  {
    id: 'technology',
    title: 'Technology Sector Deep Dive',
    description: 'Explore the dynamic world of technology companies, from startups to tech giants.',
    icon: Laptop,
    color: 'from-blue-500 to-purple-600',
    estimatedTime: '45 minutes',
    difficulty: 'Intermediate',
    prerequisites: ['Basic understanding of business concepts', 'Familiarity with financial statements'],
    learningObjectives: [
      'Understand key technology sub-sectors and business models',
      'Learn how to evaluate tech companies and their growth potential',
      'Analyze major technology trends and their market impact'
    ],
    levels: [
      {
        id: 1,
        title: 'Tech Industry Overview',
        description: 'Get familiar with the technology sector landscape',
        content: 'The technology sector encompasses companies that develop, manufacture, and distribute technological goods and services...',
        keyTakeaways: ['Technology drives innovation', 'Multiple sub-sectors exist', 'High growth potential']
      }
    ]
  }
];
