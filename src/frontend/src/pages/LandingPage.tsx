import { AIMentorSection } from "@/components/sections/AIMentorSection";
import CTASection from "@/components/sections/CTASection";
import DashboardSection from "@/components/sections/DashboardSection";
import { ExamsCoveredSection } from "@/components/sections/ExamsCoveredSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import FooterSection from "@/components/sections/FooterSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MockTestSection } from "@/components/sections/MockTestSection";
import { PYQLibrarySection } from "@/components/sections/PYQLibrarySection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function LandingPage() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div data-ocid="landing.page">
      <HeroSection onScrollTo={handleScroll} />
      <ExamsCoveredSection onScrollTo={handleScroll} />
      <FeaturesSection />
      <PYQLibrarySection />
      <MockTestSection />
      <AIMentorSection />
      <DashboardSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
