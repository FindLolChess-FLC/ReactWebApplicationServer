import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
