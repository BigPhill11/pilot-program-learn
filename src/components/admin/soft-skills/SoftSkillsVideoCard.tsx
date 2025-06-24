
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, ExternalLink, Edit, Trash2 } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  name: string;
  company: string;
  duration: string;
  category: string;
  created_at: string;
}

interface SoftSkillsVideoCardProps {
  video: Video;
  onEdit: (video: Video) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const SoftSkillsVideoCard: React.FC<SoftSkillsVideoCardProps> = ({
  video,
  onEdit,
  onDelete,
  isDeleting
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="flex flex-col">
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
            onClick={() => onEdit(video)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(video.id)}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
