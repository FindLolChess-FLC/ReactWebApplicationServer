import styled from "styled-components";
import { Link } from "react-router-dom";
import logoImg from "../../assets/img/logo.png";
import SearchBar from "../SearchBar";
import UserStatus from "../UserStatus";

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  height: 5.3125rem; // 85px
  padding-top: 0.8125rem; // 13px
`;

const LogoImg = styled.img`
  width: 9.0625rem; // 145px
  height: 1.5625rem; // 25px
`;
type HeaderProps = {
  searchValue?: string;
};

export default function Header({ searchValue }: HeaderProps) {
  console.log("중간");
  console.log(searchValue);
  return (
    <Body>
      <Link to="/">
        <LogoImg src={logoImg} alt="로고 이미지" />
      </Link>
      <SearchBar searchValue={searchValue} />
      <UserStatus />
    </Body>
  );
}
