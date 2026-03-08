export type GameState = {
  hp: number;
  xp: number;
  level: number;
  focused: boolean;
  currentSite: string;
};

export type PopupState = {
  gameState: GameState;
  monitoringEnabled: boolean;
};
