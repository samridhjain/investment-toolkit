
import React from 'react';
import { ChartLine } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t backdrop-blur-sm bg-background/80 animate-fade-in py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ChartLine className="h-5 w-5" />
          <span className="text-sm font-medium">Market Insight</span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Data provided for informational purposes only. Not financial advice.
        </div>
        
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Market Insight. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
