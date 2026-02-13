import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, Pencil } from "lucide-react";
import type { ResourceType } from "@/components/admin/ResourceCard";

interface EditResource {
  id: number;
  title: string;
  file_url: string;
  type: ResourceType;
  unit: string | null;
  year: number | null;
}

interface EditResourceModalProps {
  resource: EditResource | null;
  isOpen: boolean;
  isUpdating: boolean;
  onClose: () => void;
  onSave: (id: number, data: { title: string; file_url: string; type: ResourceType; unit: string | null; year: number | null }) => void;
}

export function EditResourceModal({
  resource,
  isOpen,
  isUpdating,
  onClose,
  onSave,
}: EditResourceModalProps) {
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [type, setType] = useState<ResourceType>("notes");
  const [unit, setUnit] = useState("");
  const [year, setYear] = useState("");

  // Pre-fill form when resource changes
  useEffect(() => {
    if (resource) {
      setTitle(resource.title);
      setFileUrl(resource.file_url);
      setType(resource.type);
      setUnit(resource.unit?.replace("Unit ", "") || "");
      setYear(resource.year?.toString() || "");
    }
  }, [resource]);

  const handleSave = () => {
    if (!resource) return;
    onSave(resource.id, {
      title: title.trim(),
      file_url: fileUrl.trim(),
      type,
      unit: unit ? `Unit ${unit}` : null,
      year: year ? parseInt(year) : null,
    });
  };

  if (!resource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-primary" />
            Edit Resource
          </DialogTitle>
          <DialogDescription>
            Modify the resource details below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resource title"
              className="h-9"
            />
          </div>

          {/* File URL */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">File URL</Label>
            <Input
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="Google Drive link or file URL"
              className="h-9"
            />
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Resource Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as ResourceType)}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="notes">📝 Notes</SelectItem>
                <SelectItem value="cie1">📋 CIE-1</SelectItem>
                <SelectItem value="cie2">📋 CIE-2</SelectItem>
                <SelectItem value="cie3">📋 CIE-3</SelectItem>
                <SelectItem value="see">📊 SEE</SelectItem>
                <SelectItem value="book">📚 Book</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Unit & Year in a row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Unit (Optional)</Label>
              <Input
                type="number"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="1-5"
                min="1"
                max="5"
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Year (Optional)</Label>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                min="2020"
                max="2030"
                className="h-9"
              />
            </div>
          </div>

          {/* Storage type indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Storage:</span>
            <Badge variant="outline" className="text-[10px]">
              {fileUrl.includes("drive.google.com") ? "☁️ Google Drive" : "💾 Supabase Storage"}
            </Badge>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isUpdating || !title.trim() || !fileUrl.trim()}
            className="gap-2"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
