import { BookOpenText } from "lucide-react";

import { LevelBadge } from "@/components/LevelBadge";
import { LogoMark } from "@/components/LogoMark";

type CharacterCardProps = {
  level: number;
  focused: boolean;
};

export function CharacterCard({ level, focused }: CharacterCardProps): JSX.Element {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/20 p-4 shadow-[0_10px_26px_rgba(99,112,189,0.2)] backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-14 w-14 place-items-center rounded-xl border text-white ${
              focused
                ? "border-indigo-300/80 bg-indigo-300/28 animate-pulseGlow"
                : "border-white/60 bg-white/35"
            }`}
          >
            {focused ? <LogoMark size="sm" /> : <BookOpenText className="h-7 w-7 text-violet-700" />}
          </div>
          <div>
            <p className="text-sm font-semibold text-violet-950">Focus Hero</p>
            <p className="text-xs text-violet-900/70">Keep studying to level up</p>
          </div>
        </div>
        <LevelBadge level={level} />
      </div>
    </div>
  );
}
