import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import getCookie from "../../utils/getCookie";
import { Api } from "../../utils/apis/Api";
import Dropdown from "./Dropdown";

const LoginButton = styled.button<{ color: string }>`
  background: transparent;
  color: ${props => props.color};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
`;

export default function UserStatus() {
  const navigate = useNavigate();
  const location = useLocation();

  // 경로에 따른 동적 색상 설정
  const color = location.pathname === "/" ? "#fff" : "#333";

  const [token, setToken] = useState(getCookie("token"));

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Api({
      method: "DELETE",
      lastUrl: "user/signout/",
    });
    // 쿠키에서 토큰 삭제
    document.cookie = "token=; max-age=0; path=/;";
    setToken(""); // 토큰 상태 초기화
    navigate("/");
  };

  return (
    <div>
      {token === "" ? (
        <LoginButton
          type="button"
          onClick={handleLogin} // token === ""일 때는 로그인만 처리
          color={color}
        >
          로그인
        </LoginButton>
      ) : (
        <Dropdown handleLogout={handleLogout} /> // 로그아웃 Dropdown 표시
      )}
    </div>
  );
}
