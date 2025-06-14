
import React from 'react';
import { Link } from 'react-router-dom';
import PandaLogo from './icons/PandaLogo';
import { Button } from '@/components/ui/button'; // Using shadcn button

const Navbar = () => {
  return (
    <header className="bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PandaLogo className="h-8 w-8 text-green-600" />
            <span className="font-semibold text-xl text-foreground">Phil's Financials</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/learn">Learn</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/paper-trading">Paper Trading</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/#sources">Sources</Link> {/* Placeholder link for now */}
            </Button>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button can be added here later */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

