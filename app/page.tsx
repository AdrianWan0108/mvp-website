import { Hero } from "./components/home/hero";
import { AnniversaryFeature } from "./components/home/anniversary-feature";
import { PricingGateway } from "./components/home/pricing-gateway";
import { CoreValues } from "./components/home/core-values";
import { EquipmentShowcase } from "./components/home/equipment-showcase";
import { GalleryWall } from "./components/home/gallery-wall";
import { GetStarted } from "./components/home/get-started";
import { Testimonials } from "./components/home/testimonials";
import { BlogSection } from "./components/home/blog-section";

export default function Home() {
  return (
    <>
      <Hero />

      <AnniversaryFeature />

      <PricingGateway />

      <CoreValues />

      <EquipmentShowcase />
      <GalleryWall />
      <Testimonials />
      <BlogSection />
      <GetStarted />
    </>
  );
}
