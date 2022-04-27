import { useCallback, useContext, useEffect } from "react";
import { GameCtx } from "../context/game";
import { ACTION_LOGIN, ACTION_READY, maybeParse } from "../gameComs";
import { useLogin } from "./auth";

export const useGameCtx = () => useContext(GameCtx);

export const useMessageHandler = () => {
  const { isReady, setIsReady } = useGameCtx();
  const login = useLogin();

  return useCallback(
    async (e: any) => {
      try {
        if (!e.isTrusted) return;
        const msg = maybeParse(e.data);
        if (!msg) return;

        switch (msg.type) {
          case ACTION_READY:
            if (!isReady) setIsReady(true);
            break;

          case ACTION_LOGIN:
            await login();
        }
      } catch (err) {
        console.error("unable to handle game message: ", err);
      }
    },
    [isReady, setIsReady, login]
  );
};

export const useGameMessageListener = () => {
  const handleMessage = useMessageHandler();

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);
};
