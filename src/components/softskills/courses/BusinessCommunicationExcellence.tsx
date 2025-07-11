import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageSquare, CheckCircle, Clock, Target, Lock, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import CommunicationModule1 from './communication/CommunicationModule1';
import CommunicationModule2 from './communication/CommunicationModule2';
import CommunicationModule3 from './communication/CommunicationModule3';
import CommunicationModule4 from './communication/CommunicationModule4';
import CommunicationModule5 from './communication/CommunicationModule5';
import CommunicationModule6 from './communication/CommunicationModule6';

interface BusinessCommunicationExcellenceProps {
  onBack: () => void;
}

const BusinessCommunicationExcellence: React.FC<BusinessCommunicationExcellenceProps> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());

  const modules = [
    { 
      id: 1, 
      title: 'Communication Foundations', 
      subtitle: 'Building blocks of effective professional communication',
      duration: '15 min', 
      component: CommunicationModule1,
      keyTopics: ['Active listening', 'Clear messaging', 'Communication styles', '+2 more'],
      description: 'Master the fundamentals of clear, professional communication'
    },
    { 
      id: 2, 
      title: 'Written Communication Mastery', 
      subtitle: 'Crafting professional emails, reports, and documents',
      duration: '20 min', 
      component: CommunicationModule2,
      keyTopics: ['Email etiquette', 'Report writing', 'Document structure', '+2 more'],
      description: 'Excel at written communication across all business contexts'
    },
    { 
      id: 3, 
      title: 'Verbal Communication Skills', 
      subtitle: 'Speaking with confidence and clarity',
      duration: '25 min', 
      component: CommunicationModule3,
      keyTopics: ['Voice projection', 'Articulation', 'Conversation flow', '+2 more'],
      description: 'Develop powerful verbal communication and speaking skills'
    },
    { 
      id: 4, 
      title: 'Presentation Excellence', 
      subtitle: 'Delivering impactful presentations and pitches',
      duration: '25 min', 
      component: CommunicationModule4,
      keyTopics: ['Slide design', 'Storytelling', 'Audience engagement', '+2 more'],
      description: 'Create and deliver presentations that captivate and persuade'
    },
    { 
      id: 5, 
      title: 'Difficult Conversations', 
      subtitle: 'Navigating challenging communications with grace',
      duration: '20 min', 
      component: CommunicationModule5,
      keyTopics: ['Conflict resolution', 'Feedback delivery', 'Emotional intelligence', '+2 more'],
      description: 'Handle difficult conversations and conflicts professionally'
    },
    { 
      id: 6, 
      title: 'Digital Communication', 
      subtitle: 'Mastering modern communication channels',
      duration: '20 min', 
      component: CommunicationModule6,
      keyTopics: ['Video conferencing', 'Instant messaging', 'Digital etiquette', '+2 more'],
      description: 'Excel in the digital communication landscape'
    }
  ];

  const handleModuleComplete = (moduleId: number) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
  };

  const handleBackToOverview = () => {
    setActiveModule(null);
  };

  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true;
    return completedModules.has(moduleId - 1);
  };

  const progress = (completedModules.size / modules.length) * 100;

  if (activeModule) {
    const module = modules.find(m => m.id === activeModule);
    if (module) {
      const ModuleComponent = module.component;
      return (
        <ModuleComponent 
          onBack={handleBackToOverview}
          onComplete={() => handleModuleComplete(activeModule)}
          isCompleted={completedModules.has(activeModule)}
        />
      );
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            <span>Business Communication Excellence</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Master professional communication skills for career success
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span>Your Communication Journey Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{completedModules.size}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{Math.round(progress)}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{modules.length - completedModules.size}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground mb-2">
            {completedModules.size}/{modules.length} modules
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Course Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
        <p className="text-muted-foreground mb-6">
          Welcome to Business Communication Excellence! This comprehensive course will transform your 
          communication skills across all professional contexts, from emails to presentations.
        </p>
        <p className="text-muted-foreground mb-6">
          Through 6 interactive modules, you'll master written, verbal, and digital communication techniques. 
          Each module includes engaging exercises, real-world scenarios, and practical frameworks to elevate 
          your professional communication.
        </p>
        
        <Card className="bg-purple-50 border-purple-200 border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-purple-800 mb-2">🎯 What You'll Master:</h3>
                <ul className="space-y-1 text-purple-700">
                  <li>• Build unshakeable communication confidence and clarity</li>
                  <li>• Master professional written communication across all formats</li>
                  <li>• Develop powerful verbal communication and speaking skills</li>
                  <li>• Create and deliver presentations that captivate audiences</li>
                  <li>• Navigate difficult conversations with emotional intelligence</li>
                  <li>• Excel in modern digital communication environments</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module, index) => {
          const isUnlocked = isModuleUnlocked(module.id);
          const isCompleted = completedModules.has(module.id);
          
          return (
            <Card 
              key={module.id} 
              className={`hover:shadow-lg transition-all duration-200 ${
                !isUnlocked ? 'opacity-60' : 'hover:scale-105'
              } ${isCompleted ? 'border-green-200 bg-green-50' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isUnlocked 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-300 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : !isUnlocked ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <span className="font-semibold">{module.id}</span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="text-sm">{module.subtitle}</CardDescription>
                    </div>
                  </div>
                  {!isUnlocked && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{module.description}</p>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.keyTopics.map((topic, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{module.duration}</span>
                  </div>
                  
                  <Button 
                    onClick={() => isUnlocked && setActiveModule(module.id)}
                    disabled={!isUnlocked}
                    variant={isCompleted ? "outline" : "default"}
                    size="sm"
                    className={`${!isUnlocked ? 'cursor-not-allowed' : ''}`}
                  >
                    {!isUnlocked ? (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        Locked
                      </>
                    ) : isCompleted ? (
                      'Review'
                    ) : (
                      <>
                        <Play className="h-3 w-3 mr-1" />
                        Start Module
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessCommunicationExcellence;