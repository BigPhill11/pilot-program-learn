import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Youtube, 
  FileVideo, 
  Calendar,
  Clock,
  Users,
  BarChart3,
  Settings,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminTranscriptEditor from './AdminTranscriptEditor';

interface Video {
  id: string;
  name: string;
  description: string;
  category: string;
  role_tier: string;
  duration_sec: number;
  source_type: string;
  source_url?: string;
  video_url?: string;
  published: boolean;
  processing_status: string;
  created_at: string;
}

interface VideoManagementPanelProps {
  onVideoUpdate: () => void;
}

const VideoManagementPanel: React.FC<VideoManagementPanelProps> = ({
  onVideoUpdate
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVideos: 0,
    publishedVideos: 0,
    draftVideos: 0,
    processingVideos: 0
  });
  const [selectedVideoForTranscript, setSelectedVideoForTranscript] = useState<Video | null>(null);
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);

  const fetchAdminVideos = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('phils_friends_videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVideos(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const published = data?.filter(v => v.published).length || 0;
      const draft = data?.filter(v => !v.published).length || 0;
      const processing = data?.filter(v => v.processing_status === 'processing').length || 0;

      setStats({
        totalVideos: total,
        publishedVideos: published,
        draftVideos: draft,
        processingVideos: processing
      });

    } catch (error) {
      console.error('Error fetching admin videos:', error);
      toast({
        title: 'Error loading videos',
        description: 'Failed to load video management data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminVideos();
  }, []);

  const togglePublished = async (videoId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('phils_friends_videos')
        .update({ published: !currentStatus })
        .eq('id', videoId);

      if (error) throw error;

      toast({
        title: 'Video updated',
        description: `Video ${!currentStatus ? 'published' : 'unpublished'} successfully`
      });

      fetchAdminVideos();
      onVideoUpdate();

    } catch (error) {
      console.error('Error updating video:', error);
      toast({
        title: 'Update failed',
        description: 'Failed to update video status',
        variant: 'destructive'
      });
    }
  };

  const deleteVideo = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('phils_friends_videos')
        .delete()
        .eq('id', videoId);

      if (error) throw error;

      toast({
        title: 'Video deleted',
        description: 'Video has been permanently deleted'
      });

      fetchAdminVideos();
      onVideoUpdate();

    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: 'Delete failed',
        description: 'Failed to delete video',
        variant: 'destructive'
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (video: Video) => {
    if (video.processing_status === 'processing') {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Processing</Badge>;
    }
    if (video.published) {
      return <Badge variant="default" className="bg-green-50 text-green-700">Published</Badge>;
    }
    return <Badge variant="secondary">Draft</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Video Management</h2>
          <p className="text-muted-foreground">Manage and monitor your video library</p>
        </div>
        <Settings className="h-6 w-6 text-muted-foreground" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <FileVideo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVideos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.publishedVideos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.draftVideos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.processingVideos}</div>
          </CardContent>
        </Card>
      </div>

      {/* Videos Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Videos</CardTitle>
          <CardDescription>
            Manage video publishing status and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4">
                  <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-8">
              <FileVideo className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No videos have been uploaded yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{video.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {video.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {video.source_type === 'youtube' ? (
                        <Badge variant="outline" className="gap-1">
                          <Youtube className="h-3 w-3" />
                          YouTube
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <FileVideo className="h-3 w-3" />
                          Upload
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{video.category}</Badge>
                    </TableCell>
                    <TableCell>{formatDuration(video.duration_sec)}</TableCell>
                    <TableCell>{getStatusBadge(video)}</TableCell>
                    <TableCell>{formatDate(video.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedVideoForTranscript(video);
                            setTranscriptDialogOpen(true);
                          }}
                          title="Edit Transcript"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`publish-${video.id}`}
                            checked={video.published}
                            onCheckedChange={() => togglePublished(video.id, video.published)}
                            disabled={video.processing_status === 'processing'}
                          />
                          <Label htmlFor={`publish-${video.id}`} className="text-xs">
                            {video.published ? 'Live' : 'Draft'}
                          </Label>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteVideo(video.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Transcript Editor Dialog */}
      <Dialog open={transcriptDialogOpen} onOpenChange={setTranscriptDialogOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              Edit Transcript: {selectedVideoForTranscript?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedVideoForTranscript && (
            <AdminTranscriptEditor
              videoId={selectedVideoForTranscript.id}
              videoUrl={selectedVideoForTranscript.source_url || selectedVideoForTranscript.video_url || ''}
              onClose={() => setTranscriptDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoManagementPanel;