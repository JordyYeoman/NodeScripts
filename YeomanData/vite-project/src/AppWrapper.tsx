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
  let sharedState = {
    ironHeartData: data, // <------ Expose Value to Consumer
    setIronHeartData, // <------ Expose Setter to Consumer
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}