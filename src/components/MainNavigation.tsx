import React, { useState } from "react";
import CategoryDetail from "./CategoryDetail";

const MainNavigation = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "Persebaran"
  );

  const categories = [
    "Home",
    "Tujuan dan materi umum",
    "Persebaran",
    "Interaktifitas",
    "Icon/Simbol",
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((item) => (
          <button
            key={item}
            className={`rounded-xl py-3 px-2 transition-all duration-200 text-center font-medium
              ${
                activeCategory === item
                  ? "bg-gradient-to-r from-primary/90 to-secondary/90 text-white shadow-lg"
                  : "glass-effect hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50"
              }`}
            onClick={() => handleCategoryClick(item)}
          >
            <span className="text-sm md:text-base">{item}</span>
          </button>
        ))}
      </div>

      {activeCategory === "Persebaran" && <CategoryDetail />}
    </div>
  );
};

export default MainNavigation;
