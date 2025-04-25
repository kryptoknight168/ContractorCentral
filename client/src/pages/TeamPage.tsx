import { useEffect } from "react";
import Home from "./Home";

export default function TeamPage() {
  useEffect(() => {
    // Scroll to the team section when this page mounts
    const teamSection = document.getElementById("team");
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return <Home />;
}