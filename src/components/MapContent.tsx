import React from "react";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
  Polyline,
  Polygon,
} from "react-leaflet";
import L, { LatLngBoundsExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { wallaceLine, webberLine } from "../lib/lineCoordinate";
import {
  tropisBasah,
  tropisKering,
  tropisSedang,
  tropisPegunungan,
} from "../lib/tropis"; // Import tropis arrays
import { Species } from "@/types/species";

type Representative = Species;

type ProvinceData = {
  province: string;
  center: [number, number];
  representatives: Representative[];
  data: Species[];
};

type ProvincePolygon = {
  province: string;
  polygon: LatLngTuple[][];
  properties: GeoJsonFeature["properties"];
};

// Define types for GeoJSON structure
interface Geometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: [number, number][][] | [number, number][][][]; // More specific type for coordinates
}

interface GeoJsonFeature {
  type: "Feature";
  properties: {
    PROVINSI: string;
    // ZONAKLIM?: string; // ZONAKLIM is no longer used for styling here
    // Add other properties if they exist and are used
  };
  geometry: Geometry;
}

interface GeoJsonResponse {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

type MapContentProps = {
  showFlora?: boolean;
  showFauna?: boolean;
  showPolygons?: boolean;
  showLines?: boolean;
  width?: string;
  height?: string;
  defaultLat?: number;
  defaultLng?: number;
  defaultZoom?: number;
  defaultTileLayer?: "osm" | "satellite" | "hybrid" | "topo";
  onEndemicSpeciesChange?: (species: Species[]) => void;
  highlightProvince?: string;
};

const indonesiaBounds: LatLngBoundsExpression = [
  [-11.0, 95.0],
  [6.0, 141.0],
];

// Define coordinates for a rectangle covering the world
const worldRectangle: LatLngTuple[] = [
  [-85, -180],
  [85, -180],
  [85, 180],
  [-85, 180],
];

const icon = (url: string, isEndemic?: boolean, type?: "floral" | "fauna") =>
  L.icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: `rounded-full shadow-lg ${
      isEndemic
        ? type === "floral"
          ? "border-4 border-red-500"
          : "border-4 border-yellow-500"
        : ""
    }`,
  });

const FlyTo = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom]);
  return null;
};

const { BaseLayer } = LayersControl;

// Helper function to get color based on climate zone arrays
const getClimateZoneStyleFromTropisArray = (provinceName: string) => {
  if (tropisBasah.includes(provinceName)) {
    return { fillColor: "#73b273", color: "#003b79" }; // Greenish, Dark Blue border
  }
  if (tropisKering.includes(provinceName)) {
    return { fillColor: "#f6c567", color: "#003b79" }; // Yellowish, Dark Blue border
  }
  if (tropisSedang.includes(provinceName)) {
    return { fillColor: "#aef1b0", color: "#003b79" }; // Light Green, Dark Blue border
  }
  if (tropisPegunungan.includes(provinceName)) {
    return { fillColor: "#97dbf2", color: "#003b79" }; // Light Blue, Dark Blue border
  }
  return { fillColor: "#97dbf2", color: "#003b79" }; // Default: Light Blue, Dark Blue border (matches old default)
};

/*
// This is the old function that was based on ZONAKLIM property from GeoJSON.
// It's being replaced by getClimateZoneStyleFromTropisArray, which uses imported arrays.
const getClimateZoneColor = (climateZone?: string) => {
  if (!climateZone) return "#97d2e3";
  switch (climateZone.toLowerCase()) {
    case "iklim tropis basah":
      return "#4CAF50";
    case "iklim tropis kering":
      return "#FFC107";
    case "iklim tropis musim":
      return "#2196F3";
    default:
      return "#9E9E9E";
  }
};
*/

