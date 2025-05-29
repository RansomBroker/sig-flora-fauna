import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Rocket,
  Sparkles,
  ZapIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: JSX.Element;
  type: "button" | "collapsible";
  path?: string; // For type 'button'
  subItems?: SubMenuItem[]; // For type 'collapsible'
}

const SideNavigation = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const menuItems: MenuItem[] = [
    {
      name: "Video",
      icon: <Rocket className="h-4 w-4" />,
      type: "button",
      path: "/video",
    }, // Assuming a path for video
    {
      name: "Kuis",
      icon: <ZapIcon className="h-4 w-4" />,
      type: "collapsible",
      subItems: [
        { name: "Soal Post-test", path: "/materi/soal posttest.pdf" },
        { name: "Soal Pre-test", path: "/materi/soal pretest.pdf" },
      ],
    },
    {
      name: "Try Out",
      icon: <Sparkles className="h-4 w-4" />,
      type: "collapsible",
      subItems: [],
    },
  ];

  const toggleSection = (name: string) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex flex-col gap-3">
      {menuItems.map((item, index) => (
        <div key={index}>
          {item.type === "button" && (
            <Button
              variant="outline"
              className="flex items-center justify-between w-full p-4 glass-effect hover:bg-cyan-50/60 text-left rounded-xl group transition-all"
              // onClick={() => item.path && navigate(item.path)} // Add navigation if needed
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </div>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </Button>
          )}
          {item.type === "collapsible" && (
            <>
              <div
                onClick={() => toggleSection(item.name)}
                className="flex items-center justify-between w-full p-4 glass-effect hover:bg-cyan-50/60 text-left rounded-xl group transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                {openSections[item.name] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              {openSections[item.name] && (
                <div className="pl-4 pr-2 py-2 mt-1 space-y-2 glass-effect rounded-md ml-4">
                  {item.subItems && item.subItems.length > 0 ? (
                    item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 text-sm hover:bg-cyan-50/30 rounded-md transition-all text-gray-700 hover:text-primary"
                      >
                        - {subItem.name}
                      </a>
                    ))
                  ) : (
                    <p className="p-2 text-sm text-gray-500">Segera hadir.</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      <div className="mt-6 p-4 rounded-xl glass-effect bg-gradient-to-br from-cyan-50/30 to-indigo-50/30">
        <h3 className="text-sm font-medium text-primary mb-1">Tip</h3>
        <p className="text-xs text-gray-600">
          Jelajahi peta interaktif untuk melihat persebaran flora dan fauna di
          seluruh Indonesia
        </p>
      </div>
    </div>
  );
};

export default SideNavigation;
