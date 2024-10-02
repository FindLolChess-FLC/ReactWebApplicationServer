export default function toggle(a: any) {
  return (
    // update info에서 가져오기
    <div>
      <button type="button">변지인님 환영합니다.</button>
      <ul>
        <li>마이페이지</li>
        <li>나의 즐겨찾기</li>
        <li>
          <button type="button" onClick={a}>
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
}
