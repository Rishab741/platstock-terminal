export const dynamic = "force-static";

import loadDynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Ticker from "./components/Ticker";
import RequestAccessModal from "./components/RequestAccessModal";
import FluidBackground from "./components/FluidBackground";

const SocialProofStrip = loadDynamic(() => import("./components/SocialProofStrip"));
const HowItWorks = loadDynamic(() => import("./components/HowItWorks"));
const MarketFriction = loadDynamic(() => import("./components/MarketFriction"));
const EcosystemSection = loadDynamic(() => import("./components/EcosystemSection"));
const ComparisonMatrix = loadDynamic(() => import("./components/ComparisonMatrix"));
const PricingSection = loadDynamic(() => import("./components/PricingSection"));
const RoadmapSection = loadDynamic(() => import("./components/RoadmapSection"));
const FAQSection = loadDynamic(() => import("./components/FAQSection"));
const FinalCTA = loadDynamic(() => import("./components/FinalCTA"));
const Footer = loadDynamic(() => import("./components/Footer"));

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <FluidBackground />
      <div className="relative z-[1]">
        <Navbar />
        <HeroSection />
        <Ticker />
        <SocialProofStrip />
        <HowItWorks />
        <MarketFriction />
        <EcosystemSection />
        <ComparisonMatrix />
        <PricingSection />
        <RoadmapSection />
        <FAQSection />
        <FinalCTA />
        <Footer />
      </div>
      <RequestAccessModal />
    </div>
  );
}
