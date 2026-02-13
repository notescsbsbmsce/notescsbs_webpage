import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, GraduationCap, Library, ExternalLink, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ResourceType = "notes" | "cie1" | "cie2" | "cie3" | "see" | "book";

interface ResourceCardProps {
  id: number;
  title: string;
  type: ResourceType;
  unit: string | null;
  year: number | null;
  file_url: string;
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

export function ResourceCard({ id, title, type, unit, year, file_url, onDelete }: ResourceCardProps) {
  const { toast } = useToast();
  const config = TYPE_CONFIG[type];

  const isDriveLink = file_url.includes("drive.google.com");

  const copyLink = () => {
    navigator.clipboard.writeText(file_url);
    toast({ title: "📋 Copied!", description: "Link copied to clipboard" });
  };

  return (
    <div className="group relative flex items-start gap-3 p-4 rounded-xl border border-border bg-card/80 hover:bg-accent/50 hover:border-primary/30 hover:shadow-md transition-all duration-300">
      {/* Type Icon */}
      <div className={`p-2.5 rounded-xl shrink-0 ${config.color}`}>
        {config.icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground mb-1.5 leading-tight">
          {title}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <Badge className={`text-[10px] px-1.5 py-0 h-5 border ${config.color}`}>
            {config.label}
          </Badge>
          {unit && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
              📂 {unit}
            </Badge>
          )}
          {year && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
              📅 {year}
            </Badge>
          )}
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
            {isDriveLink ? "☁️ Drive" : "💾 Storage"}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 hover:bg-primary/10 hover:text-primary"
            onClick={() => window.open(file_url, "_blank")}
          >
            <ExternalLink className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 hover:bg-primary/10 hover:text-primary"
            onClick={copyLink}
          >
            <Copy className="h-3 w-3" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(id, title)}
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export { TYPE_CONFIG };
export type { ResourceType };
