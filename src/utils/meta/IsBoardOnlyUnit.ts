// These units belong on the detail board, not in champion selection or lists.
export default function isBoardOnlyUnit(name: string) {
  return name === "돌껍질나무" || name === "생명꽃";
}
