
import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
} from './ui/popover';
import { Checkbox } from './ui/checkbox';

const TopNavigation = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="pl-4 pr-5 py-2 font-medium glass-effect hover:bg-cyan-50/60 transition flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Filter Wilayah
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 glass-effect">
            <h3 className="font-medium text-sm mb-3">Pilih Wilayah</h3>
            <div className="space-y-2">
              {['Jawa', 'Sumatra', 'Kalimantan', 'Sulawesi', 'Papua'].map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox id={region} />
                  <label htmlFor={region} className="text-sm">{region}</label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="relative w-full md:w-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Cari peta..."
            className="pl-10 pr-4 py-2 rounded-xl glass-effect w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition"
          />
          <Search className="h-4 w-4 text-gray-500 absolute left-3" />
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
