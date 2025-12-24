import { GameMeters } from '@/types/boss-game';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GameMetersDisplayProps {
  meters: GameMeters;
  previousMeters?: GameMeters;
}

const meterConfig: Array<{ key: keyof GameMeters; label: string; icon: string; color: string; description: string; invert?: boolean }> = [
  { key: 'income', label: 'Income', icon: '🪙', color: 'bg-amber-500', description: 'Weekly bamboo coins' },
  { key: 'hourlyValue', label: 'Hourly Value', icon: '⏱️', color: 'bg-emerald-500', description: 'Pay per hour' },
  { key: 'energy', label: 'Energy', icon: '⚡', color: 'bg-blue-500', description: 'Physical & mental capacity' },
  { key: 'replaceability', label: 'Replaceability', icon: '🔄', color: 'bg-red-500', description: 'Lower is better', invert: true },
  { key: 'optionality', label: 'Optionality', icon: '🚪', color: 'bg-purple-500', description: 'Future paths available' },
];

export function GameMetersDisplay({ meters, previousMeters }: GameMetersDisplayProps) {
  return (
    <div className="grid grid-cols-1 gap-3 p-4 bg-card/50 rounded-xl border border-border/50">
      <h3 className="text-sm font-medium text-muted-foreground mb-1">Status Meters</h3>
      {meterConfig.map((config) => {
        const currentValue = meters[config.key as keyof GameMeters];
        const previousValue = previousMeters?.[config.key as keyof GameMeters];
        const change = previousValue !== undefined ? currentValue - previousValue : 0;
        
        return (
          <div key={config.key} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span>{config.icon}</span>
                <span className="font-medium">{config.label}</span>
                {config.invert && (
                  <span className="text-muted-foreground text-[10px]">(lower = better)</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono">{currentValue}</span>
                {change !== 0 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "text-[10px] font-medium px-1 py-0.5 rounded",
                      config.invert
                        ? change > 0 ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                        : change > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    )}
                  >
                    {change > 0 ? '+' : ''}{change}
                  </motion.span>
                )}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", config.color)}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, currentValue))}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
