import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, GraduationCap, Library, TrendingUp, Database } from "lucide-react";

interface Resource {
  type: string;
}

interface StatsCardsProps {
  resources: Resource[];
  totalSubjects?: number;
}

export function StatsCards({ resources, totalSubjects }: StatsCardsProps) {
  const notesCount = resources.filter((r) => r.type === "notes").length;
  const pyqCount = resources.filter((r) =>
    ["cie1", "cie2", "cie3", "see"].includes(r.type)
  ).length;
  const booksCount = resources.filter((r) => r.type === "book").length;

  const stats = [
    {
      label: "Total Resources",
      value: resources.length,
      icon: <Database className="h-5 w-5" />,
      color: "from-indigo-500/20 to-blue-500/20 border-indigo-300/30",
      iconColor: "text-indigo-500",
    },
    {
      label: "Notes",
      value: notesCount,
      icon: <BookOpen className="h-5 w-5" />,
      color: "from-blue-500/20 to-cyan-500/20 border-blue-300/30",
      iconColor: "text-blue-500",
    },
    {
      label: "Question Papers",
      value: pyqCount,
      icon: <FileText className="h-5 w-5" />,
      color: "from-purple-500/20 to-pink-500/20 border-purple-300/30",
      iconColor: "text-purple-500",
    },
    {
      label: "Books",
      value: booksCount,
      icon: <Library className="h-5 w-5" />,
      color: "from-amber-500/20 to-orange-500/20 border-amber-300/30",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`border bg-gradient-to-br ${stat.color} hover:scale-[1.02] transition-transform duration-200`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`${stat.iconColor}`}>{stat.icon}</span>
              {stat.value > 0 && (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
