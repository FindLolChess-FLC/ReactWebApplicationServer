export default function TimeFormat(n: number) {
  const mtime = Math.floor(n / 60); // 분
  const stime = n % 60; // 초
  return `${mtime}:${String(stime).padStart(2, "0")}`; // 시:분:초 형식으로 반환
}
