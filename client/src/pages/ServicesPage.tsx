import { useEffect } from "react";
import Home from "./Home";

export default function ServicesPage() {
  useEffect(() => {
    // Scroll to the services section when this page mounts
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return <Home />;
}