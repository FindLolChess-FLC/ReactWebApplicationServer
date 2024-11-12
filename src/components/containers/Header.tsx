import styled from "styled-components";
import { Link } from "react-router-dom";
import logoImg from "../../assets/img/logo.png";
import SearchBar from "../SearchBar";
import UserStatus from "../UserStatus";

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 6.1875rem; // 99px
  justify-content: space-evenly;
`;

const LogoImg = styled.img`
  // margin-left: 9.125rem; // 146px
  width: 9.0625rem; // 145px
  height: 1.5625rem; // 25px
`;

export default function Header() {
  return (
    <Body>
      <Link to="/">
        <LogoImg src={logoImg} alt="로고 이미지" />
      </Link>
      <SearchBar />
      <UserStatus />
    </Body>
  );
}
