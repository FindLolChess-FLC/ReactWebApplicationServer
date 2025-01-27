import { createContext, useContext, useState, ReactNode, useMemo } from "react";

type MetaContextType = {
  pickData: string;
  setPickData: (value: string) => void;
};

// Context 생성
const MetaContext = createContext<MetaContextType | undefined>(undefined);

export function useMetaContext() {
  const context = useContext(MetaContext);
  if (!context) {
    throw new Error("useMetaContext must be used within a MetaProvider");
  }
  return context;
}

export function MetaProvider({ children }: { children: ReactNode }) {
  const [pickData, setPickData] = useState<string>("");

  // useMemo로 value 최적화
  const value = useMemo(() => ({ pickData, setPickData }), [pickData]);

  return <MetaContext.Provider value={value}>{children}</MetaContext.Provider>;
}
