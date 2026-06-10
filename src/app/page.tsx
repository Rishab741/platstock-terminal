import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Ticker from "./components/Ticker";
import MarketFriction from "./components/MarketFriction";
import EcosystemSection from "./components/EcosystemSection";
import ComparisonMatrix from "./components/ComparisonMatrix";
import RoadmapSection from "./components/RoadmapSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Ticker />
      <MarketFriction />
      <EcosystemSection />
      <ComparisonMatrix />
      <RoadmapSection />
      <Footer />
    </div>
  );
}
