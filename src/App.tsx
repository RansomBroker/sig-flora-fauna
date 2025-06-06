import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Flora from "./pages/Flora";
import Fauna from "./pages/Fauna";
import Habitat from "./pages/Habitat";
import ZonaHabitat from "./pages/ZonaHabitat";
import HabitatKaltim from "./pages/HabitatKaltim";
import FloraKaltim from "./pages/FloraKaltim";
import FaunaKaltim from "./pages/FaunaKaltim";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/flora" element={<Flora />} />
            <Route path="/fauna" element={<Fauna />} />
            <Route path="/habitat" element={<Habitat />} />
            <Route path="/zonahabitat" element={<ZonaHabitat />} />
            <Route path="/habitat-kaltim" element={<HabitatKaltim />} />
            <Route path="/flora-kaltim" element={<FloraKaltim />} />
            <Route path="/fauna-kaltim" element={<FaunaKaltim />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
