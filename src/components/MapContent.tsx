import React from "react";
import MainNavigation from "./MainNavigation";
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
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { wallaceLine, webberLine } from "../lib/lineCoordinate";
import {
  tropisBasah,
  tropisKering,
  tropisSedang,
  tropisPegunungan,
} from "../lib/tropis";

type Species = {
  name: string;
  type: "floral" | "fauna";
  image: string;
  lat: number;
  lng: number;
};

type Representative = {
  name: string;
  type: "floral" | "fauna";
  image: string;
  lat: number;
  lng: number;
};

type ProvinceData = {
  province: string;
  center: [number, number];
  representatives: Representative[];
  data: Species[];
};

type ProvincePolygon = {
  province: string;
  polygon: [number, number][][];
};

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
};

const icon = (url: string) =>
  L.icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: "rounded-full shadow-lg",
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
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  useEffect(() => {
    fetch("/data/polygonIndonesia.geojson")
      .then((response) => response.json())
      .then((data) => {
        const polygons = data.features.map((feature) => {
          let polygonCoordinates: [number, number][][] = [];

          if (feature.geometry.type === "Polygon") {
            polygonCoordinates = [
              feature.geometry.coordinates.map((ring) =>
                ring.map(([long, lat]) => [lat, long] as [number, number])
              ),
            ];
          } else if (feature.geometry.type === "MultiPolygon") {
            polygonCoordinates = feature.geometry.coordinates.map((polygon) =>
              polygon.map((ring) =>
                ring.map(([long, lat]) => [lat, long] as [number, number])
              )
            );
          }

          return {
            province: feature.properties.PROVINSI,
            polygon: polygonCoordinates,
          };
        });
        setIndonesiaPolygon(polygons);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
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
                        icon={icon(item.image)}
                      >
                        <Popup>
                          <strong>{item.name}</strong>
                          <br />
                          Provinsi: {prov.province}
                          <br />
                          Tipe: {item.type}
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
                        icon={icon(rep.image)}
                        eventHandlers={{
                          click: () => handleProvinceClick(prov),
                        }}
                      >
                        <Popup>
                          <strong>{rep.name}</strong>
                          <br />
                          Provinsi: {prov.province}
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
                    icon={icon(item.image)}
                  >
                    <Popup>
                      <strong>{item.name}</strong>
                      <br />
                      Tipe: {item.type}
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

            {showPolygons &&
              indonesiaPolygon.length > 0 &&
              indonesiaPolygon.map((provincePolygon, index) => (
                <React.Fragment key={index}>
                  {provincePolygon.polygon.map((polygon, polygonIndex) => (
                    <Polygon
                      key={`${index}-${polygonIndex}`}
                      positions={polygon}
                      pathOptions={{
                        color: tropisBasah.includes(provincePolygon.province)
                          ? "#003b79"
                          : tropisKering.includes(provincePolygon.province)
                          ? "#003b79"
                          : tropisSedang.includes(provincePolygon.province)
                          ? "#003b79"
                          : tropisPegunungan.includes(provincePolygon.province)
                          ? "#003b79"
                          : "#003b79",
                        fillColor: tropisBasah.includes(
                          provincePolygon.province
                        )
                          ? "#73b273"
                          : tropisKering.includes(provincePolygon.province)
                          ? "#f6c567"
                          : tropisSedang.includes(provincePolygon.province)
                          ? "#aef1b0"
                          : tropisPegunungan.includes(provincePolygon.province)
                          ? "#97dbf2"
                          : "#97dbf2",
                        fillOpacity: 0.5,
                        weight: 1,
                      }}
                    >
                      <Popup>
                        <strong>{provincePolygon.province}</strong>
                      </Popup>
                    </Polygon>
                  ))}
                </React.Fragment>
              ))}
          </LayersControl>
        </MapContainer>
      )}
    </div>
  );
};

export default MapContent;
