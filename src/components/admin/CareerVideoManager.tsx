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

const careerVideoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  video_url: z.string().url('Valid URL is required'),
  thumbnail_url: z.string().url().optional().or(z.literal('')),
  career_id: z.string().min(1, 'Career is required'),
  level: z.number().min(1).max(7),
  speaker_type: z.string().min(1, 'Speaker type is required'),
  duration: z.string().min(1, 'Duration is required')
});

type CareerVideoFormData = z.infer<typeof careerVideoSchema>;

const CareerVideoManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);

  const form = useForm<CareerVideoFormData>({
    resolver: zodResolver(careerVideoSchema),
    defaultValues: {
      title: '',
      description: '',
      video_url: '',
      thumbnail_url: '',
      career_id: '',
      level: 1,
      speaker_type: '',
      duration: ''
    }
  });

  // Fetch career videos
  const { data: videos, isLoading } = useQuery({
    queryKey: ['career-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('career_videos')
        .select('*')
        .order('career_id', { ascending: true })
        .order('level', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Add video mutation
  const addVideoMutation = useMutation({
    mutationFn: async (data: CareerVideoFormData) => {
      const insertData = {
        title: data.title,
        description: data.description,
        video_url: data.video_url,
        thumbnail_url: data.thumbnail_url || null,
        career_id: data.career_id,
        level: data.level,
        speaker_type: data.speaker_type,
        duration: data.duration
      };
      
      const { data: result, error } = await supabase
        .from('career_videos')
        .insert(insertData)
        .select();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-videos'] });
      toast({ title: "Success", description: "Career video added successfully!" });
      form.reset();
      setIsAddingVideo(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add career video: " + error.message,
        variant: "destructive"
      });
    }
  });

  // Update video mutation
  const updateVideoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CareerVideoFormData }) => {
      const updateData = {
        title: data.title,
        description: data.description,
        video_url: data.video_url,
        thumbnail_url: data.thumbnail_url || null,
        career_id: data.career_id,
        level: data.level,
        speaker_type: data.speaker_type,
        duration: data.duration
      };
      
      const { data: result, error } = await supabase
        .from('career_videos')
        .update(updateData)
        .eq('id', id)
        .select();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-videos'] });
      toast({ title: "Success", description: "Career video updated successfully!" });
      setEditingVideo(null);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update career video: " + error.message,
        variant: "destructive"
      });
    }
  });

  // Delete video mutation
  const deleteVideoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('career_videos')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-videos'] });
      toast({ title: "Success", description: "Career video deleted successfully!" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete career video: " + error.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: CareerVideoFormData) => {
    if (editingVideo) {
      updateVideoMutation.mutate({ id: editingVideo.id, data });
    } else {
      addVideoMutation.mutate(data);
    }
  };

  const startEdit = (video: any) => {
    setEditingVideo(video);
    form.reset({
      title: video.title,
      description: video.description || '',
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || '',
      career_id: video.career_id,
      level: video.level,
      speaker_type: video.speaker_type,
      duration: video.duration
    });
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
          <h2 className="text-2xl font-bold">Career Videos</h2>
          <p className="text-muted-foreground">Manage videos for finance career journeys</p>
        </div>
        <Button onClick={() => setIsAddingVideo(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Career Video
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isAddingVideo && (
        <Card>
          <CardHeader>
            <CardTitle>{editingVideo ? 'Edit Career Video' : 'Add New Career Video'}</CardTitle>
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
                    name="career_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Career</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select career" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="investment-banking">Investment Banking</SelectItem>
                            <SelectItem value="private-equity">Private Equity</SelectItem>
                            <SelectItem value="credit">Credit</SelectItem>
                            <SelectItem value="fixed-income">Fixed Income</SelectItem>
                            <SelectItem value="mergers-acquisitions">Mergers & Acquisitions</SelectItem>
                            <SelectItem value="wealth-management">Wealth Management</SelectItem>
                            <SelectItem value="real-estate">Real Estate Finance</SelectItem>
                            <SelectItem value="consulting">Financial Consulting</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7].map((level) => (
                              <SelectItem key={level} value={level.toString()}>
                                Level {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="speaker_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Speaker Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select speaker type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="intern">Intern</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="professor">Professor</SelectItem>
                          </SelectContent>
                        </Select>
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
          <div className="col-span-full text-center py-8">Loading career videos...</div>
        ) : videos?.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No career videos found
          </div>
        ) : (
          videos?.map((video) => (
            <Card key={video.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {video.speaker_type}
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
                  <Badge variant="outline">{video.career_id}</Badge>
                  <Badge variant="outline">Level {video.level}</Badge>
                  <Badge variant="outline">{video.speaker_type}</Badge>
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

export default CareerVideoManager;
