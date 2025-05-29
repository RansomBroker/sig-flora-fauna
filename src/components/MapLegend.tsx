import React, { useState, useEffect } from "react";
import { Species } from "@/types/species";
import { ChevronLeft, ChevronRight } from "lucide-react";

type LegendItem = {
  label: string;
  icon: React.ReactNode;
  show?: boolean;
  description?: string;
};

type MapLegendProps = {
  title: string;
  items: LegendItem[];
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
  endemicSpecies?: Species[];
  defaultTileLayer?: "osm" | "satellite" | "hybrid" | "topo";
  showPolygons?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
};

const MapLegend: React.FC<MapLegendProps> = ({
  title,
  items,
  position = "bottom-right",
  className = "",
  endemicSpecies = [],
  defaultTileLayer = "osm",
  showPolygons = false,
  isCollapsed: propIsCollapsed,
  onToggleCollapse: propOnToggleCollapse,
}) => {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);

  const isControlled =
    propIsCollapsed !== undefined && propOnToggleCollapse !== undefined;

  const currentIsCollapsed = isControlled
    ? propIsCollapsed
    : internalIsCollapsed;

  const handleToggleCollapse = () => {
    if (isControlled) {
      propOnToggleCollapse!();
    } else {
      setInternalIsCollapsed(!internalIsCollapsed);
    }
  };

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  const endemicFlora = endemicSpecies.filter(
    (species) => species.type === "floral" && species.is_endemic
  );
  const endemicFauna = endemicSpecies.filter(
    (species) => species.type === "fauna" && species.is_endemic
  );

  const translateClass = currentIsCollapsed
    ? position.includes("left")
      ? "-translate-x-[calc(100%-100px)]"
      : "translate-x-[calc(100%-100px)]"
    : "translate-x-0";

  return (
    <div
      className={`absolute ${positionClasses[position]} z-[1000] flex items-center transition-all duration-300 ease-in-out ${translateClass}`}
    >
      {/* Toggle Button */}
      <button
        onClick={handleToggleCollapse}
        className="glass-effect p-2 rounded-l-lg hover:bg-white/80 transition-colors z-[1001] flex items-center"
        aria-label={currentIsCollapsed ? "Expand legend" : "Collapse legend"}
      >
        {currentIsCollapsed ? (
          <>
            <ChevronLeft className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="ml-1.5 text-sm text-primary whitespace-nowrap">
              Legenda
            </span>
          </>
        ) : (
          <ChevronRight className="h-5 w-5 text-primary" />
        )}
      </button>

      {/* Legend Content */}
      <div
        className={`glass-effect p-4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out ${className} ${
          currentIsCollapsed ? "opacity-0 w-0" : "opacity-100"
        }`}
        style={{ maxWidth: "300px" }}
      >
        <h3 className="font-semibold mb-2 text-primary">{title}</h3>

        {/* Topographic Map Elevation Legend */}
        {defaultTileLayer === "topo" && (
          <div className="mb-4 pb-4 border-b">
            <h4 className="font-medium text-sm mb-2">Ketinggian (m):</h4>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs">High: 4622</span>
              <div
                className="w-5 h-20 border border-gray-400 rounded-sm"
                style={{
                  background:
                    "linear-gradient(to bottom, #ff6347, #ffd700, #90ee90, #32cd32)", // Tomato, Gold, LightGreen, LimeGreen
                }}
              />
              <span className="text-xs">Low: -410</span>
            </div>
          </div>
        )}

        {/* Custom Habitat Polygon Legend */}
        {showPolygons && (
          <div className="mb-4 pb-4 border-b">
            <div className="space-y-2">
              {[
                {
                  label: "Tropis Basah",
                  color: "#73b273",
                },
                {
                  label: "Tropis Sedang",
                  color: "#f6c567",
                },
                {
                  label: "Tropis Kering",
                  color: "#aef1b0",
                },
                {
                  label: "Tropis Pegunungan",
                  color: "#97dbf2",
                },
              ].map((item, index) => (
                <div
                  key={`habitat-${index}`}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-6 h-4 rounded-sm border border-gray-400"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm block">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend Items */}
        <div className="space-y-2 mb-4">
          {items
            .filter((item) => item.show !== false)
            .map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
        </div>

        {/* Endemic Species Lists */}
        {endemicFlora.length > 0 && (
          <div className="mt-4 border-t pt-2">
            <h4 className="font-medium text-sm mb-2 text-red-500">
              Flora Endemik:
            </h4>
            <ul className="space-y-2 text-sm">
              {endemicFlora.map((species, index) => (
                <li key={`flora-${index}`} className="flex items-start gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <img
                      src={species.image}
                      alt={species.name}
                      className="w-full h-full object-cover rounded-full border-2 border-red-500"
                    />
                  </div>
                  <div>
                    <span className="font-medium block">{species.name}</span>
                    <span className="text-xs text-gray-500">
                      {species.province}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {endemicFauna.length > 0 && (
          <div className="mt-4 border-t pt-2">
            <h4 className="font-medium text-sm mb-2 text-yellow-500">
              Fauna Endemik:
            </h4>
            <ul className="space-y-2 text-sm">
              {endemicFauna.map((species, index) => (
                <li key={`fauna-${index}`} className="flex items-start gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <img
                      src={species.image}
                      alt={species.name}
                      className="w-full h-full object-cover rounded-full border-2 border-yellow-500"
                    />
                  </div>
                  <div>
                    <span className="font-medium block">{species.name}</span>
                    <span className="text-xs text-gray-500">
                      {species.province}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Default legend items for flora and fauna
export const defaultFloraLegendItems: LegendItem[] = [
  {
    label: "Flora Endemik",
    icon: (
      <div className="w-6 h-6 rounded-full bg-white border-4 border-red-500" />
    ),
  },
  {
    label: "Flora Non-Endemik",
    icon: <div className="w-6 h-6 rounded-full bg-white" />,
  },
];

export const defaultFaunaLegendItems: LegendItem[] = [
  {
    label: "Fauna Endemik",
    icon: (
      <div className="w-6 h-6 rounded-full bg-white border-4 border-yellow-500" />
    ),
  },
  {
    label: "Fauna Non-Endemik",
    icon: <div className="w-6 h-6 rounded-full bg-white" />,
  },
];

export const defaultHabitatLegendItems: LegendItem[] = [
  {
    label: "Flora Endemik",
    icon: (
      <div className="w-6 h-6 rounded-full bg-white border-4 border-red-500" />
    ),
  },
  {
    label: "Fauna Endemik",
    icon: (
      <div className="w-6 h-6 rounded-full bg-white border-4 border-yellow-500" />
    ),
  },
  {
    label: "Flora Non-Endemik",
    icon: <div className="w-6 h-6 rounded-full bg-white" />,
  },
  {
    label: "Fauna Non-Endemik",
    icon: <div className="w-6 h-6 rounded-full bg-white" />,
  },
  {
    label: "Garis Wallace",
    icon: <div className="w-6 h-1 bg-[#0070c0]" />,
  },
  {
    label: "Garis Webber",
    icon: <div className="w-6 h-1 bg-[#7030a0]" />,
  },
];

export default MapLegend;
