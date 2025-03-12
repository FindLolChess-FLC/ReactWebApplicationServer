// 기본값 0으로 지정
export default function Preference(like = 0, dislike = 0) {
  const total = like + dislike;
  return total === 0 ? 0 : Math.round((like / total) * 100);
}
