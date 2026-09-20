import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null, showDetails: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearCacheAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
    } catch (e) {
      console.error("Failed to clear cache:", e);
    }
    window.location.href = "/";
  };

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
          <Header />

          <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="max-w-2xl w-full mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
              
              {/* Visual Icon Badge */}
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl animate-pulse"></div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400 shadow-xl relative">
                  <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12" />
                </div>
              </div>

              {/* Text Information */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                  500 · System Runtime Error
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight italic font-serif">
                  Something Went Wrong
                </h1>
                <p className="text-muted-foreground font-medium text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  An unexpected exception occurred while rendering this page. Our team has been notified.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  onClick={this.handleReload}
                  className="w-full sm:w-auto h-14 rounded-2xl px-8 bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Refreshing
                </Button>

                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                  className="w-full sm:w-auto h-14 rounded-2xl px-8 border-border hover:bg-muted font-bold text-sm transition-all gap-2"
                >
                  <Home className="h-4 w-4" />
                  Return Home
                </Button>

                <Button
                  variant="ghost"
                  onClick={this.handleClearCacheAndReload}
                  className="w-full sm:w-auto h-14 rounded-2xl px-6 text-destructive hover:bg-destructive/10 font-bold text-xs transition-all gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Reset Cache
                </Button>
              </div>

              {/* Technical Diagnostics Collapsible */}
              {this.state.error && (
                <div className="pt-6 border-t border-border">
                  <button
                    onClick={this.toggleDetails}
                    className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{this.state.showDetails ? "Hide Error Trace" : "Show Technical Details"}</span>
                    {this.state.showDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {this.state.showDetails && (
                    <div className="mt-4 p-4 rounded-2xl bg-card border border-border text-left font-mono text-xs overflow-x-auto max-h-60 shadow-inner">
                      <p className="text-red-500 dark:text-red-400 font-bold mb-2">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo?.componentStack && (
                        <pre className="text-muted-foreground text-[11px] leading-relaxed whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          </main>

          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}
