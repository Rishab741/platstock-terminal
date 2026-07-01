import loadDynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import RequestAccessModal from "../components/RequestAccessModal";
import FluidBackground from "../components/FluidBackground";

const SocialProofStrip = loadDynamic(() => import("../components/SocialProofStrip"));
const HowItWorks = loadDynamic(() => import("../components/HowItWorks"));
const PricingSection = loadDynamic(() => import("../components/PricingSection"));
const FAQSection = loadDynamic(() => import("../components/FAQSection"));
const FinalCTA = loadDynamic(() => import("../components/FinalCTA"));
const Footer = loadDynamic(() => import("../components/Footer"));

export const metadata = {
  title: "Pricing — Platstock Terminal",
  description:
    "Institutional-grade quantitative analytics at SaaS economics. Compare plans for emerging funds, boutique hedge funds, and family offices.",
};

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0E17] text-white overflow-x-hidden">
      <FluidBackground />
      <div className="relative z-[1]">
        <Navbar />
        <div className="pt-24">
          <SocialProofStrip />
          <HowItWorks />
          <PricingSection />
          <FAQSection />
          <FinalCTA />
          <Footer />
        </div>
      </div>
      <RequestAccessModal />
    </div>
  );
}
