import { CharacterCard } from "@/components/CharacterCard";
import { FocusStatus } from "@/components/FocusStatus";
import { HpBar } from "@/components/HpBar";
import { LogoMark } from "@/components/LogoMark";
import { XpBar } from "@/components/XpBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGameState } from "@/hooks/useGameState";

export default function App(): JSX.Element {
  const { gameState, monitoringEnabled, loading, error, resetGame, toggleMonitoring } = useGameState();

  return (
    <main className="w-popup p-3 text-foreground">
      <Card className="relative overflow-hidden rounded-3xl border-white/40 bg-card/60 shadow-[0_24px_48px_rgba(88,98,176,0.22)] backdrop-blur-md">
        <div className="pointer-events-none absolute -left-10 -top-16 h-48 w-48 rounded-full bg-sky-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-12 h-52 w-52 rounded-full bg-indigo-300/28 blur-3xl" />

        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-xl font-semibold italic tracking-wide">FocusQuest</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">Turn focus time into RPG progress.</CardDescription>
            </div>
            <LogoMark size="md" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CharacterCard level={gameState.level} focused={gameState.focused} />

          <div className="space-y-3 rounded-2xl border border-white/45 bg-white/24 p-3 backdrop-blur-sm">
            <HpBar hp={gameState.hp} />
            <XpBar xp={gameState.xp} />
          </div>

          <Separator className="bg-white/35" />

          <FocusStatus focused={gameState.focused} hp={gameState.hp} currentSite={gameState.currentSite} />

          {loading ? <p className="text-xs text-muted-foreground">Syncing game state...</p> : null}
          {error ? <p className="rounded-lg bg-orange-200/45 p-2 text-xs text-orange-900">{error}</p> : null}
        </CardContent>

        <CardFooter className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => void resetGame()}>
            Reset
          </Button>
          <Button onClick={() => void toggleMonitoring()}>
            {monitoringEnabled ? "Pause Tracking" : "Resume Tracking"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
