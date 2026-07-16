import { Hero } from "./components/home/hero";
import { WelcomeIntro } from "./components/home/welcome-intro";
import { NeedsFunnel } from "./components/home/needs-funnel";
import { TwoDirections } from "./components/home/two-directions";
import { EquipmentShowcase } from "./components/home/equipment-showcase";
import { PolestarHighlight } from "./components/home/polestar-highlight";
import { LogoReveal } from "./components/home/logo-reveal";
import { CoreValues } from "./components/home/core-values";
import { GalleryWall } from "./components/home/gallery-wall";
import { GetStarted } from "./components/home/get-started";
import { Testimonials } from "./components/home/testimonials";
import { BlogSection } from "./components/home/blog-section";
import { CtaBand } from "./components/home/cta-band";

export default function Home() {
  return (
    <>
      <Hero />

      {/* WHY MVP — welcome / value props with hand-drawn logo video */}
      <WelcomeIntro />

      <NeedsFunnel />

      {/* MVP's two business directions — Studio and Education */}
      <TwoDirections />

      <EquipmentShowcase />
      <LogoReveal />
      <CoreValues />
      <GalleryWall />
      <PolestarHighlight />
      <Testimonials />
      <BlogSection />
      <GetStarted />
      <CtaBand />
    </>
  );
}
