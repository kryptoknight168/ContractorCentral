import { Switch, Route, useLocation, useRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ServicesPage from "./pages/ServicesPage";
import TeamPage from "./pages/TeamPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import { useEffect } from "react";

function Router() {
  const [location, navigate] = useLocation();

  // Helper function to handle navigation to section paths
  const navigateToSection = (path: string) => {
    // Check if this is one of our section paths
    const sectionPaths = ['/services', '/our-team', '/portfolio', '/contact'];
    if (sectionPaths.includes(path)) {
      // Extract the section ID
      const sectionId = path === '/our-team' ? 'team' : path.substring(1);
      
      // Scroll to the section when navigating to the section path
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        navigate(path, { replace: true });
        return true;
      }
    }
    return false;
  };

  // Set up effects to handle initial navigation
  useEffect(() => {
    if (location !== '/' && 
        ['/services', '/our-team', '/portfolio', '/contact'].includes(location)) {
      navigateToSection(location);
    }
  }, []);

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
