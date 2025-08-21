export default function ChampionColor(price: number, name?: string) {
  // 시즌13:사이온, 시즌14:T-43X,R-080T,공허생물, 시즌15:휘감는뿌리,거대메크로봇
  if (name === "휘감는뿌리" || name === "거대메크로봇") {
    return "#0d0d0d";
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
