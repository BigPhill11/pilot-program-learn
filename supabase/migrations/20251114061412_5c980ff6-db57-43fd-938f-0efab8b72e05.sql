-- Fix search_path security warning for get_video_average_ratings function
DROP FUNCTION IF EXISTS get_video_average_ratings(UUID);

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create video_clips table
CREATE TABLE IF NOT EXISTS public.video_clips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  excerpt TEXT,
  start_sec DECIMAL(10, 2) NOT NULL,
  end_sec DECIMAL(10, 2) NOT NULL,
  published BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.video_clips ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published clips"
  ON public.video_clips FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert clips"
  ON public.video_clips FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update clips"
  ON public.video_clips FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete clips"
  ON public.video_clips FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create video_points table
CREATE TABLE IF NOT EXISTS public.video_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  timestamp_sec DECIMAL(10, 2) NOT NULL,
  point_type TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.video_points ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view video points"
  ON public.video_points FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert points"
  ON public.video_points FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update points"
  ON public.video_points FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete points"
  ON public.video_points FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Add keywords to video_segments
ALTER TABLE public.video_segments
ADD COLUMN IF NOT EXISTS keywords JSONB DEFAULT '[]'::jsonb;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_video_clips_video_id ON public.video_clips(video_id);
CREATE INDEX IF NOT EXISTS idx_video_clips_published ON public.video_clips(published);
CREATE INDEX IF NOT EXISTS idx_video_points_video_id ON public.video_points(video_id);