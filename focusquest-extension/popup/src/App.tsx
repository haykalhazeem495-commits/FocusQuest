import { CharacterCard } from "@/components/CharacterCard";
import { FocusStatus } from "@/components/FocusStatus";
import { HpBar } from "@/components/HpBar";
import { XpBar } from "@/components/XpBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGameState } from "@/hooks/useGameState";

export default function App(): JSX.Element {
  const { gameState, monitoringEnabled, loading, error, resetGame, toggleMonitoring } = useGameState();

  return (
    <main className="w-popup p-3 text-foreground">
      <Card className="overflow-hidden rounded-2xl border-border/70 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">FocusQuest</CardTitle>
          <CardDescription>Turn focus time into RPG progress.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <CharacterCard level={gameState.level} focused={gameState.focused} />

          <div className="space-y-3 rounded-xl border border-border/60 bg-slate-900/40 p-3">
            <HpBar hp={gameState.hp} />
            <XpBar xp={gameState.xp} />
          </div>

          <Separator />

          <FocusStatus focused={gameState.focused} hp={gameState.hp} currentSite={gameState.currentSite} />

          {loading ? <p className="text-xs text-muted-foreground">Syncing game state...</p> : null}
          {error ? <p className="text-xs text-rose-300">{error}</p> : null}
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
