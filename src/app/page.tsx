export const dynamic = "force-static";

import loadDynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Ticker from "./components/Ticker";
import RequestAccessModal from "./components/RequestAccessModal";
import FluidBackground from "./components/FluidBackground";

const MarketFriction = loadDynamic(() => import("./components/MarketFriction"));
const EcosystemSection = loadDynamic(() => import("./components/EcosystemSection"));
const ComparisonMatrix = loadDynamic(() => import("./components/ComparisonMatrix"));
const RoadmapSection = loadDynamic(() => import("./components/RoadmapSection"));
const Footer = loadDynamic(() => import("./components/Footer"));

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0E17] text-white overflow-x-hidden">
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
