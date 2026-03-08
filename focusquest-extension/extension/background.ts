type GameState = {
  hp: number;
  xp: number;
  level: number;
  focused: boolean;
  currentSite: string;
};

type StorageSchema = {
  gameState?: GameState;
  monitoringEnabled?: boolean;
};

const EDUCATION_SITES = [
  "coursera.org",
  "khanacademy.org",
  "edx.org",
  "udemy.com",
  "wikipedia.org",
  "mit.edu",
  "harvard.edu",
  "stanford.edu",
  "moodle",
  "canvas"
];

const STORAGE_KEYS = {
  gameState: "gameState",
  monitoringEnabled: "monitoringEnabled"
} as const;

const TICK_MS = 10_000;

const INITIAL_GAME_STATE: GameState = {
  hp: 100,
  xp: 0,
  level: 1,
  focused: false,
  currentSite: "No active site"
};

let gameState: GameState = { ...INITIAL_GAME_STATE };
let monitoringEnabled = true;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function deriveLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

function extractDomain(url?: string): string {
  if (!url) {
    return "No active site";
  }

  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return "Browser page";
  }
}

function isEducational(url?: string): boolean {
  if (!url) {
    return false;
  }

  const normalized = url.toLowerCase();
  return EDUCATION_SITES.some((site) => normalized.includes(site));
}

function normalizeState(state: GameState): GameState {
  const hp = clamp(state.hp, 0, 100);
  const xp = Math.max(0, state.xp);

  return {
    ...state,
    hp,
    xp,
    level: deriveLevel(xp)
  };
}

function applyTick(state: GameState): GameState {
  let hp = state.hp;
  let xp = state.xp;

  if (state.focused) {
    xp += 5;
    hp = clamp(hp + 1, 0, 100);
  } else {
    hp = clamp(hp - 3, 0, 100);
  }

  if (hp <= 0) {
    xp = Math.max(0, xp - 10);
  }

  return normalizeState({
    ...state,
    hp,
    xp
  });
}

function getStorage<T>(keys: string[]): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result as T);
    });
  });
}

function setStorage(payload: Partial<StorageSchema>): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(payload, () => resolve());
  });
}

async function persistGameState(): Promise<void> {
  await setStorage({
    [STORAGE_KEYS.gameState]: gameState,
    [STORAGE_KEYS.monitoringEnabled]: monitoringEnabled
  });
}

async function updateFocusFromActiveTab(): Promise<void> {
  if (!monitoringEnabled) {
    gameState = {
      ...gameState,
      focused: false,
      currentSite: "Monitoring paused"
    };
    await persistGameState();
    return;
  }

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const domain = extractDomain(activeTab?.url);
  const focused = isEducational(activeTab?.url);

  gameState = normalizeState({
    ...gameState,
    focused,
    currentSite: domain
  });

  await persistGameState();
}

async function initialize(): Promise<void> {
  const stored = await getStorage<StorageSchema>([
    STORAGE_KEYS.gameState,
    STORAGE_KEYS.monitoringEnabled
  ]);

  gameState = normalizeState(stored.gameState ?? INITIAL_GAME_STATE);
  monitoringEnabled = stored.monitoringEnabled ?? true;

  await updateFocusFromActiveTab();
}

async function resetGame(): Promise<void> {
  gameState = {
    ...INITIAL_GAME_STATE,
    focused: gameState.focused,
    currentSite: gameState.currentSite
  };
  await persistGameState();
}

async function setMonitoring(enabled: boolean): Promise<void> {
  monitoringEnabled = enabled;
  await updateFocusFromActiveTab();
}

chrome.runtime.onInstalled.addListener(() => {
  void initialize();
});

chrome.runtime.onStartup.addListener(() => {
  void initialize();
});

chrome.tabs.onActivated.addListener(() => {
  void updateFocusFromActiveTab();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") {
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.id === tabId) {
      void updateFocusFromActiveTab();
      return;
    }

    if (tab.active) {
      void updateFocusFromActiveTab();
    }
  });
});

chrome.windows.onFocusChanged.addListener(() => {
  void updateFocusFromActiveTab();
});

setInterval(() => {
  void (async () => {
    if (!monitoringEnabled) {
      return;
    }

    gameState = applyTick(gameState);
    await persistGameState();
  })();
}, TICK_MS);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  void (async () => {
    switch (message?.type) {
      case "RESET_GAME":
        await resetGame();
        sendResponse({ ok: true });
        return;
      case "TOGGLE_MONITORING": {
        const nextValue =
          typeof message.enabled === "boolean" ? message.enabled : !monitoringEnabled;
        await setMonitoring(nextValue);
        sendResponse({ ok: true, monitoringEnabled });
        return;
      }
      case "GET_STATE":
        sendResponse({ gameState, monitoringEnabled });
        return;
      default:
        sendResponse({ ok: false, error: "Unknown message type" });
    }
  })();

  return true;
});

void initialize();
