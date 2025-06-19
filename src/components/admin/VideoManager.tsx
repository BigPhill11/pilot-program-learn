
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, Eye, Clock, User, Calendar, Filter, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface TradingVideo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  instructor_name: string;
  instructor_bio?: string;
  topic_category: string;
  difficulty_level: string;
  duration_minutes?: number;
  status: string;
  view_count?: number;
  created_at: string;
  submitted_by?: string;
}

const VideoManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Fetch videos
  const { data: videos, isLoading } = useQuery({
    queryKey: ['trading-videos', searchTerm, filterStatus, filterCategory, filterDifficulty],
    queryFn: async () => {
      let query = supabase
        .from('trading_videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,instructor_name.ilike.%${searchTerm}%`);
      }
      
      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }
      
      if (filterCategory !== 'all') {
        query = query.eq('topic_category', filterCategory);
      }
      
      if (filterDifficulty !== 'all') {
        query = query.eq('difficulty_level', filterDifficulty);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as TradingVideo[];
    }
  });

  // Update video status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('trading_videos')
        .update({ status })
        .eq('id', id)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trading-videos'] });
      toast({
        title: "Success",
        description: "Video status updated successfully!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update video status: " + error.message,
        variant: "destructive"
      });
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Video Management</h1>
        <p className="text-muted-foreground">Manage submitted trading videos from Phil's Academy</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Search videos or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="basics">Trading Basics</SelectItem>
                <SelectItem value="technical-analysis">Technical Analysis</SelectItem>
                <SelectItem value="fundamental-analysis">Fundamental Analysis</SelectItem>
                <SelectItem value="options">Options Trading</SelectItem>
                <SelectItem value="psychology">Trading Psychology</SelectItem>
                <SelectItem value="risk-management">Risk Management</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {videos?.length || 0} videos
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading videos...</div>
        ) : videos?.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No videos found matching your criteria
          </div>
        ) : (
          videos?.map((video) => (
            <Card key={video.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                  <Badge className={getStatusColor(video.status)}>
                    {video.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {video.instructor_name}
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
                  <Badge variant="outline">{video.topic_category}</Badge>
                  <Badge variant="outline">{video.difficulty_level}</Badge>
                  {video.duration_minutes && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.duration_minutes}m
                    </Badge>
                  )}
                  {video.view_count && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.view_count}
                    </Badge>
                  )}
                </div>

                {video.instructor_bio && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Instructor:</strong> {video.instructor_bio}
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(video.video_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  {video.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateStatusMutation.mutate({ id: video.id, status: 'approved' })}
                        disabled={updateStatusMutation.isPending}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateStatusMutation.mutate({ id: video.id, status: 'rejected' })}
                        disabled={updateStatusMutation.isPending}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {video.status !== 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: video.id, status: 'pending' })}
                      disabled={updateStatusMutation.isPending}
                    >
                      Reset to Pending
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoManager;
