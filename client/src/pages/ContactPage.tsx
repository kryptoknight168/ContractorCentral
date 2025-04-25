import { useEffect } from "react";
import Home from "./Home";

export default function ContactPage() {
  useEffect(() => {
    // Scroll to the contact section when this page mounts
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return <Home />;
}