import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useSessionTracking } from './useSessionTracking';

type ActivityType = 'page_view' | 'feature_interaction' | 'quiz_attempt' | 'video_watch' | 'profile_edit' | 'game_play';
type ActivityCategory = 'learn' | 'trade' | 'soft_skills' | 'phils_friends' | 'ask_phil' | 'profile' | 'empire';
type EngagementLevel = 'passive' | 'active' | 'deep';

interface ActivityEvent {
  type: ActivityType;
  category: ActivityCategory;
  details: Record<string, any>;
  duration?: number;
  engagementLevel?: EngagementLevel;
}

export const useActivityTracking = () => {
  const { user } = useAuth();
  const { sessionId } = useSessionTracking();

  // Calculate engagement level based on interactions and duration
  const calculateEngagementLevel = (interactions: number, duration: number): EngagementLevel => {
    // Deep engagement: lots of interactions and significant time
    if (interactions > 5 && duration > 120) return 'deep';
    
    // Active engagement: some interactions
    if (interactions > 0) return 'active';
    
    // Passive: just viewing/scrolling
    return 'passive';
  };

  // Generic activity logger
  const logActivity = useCallback(async (event: ActivityEvent) => {
    if (!user || !sessionId) return;

    try {
      const { error } = await supabase
        .from('user_activity_log')
        .insert({
          user_id: user.id,
          session_id: sessionId,
          activity_type: event.type,
          activity_category: event.category,
          activity_details: event.details,
          duration_seconds: event.duration || 0,
          engagement_level: event.engagementLevel || 'passive',
          timestamp: new Date().toISOString(),
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }, [user, sessionId]);

  // Track page view
  const trackPageView = useCallback((page: string, duration: number = 0) => {
    logActivity({
      type: 'page_view',
      category: getCategoryFromPage(page),
      details: { page },
      duration,
      engagementLevel: duration > 30 ? 'active' : 'passive',
    });
  }, [logActivity]);

  // Track feature interaction
  const trackFeatureInteraction = useCallback((
    feature: string,
    action: string,
    details: Record<string, any> = {}
  ) => {
    logActivity({
      type: 'feature_interaction',
      category: getCategoryFromFeature(feature),
      details: { feature, action, ...details },
      engagementLevel: 'active',
    });
  }, [logActivity]);

  // Track quiz attempt
  const trackQuizAttempt = useCallback((
    quizId: string,
    score: number,
    timeSpent: number,
    completed: boolean = true
  ) => {
    logActivity({
      type: 'quiz_attempt',
      category: 'learn',
      details: { quizId, score, completed },
      duration: timeSpent,
      engagementLevel: calculateEngagementLevel(1, timeSpent),
    });
  }, [logActivity]);

  // Track video watch
  const trackVideoWatch = useCallback((
    videoId: string,
    watchDuration: number,
    totalDuration: number,
    completed: boolean
  ) => {
    const watchPercentage = (watchDuration / totalDuration) * 100;
    
    logActivity({
      type: 'video_watch',
      category: 'phils_friends',
      details: { 
        videoId, 
        watchDuration, 
        totalDuration,
        watchPercentage: Math.round(watchPercentage),
        completed 
      },
      duration: watchDuration,
      engagementLevel: watchPercentage > 75 ? 'deep' : watchPercentage > 25 ? 'active' : 'passive',
    });
  }, [logActivity]);

  // Track profile edit
  const trackProfileEdit = useCallback((
    field: string,
    valueType: string
  ) => {
    logActivity({
      type: 'profile_edit',
      category: 'profile',
      details: { field, valueType },
      engagementLevel: 'active',
    });
  }, [logActivity]);

  // Track game play
  const trackGamePlay = useCallback((
    gameId: string,
    score: number,
    duration: number,
    completed: boolean = true
  ) => {
    logActivity({
      type: 'game_play',
      category: 'learn',
      details: { gameId, score, completed },
      duration,
      engagementLevel: calculateEngagementLevel(Math.floor(duration / 10), duration),
    });
  }, [logActivity]);

  // Helper: Determine category from page path
  function getCategoryFromPage(page: string): ActivityCategory {
    if (page.includes('learn')) return 'learn';
    if (page.includes('trade') || page.includes('panda')) return 'trade';
    if (page.includes('soft-skills')) return 'soft_skills';
    if (page.includes('phils-friends')) return 'phils_friends';
    if (page.includes('ask-phil')) return 'ask_phil';
    if (page.includes('profile')) return 'profile';
    if (page.includes('empire')) return 'empire';
    return 'learn'; // default
  }

  // Helper: Determine category from feature name
  function getCategoryFromFeature(feature: string): ActivityCategory {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('quiz') || featureLower.includes('lesson')) return 'learn';
    if (featureLower.includes('trade') || featureLower.includes('stock')) return 'trade';
    if (featureLower.includes('soft')) return 'soft_skills';
    if (featureLower.includes('friend') || featureLower.includes('video')) return 'phils_friends';
    if (featureLower.includes('phil') || featureLower.includes('ask')) return 'ask_phil';
    if (featureLower.includes('profile')) return 'profile';
    if (featureLower.includes('empire')) return 'empire';
    return 'learn'; // default
  }

  return {
    trackPageView,
    trackFeatureInteraction,
    trackQuizAttempt,
    trackVideoWatch,
    trackProfileEdit,
    trackGamePlay,
    calculateEngagementLevel,
  };
};
