import { createContext, useState } from "react";

export const LightContext = createContext();

export const LightProvider = ({ children }) => {
  const [light, setLight] = useState();
  
  return (
    <LightContext.Provider value={{ light, setLight }}>
      {children}
    </LightContext.Provider>
  );
};