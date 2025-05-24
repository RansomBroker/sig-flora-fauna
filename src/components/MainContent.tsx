import React from "react";
import MainNavigation from "./MainNavigation";
import MapContent from "./MapContent";

const MainContent: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl p-6 glass-effect bg-gradient-to-r from-white via-cyan-50/20 to-blue-50/20">
        <h1 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-2">
          Peta Interaktif
        </h1>

        <MapContent
          showFlora={true}
          showFauna={true}
          showLines={false}
          showPolygons={false}
          width="100%"
          height="300px"
        />
      </div>

      <MainNavigation />
    </div>
  );
};

export default MainContent;
