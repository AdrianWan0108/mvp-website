import { Hero } from "./components/home/hero";
import { PricingGateway } from "./components/home/pricing-gateway";
import { CoreValues } from "./components/home/core-values";
import { EquipmentShowcase } from "./components/home/equipment-showcase";
import { GalleryWall } from "./components/home/gallery-wall";
import { GetStarted } from "./components/home/get-started";
import { Testimonials } from "./components/home/testimonials";

export default function Home() {
  return (
    <>
      <Hero />

      <PricingGateway />

      <CoreValues />

      <EquipmentShowcase />
      <GalleryWall />
      <Testimonials />
      {/* <BlogSection /> — hidden until the studio has posts to show.
          Component kept in app/components/home/blog-section.tsx. */}
      <GetStarted />
    </>
  );
}
