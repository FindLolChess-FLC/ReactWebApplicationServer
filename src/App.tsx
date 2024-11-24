import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Loading from "./pages/Loading";
import MetaList from "./pages/MetaList";
import SearchList from "./pages/SearchList";
import Login from "./pages/Login";
import Social from "./pages/Social";
import Join from "./pages/Join";
import MyPage from "./pages/Mypage";
import Favorites from "./pages/Favorites";
import Test from "./tests/Test";

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
  `;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Main />} />
          <Route path="/loading" index element={<Loading />} />
          <Route path="/test" index element={<Test />} />
          <Route path="/meta-list">
            {/* 전체 메타 목록 */}
            <Route index element={<MetaList />} />
            <Route path="search-list" element={<SearchList />} />
          </Route>
          <Route path="login">
            <Route index element={<Login />} />
          </Route>
          <Route path="join">
            {/* 회원가입 통합페이지 */}
            <Route index element={<Social />} />
            {/* 이메일 회원가입 */}
            <Route path="email-join" element={<Join />} />
          </Route>
          <Route path="mypage">
            <Route index element={<MyPage />} />
          </Route>
          <Route path="favorites" index element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
