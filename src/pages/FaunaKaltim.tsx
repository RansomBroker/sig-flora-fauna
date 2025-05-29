import React, { useState, useMemo } from "react";
import MapContent from "@/components/MapContent";
import MapLegend, { defaultFaunaLegendItems } from "@/components/MapLegend";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Species } from "@/types/species";

const FaunaKaltim = () => {
  const navigate = useNavigate();
  const [endemicSpecies, setEndemicSpecies] = useState<Species[]>([]);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false); // For MapLegend prop

  const handleEndemicSpeciesChange = (species: Species[]) => {
    // Filter for Kaltim fauna to display in legend
    const kaltimFauna = species.filter(
      (s) => s.province === "Kalimantan Timur" && s.type === "fauna"
    );
    setEndemicSpecies(kaltimFauna);
  };

  const toggleLegendCollapse = () => {
    // For MapLegend prop
    setIsLegendCollapsed(!isLegendCollapsed);
  };

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
        showFlora={false}
        showFauna={true}
        showLines={false}
        showPolygons={true}
        width="100%"
        height="100vh"
        defaultLat={-0.392603} // Kaltim center
        defaultLng={117.121587} // Kaltim center
        defaultZoom={7} // Zoom to Kaltim
        onEndemicSpeciesChange={handleEndemicSpeciesChange}
        highlightProvince="Kalimantan Timur"
      />
      <MapLegend
        title="Legenda Fauna Kaltim"
        items={defaultFaunaLegendItems}
        position="bottom-right"
        endemicSpecies={endemicSpecies}
        isCollapsed={isLegendCollapsed}
        onToggleCollapse={toggleLegendCollapse}
        showPolygons={false}
      />
    </div>
  );
};

export default FaunaKaltim;
