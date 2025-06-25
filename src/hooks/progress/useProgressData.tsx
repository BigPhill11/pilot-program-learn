
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ProgressData } from '@/types/progress';

export const useProgressData = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressData>({
    quiz_scores: {},
    learning_progress: 0,
    engagement_score: 0,
    total_points: 0,
    level_progress: 0,
    achievements: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching progress:', error);
        return;
      }

      if (data) {
        setProgress({
          quiz_scores: (data.quiz_scores as Record<string, boolean>) || {},
          learning_progress: data.learning_progress || 0,
          engagement_score: data.engagement_score || 0,
          total_points: data.total_points || 0,
          level_progress: data.level_progress || 0,
          achievements: Array.isArray(data.achievements) ? (data.achievements as string[]) : []
        });
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    progress,
    setProgress,
    loading,
    fetchProgress
  };
};
