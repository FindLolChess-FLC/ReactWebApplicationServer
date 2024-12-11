import styled from "styled-components";
import { Link } from "react-router-dom";
import logoImg from "../../assets/img/logo.png";
import SearchBar from "../SearchBar";
import UserStatus from "../UserStatus";

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 5.3125rem; // 85px
  padding-bottom: 10px;
`;

const LogoImg = styled.img``;
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