const MapContent: React.FC<MapContentProps> = ({
  showFlora = true,
  showFauna = true,
  showPolygons = true,
  showLines = true,
  width = "100%",
  height = "300px",
  defaultLat = -2.5489,
  defaultLng = 118.0149,
  defaultZoom = 4,
  defaultTileLayer = "osm",
  onEndemicSpeciesChange,
  highlightProvince,
}) => {
  const [data, setData] = useState<ProvinceData[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(
    null
  );
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    defaultLat,
    defaultLng,
  ]);
  const [flyToZoom, setFlyToZoom] = useState(defaultZoom);
  const [indonesiaPolygon, setIndonesiaPolygon] = useState<ProvincePolygon[]>(
    []
  );

  useEffect(() => {
    fetch("/data/floraFaunaData.json")
      .then((response) => response.json())
      .then((jsonData: ProvinceData[]) => {
        setData(jsonData);
        const endemicSpecies = jsonData.flatMap((province) => [
          ...province.representatives
            .filter((rep) => rep.is_endemic)
            .map((rep) => ({
              ...rep,
              province: province.province,
            })),
          ...province.data
            .filter((item) => item.is_endemic)
            .map((item) => ({
              ...item,
              province: province.province,
            })),
        ]);
        onEndemicSpeciesChange?.(endemicSpecies);
      })
      .catch((err) => {
        console.error("Fetch error (floraFaunaData):", err);
      });
  }, [onEndemicSpeciesChange]);

  useEffect(() => {
    fetch("/data/polygonIndonesia.geojson")
      .then((response) => response.json())
      .then((geoJsonData: GeoJsonResponse) => {
        const polygons = geoJsonData.features.map((feature) => {
          let featurePolygonRings: LatLngTuple[][] = [];

          if (feature.geometry.type === "Polygon") {
            const coords = feature.geometry.coordinates as [number, number][][];
            featurePolygonRings = [
              coords[0].map(
                ([long, lat]: [number, number]) => [lat, long] as LatLngTuple
              ),
            ];
          } else if (feature.geometry.type === "MultiPolygon") {
            const coords = feature.geometry.coordinates as [
              number,
              number
            ][][][];
            featurePolygonRings = coords.map(
              (polygonRings: [number, number][][]) =>
                polygonRings[0].map(
                  ([long, lat]: [number, number]) => [lat, long] as LatLngTuple
                )
            );
          }

          return {
            province: feature.properties.PROVINSI,
            polygon: featurePolygonRings,
            properties: feature.properties,
          };
        });
        setIndonesiaPolygon(polygons);
      })
      .catch((err) => {
        console.error("Fetch error (polygonIndonesia):", err);
      });
  }, []);

  const handleProvinceClick = (province: ProvinceData) => {
    setSelectedProvince(province);
    setMapCenter(province.center);
    setFlyToZoom(7);
  };

  const MapEvents = ({
    onZoomChange,
  }: {
    onZoomChange: (zoom: number) => void;
  }) => {
    const map = useMap();
    useEffect(() => {
      const handleZoom = () => {
        const currentZoom = map.getZoom();
        onZoomChange(currentZoom);
      };

      map.on("zoomend", handleZoom);
      handleZoom();

      return () => {
        map.off("zoomend", handleZoom);
      };
    }, [map, onZoomChange]);

    return null;
  };

  const filterSpecies = (species: Species | Representative) => {
    if (showFlora && showFauna) return true;
    if (showFlora && species.type === "floral") return true;
    if (showFauna && species.type === "fauna") return true;
    return false;
  };

  return (
    <div>
      {data.length > 0 && (
        <MapContainer
          center={mapCenter}
          zoom={defaultZoom}
          scrollWheelZoom={true}
          style={{ width, height }}
          minZoom={2}
        >
          <MapEvents onZoomChange={setZoomLevel} />

          <LayersControl position="topright">
            <BaseLayer checked={defaultTileLayer === "osm"} name="Basic (OSM)">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            </BaseLayer>

            <BaseLayer
              checked={defaultTileLayer === "satellite"}
              name="Satellite (Google)"
            >
              <TileLayer
                url="https://mts{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={["0", "1", "2", "3"]}
                attribution="&copy; Google"
              />
            </BaseLayer>

            <BaseLayer
              checked={defaultTileLayer === "hybrid"}
              name="Hybrid (Google)"
            >
              <TileLayer
                url="https://mts{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                subdomains={["0", "1", "2", "3"]}
                attribution="&copy; Google"
              />
            </BaseLayer>

            <BaseLayer
              checked={defaultTileLayer === "topo"}
              name="Topographic (OpenTopoMap)"
            >
              <TileLayer
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors, &copy; OpenTopoMap"
              />
            </BaseLayer>

            <FlyTo center={mapCenter} zoom={flyToZoom} />

            {defaultZoom >= 7
              ? data.flatMap((prov) =>
                  prov.data
                    ?.filter((item) => filterSpecies(item))
                    .map((item, idx) => (
                      <Marker
                        key={`${prov.province}-data-${idx}`}
                        position={[item.lat, item.lng]}
                        icon={icon(item.image, item.is_endemic, item.type)}
                      >
                        <Popup>
                          <strong>{item.name}</strong>
                          <br />
                          Provinsi: {prov.province}
                          <br />
                          Tipe: {item.type}
                          {item.is_endemic && <br />}
                          {item.is_endemic && (
                            <span className="text-red-500">Endemik</span>
                          )}
                        </Popup>
                      </Marker>
                    ))
                )
              : data.flatMap((prov) =>
                  prov.representatives
                    ?.filter((rep) => filterSpecies(rep))
                    .map((rep, idx) => (
                      <Marker
                        key={`${prov.province}-rep-${idx}`}
                        position={[rep.lat, rep.lng]}
                        icon={icon(rep.image, rep.is_endemic, rep.type)}
                        eventHandlers={{
                          click: () => handleProvinceClick(prov),
                        }}
                      >
                        <Popup>
                          <strong>{rep.name}</strong>
                          <br />
                          Provinsi: {prov.province}
                          {rep.is_endemic && <br />}
                          {rep.is_endemic && (
                            <span className="text-red-500">Endemik</span>
                          )}
                        </Popup>
                      </Marker>
                    ))
                )}

            {selectedProvince &&
              selectedProvince.data
                .filter((item) => filterSpecies(item))
                .map((item, idx) => (
                  <Marker
                    key={`species-${idx}`}
                    position={[item.lat, item.lng]}
                    icon={icon(item.image, item.is_endemic, item.type)}
                  >
                    <Popup>
                      <strong>{item.name}</strong>
                      <br />
                      Tipe: {item.type}
                      {item.is_endemic && <br />}
                      {item.is_endemic && (
                        <span className="text-red-500">Endemik</span>
                      )}
                    </Popup>
                  </Marker>
                ))}

            {showLines && (
              <>
                <Polyline
                  positions={wallaceLine}
                  pathOptions={{
                    color: "#0070c0",
                    weight: 3,
                    opacity: 0.7,
                  }}
                />
                <Polyline
                  positions={webberLine}
                  pathOptions={{
                    color: "#7030a0",
                    weight: 3,
                    opacity: 0.7,
                  }}
                />
              </>
            )}

            {/* Polygon Rendering Logic: Mask or Standard Provinces */}
            {showPolygons &&
              indonesiaPolygon.length > 0 &&
              highlightProvince &&
              (() => {
                // Get ALL features that match the highlightProvince
                const highlightedProvincesData = indonesiaPolygon.filter(
                  (p) => p.province === highlightProvince
                );

                if (highlightedProvincesData.length === 0) return null;

                const maskPositions: LatLngTuple[][] = [worldRectangle];
                // For each feature/part of Kalimantan Timur, add its rings as holes
                highlightedProvincesData.forEach((provincePart) => {
                  provincePart.polygon.forEach((ring) => {
                    maskPositions.push(ring);
                  });
                });

                return (
                  <>
                    {/* Solid Mask covering the world, with holes for ALL Kaltim parts */}
                    <Polygon
                      positions={maskPositions}
                      pathOptions={{
                        fillColor: "#97d2e3",
                        fillOpacity: 1, // Solid color
                        color: "transparent",
                        weight: 0,
                        interactive: false,
                      }}
                    />
                    {/* Render borders for ALL Kaltim parts on top of the mask's holes */}
                    {highlightedProvincesData.map((provincePart, partIndex) => (
                      <React.Fragment key={`highlight-part-${partIndex}`}>
                        {provincePart.polygon.map((ring, ringIndex) => (
                          <Polygon
                            key={`highlight-${provincePart.province}-part-${partIndex}-ring-${ringIndex}`}
                            positions={ring}
                            pathOptions={{
                              color: "#FFFFFF",
                              fillColor: "transparent",
                              fillOpacity: 0,
                              weight: 2,
                              interactive: false,
                            }}
                          />
                        ))}
                      </React.Fragment>
                    ))}
                  </>
                );
              })()}

            {/* Standard display: all provinces with default fill when no highlight */}
            {showPolygons &&
              indonesiaPolygon.length > 0 &&
              !highlightProvince &&
              indonesiaPolygon.map((provincePolygon, index) => (
                <React.Fragment
                  key={`${provincePolygon.province}-${index}-fragment`}
                >
                  {provincePolygon.polygon.map((ring, ringIndex) => {
                    const style = getClimateZoneStyleFromTropisArray(
                      provincePolygon.province
                    );
                    return (
                      <Polygon
                        key={`${provincePolygon.province}-${index}-ring-${ringIndex}`}
                        positions={ring}
                        pathOptions={{
                          color: style.color,
                          fillColor: style.fillColor,
                          fillOpacity: 0.9, // As per your example
                          weight: 1,
                        }}
                      >
                        <Popup>
                          <strong>{provincePolygon.province}</strong>
                        </Popup>
                      </Polygon>
                    );
                  })}
                </React.Fragment>
              ))}
            {/* End of polygon rendering logic */}
          </LayersControl>
        </MapContainer>
      )}
    </div>
  );
};

export default MapContent;
