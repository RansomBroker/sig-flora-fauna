import React from "react";
import { Species } from "@/types/species";

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
};

const MapLegend: React.FC<MapLegendProps> = ({
  title,
  items,
  position = "bottom-right",
  className = "",
  endemicSpecies = [],
  defaultTileLayer = "osm",
}) => {
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

  // Topographic map legend items
  const topoLegendItems: LegendItem[] = [
    {
      label: "Dataran Rendah Tropis",
      description: "Lowland Tropical Forest",
      icon: (
        <div
          className="w-6 h-6 rounded-md"
          style={{ backgroundColor: "#34f400" }}
        />
      ),
    },
    {
      label: "Dataran Menengah",
      description: "Lower Montane Forest",
      icon: (
        <div
          className="w-6 h-6 rounded-md"
          style={{ backgroundColor: "#f1f000" }}
        />
      ),
    },
  ];

  return (
    <div
      className={`absolute ${positionClasses[position]} z-[1000] glass-effect p-4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto ${className}`}
      style={{ maxWidth: "300px" }}
    >
      <h3 className="font-semibold mb-2 text-primary">{title}</h3>

      {/* Topographic Map Legend */}
      {defaultTileLayer === "topo" && (
        <div className="mb-4 pb-4 border-b">
          <h4 className="font-medium text-sm mb-2">Tipe Hutan:</h4>
          <div className="space-y-2">
            {topoLegendItems.map((item, index) => (
              <div key={`topo-${index}`} className="flex items-start gap-2">
                {item.icon}
                <div>
                  <span className="text-sm block">{item.label}</span>
                  <span className="text-xs text-gray-500 italic">
                    {item.description}
                  </span>
                </div>
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
    label: "Fauna Endemik",
    icon: (
      <div className="w-6 h-6 rounded-full bg-white border-4 border-yellow-500" />
    ),
  },
  {
    label: "Flora Non-Endemik",
    icon: <div className="w-6 h-6 rounded-full bg-white" />,
  },
];

export const defaultFaunaLegendItems: LegendItem[] = [
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
    label: "Fauna Non-Endemik",
    icon: <div className="w-6 h-6 rounded-full bg-white" />,
  },
];

export default MapLegend;
