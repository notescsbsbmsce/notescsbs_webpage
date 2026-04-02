import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Simple unique ID generator to avoid extra dependencies
const generateSessionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
};

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageview = async () => {
      try {
        // Get or create session ID
        let sessionId = localStorage.getItem("analytics_session_id");
        let isFirstSession = false;
        if (!sessionId) {
          sessionId = generateSessionId();
          localStorage.setItem("analytics_session_id", sessionId);
          isFirstSession = true;
        }

        // Determine device type
        const width = window.innerWidth;
        let deviceType = "desktop";
        if (width < 768) deviceType = "mobile";
        else if (width < 1024) deviceType = "tablet";

        const payload = {
          page_path: location.pathname,
          device_type: deviceType,
          session_id: sessionId,
          is_first_session: isFirstSession,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        };

        // We use 'as any' because the table might not be in the generated types yet
        // but Supabase will still allow the insert if the table exists
        const { error } = await supabase.from("analytics_events" as any).insert([payload]);
        
        if (error) {
          if (import.meta.env.DEV) {
            console.warn("Analytics: analytics_events table may be missing.", error.message);
          }
        }
      } catch (err) {
        console.error("Analytics Error:", err);
      }
    };

    trackPageview();
  }, [location.pathname]);
};
