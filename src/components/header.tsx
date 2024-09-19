import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // 쿠키에서 토큰 값을 가져오는 함수
  const getCookie = (name: string) => {
    const matches = document.cookie.match(
      new RegExp(`(?:^|; )${name}=([^;]*)`),
    );
    return matches ? decodeURIComponent(matches[1]) : ""; // 값이 있으면 반환, 없으면 빈 문자열
  };

  const [token, setToken] = useState(getCookie("token"));

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    // 쿠키에서 토큰을 삭제하는 방법 (max-age=0으로 만료)
    document.cookie = "token=; max-age=0; path=/;";
    setToken(""); // 토큰 상태 초기화
    console.log(token);
  };

  return (
    <div>
      <p>header</p>
      <button
        type="button"
        onClick={() => (token === "" ? handleLogin() : handleLogout())}
      >
        {token === "" ? "로그인" : "로그아웃"}
      </button>
    </div>
  );
}
