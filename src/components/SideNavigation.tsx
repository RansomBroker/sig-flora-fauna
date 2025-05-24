
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Rocket, Sparkles, ZapIcon } from 'lucide-react';

const SideNavigation = () => {
  const menuItems = [
    { name: "Video", icon: <Rocket className="h-4 w-4" /> },
    { name: "Kuis", icon: <ZapIcon className="h-4 w-4" /> },
    { name: "Try Out", icon: <Sparkles className="h-4 w-4" /> }
  ];
  
  return (
    <div className="flex flex-col gap-3">
      {menuItems.map((item, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex items-center justify-between w-full p-4 glass-effect hover:bg-cyan-50/60 text-left rounded-xl group transition-all"
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </div>
          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
        </Button>
      ))}
      
      <div className="mt-6 p-4 rounded-xl glass-effect bg-gradient-to-br from-cyan-50/30 to-indigo-50/30">
        <h3 className="text-sm font-medium text-primary mb-1">Tip</h3>
        <p className="text-xs text-gray-600">
          Jelajahi peta interaktif untuk melihat persebaran flora dan fauna di seluruh Indonesia
        </p>
      </div>
    </div>
  );
};

export default SideNavigation;
