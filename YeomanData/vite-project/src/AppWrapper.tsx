// src/context/state.js
import { createContext, useContext, useState } from "react";

type AppContextType = {
  ironHeartData?: any;
  setIronHeartData?: Function;
  Provider: React.Provider<any>;
  Context?: React.Context<any>;
  Consumer: React.Consumer<any>;
};

export const AppContext: AppContextType = createContext({});

export function AppWrapper({ children }: any) {
  const [data, setIronHeartData] = useState<any>(0);
  const [user, setUser] = useState<any>({
    isAuthenticated: false,
    authenticationTime: null,
  });
  const [currentData, setCurrentData] = useState<any>({});

  let sharedState = {
    user,
    setUser,
    ironHeartData: data, // <------ Expose Value to Consumer
    setIronHeartData, // <------ Expose Setter to Consumer
    currentData,
    setCurrentData,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
