import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PandaLogo from '@/components/icons/PandaLogo';
import ProfileSettings from '@/components/profile/ProfileSettings';
import GameProgressBadge from '@/components/ui/game-progress-badge';
import PageNavigationTabs from '@/components/layout/PageNavigationTabs';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { LogOut, User, Flame, Moon, Sun } from 'lucide-react';
interface MinimalLayoutProps {
  children: React.ReactNode;
}
const MinimalLayout: React.FC<MinimalLayoutProps> = ({
  children
}) => {
  const {
    user,
    profile,
    signOut
  } = useAuth();
  const {
    isDark,
    toggleTheme
  } = useTheme();
  const isMobile = useIsMobile();
  const {
    currentStreak,
    streakMultiplier
  } = useUnifiedStreak();
  const isGuest = !user;
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500 hover:bg-green-600';
      case 'intermediate':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'advanced':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  const formatLevel = (level: string) => {
    return level === 'advanced' ? 'Pro Phil' : `${level.charAt(0).toUpperCase() + level.slice(1)} Phil`;
  };
  return <div className="min-h-screen bg-background text-foreground">
      {/* Minimal Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <PandaLogo className="h-8 w-8" />
              <span className="font-bold text-xl">Phil's Financials
            </span>
            </div>
            
            {/* User Info and Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Guest Mode - Just settings with notification */}
              {isGuest && <ProfileSettings isGuest />}

              {/* Authenticated User */}
              {user && profile && <>
                  {/* Streak Display */}
                  <div className="flex items-center space-x-1 text-sm">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{currentStreak}</span>
                    {streakMultiplier > 1 && <span className="text-xs text-orange-600">({streakMultiplier.toFixed(1)}x)</span>}
                  </div>

                  {!isMobile && <>
                      {/* User Level Badge */}
                      <Badge className={`${getLevelBadgeColor(profile.app_version)} text-white px-3 py-1`} variant="secondary">
                        {formatLevel(profile.app_version)}
                      </Badge>

                      {/* Game Progress Badge - links to Bamboo Empire */}
                      <GameProgressBadge compact />

                      {/* Username */}
                      <div className="flex items-center space-x-1 text-sm">
                        <User className="h-4 w-4" />
                        <span>{profile.username || 'User'}</span>
                      </div>
                    </>}
                  
                  {/* Profile Settings */}
                  <ProfileSettings />
                  
                  {/* Sign Out */}
                  <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>}
            </div>
          </div>
        </div>
      </header>

      {/* Page Navigation Tabs */}
      <PageNavigationTabs />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>;
};
export default MinimalLayout;