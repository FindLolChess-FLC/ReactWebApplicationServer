import { Link } from "react-router-dom";
import ButtonTest from "./ButtonTest";

export default function Test() {
  return (
    <>
      <ButtonTest />
      <Link to="/">메인으로 가기</Link>
    </>
  );
}
