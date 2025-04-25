import { useEffect } from "react";
import Home from "./Home";

export default function PortfolioPage() {
  useEffect(() => {
    // Scroll to the portfolio section when this page mounts
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return <Home />;
}