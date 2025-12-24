/**
 * EventPanel Component
 * 
 * Displays active events and their effects on the empire.
 */

import React from 'react';
import { AlertTriangle, Zap, Gift } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { empireClasses } from '@/config/empireTheme';
import { cn } from '@/lib/utils';

const EVENT_LABELS: Record<string, { name: string; description: string }> = {
  unexpectedExpense: {
    name: 'Unexpected Expense',
    description: 'An emergency expense is draining your bamboo reserves.',
  },
  burnout: {
    name: 'Burnout',
    description: 'Your pandas are exhausted and need rest.',
  },
  incomeBoost: {
    name: 'Income Boost',
    description: 'A temporary boost is increasing your production!',
  },
  taxSeason: {
    name: 'Tax Season',
    description: 'Time to pay your taxes - production is reduced.',
  },
};

const EventPanel: React.FC = () => {
  const activeEvent = useGameStore(state => state.activeEvent);
  const activeModifiers = useGameStore(state => state.activeModifiers);

  if (!activeEvent && activeModifiers.length === 0) {
    return (
      <div className={cn(
        "p-4 rounded-xl border",
        empireClasses.bgCard,
        empireClasses.borderDefault
      )}>
        <h3 className={cn(
          "text-sm font-medium mb-2 flex items-center gap-2",
          empireClasses.textPrimary
        )}>
          <Zap className="h-4 w-4 text-[#7A9B7E]" />
          Events
        </h3>
        <p className={cn("text-xs", empireClasses.textSecondary)}>
          No active events. Keep growing your empire!
        </p>
      </div>
    );
  }

  const eventInfo = activeEvent ? EVENT_LABELS[activeEvent.type] : null;
  const isDangerEvent = activeEvent?.type === 'unexpectedExpense' || activeEvent?.type === 'burnout';

  return (
    <div className={cn(
      "p-4 rounded-xl border",
      empireClasses.bgCard,
      empireClasses.borderDefault
    )}>
      <h3 className={cn(
        "text-sm font-medium mb-3 flex items-center gap-2",
        empireClasses.textPrimary
      )}>
        <Zap className="h-4 w-4 text-[#7A9B7E]" />
        Active Events
      </h3>
      
      <div className="space-y-3">
        {activeEvent && eventInfo && (
          <div className={cn(
            "p-3 rounded-lg border",
            isDangerEvent
              ? "bg-red-500/10 border-red-500/30"
              : "bg-[#7A9B7E]/10 border-[#7A9B7E]/30"
          )}>
            <div className="flex items-start gap-2">
              {isDangerEvent ? (
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
              ) : (
                <Gift className="h-4 w-4 text-[#7A9B7E] mt-0.5" />
              )}
              <div>
                <p className={cn("text-sm font-medium", empireClasses.textPrimary)}>
                  {eventInfo.name}
                </p>
                <p className={cn("text-xs mt-1", empireClasses.textSecondary)}>
                  {eventInfo.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeModifiers.length > 0 && (
          <div className="space-y-2">
            <p className={cn("text-xs font-medium", empireClasses.textSecondary)}>
              Active Modifiers:
            </p>
            {activeModifiers.map((modifier) => (
              <div 
                key={modifier.id}
                className={cn(
                  "text-xs px-2 py-1 rounded",
                  "bg-[#6B4E3D]/10 text-[#6B4E3D]"
                )}
              >
                {modifier.description}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPanel;
