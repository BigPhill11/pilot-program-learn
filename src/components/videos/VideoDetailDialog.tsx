import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Play, 
  Clock, 
  User, 
  Building, 
  Target, 
  Calendar,
  Youtube,
  FileVideo,
  Award,
  TrendingUp,
  Eye,
  Star,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Video {
  id: string;
  name: string;
  description: string;
  category: string;
  role_tier: string;
  duration_sec: number;
  thumbnail_url?: string;
  source_type: string;
  source_url?: string;
  published: boolean;
  created_at: string;
  video_url?: string;
  storage_path?: string;
}

interface VideoDetailDialogProps {
  video: Video | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoDetailDialog: React.FC<VideoDetailDialogProps> = ({
  video,
  open,
  onOpenChange
}) => {
  const { user } = useAuth();
  const { isAdmin } = useAdminAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (video && open) {
      loadVideoUrl();
      trackVideoView();
    }
  }, [video, open]);

  const loadVideoUrl = async () => {
    if (!video) return;

    try {
      if (video.source_type === 'youtube' && video.source_url) {
        // Convert YouTube URL to embed URL
        const videoId = extractYouTubeVideoId(video.source_url);
        if (videoId) {
          setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
        }
      } else if (video.storage_path) {
        // Get signed URL for uploaded video
        const { data } = supabase.storage
          .from('phil-videos')
          .getPublicUrl(video.storage_path);
        
        setVideoUrl(data.publicUrl);
      }
    } catch (error) {
      console.error('Error loading video URL:', error);
      toast({
        title: 'Error loading video',
        description: 'Unable to load video content',
        variant: 'destructive'
      });
    }
  };

  const extractYouTubeVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const trackVideoView = async () => {
    if (!video || !user) return;

    try {
      // Track video started event
      await supabase
        .from('video_analytics')
        .insert({
          user_id: user.id,
          video_id: video.id,
          event_type: 'VIDEO_STARTED',
          progress_pct: 0
        });

      // Award points for starting video
      await supabase
        .from('video_points')
        .insert({
          user_id: user.id,
          video_id: video.id,
          event_type: 'VIDEO_STARTED',
          points_earned: 5
        });

    } catch (error) {
      console.error('Error tracking video view:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleTierColor = (tier: string) => {
    const colors = {
      'Intern': 'bg-green-500/10 text-green-700 dark:text-green-300',
      'Analyst': 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
      'Associate': 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
      'Managing Director': 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
      'Professional': 'bg-red-500/10 text-red-700 dark:text-red-300'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      'Asset Management': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      'Investment Banking': 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
      'Private Equity': 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
      'Venture Capital': 'bg-pink-500/10 text-pink-700 dark:text-pink-300',
      'Hedge Funds': 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
      'Wealth Management': 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
      'Other': 'bg-gray-500/10 text-gray-700 dark:text-gray-300'
    };
    return colors[industry as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
  };

  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{video.name}</DialogTitle>
          <DialogDescription className="text-base">
            {video.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {videoUrl ? (
                video.source_type === 'youtube' ? (
                  <iframe
                    src={videoUrl}
                    title={video.name}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full"
                    poster={video.thumbnail_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {video.source_type === 'youtube' ? (
                      <Youtube className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    ) : (
                      <FileVideo className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    )}
                    <p className="text-muted-foreground">Loading video...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className={getRoleTierColor(video.role_tier)}>
                  <Target className="h-3 w-3 mr-1" />
                  {video.role_tier}
                </Badge>
                <Badge variant="outline" className={getIndustryColor(video.category)}>
                  <Building className="h-3 w-3 mr-1" />
                  {video.category}
                </Badge>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDuration(video.duration_sec)}
                </Badge>
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(video.created_at)}
                </Badge>
              </div>

              {!video.published && isAdmin && (
                <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      Draft Video
                    </span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    This video is not published and only visible to admins.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Views</span>
                    <Badge variant="secondary">
                      <Eye className="h-3 w-3 mr-1" />
                      0
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <Badge variant="secondary">
                      <Star className="h-3 w-3 mr-1" />
                      N/A
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Comments</span>
                    <Badge variant="secondary">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      0
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Gamification */}
              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Earn Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Watch 50%</span>
                    <Badge variant="outline">
                      <Award className="h-3 w-3 mr-1" />
                      +10 pts
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Complete video</span>
                    <Badge variant="outline">
                      <Award className="h-3 w-3 mr-1" />
                      +10 pts
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily streak</span>
                    <Badge variant="outline">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5 pts
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Videos */}
              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Related Videos</CardTitle>
                  <CardDescription>
                    More videos in {video.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Coming soon - personalized recommendations
                  </p>
                </CardContent>
              </Card>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDetailDialog;