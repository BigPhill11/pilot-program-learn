
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, MessageSquare, Shirt, Handshake, Star, Play, BookOpen, Lightbulb, PlayCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import CourseDetailView from '@/components/softskills/CourseDetailView';

const SoftSkillsPage = () => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

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

  const { data: moduleProgress } = useQuery({
    queryKey: ['module-progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_type', 'soft_skills');
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // If a course is selected, show the detail view
  if (selectedCourse) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CourseDetailView 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)}
        />
      </div>
    );
  }

  const categoryIcons = {
    interviewing: MessageSquare,
    networking: Users,
    professional_communication: MessageSquare,
    business_attire: Shirt,
    workplace_etiquette: Handshake,
    diversity_inclusion: Lightbulb
  };

  const categoryColors = {
    interviewing: 'bg-blue-500',
    networking: 'bg-green-500',
    professional_communication: 'bg-purple-500',
    business_attire: 'bg-orange-500',
    workplace_etiquette: 'bg-pink-500',
    diversity_inclusion: 'bg-indigo-500'
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
    if (!moduleProgress) return { progress: 0, hasStarted: false };
    
    // Map course IDs to their modules
    const courseModuleMap: Record<string, string[]> = {
      'working_women': ['module_1', 'module_2', 'module_3', 'module_4', 'module_5', 'module_6'],
      'professional_interviewing': ['module_1', 'module_2', 'module_3', 'module_4', 'module_5', 'module_6'],
      'networking': ['module_1', 'module_2', 'module_3', 'module_4', 'module_5', 'module_6'],
      'business_communication': ['module_1', 'module_2', 'module_3', 'module_4', 'module_5', 'module_6'],
      'black_business': ['module_1', 'module_2', 'module_3', 'module_4', 'module_5', 'module_6'],
    };
    
    // Get the course key from the course title
    let courseKey = '';
    if (courseId.includes('working-women') || courseId.includes('Working Women')) courseKey = 'working_women';
    else if (courseId.includes('interviewing') || courseId.includes('Professional Interviewing')) courseKey = 'professional_interviewing';
    else if (courseId.includes('networking') || courseId.includes('Networking')) courseKey = 'networking';
    else if (courseId.includes('communication') || courseId.includes('Business Communication')) courseKey = 'business_communication';
    else if (courseId.includes('black') || courseId.includes('Black in Business')) courseKey = 'black_business';
    
    const modules = courseModuleMap[courseKey] || [];
    if (modules.length === 0) return { progress: 0, hasStarted: false };
    
    const courseProgress = moduleProgress.filter(p => 
      p.course_id === courseKey && modules.includes(p.module_id)
    );
    
    if (courseProgress.length === 0) return { progress: 0, hasStarted: false };
    
    const hasStarted = courseProgress.some(p => p.progress_percentage > 0);
    const totalProgress = courseProgress.reduce((sum, p) => sum + p.progress_percentage, 0);
    const averageProgress = totalProgress / modules.length;
    
    return { progress: averageProgress, hasStarted };
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

  const CourseCard = ({ course }: { course: any }) => {
    const IconComponent = categoryIcons[course.category as keyof typeof categoryIcons];
    const { progress, hasStarted } = getCourseProgress(course.id);
    const isCompleted = progress >= 100;
    
    return (
      <Card key={course.id} className={`hover:shadow-lg transition-shadow ${
        isCompleted ? 'border-green-200 bg-green-50' : hasStarted ? 'border-blue-200 bg-blue-50' : ''
      }`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className={`p-2 rounded-lg ${
              isCompleted 
                ? 'bg-green-500 text-white' 
                : hasStarted 
                  ? 'bg-blue-500 text-white'
                  : `${categoryColors[course.category as keyof typeof categoryColors]} text-white`
            }`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge className={getDifficultyColor(course.difficulty_level)}>
                {course.difficulty_level}
              </Badge>
              {isCompleted && (
                <Badge className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              )}
              {hasStarted && !isCompleted && (
                <Badge className="bg-blue-100 text-blue-800">
                  In Progress
                </Badge>
              )}
            </div>
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
              <span>{hasStarted ? `${Math.round(progress)}%` : 'Not started'}</span>
            </div>
          </div>
          
          {hasStarted && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Course Progress</span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <Button 
            className="w-full" 
            variant={isCompleted ? "outline" : hasStarted ? "default" : "default"}
            onClick={() => setSelectedCourse(course)}
          >
            <div className="flex items-center space-x-2">
              {isCompleted ? (
                <BookOpen className="h-4 w-4" />
              ) : hasStarted ? (
                <PlayCircle className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span>
                {isCompleted ? 'Review Course' : hasStarted ? 'Resume Course' : 'Explore Course'}
              </span>
            </div>
          </Button>
        </CardContent>
      </Card>
    );
  };

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
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
          <TabsTrigger value="professional_communication">Communication</TabsTrigger>
          <TabsTrigger value="business_attire">Business Attire</TabsTrigger>
          <TabsTrigger value="workplace_etiquette">Etiquette</TabsTrigger>
          <TabsTrigger value="diversity_inclusion">Diversity & Inclusion</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        {Object.entries(groupedCourses).map(([category, categoryCourses]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SoftSkillsPage;
