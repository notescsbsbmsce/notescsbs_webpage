import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Bell, Download, FileText, Pin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notice {
  id: number;
  title: string;
  description: string | null;
  file_url: string | null;
  type: string;
  created_at: string;
}

const NoticeBoard = () => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const { data: notices, isLoading, error } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        if (error.code === '42P01') {
          return [];
        }
        throw error;
      }
      return data as Notice[];
    },
  });

  const getNoticeTheme = (type: string) => {
    switch (type.toLowerCase()) {
      case "syllabus": return {
        bg: "bg-blue-50/90 dark:bg-blue-950/40",
        border: "border-blue-200 dark:border-blue-800",
        pin: "text-blue-500",
        icon: <FileText className="h-4 w-4 text-blue-500" />
      };
      case "time table": return {
        bg: "bg-green-50/90 dark:bg-green-950/40",
        border: "border-green-200 dark:border-green-800",
        pin: "text-green-500",
        icon: <Calendar className="h-4 w-4 text-green-500" />
      };
      default: return {
        bg: "bg-yellow-50/90 dark:bg-yellow-950/40", // Classic sticky note color
        border: "border-yellow-200 dark:border-yellow-800",
        pin: "text-red-500", // Red pin for general notices
        icon: <Bell className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      };
    }
  };

  // Generate a consistent but slightly random rotation for that "pinned paper" look
  const getRotation = (id: number) => {
    const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-3", "-rotate-3"];
    return rotations[id % rotations.length];
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      {/* Background Board Texture */}
      <div className="absolute inset-0 bg-[#f4f1ea] dark:bg-[#1a1814] opacity-50 z-0">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
      </div>
      
      <SEOHead
        title="Notice Board | Notes CSBS"
        description="Stay updated with the latest announcements, syllabus, and time tables for upcoming exams."
        canonicalPath="/notices"
      />
      
      <div className="relative z-10">
        <Header />
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-24 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none italic font-serif drop-shadow-sm">
              Digital Notice Board
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg pt-4 leading-relaxed font-medium">
              Click on any circular, syllabus, or time table to zoom in and view details.
            </p>
          </div>

          {/* Notices Grid - "The Board" */}
          <div className="relative p-6 sm:p-12 rounded-[40px] border-[12px] border-[#8b5a2b]/20 dark:border-[#8b5a2b]/10 bg-black/5 dark:bg-white/5 backdrop-blur-md shadow-2xl min-h-[60vh]">
            {/* Wooden frame inner shadow */}
            <div className="absolute inset-0 rounded-[28px] shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none"></div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-xl bg-white/10" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-background/50 backdrop-blur-md rounded-2xl">
                <p className="text-destructive font-medium">Failed to load notices. Please try again later.</p>
              </div>
            ) : notices && notices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                {notices.map((notice) => {
                  const theme = getNoticeTheme(notice.type);
                  return (
                    <div 
                      key={notice.id} 
                      onClick={() => setSelectedNotice(notice)}
                      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 ${getRotation(notice.id)}`}
                    >
                      {/* Drop shadow that simulates distance from board */}
                      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 translate-y-3 translate-x-2 blur-md rounded-xl transition-all group-hover:translate-y-5 group-hover:translate-x-4 group-hover:blur-lg"></div>
                      
                      {/* The Paper / Card */}
                      <div className={`relative h-64 flex flex-col p-6 rounded-xl border backdrop-blur-sm ${theme.bg} ${theme.border}`}>
                        {/* The Pin */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 drop-shadow-md transition-transform group-hover:-translate-y-1">
                          <Pin className={`h-8 w-8 ${theme.pin} fill-current rotate-45`} />
                        </div>
                        
                        <div className="flex items-center justify-between mt-2 mb-4">
                          <Badge variant="outline" className={`rounded-sm px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-white/50 dark:bg-black/50 ${theme.border}`}>
                            {notice.type}
                          </Badge>
                          {theme.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold tracking-tight line-clamp-2 text-slate-900 dark:text-slate-100 font-serif leading-tight">
                          {notice.title}
                        </h3>
                        
                        <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10">
                          <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                            {new Date(notice.created_at).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </p>
                          {notice.description && (
                             <p className="text-sm mt-2 text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                               {notice.description}
                             </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-32 bg-background/50 backdrop-blur-md rounded-2xl">
                <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-6 rotate-12" />
                <h3 className="text-xl font-bold mb-2">The board is empty</h3>
                <p className="text-muted-foreground">No circulars or timetables have been pinned yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Zoomed-in Notice Modal */}
      <Dialog open={!!selectedNotice} onOpenChange={(open) => !open && setSelectedNotice(null)}>
        <DialogContent className="sm:max-w-2xl bg-[#faf9f6] dark:bg-slate-900 border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
          {selectedNotice && (() => {
            const theme = getNoticeTheme(selectedNotice.type);
            return (
              <div className="relative">
                {/* Decorative header strip */}
                <div className={`h-3 w-full ${theme.bg} ${theme.border} border-b`}></div>
                
                <div className="p-8 sm:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.bg} ${theme.border} border`}>
                      {theme.icon}
                    </div>
                    <div>
                      <Badge variant="outline" className={`rounded-sm px-2 py-0 text-[10px] font-black uppercase tracking-widest bg-white/50 dark:bg-black/50 ${theme.border} mb-1`}>
                        {selectedNotice.type}
                      </Badge>
                      <p className="text-xs font-bold text-muted-foreground">
                        Posted on {new Date(selectedNotice.created_at).toLocaleDateString("en-IN", {
                          day: "numeric", month: "long", year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>

                  <DialogHeader>
                    <DialogTitle className="text-3xl sm:text-4xl font-black tracking-tight font-serif text-slate-900 dark:text-slate-100 mb-4 leading-tight">
                      {selectedNotice.title}
                    </DialogTitle>
                  </DialogHeader>

                  {selectedNotice.description && (
                    <div className="mt-6 prose prose-slate dark:prose-invert max-w-none">
                      <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {selectedNotice.description}
                      </p>
                    </div>
                  )}

                  {selectedNotice.file_url && (
                    <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                      <Button 
                        onClick={() => window.open(selectedNotice.file_url || '', '_blank')}
                        className="w-full sm:w-auto h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/20 gap-3 text-sm transition-all hover:scale-105"
                      >
                        <ExternalLink className="h-4 w-4" /> Open Attachment
                      </Button>
                      <p className="text-xs font-medium text-muted-foreground text-center sm:text-left">
                        This notice contains an attached file or document.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default NoticeBoard;
