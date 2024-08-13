import { createContext, useState } from "react";

export const EasyContext = createContext(true);

export const EasyProvider = ({ children }) => {
  const [isEasyMode, setEasyMode] = useState(false);
  return <EasyContext.Provider value={{ isEasyMode, setEasyMode }}>{children}</EasyContext.Provider>;
};

