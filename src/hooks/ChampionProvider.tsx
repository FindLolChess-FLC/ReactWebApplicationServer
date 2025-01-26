import React, { createContext, useState, ReactNode, useMemo } from "react";
import { ChampionDataForm } from "../types/ChampionData";

interface ChampionContextProps {
  championMeta: ChampionDataForm | null;
  setChampionMeta: (value: ChampionDataForm | null) => void;
}

// Context 생성
export const ChampionContext = createContext<ChampionContextProps | undefined>(
  undefined,
);

export default function ChampionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [championMeta, setChampionMeta] = useState<ChampionDataForm | null>(
    null,
  );

  // useMemo로 value를 메모이제이션
  const value = useMemo(
    () => ({
      championMeta,
      setChampionMeta,
    }),
    [championMeta],
  );

  return (
    <ChampionContext.Provider value={value}>
      {children}
    </ChampionContext.Provider>
  );
}
