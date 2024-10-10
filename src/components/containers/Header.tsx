import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../../utils/getCookie";
import { Api } from "../../utils/apis/Api";
import Dropdown from "../Dropdown";
import logoImg from "../../assets/img/logo.png";

export default function Header() {
  const navigate = useNavigate();

  const [token, setToken] = useState(getCookie("token"));

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    console.log(token);
    Api({
      method: "DELETE",
      lastUrl: "user/signout/",
    });
    // 쿠키에서 토큰을 삭제하는 방법 (max-age=0으로 만료)
    document.cookie = "token=; max-age=0; path=/;";
    setToken(""); // 토큰 상태 초기화
  };

  return (
    <div>
      <img src={logoImg} alt="로고 이미지" />
      {token === "" ? (
        <button
          type="button"
          onClick={() => (token === "" ? handleLogin() : handleLogout())}
        >
          로그인
        </button>
      ) : (
        <Dropdown handleLogout={handleLogout} /> // 로그아웃 시
      )}
    </div>
  );
}
