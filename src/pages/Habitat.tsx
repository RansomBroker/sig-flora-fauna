import React, { useState, useMemo } from "react";
import MapContent from "@/components/MapContent";
import MapLegend, { defaultHabitatLegendItems } from "@/components/MapLegend";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Species } from "@/types/species";

const Habitat = () => {
  const navigate = useNavigate();
  const [endemicSpecies, setEndemicSpecies] = useState<Species[]>([]);

  const handleEndemicSpeciesChange = (species: Species[]) => {
    setEndemicSpecies(species);
  };

  const legendEndemicSpecies = useMemo(() => {
    return endemicSpecies;
  }, [endemicSpecies]);

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
      <MapLegend
        title="Legenda Habitat & Spesies"
        items={defaultHabitatLegendItems}
        position="bottom-right"
        defaultTileLayer="topo"
        endemicSpecies={legendEndemicSpecies}
        showPolygons={false}
      />
    </div>
  );
};

export default Habitat;
