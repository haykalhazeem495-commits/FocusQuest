import { useCallback, useEffect, useMemo, useState } from "react";
import type { GameState } from "@/lib/types";

const DEFAULT_STATE: GameState = {
  hp: 100,
  xp: 0,
  level: 1,
  focused: false,
  currentSite: "No active site"
};

type UseGameStateResult = {
  gameState: GameState;
  monitoringEnabled: boolean;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  resetGame: () => Promise<void>;
  toggleMonitoring: () => Promise<void>;
};

export function useGameState(): UseGameStateResult {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_STATE);
  const [monitoringEnabled, setMonitoringEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const response = await chrome.runtime.sendMessage({ type: "GET_STATE" });
      if (!response || !response.gameState) {
        setError("Unable to load game state.");
        return;
      }

      setError(null);
      setGameState(response.gameState as GameState);
      setMonitoringEnabled(Boolean(response.monitoringEnabled));
    } catch {
      setError("Background service is unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetGame = useCallback(async () => {
    await chrome.runtime.sendMessage({ type: "RESET_GAME" });
    await refresh();
  }, [refresh]);

  const toggleMonitoring = useCallback(async () => {
    const response = await chrome.runtime.sendMessage({
      type: "TOGGLE_MONITORING",
      enabled: !monitoringEnabled
    });

    if (response && typeof response.monitoringEnabled === "boolean") {
      setMonitoringEnabled(response.monitoringEnabled);
    }

    await refresh();
  }, [monitoringEnabled, refresh]);

  useEffect(() => {
    void refresh();

    const interval = window.setInterval(() => {
      void refresh();
    }, 2000);

    return () => window.clearInterval(interval);
  }, [refresh]);

  return useMemo(
    () => ({ gameState, monitoringEnabled, loading, error, refresh, resetGame, toggleMonitoring }),
    [gameState, monitoringEnabled, loading, error, refresh, resetGame, toggleMonitoring]
  );
}
