
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PandaLogo from '@/components/icons/PandaLogo';
import ProfileSettings from '@/components/profile/ProfileSettings';
import { useAuth } from '@/hooks/useAuth';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { LogOut, User, Trophy, Flame } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { progress } = useProgressTracking();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Learn', path: '/learn' },
    { label: 'Soft Skills', path: '/soft-skills' },
    { label: 'Paper Trading', path: '/paper-trading' },
    { label: 'Ask Phil', path: '/ask-phil' },
  ];

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500 hover:bg-green-600';
      case 'intermediate': return 'bg-yellow-500 hover:bg-yellow-600'; 
      case 'advanced': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const formatLevel = (level: string) => {
    return level === 'advanced' ? 'Pro Phil' : `${level.charAt(0).toUpperCase() + level.slice(1)} Phil`;
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PandaLogo className="h-8 w-8" />
            <span className="font-bold text-xl">Phil Finance</span>
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

          {user && profile && (
            <div className="flex items-center space-x-4">
              {/* User Level Badge */}
              <Badge 
                className={`${getLevelBadgeColor(profile.app_version)} text-white px-3 py-1`}
                variant="secondary"
              >
                {formatLevel(profile.app_version)}
              </Badge>

              {/* Points Display */}
              <div className="flex items-center space-x-1 text-sm">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{progress.total_points}</span>
              </div>

              {/* Streak Display */}
              <div className="flex items-center space-x-1 text-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{profile.current_streak}</span>
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
