
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface VideoRatingProps {
  videoId: string;
}

interface Rating {
  id: string;
  clarity_rating: number;
  usefulness_rating: number;
  entertainment_rating: number;
  difficulty_rating: number;
  overall_rating: number;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  helpful_votes: number;
  user_id: string;
}

const VideoRating: React.FC<VideoRatingProps> = ({ videoId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [ratings, setRatings] = useState({
    clarity: 0,
    usefulness: 0,
    entertainment: 0,
    difficulty: 0
  });
  const [comment, setComment] = useState('');
  const [showRatingForm, setShowRatingForm] = useState(false);

  // Fetch existing ratings
  const { data: videoRatings } = useQuery({
    queryKey: ['video-ratings', videoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_ratings')
        .select('*')
        .eq('video_id', videoId);
      if (error) throw error;
      return data as Rating[];
    }
  });

  // Fetch comments
  const { data: comments } = useQuery({
    queryKey: ['video-comments', videoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_comments')
        .select('*')
        .eq('video_id', videoId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Comment[];
    }
  });

  // Submit rating mutation
  const submitRatingMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('video_ratings')
        .upsert({
          video_id: videoId,
          user_id: user.id,
          clarity_rating: ratings.clarity,
          usefulness_rating: ratings.usefulness,
          entertainment_rating: ratings.entertainment,
          difficulty_rating: ratings.difficulty
        });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['video-ratings', videoId] });
      setShowRatingForm(false);
      toast({
        title: "Success",
        description: "Your rating has been submitted!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit rating: " + error.message,
        variant: "destructive"
      });
    }
  });

  // Submit comment mutation
  const submitCommentMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('video_comments')
        .insert({
          video_id: videoId,
          user_id: user.id,
          content: comment
        });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['video-comments', videoId] });
      setComment('');
      toast({
        title: "Success",
        description: "Your comment has been posted!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to post comment: " + error.message,
        variant: "destructive"
      });
    }
  });

  const renderStars = (category: string, value: number, onChange: (value: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 cursor-pointer ${
              i < value ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => onChange(i + 1)}
          />
        ))}
      </div>
    );
  };

  const averageRatings = videoRatings?.reduce(
    (acc, rating) => {
      acc.clarity += rating.clarity_rating;
      acc.usefulness += rating.usefulness_rating;
      acc.entertainment += rating.entertainment_rating;
      acc.difficulty += rating.difficulty_rating;
      return acc;
    },
    { clarity: 0, usefulness: 0, entertainment: 0, difficulty: 0 }
  );

  const totalRatings = videoRatings?.length || 0;
  const avgRatings = totalRatings > 0 ? {
    clarity: (averageRatings!.clarity / totalRatings).toFixed(1),
    usefulness: (averageRatings!.usefulness / totalRatings).toFixed(1),
    entertainment: (averageRatings!.entertainment / totalRatings).toFixed(1),
    difficulty: (averageRatings!.difficulty / totalRatings).toFixed(1)
  } : null;

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Please log in to rate and comment on videos.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Average Ratings Display */}
      {avgRatings && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Average Ratings ({totalRatings} reviews)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span>Clarity:</span>
                <span className="font-semibold">{avgRatings.clarity}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Usefulness:</span>
                <span className="font-semibold">{avgRatings.usefulness}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Entertainment:</span>
                <span className="font-semibold">{avgRatings.entertainment}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="font-semibold">{avgRatings.difficulty}/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rate Video Button */}
      {!showRatingForm && (
        <Button 
          onClick={() => setShowRatingForm(true)}
          className="w-full"
        >
          Rate This Video
        </Button>
      )}

      {/* Rating Form */}
      {showRatingForm && (
        <Card>
          <CardHeader>
            <CardTitle>Rate This Video</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Clarity:</span>
                {renderStars('clarity', ratings.clarity, (value) => 
                  setRatings(prev => ({ ...prev, clarity: value }))
                )}
              </div>
              <div className="flex justify-between items-center">
                <span>Usefulness:</span>
                {renderStars('usefulness', ratings.usefulness, (value) => 
                  setRatings(prev => ({ ...prev, usefulness: value }))
                )}
              </div>
              <div className="flex justify-between items-center">
                <span>Entertainment:</span>
                {renderStars('entertainment', ratings.entertainment, (value) => 
                  setRatings(prev => ({ ...prev, entertainment: value }))
                )}
              </div>
              <div className="flex justify-between items-center">
                <span>Difficulty:</span>
                {renderStars('difficulty', ratings.difficulty, (value) => 
                  setRatings(prev => ({ ...prev, difficulty: value }))
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => submitRatingMutation.mutate()}
                disabled={submitRatingMutation.isPending || Object.values(ratings).some(r => r === 0)}
              >
                Submit Rating
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowRatingForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments ({comments?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Comment */}
          <div className="space-y-2">
            <Textarea
              placeholder="Share your thoughts about this video..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button 
              onClick={() => submitCommentMutation.mutate()}
              disabled={submitCommentMutation.isPending || !comment.trim()}
              size="sm"
            >
              Post Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {comments?.map((comment) => (
              <div key={comment.id} className="border-l-2 border-gray-200 pl-4 py-2">
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{comment.helpful_votes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comments?.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoRating;
