/**
 * ImprovementsPanel Component
 * 
 * Displays available improvements organized by category.
 */

import React, { useEffect, useState } from 'react';
import { 
  Building, 
  Zap, 
  Shield, 
  ArrowUp, 
  Lock,
  ChevronDown,
  ChevronUp,
  Sprout,
  Droplets,
  Recycle,
  Store,
  FlaskConical,
  Waves,
  Eye,
  Cog,
  GitBranch,
  FileCheck,
  Boxes,
  GraduationCap,
  CloudRain,
  Flame,
  FileWarning
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import { useImprovementsStore, initializeImprovementsStore } from '@/store/useImprovementsStore';
import { 
  ImprovementType, 
  ImprovementCategory,
  IMPROVEMENTS, 
  getImprovementStats,
} from '@/config/gameConfig';
import { empireClasses } from '@/config/empireTheme';
import { toast } from 'sonner';

// Icon mapping for improvements
const IMPROVEMENT_ICONS: Record<ImprovementType, React.ReactNode> = {
  greenhouseDome: <Sprout className="h-4 w-4" />,
  irrigationChannels: <Droplets className="h-4 w-4" />,
  compostYard: <Recycle className="h-4 w-4" />,
  tradePost: <Store className="h-4 w-4" />,
  researchHut: <FlaskConical className="h-4 w-4" />,
  reservoir: <Waves className="h-4 w-4" />,
  watchtower: <Eye className="h-4 w-4" />,
  automationI: <Cog className="h-4 w-4" />,
  automationII: <Cog className="h-4 w-4" />,
  automationIII: <Cog className="h-4 w-4" />,
  diversification: <GitBranch className="h-4 w-4" />,
  hedgingContracts: <FileCheck className="h-4 w-4" />,
  supplyChainBuffer: <Boxes className="h-4 w-4" />,
  laborTraining: <GraduationCap className="h-4 w-4" />,
  stormReinforcement: <CloudRain className="h-4 w-4" />,
  firebreakLines: <Flame className="h-4 w-4" />,
  complianceOffice: <FileWarning className="h-4 w-4" />,
};

const CATEGORY_INFO: Record<ImprovementCategory, { name: string; icon: React.ReactNode; color: string }> = {
  permanentBuilding: { 
    name: 'Buildings', 
    icon: <Building className="h-5 w-5" />,
    color: '#7A9B7E',
  },
  upgrade: { 
    name: 'Upgrades', 
    icon: <Zap className="h-5 w-5" />,
    color: '#B8873A',
  },
  defense: { 
    name: 'Risk Defenses', 
    icon: <Shield className="h-5 w-5" />,
    color: '#6B4E3D',
  },
  consumable: { 
    name: 'Consumables', 
    icon: <Boxes className="h-5 w-5" />,
    color: '#5A9B5E',
  },
};

const ImprovementsPanel: React.FC = () => {
  const bamboo = useGameStore(state => state.bamboo);
  const xp = useGameStore(state => state.xp);
  const addBamboo = useGameStore(state => state.addBamboo);
  
  const improvementsStore = useImprovementsStore();
  const [openCategories, setOpenCategories] = useState<Record<ImprovementCategory, boolean>>({
    permanentBuilding: true,
    upgrade: false,
    defense: false,
    consumable: false,
  });
  
  // Initialize on mount
  useEffect(() => {
    initializeImprovementsStore();
  }, []);
  
  const handlePurchase = (type: ImprovementType) => {
    const result = improvementsStore.purchaseImprovement(type, bamboo, xp);
    
    if (result.success) {
      // Deduct bamboo
      addBamboo(-result.cost, 'improvement_purchase');
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  
  const toggleCategory = (category: ImprovementCategory) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  
  // Group improvements by category
  const improvementsByCategory = (Object.entries(IMPROVEMENTS) as [ImprovementType, typeof IMPROVEMENTS[ImprovementType]][])
    .reduce((acc, [type, config]) => {
      if (!acc[config.category]) {
        acc[config.category] = [];
      }
      acc[config.category].push({ type, config });
      return acc;
    }, {} as Record<ImprovementCategory, { type: ImprovementType; config: typeof IMPROVEMENTS[ImprovementType] }[]>);
  
  // Calculate total bonuses for display
  const totalProductionBonus = improvementsStore.getTotalProductionBonus();
  const totalDamageReduction = improvementsStore.getEventDamageReduction();
  
  return (
    <Card className={cn(empireClasses.card)}>
      <CardHeader className="pb-2">
        <CardTitle className={cn("text-lg flex items-center justify-between", empireClasses.textPrimary)}>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-[#7A9B7E]" />
            Improvements
          </div>
          <div className="flex gap-2">
            {totalProductionBonus > 0 && (
              <Badge className="bg-[#5A9B5E]/20 text-[#3D7040] border-[#5A9B5E]/30 text-xs">
                +{totalProductionBonus}% prod
              </Badge>
            )}
            {totalDamageReduction > 0 && (
              <Badge className="bg-[#6B4E3D]/20 text-[#6B4E3D] border-[#6B4E3D]/30 text-xs">
                -{totalDamageReduction}% dmg
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {(Object.keys(CATEGORY_INFO) as ImprovementCategory[])
          .filter(category => improvementsByCategory[category]?.length > 0)
          .map(category => {
            const categoryInfo = CATEGORY_INFO[category];
            const items = improvementsByCategory[category] || [];
            const ownedCount = items.filter(i => improvementsStore.getLevel(i.type) > 0).length;
            
            return (
              <Collapsible
                key={category}
                open={openCategories[category]}
                onOpenChange={() => toggleCategory(category)}
              >
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-150",
                      empireClasses.bgSecondary,
                      empireClasses.borderDefault,
                      "hover:border-[#B8CDB9]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: categoryInfo.color }}>
                        {categoryInfo.icon}
                      </span>
                      <span className={cn("font-medium", empireClasses.textPrimary)}>
                        {categoryInfo.name}
                      </span>
                      {ownedCount > 0 && (
                        <Badge className="bg-[#7A9B7E]/20 text-[#4F6F57] border-[#7A9B7E]/30 text-xs">
                          {ownedCount} owned
                        </Badge>
                      )}
                    </div>
                    {openCategories[category] ? (
                      <ChevronUp className="h-4 w-4 text-[#7A8A7E]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#7A8A7E]" />
                    )}
                  </button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="pt-2 space-y-2">
                  {items.map(({ type, config }) => {
                    const currentLevel = improvementsStore.getLevel(type);
                    const isMaxLevel = currentLevel >= config.maxLevel;
                    const check = improvementsStore.canPurchase(type, bamboo, xp);
                    const nextStats = !isMaxLevel ? getImprovementStats(type, currentLevel + 1) : null;
                    const currentStats = currentLevel > 0 ? getImprovementStats(type, currentLevel) : null;
                    
                    return (
                      <div
                        key={type}
                        className={cn(
                          "p-3 rounded-lg border",
                          empireClasses.bgCard,
                          empireClasses.borderSubtle
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span style={{ color: categoryInfo.color }}>
                              {IMPROVEMENT_ICONS[type]}
                            </span>
                            <div>
                              <h4 className={cn("text-sm font-medium", empireClasses.textPrimary)}>
                                {config.name}
                              </h4>
                              <p className={cn("text-xs", empireClasses.textMuted)}>
                                {config.description}
                              </p>
                            </div>
                          </div>
                          {currentLevel > 0 && (
                            <Badge 
                              className="text-xs"
                              style={{ 
                                backgroundColor: `${categoryInfo.color}20`,
                                color: categoryInfo.color,
                                borderColor: `${categoryInfo.color}30`,
                              }}
                            >
                              Lv.{currentLevel}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Current effect */}
                        {currentStats && (
                          <div className={cn(
                            "text-xs p-2 rounded mb-2",
                            "bg-[#5A9B5E]/10 text-[#3D7040]"
                          )}>
                            Current: {currentStats.effect}
                          </div>
                        )}
                        
                        {/* Level progress */}
                        {config.maxLevel > 1 && (
                          <div className="mb-2">
                            <Progress 
                              value={(currentLevel / config.maxLevel) * 100} 
                              className="h-1 bg-[#E4EBE4]"
                            />
                          </div>
                        )}
                        
                        {/* Upgrade button or max level */}
                        {isMaxLevel ? (
                          <div className={cn(
                            "text-xs text-center p-2 rounded",
                            "bg-[#B8873A]/10 text-[#8B6520]"
                          )}>
                            Max Level
                          </div>
                        ) : nextStats && (
                          <div className="space-y-1">
                            <div className={cn("text-xs", empireClasses.textMuted)}>
                              Next: {nextStats.effect}
                            </div>
                            <Button
                              onClick={() => handlePurchase(type)}
                              disabled={!check.canPurchase}
                              size="sm"
                              className={cn(
                                "w-full gap-1 text-xs transition-all duration-150",
                                check.canPurchase
                                  ? "bg-[#7A9B7E] hover:bg-[#4F6F57] text-white"
                                  : "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
                              )}
                            >
                              {check.canPurchase ? (
                                <>
                                  <ArrowUp className="h-3 w-3" />
                                  {currentLevel === 0 ? 'Buy' : 'Upgrade'} ({nextStats.cost} 🎋)
                                </>
                              ) : (
                                <>
                                  <Lock className="h-3 w-3" />
                                  {check.reason}
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default ImprovementsPanel;

