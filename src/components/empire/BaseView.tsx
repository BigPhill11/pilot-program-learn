/**
 * BaseView Component
 * 
 * Main game view layout with all cards and panels.
 * Updated with light green / sage / brown theme.
 */

import React from 'react';
import { Building2, Shield, Leaf, Cloud } from 'lucide-react';
import TopBar from './TopBar';
import BuildingCard from './BuildingCard';
import DefenseCard from './DefenseCard';
import EventPanel from './EventPanel';
import ActionsPanel from './ActionsPanel';
import CreditPanel from './CreditPanel';
import ImprovementsPanel from './ImprovementsPanel';
import { BuildingType, DefenseType } from '@/config/gameConfig';
import { useGameStore } from '@/store/useGameStore';
import { 
  empireClasses, 
  getEconomicWeather, 
  WEATHER_LABELS,
  EMPIRE_THEME 
} from '@/config/empireTheme';
import { cn } from '@/lib/utils';

const BUILDINGS: BuildingType[] = ['bambooFarm', 'bambooStorage', 'pandaHouse', 'workshop'];
const DEFENSES: DefenseType[] = ['emergencyFund', 'diversificationBarrier', 'energyShield'];

const BaseView: React.FC = () => {
  const activeModifiers = useGameStore(state => state.activeModifiers);
  const activeEvent = useGameStore(state => state.activeEvent);
  
  // Determine economic weather based on active modifiers and events
  const hasDangerEvent = activeEvent?.type === 'unexpectedExpense' || activeEvent?.type === 'burnout';
  const weather = getEconomicWeather(activeModifiers.length, hasDangerEvent);
  
  const weatherStyles = {
    normal: empireClasses.weatherNormal,
    tense: empireClasses.weatherTense,
    crisis: empireClasses.weatherCrisis,
  };

  return (
    <div className={cn(
      "min-h-screen",
      empireClasses.bgPrimary,
      "relative"
    )}>
      {/* Subtle grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Top Bar */}
      <TopBar />

      {/* Economic Weather Banner */}
      <div className={cn(
        "border-b px-4 py-2 flex items-center justify-center gap-2 transition-all duration-150",
        weatherStyles[weather]
      )}>
        <Cloud className="h-4 w-4" />
        <span className="text-sm font-medium">{WEATHER_LABELS[weather]}</span>
        {weather !== 'normal' && (
          <span className="text-xs opacity-75">
            ({activeModifiers.length} active effect{activeModifiers.length !== 1 ? 's' : ''})
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Buildings & Defenses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Buildings Section */}
            <section>
              <h2 className={cn(
                "text-xl font-bold mb-4 flex items-center gap-2",
                empireClasses.textPrimary
              )}>
                <Building2 className="h-5 w-5 text-[#7A9B7E]" />
                Buildings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BUILDINGS.map(type => (
                  <BuildingCard key={type} type={type} />
                ))}
              </div>
            </section>

            {/* Defenses Section */}
            <section>
              <h2 className={cn(
                "text-xl font-bold mb-4 flex items-center gap-2",
                empireClasses.textPrimary
              )}>
                <Shield className="h-5 w-5 text-[#6B4E3D]" />
                Defenses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DEFENSES.map(type => (
                  <DefenseCard key={type} type={type} />
                ))}
              </div>
            </section>
            
            {/* Improvements Section */}
            <section>
              <ImprovementsPanel />
            </section>

            {/* Actions Panel - visible on mobile below buildings */}
            <div className="lg:hidden">
              <ActionsPanel />
            </div>
          </div>

          {/* Right Column - Events & Actions */}
          <div className="space-y-6">
            {/* Event Panel */}
            <EventPanel />

            {/* Actions Panel - hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <ActionsPanel />
            </div>
            
            {/* Credit Panel */}
            <CreditPanel />

            {/* Game Tips */}
            <div className={cn(
              "p-4 rounded-xl border",
              empireClasses.bgCard,
              empireClasses.borderDefault
            )}>
              <h3 className={cn(
                "text-sm font-medium mb-2 flex items-center gap-2",
                "text-[#7A9B7E]"
              )}>
                <Leaf className="h-4 w-4" />
                Tips
              </h3>
              <ul className={cn("text-xs space-y-1", empireClasses.textSecondary)}>
                <li>• Upgrade Bamboo Farm first for steady income</li>
                <li>• Don't rush Panda House upgrades - drain can hurt!</li>
                <li>• Build defenses to reduce event damage</li>
                <li>• Keep energy above 60% for full production</li>
                <li>• Complete lessons and quizzes to earn more bamboo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseView;
