import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./layouts/Layout";
import About from "./pages/About";
import EditMemo from "./pages/EditMemo";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import NewMemo from "./pages/NewMemo";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 認証不要ページ */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* 認証必須ページをまとめてラップ */}
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="new" element={<NewMemo />} />
            <Route path="edit/:id" element={<EditMemo />} />
            <Route path="about" element={<About />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
