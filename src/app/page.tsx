export const dynamic = "force-static";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Ticker from "./components/Ticker";
import MarketFriction from "./components/MarketFriction";
import EcosystemSection from "./components/EcosystemSection";
import ComparisonMatrix from "./components/ComparisonMatrix";
import RoadmapSection from "./components/RoadmapSection";
import Footer from "./components/Footer";
import RequestAccessModal from "./components/RequestAccessModal";
import FluidBackground from "./components/FluidBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <FluidBackground />
      <div className="relative z-[1]">
        <Navbar />
        <HeroSection />
        <Ticker />
        <MarketFriction />
        <EcosystemSection />
        <ComparisonMatrix />
        <RoadmapSection />
        <Footer />
      </div>
      <RequestAccessModal />
    </div>
  );
}
