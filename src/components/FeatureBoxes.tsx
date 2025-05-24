import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Map, Leaf, PawPrint } from "lucide-react";

const provinces = [
  "Kalimantan Timur",
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bengkulu",
  "Lampung",
  "Bangka Belitung",
  "DKI Jakarta",
  "Jawa Barat",
  "Banten",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Selatan",
  "Papua Barat Daya",
];

const FeatureBoxes = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="glass-effect hover:bg-white/80 transition-colors">
        <Link to="/habitat">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Habitat</h3>
                <p className="text-sm text-gray-600">
                  Lihat persebaran habitat flora dan fauna
                </p>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      <Card className="glass-effect hover:bg-white/80 transition-colors">
        <div className="relative group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Flora</h3>
                <p className="text-sm text-gray-600">
                  Lihat persebaran flora Indonesia
                </p>
              </div>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-4">
              <select
                className="w-full p-2 rounded-lg bg-white/90 text-sm"
                onChange={(e) => {
                  const province = e.target.value;
                  if (province) {
                    window.location.href = `/flora?province=${encodeURIComponent(
                      province
                    )}`;
                  }
                }}
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="glass-effect hover:bg-white/80 transition-colors">
        <div className="relative group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <PawPrint className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fauna</h3>
                <p className="text-sm text-gray-600">
                  Lihat persebaran fauna Indonesia
                </p>
              </div>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-4">
              <select
                className="w-full p-2 rounded-lg bg-white/90 text-sm"
                onChange={(e) => {
                  const province = e.target.value;
                  if (province) {
                    window.location.href = `/fauna?province=${encodeURIComponent(
                      province
                    )}`;
                  }
                }}
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeatureBoxes;
