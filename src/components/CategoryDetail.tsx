import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryDetailProps {
  contentType: "persebaran" | "interaktifitas";
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ contentType }) => {
  const navigate = useNavigate();

  let categories = [];
  if (contentType === "persebaran") {
    categories = [
      { name: "Flora", icon: "🌿", path: "/flora" },
      { name: "Fauna", icon: "🦁", path: "/fauna" },
    ];
  } else if (contentType === "interaktifitas") {
    categories = [
      { name: "Tipe Habitat", icon: "🏞️", path: "/habitat" },
      { name: "Jenis", icon: "🧬", path: "/zonahabitat" },
    ];
  }

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center group hover-scale cursor-pointer"
          onClick={() => handleCategoryClick(category.path)}
        >
          <div className="glass-effect rounded-xl p-4 flex-grow text-center group-hover:border-primary/30 group-hover:bg-gradient-to-r group-hover:from-cyan-50/50 group-hover:to-blue-50/50 transition-all">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
              <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryDetail;
