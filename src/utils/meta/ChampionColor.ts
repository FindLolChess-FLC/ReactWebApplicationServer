export default function ChampionColor(price: number, name?: string) {
  // 사이온
  if (name === "사이온") {
    return "#000";
  }
  // 1코인
  if (price === 1) {
    return "#CBB099";
  }
  // 2코인
  if (price === 2) {
    return "#26CE69";
  }
  // 3코인
  if (price === 3) {
    return "#2D97FF";
  }
  // 4코인
  if (price === 4) {
    return "#C13CEE";
  }
  // 5코인
  if (price === 5) {
    return "#FAD542";
  }
  // 6코인
  if (price === 6) {
    return "#FFBAEE";
  }
  return "#CBB099";
}
