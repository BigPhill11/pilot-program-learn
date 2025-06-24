
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Video, User, Calendar, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const videoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  video_url: z.string().url('Valid URL is required'),
  thumbnail_url: z.string().url().optional().or(z.literal('')),
  name: z.string().min(1, 'Instructor name is required'),
  company: z.string().min(1, 'Company is required'),
  duration: z.string().min(1, 'Duration is required'),
  category: z.string().min(1, 'Category is required'),
  course_category: z.string().min(1, 'Course category is required')
});

type VideoFormData = z.infer<typeof videoSchema>;

const SoftSkillsVideoManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: '',
      description: '',
      video_url: '',
      thumbnail_url: '',
      name: '',
      company: '',
      duration: '',
      category: '',
      course_category: ''
    }
  });

  // Fetch videos
  const { data: videos, isLoading } = useQuery({
    queryKey: ['phils-friends-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('phils_friends_videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add video mutation
  const addVideoMutation = useMutation({
    mutationFn: async (data: VideoFormData) => {
      const { data: result, error } = await supabase
        .from('phils_friends_videos')
        .insert([data])
        .select();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phils-friends-videos'] });
      toast({ title: "Success", description: "Video added successfully!" });
      form.reset();
      setIsAddingVideo(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add video: " + error.message,
        variant: "destructive"
      });
    }
  });

  // Update video mutation
  const updateVideoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: VideoFormData }) => {
      const { data: result, error } = await supabase
        .from('phils_friends_videos')
        .update(data)
        .eq('id', id)
        .select();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phils-friends-videos'] });
      toast({ title: "Success", description: "Video updated successfully!" });
      setEditingVideo(null);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update video: " + error.message,
        variant: "destructive"
      });
    }
  });

  // Delete video mutation
  const deleteVideoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('phils_friends_videos')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phils-friends-videos'] });
      toast({ title: "Success", description: "Video deleted successfully!" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete video: " + error.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: VideoFormData) => {
    if (editingVideo) {
      updateVideoMutation.mutate({ id: editingVideo.id, data });
    } else {
      addVideoMutation.mutate(data);
    }
  };

  const startEdit = (video: any) => {
    setEditingVideo(video);
    form.reset(video);
    setIsAddingVideo(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Soft Skills Videos</h2>
          <p className="text-muted-foreground">Manage Phil's Friends videos for soft skills courses</p>
        </div>
        <Button onClick={() => setIsAddingVideo(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Video
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isAddingVideo && (
        <Card>
          <CardHeader>
            <CardTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Video title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Instructor name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 15 min" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="interviewing">Interviewing</SelectItem>
                            <SelectItem value="networking">Networking</SelectItem>
                            <SelectItem value="professional_communication">Professional Communication</SelectItem>
                            <SelectItem value="business_attire">Business Attire</SelectItem>
                            <SelectItem value="workplace_etiquette">Workplace Etiquette</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="course_category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Course category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Video description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="video_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="thumbnail_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={addVideoMutation.isPending || updateVideoMutation.isPending}
                  >
                    {editingVideo ? 'Update Video' : 'Add Video'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddingVideo(false);
                      setEditingVideo(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Videos List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading videos...</div>
        ) : videos?.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No videos found
          </div>
        ) : (
          videos?.map((video) => (
            <Card key={video.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {video.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(video.created_at)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {video.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{video.category}</Badge>
                  <Badge variant="outline">{video.company}</Badge>
                  <Badge variant="outline">{video.duration}</Badge>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(video.video_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(video)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteVideoMutation.mutate(video.id)}
                    disabled={deleteVideoMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SoftSkillsVideoManager;
