import React from "react";
import MapContent from "@/components/MapContent";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Flora = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0">
      <div className="absolute top-4 left-12 z-[999999999]">
        <button
          onClick={() => navigate(-1)}
          className="glass-effect p-2 rounded-full hover:bg-white/80 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </button>
      </div>
      <MapContent
        showFlora={true}
        showFauna={false}
        showLines={false}
        showPolygons={false}
        width="100%"
        height="100vh"
        defaultLat={-0.502106}
        defaultLng={117.153709}
        defaultZoom={7}
      />
    </div>
  );
};

export default Flora;
