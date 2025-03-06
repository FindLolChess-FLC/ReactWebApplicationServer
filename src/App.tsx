import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetaProvider } from "./hooks/Context";
import Main from "./pages/Main";
import Loading from "./pages/Loading";
import RecommendList from "./pages/RecommendList";
import SearchList from "./pages/SearchList";
import Login from "./pages/Login";
import Social from "./pages/Social";
import Join from "./pages/Join";
import MyPage from "./pages/Mypage";
import Favorites from "./pages/Favorites";
import Test from "./tests/Test";
import Detail from "./pages/Detail";

// global styled-component
const GlobalStyle = createGlobalStyle`
  ${reset}
  *, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Pretendard", sans-serif;
    letter-spacing: -0.048px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  a{
    color: #356EFF;
    font-size: 14px;
    font-weight: 500;
  }

  button {
    border: none;
    cursor: pointer;
    text-align: center;
  }
    
  // number type input 화살표 없애기
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
  // 자동 완성 배경색 제거
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  // disabled 상태일 때 배경색 설정
  input:disabled {
    border: 1px solid #d4d4d8;
    background: #d4d4d8;
  }
  // 자동 완성 + disabled 상태
  input:disabled:-webkit-autofill {
    border: 1px solid #d4d4d8;
    -webkit-box-shadow: 0 0 0 1000px #d4d4d8 inset;
  }

    // 전체 스크롤바 
  ::-webkit-scrollbar {
    width: 14px; // 스크롤바 너비
    height: 14px; // 스크롤바 높이 (가로 스크롤용)
  }
  // 스크롤바 트랙 (배경)
  ::-webkit-scrollbar-track {
    background: #f0f0f0; // 트랙 배경색
  }
  // 스크롤바 손잡이 (드래그 가능한 부분)
  ::-webkit-scrollbar-thumb {
    background: #888; /* 손잡이 색상 */
    border-radius: 6px; // 둥근 모서리
    border: 2px solid #f0f0f0; // 손잡이와 트랙 사이의 간격
    cursor: pointer;
  }
  // 스크롤바 손잡이 호버 효과
  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* 호버 시 손잡이 색상 */
  }
  `;

function App() {
  return (
    <>
      <GlobalStyle />
      <MetaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Main />} />
            <Route path="loading" index element={<Loading />} />
            <Route path="test" index element={<Test />} />
            {/* 추천 메타 */}
            <Route path="recommend-list" index element={<RecommendList />} />
            {/* 검색 메타 */}
            <Route path="search-list" index element={<SearchList />} />
            {/* 로그인 */}
            <Route path="login" index element={<Login />} />
            {/* 회원가입 */}
            <Route path="join">
              {/* 회원가입 통합페이지 */}
              <Route index element={<Social />} />
              {/* 이메일 회원가입 */}
              <Route path="email-join" element={<Join />} />
            </Route>
            {/* 마이페이지 */}
            <Route path="mypage" index element={<MyPage />} />
            {/* 즐겨찾기 */}
            <Route path="favorites" index element={<Favorites />} />
            {/* 상세페이지(덱마다 다른 id) */}
            <Route path="detail/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </MetaProvider>
    </>
  );
}

export default App;
