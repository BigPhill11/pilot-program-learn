import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface PageVisit {
  page: string;
  enteredAt: Date;
  leftAt: Date | null;
  interactions: number;
}

interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  screenSize: string;
}

interface SessionData {
  sessionId: string | null;
  startTime: Date | null;
  pageHistory: PageVisit[];
  deviceInfo: DeviceInfo;
}

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const SESSION_RESUME_WINDOW = 30 * 60 * 1000; // 30 minutes

export const useSessionTracking = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sessionData, setSessionData] = useState<SessionData>({
    sessionId: null,
    startTime: null,
    pageHistory: [],
    deviceInfo: getDeviceInfo(),
  });
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<Date>(new Date());
  const currentPageRef = useRef<PageVisit | null>(null);

  // Get device information
  function getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;
    const screenWidth = window.innerWidth;
    
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (screenWidth < 768) deviceType = 'mobile';
    else if (screenWidth < 1024) deviceType = 'tablet';

    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    return {
      type: deviceType,
      browser,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
    };
  }

  // Start a new session
  const startSession = async (entryPoint: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_sessions' as any)
        .insert({
          user_id: user.id,
          session_start: new Date().toISOString(),
          device_info: sessionData.deviceInfo,
          entry_point: entryPoint,
          pages_visited: [],
        })
        .select()
        .single();

      if (error) throw error;

      const newSessionData = {
        sessionId: data.id,
        startTime: new Date(data.session_start),
        pageHistory: [],
        deviceInfo: sessionData.deviceInfo,
      };

      setSessionData(newSessionData);
      localStorage.setItem('currentSessionId', data.id);
      localStorage.setItem('lastSessionTime', new Date().toISOString());

      return data.id;
    } catch (error) {
      console.error('Error starting session:', error);
      return null;
    }
  };

  // End the current session
  const endSession = async () => {
    if (!sessionData.sessionId || !user) return;

    // Close current page visit
    if (currentPageRef.current && currentPageRef.current.leftAt === null) {
      currentPageRef.current.leftAt = new Date();
    }

    const duration = sessionData.startTime
      ? Math.floor((new Date().getTime() - sessionData.startTime.getTime()) / 1000)
      : 0;

    const allPages = currentPageRef.current
      ? [...sessionData.pageHistory, currentPageRef.current]
      : sessionData.pageHistory;

    try {
      await supabase
        .from('user_sessions')
        .update({
          session_end: new Date().toISOString(),
          duration_seconds: duration,
          exit_point: location.pathname,
          pages_visited: allPages.map(p => ({
            page: p.page,
            time_spent: p.leftAt && p.enteredAt 
              ? Math.floor((p.leftAt.getTime() - p.enteredAt.getTime()) / 1000)
              : 0,
            interactions: p.interactions,
          })),
        })
        .eq('id', sessionData.sessionId);

      localStorage.removeItem('currentSessionId');
      setSessionData({
        sessionId: null,
        startTime: null,
        pageHistory: [],
        deviceInfo: sessionData.deviceInfo,
      });
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  // Track page interaction
  const trackInteraction = () => {
    if (currentPageRef.current) {
      currentPageRef.current.interactions += 1;
    }
    lastActivityRef.current = new Date();
    resetIdleTimer();
  };

  // Reset idle timer
  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      endSession();
    }, IDLE_TIMEOUT);
  };

  // Check if we can resume a previous session
  const checkSessionResume = async () => {
    const lastSessionId = localStorage.getItem('currentSessionId');
    const lastSessionTime = localStorage.getItem('lastSessionTime');

    if (lastSessionId && lastSessionTime) {
      const timeSinceLastSession = new Date().getTime() - new Date(lastSessionTime).getTime();
      
      if (timeSinceLastSession < SESSION_RESUME_WINDOW) {
        // Resume the session
        setSessionData(prev => ({
          ...prev,
          sessionId: lastSessionId,
          startTime: new Date(lastSessionTime),
        }));
        localStorage.setItem('lastSessionTime', new Date().toISOString());
        return lastSessionId;
      } else {
        // Session expired, clean up
        localStorage.removeItem('currentSessionId');
        localStorage.removeItem('lastSessionTime');
      }
    }

    return null;
  };

  // Handle page changes
  useEffect(() => {
    if (!user || !sessionData.sessionId) return;

    // Close previous page visit
    if (currentPageRef.current && currentPageRef.current.leftAt === null) {
      currentPageRef.current.leftAt = new Date();
      setSessionData(prev => ({
        ...prev,
        pageHistory: [...prev.pageHistory, currentPageRef.current!],
      }));
    }

    // Start new page visit
    currentPageRef.current = {
      page: location.pathname,
      enteredAt: new Date(),
      leftAt: null,
      interactions: 0,
    };

    trackInteraction();
  }, [location.pathname, user, sessionData.sessionId]);

  // Initialize session on mount
  useEffect(() => {
    if (!user) return;

    const initSession = async () => {
      const resumedSessionId = await checkSessionResume();
      
      if (!resumedSessionId) {
        await startSession(location.pathname);
      }
    };

    initSession();

    // Track user interactions
    const handleInteraction = () => trackInteraction();
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    // End session on unmount
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      endSession();
    };
  }, [user]);

  return {
    sessionId: sessionData.sessionId,
    startTime: sessionData.startTime,
    trackInteraction,
    endSession,
  };
};
