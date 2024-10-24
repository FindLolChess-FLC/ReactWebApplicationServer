import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
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
  }`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Main />} />
          <Route path="/test" index element={<Test />} />
          <Route path="/meta-list">
            {/* 전체 메타 목록 */}
            <Route index element={<MetaList />} />
            {/* 회원가입 통합페이지 */}
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
