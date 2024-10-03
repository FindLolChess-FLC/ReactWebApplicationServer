import { Link } from "react-router-dom";

export default function Social() {
  return (
    <div>
      <h1>Find Lol Chess에 오신 것을 환영합니다!</h1>
      <p>소셜 로그인 및 이메일로 가입할 수 있습니다.</p>
      <div>
        <button type="button">카카오로 시작하기</button>
        <button type="button">네이버로 시작하기</button>
        <button type="button">Google로 시작하기</button>
      </div>
      <p>또는</p>
      <Link to="/join">
        <button type="button">이메일로 회원가입</button>
      </Link>
    </div>
  );
}
