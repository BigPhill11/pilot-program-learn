-- Create activity type enum if not exists
DO $$ BEGIN
  CREATE TYPE activity_type_enum AS ENUM (
    'page_view',
    'button_click',
    'form_submission',
    'video_watched',
    'article_read',
    'quiz_completed',
    'achievement_unlocked',
    'level_completed',
    'search_performed',
    'share_action'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create behavioral segment enum if not exists
DO $$ BEGIN
  CREATE TYPE behavioral_segment_enum AS ENUM (
    'explorer',
    'achiever',
    'passive_consumer',
    'goal_oriented',
    'social_learner'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create learning style enum if not exists
DO $$ BEGIN
  CREATE TYPE learning_style_enum AS ENUM (
    'visual',
    'auditory',
    'reading',
    'kinesthetic',
    'mixed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add columns to profiles table if they don't exist
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS first_session_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ADD COLUMN IF NOT EXISTS total_sessions INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS average_session_duration INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS profile_completion_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS behavioral_segment behavioral_segment_enum,
  ADD COLUMN IF NOT EXISTS survey_completed BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS learning_style learning_style_enum,
  ADD COLUMN IF NOT EXISTS preferred_content_types TEXT[],
  ADD COLUMN IF NOT EXISTS finance_goals TEXT[],
  ADD COLUMN IF NOT EXISTS time_commitment TEXT,
  ADD COLUMN IF NOT EXISTS engagement_score INTEGER DEFAULT 0;

-- Create user_sessions table if not exists
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  session_end TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  entry_point TEXT,
  exit_point TEXT,
  device_info JSONB,
  pages_visited JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_activity_log table if not exists
CREATE TABLE IF NOT EXISTS user_activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
  activity_type activity_type_enum NOT NULL,
  activity_category TEXT NOT NULL,
  activity_details JSONB DEFAULT '{}'::jsonb,
  engagement_level TEXT,
  duration_seconds INTEGER DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own sessions" ON user_sessions;
DROP POLICY IF EXISTS "Users can insert their own sessions" ON user_sessions;
DROP POLICY IF EXISTS "Users can update their own sessions" ON user_sessions;
DROP POLICY IF EXISTS "Users can view their own activity" ON user_activity_log;
DROP POLICY IF EXISTS "Users can insert their own activity" ON user_activity_log;

-- Enable RLS on new tables
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_sessions
CREATE POLICY "Users can view their own sessions"
  ON user_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
  ON user_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON user_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS policies for user_activity_log
CREATE POLICY "Users can view their own activity"
  ON user_activity_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity"
  ON user_activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_start ON user_sessions(session_start);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_session_id ON user_activity_log(session_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_timestamp ON user_activity_log(timestamp);

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS trigger_update_profile_session_stats ON user_sessions;

-- Create function to update profile session stats
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for session stats updates
CREATE TRIGGER trigger_update_profile_session_stats
  AFTER UPDATE ON user_sessions
  FOR EACH ROW
  WHEN (NEW.session_end IS NOT NULL AND OLD.session_end IS NULL)
  EXECUTE FUNCTION update_profile_session_stats();