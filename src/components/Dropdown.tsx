import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DropdownForm } from "../types/Dropdown";
import { Api } from "../utils/apis/Api";
import downImg from "../assets/icon/arrow_down.svg";
import upImg from "../assets/icon/arrow_up.svg";
import myImg from "../assets/icon/mypage.svg";
import heartImg from "../assets/icon/heart.svg";
import outImg from "../assets/icon/logout.svg";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DropText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem; // 4px
  position: relative;
`;

const Img = styled.img`
  cursor: pointer;
`;

const LoginButton = styled.button`
  background: transparent;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  width: 13.4375rem; // 215px
  height: 8.3125rem; // 133px
  border-radius: 5px;
  box-shadow:
    -2px 0px 4px 0px rgba(0, 0, 0, 0.2),
    3px 0px 4px 0px rgba(0, 0, 0, 0.2),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: #fff;
  position: absolute; // 절대 위치 설정
  transform: translate(0, 27px);
`;

const Li = styled.li`
  width: 13.4375rem; // 215px
  height: 2.75rem; // 44px
  &:hover {
    background: #e1e1e1;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5625rem; // 9px
  padding: 1rem; // 16px
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  &:hover {
    color: inherit;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5625rem; // 9px
  padding: 0.8rem 1rem; // 16px
  background: transparent;
  font-size: 0.875rem; // 14px
  font-weight: 500;
`;

export default function Dropdown({ handleLogout }: DropdownForm) {
  // 상태 관리: 목록이 보이는지 여부를 결정하는 state
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const nicknameAPI = async () => {
      const nicknameData = await Api({
        method: "GET",
        lastUrl: "user/updateinfo/",
      });
      setNickname(nicknameData.nickname);
    };
    nicknameAPI();
  }, []);

  // 토글 함수
  const handleDropdown = () => {
    setIsOpen(!isOpen); // 상태를 반전시켜 목록을 토글
  };

  return (
    <Body>
      {/* 토글 버튼 */}
      <DropText>
        <LoginButton type="button" onClick={handleDropdown}>
          {`${nickname}님 환영합니다`}
        </LoginButton>
        {isOpen ? (
          <Img
            src={upImg}
            alt="윗 방향"
            onKeyDown={handleDropdown}
            onClick={handleDropdown}
          />
        ) : (
          <Img
            src={downImg}
            alt="아랫 방향"
            onKeyDown={handleDropdown}
            onClick={handleDropdown}
          />
        )}
      </DropText>
      {/* 상태에 따라 목록 표시 */}
      {isOpen && (
        <Ul>
          <Li>
            <StyledLink to="/mypage">
              <img src={myImg} alt="마이페이지" />
              마이페이지
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/favorites">
              <img src={heartImg} alt="마이페이지" />
              나의 즐겨찾기
            </StyledLink>
          </Li>
          <hr />
          <Li>
            <LogoutButton type="button" onClick={handleLogout}>
              <img src={outImg} alt="마이페이지" />
              로그아웃
            </LogoutButton>
          </Li>
        </Ul>
      )}
    </Body>
  );
}
