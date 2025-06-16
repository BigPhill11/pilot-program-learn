
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from '@/components/ui/progress';
import { Menu, X, User, LogOut, Award, Flame } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getLevelProgress = () => {
    if (!profile) return 0;
    return profile.level_progress || 0;
  };

  const getLevelName = (level: string) => {
    switch (level) {
      case 'beginner': return 'Beginner Phil';
      case 'intermediate': return 'Intermediate Phil';
      case 'advanced': return 'Advanced Phil';
      default: return 'Beginner Phil';
    }
  };

  const getNextLevel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Intermediate Phil';
      case 'intermediate': return 'Advanced Phil';
      case 'advanced': return 'Pro Phil';
      default: return 'Intermediate Phil';
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <PandaLogo className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-gray-900">Phil Finance</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            <Link to="/learn" className="text-gray-700 hover:text-primary font-medium">
              Learn
            </Link>
            <Link to="/paper-trading" className="text-gray-700 hover:text-primary font-medium">
              Paper Trading
            </Link>
            <Link to="/ask-phil" className="text-gray-700 hover:text-primary font-medium">
              Ask Phil
            </Link>
            
            {user && profile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {profile.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-medium leading-none">
                        {profile.username || user.email?.split('@')[0]}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium">
                            {getLevelName(profile.app_version)}
                          </span>
                          <span className="text-muted-foreground">
                            {getLevelProgress()}% to {getNextLevel(profile.app_version)}
                          </span>
                        </div>
                        <Progress value={getLevelProgress()} className="h-1.5 mt-1" />
                      </div>
                      
                      {profile.current_streak > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-orange-600">
                          <Flame className="h-3 w-3" />
                          <span>{profile.current_streak} day streak!</span>
                        </div>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Award className="mr-2 h-4 w-4" />
                    <span>Achievements</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/learn"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsOpen(false)}
            >
              Learn
            </Link>
            <Link
              to="/paper-trading"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsOpen(false)}
            >
              Paper Trading
            </Link>
            <Link
              to="/ask-phil"
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsOpen(false)}
            >
              Ask Phil
            </Link>
            
            {user && profile && (
              <>
                <div className="px-3 py-2 border-t">
                  <div className="text-sm font-medium">
                    {profile.username || user.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getLevelName(profile.app_version)}
                  </div>
                  {profile.current_streak > 0 && (
                    <div className="flex items-center space-x-1 text-xs text-orange-600 mt-1">
                      <Flame className="h-3 w-3" />
                      <span>{profile.current_streak} day streak!</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary font-medium"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
