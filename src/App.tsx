import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import { MobileNav } from "@/components/MobileNav";
import { useAnalytics } from "./hooks/useAnalytics";

// Core index page direct for maximum landing performance
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Remaining pages lazy loaded
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const Semester = lazy(() => import("./pages/Semester"));
const Subject = lazy(() => import("./pages/Subject"));
const Contributors = lazy(() => import("./pages/Contributors"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Analytics Wrapper to handle route tracking
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useAnalytics();
  return <>{children}</>;
};

// Loading fallback component - sleek and centered
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center animate-pulse">
    <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 shadow-lg shadow-primary/20"></div>
    <p className="text-muted-foreground font-medium animate-pulse">Loading amazing notes...</p>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AnalyticsWrapper>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Suspense fallback={<PageLoader />}><Auth /></Suspense>} />
            <Route path="/admin" element={<ProtectedAdminRoute><Suspense fallback={<PageLoader />}><Admin /></Suspense></ProtectedAdminRoute>} />
            
            {/* Lazy loaded routes wrapped in Suspense */}
            <Route path="/semester/:id" element={<Suspense fallback={<PageLoader />}><Semester /></Suspense>} />
            <Route path="/subject/:id" element={<Suspense fallback={<PageLoader />}><Subject /></Suspense>} />
            <Route path="/contributors" element={<Suspense fallback={<PageLoader />}><Contributors /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><Privacy /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Routes>
          <MobileNav />
        </AnalyticsWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
