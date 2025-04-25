import { useState, useEffect, useCallback } from 'react';

type ScrollSpyOptions = {
  sectionIds: string[];
  offset?: number;
  usePathUrls?: boolean; // Whether to use path-based URLs instead of hash URLs
};

type ScrollSpyResult = {
  activeSection: string | null;
  scrollProgress: number;
};

export function useScrollSpy({ sectionIds, offset = 80, usePathUrls = false }: ScrollSpyOptions): ScrollSpyResult {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(100);

  // Calculate scroll position within a section
  const calculateScrollProgress = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return 100;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY + offset;
    const scrollPercentage = 100 - ((scrollPosition - sectionTop) / sectionHeight * 100);
    
    return Math.max(0, Math.min(100, scrollPercentage));
  }, [offset]);

  // Update active section based on scroll position
  const handleScroll = useCallback(() => {
    let currentSection: string | null = null;
    let maxVisiblePercentage = 0;

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const total = rect.height;
      let visibleHeight;
      
      if (rect.top < offset) {
        // If section top is above the viewport offset
        if (rect.bottom <= offset) {
          // Section is completely above viewport offset
          visibleHeight = 0;
        } else {
          // Section is partially above viewport offset
          visibleHeight = rect.bottom - offset;
        }
      } else if (rect.top < window.innerHeight) {
        // Section is partially in viewport
        visibleHeight = Math.min(rect.height, window.innerHeight - rect.top);
      } else {
        // Section is below viewport
        visibleHeight = 0;
      }

      const visiblePercentage = (visibleHeight / total) * 100;
      
      if (visiblePercentage > maxVisiblePercentage) {
        maxVisiblePercentage = visiblePercentage;
        currentSection = id;
      }
    });

    // Update URL with active section if changed
    if (currentSection && activeSection !== currentSection) {
      // Get path based on section ID
      const getPathForSection = (id: string) => {
        if (id === 'team') return '/our-team';
        return `/${id}`;
      };
      
      // Update URL based on preferred URL format
      if (usePathUrls) {
        window.history.replaceState(null, '', getPathForSection(currentSection));
      } else {
        window.history.replaceState(null, '', `#${currentSection}`);
      }
      
      setActiveSection(currentSection);
    }

    // Update scroll progress for the active section
    if (currentSection) {
      setScrollProgress(calculateScrollProgress(currentSection));
    }
  }, [activeSection, calculateScrollProgress, offset, sectionIds]);

  useEffect(() => {
    // Initialize with hash from URL or first section
    const hash = window.location.hash.substring(1);
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash);
      setScrollProgress(calculateScrollProgress(hash));
    } else if (sectionIds.length > 0) {
      setActiveSection(sectionIds[0]);
      setScrollProgress(calculateScrollProgress(sectionIds[0]));
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Run once on mount to set initial values
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [calculateScrollProgress, handleScroll, sectionIds]);

  return { activeSection, scrollProgress };
}

export default useScrollSpy;
