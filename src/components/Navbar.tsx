import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PandaLogo from '@/components/icons/PandaLogo';
import ProfileSettings from '@/components/profile/ProfileSettings';
import GameProgressBadge from '@/components/ui/game-progress-badge';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { useOnboarding } from '@/hooks/useOnboarding';
import { LogOut, User, Flame, Moon, Sun, Menu, RotateCcw } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

const Navbar = () => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { currentStreak, streakMultiplier } = useUnifiedStreak();
  const { resetTour } = useOnboarding();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Learn', path: '/learn' },
    { label: 'Soft Skills', path: '/soft-skills' },
    { label: 'Phil\'s Friends', path: '/phils-friends' },
    { label: 'Ask Phil', path: '/ask-phil' },
  ];

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'personal-finance': return 'bg-green-500 hover:bg-green-600';
      case 'market-intelligence': return 'bg-yellow-500 hover:bg-yellow-600'; 
      case 'careers-in-finance': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const formatLevel = (level: string) => {
    if (!level) return 'New Phil';
    const trackNames: Record<string, string> = {
      'personal-finance': 'Finance Phil',
      'market-intelligence': 'Market Phil',
      'careers-in-finance': 'Pro Phil'
    };
    return trackNames[level] || level.charAt(0).toUpperCase() + level.slice(1);
  };

  const handleRestartTour = async () => {
    await resetTour();
    toast.success('Tour reset! Refresh the page to restart.');
    setIsMenuOpen(false);
  };

  const placementTrack = profile ? (profile as any).placement_track : null;

  const MobileMenu = () => (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 mt-8">
          {/* User Info */}
          {user && profile && (
            <div className="flex flex-col space-y-3 pb-4 border-b">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{profile.username || 'User'}</span>
              </div>
              
              {placementTrack && (
                <Badge 
                  className={`${getLevelBadgeColor(placementTrack)} text-white px-3 py-1 w-fit`}
                  variant="secondary"
                >
                  {formatLevel(placementTrack)}
                </Badge>
              )}
              
              <GameProgressBadge />
              
              <div className="flex items-center space-x-1 text-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{currentStreak} day streak</span>
                {streakMultiplier > 1 && (
                  <Badge variant="secondary" className="text-xs ml-1">
                    {streakMultiplier.toFixed(1)}x
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {/* Navigation Items */}
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-colors hover:text-primary p-3 rounded-lg ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex flex-col space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Restart Tour</span>
              <Button variant="ghost" size="sm" onClick={handleRestartTour}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Settings</span>
              <ProfileSettings />
            </div>
            
            {user && (
              <Button
                variant="ghost"
                onClick={signOut}
                className="justify-start text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  if (isMobile) {
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <PandaLogo className="h-8 w-8" />
              <span className="font-bold text-lg">Phil's Financials</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              {user && profile && (
                <div className="flex items-center space-x-1 text-sm">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{currentStreak}</span>
                  {streakMultiplier > 1 && (
                    <span className="text-xs text-orange-600">({streakMultiplier.toFixed(1)}x)</span>
                  )}
                </div>
              )}
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PandaLogo className="h-8 w-8" />
            <span className="font-bold text-xl">Phil's Financials</span>
          </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Restart Tour Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRestartTour}
            title="Restart Tour"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user && profile && (
            <>
              {/* User Level Badge */}
              {placementTrack && (
                <Badge 
                  className={`${getLevelBadgeColor(placementTrack)} text-white px-3 py-1`}
                  variant="secondary"
                >
                  {formatLevel(placementTrack)}
                </Badge>
              )}

              {/* Game Progress Badge - links to Bamboo Empire */}
              <GameProgressBadge compact />

              {/* Streak Display */}
              <div className="flex items-center space-x-1 text-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{currentStreak}</span>
                {streakMultiplier > 1 && (
                  <span className="text-xs text-orange-600">({streakMultiplier.toFixed(1)}x)</span>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-sm">
                  <User className="h-4 w-4" />
                  <span>{profile.username || 'User'}</span>
                </div>
                
                {/* Profile Settings */}
                <ProfileSettings />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
