import React, { useState, useMemo } from "react";
import MapContent from "@/components/MapContent";
import MapLegend, { defaultFloraLegendItems } from "@/components/MapLegend";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Species } from "@/types/species";

const Flora = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [endemicSpecies, setEndemicSpecies] = useState<Species[]>([]);

  // Get province from URL params or default to Kalimantan Timur
  const province = searchParams.get("province") || "Kalimantan Timur";

  const handleEndemicSpeciesChange = (species: Species[]) => {
    setEndemicSpecies(species);
  };

  // Filter species by selected province
  const filteredSpecies = useMemo(() => {
    return endemicSpecies.filter((species) => species.province === province);
  }, [endemicSpecies, province]);

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
        onEndemicSpeciesChange={handleEndemicSpeciesChange}
      />
      <MapLegend
        title={`Legenda Flora - ${province}`}
        items={defaultFloraLegendItems}
        position="bottom-right"
        endemicSpecies={filteredSpecies}
      />
    </div>
  );
};

export default Flora;
