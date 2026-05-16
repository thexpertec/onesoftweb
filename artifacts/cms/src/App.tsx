import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import BlogListPage from "@/pages/blog/BlogListPage";
import BlogEditPage from "@/pages/blog/BlogEditPage";
import ProductsPage from "@/pages/ProductsPage";
import ServicesPage from "@/pages/ServicesPage";
import CaseStudiesPage from "@/pages/CaseStudiesPage";
import TeamPage from "@/pages/TeamPage";
import CareersPage from "@/pages/CareersPage";
import PagesPage from "@/pages/PagesPage";
import MediaPage from "@/pages/MediaPage";
import SettingsPage from "@/pages/SettingsPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import FAQsPage from "@/pages/FAQsPage";
import ClientsPage from "@/pages/ClientsPage";
import ProcessPage from "@/pages/ProcessPage";
import HomepageServicesPage from "@/pages/HomepageServicesPage";
import AIAutomationCMSPage from "@/pages/AIAutomationCMSPage";
import TechStackPage from "@/pages/TechStackPage";
import FeatureHighlightsPage from "@/pages/FeatureHighlightsPage";
import WebDevCMSPage from "@/pages/WebDevCMSPage";
import CustomSoftwareCMSPage from "@/pages/CustomSoftwareCMSPage";
import AIAutomationServiceCMSPage from "@/pages/AIAutomationServiceCMSPage";
import SocialMediaCMSPage from "@/pages/SocialMediaCMSPage";
import AdCreativesCMSPage from "@/pages/AdCreativesCMSPage";
import RolesPage from "@/pages/RolesPage";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Redirect to="/login" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/"             component={() => <ProtectedRoute component={DashboardPage} />} />
      <Route path="/blog"         component={() => <ProtectedRoute component={BlogListPage} />} />
      <Route path="/blog/new"     component={() => <ProtectedRoute component={BlogEditPage} />} />
      <Route path="/blog/:id/edit" component={() => <ProtectedRoute component={BlogEditPage} />} />
      <Route path="/products"     component={() => <ProtectedRoute component={ProductsPage} />} />
      <Route path="/services"     component={() => <ProtectedRoute component={ServicesPage} />} />
      <Route path="/case-studies" component={() => <ProtectedRoute component={CaseStudiesPage} />} />
      <Route path="/team"         component={() => <ProtectedRoute component={TeamPage} />} />
      <Route path="/careers"      component={() => <ProtectedRoute component={CareersPage} />} />
      <Route path="/pages"        component={() => <ProtectedRoute component={PagesPage} />} />
      <Route path="/media"        component={() => <ProtectedRoute component={MediaPage} />} />
      <Route path="/settings"      component={() => <ProtectedRoute component={SettingsPage} />} />
      <Route path="/testimonials"       component={() => <ProtectedRoute component={TestimonialsPage} />} />
      <Route path="/faqs"               component={() => <ProtectedRoute component={FAQsPage} />} />
      <Route path="/clients"            component={() => <ProtectedRoute component={ClientsPage} />} />
      <Route path="/process"            component={() => <ProtectedRoute component={ProcessPage} />} />
      <Route path="/homepage-services"  component={() => <ProtectedRoute component={HomepageServicesPage} />} />
      <Route path="/ai-automation-cms"  component={() => <ProtectedRoute component={AIAutomationCMSPage} />} />
      <Route path="/tech-stack"         component={() => <ProtectedRoute component={TechStackPage} />} />
      <Route path="/feature-highlights"   component={() => <ProtectedRoute component={FeatureHighlightsPage} />} />
      <Route path="/web-development"      component={() => <ProtectedRoute component={WebDevCMSPage} />} />
      <Route path="/custom-software"     component={() => <ProtectedRoute component={CustomSoftwareCMSPage} />} />
      <Route path="/ai-automation-svc"  component={() => <ProtectedRoute component={AIAutomationServiceCMSPage} />} />
      <Route path="/social-media-svc"   component={() => <ProtectedRoute component={SocialMediaCMSPage} />} />
      <Route path="/ad-creatives-svc"   component={() => <ProtectedRoute component={AdCreativesCMSPage} />} />
      <Route path="/roles"               component={() => <ProtectedRoute component={RolesPage} />} />
      <Route component={() => <Redirect to="/" />} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
