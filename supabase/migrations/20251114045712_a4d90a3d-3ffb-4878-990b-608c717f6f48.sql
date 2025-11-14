-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  email TEXT,
  experience_level TEXT,
  interests TEXT[],
  goals TEXT[],
  device_preference TEXT,
  engagement_score INTEGER DEFAULT 0,
  learning_progress JSONB DEFAULT '{}'::jsonb,
  current_streak INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create custom types for activity tracking
CREATE TYPE activity_type_enum AS ENUM (
  'page_view',
  'feature_interaction',
  'quiz_attempt',
  'video_watch',
  'profile_edit',
  'game_play'
);

CREATE TYPE behavioral_segment_enum AS ENUM (
  'explorer',
  'achiever',
  'focused_learner',
  'casual_browser',
  'passive_observer'
);

CREATE TYPE learning_style_enum AS ENUM (
  'visual',
  'reading',
  'interactive',
  'video'
);

-- Add personalization columns to profiles
ALTER TABLE profiles
ADD COLUMN first_session_at TIMESTAMPTZ,
ADD COLUMN last_active_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN total_sessions INTEGER DEFAULT 0,
ADD COLUMN average_session_duration INTEGER DEFAULT 0,
ADD COLUMN profile_completion_score INTEGER DEFAULT 0,
ADD COLUMN behavioral_segment behavioral_segment_enum,
ADD COLUMN survey_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN learning_style learning_style_enum,
ADD COLUMN preferred_content_types TEXT[],
ADD COLUMN finance_goals TEXT[],
ADD COLUMN time_commitment TEXT;

-- Create user_sessions table
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  duration_seconds INTEGER,
  device_info JSONB,
  entry_point TEXT,
  exit_point TEXT,
  pages_visited JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_activity_log table
CREATE TABLE user_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES user_sessions(id) ON DELETE CASCADE,
  activity_type activity_type_enum NOT NULL,
  activity_category TEXT NOT NULL,
  activity_details JSONB DEFAULT '{}'::jsonb,
  duration_seconds INTEGER DEFAULT 0,
  engagement_level TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_sessions
CREATE POLICY "Users can view their own sessions"
  ON user_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
  ON user_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON user_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS policies for user_activity_log
CREATE POLICY "Users can view their own activity"
  ON user_activity_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity"
  ON user_activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_start ON user_sessions(session_start DESC);
CREATE INDEX idx_user_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX idx_user_activity_log_session_id ON user_activity_log(session_id);
CREATE INDEX idx_user_activity_log_timestamp ON user_activity_log(timestamp DESC);
CREATE INDEX idx_profiles_behavioral_segment ON profiles(behavioral_segment);
CREATE INDEX idx_profiles_last_active ON profiles(last_active_at DESC);

-- Function to update profile session stats
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

-- Trigger for updating profile session stats
CREATE TRIGGER trigger_update_profile_session_stats
  AFTER UPDATE ON user_sessions
  FOR EACH ROW
  WHEN (OLD.session_end IS NULL AND NEW.session_end IS NOT NULL)
  EXECUTE FUNCTION update_profile_session_stats();