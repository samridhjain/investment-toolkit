
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChartLine, Briefcase, Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'Morning Call', path: '/', icon: <ChartLine className="h-4 w-4 mr-2" /> },
    { name: 'Investment Toolkit', path: '/toolkit', icon: <Briefcase className="h-4 w-4 mr-2" /> }
  ];

  const NavItems = () => (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            'flex items-center px-4 py-2 rounded-md transition-all duration-200',
            'hover:bg-secondary',
            isActive ? 'bg-secondary font-medium' : 'text-muted-foreground'
          )}
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-sm bg-background/80 animate-fade-in">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <NavLink 
            to="/" 
            className="flex items-center gap-2 font-medium transition-all duration-300 hover:opacity-80"
          >
            <ChartLine className="h-6 w-6" />
            <span className="text-xl font-semibold tracking-tight">Market Insight</span>
          </NavLink>
        </div>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-2 mt-8">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center">
            <nav className="mx-6 flex items-center gap-2">
              <NavItems />
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
