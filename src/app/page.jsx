import { Header } from "../components/Header/Header";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { TrustSection } from "../components/TrustSection/TrustSection";
import { FeatureIntroductionSection } from "../components/FeatureIntroductionSection/FeatureIntroductionSection";
import { SecuritySection } from "../components/SecuritySection/SecuritySection";
import { MissionSection } from "../components/MissionSection/MissionSection";
import { CtaSection } from "../components/CtaSection/CtaSection";
import { Footer } from "../components/Footer/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      <Header />
      <HeroSection />
      <TrustSection />
      <FeatureIntroductionSection />
      <SecuritySection />
      <MissionSection />
      <CtaSection />
      <Footer />
    </div>
  );
}