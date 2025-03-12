// 쿠키에서 토큰 값을 가져오는 함수
export default function getCookie(name: string) {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : ""; // 값이 있으면 반환, 없으면 빈 문자열
}
