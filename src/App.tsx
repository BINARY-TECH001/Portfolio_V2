import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import GitHub from "@/components/GitHub";
import Contact from "@/components/Contact";
import ProjectDetail from "@/pages/ProjectDetail";
import { ThemeProvider } from "@/components/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function Portfolio() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <TechStack />
          <GitHub />
          <Contact />
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/" component={Portfolio} />
      <Route component={Portfolio} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
