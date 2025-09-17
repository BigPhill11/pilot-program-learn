import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Lock, 
  Target,
  TrendingUp,
  Search,
  PlayCircle,
  BarChart3,
  Users,
  X
} from 'lucide-react';
import { useAdminMode } from '@/contexts/AdminModeContext';
import { moduleRegistry, getModuleById } from '@/data/ModuleRegistry';

interface AdminNavigationPanelProps {
  onNavigateToTab?: (tabValue: string) => void;
}

const iconMap = {
  Target,
  TrendingUp,
  Search,
  PlayCircle,
  BarChart3,
  Users
};

const AdminNavigationPanel: React.FC<AdminNavigationPanelProps> = ({ onNavigateToTab }) => {
  const { 
    isAdminModeActive, 
    jumpToLevel, 
    currentAdminPath, 
    setCurrentAdminPath,
    isPreviewMode,
    setPreviewMode 
  } = useAdminMode();
  
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  if (!isAdminModeActive) return null;

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleLevelClick = (moduleId: string, levelId: number) => {
    jumpToLevel(moduleId, levelId);
    
    // Navigate to the appropriate tab
    const module = getModuleById(moduleId);
    if (module && onNavigateToTab) {
      onNavigateToTab(module.targetTab);
    }
  };

  const exitPreviewMode = () => {
    setCurrentAdminPath(null);
    setPreviewMode(false);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: 'border-purple-200 bg-purple-50',
      blue: 'border-blue-200 bg-blue-50',
      emerald: 'border-emerald-200 bg-emerald-50',
      orange: 'border-orange-200 bg-orange-50',
      indigo: 'border-indigo-200 bg-indigo-50',
      rose: 'border-rose-200 bg-rose-50'
    };
    return colorMap[color as keyof typeof colorMap] || 'border-gray-200 bg-gray-50';
  };

  return (
    <>
      {/* Toggle Button */}
      {!isVisible && (
        <Button
          onClick={() => setIsVisible(true)}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
          size="sm"
        >
          Admin Panel
        </Button>
      )}

      {/* Admin Panel */}
      {isVisible && (
        <div className="fixed left-0 top-0 h-full w-80 bg-white border-r shadow-xl z-50 flex flex-col">
          <div className="p-4 border-b bg-orange-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-orange-800">Admin Navigation</h2>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {isPreviewMode && currentAdminPath && (
              <div className="mt-2 flex items-center justify-between">
                <Badge variant="default" className="bg-orange-600">
                  Preview: {currentAdminPath}
                </Badge>
                <Button
                  onClick={exitPreviewMode}
                  variant="outline"
                  size="sm"
                >
                  Exit Preview
                </Button>
              </div>
            )}
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {moduleRegistry.map((module) => {
                const isOpen = openModules.includes(module.id);
                const IconComponent = iconMap[module.icon as keyof typeof iconMap] || Target;

                return (
                  <Card key={module.id} className={getColorClasses(module.color)}>
                    <Collapsible 
                      open={isOpen} 
                      onOpenChange={() => toggleModule(module.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer py-3 hover:bg-white/50 transition-colors">
                          <CardTitle className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              {module.name}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {module.levels.length} levels
                              </Badge>
                              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </div>
                          </CardTitle>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0 space-y-2">
                          {module.levels.map((level) => {
                            const isCurrentLevel = currentAdminPath === `${module.id}-${level.id}`;
                            
                            return (
                              <Button
                                key={level.id}
                                onClick={() => handleLevelClick(module.id, level.id)}
                                variant={isCurrentLevel ? 'default' : 'ghost'}
                                className="w-full justify-start text-left h-auto p-3"
                              >
                                <div className="flex items-start gap-3 w-full">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {isCurrentLevel ? (
                                      <Play className="h-4 w-4" />
                                    ) : (
                                      <span className="text-xs font-medium bg-gray-200 rounded-full h-5 w-5 flex items-center justify-center">
                                        {level.id}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm">{level.title}</div>
                                    <div className="text-xs text-muted-foreground line-clamp-2">
                                      {level.description}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs text-muted-foreground">
                                        {level.activities} activities
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {level.estimatedTime}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Button>
                            );
                          })}
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Click any level to preview instantly</p>
              <p>• Admin mode bypasses all restrictions</p>
              <p>• Progress is not affected in preview mode</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavigationPanel;