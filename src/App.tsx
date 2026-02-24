import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedAdminRoute } from "@/components/ProtectedAdminRoute";
import { MobileNav } from "@/components/MobileNav";

// Core pages loaded directly for maximum reliability
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";

// Optional pages keep lazy loading
const Semester = lazy(() => import("./pages/Semester"));
const Subject = lazy(() => import("./pages/Subject"));
const Contributors = lazy(() => import("./pages/Contributors"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      // Cache data for 5 minutes to reduce network requests
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests only once on mobile
      retry: 1,
      // Refetch on window focus only if data is stale
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect to save bandwidth
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
          
          {/* Lazy loaded routes wrapped in Suspense */}
          <Route path="/semester/:id" element={<Suspense fallback={<PageLoader />}><Semester /></Suspense>} />
          <Route path="/subject/:id" element={<Suspense fallback={<PageLoader />}><Subject /></Suspense>} />
          <Route path="/contributors" element={<Suspense fallback={<PageLoader />}><Contributors /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
        </Routes>
        <MobileNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
