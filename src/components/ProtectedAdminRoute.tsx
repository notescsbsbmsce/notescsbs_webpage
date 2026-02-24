import { useState, useEffect, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("ProtectedAdminRoute: Checking auth...");
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.log("ProtectedAdminRoute: No user or error:", userError);
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        console.log("ProtectedAdminRoute: User found, checking role...", user.id);
        
        // Try RPC first (primary method)
        const { data: rpcData, error: rpcError } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });

        if (!rpcError && rpcData !== null) {
          console.log("ProtectedAdminRoute: RPC role check result:", rpcData);
          setIsAdmin(rpcData === true);
        } else {
          // Fallback: Check user_roles table directly if RPC fails
          console.warn("ProtectedAdminRoute: RPC failed or missing, trying direct table check", rpcError);
          const { data: tableData, error: tableError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin')
            .maybeSingle();
          
          if (tableError) {
            console.error("ProtectedAdminRoute: Direct table check failed:", tableError);
            setIsAdmin(false);
          } else {
            console.log("ProtectedAdminRoute: Direct table check result:", tableData);
            setIsAdmin(!!tableData);
          }
        }
      } catch (err) {
        console.error("ProtectedAdminRoute: Unexpected error:", err);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("ProtectedAdminRoute: Auth state change:", event);
        if (event === 'SIGNED_OUT' || !session) {
          setIsAdmin(false);
          setIsLoading(false);
        } else if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          checkAuth();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
