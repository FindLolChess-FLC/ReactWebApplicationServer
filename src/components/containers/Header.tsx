import logoImg from "../../assets/img/logo.png";
import SearchBar from "../SearchBar";
import UserStatus from "../UserStatus";

export default function Header() {
  return (
    <div>
      <img src={logoImg} alt="로고 이미지" />
      <UserStatus />
      <SearchBar />
    </div>
  );
}
