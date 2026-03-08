import { BookOpenText } from "lucide-react";

import { LevelBadge } from "@/components/LevelBadge";

type CharacterCardProps = {
  level: number;
  focused: boolean;
};

export function CharacterCard({ level, focused }: CharacterCardProps): JSX.Element {
  return (
    <div className="rounded-xl border border-border/70 bg-slate-900/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-14 w-14 place-items-center rounded-xl border text-white ${
              focused
                ? "border-emerald-300/60 bg-emerald-500/20 animate-pulseGlow"
                : "border-slate-500/50 bg-slate-700/50"
            }`}
          >
            <BookOpenText className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-medium">Focus Hero</p>
            <p className="text-xs text-muted-foreground">Keep studying to level up</p>
          </div>
        </div>
        <LevelBadge level={level} />
      </div>
    </div>
  );
}
