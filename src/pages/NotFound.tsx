import { Link, useNavigate } from "react-router-dom";
import { Home, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="404 — Page Not Found | NOTESCSBS"
        description="The page you're looking for doesn't exist or has been relocated."
        canonicalPath="/404"
        noindex={true}
      />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-bold text-primary mb-4 tracking-tighter">404</h1>
          <h2 className="text-2xl font-black text-foreground mb-4">Page Lost in Orbit</h2>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
            The curriculum you're looking for doesn't exist or has been relocated to another semester.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" className="gap-2 rounded-2xl h-14 px-8 font-bold border-border hover:bg-muted transition-all" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Link to="/">
              <Button className="gap-2 rounded-2xl h-14 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
