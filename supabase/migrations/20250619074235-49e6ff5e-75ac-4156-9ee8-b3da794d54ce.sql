
-- Fix the handle_daily_login function - the issue is with boolean comparison
CREATE OR REPLACE FUNCTION public.handle_daily_login(p_user_id uuid)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  login_recorded BOOLEAN := FALSE;
  new_streak INTEGER := 0;
  points_earned INTEGER := 0;
  bonus_points INTEGER := 0;
  result JSON;
BEGIN
  -- Insert daily login record (ignore if already exists for today)
  INSERT INTO public.daily_logins (user_id, login_date)
  VALUES (p_user_id, CURRENT_DATE)
  ON CONFLICT (user_id, login_date) DO NOTHING;
  
  -- Check if a new login was recorded
  GET DIAGNOSTICS login_recorded = ROW_COUNT;
  login_recorded := (login_recorded > 0);
  
  IF login_recorded THEN
    -- Calculate new streak
    new_streak := public.calculate_user_streak(p_user_id);
    
    -- Base login points
    points_earned := 5;
    
    -- Streak bonus calculation
    IF new_streak = 5 THEN
      bonus_points := 10; -- 5-day streak bonus
    ELSIF new_streak > 5 THEN
      bonus_points := 10; -- 10 points daily after day 5
    END IF;
    
    -- Update user profile with new streak and points
    UPDATE public.profiles 
    SET 
      current_streak = new_streak,
      longest_streak = GREATEST(longest_streak, new_streak),
      last_login_date = CURRENT_DATE,
      updated_at = now()
    WHERE id = p_user_id;
    
    -- Update user progress with earned points
    UPDATE public.user_progress 
    SET 
      total_points = total_points + points_earned + bonus_points,
      updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
  
  -- Return result
  SELECT json_build_object(
    'login_recorded', login_recorded,
    'streak', COALESCE(new_streak, public.calculate_user_streak(p_user_id)),
    'points_earned', COALESCE(points_earned + bonus_points, 0)
  ) INTO result;
  
  RETURN result;
END;
$function$
