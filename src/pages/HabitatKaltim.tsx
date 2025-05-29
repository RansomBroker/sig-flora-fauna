import React, { useState, useMemo } from "react";
import MapContent from "@/components/MapContent";
import MapLegend, { defaultHabitatLegendItems } from "@/components/MapLegend";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Species } from "@/types/species";

const HabitatKaltim = () => {
  const navigate = useNavigate();
  const [endemicSpecies, setEndemicSpecies] = useState<Species[]>([]);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleEndemicSpeciesChange = (species: Species[]) => {
    const kaltimSpecies = species.filter(
      (s) => s.province === "Kalimantan Timur"
    );
    setEndemicSpecies(kaltimSpecies);
  };

  const toggleLegendCollapse = () => {
    setIsLegendCollapsed(!isLegendCollapsed);
  };

  const toggleImageModal = () => {
    setIsImageModalOpen(!isImageModalOpen);
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
      <div className="absolute top-4 right-4 z-[1000] p-2">
        <button
          onClick={toggleImageModal}
          className="glass-effect text-primary font-medium py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.905 3.129V2.75z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
          </svg>
          Lihat Detail Gambar Peta Kaltim
        </button>
      </div>
      <MapContent
        showFlora={true}
        showFauna={true}
        showLines={true}
        showPolygons={true}
        width="100%"
        height="100vh"
        defaultLat={-0.392603} // Kaltim center
        defaultLng={117.121587} // Kaltim center
        defaultZoom={7} // Zoom to Kaltim
        defaultTileLayer="topo"
        onEndemicSpeciesChange={handleEndemicSpeciesChange}
        transparentHighlightProvince="Kalimantan Timur"
        whiteFillProvinces={[
          "Kalimantan Barat",
          "Kalimantan Selatan",
          "Kalimantan Tengah",
          "Kalimantan Utara",
        ]}
        maskColor="#97d2e3" // Explicitly set maskColor, or remove to use default from MapContent
      />
      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-[9999999999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-4 rounded-lg shadow-xl relative max-w-[90vw] max-h-[90vh] flex flex-col overflow-hidden">
            <button
              onClick={toggleImageModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white/70 hover:bg-white p-1.5 rounded-full transition-colors z-10"
              aria-label="Close image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex-grow min-h-0 w-full overflow-auto text-center">
              <img
                src="/images/Peta Flora dan Fauna di Kalimantan Timur.jpg"
                alt="Peta Flora dan Fauna di Kalimantan Timur"
                className="inline-block align-middle"
              />
            </div>
          </div>
        </div>
      )}
      <MapLegend
        title="Legenda Habitat Kaltim"
        items={defaultHabitatLegendItems}
        position="bottom-right"
        defaultTileLayer="topo"
        endemicSpecies={endemicSpecies}
        showPolygons={false}
        isCollapsed={isLegendCollapsed}
        onToggleCollapse={toggleLegendCollapse}
      />
    </div>
  );
};

export default HabitatKaltim;
