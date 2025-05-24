import TopNavigation from "../components/TopNavigation";
import MainContent from "../components/MainContent";
import SideNavigation from "../components/SideNavigation";
import FeatureBoxes from "../components/FeatureBoxes";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <TopNavigation />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block lg:col-span-1">
            <SideNavigation />
          </div>

          <div className="lg:col-span-2">
            <MainContent />
          </div>

          <Card className="lg:col-span-1 glass-effect p-5 h-fit rounded-xl">
            <CardContent className="p-0">
              <h2 className="text-base font-semibold text-center text-secondary mb-4">
                Menggambarkan pemetaan secara umum terkait persebaran flora dan
                fauna
              </h2>
              <div className="mt-4 text-center">
                <img
                  src="https://via.placeholder.com/300x200/e9f9ef/2e7d32?text=Peta+Indonesia"
                  alt="Peta Indonesia"
                  className="rounded-xl mx-auto shadow-md hover-scale"
                />
                <div className="mt-4 text-xs text-gray-500">
                  <p>Tap peta untuk melihat detail</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="block lg:hidden mt-6">
          <SideNavigation />
        </div>

        <FeatureBoxes />

        <footer className="mt-12 text-center text-xs text-gray-400">
          <p>© 2025 Flora dan Fauna Indonesia. Semua Hak Dilindungi.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
