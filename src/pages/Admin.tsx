import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2, Plus, Trash2, LogOut, BookOpen, FileText,
  GraduationCap, Upload, Link, Library, BarChart3,
  Search, ChevronDown, Shield, CheckCircle2,
  ExternalLink, Copy, FolderOpen, Sparkles
} from "lucide-react";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { ResourceCard } from "@/components/admin/ResourceCard";
import { StatsCards } from "@/components/admin/StatsCards";
import { User, Session } from "@supabase/supabase-js";

type ResourceType = "notes" | "cie1" | "cie2" | "cie3" | "see" | "book";

// File validation constants
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'jpg', 'jpeg', 'png', 'mp4', 'c', 'cpp', 'py', 'java', 'js', 'ts', 'h'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-powerpoint',
  'application/msword',
  'text/plain',
  'image/jpeg',
  'image/png',
  'video/mp4',
  'text/x-c',
  'text/x-c++src',
  'text/x-python',
  'text/x-java',
  'text/javascript',
  'application/typescript',
  'text/x-csrc',
  'text/x-c++',
];

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

interface Resource {
  id: number;
  title: string;
  file_url: string;
  type: ResourceType;
  unit: string | null;
  year: number | null;
  subject_id: number;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  
  // Form states
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
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search & filter for resources
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Delete dialog
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number; title: string }>({
    open: false, id: 0, title: "",
  });

  // Active admin tab
  const [activeTab, setActiveTab] = useState("add");
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Auth check
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        } else {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });
    
    setIsAdmin(data === true);
  };

  // Fetch semesters
  const { data: semesters } = useQuery({
    queryKey: ["semesters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("*")
        .order("order");
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });

  // Fetch subjects for selected semester
  const { data: subjects, isLoading: isLoadingSubjects } = useQuery({
    queryKey: ["subjects", selectedSemester],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("semester_id", parseInt(selectedSemester))
        .order("code");
      if (error) throw error;
      return data as Subject[];
    },
    enabled: !!selectedSemester,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch units for selected subject
  const { data: units } = useQuery({
    queryKey: ["units", selectedSubject],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("units")
        .select("*")
        .eq("subject_id", parseInt(selectedSubject))
        .order("unit_number");
      if (error) throw error;
      return data as Unit[];
    },
    enabled: !!selectedSubject,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch existing resources for selected subject
  const { data: resources, isLoading: isLoadingResources } = useQuery({
    queryKey: ["resources", selectedSubject],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("subject_id", parseInt(selectedSubject))
        .order("type")
        .order("unit");
      if (error) throw error;
      return data as Resource[];
    },
    enabled: !!selectedSubject,
    staleTime: 2 * 60 * 1000,
  });

  // Filtered resources
  const filteredResources = useMemo(() => {
    if (!resources) return [];
    let filtered = resources;

    if (filterType !== "all") {
      filtered = filtered.filter((r) => r.type === filterType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.unit?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [resources, filterType, searchQuery]);

  // Validate file before upload
  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File "${file.name}" exceeds 50MB limit`;
    }
    
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !ALLOWED_EXTENSIONS.includes(fileExt)) {
      return `File "${file.name}" has invalid extension. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`;
    }
    
    const isCodeFile = ['c', 'cpp', 'py', 'java', 'js', 'ts', 'h'].includes(fileExt);
    if (!isCodeFile && file.type && !ALLOWED_MIME_TYPES.some(type => file.type.startsWith(type.split('/')[0]))) {
      return `File "${file.name}" has invalid file type`;
    }
    
    return null;
  };

  // Upload file to storage with timeout
  const uploadFile = async (file: File): Promise<string> => {
    const validationError = validateFile(file);
    if (validationError) {
      throw new Error(validationError);
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${selectedSubject}/${fileName}`;
    
    const UPLOAD_TIMEOUT = 120000;
    
    const uploadPromise = supabase.storage
      .from('resources')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Upload timed out after ${UPLOAD_TIMEOUT / 1000} seconds.`));
      }, UPLOAD_TIMEOUT);
    });
    
    const { data, error } = await Promise.race([uploadPromise, timeoutPromise]);
    
    if (error) {
      if (error.message?.includes('duplicate')) {
        throw new Error('A file with this name already exists.');
      }
      if (error.message?.includes('policy')) {
        throw new Error('Permission denied. Please ensure you are logged in as admin.');
      }
      throw new Error(`Upload failed: ${error.message}`);
    }
    
    const { data: urlData } = supabase.storage
      .from('resources')
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  };

  // Process Google Drive URL
  const processDriveUrl = (url: string): string => {
    let processedUrl = url.trim();
    let fileId = null;

    const viewMatch = processedUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (viewMatch) fileId = viewMatch[1];

    const openMatch = processedUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openMatch) fileId = openMatch[1];

    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }

    return processedUrl;
  };

  // Add resource mutation
  const addResourceMutation = useMutation({
    mutationFn: async (resources: { title: string; fileUrl: string }[]) => {
      for (const res of resources) {
        const resourceData = {
          subject_id: parseInt(selectedSubject),
          title: res.title.trim(),
          file_url: res.fileUrl,
          type: resourceType,
          unit: resourceType === "notes" && selectedUnit && selectedUnit !== "none" ? `Unit ${selectedUnit}` : null,
          year: year ? parseInt(year) : null,
        };

        const { error } = await supabase.from("resources").insert(resourceData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "✅ Resource Added!",
        description: "Students can now access this resource.",
      });
      setTitle("");
      setFileUrl("");
      setYear("");
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["resources", selectedSubject] });
    },
    onError: (error: Error) => {
      toast({
        title: "❌ Error",
        description: error.message || "Failed to add resources",
        variant: "destructive",
      });
    },
  });

  // Delete resource mutation
  const deleteResourceMutation = useMutation({
    mutationFn: async (resourceId: number) => {
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", resourceId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "🗑️ Deleted",
        description: "Resource removed successfully",
      });
      setDeleteDialog({ open: false, id: 0, title: "" });
      queryClient.invalidateQueries({ queryKey: ["resources", selectedSubject] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete",
        variant: "destructive",
      });
    },
  });

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
        return;
      }
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      navigate("/");
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubject) {
      toast({
        title: "⚠️ Missing Subject",
        description: "Please select a semester and subject first",
        variant: "destructive",
      });
      return;
    }

    if (uploadMode === "link") {
      if (!title.trim() || !fileUrl.trim()) {
        toast({
          title: "⚠️ Missing Fields",
          description: "Please provide title and Google Drive link",
          variant: "destructive",
        });
        return;
      }

      const processedUrl = processDriveUrl(fileUrl);

      if (!processedUrl.startsWith('http')) {
        toast({
          title: "❌ Invalid URL",
          description: "Please enter a valid Google Drive link",
          variant: "destructive",
        });
        return;
      }

      addResourceMutation.mutate([{ title: title.trim(), fileUrl: processedUrl }]);
      return;
    }

    if (uploadMode === "file" && selectedFiles.length === 0) {
      toast({
        title: "⚠️ No Files",
        description: "Please select at least one file to upload",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      const uploadedResources: { title: string; fileUrl: string }[] = [];
      const totalFiles = selectedFiles.length;
      
      const getFileTypeLabel = (fileName: string): string => {
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        const extLabels: Record<string, string> = {
          'pdf': 'PDF', 'doc': 'Document', 'docx': 'Document',
          'ppt': 'Presentation', 'pptx': 'Presentation', 'txt': 'Text',
          'jpg': 'Image', 'jpeg': 'Image', 'png': 'Image', 'mp4': 'Video',
          'c': 'Code', 'cpp': 'Code', 'py': 'Code', 'java': 'Code',
          'js': 'Code', 'ts': 'Code', 'h': 'Code',
        };
        return extLabels[ext] || 'File';
      };
      
      let successCount = 0;
      
      for (let i = 0; i < totalFiles; i++) {
        const file = selectedFiles[i];
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
        setUploadProgress(`Uploading ${i + 1}/${totalFiles}: ${file.name} (${fileSizeMB}MB)`);
        
        try {
          const url = await uploadFile(file);
          successCount++;
          const fileTypeLabel = getFileTypeLabel(file.name);
          const genericTitle = totalFiles === 1 ? fileTypeLabel : `${fileTypeLabel} ${successCount}`;
          uploadedResources.push({ title: genericTitle, fileUrl: url });
        } catch (fileError: unknown) {
          const errorMessage = fileError instanceof Error ? fileError.message : 'Unknown error';
          toast({
            title: `Failed: File ${i + 1}`,
            description: errorMessage,
            variant: "destructive",
          });
        }
      }
      
      setUploadProgress("");
      
      if (uploadedResources.length > 0) {
        addResourceMutation.mutate(uploadedResources);
      } else if (totalFiles > 0) {
        toast({
          title: "Upload Failed",
          description: "No files were uploaded successfully.",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload files';
      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const invalidFiles: string[] = [];
      const validFiles: File[] = [];
      
      for (const file of fileArray) {
        const error = validateFile(file);
        if (error) {
          invalidFiles.push(error);
        } else {
          validFiles.push(file);
        }
      }
      
      if (invalidFiles.length > 0) {
        toast({
          title: "Invalid Files",
          description: invalidFiles.join('\n'),
          variant: "destructive",
        });
      }
      
      setSelectedFiles(validFiles);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Get selected subject name for display
  const selectedSubjectName = useMemo(() => {
    if (!selectedSubject || !subjects) return "";
    const sub = subjects.find((s) => s.id.toString() === selectedSubject);
    return sub ? `${sub.code} - ${sub.name}` : "";
  }, [selectedSubject, subjects]);

  // Loading state
  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20 flex flex-col items-center justify-center gap-4">
        <div className="p-4 rounded-2xl bg-primary/10 animate-pulse">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">Verifying Access</p>
          <p className="text-sm text-muted-foreground mt-1">Checking admin privileges...</p>
        </div>
        <Loader2 className="h-6 w-6 animate-spin text-primary mt-2" />
      </div>
    );
  }

  // Not admin
  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-destructive/10 w-fit mx-auto mb-6">
              <Shield className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have admin privileges. Contact the administrator to get access.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Logged in as: {user?.email}
            </p>
            <Button onClick={handleSignOut} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Admin Header */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/20 dark:border-indigo-800/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-300/30">
                <Shield className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Welcome, {user?.email?.split("@")[0]} · Manage resources for students
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1 text-xs">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Admin
              </Badge>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1.5">
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="add" className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Resource</span>
              <span className="sm:hidden">Add</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Manage</span>
              <span className="sm:hidden">Manage</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
          </TabsList>

          {/* ============ ADD RESOURCE TAB ============ */}
          <TabsContent value="add">
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Step 1: Select Context */}
              <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</div>
                    Select Location
                  </CardTitle>
                  <CardDescription className="text-xs">Choose where to add the resource</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Semester */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Semester</Label>
                    <Select value={selectedSemester} onValueChange={(v) => {
                      setSelectedSemester(v);
                      setSelectedSubject("");
                      setSelectedUnit("");
                    }}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters?.map((sem) => (
                          <SelectItem key={sem.id} value={sem.id.toString()}>
                            {sem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Subject</Label>
                    <Select 
                      value={selectedSubject} 
                      onValueChange={(v) => {
                        setSelectedSubject(v);
                        setSelectedUnit("");
                      }}
                      disabled={!selectedSemester || isLoadingSubjects}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder={isLoadingSubjects ? "Loading..." : "Select subject"} />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingSubjects ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : subjects && subjects.length > 0 ? (
                          subjects.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id.toString()}>
                              {sub.code} - {sub.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="py-2 px-2 text-sm text-muted-foreground">
                            No subjects found
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Resource Type */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Resource Type</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {(["notes", "cie1", "cie2", "cie3", "see", "book"] as ResourceType[]).map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant={resourceType === type ? "default" : "outline"}
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => setResourceType(type)}
                        >
                          {type === "notes" ? "Notes" : type === "cie1" ? "CIE-1" : type === "cie2" ? "CIE-2" : type === "cie3" ? "CIE-3" : type === "see" ? "SEE" : "Book"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Unit Selection */}
                  {resourceType === "notes" && units && units.length > 0 && (
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Unit (Optional)</Label>
                      <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Unit (QB/General)</SelectItem>
                          {units?.map((unit) => (
                            <SelectItem key={unit.id} value={unit.unit_number.toString()}>
                              Unit {unit.unit_number}: {unit.unit_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Year */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Year (Optional)</Label>
                    <Input
                      type="number"
                      placeholder="2024"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      min="2020"
                      max="2030"
                      className="h-9"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Add Content */}
              <Card className="lg:col-span-3 border-purple-200/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold">2</div>
                    Add Content
                    {selectedSubjectName && (
                      <Badge variant="outline" className="ml-auto text-xs font-normal">
                        📚 {selectedSubjectName}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs">Upload file or paste Google Drive link</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddResource} className="space-y-4">
                    {/* Upload mode toggle */}
                    <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
                      <Button
                        type="button"
                        variant={uploadMode === "link" ? "default" : "ghost"}
                        size="sm"
                        className="flex-1 gap-1.5 rounded-lg"
                        onClick={() => setUploadMode("link")}
                      >
                        <Link className="h-4 w-4" />
                        Google Drive Link
                      </Button>
                      <Button
                        type="button"
                        variant={uploadMode === "file" ? "default" : "ghost"}
                        size="sm"
                        className="flex-1 gap-1.5 rounded-lg"
                        onClick={() => setUploadMode("file")}
                      >
                        <Upload className="h-4 w-4" />
                        Upload File
                      </Button>
                    </div>

                    {/* Title (link mode only) */}
                    {uploadMode === "link" && (
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Title *</Label>
                        <Input
                          placeholder="e.g., Unit 1 Notes - Introduction to DS"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="h-9"
                        />
                      </div>
                    )}

                    {/* Google Drive URL */}
                    {uploadMode === "link" && (
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Google Drive Link *</Label>
                        <Input
                          placeholder="Paste any Google Drive link here..."
                          value={fileUrl}
                          onChange={(e) => setFileUrl(e.target.value)}
                          className="h-9"
                        />
                        <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                            ✅ Auto-optimized
                          </span>
                          <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                            📋 Any Drive format
                          </span>
                          <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
                            🔓 Set to "Anyone with link"
                          </span>
                        </div>
                      </div>
                    )}

                    {/* File Upload */}
                    {uploadMode === "file" && (
                      <div className="space-y-3">
                        <Label className="text-xs font-medium">Select Files *</Label>
                        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm font-medium text-muted-foreground">
                            Click to browse or drag files here
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, DOC, PPT, TXT, Images, Code files (Max 50MB)
                          </p>
                        </div>
                        <Input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp4,.c,.cpp,.py,.java,.js,.ts,.h"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        {selectedFiles.length > 0 && (
                          <div className="space-y-1.5">
                            <p className="text-xs font-medium text-muted-foreground">
                              {selectedFiles.length} file(s) selected:
                            </p>
                            {selectedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between text-xs bg-muted/50 rounded-lg px-3 py-2">
                                <span className="truncate flex-1 mr-2 font-medium">{file.name}</span>
                                <div className="flex items-center gap-2 shrink-0">
                                  <Badge variant="outline" className="text-[10px]">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </Badge>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 text-destructive hover:text-destructive"
                                    onClick={() => removeFile(index)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {uploadProgress && (
                          <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 rounded-lg p-2">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {uploadProgress}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full h-10 gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg"
                      disabled={addResourceMutation.isPending || isUploading || !selectedSubject}
                    >
                      {(addResourceMutation.isPending || isUploading) ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {isUploading ? "Uploading..." : "Adding..."}
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          {uploadMode === "file" && selectedFiles.length > 1 
                            ? `Add ${selectedFiles.length} Resources` 
                            : "Add Resource"}
                        </>
                      )}
                    </Button>

                    {!selectedSubject && (
                      <p className="text-xs text-muted-foreground text-center">
                        ← Select semester and subject first
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ============ MANAGE RESOURCES TAB ============ */}
          <TabsContent value="manage">
            <div className="space-y-6">
              {/* Context Selection */}
              <Card className="border-blue-200/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-3 items-end">
                    <div className="flex-1 min-w-[150px] space-y-1">
                      <Label className="text-xs">Semester</Label>
                      <Select value={selectedSemester} onValueChange={(v) => {
                        setSelectedSemester(v);
                        setSelectedSubject("");
                      }}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters?.map((sem) => (
                            <SelectItem key={sem.id} value={sem.id.toString()}>
                              {sem.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 min-w-[200px] space-y-1">
                      <Label className="text-xs">Subject</Label>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedSemester}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects?.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id.toString()}>
                              {sub.code} - {sub.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedSubject && resources && (
                <>
                  {/* Stats */}
                  <StatsCards resources={resources} />

                  {/* Search & Filter bar */}
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex-1 min-w-[200px] relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9"
                      />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[140px] h-9">
                        <SelectValue placeholder="Filter type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="notes">📝 Notes</SelectItem>
                        <SelectItem value="cie1">📋 CIE-1</SelectItem>
                        <SelectItem value="cie2">📋 CIE-2</SelectItem>
                        <SelectItem value="cie3">📋 CIE-3</SelectItem>
                        <SelectItem value="see">📊 SEE</SelectItem>
                        <SelectItem value="book">📚 Books</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge variant="outline" className="text-xs h-9 px-3">
                      {filteredResources.length} of {resources.length}
                    </Badge>
                  </div>

                  {/* Resource List */}
                  {isLoadingResources ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : filteredResources.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/50">
                      {resources.length === 0 ? (
                        <>
                          <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                          <p className="text-lg font-semibold text-muted-foreground mb-1">No Resources Yet</p>
                          <p className="text-sm text-muted-foreground">
                            Go to "Add Resource" tab to add your first resource
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4 gap-2"
                            onClick={() => setActiveTab("add")}
                          >
                            <Plus className="h-4 w-4" />
                            Add Resource
                          </Button>
                        </>
                      ) : (
                        <>
                          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                          <p className="text-muted-foreground font-medium">No matching resources</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Try adjusting your search or filter
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      {filteredResources.map((resource) => (
                        <ResourceCard
                          key={resource.id}
                          id={resource.id}
                          title={resource.title}
                          type={resource.type}
                          unit={resource.unit}
                          year={resource.year}
                          file_url={resource.file_url}
                          onDelete={(id, title) => setDeleteDialog({ open: true, id, title })}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {!selectedSubject && (
                <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-card/50">
                  <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground mb-1">Select a Subject</p>
                  <p className="text-sm text-muted-foreground">
                    Choose a semester and subject above to view and manage resources
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ============ ANALYTICS TAB ============ */}
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        resourceTitle={deleteDialog.title}
        isOpen={deleteDialog.open}
        isDeleting={deleteResourceMutation.isPending}
        onClose={() => setDeleteDialog({ open: false, id: 0, title: "" })}
        onConfirm={() => deleteResourceMutation.mutate(deleteDialog.id)}
      />
    </div>
  );
};

export default Admin;
