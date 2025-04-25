import { Switch, Route, useLocation, useRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ServicesPage from "@/pages/ServicesPage";
import TeamPage from "@/pages/TeamPage";
import PortfolioPage from "@/pages/PortfolioPage";
import ContactPage from "@/pages/ContactPage";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();
  const router = useRouter();

  // Set up special handling for SPA navigation paths
  useEffect(() => {
    // Override navigation for our section paths to make them work as a SPA
    const originalPush = router.push;
    router.push = (to, options) => {
      // Check if this is one of our section paths
      const sectionPaths = ['/services', '/our-team', '/portfolio', '/contact'];
      if (sectionPaths.includes(to)) {
        // Extract the section ID
        const sectionId = to === '/our-team' ? 'team' : to.substring(1);
        
        // Scroll to the section when navigating to the section path
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          return true; // Indicate success without actual navigation
        }
      }
      
      // Use the original push for other paths
      return originalPush(to, options);
    };
    
    return () => {
      // Restore the original push method
      router.push = originalPush;
    };
  }, [router]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/our-team" component={TeamPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
