import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, CheckCircle, Clock, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import NetworkingModule1 from './networking/NetworkingModule1';
import NetworkingModule2 from './networking/NetworkingModule2';
import NetworkingModule3 from './networking/NetworkingModule3';
import NetworkingModule4 from './networking/NetworkingModule4';
import NetworkingModule5 from './networking/NetworkingModule5';
import NetworkingModule6 from './networking/NetworkingModule6';

interface NetworkingLikeProProps {
  onBack: () => void;
}

const NetworkingLikePro: React.FC<NetworkingLikeProProps> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());

  const modules = [
    { id: 1, title: 'Networking Fundamentals', duration: '15 min', component: NetworkingModule1 },
    { id: 2, title: 'Building Your Personal Brand', duration: '20 min', component: NetworkingModule2 },
    { id: 3, title: 'Strategic Relationship Building', duration: '25 min', component: NetworkingModule3 },
    { id: 4, title: 'Digital Networking Mastery', duration: '20 min', component: NetworkingModule4 },
    { id: 5, title: 'Event Networking Strategies', duration: '25 min', component: NetworkingModule5 },
    { id: 6, title: 'Long-term Relationship Management', duration: '20 min', component: NetworkingModule6 }
  ];

  const handleModuleComplete = (moduleId: number) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
  };

  const handleBackToOverview = () => {
    setActiveModule(null);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Users className="h-8 w-8 text-primary" />
            <span>Networking Like a Pro</span>
          </h1>
          <p className="text-muted-foreground">
            Master the art of professional networking and build meaningful relationships
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Course Progress</span>
            <span className="text-sm font-normal">{completedModules.size}/{modules.length} modules completed</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {progress === 100 ? 'Congratulations! Course completed.' : `${progress.toFixed(0)}% complete`}
          </p>
        </CardContent>
      </Card>

      {/* Course Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Learning Objectives</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Understand networking fundamentals and mindset</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Build and maintain your personal brand</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Develop strategic relationship building skills</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Master digital networking platforms</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Excel at networking events and conferences</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Maintain long-term professional relationships</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Course Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Total Duration</p>
              <p className="text-2xl font-bold text-primary">2 hours</p>
            </div>
            <div>
              <p className="text-sm font-medium">Difficulty Level</p>
              <p className="text-lg">Intermediate</p>
            </div>
            <div>
              <p className="text-sm font-medium">Course Format</p>
              <p className="text-sm text-muted-foreground">
                Interactive modules with practical exercises, quizzes, and real-world scenarios
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Course Modules</h2>
        <div className="grid gap-4">
          {modules.map((module, index) => (
            <Card key={module.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      completedModules.has(module.id) 
                        ? 'bg-green-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {completedModules.has(module.id) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{module.duration}</span>
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setActiveModule(module.id)}
                    variant={completedModules.has(module.id) ? "outline" : "default"}
                    size="sm"
                  >
                    {completedModules.has(module.id) ? 'Review' : 'Start'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkingLikePro;