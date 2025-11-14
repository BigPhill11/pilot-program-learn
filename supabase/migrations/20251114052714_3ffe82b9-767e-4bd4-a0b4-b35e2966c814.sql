-- Create market_predictions table
CREATE TABLE IF NOT EXISTS public.market_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  sentiment TEXT NOT NULL CHECK (sentiment IN ('bullish', 'bearish', 'neutral')),
  predicted_price DECIMAL(10, 2),
  reasoning TEXT,
  week_ending DATE,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.market_predictions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for market_predictions
CREATE POLICY "Users can view their own predictions"
  ON public.market_predictions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own predictions"
  ON public.market_predictions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own predictions"
  ON public.market_predictions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own predictions"
  ON public.market_predictions FOR DELETE
  USING (auth.uid() = user_id);

-- Create portfolio table
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  asset_type TEXT NOT NULL DEFAULT 'stock',
  shares DECIMAL(18, 8) NOT NULL DEFAULT 0,
  avg_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  cash DECIMAL(18, 2) DEFAULT 10000.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

-- Enable RLS
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- RLS Policies for portfolio
CREATE POLICY "Users can view their own portfolio"
  ON public.portfolio FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own portfolio"
  ON public.portfolio FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio"
  ON public.portfolio FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio"
  ON public.portfolio FOR DELETE
  USING (auth.uid() = user_id);

-- Create trading_videos table
CREATE TABLE IF NOT EXISTS public.trading_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  duration INTEGER,
  category TEXT,
  difficulty_level TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.trading_videos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trading_videos (public read access)
CREATE POLICY "Anyone can view trading videos"
  ON public.trading_videos FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert trading videos"
  ON public.trading_videos FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update trading videos"
  ON public.trading_videos FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete trading videos"
  ON public.trading_videos FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_market_predictions_user_id ON public.market_predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_market_predictions_ticker ON public.market_predictions(ticker);
CREATE INDEX IF NOT EXISTS idx_portfolio_user_id ON public.portfolio(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_symbol ON public.portfolio(symbol);
CREATE INDEX IF NOT EXISTS idx_trading_videos_category ON public.trading_videos(category);