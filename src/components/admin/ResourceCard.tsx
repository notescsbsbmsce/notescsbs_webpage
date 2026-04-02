import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, GraduationCap, Library, ExternalLink, Copy, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ResourceType = "notes" | "cie1" | "cie2" | "cie3" | "see" | "book";

interface ResourceCardProps {
  id: number;
  title: string;
  type: ResourceType;
  unit: string | null;
  year: number | null;
  file_url: string;
  onEdit: (resource: { id: number; title: string; type: ResourceType; unit: string | null; year: number | null; file_url: string }) => void;
  onDelete: (id: number, title: string) => void;
}

const TYPE_CONFIG: Record<ResourceType, { label: string; color: string; icon: React.ReactNode }> = {
  notes: {
    label: "Notes",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-300/30",
    icon: <BookOpen className="h-4 w-4" />,
  },
  cie1: {
    label: "CIE-1",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-300/30",
    icon: <FileText className="h-4 w-4" />,
  },
  cie2: {
    label: "CIE-2",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300/30",
    icon: <FileText className="h-4 w-4" />,
  },
  cie3: {
    label: "CIE-3",
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-300/30",
    icon: <FileText className="h-4 w-4" />,
  },
  see: {
    label: "SEE",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-300/30",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  book: {
    label: "Book",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300/30",
    icon: <Library className="h-4 w-4" />,
  },
};

export function ResourceCard({ id, title, type, unit, year, file_url, onEdit, onDelete }: ResourceCardProps) {
  const { toast } = useToast();
  const config = TYPE_CONFIG[type];

  const isDriveLink = file_url.includes("drive.google.com");

  const copyLink = () => {
    navigator.clipboard.writeText(file_url);
    toast({ title: "📋 Copied!", description: "Link copied to clipboard" });
  };

  return (
    <div className="group relative flex items-center gap-6 p-6 rounded-[32px] border border-border bg-card hover:bg-muted/10 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-lg">
      {/* High-Fidelity Type Icon */}
      <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center border border-border shadow-sm ${config.color} group-hover:scale-110 transition-transform duration-500`}>
        {config.icon}
      </div>

      {/* Asset Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-lg font-black text-foreground tracking-tight leading-tight font-serif uppercase group-hover:text-primary transition-colors duration-300">
              {title}
            </p>
            
            {/* Context Metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={`text-[9px] px-3 py-0.5 h-6 font-black uppercase tracking-widest border-transparent bg-muted/50 ${config.color.split(' ')[1]}`}>
                {config.label}
              </Badge>
              {unit && (
                <Badge variant="outline" className="text-[9px] px-3 py-0.5 h-6 font-black uppercase tracking-widest border-border bg-muted/50 text-muted-foreground font-sans">
                  <span className="text-primary mr-1.5 font-black font-sans">UNIT</span> {unit.replace('Unit ', '')}
                </Badge>
              )}
              {year && (
                <Badge variant="outline" className="text-[9px] px-3 py-0.5 h-6 font-black uppercase tracking-widest border-border bg-muted/50 text-muted-foreground">
                  {year} ACADEMIC
                </Badge>
              )}
              <Badge variant="outline" className="text-[9px] px-3 py-0.5 h-6 font-black uppercase tracking-widest border-transparent bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {isDriveLink ? "CLOUD DEPLOYED" : "LOCAL STORAGE"}
              </Badge>
            </div>
          </div>

          {/* Institutional Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-border"
              onClick={() => window.open(file_url, "_blank")}
              title="Open Resource"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-border"
              onClick={copyLink}
              title="Copy Identifier"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-muted/30 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 transition-all border border-border"
              onClick={() => onEdit({ id, title, type, unit, year, file_url })}
              title="Modify Asset"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-muted/30 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all border border-border"
              onClick={() => onDelete(id, title)}
              title="Purge Asset"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TYPE_CONFIG };
export type { ResourceType };
