import { useContext } from "react";
import { ChampionContext } from "./Provider";

export function useChampionContext() {
  const context = useContext(ChampionContext);
  if (!context) {
    throw new Error(
      "useChampionContext must be used within a ChampionProvider",
    );
  }
  return context;
}
