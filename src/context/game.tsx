import { createContext, useState } from "react";

export interface GameContext {
  isReady: boolean;
  setIsReady: (r: boolean) => void;
}

export const GameCtx = createContext<GameContext>({
  isReady: false,
  setIsReady: () => null,
});

export const GameProvider: React.FC = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <GameCtx.Provider value={{ isReady, setIsReady }}>
      {children}
    </GameCtx.Provider>
  );
};
