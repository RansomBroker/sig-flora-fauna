import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Map, Leaf, PawPrint } from "lucide-react";

const FeatureBoxes = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="glass-effect hover:bg-white/80 transition-colors">
        <Link to="/habitat-kaltim">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Habitat (Kaltim)</h3>
                <p className="text-sm text-gray-600">
                  Lihat habitat, flora, & fauna Kaltim (Topografi)
                </p>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      <Card className="glass-effect hover:bg-white/80 transition-colors">
        <Link to="/flora-kaltim">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Flora (Kaltim)</h3>
                <p className="text-sm text-gray-600">
                  Lihat persebaran flora Kaltim
                </p>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      <Card className="glass-effect hover:bg-white/80 transition-colors">
        <Link to="/fauna-kaltim">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <PawPrint className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fauna (Kaltim)</h3>
                <p className="text-sm text-gray-600">
                  Lihat persebaran fauna Kaltim
                </p>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default FeatureBoxes;
