
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, User, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import VideoRating from './VideoRating';

interface TradingVideo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  instructor_name: string;
  instructor_bio: string | null;
  instructor_credentials: string | null;
  topic_category: string;
  difficulty_level: string;
  duration_minutes: number | null;
  view_count: number;
  created_at: string;
}

interface VideoModalProps {
  video: TradingVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  useEffect(() => {
    if (video && isOpen) {
      // Increment view count when video is opened
      const incrementViewCount = async () => {
        try {
          await supabase
            .from('trading_videos')
            .update({ view_count: (video.view_count || 0) + 1 })
            .eq('id', video.id);
        } catch (error) {
          console.error('Error incrementing view count:', error);
        }
      };
      
      incrementViewCount();
    }
  }, [video, isOpen]);

  if (!video) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'company-analysis': return 'Reading Companies';
      case 'market-psychology': return 'Market Psychology';
      case 'forecasting': return 'Forecasting';
      case 'general': return 'General';
      default: return category;
    }
  };

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{video.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Video Player */}
          <div className="aspect-video w-full">
            <iframe
              src={getVideoEmbedUrl(video.video_url)}
              title={video.title}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="outline" 
                className={getDifficultyColor(video.difficulty_level)}
              >
                {video.difficulty_level}
              </Badge>
              <Badge variant="secondary">
                {getCategoryLabel(video.topic_category)}
              </Badge>
              {video.duration_minutes && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration_minutes}m
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {video.view_count} views
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{video.instructor_name}</span>
              {video.instructor_credentials && (
                <Award className="h-4 w-4 text-emerald-600" />
              )}
            </div>

            {video.description && (
              <p className="text-muted-foreground">{video.description}</p>
            )}

            {video.instructor_bio && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">About the Instructor</h4>
                <p className="text-sm text-muted-foreground">{video.instructor_bio}</p>
                {video.instructor_credentials && (
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Credentials:</strong> {video.instructor_credentials}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Rating and Comments Section */}
          <VideoRating videoId={video.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
