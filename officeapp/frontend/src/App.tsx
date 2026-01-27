import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner, Center } from "@chakra-ui/react";

import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import BillingRequests from "./pages/BilingRequestList";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import ContactList from "./pages/ContactList";
import ContactDetail from "./pages/ContactDetail";
import Inventory from "./pages/Inventory";
import InventoryDetail from "./pages/InventoryDetail";
import AttendancePage from "./pages/Attendance";
import BillingRequestCreate from "./pages/BillingRequestCreate";

// "/" 用の遷移コンポーネント
function RootRedirect() {
  const { isLoading } = useAuth0();
  const location = useLocation();

  // Auth0が戻してくる `/?code=...&state=...` の間に勝手に飛ばすと認証が確定しないので待つ
  const hasAuth0Params =
    new URLSearchParams(location.search).has("code") ||
    new URLSearchParams(location.search).has("state");

  if (isLoading || hasAuth0Params) {
    return (
      <Center minH="60vh">
        <Spinner />
      </Center>
    );
  }

  return <Navigate to="/attendance" replace />;
}

function App() {
  return (
    <Routes>
      {/* 初期遷移（Auth0の処理を邪魔しない） */}
      <Route path="/" element={<RootRedirect />} />

      {/* ログイン（Layoutなし） */}
      <Route path="/login" element={<Login />} />

      {/* Layoutありのページ群 */}
      <Route
        path="/attendance"
        element={
          <Layout>
            <AttendancePage />
          </Layout>
        }
      />

      <Route
        path="/contacts"
        element={
          <Layout>
            <Contacts />
          </Layout>
        }
      />

      <Route
        path="/contacts/list"
        element={
          <Layout>
            <ContactList />
          </Layout>
        }
      />

      <Route
        path="/contacts/:id"
        element={
          <Layout>
            <ContactDetail />
          </Layout>
        }
      />

      <Route
        path="/tasks"
        element={
          <Layout>
            <Tasks />
          </Layout>
        }
      />

      <Route
        path="/requests"
        element={
          <Layout>
            <BillingRequests />
          </Layout>
        }
      />

      <Route
        path="/requests/new"
        element={
          <Layout>
            <BillingRequestCreate />
          </Layout>
        }
      />

      <Route
        path="/inventory"
        element={
          <Layout>
            <Inventory />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      <Route
        path="/inventory/:id"
        element={
          <Layout>
            <InventoryDetail />
          </Layout>
        }
      />

      {/* 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
