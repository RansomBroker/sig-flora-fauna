import React, { useState, useMemo } from "react";
import MapContent from "@/components/MapContent";
import MapLegend, { defaultHabitatLegendItems } from "@/components/MapLegend";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Species } from "@/types/species";

const Habitat = () => {
  const navigate = useNavigate();
  const [endemicSpecies, setEndemicSpecies] = useState<Species[]>([]);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);

  const handleEndemicSpeciesChange = (species: Species[]) => {
    setEndemicSpecies(species);
  };

  const legendEndemicSpecies = useMemo(() => {
    return endemicSpecies;
  }, [endemicSpecies]);

  const toggleLegendCollapse = () => {
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
        showFlora={true}
        showFauna={true}
        showLines={true}
        showPolygons={false}
        width="100%"
        height="100vh"
        defaultTileLayer="topo"
        onEndemicSpeciesChange={handleEndemicSpeciesChange}
      />
      {/* Download Link for PDF */}
      <div
        className="absolute z-[1000] p-2 rounded-md shadow-lg"
        style={{
          bottom: isLegendCollapsed
            ? "calc(4rem + 10px)"
            : "calc(4rem + 230px)", // Adjust based on legend height and collapsed state
          right: "1rem",
          transition: "bottom 0.3s ease-in-out",
        }}
      >
        <a
          href="/peta/Peta Karakteristik Flora Fauna Berdasarkan Topografi (2).pdf"
          download
          className="glass-effect text-primary font-medium py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2"
        >
          <svg // Download Icon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.905 3.129V2.75z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
          </svg>
          Unduh Peta Topografi
        </a>
      </div>

      <MapLegend
        title="Legenda Habitat & Spesies"
        items={defaultHabitatLegendItems}
        position="bottom-right"
        defaultTileLayer="topo"
        endemicSpecies={legendEndemicSpecies}
        showPolygons={false}
        isCollapsed={isLegendCollapsed}
        onToggleCollapse={toggleLegendCollapse}
      />
    </div>
  );
};

export default Habitat;
