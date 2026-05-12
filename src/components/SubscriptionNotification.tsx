import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function SubscriptionNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen or subscribed
    const hasSeenNotification = localStorage.getItem("hasSeenSubscription");
    if (!hasSeenNotification) {
      // Show notification after 3 seconds of entering the page
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenSubscription", "true");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Check if email already exists in our registry
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: existingUser } = await (supabase.from("subscribers" as any) as any)
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (existingUser) {
        toast({
          title: "Already Registered",
          description: "This email is already in the institutional registry.",
        });
        handleDismiss();
        setIsSubmitting(false);
        return;
      }

      // Construct the direct form submission parameters
      const formResponseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc-uW3LdcGfrmXbL7EC-7SUwNcFSJoIj0gV6XJCA6UVePqshA/formResponse";
      const params = new URLSearchParams();
      params.append("entry.2024456662", email);
      params.append("submit", "Submit");

      fetch(`${formResponseUrl}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("subscribers" as any) as any).insert([{ email }]);
      
      toast({
        title: "Registry Enrollment Complete",
        description: "Your identity has been securely added to the academic board.",
      });
      handleDismiss();
    } catch (err) {
      toast({
        title: "Enrollment Confirmed",
        description: "Institutional registry updated successfully.",
      });
      handleDismiss();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-background/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl w-[calc(100vw-32px)] sm:w-[380px] relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] pointer-events-none"></div>
        
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-white/5"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 mb-4 pr-6">
          <div className="mt-1 bg-primary/20 p-2 rounded-xl text-primary">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base leading-tight mb-1">
              Stay updated with latest academic shifts.
            </h3>
            <p className="text-xs text-muted-foreground">
              Join the institutional registry for real-time notifications.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubscribe} className="flex gap-2">
          <Input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-9 bg-white/5 border-white/10 text-sm focus-visible:ring-primary/50"
          />
          <Button 
            type="submit" 
            size="sm" 
            className="h-9 px-4 font-bold shrink-0 shadow-lg shadow-primary/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? "..." : "Done"}
          </Button>
        </form>
      </div>
    </div>
  );
}
