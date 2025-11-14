-- Create video_transcripts table
CREATE TABLE IF NOT EXISTS public.video_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  raw_content TEXT NOT NULL,
  word_timestamps JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(video_id)
);

-- Enable RLS
ALTER TABLE public.video_transcripts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_transcripts
CREATE POLICY "Anyone can view video transcripts"
  ON public.video_transcripts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert transcripts"
  ON public.video_transcripts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update transcripts"
  ON public.video_transcripts FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete transcripts"
  ON public.video_transcripts FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create video_segments table
CREATE TABLE IF NOT EXISTS public.video_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  start_time DECIMAL(10, 2) NOT NULL,
  end_time DECIMAL(10, 2) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  segment_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.video_segments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_segments
CREATE POLICY "Anyone can view video segments"
  ON public.video_segments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert segments"
  ON public.video_segments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update segments"
  ON public.video_segments FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete segments"
  ON public.video_segments FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_video_transcripts_video_id ON public.video_transcripts(video_id);
CREATE INDEX IF NOT EXISTS idx_video_segments_video_id ON public.video_segments(video_id);
CREATE INDEX IF NOT EXISTS idx_video_segments_time ON public.video_segments(video_id, start_time, end_time);