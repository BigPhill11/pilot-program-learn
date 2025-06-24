import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SoftSkillsVideoForm, VideoFormData, videoSchema } from './soft-skills/SoftSkillsVideoForm';
import { SoftSkillsVideoList } from './soft-skills/SoftSkillsVideoList';

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
      category: 'interviewing',
      course_category: undefined
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
      const insertData = {
        title: data.title,
        description: data.description,
        video_url: data.video_url,
        thumbnail_url: data.thumbnail_url || null,
        name: data.name,
        company: data.company,
        duration: data.duration,
        category: data.category,
        course_category: data.course_category || null
      };
      
      const { data: result, error } = await supabase
        .from('phils_friends_videos')
        .insert(insertData)
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
      const updateData = {
        title: data.title,
        description: data.description,
        video_url: data.video_url,
        thumbnail_url: data.thumbnail_url || null,
        name: data.name,
        company: data.company,
        duration: data.duration,
        category: data.category,
        course_category: data.course_category || null
      };
      
      const { data: result, error } = await supabase
        .from('phils_friends_videos')
        .update(updateData)
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
    form.reset({
      title: video.title,
      description: video.description,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || '',
      name: video.name,
      company: video.company,
      duration: video.duration,
      category: video.category,
      course_category: video.course_category || undefined
    });
    setIsAddingVideo(true);
  };

  const handleCancel = () => {
    setIsAddingVideo(false);
    setEditingVideo(null);
    form.reset({
      title: '',
      description: '',
      video_url: '',
      thumbnail_url: '',
      name: '',
      company: '',
      duration: '',
      category: 'interviewing',
      course_category: undefined
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
        <SoftSkillsVideoForm
          form={form}
          onSubmit={onSubmit}
          onCancel={handleCancel}
          editingVideo={editingVideo}
          isLoading={addVideoMutation.isPending || updateVideoMutation.isPending}
        />
      )}

      {/* Videos List */}
      <SoftSkillsVideoList
        videos={videos}
        isLoading={isLoading}
        onEdit={startEdit}
        onDelete={(id) => deleteVideoMutation.mutate(id)}
        isDeleting={deleteVideoMutation.isPending}
      />
    </div>
  );
};

export default SoftSkillsVideoManager;
