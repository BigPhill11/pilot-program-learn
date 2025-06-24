
import React from 'react';
import { SoftSkillsVideoCard } from './SoftSkillsVideoCard';

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

interface SoftSkillsVideoListProps {
  videos: Video[] | undefined;
  isLoading: boolean;
  onEdit: (video: Video) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const SoftSkillsVideoList: React.FC<SoftSkillsVideoListProps> = ({
  videos,
  isLoading,
  onEdit,
  onDelete,
  isDeleting
}) => {
  if (isLoading) {
    return (
      <div className="col-span-full text-center py-8">Loading videos...</div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-muted-foreground">
        No videos found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {videos.map((video) => (
        <SoftSkillsVideoCard
          key={video.id}
          video={video}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};
