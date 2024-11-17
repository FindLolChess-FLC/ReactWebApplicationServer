// 쿠키에서 토큰 값을 넣는 함수
export default function setCookie(name: string, value: string, hours: number) {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  // 지금은 http여서 이대로, nginx 후 https로 변경시 Secure 적용
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
}
