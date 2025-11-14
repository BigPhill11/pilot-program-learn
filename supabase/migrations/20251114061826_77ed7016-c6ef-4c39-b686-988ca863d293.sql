-- Drop all tables that are NOT used in the learn section
DROP TABLE IF EXISTS public.video_analytics CASCADE;
DROP TABLE IF EXISTS public.video_points CASCADE;
DROP TABLE IF EXISTS public.video_clips CASCADE;
DROP TABLE IF EXISTS public.video_segments CASCADE;
DROP TABLE IF EXISTS public.video_transcripts CASCADE;
DROP TABLE IF EXISTS public.video_ratings CASCADE;
DROP TABLE IF EXISTS public.video_comments CASCADE;
DROP TABLE IF EXISTS public.phils_friends_videos CASCADE;
DROP TABLE IF EXISTS public.trading_videos CASCADE;
DROP TABLE IF EXISTS public.portfolio CASCADE;
DROP TABLE IF EXISTS public.market_predictions CASCADE;
DROP TABLE IF EXISTS public.market_data_cache CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.user_company_interactions CASCADE;
DROP TABLE IF EXISTS public.module_progress CASCADE;

-- Update behavioral_segment enum to include 'dormant'
ALTER TYPE behavioral_segment_enum ADD VALUE IF NOT EXISTS 'dormant';

-- Ensure profiles table has all needed columns
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS learning_progress JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS engagement_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_xp INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS goals TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS interests TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS experience_level TEXT,
ADD COLUMN IF NOT EXISTS device_preference TEXT,
ADD COLUMN IF NOT EXISTS preferred_content_types TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS finance_goals TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS time_commitment TEXT,
ADD COLUMN IF NOT EXISTS profile_completion_score INTEGER DEFAULT 0;

-- Create handle_daily_login function
CREATE OR REPLACE FUNCTION handle_daily_login(user_id_param UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSONB;
  last_login DATE;
  current_streak INT;
BEGIN
  -- Get user's last login
  SELECT last_active_at::DATE, profiles.current_streak
  INTO last_login, current_streak
  FROM profiles
  WHERE id = user_id_param;
  
  -- Calculate new streak
  IF last_login IS NULL THEN
    current_streak := 1;
  ELSIF last_login = CURRENT_DATE - INTERVAL '1 day' THEN
    current_streak := current_streak + 1;
  ELSIF last_login < CURRENT_DATE - INTERVAL '1 day' THEN
    current_streak := 1;
  END IF;
  
  -- Update profile
  UPDATE profiles
  SET 
    last_active_at = NOW(),
    current_streak = current_streak
  WHERE id = user_id_param;
  
  -- Return result
  result := jsonb_build_object(
    'streak', current_streak,
    'is_new_day', last_login != CURRENT_DATE
  );
  
  RETURN result;
END;
$$;