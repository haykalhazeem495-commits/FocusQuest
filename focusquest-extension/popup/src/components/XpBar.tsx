import { Progress } from "@/components/ui/progress";

type XpBarProps = {
  xp: number;
};

export function XpBar({ xp }: XpBarProps): JSX.Element {
  const progressInLevel = xp % 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-violet-900/70">
        <span>XP</span>
        <span>{progressInLevel}/100</span>
      </div>
      <Progress
        value={progressInLevel}
        className="h-2.5 border border-white/60 bg-white/45"
        indicatorClassName="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500"
      />
    </div>
  );
}
