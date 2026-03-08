import { Progress } from "@/components/ui/progress";

type HpBarProps = {
  hp: number;
};

export function HpBar({ hp }: HpBarProps): JSX.Element {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>HP</span>
        <span>{hp}/100</span>
      </div>
      <Progress
        value={hp}
        className="h-2.5 bg-rose-950/40"
        indicatorClassName="bg-gradient-to-r from-rose-500 to-orange-400"
      />
    </div>
  );
}
