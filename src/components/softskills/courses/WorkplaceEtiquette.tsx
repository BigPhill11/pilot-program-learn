import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Target, Award, Building, Coffee, Calendar, Mail, Phone, Star } from 'lucide-react';

const WorkplaceEtiquette = () => {
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  const modules = [
    {
      id: 1,
      title: 'Office Environment Basics',
      description: 'Master fundamental workplace behaviors and professional courtesies',
      icon: Building,
      estimatedTime: '20 minutes',
      keyTopics: ['Personal space', 'Noise management', 'Shared spaces', 'Office supplies'],
      isCompleted: completedModules.includes(1),
      isUnlocked: true
    },
    {
      id: 2,
      title: 'Communication Etiquette',
      description: 'Learn proper email, phone, and in-person communication protocols',
      icon: Mail,
      estimatedTime: '30 minutes',
      keyTopics: ['Email etiquette', 'Phone manners', 'Meeting protocols', 'Message timing'],
      isCompleted: completedModules.includes(2),
      isUnlocked: completedModules.includes(1)
    },
    {
      id: 3,
      title: 'Meeting & Calendar Management',
      description: 'Navigate meetings, scheduling, and time management professionally',
      icon: Calendar,
      estimatedTime: '25 minutes',
      keyTopics: ['Meeting punctuality', 'Calendar etiquette', 'Agenda management', 'Follow-up protocols'],
      isCompleted: completedModules.includes(3),
      isUnlocked: completedModules.includes(2)
    },
    {
      id: 4,
      title: 'Social & Networking Etiquette',
      description: 'Excel at office social events, lunch meetings, and professional networking',
      icon: Coffee,
      estimatedTime: '35 minutes',
      keyTopics: ['Office parties', 'Lunch etiquette', 'Networking events', 'Social boundaries'],
      isCompleted: completedModules.includes(4),
      isUnlocked: completedModules.includes(3)
    },
    {
      id: 5,
      title: 'Digital & Remote Work Etiquette',
      description: 'Master virtual meeting etiquette and digital communication standards',
      icon: Phone,
      estimatedTime: '25 minutes',
      keyTopics: ['Video call etiquette', 'Digital collaboration', 'Remote communication', 'Online presence'],
      isCompleted: completedModules.includes(5),
      isUnlocked: completedModules.includes(4)
    },
    {
      id: 6,
      title: 'Cultural Sensitivity & Inclusivity',
      description: 'Create an inclusive workplace through cultural awareness and sensitivity',
      icon: Star,
      estimatedTime: '30 minutes',
      keyTopics: ['Cultural awareness', 'Inclusive language', 'Holiday considerations', 'Diversity respect'],
      isCompleted: completedModules.includes(6),
      isUnlocked: completedModules.includes(5)
    }
  ];

  const handleModuleComplete = (moduleId: number) => {
    setCompletedModules(prev => [...prev, moduleId]);
    setTotalTimeSpent(prev => prev + 25); // Assume 25 minutes per module
    setCurrentModule(null);
  };

  const handleStartModule = (moduleId: number) => {
    setCurrentModule(moduleId);
  };

  const handleBackToOverview = () => {
    setCurrentModule(null);
  };

  const overallProgress = (completedModules.length / modules.length) * 100;

  // For now, render placeholder content for modules until individual components are created
  if (currentModule) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button onClick={handleBackToOverview} variant="outline">
            ← Back to Course Overview
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Module {currentModule}: {modules[currentModule - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                {modules[currentModule - 1].description}
              </p>
              
              <div>
                <h3 className="font-semibold mb-3">Learning Objectives:</h3>
                <ul className="space-y-2">
                  {modules[currentModule - 1].keyTopics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-accent p-4 rounded-lg">
                <p className="text-center text-muted-foreground">
                  Module content is being developed. This will include interactive lessons,
                  practical exercises, and etiquette assessments.
                </p>
              </div>
              
              <Button 
                onClick={() => handleModuleComplete(currentModule)}
                className="w-full"
              >
                Mark as Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Course Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Workplace Etiquette</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master professional etiquette and social skills to thrive in any workplace environment
        </p>
        
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>2.5-3 hours total</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>6 Essential Modules</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Professional Etiquette</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Completion</span>
              <span className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{completedModules.length} of {modules.length} modules completed</span>
              <span>{totalTimeSpent} minutes spent learning</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className={`transition-all duration-200 ${
              module.isUnlocked 
                ? 'hover:shadow-lg cursor-pointer border-border' 
                : 'opacity-50 cursor-not-allowed border-muted'
            } ${module.isCompleted ? 'bg-accent/20 border-primary' : ''}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    module.isCompleted 
                      ? 'bg-primary text-primary-foreground' 
                      : module.isUnlocked 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    <module.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs text-muted-foreground">{module.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {module.isCompleted && (
                    <Badge variant="default" className="text-xs">
                      Completed
                    </Badge>
                  )}
                  {!module.isUnlocked && (
                    <Badge variant="secondary" className="text-xs">
                      Locked
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{module.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {module.keyTopics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleStartModule(module.id)}
                  disabled={!module.isUnlocked}
                  className="w-full"
                  variant={module.isCompleted ? "outline" : "default"}
                >
                  {module.isCompleted ? 'Review Module' : 'Start Module'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkplaceEtiquette;