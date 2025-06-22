import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  SiJavascript,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";

const HotQuestions = [
  {
    Question: "You can add components and dependencies using the cli.",
  },
  {
    Question: "Check out our comprehensive documentation for more details.",
  },
  {
    Question:
      "New features and improvements are available in the latest version.",
  },
  {
    Question: "Stay updated with real-time project notifications.",
  },
  {
    Question: "Enhanced security features are now enabled by default.",
  },
];

const popularTags = [
  { name: "javascript", count: 1234, icon: SiJavascript, color: "#F7DF1E" },
  { name: "react", count: 890, icon: SiReact, color: "#61DAFB" },
  { name: "typescript", count: 756, icon: SiTypescript, color: "#3178C6" },
  { name: "nextjs", count: 543, icon: SiNextdotjs, color: "#000000" },
  { name: "tailwind", count: 432, icon: SiTailwindcss, color: "#06B6D4" },
  { name: "node", count: 321, icon: SiNodedotjs, color: "#339933" },
];

export default function Right({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="h-full overflow-y-auto p-4">{children}</div>
      <aside className="fixed right-0 top-16 h-[calc(100vh-64px)] w-[350px] border-l border-border bg-background">
        <h2 className="p-4 pb-0 font-semibold text-lg">Hot Network</h2>
        <div className="space-y-2 p-4">
          {HotQuestions.map((alert, index) => (
            <Alert key={index}>
              <Terminal className="h-4 w-4" />
              <AlertDescription>{alert.Question}</AlertDescription>
            </Alert>
          ))}
        </div>

        <div>
          <h2 className="p-4 pb-2 font-semibold text-lg flex items-center gap-2">
            Popular Tags
          </h2>
          <div className="flex flex-wrap gap-2 px-4 pb-4">
            {popularTags.map((tag, index) => {
              const Icon = tag.icon;
              return (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 hover:bg-accent transition-colors duration-200 flex items-center gap-2"
                >
                  <Icon className="w-3 h-3" style={{ color: tag.color }} />
                  <span>{tag.name}</span>
                  <span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {tag.count}
                  </span>
                </Badge>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
