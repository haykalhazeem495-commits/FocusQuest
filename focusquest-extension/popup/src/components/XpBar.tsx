import { Progress } from "@/components/ui/progress";

type XpBarProps = {
  xp: number;
};

export function XpBar({ xp }: XpBarProps): JSX.Element {
  const progressInLevel = xp % 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>XP</span>
        <span>{progressInLevel}/100</span>
      </div>
      <Progress
        value={progressInLevel}
        className="h-2.5 bg-cyan-950/40"
        indicatorClassName="bg-gradient-to-r from-cyan-400 to-emerald-400"
      />
    </div>
  );
}
