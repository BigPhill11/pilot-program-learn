-- Fix search_path for update_profile_session_stats function
DROP FUNCTION IF EXISTS update_profile_session_stats CASCADE;

CREATE OR REPLACE FUNCTION update_profile_session_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.session_end IS NOT NULL THEN
    UPDATE profiles
    SET 
      last_active_at = NEW.session_end,
      total_sessions = total_sessions + 1,
      average_session_duration = (
        (COALESCE(average_session_duration, 0) * COALESCE(total_sessions, 0) + COALESCE(NEW.duration_seconds, 0)) 
        / (COALESCE(total_sessions, 0) + 1)
      )
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate trigger
DROP TRIGGER IF EXISTS update_profile_session_stats_trigger ON user_sessions;
CREATE TRIGGER update_profile_session_stats_trigger
  AFTER UPDATE ON user_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_session_stats();

-- Create video_analytics table
CREATE TABLE IF NOT EXISTS public.video_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.video_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own analytics"
  ON public.video_analytics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics"
  ON public.video_analytics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create phils_friends_videos table
CREATE TABLE IF NOT EXISTS public.phils_friends_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER,
  category TEXT,
  published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.phils_friends_videos ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published videos"
  ON public.phils_friends_videos FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert videos"
  ON public.phils_friends_videos FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update videos"
  ON public.phils_friends_videos FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete videos"
  ON public.phils_friends_videos FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_video_analytics_video_id ON public.video_analytics(video_id);
CREATE INDEX IF NOT EXISTS idx_video_analytics_user_id ON public.video_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_phils_friends_videos_published ON public.phils_friends_videos(published);