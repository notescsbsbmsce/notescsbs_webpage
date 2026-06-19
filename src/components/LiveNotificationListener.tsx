import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell, X } from "lucide-react";

interface LiveNotification {
  id: number;
  title: string;
  description: string | null;
  type: string;
  created_at: string;
}

export function LiveNotificationListener() {
  const [notifications, setNotifications] = useState<LiveNotification[]>([]);

  useEffect(() => {
    // Subscribe to INSERT events on the notices table via Supabase Realtime
    const channel = supabase
      .channel("live-notices")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notices",
        },
        (payload) => {
          const newNotice = payload.new as LiveNotification;
          setNotifications((prev) => [...prev, newNotice]);

          // Auto-dismiss after 10 seconds
          setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== newNotice.id));
          }, 10000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="pointer-events-auto animate-in slide-in-from-right-full fade-in duration-500 bg-background/95 backdrop-blur-xl border border-border/80 rounded-2xl p-4 shadow-2xl shadow-black/20 flex gap-3 items-start group hover:border-primary/30 transition-all"
        >
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
            <Bell className="h-5 w-5 text-primary animate-pulse" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary">
                {notif.type || "New Update"}
              </span>
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold text-muted-foreground">
                Just now
              </span>
            </div>
            <p className="text-sm font-bold text-foreground leading-snug truncate">
              {notif.title}
            </p>
            {notif.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {notif.description}
              </p>
            )}
          </div>

          {/* Dismiss */}
          <button
            onClick={() => dismiss(notif.id)}
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all opacity-0 group-hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Progress bar for auto-dismiss */}
          <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full overflow-hidden bg-muted">
            <div
              className="h-full bg-primary rounded-full"
              style={{
                animation: "shrink-bar 10s linear forwards",
              }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes shrink-bar {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
