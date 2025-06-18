
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, User, GraduationCap, Building, Lock, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PandaLogo from '@/components/icons/PandaLogo';
import type { FinanceCareerData } from '@/data/finance-careers';

interface FinanceCareerJourneyProps {
  career: FinanceCareerData;
  onBack: () => void;
}

const FinanceCareerJourney: React.FC<FinanceCareerJourneyProps> = ({ career, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);

  const getSpeakerIcon = (speaker: string) => {
    switch (speaker) {
      case 'intern':
        return <User className="h-4 w-4" />;
      case 'professional':
        return <Building className="h-4 w-4" />;
      case 'professor':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case 'intern':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'professional':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'professor':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Careers
      </Button>
      
      <header className="text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <PandaLogo className="h-12 w-12" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{career.name}</h2>
            <p className="text-lg text-muted-foreground">Journey to expertise with Phil!</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="journey">Learning Journey</TabsTrigger>
          <TabsTrigger value="videos">Career Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="journey" className="space-y-6">
          {/* Duolingo-style path */}
          <div className="relative">
            {/* Path line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-muted h-full"></div>
            
            <div className="space-y-8">
              {career.levels.map((level, index) => {
                const isCompleted = level.level < currentLevel;
                const isCurrent = level.level === currentLevel;
                const isLocked = level.level > currentLevel;
                
                return (
                  <div key={level.level} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Level node */}
                    <div className="flex-shrink-0 w-1/2 flex justify-center">
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all ${
                        isCompleted ? 'bg-green-500 border-green-500 text-white' :
                        isCurrent ? 'bg-primary border-primary text-white animate-pulse' :
                        'bg-muted border-muted-foreground text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-8 w-8" />
                        ) : isLocked ? (
                          <Lock className="h-6 w-6" />
                        ) : (
                          <span className="font-bold text-lg">{level.level}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Level content */}
                    <div className="flex-1 px-6">
                      <Card className={`transition-all ${
                        isCurrent ? 'border-primary border-2 shadow-lg' :
                        isCompleted ? 'border-green-200 bg-green-50' :
                        'border-muted opacity-60'
                      }`}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            Level {level.level}: {level.focusArea}
                            <PandaLogo className="h-6 w-6" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {level.sampleTopics.map((topic, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  isCompleted ? 'bg-green-500' : 
                                  isCurrent ? 'bg-primary' : 
                                  'bg-muted-foreground'
                                }`}></div>
                                <span className="text-sm">{topic}</span>
                              </div>
                            ))}
                          </div>
                          <Button 
                            className="w-full mt-4" 
                            disabled={isLocked}
                            variant={isCurrent ? "default" : isCompleted ? "secondary" : "ghost"}
                            onClick={() => {
                              if (isCurrent && currentLevel < 7) {
                                setCurrentLevel(currentLevel + 1);
                              }
                            }}
                          >
                            {isCompleted ? "Completed ✓" : 
                             isCurrent ? "Start Lesson" : 
                             "Locked"}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Phil's encouragement */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <PandaLogo className="h-12 w-12" />
                <div>
                  <h3 className="font-semibold text-green-800">Phil's Tip</h3>
                  <p className="text-green-700">
                    {currentLevel === 1 ? "Welcome to your finance career journey! Let's start with the basics." :
                     currentLevel <= 3 ? "Great progress! You're building a solid foundation." :
                     currentLevel <= 5 ? "You're getting into the advanced stuff now. Keep going!" :
                     "Almost there! You're becoming a finance expert!"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {career.videos.map((video) => (
              <Card key={video.id} className={`transition-all hover:shadow-lg cursor-pointer ${getSpeakerColor(video.speaker)}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getSpeakerIcon(video.speaker)}
                    {video.speaker.charAt(0).toUpperCase() + video.speaker.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="h-12 w-12 text-gray-500" />
                  </div>
                  <h4 className="font-semibold mb-2">{video.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                  <span className="text-xs font-medium">Duration: {video.duration}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <PandaLogo className="h-12 w-12" />
                <div>
                  <h3 className="font-semibold text-blue-800">Learn from the Best</h3>
                  <p className="text-blue-700">
                    Get insights from three different perspectives: current interns sharing their fresh experiences, 
                    seasoned professionals with real-world expertise, and professors with deep theoretical knowledge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceCareerJourney;
