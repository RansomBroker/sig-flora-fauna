import React, { useState, useMemo } from "react";
import MapContent from "@/components/MapContent";
import MapLegend, { defaultFaunaLegendItems } from "@/components/MapLegend";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Species } from "@/types/species";

const Fauna = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [endemicSpecies, setEndemicSpecies] = useState<Species[]>([]);

  // Get province from URL params or default to Kalimantan Timur
  // const province = searchParams.get("province") || "Kalimantan Timur"; // Removed

  const handleEndemicSpeciesChange = (species: Species[]) => {
    setEndemicSpecies(species);
  };

  const legendEndemicSpecies = useMemo(() => {
    return endemicSpecies.filter((species) => species.type === "fauna");
  }, [endemicSpecies]);

  // Filter species by selected province - No longer filtering by province
  const filteredSpecies = useMemo(() => {
    return endemicSpecies; // Return all endemic species
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
        showFlora={false}
        showFauna={true}
        showLines={true}
        showPolygons={false}
        width="100%"
        height="100vh"
        onEndemicSpeciesChange={handleEndemicSpeciesChange}
      />
      <MapLegend
        title="Legenda Fauna"
        items={defaultFaunaLegendItems}
        position="bottom-right"
        endemicSpecies={legendEndemicSpecies}
      />
    </div>
  );
};

export default Fauna;
