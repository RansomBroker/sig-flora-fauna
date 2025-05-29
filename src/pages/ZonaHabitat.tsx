import React, { useState, useMemo } from "react";
import MapContent from "@/components/MapContent";
import MapLegend from "@/components/MapLegend"; // No specific items needed for main legend
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Species } from "@/types/species"; // Keep for endemicSpecies prop type consistency

const ZonaHabitat = () => {
  const navigate = useNavigate();
  // Endemic species state and handler, though not strictly used for legend items, MapLegend expects the prop
  const [endemicSpecies, setEndemicSpecies] = useState<Species[]>([]);

  const handleEndemicSpeciesChange = (species: Species[]) => {
    setEndemicSpecies(species);
  };

  const legendEndemicSpecies = useMemo(() => {
    return endemicSpecies; // Pass through, not used for items here but MapLegend expects it
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
        showPolygons={true}
        width="100%"
        height="100vh"
        defaultZoom={5}
        onEndemicSpeciesChange={handleEndemicSpeciesChange}
      />
      <MapLegend
        title="Legenda Zona Habitat"
        items={[]}
        position="bottom-right"
        endemicSpecies={legendEndemicSpecies}
        showPolygons={true} // Show only the polygon legend section
      />
    </div>
  );
};

export default ZonaHabitat;
