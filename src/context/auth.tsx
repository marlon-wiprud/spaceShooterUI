import React, { createContext, useState } from "react";

export interface AuthContext {
  account: string;
  setAccount: (addr: string) => void;
  loggedIn: boolean;
  setIsLoggedIn: (authToken: string) => void;
}

export const AuthCtx = createContext<AuthContext>({
  account: "",
  setAccount: () => null,
  loggedIn: false,
  setIsLoggedIn: () => null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [account, setAccount] = useState("");
  const [authToken, setAuthToken] = useState("");

  const _setIsLoggedIn = (_authtoken: string) => {
    setAuthToken(authToken);
  };

  return (
    <AuthCtx.Provider
      value={{
        account,
        loggedIn: authToken !== "",
        setAccount,
        setIsLoggedIn: _setIsLoggedIn,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};
