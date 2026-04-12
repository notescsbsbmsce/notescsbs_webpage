import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, getSupabaseClient } from "@/integrations/supabase/client";
import { fetchSemesters } from "@/lib/admin-utils";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2, Plus, Trash2, LogOut, BookOpen, FileText,
  GraduationCap, Upload, Link, Library, BarChart3,
  Search, ChevronDown, Shield, CheckCircle2,
  ExternalLink, Copy, FolderOpen, Sparkles, Users, Mail,
  LayoutDashboard, FilePlus, Database, Settings, Terminal,
  PlusCircle, FileCheck, Layers, ChevronRight
} from "lucide-react";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { ResourceCard } from "@/components/admin/ResourceCard";
import { EditResourceModal } from "@/components/admin/EditResourceModal";
import { User } from "@supabase/supabase-js";

type ResourceType = "notes" | "cie1" | "cie2" | "cie3" | "see" | "book";

interface Subject {
  id: number;
  name: string;
  code: string;
  semester_id: number;
  is_lab: boolean;
}

interface Unit {
  id: number;
  unit_number: number;
  unit_name: string;
  subject_id: number;
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

interface Resource {
  id: number;
  title: string;
  file_url: string;
  type: ResourceType;
  unit: string | null;
  year: number | null;
  subject_id: number;
}

const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'jpg', 'jpeg', 'png', 'mp4', 'c', 'cpp', 'py', 'java', 'js', 'ts', 'h'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [resourceType, setResourceType] = useState<ResourceType>("notes");
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [year, setYear] = useState<string>("");
  const [uploadMode, setUploadMode] = useState<"link" | "file">("link");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number; title: string }>({
    open: false, id: 0, title: "",
  });

  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [activeView, setActiveView] = useState<"upload" | "library" | "dashboard" | "community">("upload");

  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (!isMounted) return;
        if (error || !user) {
          navigate("/auth");
          return;
        }
        setUser(user);
        const { data: hasRole } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });
        if (isMounted) setIsAdmin(hasRole === true);
      } catch (err) {
        if (isMounted) navigate("/auth");
      }
    };
    initAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === 'SIGNED_OUT') navigate("/auth");
      else if (session?.user) setUser(session.user);
    });
    return () => { isMounted = false; subscription.unsubscribe(); };
  }, [navigate]);

  const { data: semesters } = useQuery({
    queryKey: ["semesters"],
    queryFn: async () => await fetchSemesters(),
    staleTime: 10 * 1000,
  });

  const semesterNumber = useMemo(() => {
    if (!selectedSemester || !semesters) return 1;
    const sem = semesters.find(s => s.id.toString() === selectedSemester);
    return sem ? sem.order : 1;
  }, [selectedSemester, semesters]);

  const { data: subjects, isLoading: isLoadingSubjects } = useQuery({
    queryKey: ["subjects", selectedSemester],
    queryFn: async () => {
      const client = getSupabaseClient(semesterNumber);
      const { data, error } = await client.from("subjects").select("*").eq("semester_id", parseInt(selectedSemester)).order("code");
      if (error) throw error;
      return data as Subject[];
    },
    enabled: !!selectedSemester,
  });

  const { data: units } = useQuery({
    queryKey: ["units", selectedSubject],
    queryFn: async () => {
      const client = getSupabaseClient(semesterNumber);
      const { data, error } = await client.from("units").select("*").eq("subject_id", parseInt(selectedSubject)).order("unit_number");
      if (error) throw error;
      return data as Unit[];
    },
    enabled: !!selectedSubject,
  });

  const { data: resources } = useQuery({
    queryKey: ["resources", selectedSubject],
    queryFn: async () => {
      const client = getSupabaseClient(semesterNumber);
      const { data, error } = await client.from("resources").select("*").eq("subject_id", parseInt(selectedSubject)).order("type").order("unit");
      if (error) throw error;
      return data as Resource[];
    },
    enabled: !!selectedSubject,
  });

  const { data: subscribers } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Subscriber[];
    },
    enabled: activeView === "community",
  });

  const [newSubscriberEmail, setNewSubscriberEmail] = useState("");

  const addSubscriberMutation = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.from("subscribers").insert([{ email }]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Member Enrolled", description: "Email added to institutional broadcast." });
      setNewSubscriberEmail("");
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    },
    onError: (err: Error) => {
       toast({ title: "Enrollment Failed", description: err.message || "Could not synchronize member.", variant: "destructive" });
    }
  });

  const deleteSubscriberMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("subscribers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Member Removed", description: "Registry entry purged." });
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    },
  });

  const handleExportRegistry = () => {
    if (!subscribers || subscribers.length === 0) {
      toast({ title: "Export Unavailable", description: "The registry manifest is currently empty.", variant: "destructive" });
      return;
    }
    const csv = ["Email,Joined Date", ...subscribers.map(s => `${s.email},${new Date(s.created_at).toISOString()}`)].join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); 
    a.href = url; 
    a.download = `NOTESCSBS-Registry-${new Date().toISOString().split('T')[0]}.csv`; 
    a.click();
    window.URL.revokeObjectURL(url);
    toast({ title: "Registry Exported", description: `${subscribers.length} identities extracted successfully.` });
  };

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubscriberEmail.trim()) return;
    addSubscriberMutation.mutate(newSubscriberEmail.trim());
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${selectedSubject}/${fileName}`;
    const client = getSupabaseClient(semesterNumber);
    const { error } = await client.storage.from('resources').upload(filePath, file);
    if (error) throw error;
    const { data: urlData } = client.storage.from('resources').getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const addResourceMutation = useMutation({
    mutationFn: async (resourcesData: { title: string; fileUrl: string }[]) => {
      const client = getSupabaseClient(semesterNumber);
      for (const res of resourcesData) {
        const payload = {
          subject_id: parseInt(selectedSubject),
          title: res.title.trim(),
          file_url: res.fileUrl,
          type: resourceType,
          unit: resourceType === "notes" && selectedUnit && selectedUnit !== "none" ? `Unit ${selectedUnit}` : null,
          year: year ? parseInt(year) : null,
        };
        const { error } = await client.from("resources").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Asset Deployed", description: "The resource is now live in the registry." });
      setTitle(""); setFileUrl(""); setYear(""); setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["resources", selectedSubject] });
    },
  });

  const updateResourceMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const client = getSupabaseClient(semesterNumber);
      const { error } = await client.from("resources").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Asset Updated", description: "The resource metadata has been modified." });
      setIsEditOpen(false);
      setEditResource(null);
      queryClient.invalidateQueries({ queryKey: ["resources", selectedSubject] });
    },
    onError: (error: Error) => {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    }
  });

  const deleteResourceMutation = useMutation({
    mutationFn: async (id: number) => {
      const client = getSupabaseClient(semesterNumber);
      const { error } = await client.from("resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Asset Purged", description: "The resource has been removed from the registry." });
      setDeleteDialog({ open: false, id: 0, title: "" });
      queryClient.invalidateQueries({ queryKey: ["resources", selectedSubject] });
    },
    onError: (error: Error) => {
      toast({ title: "Purge Failed", description: error.message, variant: "destructive" });
    }
  });


  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject) return toast({ title: "Select Subject", description: "A subject node is required.", variant: "destructive" });

    if (uploadMode === "link") {
      if (!title.trim() || !fileUrl.trim()) return;
      addResourceMutation.mutate([{ title: title.trim(), fileUrl: fileUrl.trim() }]);
    } else {
      if (selectedFiles.length === 0) return;
      try {
        setIsUploading(true);
        const uploaded = [];
        for (const file of selectedFiles) {
          const url = await uploadFile(file);
          uploaded.push({ title: file.name.split('.')[0], fileUrl: url });
        }
        addResourceMutation.mutate(uploaded);
      } catch (err) {
        toast({ title: "Upload Failed", variant: "destructive" });
      } finally { setIsUploading(false); }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isAdmin === null) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  if (isAdmin === false) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-12 text-center">
      <Shield className="h-16 w-16 text-muted-foreground/30 mb-6" />
      <h1 className="text-2xl font-bold mb-2">Restricted Access</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">You do not have administrative clearance for this terminal.</p>
      <Button onClick={handleSignOut} variant="ghost" className="rounded-full">Sign Out</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary">
      <Header />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Minimalist Sidebar - horizontal scrollable nav on mobile, vertical sidebar on desktop */}
        <aside className="w-full lg:w-72 bg-card border-b lg:border-b-0 lg:border-r border-border p-4 sm:p-6 lg:p-8 flex flex-col lg:justify-between shadow-sm lg:sticky lg:top-20 h-fit lg:h-[calc(100vh-80px)]">
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-80">Command Center</h2>
              <p className="text-xl font-bold tracking-tight">Archive Portal</p>
            </div>

            <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
              <SidebarItem active={activeView === "upload"} icon={FilePlus} label="Deploy Asset" onClick={() => setActiveView("upload")} />
              <SidebarItem active={activeView === "library"} icon={Library} label="Archive Manager" onClick={() => setActiveView("library")} />
              <SidebarItem active={activeView === "dashboard"} icon={BarChart3} label="Terminal Stats" onClick={() => setActiveView("dashboard")} />
              <SidebarItem active={activeView === "community"} icon={Users} label="Community Hub" onClick={() => setActiveView("community")} />
            </nav>
          </div>

          <div className="hidden lg:block space-y-4 pt-10">
            <Separator className="bg-border" />
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border">
               <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border text-primary font-bold text-xs uppercase shadow-sm">
                 {user?.email?.charAt(0)}
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Authenticated</p>
                 <p className="text-xs font-bold text-foreground/80 truncate">{user?.email}</p>
               </div>
            </div>
            <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start rounded-xl gap-3 text-xs font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
              <LogOut className="h-4 w-4" /> <span>Terminate Session</span>
            </Button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-12 animate-in fade-in slide-in-from-right-2 duration-700">
          {activeView === "upload" && (
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Curatorial Workflow</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter italic font-serif">Deploy Resource</h1>
                <p className="text-muted-foreground font-medium max-w-xl">Synchronize new scholarly materials into the institutional digital library.</p>
              </div>

              <div className="grid gap-8 sm:gap-12 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Academic Semester</Label>
                    <Select value={selectedSemester} onValueChange={(v) => { setSelectedSemester(v); setSelectedSubject(""); setSelectedUnit(""); }}>
                      <SelectTrigger className="h-14 rounded-2xl bg-card border-border px-6 font-bold text-sm shadow-sm hover:border-primary/30 transition-all">
                        <SelectValue placeholder="Select Semester Node" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border rounded-2xl shadow-xl">
                        {semesters?.map((sem) => <SelectItem key={sem.id} value={sem.id.toString()} className="rounded-xl my-1">{sem.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Subject catalog</Label>
                    <Select value={selectedSubject} onValueChange={(v) => { setSelectedSubject(v); setSelectedUnit(""); }} disabled={!selectedSemester || isLoadingSubjects}>
                      <SelectTrigger className="h-14 rounded-2xl bg-card border-border px-6 font-bold text-sm shadow-sm hover:border-primary/30 transition-all">
                        <SelectValue placeholder={isLoadingSubjects ? "Syncing..." : "Select Subject Entry"} />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border rounded-2xl shadow-xl">
                        {subjects?.map((sub) => <SelectItem key={sub.id} value={sub.id.toString()} className="rounded-xl my-1">{sub.code} · {sub.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Asset Classification</Label>
                  <div className="flex flex-wrap gap-2">
                    {(["notes", "cie1", "cie2", "cie3", "see", "book"] as ResourceType[]).map((type) => (
                      <Button key={type} type="button" variant={resourceType === type ? "default" : "outline"} className={`h-12 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest transition-all ${resourceType === type ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-card border-border text-muted-foreground hover:border-primary/30'}`} onClick={() => setResourceType(type)}>
                        {type === "notes" ? "Lecture Notes" : type.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                {resourceType === "notes" && (
                  <div className="space-y-6 pt-2 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 font-sans">Academic UNIT Selection</Label>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Required Target</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                      <Button variant={selectedUnit === "none" || !selectedUnit ? "default" : "outline"} className={`h-12 sm:h-16 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase transition-all font-sans ${selectedUnit === "none" || !selectedUnit ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card border-border text-muted-foreground'}`} onClick={() => setSelectedUnit("none")}>
                        General
                      </Button>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Button key={num} variant={selectedUnit === num.toString() ? "default" : "outline"} className={`h-12 sm:h-16 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase transition-all font-sans ${selectedUnit === num.toString() ? 'bg-primary text-primary-foreground shadow-lg scale-105' : 'bg-card border-border text-muted-foreground'}`} onClick={() => setSelectedUnit(num.toString())}>
                          UNIT {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="bg-border" />

                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-1.5 bg-muted rounded-2xl sm:rounded-3xl w-full sm:w-fit border border-border/50">
                    <Button type="button" variant="ghost" className={`h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest gap-2 transition-all ${uploadMode === "link" ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:bg-background/50'}`} onClick={() => setUploadMode("link")}>
                      <Link className="h-4 w-4" /> Link Path
                    </Button>
                    <Button type="button" variant="ghost" className={`h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest gap-2 transition-all ${uploadMode === "file" ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:bg-background/50'}`} onClick={() => setUploadMode("file")}>
                      <Upload className="h-4 w-4" /> Core File
                    </Button>
                  </div>

                  <form onSubmit={handleAddResource} className="space-y-8">
                    {uploadMode === "link" ? (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Asset Title</Label>
                          <Input placeholder="Unit 1 Detailed Analysis..." className="h-14 rounded-2xl bg-card border-border px-6 font-bold focus:border-primary/40 transition-all shadow-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Resource URL</Label>
                          <Input placeholder="Registry Link..." className="h-14 rounded-2xl bg-card border-border px-6 font-medium text-primary focus:border-primary/40 transition-all shadow-sm" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="border border-border bg-card rounded-[32px] p-16 text-center hover:bg-muted/30 transition-all cursor-pointer shadow-sm group border-dashed" onClick={() => fileInputRef.current?.click()}>
                          <PlusCircle className="h-10 w-10 text-primary mx-auto mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                          <p className="text-xl font-bold tracking-tight">Ingest Local Archive</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-2">Maximum Payload: 50MB</p>
                          <Input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => {
                             const files = e.target.files;
                             if (files) setSelectedFiles(Array.from(files));
                          }} />
                        </div>
                        {selectedFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {selectedFiles.map((file, i) => (
                              <Badge key={i} variant="outline" className="h-10 rounded-xl px-4 flex gap-2 border-border bg-card text-xs font-bold py-0">
                                <span className="max-w-[150px] truncate">{file.name}</span>
                                <Trash2 className="h-3 w-3 text-destructive cursor-pointer hover:scale-110 transition-transform" onClick={() => setSelectedFiles(prev => prev.filter((_, idx) => idx !== i))} />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                      <div className="w-full sm:w-40 space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Publication Year</Label>
                        <Input type="number" placeholder="2024" className="h-14 rounded-2xl bg-card border-border px-6 font-bold shadow-sm" value={year} onChange={(e) => setYear(e.target.value)} />
                      </div>
                      <Button type="submit" className="flex-1 h-16 sm:h-20 rounded-2xl sm:rounded-[28px] bg-primary text-primary-foreground text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-xl shadow-primary/30 hover:scale-[1.01] transition-all gap-3 sm:gap-4 active:scale-95" disabled={addResourceMutation.isPending || isUploading || !selectedSubject}>
                        {isUploading || addResourceMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <><FileCheck className="h-5 w-5" /> Execute Deployment</>}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeView === "library" && (
            <div className="max-w-6xl mx-auto space-y-12">
               <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                  <Database className="h-3.5 w-3.5" />
                  <span>Metadata Repository</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter italic font-serif">Archive Manager</h1>
                <p className="text-muted-foreground font-medium max-w-xl">Verify, modify, and curate the historical academic record.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-1.5 bg-card border border-border rounded-2xl sm:rounded-[32px] shadow-sm">
                <Select value={selectedSemester} onValueChange={(v) => { setSelectedSemester(v); setSelectedSubject(""); }}>
                  <SelectTrigger className="h-14 rounded-[26px] border-none bg-transparent font-bold">
                    <SelectValue placeholder="Semester Node" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border rounded-2xl shadow-xl">
                    {semesters?.map((sem) => <SelectItem key={sem.id} value={sem.id.toString()} className="rounded-xl my-1">{sem.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedSemester}>
                  <SelectTrigger className="h-14 rounded-[26px] border-none bg-transparent font-bold">
                    <SelectValue placeholder="Subject entry" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border rounded-2xl shadow-xl">
                    {subjects?.map((sub) => <SelectItem key={sub.id} value={sub.id.toString()} className="rounded-xl my-1">{sub.code} · {sub.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {selectedSubject && resources && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pb-6 pt-2">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search catalog..." className="pl-14 h-16 rounded-[28px] bg-card border-border font-medium shadow-sm focus:border-primary/30" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="h-16 w-full md:w-64 rounded-[28px] bg-card border-border text-[10px] font-black uppercase tracking-widest shadow-sm">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border rounded-2xl shadow-xl">
                        <SelectItem value="all">ALL CLASSES</SelectItem>
                        <SelectItem value="notes">LECTURE UNITS</SelectItem>
                        <SelectItem value="cie1">CIE-1 PAPERS</SelectItem>
                        <SelectItem value="cie2">CIE-2 PAPERS</SelectItem>
                        <SelectItem value="cie3">CIE-3 PAPERS</SelectItem>
                        <SelectItem value="see">SEE PAPERS</SelectItem>
                        <SelectItem value="book">ACADEMIC BOOKS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4">
                    {resources.filter(r => filterType === 'all' || r.type === filterType).filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase())).map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        id={resource.id}
                        title={resource.title}
                        type={resource.type}
                        unit={resource.unit}
                        year={resource.year}
                        file_url={resource.file_url}
                        onEdit={(r) => { setEditResource(r as Resource); setIsEditOpen(true); }}
                        onDelete={(id, title) => setDeleteDialog({ open: true, id, title })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!selectedSubject && (
                <div className="py-48 text-center rounded-[48px] bg-card border border-border shadow-sm flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-1000">
                   <div className="w-24 h-24 rounded-full bg-muted/20 flex items-center justify-center border border-border mb-8 relative group">
                     <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
                     <Layers className="h-10 w-10 text-muted-foreground relative" />
                   </div>
                   <div className="space-y-2">
                     <h3 className="text-xl font-bold tracking-tight text-foreground/80">Terminal Idle</h3>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-40">Select subject node to sync registry</p>
                   </div>
                </div>
              )}
            </div>
          )}

          {activeView === "dashboard" && <AnalyticsDashboard />}
          
          {activeView === "community" && (
            <div className="max-w-4xl mx-auto space-y-12">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                 <div className="space-y-3">
                   <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                     <Users className="h-3.5 w-3.5" />
                     <span>Constituent Outreach</span>
                   </div>
                   <h1 className="text-3xl sm:text-5xl font-black tracking-tighter italic font-serif leading-none">Community Hub</h1>
                   <p className="text-muted-foreground font-medium max-w-xl">Verify institutional broadcasts and manage student mailing registries.</p>
                 </div>
                 
                 <Button 
                   onClick={handleExportRegistry}
                   className="h-14 sm:h-16 rounded-xl sm:rounded-[24px] px-6 sm:px-10 bg-foreground text-background text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.05] active:scale-95 transition-all gap-3 sm:gap-4 ring-offset-background focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto"
                 >
                   <Copy className="h-4 w-4" />
                   One-Click Registry Export
                 </Button>
               </div>

              {/* Manual Entry Form */}
              <Card className="rounded-[32px] border border-border bg-card shadow-sm overflow-hidden p-8">
                 <form onSubmit={handleAddSubscriber} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-3 w-full">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Manual Enrollment</Label>
                       <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Registry Email Identifier..." 
                            className="pl-14 h-14 rounded-2xl bg-muted/20 border-border text-sm font-bold focus:border-primary/40 focus:bg-card transition-all"
                            value={newSubscriberEmail}
                            onChange={(e) => setNewSubscriberEmail(e.target.value)}
                          />
                       </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="h-14 rounded-2xl px-10 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all"
                      disabled={addSubscriberMutation.isPending}
                    >
                      {addSubscriberMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enroll Member"}
                    </Button>
                 </form>
              </Card>


              {/* Google Sheets Response Board */}
              <div className="space-y-8 pt-16 pb-32">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 border border-green-500/20 shadow-xl shadow-green-500/10">
                      <Database className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black tracking-tighter italic font-serif">Institutional Response Board</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60 font-mono">Real-time Form Synchronization Active</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="h-14 rounded-2xl px-8 border-green-500/30 bg-green-50/50 hover:bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest gap-3 shadow-lg shadow-green-500/5 hover:scale-[1.02] active:scale-95 transition-all"
                    onClick={() => window.open('https://docs.google.com/spreadsheets/d/17A-ddjDs1u_gtD4UKsCNfcM_0GGnNcKqTopySuJfC2Y/edit?resourcekey=&gid=1810515499#gid=1810515499', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Board in New Tab
                  </Button>
                </div>
                
                <div className="rounded-2xl sm:rounded-[48px] border-2 border-border bg-card overflow-hidden shadow-2xl h-[500px] sm:h-[950px] relative group transition-all duration-700 hover:border-green-500/20">
                  <iframe 
                    src="https://docs.google.com/spreadsheets/d/17A-ddjDs1u_gtD4UKsCNfcM_0GGnNcKqTopySuJfC2Y/edit?resourcekey=&gid=1810515499#gid=1810515499" 
                    className="w-full h-full border-none grayscale-[0.3] hover:grayscale-0 transition-all duration-700 scale-[1.01]"
                    title="Institutional Response Registry"
                  />
                  <div className="absolute inset-0 pointer-events-none border-[32px] border-card rounded-[48px] opacity-100 transition-opacity"></div>
                  {/* Subtle glass overlay for a premium look when not focused */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-card to-transparent pointer-events-none opacity-80"></div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <DeleteConfirmDialog 
        resourceTitle={deleteDialog.title} 
        isOpen={deleteDialog.open} 
        isDeleting={deleteResourceMutation.isPending} 
        onClose={() => setDeleteDialog({ open: false, id: 0, title: "" })} 
        onConfirm={() => deleteResourceMutation.mutate(deleteDialog.id)} 
      />
      <EditResourceModal 
        resource={editResource} 
        isOpen={isEditOpen} 
        isUpdating={updateResourceMutation.isPending} 
        onClose={() => { setIsEditOpen(false); setEditResource(null); }} 
        onSave={(id, data) => updateResourceMutation.mutate({ id, data })} 
      />
    </div>
  );
};

interface SidebarItemProps {
  active: boolean;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const SidebarItem = ({ active, icon: Icon, label, onClick }: SidebarItemProps) => (
  <button onClick={onClick} className={`w-full lg:w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all group shrink-0 ${active ? 'bg-muted/40 border-border text-primary font-black shadow-sm' : 'hover:bg-muted/20 text-muted-foreground font-bold hover:text-foreground'}`}>
    <div className="flex items-center gap-4">
      <Icon className={`h-4 w-4 ${active ? 'text-primary' : 'opacity-40 group-hover:opacity-100'}`} />
      <span className="text-[11px] uppercase tracking-widest">{label}</span>
    </div>
    {active && <ChevronRight className="h-3 w-3" />}
  </button>
);

export default Admin;
