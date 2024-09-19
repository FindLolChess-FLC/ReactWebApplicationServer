import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../utils/getCookie";
import { signoutUser } from "../utils/apis/user";

export default function Header() {
  const navigate = useNavigate();

  const [token, setToken] = useState(getCookie("token"));

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    console.log(getCookie("token"));
    signoutUser();
    // 쿠키에서 토큰을 삭제하는 방법 (max-age=0으로 만료)
    document.cookie = "token=; max-age=0; path=/;";
    setToken(""); // 토큰 상태 초기화
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
