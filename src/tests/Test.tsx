import { Link } from "react-router-dom";
import ButtonTest from "./ButtonTest";
import InputTest from "./InputTest";
import DetailTest from "./DetailTest";

export default function Test() {
  return (
    <>
      <ButtonTest />
      <InputTest />
      <Link to="/">메인으로 가기</Link>
      <DetailTest />
    </>
  );
}
