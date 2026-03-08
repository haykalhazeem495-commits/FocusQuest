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
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Focus Status</p>
        <Badge
          variant="secondary"
          className={focused ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}
        >
          {focused ? "Focused on Study Site ✅" : "Distracted ❌"}
        </Badge>
      </div>
      <p className="text-sm text-foreground/90">{getMessage(focused, hp)}</p>
      <p className="truncate text-xs text-muted-foreground">
        Current site: <span className="text-foreground">{currentSite}</span>
      </p>
      {!studySite && currentSite !== "No active site" && currentSite !== "Monitoring paused" ? (
        <p className="text-xs text-amber-300">Tip: This site is not on your educational allowlist.</p>
      ) : null}
    </div>
  );
}
