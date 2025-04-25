import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/sections/ServicesSection";
import TeamSection from "@/sections/TeamSection";
import PortfolioSection from "@/sections/PortfolioSection";
import ContactSection from "@/sections/ContactSection";
import useScrollSpy from "@/hooks/use-scroll-spy";

const sectionIds = ["services", "team", "portfolio", "contact"];

export default function Home() {
  const { activeSection, scrollProgress } = useScrollSpy({
    sectionIds,
    offset: 80 // Header height
  });

  // Track when section enters/exits viewport for animations
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  const handleSectionVisibility = (id: string, isVisible: boolean) => {
    setVisibleSections(prev => ({
      ...prev,
      [id]: isVisible
    }));
  };

  return (
    <>
      <Header activeSection={activeSection} scrollProgress={scrollProgress} />
      
      <main>
        <ServicesSection 
          onVisibilityChange={handleSectionVisibility} 
          isVisible={visibleSections["services"]} 
        />
        <TeamSection 
          onVisibilityChange={handleSectionVisibility} 
          isVisible={visibleSections["team"]} 
        />
        <PortfolioSection 
          onVisibilityChange={handleSectionVisibility} 
          isVisible={visibleSections["portfolio"]} 
        />
        <ContactSection 
          onVisibilityChange={handleSectionVisibility} 
          isVisible={visibleSections["contact"]} 
        />
      </main>
      
      <Footer />
    </>
  );
}
