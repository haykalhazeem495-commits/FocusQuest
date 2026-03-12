import { Progress } from "@/components/ui/progress";

type HpBarProps = {
  hp: number;
};

export function HpBar({ hp }: HpBarProps): JSX.Element {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-violet-900/70">
        <span>HP</span>
        <span>{hp}/100</span>
      </div>
      <Progress
        value={hp}
        className="h-2.5 border border-white/60 bg-white/45"
        indicatorClassName="bg-gradient-to-r from-orange-300 via-amber-300 to-indigo-500"
      />
    </div>
  );
}
