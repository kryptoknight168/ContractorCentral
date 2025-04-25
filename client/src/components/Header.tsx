import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Building } from "lucide-react";

type NavItem = {
  id: string;
  title: string;
};

const navItems: NavItem[] = [
  { id: "services", title: "Services" },
  { id: "team", title: "Our Team" },
  { id: "portfolio", title: "Portfolio" },
  { id: "contact", title: "Contact Us" }
];

export default function Header({ activeSection, scrollProgress }: { 
  activeSection: string | null;
  scrollProgress: number;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setLocation(`/#${sectionId}`, { replace: true });
    }
  };

  // Set progressWidth based on the scroll position within the section
  // Starts at 100% and decreases as the user scrolls through the section
  const getProgressWidth = (itemId: string) => {
    if (activeSection === itemId) {
      return `${Math.max(0, Math.min(100, scrollProgress))}%`;
    }
    return "0";
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="flex items-center"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setLocation('/', { replace: true });
              }}
            >
              <Building className="text-primary text-3xl mr-3" />
              <div>
                <h1 className="font-inter font-bold text-xl text-dark">BuildRight</h1>
                <p className="text-xs text-gray-500">GENERAL CONTRACTORS</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map(item => (
              <div 
                key={item.id} 
                className="nav-item relative"
                data-section={item.id}
              >
                <a 
                  href={`#${item.id}`} 
                  className={`font-medium hover:text-primary transition duration-300 py-2 ${activeSection === item.id ? 'text-primary' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.title}
                </a>
                <div 
                  className="section-indicator h-1 bg-primary absolute bottom-0 left-0 right-0" 
                  style={{ width: getProgressWidth(item.id) }}
                />
              </div>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="text-gray-500 hover:text-primary focus:outline-none"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden pb-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          {navItems.map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className={`block py-2 px-4 text-lg hover:bg-accent hover:text-primary rounded transition duration-300 ${activeSection === item.id ? 'text-primary bg-accent' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
