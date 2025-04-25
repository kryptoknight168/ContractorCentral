import React, { useRef, useEffect } from "react";

interface SectionProps {
  id: string;
  title: string;
  className?: string;
  background?: "light" | "accent" | "secondary";
  children: React.ReactNode;
  onVisibilityChange?: (id: string, isVisible: boolean, element: HTMLElement) => void;
}

const SectionContainer = ({
  id,
  title,
  className = "",
  background = "light",
  children,
  onVisibilityChange,
}: SectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const getBgColor = () => {
    switch (background) {
      case "accent":
        return "bg-accent";
      case "secondary":
        return "bg-secondary text-white";
      case "light":
      default:
        return "bg-light";
    }
  };

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement || !onVisibilityChange) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibilityChange(id, entry.isIntersecting, sectionElement);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    observer.observe(sectionElement);
    
    return () => {
      observer.disconnect();
    };
  }, [id, onVisibilityChange]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`min-h-screen pt-28 pb-16 ${getBgColor()} ${className}`}
      data-section-id={id}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-4xl md:text-5xl text-dark mb-4">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionContainer;
