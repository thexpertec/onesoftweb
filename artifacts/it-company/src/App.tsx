import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AccountingPage from "@/pages/AccountingPage";
import SchoolPage from "@/pages/SchoolPage";
import HospitalPage from "@/pages/HospitalPage";
import RestaurantPage from "@/pages/RestaurantPage";
import EcommercePage from "@/pages/EcommercePage";
import DistributorPage from "@/pages/DistributorPage";
import ShadiHallPage from "@/pages/ShadiHallPage";
import OneThemesPage from "@/pages/OneThemesPage";
import AboutPage from "@/pages/AboutPage";
import { ThemeProvider } from "@/context/ThemeContext";
import { CTAModalProvider } from "@/context/CTAModalContext";
import { CTAModal } from "@/components/CTAModal";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/accounting" component={AccountingPage} />
      <Route path="/school" component={SchoolPage} />
      <Route path="/hospital" component={HospitalPage} />
      <Route path="/restaurant" component={RestaurantPage} />
      <Route path="/ecommerce" component={EcommercePage} />
      <Route path="/distributor" component={DistributorPage} />
      <Route path="/shadi-hall" component={ShadiHallPage} />
      <Route path="/onethemes" component={OneThemesPage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CTAModalProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
            <CTAModal />
          </TooltipProvider>
        </QueryClientProvider>
      </CTAModalProvider>
    </ThemeProvider>
  );
}

export default App;

