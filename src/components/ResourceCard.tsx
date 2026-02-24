import { useState } from "react";
import { FileText, Download, ExternalLink, Calendar } from "lucide-react";
import { ResourcePreviewDialog } from "./ResourcePreviewDialog";

interface ResourceCardProps {
  id: number;
  title: string;
  fileUrl: string;
  year?: number | null;
  type?: string;
  compact?: boolean;
  index?: number;
}

const typeConfig: Record<string, { label: string; color: string }> = {
  "cie1": { label: "CIE-1", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  "cie2": { label: "CIE-2", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  "cie3": { label: "CIE-3", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" },
  "see": { label: "SEE", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  "notes": { label: "Notes", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
  "book": { label: "Book", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" }
};

export function ResourceCard({ title, fileUrl, year, type }: ResourceCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const typeInfo = type ? typeConfig[type] : null;

  return (
    <>
      <div 
        className="flex items-center justify-between border border-border bg-card/50 backdrop-blur-sm px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        onClick={() => setPreviewOpen(true)}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {title}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-[10px] px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full font-bold uppercase tracking-wider">
                PDF
              </span>
              {year && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">
                  <Calendar className="h-3 w-3" />
                  {year}
                </span>
              )}
              {typeInfo && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${typeInfo.color}`}>
                  {typeInfo.label}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewOpen(true);
            }}
            className="p-2.5 hover:bg-primary/10 rounded-xl transition-all group/btn"
            title="View online"
          >
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover/btn:scale-110 transition-all" />
          </button>
          <a
            href={fileUrl}
            download
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 hover:bg-success/10 rounded-xl transition-all group/dl"
            title="Download"
          >
            <Download className="h-5 w-5 text-muted-foreground group-hover:text-success group-hover/dl:scale-110 transition-all" />
          </a>
        </div>
      </div>

      <ResourcePreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        title={title}
        fileUrl={fileUrl}
      />
    </>
  );
}
