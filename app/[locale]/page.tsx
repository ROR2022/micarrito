import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { MarketplaceTemplates } from "@/components/landing/marketplace-templates";
import { HowItWorks } from "@/components/landing/how-it-works";
//import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <main style={{ maxWidth: "95vw"}}>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <MarketplaceTemplates />
      {/* <PricingSection /> */}
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}