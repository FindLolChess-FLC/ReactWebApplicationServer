import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

type MetaContextType = {
  pickData: any;
  setPickData: (value: any) => void;
};

// Context 생성
const MetaContext = createContext<MetaContextType | undefined>(undefined);

export const useMetaContext = () => {
  const context = useContext(MetaContext);
  if (!context) {
    throw new Error("useMetaContext must be used within a MetaProvider");
  }
  return context;
};

// 함수형 컴포넌트 선언
function MetaProvider({ children }: { children: ReactNode }) {
  const [pickData, setPickData] = useState<string>("");

  // useMemo로 value 최적화
  const value = useMemo(() => ({ pickData, setPickData }), [pickData]);

  return <MetaContext.Provider value={value}>{children}</MetaContext.Provider>;
}

export { MetaProvider };
