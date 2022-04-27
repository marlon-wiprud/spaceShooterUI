import { useCallback, useContext } from "react";
import { login, requestNonce } from "../api";
import { AuthCtx } from "../context/auth";
import { deliverAction, newActionLogin } from "../gameComs";
import {
  isMetamaskInstalled,
  metamaskLogin,
  metamaskSignMessage,
} from "../metamask";

export const useAuthCtx = () => useContext(AuthCtx);

const connectMetamask = async (): Promise<string> => {
  if (!isMetamaskInstalled()) return "";
  const _account = await metamaskLogin();
  return _account;
};

export const useLogin = () => {
  const { setAccount, setIsLoggedIn } = useAuthCtx();

  return useCallback(async () => {
    try {
      const _account = await connectMetamask();
      if (!_account) throw new Error("failed to connnect metamask");

      const { nonce } = await requestNonce(_account);
      const signature = await metamaskSignMessage(nonce);
      const { authToken } = await login(_account, signature);
      setIsLoggedIn(authToken);
      setAccount(_account);
      deliverAction(newActionLogin(_account, authToken));
    } catch (err) {
      console.error(err);
    }
  }, [setAccount, setIsLoggedIn]);
};
