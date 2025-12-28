/**
 * EmpirePage - Bamboo Empire Game
 * 
 * Main game page that handles:
 * - Loading saved state and calculating offline progress
 * - Game tick loop (updates every second)
 * - Event triggering (based on XP-tier driven hourly cadence)
 * - Auto-saving state (to cloud for logged-in users)
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { 
  loadGameState, 
  saveGameState, 
  calculateOfflineProgress, 
  createFreshState,
  extractPersistableState,
} from '@/engine/persistence';
import { 
  shouldTriggerEvent, 
  generateEvent,
} from '@/engine/events';
import { TIMING, getEconomicEventIntervalMs } from '@/config/gameConfig';
import BaseView from '@/components/empire/BaseView';
import { toast } from 'sonner';
import { empireClasses } from '@/config/empireTheme';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const EmpirePage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;
  
  const initialized = useGameStore(state => state.initialized);
  const loadState = useGameStore(state => state.loadState);
  const tick = useGameStore(state => state.tick);
  const setActiveEvent = useGameStore(state => state.setActiveEvent);
  const activeEvent = useGameStore(state => state.activeEvent);
  
  const lastTickRef = useRef<number>(Date.now());
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const eventCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userIdRef = useRef<string | undefined>(userId);

  // Initialize game state
  const initializeGame = useCallback(async (currentUserId?: string) => {
    const savedState = await loadGameState(currentUserId);
    
    if (savedState) {
      // Calculate offline progress
      const { state: updatedState, offlineTimeMs, bambooGained, catchUpEventsTriggered } = 
        calculateOfflineProgress(savedState);
      
      loadState(updatedState);
      lastTickRef.current = Date.now();

      // Show offline progress toast if significant time passed
      if (offlineTimeMs > 60000) { // More than 1 minute
        const hours = Math.floor(offlineTimeMs / (1000 * 60 * 60));
        const minutes = Math.floor((offlineTimeMs % (1000 * 60 * 60)) / (1000 * 60));
        
        let message = `Welcome back! You were away for `;
        if (hours > 0) {
          message += `${hours}h ${minutes}m`;
        } else {
          message += `${minutes}m`;
        }

        if (bambooGained > 0) {
          message += `. Gained ${Math.floor(bambooGained)} bamboo.`;
        }

        if (catchUpEventsTriggered > 0) {
          message += ` ${catchUpEventsTriggered} event(s) occurred.`;
        }

        toast.success('Offline Progress', {
          description: message,
          duration: 5000,
        });
      }
    } else {
      // Create fresh state for new players
      const freshState = createFreshState();
      loadState(freshState);
      lastTickRef.current = Date.now();

      toast.success('Welcome to Bamboo Empire!', {
        description: 'Build your panda empire and make wise financial decisions.',
        duration: 5000,
      });
    }
  }, [loadState]);

  // Game tick - runs every second
  const gameTick = useCallback(() => {
    const now = Date.now();
    const elapsed = now - lastTickRef.current;
    
    if (elapsed >= TIMING.tickIntervalMs) {
      tick(elapsed);
      lastTickRef.current = now;
    }
  }, [tick]);

  // Check for event trigger
  const checkForEvent = useCallback(() => {
    // Don't trigger new event if one is already active
    if (activeEvent) return;

    const state = useGameStore.getState();
    const now = Date.now();
    
    // Get dynamic event interval based on XP tier
    const intervalMs = getEconomicEventIntervalMs(state.xp);

    if (shouldTriggerEvent(state.lastEventCheck, now, intervalMs)) {
      // Generate and set new event
      const newEvent = generateEvent();
      setActiveEvent(newEvent);
      
      // Update last event check time
      useGameStore.setState({ lastEventCheck: now });

      toast.warning('Event triggered!', {
        description: 'Check the Events panel for details.',
        duration: 3000,
      });
    }
  }, [activeEvent, setActiveEvent]);

  // Save game state
  const saveGame = useCallback(() => {
    const state = useGameStore.getState();
    const persistable = extractPersistableState(state);
    saveGameState(persistable, userIdRef.current);
  }, []);

  // Keep userIdRef in sync
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  // Initialize game on mount or when user changes
  useEffect(() => {
    if (!initialized || (userId && userIdRef.current !== userId)) {
      initializeGame(userId);
    }
  }, [initialized, userId, initializeGame]);

  // Set up game loops
  useEffect(() => {
    if (!initialized) return;

    // Game tick loop (every second)
    tickIntervalRef.current = setInterval(gameTick, TIMING.tickIntervalMs);

    // Auto-save loop (every 10 seconds)
    saveIntervalRef.current = setInterval(saveGame, TIMING.autoSaveIntervalMs);

    // Event check loop (every 30 seconds - we check more often than trigger)
    eventCheckIntervalRef.current = setInterval(checkForEvent, 30000);

    // Initial event check
    checkForEvent();

    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
      if (eventCheckIntervalRef.current) clearInterval(eventCheckIntervalRef.current);
      
      // Save on unmount
      saveGame();
    };
  }, [initialized, gameTick, saveGame, checkForEvent]);

  // Save before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveGame();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveGame]);

  // Show loading state while initializing
  if (!initialized) {
    return (
      <div className={cn(
        "min-h-screen flex items-center justify-center",
        empireClasses.bgPrimary
      )}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#7A9B7E] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#7A9B7E] text-lg">Loading Bamboo Empire...</p>
        </div>
    </div>
  );
  }

  return <BaseView />;
};

export default EmpirePage;
