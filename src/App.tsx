import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
const Keywords = lazy(() => import("./pages/Keywords"));
const NoticeBoard = lazy(() => import("./pages/NoticeBoard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Helper to determine if a pathname matches an SEO keyword route
const isSeoPath = (pathname: string): boolean => {
  const p = pathname.toLowerCase();
  const standardRoutes = ["/auth", "/admin", "/semester", "/subject", "/contributors", "/privacy", "/keywords", "/notices"];
  if (standardRoutes.some(route => p === route || p.startsWith(route + "/"))) {
    return false;
  }
  
  return (
    p.endsWith("-notes") ||
    p.endsWith("-pdf") ||
    p.endsWith("-pyq") ||
    p.endsWith("-important-questions") ||
    p.endsWith("-study-material") ||
    p.endsWith("-documentation") ||
    p.includes("-unit-") ||
    p.includes("semester-") ||
    /^\/[1-8](st|nd|rd|th)-sem-notes$/.test(p) ||
    [
      "c-programming", "pointers-notes", "arrays-notes", "structures-notes",
      "technical-english", "communication-skills", "professional-communication",
      "linear-algebra", "vector-calculus", "probability-notes", "water-chemistry",
      "corrosion", "polymer-chemistry", "stack-notes", "queue-notes", "linked-list",
      "trees-notes", "graph-notes", "python-notes", "python-programming", "functions-notes",
      "oop-in-python", "logic-gates", "flip-flops", "counters", "inheritance-notes",
      "polymorphism-notes", "templates-notes", "virtual-functions-notes", "sql-notes",
      "normalization-notes", "er-model", "transaction-management", "acid-properties",
      "graph-theory", "relations-and-functions", "boolean-algebra", "coa-notes",
      "cpu-architecture", "memory-organization", "statistical-methods", "correlation-notes",
      "regression-notes", "curve-fitting", "least-square-method", "cpu-scheduling",
      "deadlock-notes", "memory-management", "paging-notes", "daa-notes", "algorithm-notes",
      "sorting-algorithms", "greedy-algorithm", "dynamic-programming", "java-notes",
      "java-oop", "exception-handling", "multithreading-notes", "java-collections",
      "sdlc-notes", "agile-model", "waterfall-model", "software-testing", "microprocessor-notes",
      "8086-notes", "addressing-modes", "assembly-language", "osi-model", "tcp-ip",
      "routing-algorithms", "congestion-control", "supervised-learning", "decision-tree",
      "neural-network", "html-notes", "css-notes", "javascript-notes", "bootstrap-notes",
      "web-development", "search-algorithms", "knowledge-representation", "expert-systems",
      "lexical-analysis", "syntax-analysis", "parsing-notes", "saas-notes", "paas-notes",
      "iaas-notes", "virtualization-notes", "association-rules", "clustering-notes",
      "sensors-notes", "iot-architecture", "embedded-systems", "network-security",
      "cryptography-notes", "malware-notes", "firewalls-notes", "big-data-notes",
      "hadoop-notes", "mapreduce-notes", "spark-notes", "cnn-notes", "rnn-notes",
      "blockchain-notes", "bitcoin-notes", "ethereum-notes", "smart-contracts",
      "devops-notes", "ci-cd", "docker-notes", "kubernetes-notes", "nlp-notes",
      "tokenization-notes", "text-mining", "transformer-models", "android-development",
      "kotlin-notes", "mobile-computing", "project-management", "agile-project-management",
      "risk-management", "startup-management", "innovation-management", "internship-report",
      "internship-viva", "internship-documentation", "major-project-ideas", "final-year-project",
      "capital-budgeting", "working-capital", "ratio-analysis", "management-notes",
      "planning-notes", "organizing-notes", "leadership-notes", "stp-notes",
      "consumer-behaviour", "marketing-mix", "demand-analysis", "elasticity-notes",
      "cost-analysis", "inventory-management", "logistics-notes", "recruitment-notes",
      "training-notes", "performance-appraisal", "bmsce-csbs", "vtu-csbs", "question-bank"
    ].some(kw => p.includes(kw))
  );
};

// Wildcard router: ALL unknown paths redirect to homepage
// Only /subject/* pages are preserved as actual routes above
const WildcardRoute = () => {
  return <Navigate to="/" replace />;
};

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
            <Route path="/keywords" element={<Suspense fallback={<PageLoader />}><Keywords /></Suspense>} />
            <Route path="/notices" element={<Suspense fallback={<PageLoader />}><NoticeBoard /></Suspense>} />
            <Route path="*" element={<WildcardRoute />} />
          </Routes>
          <MobileNav />
        </AnalyticsWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
