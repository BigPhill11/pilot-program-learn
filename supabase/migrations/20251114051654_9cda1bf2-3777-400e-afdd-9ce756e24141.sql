-- Alter companies table: change numeric columns to text and add missing columns
ALTER TABLE companies
  ALTER COLUMN market_cap TYPE TEXT,
  ALTER COLUMN revenue_ttm TYPE TEXT,
  ALTER COLUMN pe_ratio TYPE TEXT,
  ADD COLUMN IF NOT EXISTS financials JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS market_sentiment TEXT,
  ADD COLUMN IF NOT EXISTS analyst_sentiment TEXT,
  ADD COLUMN IF NOT EXISTS historical_performance TEXT,
  ADD COLUMN IF NOT EXISTS sub_sector TEXT;

-- Add app_version to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS app_version TEXT;

-- Create initial_assessments table
CREATE TABLE IF NOT EXISTS initial_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assessment_type TEXT NOT NULL,
  score INTEGER,
  answers JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, assessment_type)
);

-- Create market_data_cache table
CREATE TABLE IF NOT EXISTS market_data_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  price NUMERIC,
  change_percent NUMERIC,
  data JSONB DEFAULT '{}'::jsonb,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(name, asset_type)
);

-- Enable RLS
ALTER TABLE initial_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_data_cache ENABLE ROW LEVEL SECURITY;

-- RLS policies for initial_assessments
CREATE POLICY "Users can view their own assessments"
  ON initial_assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments"
  ON initial_assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments"
  ON initial_assessments FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS policies for market_data_cache (publicly readable)
CREATE POLICY "Anyone can view market data cache"
  ON market_data_cache FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert market data"
  ON market_data_cache FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update market data"
  ON market_data_cache FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_initial_assessments_user_id ON initial_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_market_data_cache_name ON market_data_cache(name);
CREATE INDEX IF NOT EXISTS idx_market_data_cache_asset_type ON market_data_cache(asset_type);