import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Favorites from "./pages/Favorites";
import MyPage from "./pages/Mypage";
import Social from "./pages/Social";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Main />} />
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
  );
}

export default App;
