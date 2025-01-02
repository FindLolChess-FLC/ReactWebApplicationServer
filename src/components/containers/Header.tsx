import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import blacklogoImg from "../../assets/img/logo_black.png";
import whitelogoImg from "../../assets/img/logo_white.png";
import SearchBar from "../header/SearchBar";
import UserStatus from "../header/UserStatus";
import BlackSearchBar from "../header/BlackSearchBar";

const Body = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor};
  height: 6.3125rem; // 101px
  padding-bottom: 0.625rem; // 10px
`;

type HeaderProps = {
  searchValue?: string;
};

export default function Header({ searchValue }: HeaderProps) {
  const location = useLocation();
  const bgColor = location.pathname === "/" ? "#0D0D0D" : "#fff";
  const logo = location.pathname === "/" ? whitelogoImg : blacklogoImg;
  console.log("중간");
  console.log(searchValue);
  return (
    <Body bgColor={bgColor}>
      <Link to="/">
        <img src={logo} alt="로고 이미지" />
      </Link>
      {location.pathname === "/" ? (
        <BlackSearchBar searchValue={searchValue} />
      ) : (
        <SearchBar searchValue={searchValue} />
      )}

      <UserStatus />
    </Body>
  );
}
