import { Hero } from "./components/home/hero";
import { PricingGateway } from "./components/home/pricing-gateway";
import { CoreValues } from "./components/home/core-values";
import { EquipmentShowcase } from "./components/home/equipment-showcase";
import { PolestarHighlight } from "./components/home/polestar-highlight";
import { GalleryWall } from "./components/home/gallery-wall";
import { GetStarted } from "./components/home/get-started";
import { Testimonials } from "./components/home/testimonials";
import { BlogSection } from "./components/home/blog-section";
import { CtaBand } from "./components/home/cta-band";

export default function Home() {
  return (
    <>
      <Hero />

      <PricingGateway />

      <CoreValues />

      <EquipmentShowcase />
      <GalleryWall />
      <PolestarHighlight />
      <Testimonials />
      <BlogSection />
      <GetStarted />
      <CtaBand />
    </>
  );
}
