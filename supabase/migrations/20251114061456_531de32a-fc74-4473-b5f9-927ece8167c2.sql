-- Add missing fields to trading_videos table to match interface expectations
ALTER TABLE public.trading_videos
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS instructor_name TEXT,
ADD COLUMN IF NOT EXISTS instructor_bio TEXT,
ADD COLUMN IF NOT EXISTS instructor_credentials TEXT,
ADD COLUMN IF NOT EXISTS topic_category TEXT,
ADD COLUMN IF NOT EXISTS duration_minutes INTEGER;

-- Migrate existing data
UPDATE public.trading_videos
SET thumbnail_url = thumbnail
WHERE thumbnail_url IS NULL AND thumbnail IS NOT NULL;

UPDATE public.trading_videos
SET topic_category = category
WHERE topic_category IS NULL AND category IS NOT NULL;

UPDATE public.trading_videos
SET duration_minutes = CASE 
  WHEN duration IS NOT NULL THEN ROUND(duration::numeric / 60)
  ELSE NULL
END
WHERE duration_minutes IS NULL AND duration IS NOT NULL;

-- Add missing fields to video_clips table
ALTER TABLE public.video_clips
ADD COLUMN IF NOT EXISTS clip_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add missing fields to phils_friends_videos table
ALTER TABLE public.phils_friends_videos
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS role_tier TEXT,
ADD COLUMN IF NOT EXISTS duration_sec INTEGER,
ADD COLUMN IF NOT EXISTS source_type TEXT,
ADD COLUMN IF NOT EXISTS processing_status TEXT DEFAULT 'completed',
ADD COLUMN IF NOT EXISTS origin TEXT;

-- Migrate duration to duration_sec
UPDATE public.phils_friends_videos
SET duration_sec = duration
WHERE duration_sec IS NULL AND duration IS NOT NULL;

-- Add name from title if missing
UPDATE public.phils_friends_videos
SET name = title
WHERE name IS NULL;