import { ChampionDataForm } from "../../types/ChampionData";

// Only the quick selector groups Lux forms; original API data stays unchanged.
export function getQuickChampionName(name: string) {
  return /^럭스(?:\s*[(（][^)）]+[)）])?$/.test(name.trim()) ? "럭스" : name;
}

export function getQuickChampions(champions: ChampionDataForm[]) {
  const grouped = new Map<string, ChampionDataForm>();
  champions.forEach(champion => {
    const name = getQuickChampionName(champion.name);
    if (!grouped.has(name) || champion.name.trim() === name) {
      grouped.set(name, { ...champion, name });
    }
  });
  return Array.from(grouped.values());
}
