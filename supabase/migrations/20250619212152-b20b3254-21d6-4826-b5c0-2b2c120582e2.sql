
-- Add RLS policies for admins to manage all videos
CREATE POLICY "Admins can view all videos" 
  ON public.trading_videos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update all videos" 
  ON public.trading_videos 
  FOR UPDATE 
  USING (true);

-- Add policy for users to view their own submissions
CREATE POLICY "Users can view their own submissions" 
  ON public.trading_videos 
  FOR SELECT 
  USING (auth.uid() = submitted_by);
