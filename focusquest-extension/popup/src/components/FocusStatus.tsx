import { Badge } from "@/components/ui/badge";
import { isEducationalDomain } from "@/lib/educationSites";

type FocusStatusProps = {
  focused: boolean;
  hp: number;
  currentSite: string;
};

function getMessage(focused: boolean, hp: number): string {
  if (hp <= 20) {
    return "Your hero is exhausted!";
  }
  if (focused) {
    return "Your hero is studying!";
  }
  return "Your hero is losing focus...";
}

export function FocusStatus({ focused, hp, currentSite }: FocusStatusProps): JSX.Element {
  const studySite = isEducationalDomain(currentSite);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-violet-900/65">Focus Status</p>
        <Badge
          variant="secondary"
          className={
            focused
              ? "border border-cyan-300/65 bg-cyan-200/35 text-cyan-900"
              : "border border-orange-300/75 bg-orange-100/55 text-orange-900"
          }
        >
          {focused ? "Focused on Study Site ✅" : "Distracted ❌"}
        </Badge>
      </div>
      <p className="text-sm text-violet-950/90">{getMessage(focused, hp)}</p>
      <p className="truncate text-xs text-violet-900/70">
        Current site: <span className="text-violet-950">{currentSite}</span>
      </p>
      {!studySite && currentSite !== "No active site" && currentSite !== "Monitoring paused" ? (
        <p className="text-xs text-amber-700">Tip: This site is not on your educational allowlist.</p>
      ) : null}
    </div>
  );
}
