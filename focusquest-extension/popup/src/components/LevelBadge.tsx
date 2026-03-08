import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

type LevelBadgeProps = {
  level: number;
};

export function LevelBadge({ level }: LevelBadgeProps): JSX.Element {
  return (
    <Badge className="gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1 text-slate-900">
      <Sparkles className="h-3.5 w-3.5" />
      LVL {level}
    </Badge>
  );
}
