import { Link } from "react-router-dom";
import ButtonTest from "./ButtonTest";
import InputTest from "./InputTest";

export default function Test() {
  return (
    <>
      <ButtonTest />
      <InputTest />
      <Link to="/">메인으로 가기</Link>
    </>
  );
}
