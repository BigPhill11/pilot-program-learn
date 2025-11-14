-- Create video_comments table
CREATE TABLE IF NOT EXISTS public.video_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.video_comments(id) ON DELETE CASCADE,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_comments
CREATE POLICY "Anyone can view video comments"
  ON public.video_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert comments"
  ON public.video_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.video_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.video_comments FOR DELETE
  USING (auth.uid() = user_id);

-- Create video_ratings table
CREATE TABLE IF NOT EXISTS public.video_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  clarity_rating INTEGER CHECK (clarity_rating >= 1 AND clarity_rating <= 5),
  usefulness_rating INTEGER CHECK (usefulness_rating >= 1 AND usefulness_rating <= 5),
  entertainment_rating INTEGER CHECK (entertainment_rating >= 1 AND entertainment_rating <= 5),
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(video_id, user_id)
);

-- Enable RLS
ALTER TABLE public.video_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_ratings
CREATE POLICY "Anyone can view video ratings"
  ON public.video_ratings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert ratings"
  ON public.video_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON public.video_ratings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings"
  ON public.video_ratings FOR DELETE
  USING (auth.uid() = user_id);

-- Add view_count column to trading_videos
ALTER TABLE public.trading_videos
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_video_comments_video_id ON public.video_comments(video_id);
CREATE INDEX IF NOT EXISTS idx_video_comments_user_id ON public.video_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_video_ratings_video_id ON public.video_ratings(video_id);
CREATE INDEX IF NOT EXISTS idx_video_ratings_user_id ON public.video_ratings(user_id);

-- Create function to get video average ratings
CREATE OR REPLACE FUNCTION get_video_average_ratings(video_id_param UUID)
RETURNS TABLE (
  avg_clarity DECIMAL,
  avg_usefulness DECIMAL,
  avg_entertainment DECIMAL,
  avg_difficulty DECIMAL,
  total_ratings BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    AVG(clarity_rating)::DECIMAL,
    AVG(usefulness_rating)::DECIMAL,
    AVG(entertainment_rating)::DECIMAL,
    AVG(difficulty_rating)::DECIMAL,
    COUNT(*)::BIGINT
  FROM video_ratings
  WHERE video_id = video_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;