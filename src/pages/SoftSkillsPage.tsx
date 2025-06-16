
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, MessageSquare, Shirt, Handshake, Star, Play, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const SoftSkillsPage = () => {
  const { user } = useAuth();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['soft-skills-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('soft_skills_courses')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: userProgress } = useQuery({
    queryKey: ['user-soft-skills-progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_soft_skills_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const categoryIcons = {
    interviewing: MessageSquare,
    networking: Users,
    professional_communication: MessageSquare,
    business_attire: Shirt,
    workplace_etiquette: Handshake
  };

  const categoryColors = {
    interviewing: 'bg-blue-500',
    networking: 'bg-green-500',
    professional_communication: 'bg-purple-500',
    business_attire: 'bg-orange-500',
    workplace_etiquette: 'bg-pink-500'
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCourseProgress = (courseId: string) => {
    if (!userProgress) return 0;
    const courseProgress = userProgress.filter(p => p.course_id === courseId);
    return courseProgress.length > 0 ? (courseProgress.filter(p => p.completed).length / courseProgress.length) * 100 : 0;
  };

  const groupedCourses = courses?.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, any[]>) || {};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Soft Skills Development</h1>
        <p className="text-muted-foreground">
          Master essential professional skills for career success. From interviewing to networking, 
          develop the soft skills that complement your financial knowledge.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
          <TabsTrigger value="professional_communication">Communication</TabsTrigger>
          <TabsTrigger value="business_attire">Business Attire</TabsTrigger>
          <TabsTrigger value="workplace_etiquette">Etiquette</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => {
              const IconComponent = categoryIcons[course.category as keyof typeof categoryIcons];
              const progress = getCourseProgress(course.id);
              
              return (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${categoryColors[course.category as keyof typeof categoryColors]} text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <Badge className={getDifficultyColor(course.difficulty_level)}>
                        {course.difficulty_level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.estimated_duration} mins</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{progress > 0 ? `${progress.toFixed(0)}%` : 'Not started'}</span>
                      </div>
                    </div>
                    
                    {progress > 0 && (
                      <Progress value={progress} className="h-2" />
                    )}
                    
                    <Button className="w-full" variant={progress > 0 ? "outline" : "default"}>
                      <div className="flex items-center space-x-2">
                        {progress > 0 ? <BookOpen className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        <span>{progress > 0 ? 'Continue Course' : 'Start Course'}</span>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {Object.entries(groupedCourses).map(([category, categoryCourses]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryCourses.map((course) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                const progress = getCourseProgress(course.id);
                
                return (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`p-2 rounded-lg ${categoryColors[category as keyof typeof categoryColors]} text-white`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <Badge className={getDifficultyColor(course.difficulty_level)}>
                          {course.difficulty_level}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.estimated_duration} mins</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{progress > 0 ? `${progress.toFixed(0)}%` : 'Not started'}</span>
                        </div>
                      </div>
                      
                      {progress > 0 && (
                        <Progress value={progress} className="h-2" />
                      )}
                      
                      <Button className="w-full" variant={progress > 0 ? "outline" : "default"}>
                        <div className="flex items-center space-x-2">
                          {progress > 0 ? <BookOpen className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          <span>{progress > 0 ? 'Continue Course' : 'Start Course'}</span>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SoftSkillsPage;
