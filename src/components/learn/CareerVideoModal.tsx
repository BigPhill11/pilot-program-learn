
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Building, GraduationCap } from 'lucide-react';

interface CareerVideo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  career_id: string;
  level: number;
  speaker_type: string;
  duration: string;
  created_at: string;
}

interface CareerVideoModalProps {
  video: CareerVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

const CareerVideoModal: React.FC<CareerVideoModalProps> = ({ video, isOpen, onClose }) => {
  if (!video) return null;

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
        return 'bg-blue-100 text-blue-800';
      case 'professional':
        return 'bg-green-100 text-green-800';
      case 'professor':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSpeakerLabel = (speaker: string) => {
    switch (speaker) {
      case 'intern':
        return 'Intern';
      case 'professional':
        return 'Professional';
      case 'professor':
        return 'Professor';
      default:
        return speaker.charAt(0).toUpperCase() + speaker.slice(1);
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
                className={getSpeakerColor(video.speaker_type)}
              >
                <span className="flex items-center gap-1">
                  {getSpeakerIcon(video.speaker_type)}
                  {getSpeakerLabel(video.speaker_type)}
                </span>
              </Badge>
              <Badge variant="outline">
                Level {video.level}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {video.duration}
              </Badge>
            </div>

            {video.description && (
              <p className="text-muted-foreground">{video.description}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerVideoModal;
