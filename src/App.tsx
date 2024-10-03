import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Favorites from "./pages/Favorites";
import MyPage from "./pages/Mypage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Main />} />
        <Route path="login">
          <Route index element={<Login />} />
          {/* <Route path="login" element={<Google />} /> */}
        </Route>
        <Route path="join">
          <Route index element={<Join />} />
          {/* <Route path="join" element={<Google />} /> */}
        </Route>
        <Route path="mypage">
          <Route index element={<MyPage />} />
          {/* <Route element={<Google />} /> */}
        </Route>
        <Route path="favorites" index element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
